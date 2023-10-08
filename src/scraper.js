import puppeteer from 'puppeteer';
import {storeData} from "./store-db.js";

const collectionName = "WEB";

async function processLinks(urls) {
    const browser = await puppeteer.launch({ headless: "new", protocolTimeout: 60000});
    const data = [];  // Move the data array inside the function

    for (const url of urls) {
        const scrapedData = await Scraper(url, browser);
        if (scrapedData) {
            data.push(scrapedData);
        }
    }
    await browser.close();
    return data; // Return the scraped data so you can use it elsewhere
}

const Scraper = async (url, browser) => {
    try {
        const page = await browser.newPage({ timeout: 60000 });
        await page.goto(url, { timeout: 60000 });

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

            if (title && dateText && description && street && postalCode && city) {
                return { title, dateText, description, street, city, postalCode, fee, url };
            }
        }, url);

        if (pageData) {
            console.log(`Scraped... ${pageData.title}`);
            await storeData(pageData, collectionName, url);
            console.log(`Scraped... ${url}`);
            return pageData; // Return the scraped data
        }

        await page.close();
    } catch (e) {
        console.error(e);
    }
}

export default processLinks;
