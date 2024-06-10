const express = require('express');
const app = express();
const port = 3000;

app.get('/weather/:plz', async (req, res) => {
    const plz = req.params.plz;
    const url = `https://app-prod-ws.meteoswiss-app.ch/v1/plzDetail?plz=${plz}00`;

    try {
        const response = await fetch(url);
        if (response.status !== 200) {
            console.error(response.status);
            res.status(response.status).send('Error fetching weather data');
            return;
        }

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});