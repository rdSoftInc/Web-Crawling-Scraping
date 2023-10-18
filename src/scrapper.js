
// imported external packages...

import puppeteer from 'puppeteer';

// importing self built functions...

import { storeData } from "./store-db.js";

async function processLinks(urls) {

    const browser = await puppeteer.launch({ headless: 'true' });
    
    const data = []; 

    const page = await browser.newPage();

    for (const url of urls) {

        const scrapedData = await Scraper(url, page);

        if (scrapedData) {

            data.push(scrapedData);

        }

    }

    await browser.close();

    return data;

}

const Scraper = async (url, page) => {

    try {

        if (!url) {

            console.error('Invalid URL ...', url);

            return null;

        }

        await page.goto(url, { timeout: 60 * 1000 })

        const pageData = await page.evaluate(async (url) => {

            let title = (Array.from(document.querySelectorAll(".article__title")))[0]?.innerText;
            let dateText = (Array.from(document.querySelectorAll(".article__subtitle")))[0]?.innerText;
            let description = (Array.from(document.querySelectorAll(".article__introtext")))[0]?.innerText;
            let street = (Array.from(document.querySelectorAll(".street-address")))[0]?.innerText;
            let postalCode = (Array.from(document.querySelectorAll(".postal-code")))[0]?.innerText;
            let city = (Array.from(document.querySelectorAll(".locality")))[0]?.innerText;

            const fetchFee = async () => {

                const elements = Array.from(document.querySelectorAll(".info-container-list dd"));

                for (let i = 0; i < elements.length && i < 10; i++) {

                    const text = elements[i].innerText;

                    if (text.includes('€') || text.includes('Euro') || text.includes('euro')) {

                        return text;

                    }

                }

                return '';

            };

            const fee = await fetchFee();

            if (title && dateText && description && street && city && postalCode && url) {

                return { title, dateText, description, street, city, postalCode, fee, url };

            }

        }, url);

        if (pageData) {

            await storeData(pageData)

            return pageData;

        }

    } catch (e) {

        console.error(e);

    }

}

export default processLinks;
