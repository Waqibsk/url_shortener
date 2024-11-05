const shortId = require('shortid');
const URL = require('../models/url');

async function newurl(req, res) {
    const body = req.body;
    if (!body.url) {
        return res.status(400).json({ error: "URL is required" });
    }
    
    const shortID = shortId();  
    await URL.create({
        shortId: shortID,                // Store the generated short ID
        redirectURL: body.url,
        visitedHistory: [],              
    });

    return res.json({ id: shortID });
}

module.exports = {
    newurl,
};
