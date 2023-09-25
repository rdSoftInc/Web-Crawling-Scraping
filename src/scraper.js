

// imported inbuilt packages...

import * as fs from 'fs'

// imported npm packages...

import puppeteer from 'puppeteer'

import StoreDataLocal from './store-data-local.js'

// file path to access horizon.json file...

let urls = JSON.parse(fs.readFileSync('prerequisites/horizon.json', 'utf-8')).seeds

// array to store temporarily

let data = []

// function to fetch data from each url

async function processLinks(urls) {

    const browser = await puppeteer.launch({ headless: "new", protocolTimeout: 60000})

    for (const url of urls) {

        await Scraper(url, browser)

    }

    await browser.close()

}

// web scraper function 

const Scraper = async (url, browser) => {

    try {

        const page = await browser.newPage({ timeout: 60000 })

        await page.goto(url, { timeout: 60000 })    

        const pageData = await page.evaluate(async () => {

            title = (Array.from(document.querySelectorAll(".article__title")))[0]?.innerText

            date = (Array.from(document.querySelectorAll(".article__subtitle")))[0]?.innerText

            description = (Array.from(document.querySelectorAll(".article__introtext")))[0]?.innerText

            street = (Array.from(document.querySelectorAll(".street-address")))[0]?.innerText

            postalCode = (Array.from(document.querySelectorAll(".postal-code")))[0]?.innerText

            city = (Array.from(document.querySelectorAll(".locality")))[0]?.innerText

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

            if (title && date && description && street && postalCode && city) {

                return { title, date, description, street, city, postalCode, fee } 

            } else {

                return 

            }

        })

        // Will only store the data where are all fields are found...

        if (pageData) {

            data.push(pageData)

            console.log(`Scraped... ${url}`);

        }

        page.close();
        
        return true

    } catch (e) {

        console.error(e)

    }

}

await processLinks(urls)

await StoreDataLocal(data)

console.log('\nStored Data Locally !!!\n');

export default Scraper