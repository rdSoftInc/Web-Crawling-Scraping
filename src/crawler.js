
import fetch from 'node-fetch'

import { load } from 'cheerio'

const seenUrls = {}

const urls = []

const crawl = async (baseUrl, url) => {

    if (seenUrls[url]) return

    if (!url.includes('events') || url.includes('gallery')) return

    console.log("Crawling", url)

    urls.push(url)

    seenUrls[url] = true

    const response = await fetch(url)

    const html = await response.text()

    const $ = load(html);

    const links = $("a")
        .map((i, link) => link.attribs.href)
        .get()
    
    links
        .forEach((link) => {

        if (link.startsWith('#')) {
            
            return
        
        } else if (link.startsWith('/')) {

            crawl(baseUrl, baseUrl + link)

        } else if (link.includes('http')) {

            crawl(baseUrl, link)

        } 
        
        })

}

export default { crawl, urls }