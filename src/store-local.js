// imported inbuilt packages...

import { promises as fsPromises } from 'fs'

// function to access prerequisites/horizon.json & store the found urls...

const filePath = 'prerequisites/horizon.json'

// function to remove duplicate urls

function mergeUrls(arrOne, arrTwo) {

    const mergedUrls = arrOne.concat(arrTwo)

    return Array.from(new Set(mergedUrls))

}

// function to store urls in prerequisites/horizon.json file

async function StoreLocal(urls) {

    try {

        const data = await fsPromises.readFile(filePath, 'utf8')
    
        const jsonData = JSON.parse(data)

        jsonData.seeds = mergeUrls(jsonData.seeds, urls)
        
        const updatedJsonData = JSON.stringify(jsonData, null, 2)
        
        await fsPromises.writeFile(filePath, updatedJsonData, 'utf8')

        console.log('\nUrls stored successfully !!!\n');

    } catch (err) {

        console.error('Error : ', err);

    }

}


export default StoreLocal