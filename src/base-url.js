
// function to get the base url of the url, self built...

function BaseUrl(url) {
    
    const delimiter = '/';
    
    const occurrenceToSplit = 3;
    
    const parts = url.split(delimiter);

    const baseUrl = parts.slice(0, occurrenceToSplit);

    return baseUrl.join(delimiter)
}

export default BaseUrl