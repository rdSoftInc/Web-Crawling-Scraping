
import * as fs from 'fs'

import Crawler from './crawler.js'

import { promises as fsPromises } from 'fs'


// function to access prerequisites/horizon.json & store the found urls...

const storedUrls = JSON.parse(fs.readFileSync('prerequisites/urls.json', 'utf-8')).urls

function getBaseUrl(url) {
    
    const delimiter = '/';
    
    const occurrenceToSplit = 3;
    
    const parts = url.split(delimiter);

    const baseUrl = parts.slice(0, occurrenceToSplit);

    return baseUrl.join(delimiter)
}


// function to access prerequisites/horizon.json & store the found urls...

const filePath = 'prerequisites/horizon.json'

async function storeUrl(urls) {

    try {

        const data = await fsPromises.readFile(filePath, 'utf8')
    
        const jsonData = JSON.parse(data)

        jsonData.seeds.push(...urls)

        const updatedJsonData = JSON.stringify(jsonData, null, 2)
        
        await fsPromises.writeFile(filePath, updatedJsonData, 'utf8')

        console.log('\n' + urls.length + ' Urls stored successfully !!!\n');

    } catch (err) {

        console.error('Error : ', err);

    }

}


// start of the application...

async function main() {
    
    console.log("\nStarting Server...")

    // emptying seeds of old urls...

    const existingData = await fsPromises.readFile(filePath, 'utf8')
    
    const existingJsonData = JSON.parse(existingData)

    existingJsonData.seeds = []

    const updatedExistingData = JSON.stringify(existingJsonData, null, 2)

    await fsPromises.writeFile(filePath, updatedExistingData, 'utf8')

    console.log('\nSeeds Emptied !!!');
    
    console.log("\nStarting with fetching urls...\n")

    // function to fetch base url of the link from prerequistes/urls.json file for links with no base url...

    const baseUrl = getBaseUrl(storedUrls[0])
    
    // calling crawler function...
    
    const urls = await Crawler(baseUrl, storedUrls[0])

    // storing the found urls to prerequistes/horizon.json file for data extraction...

    await storeUrl(urls)

}


main()



