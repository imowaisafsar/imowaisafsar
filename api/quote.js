const fetch = require('node-fetch');
const { createCanvas } = require('canvas');

module.exports = async (req, res) => {
    try {
        const response = await fetch('https://api.quotable.io/random');
        const data = await response.json();
        const { content: quote, author } = data;

        const canvas = createCanvas(800, 200);
        const ctx = canvas.getContext('2d');

        // Draw background
        ctx.fillStyle = '#f0f0f0';
        ctx.fillRect(0, 0, 800, 200);

        // Draw quote
        ctx.font = '24px Arial';
        ctx.fillStyle = '#000';
        ctx.textAlign = 'center';
        ctx.fillText(quote, 400, 100);

        // Draw author
        ctx.font = '18px Arial';
        ctx.fillText(`-- ${author}`, 400, 150);

        const buffer = canvas.toBuffer('image/png');
        res.setHeader('Content-Type', 'image/png');
        res.send(buffer);
    } catch (error) {
        res.status(500).send('Error generating quote image');
    }
};