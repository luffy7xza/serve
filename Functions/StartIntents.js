
const config = require("../config.json");

function AtivarIntents() {

    fetch('https://discord.com/api/v10/users/@me', {
        headers: {
            Authorization: `Bot ${config.token}`,
        },
    })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            const url = `https://discord.com/api/v9/applications/${data.id}`;
            fetch(url, {
                method: "PATCH",
                headers: {
                    Authorization: `Bot ${config.token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "flags": 8953856,
                    "description": `<:7b3f25e1ef36427e9f1860791a25ecff:1250983420431962243> **Gostou desse bot?**\n\n**Adquira em Lkz Store Applications**\nhttps://discord.gg/JMV5SWdpNn`
                }),
            });

        })
}




module.exports = {
    AtivarIntents
}
