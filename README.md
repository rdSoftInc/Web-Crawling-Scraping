# Web-Crawling-Scraping

A web crawler & scraper, to crawl & scrap websites for relevant sites & data...

# Required Packages

run "npm install" cmd in the terminal

# Command to run 

node ./src/index.js

# Tasks - ✅ - Completed | 🟧 - In Progress | 🔲 - Not Started 

Task 1 : Build a basic node js server & implement a web crawler function to find links & sub-links for a given url & store it in a json file ✅ - Rolstan

Run the script with cmd as "node src/index.js" & wait for it to finish, once execution completes, find the urls stored in prerequisites/horizon.json file for further analysis.

Task 2 : Analyze the urls stored in prerequisites/horizon.json file & create pre-data fetch filter for processing required information. ✅ - Robin & Giyosiddin 

Successfully identified the non essential urls & the pre-data-fetch filter parameters.

Task 3 : Create data model to support the required data for the base urls. ✅ - Robin & Rolstan

Created a js data model to capture enough data for initial stage. 

Task 4 : Build a web scraper to scrape data from the urls obtained from the web crawler. ✅ - Rolstan & Robin

Task 5 : Create a function to connect to a firebase database & data validation ✅ - Giyosiddin

Task 6 : Connect the function of scraping data & data validation to store data in the firebase database - ✅ - Robin & Giyosiddin 

Task 7 : Edit store-local.js function to make sure unique & only new urls are stored in the horizon.json file. ✅ - Rolstan

Task 8 : Crawl all the urls provided in urls.json file as a base url, so the above tasks can be performed for each base url. ✅ - Rolstan

Task 9 : Implement depth limit search for urls ✅ - Rolstan

Task 10 : Modify Scrapper.js or Create a script just to upload the events.json data to db ✅ - Giyosiddin & Robin

