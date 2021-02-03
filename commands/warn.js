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

//commande /warn
if(!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send(`${message.author} Vous n'avez pas les permissions d'utiliser cette commande ! `);
    if(!message.mentions.users.first()) return message.channel.send(` ${message.author} Vous devez mentionner un membre à avertir ! `)
    let mention = message.mentions.members.first();
    let utilisateur = message.mentions.users.first().id;
    if(mention.hasPermission("ADMINISTRATOR")) return message.channel.send(` ${message.author} Vous ne pouvez pas avertir ce membre ! `)

    if(bdd["warn"][utilisateur] == 2){
        delete bdd["warn"][utilisateur];
        message.guild.members.ban(utilisateur);
        message.channel.send("Le membre a été banni ! ");
        savebdd();
    }
    else{
        if(!bdd["warn"][utilisateur]){
            bdd["warn"][utilisateur] = 1;
            savebdd();
            message.channel.send(`<@!${utilisateur}>, tu as été avertis par ${message.author}, Tu es maintenant à ${bdd["warn"][utilisateur]} avertissement !`);
        } else {
            bdd["warn"][utilisateur]++;
            savebdd();
            message.channel.send(`<@!${utilisateur}>, tu as été avertis par ${message.author}, Tu es maintenant à ${bdd["warn"][utilisateur]} avertissements !`);
        }
    
}

}
module.exports.help = {
    name: 'warn',
};
