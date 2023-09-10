// imported inbuilt packages...

import { promises as fsPromises } from 'fs'

// function to access prerequisites/horizon.json & store the found urls...

const filePath = 'prerequisites/horizon.json'

async function StoreLocal(urls) {

    try {

        const data = await fsPromises.readFile(filePath, 'utf8')
    
        const jsonData = JSON.parse(data)

        if (urls !== undefined) jsonData.seeds.push(...urls)

        const updatedJsonData = JSON.stringify(jsonData, null, 2)
        
        await fsPromises.writeFile(filePath, updatedJsonData, 'utf8')

        console.log('\n' + (urls !== undefined ? urls.length + ' Urls stored successfully !!!\n' : 'No urls found !!!\n'));

    } catch (err) {

        console.error('Error : ', err);

    }

}


export default StoreLocal