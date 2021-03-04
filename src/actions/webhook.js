const request = require('request-promise');

const config = require('../../user/config.json');

const {
    sleep
} = require('../utils/tools.js');

module.exports = {
    send: async (color, title, script) => {
        try {
            const embed = {
                embeds: [{
                    color: color,
                    title: title,
                    author: {
                        name: 'Made with <3 by Rock @ StormeIO',
                        icon_url: 'https://i.imgur.com/e5vzoUb.png'
                    },
                    fields: [
                        {
                            name: 'Site',
                            value: 'Supreme',
                        },
                        {
                            name: 'Mod Value',
                            value: JSON.stringify(script.modValue),
                        },
                        {
                            name: 'Script SHA256 Checksum',
                            value: script.shaChecksum,
                        },
                    ],
                    timestamp: new Date(),
                    footer: {
                        text: 'Made with <3 by Rock @ StormeIO',
                        icon_url: 'https://i.imgur.com/e5vzoUb.png',
                    },
                }]
            }

            await request({
                url: config.webhook,
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(embed)
            })
        } catch (e) {
            console.error(`ERR (WHS): ${e.message}`);
            await sleep(config.delay);
            return module.exports.send(color, title, script);
        }
    }
}