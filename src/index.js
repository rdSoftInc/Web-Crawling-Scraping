
import * as fs from 'fs'

import crawler from './crawler.js'

import { promises as fsPromises } from 'fs'




const storedUrls = JSON.parse(fs.readFileSync('prerequisites/urls.json', 'utf-8')).urls

function getBaseUrl(url) {
    
    const delimiter = '/';
    
    const occurrenceToSplit = 3;
    
    const parts = url.split(delimiter);

    const baseUrl = parts.slice(0, occurrenceToSplit);

    return baseUrl.join(delimiter)
}




const baseUrl = getBaseUrl(storedUrls[0])

crawler.crawl(baseUrl, storedUrls[0])




const filePath = 'prerequisites/horizon.json'

async function storeUrl(urls) {

    try {

        const data = await fsPromises.readFile(filePath, 'utf8')
    
        const jsonData = JSON.parse(data)

        jsonData.seeds.push(...urls)

        const updatedJsonData = JSON.stringify(jsonData, null, 2)
        
        await fsPromises.writeFile(filePath, updatedJsonData, 'utf8')

        console.log('Data added successfully!');

    } catch (err) {

        console.error('Error:', err);

    }

}

storeUrl(crawler.urls)