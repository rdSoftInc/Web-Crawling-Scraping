
// imported npm packages...

import fetch from 'node-fetch'

import { load } from 'cheerio'

// initializing variables

let i = 0

const seenUrls = {}

const urls = []

const maxDepth = 1

// function to find sublinks of links found

async function processLinks(baseUrl, links, depth) {

    for (const link of links) {

        if (link.startsWith('/') && link.length > 1) {

            await Crawler(baseUrl, baseUrl + link, depth + 1)

        } else if (link.includes('http') && link.includes('/events/') && !link.includes('archive') && !link.includes('gallery')) {

            await Crawler(baseUrl, link, depth + 1)

        }

    }

}

// web crawler function 

const Crawler = async (baseUrl, url, depth = 0) => {

    if (!url.includes(baseUrl) || depth > maxDepth) {
        return;
    }

    if (seenUrls[url]) { 
        
        return

    }

    if (!url.includes('event')) {

        return

    }

    if (url.includes('archive') || url.includes('gallery') || url.includes('kategorie') || url.includes('bremen') || url.includes('dresden') || url.includes('hamburg') || url.includes('leipzig') || url.includes('dusseldorf') || url.includes('erfurt') || url.includes('frankfurt') || url.includes('hanover') || url.includes('keel') || url.includes('cologne') || url.includes('magdeburg') || url.includes('mainz') || url.includes('munich') || url.includes('potsdam') || url.includes('rostock') || url.includes('saarbrücken') || url.includes('stuttgart')) {

        return

    }

    console.log(`Crawling depth ${depth}... ${url}`);

    if (url !== null) {
        urls.push(url)
    }

    seenUrls[url] = true

    try {

        const response = await fetch(url)

        const html = await response.text()

        const $ = load(html);

        const links = $("a")
            .map((i, link) => link.attribs.href)
            .get()
        
        await processLinks(baseUrl, links, 0)
        
        return urls

    } catch (e) {

        console.error(e)

    }

}

export default Crawler