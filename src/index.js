
// importing inbuilt packages...

import * as fs from 'fs';

// importing self built functions...

import BaseUrl from './base-url.js';
import Crawler from './crawler.js';
import StoreUrlsLocal from './store-urls-local.js';
import processLinks from './scrapper.js';
import storeDataLocal from './store-data-local.js';

async function main() {

    console.log('\nCrawling started...\n');

    const storedUrls = JSON.parse(fs.readFileSync('prerequisites/urls.json', 'utf-8')).urls;

    for (const url of storedUrls) {

        const baseUrl = BaseUrl(url);

        try {

            const urls = await Crawler(baseUrl, url, 0);

            await StoreUrlsLocal(urls);
            
        } catch (e) {

            console.error('Failed to crawl ' + e);

        }
    
    }

    console.log('Crawling finished!\n');

    console.log('\nScrapping started...\n');

    const horizonUrls = JSON.parse(fs.readFileSync('prerequisites/horizon.json', 'utf-8')).seeds;

    const scrapedData = await processLinks(horizonUrls); 

    await storeDataLocal(scrapedData);

    console.log('Scrapping finished!\n');

}

main();
