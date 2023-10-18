import { promises as fsPromises } from 'fs';

const filePath = 'prerequisites/events.json';

function isObjectEqual(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}

function mergeData(arrOne, arrTwo) {

    const uniqueData = [];
    
    for (const item of arrTwo) {

        if (!arrOne.some(existingItem => isObjectEqual(existingItem, item))) {

            uniqueData.push(item);

        }

    }
    
    return arrOne.concat(uniqueData);
}

async function storeDataLocal(data) {

    try {

        const existingData = await fsPromises.readFile(filePath, 'utf8');

        const jsonData = JSON.parse(existingData);

        jsonData.data = mergeData(jsonData.data, data);
        
        const updatedJsonData = JSON.stringify(jsonData, null, 2);
        
        await fsPromises.writeFile(filePath, updatedJsonData, 'utf8');

        console.log('\nData stored successfully !!!\n');

    } catch (err) {

        console.error('Error : ', err);

    }
}

export default storeDataLocal;
