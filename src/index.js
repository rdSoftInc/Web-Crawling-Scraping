
// imported inbuilt packages...

import * as fs from 'fs'

import { promises as fsPromises } from 'fs'

// user defined functions...

import BaseUrl from './base-url.js'

import Crawler from './crawler.js'

import StoreLocal from './store-local.js'

// file path to access horizon.json file...

const filePath = 'prerequisites/horizon.json'

// fetching the initial urls to proceed...

const storedUrls = JSON.parse(fs.readFileSync('prerequisites/urls.json', 'utf-8')).urls

// start of the application...

async function main() {

    // emptying seeds of old urls...

    const existingData = await fsPromises.readFile(filePath, 'utf8')
    
    const existingJsonData = JSON.parse(existingData)

    existingJsonData.seeds = []

    const updatedExistingData = JSON.stringify(existingJsonData, null, 2)

    await fsPromises.writeFile(filePath, updatedExistingData, 'utf8')

    console.log('\nCrawling started...\n');

    // function to fetch base url of the link from prerequistes/urls.json file for links with no base url...

    const baseUrl = BaseUrl(storedUrls[0])
    
    // calling crawler function...
    
    const urls = await Crawler(baseUrl, storedUrls[0])

    // storing the found urls to prerequistes/horizon.json file for data extraction...

    await StoreLocal(urls)

}

main()



