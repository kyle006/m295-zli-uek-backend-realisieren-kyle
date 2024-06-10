const http = require('http');
const urls = process.argv.slice(2);

function httpGet(url) {
    return new Promise((resolve, reject) => {
        http.get(url, (response) => {
            let data = '';
            response.setEncoding('utf8');
            response.on('data', (chunk) => { data += chunk; });
            response.on('end', () => resolve(data));
            response.on('error', reject);
        });
    });
}

async function fetchUrls() {
    for (let i = 0; i < urls.length; i++) {
        try {
            const data = await httpGet(urls[i]);
            console.log(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
}

fetchUrls();