import * as fs from 'fs';
import BaseUrl from './base-url.js';
import Crawler from './crawler.js';
import StoreUrlsLocal from './store-urls-local.js';
import processLinks from './scraper.js';
import StoreDataLocal from './store-data-local.js';  // import the local storage function

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
    console.log('\nScraping started...\n');

    const horizonUrls = JSON.parse(fs.readFileSync('prerequisites/horizon.json', 'utf-8')).seeds;
    const scrapedData = await processLinks(horizonUrls); // Call the scraper function

    await StoreDataLocal(scrapedData); // Store the scraped data locally
    console.log('Scraping finished!\n');
}

main();
