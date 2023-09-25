
// imported inbuilt packages...

import * as fs from 'fs'

// user defined functions...

import BaseUrl from './base-url.js'

import Crawler from './crawler.js'

import StoreUrlsLocal from './store-urls-local.js'

// fetching the initial urls to proceed...

const storedUrls = JSON.parse(fs.readFileSync('prerequisites/urls.json', 'utf-8')).urls

// start of the application...

async function main() {

    console.log('\nCrawling started...\n');

    for (const url of storedUrls) {

        // function to fetch base url of the link from prerequistes/urls.json file for links with no base url...

        const baseUrl = BaseUrl(url);

        try {

            // calling crawler function...

            const urls = await Crawler(baseUrl, url, 0);

            // storing the found urls to prerequistes/horizon.json file for data extraction...

            await StoreUrlsLocal(urls);           

            

        } catch (e) {

            console.error('Failed to crawl ' + e);

        }
    }

    console.log('Crawling finished!\n');
}

main()



