const Discord = require('discord.js');
const {PREFIX} = require("../config.js");
const message = require('./message.js');
module.exports = async(client, message) => {
        
    
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;

    if (!message.content.startsWith(PREFIX)) return;
    
    const args = message.content.slice(PREFIX.length).trim().split(/ +/g);
    const commande = args.shift();
    const cmd = client.commands.get(commande);

    if (!cmd) return;
    
    
message.delete()
    return cmd.run(client, message, args);

    
    
};