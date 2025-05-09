const { ImageResponse } = require('@vercel/og');
const fetch = require('node-fetch');

module.exports = async (req, res) => {
    try {
        const response = await fetch('https://random-quotes-freeapi.vercel.app/api/random');
        const data = await response.json();
        const { quote, author } = data;

        return new ImageResponse(
            (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '800px',
                        height: '200px',
                        backgroundColor: '#f0f0f0',
                        fontFamily: 'Arial',
                        color: '#000',
                    }}
                >
                    <p style={{ fontSize: '24px', textAlign: 'center' }}>{quote}</p>
                    <p style={{ fontSize: '18px', textAlign: 'center' }}>-- {author}</p>
                </div>
            ),
            {
                width: 800,
                height: 200,
            }
        );
    } catch (error) {
        console.error(error);
        return new ImageResponse(
            (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '800px',
                        height: '200px',
                        backgroundColor: '#ffeeee',
                        color: '#ff0000',
                        fontFamily: 'Arial',
                        fontSize: '24px',
                    }}
                >
                    Error loading quote
                </div>
            ),
            {
                width: 800,
                height: 200,
            }
        );
    }
};