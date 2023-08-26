
import fetch from 'node-fetch'

import { load } from 'cheerio'

let i = 0

const seenUrls = {}

const urls = []

// function to find sublinks of links found

async function processLinks(baseUrl, links) {

    for (const link of links) {

        if (link.startsWith('/') && link.includes('/events/') && !link.includes('archive') && !link.includes('gallery') && link.length > 1) {

            await Crawler(baseUrl, baseUrl + link)

        } else if (link.includes('http') && link.includes('/events/') && !link.includes('archive') && !link.includes('gallery')) {

            await Crawler(baseUrl, link)

        }

    }

}

// web crawler function 

const Crawler = async (baseUrl, url) => {

    if (seenUrls[url]) {
        
        return

    }

    if (!url.includes('events')) {
        
        return

    }

    console.log("Crawling... " + url)

    urls.push(url)

    seenUrls[url] = true

    try {

        const response = await fetch(url)

        const html = await response.text()

        const $ = load(html);

        const links = $("a")
            .map((i, link) => link.attribs.href)
            .get()
        
        await processLinks(baseUrl, links)
        
        return urls

    } catch (e) {

        console.error(e)

    }

}

export default Crawler