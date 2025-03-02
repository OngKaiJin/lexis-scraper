# lexis-scraper
Scraping files in the website of LexisNexis , https://advance.lexis.com/.
## Usage
### Get documents
Log in to the site, open preferably https://advance.lexis.com/toc/?pdtocfullpath=%2Fshared%2Ftableofcontents%2Furn%3AcontentItem%3A5RC3-WK81-FG5X-F000-00000-00.

In console, run [getdocsMLJR.js](https://github.com/OngKaiJin/lexis-scraper/blob/main/getdocsMLJR.js) to get documents' information structurally according to its table of contents. See [sample](https://github.com/OngKaiJin/lexis-scraper/blob/main/examples/getdocsMLJR%2026-02-2025.json).
### Get PDFs
In console, run [list.js](https://github.com/OngKaiJin/lexis-scraper/blob/main/list.js) to filter so leaving only id without structure.

In console, run [getpdfs.js](https://github.com/OngKaiJin/lexis-scraper/blob/main/getpdfs.js) to get PDF's URN as it runs through and read from each document. The site will refresh every 4 hours when running so run ```list``` and copy the progress before time. In the next run, redefine ```list``` with last progress, then run again but change the number in the function to closer and below. See [sample](https://github.com/OngKaiJin/lexis-scraper/blob/main/examples/getpdfs%2028-02-2025.json).

In console, run [listplain.js](https://github.com/OngKaiJin/lexis-scraper/blob/main/listplain.js) to filter so leaving a plain list of PDFs' URN. Then, save result in a file e.g. ```command.txt```.
### Download PDFs
Log in to account, and copy ```lna2``` manually from inspect's network tab.

Launch terminal at desired folder path. 

In terminal, run the below to set a cookie (replace the value in ```lna2```). A ```cookiefile``` will be created.
```command
curl "https://advance.lexis.com" -b lna2=ZDZjNmVmMDhmY2QwZmQxMzMwNzQ3NDUyMjEyMTljNDY5MDM3ZjRhNDVkNTMyNWY2NDYzOTJkZDBhMDAxN2I2NzY3YzM4Y2Q1dXJuOnVzZXI6UEExOTUwMjU5MzAhMTAwMDIwMiwxNTIyNDY4LCFub25l -c cookiefile
```
Then, run the below to download PDFs. Each download will modify the ```cookiefile```.
```command
for /f "usebackq tokens=*" %i in (`more "E:\Malayan Law Journal\command.txt"`) do curl "https://advance.lexis.com/r/documentprovider/gvx3k/attachment/data?attachmentid=urn:contentItem:%i&attachmenttype=PDF&attachmentname=OriginalSourceImage&origination=BlobStore&sequencenumber=1&ishotdoc=false" -o "%i" -b cookiefile -c cookiefile
```
