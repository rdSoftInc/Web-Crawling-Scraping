// imported inbuilt packages...

import { promises as fsPromises } from 'fs'

// function to access prerequisites/horizon.json & store the found urls...

const filePath = 'prerequisites/events.json'

// function to remove duplicate data

function mergeData(arrOne, arrTwo) {

    const mergedData = arrOne.concat(arrTwo)

    return Array.from(new Set(mergedData))

}

// function to store urls in prerequisites/events.json file

async function StoreDataLocal(urls) {

    try {

        const data = await fsPromises.readFile(filePath, 'utf8')
    
        const jsonData = JSON.parse(data)

        jsonData.data = mergeData(jsonData.data, urls)
        
        const updatedJsonData = JSON.stringify(jsonData, null, 2)
        
        await fsPromises.writeFile(filePath, updatedJsonData, 'utf8')

        console.log('\nData stored successfully !!!\n');

    } catch (err) {

        console.error('Error : ', err);

    }

}


export default StoreDataLocal