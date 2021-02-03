const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const { TOKEN, PREFIX } = require("./config.js");
const bdd = require("./bdd.json");
const message = require('./events/message.js');
client.login(TOKEN);
 
client.commands = new Discord.Collection();
fs.readdir("./commands/", (error, f) => {
    if (error) console.log(error);

    let commandes = f.filter(f => f.split(".").pop() === "js");
    if (commandes.length <= 0) return console.log("aucune commande trouvé dans le dossier");

    commandes.forEach((f) => {
        let commande = require(`./commands/${f}`);
        console.log(`${f} commande chargée !`);
        client.commands.set(commande.help.name, commande);

    });
    
}
);

client.on("ready", async () =>{
    console.log("Le bot est allumé");
    client.user.setStatus ("online");
    setTimeout(() => {
    client.user.setActivity("se développer", {type: 'PLAYING'});
    }, 100)
});

fs.readdir("./events/", (error, f) => {
    if (error) console.log(error);
    console.log(`${f.length} events en chargement`);

    f.forEach((f) => {
        const events = require(`./events/${f}`);
        const event = f.split(".")[0];

        client.on(event, events.bind(null, client));
    });

});

client.on("message", message => {
    if(message.channel.type === "dm"){
          

        if (message.author.bot) return;
        const channel = client.channels.cache.get('806236828360769598')
        const author = message.author.tag
        const content = message.content
        channel.send(`Message reçu de ${author}: \n ${content} `);
        }
})