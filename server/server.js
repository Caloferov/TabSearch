const express = require('express');
const app = express();
const https = require('https');
const mockData = require("./mockData")

const mock = mockData.mock;

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const baseUrl = "https://www.googleapis.com/youtube/v3/search?"

const apiKey = "INSERT_YOUR_API_KEY_HERE";
app.get('/search', (req, res) => {
    let maxResults = req.query.maxResults ? req.query.maxResults : '5';
    let type = req.query.type;
    let q = req.query.q;
    let finalURL;
    if (req.query.pageToken) {
        finalURL = baseUrl + "pageToken=" + req.query.pageToken + "&";
    } else {
        finalURL = baseUrl;
    }

    let data = '';
    // Contact the youtube API
    https.get(`${finalURL}part=snippet&maxResults=${maxResults}&type=${type}&q=${q}&key=${apiKey}`, (resp) => {
        resp.on('data', (chunk) => {
            data += chunk;
        });
        resp.on('end', () => {
            res.send(JSON.parse(data));
            // Send mocked data
            // res.send(mock)
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
        res.send(err.message)
    });
})

app.listen(3000);
