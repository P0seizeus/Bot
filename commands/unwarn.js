const Discord = require("discord.js");
const fs = require('fs');
const { PREFIX } = require("../config.js");
const message = require("../events/message.js");
module.exports.run = async (client, message, args) => {

    /// create a const bdd = to the file of the data base
const bdd = require("../bdd.json")
/// create a function Savebdd() to save the data base
function savebdd() {
    fs.writeFile("./bdd.json", JSON.stringify(bdd, null, 4), (err) => {
     if (err) message.channel.send("Une erreur est survenue.");
    });
    }

//commande /unwarn

    if(!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send(`${message.author} Vous n'avez pas les permissions d'utiliser cette commande ! `)
    let mention = message.mentions.members.first()
    let utilisateur = message.mentions.users.first().id;    
    if(mention.hasPermission("ADMINISTRATOR")) return message.channel.send(`${message.author} je ne peux pas retirer les avertissements de ce membre ! `)

    if(bdd["warn"][utilisateur] === 0) return message.channel.send(`${message.author} Vous ne pouvez pas enlever d'avertissement à ce membre, il a déjà 0 avertissement ! `);
    bdd["warn"][utilisateur]--;
    message.channel.send(`<@!${utilisateur}>, Un avertissement t'as été retiré par ${message.author}, Tu es maintenant à ${bdd["warn"][utilisateur]} avertissement(s) !`);
    savebdd();

}


module.exports.help = {
    name: 'unwarn',
};


