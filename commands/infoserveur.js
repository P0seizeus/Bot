const Discord = require("discord.js");
const { PREFIX } = require("../config.js");
const message = require("../events/message.js");
module.exports.run = async (client, message,) => {


//commande /infoserveur
    const embedstats = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle(message.guild.name)
        .addFields(
            { name: "Propriétaire du serveur: ", value: `${message.guild.owner}`, inline: true },
            { name: "Identifiant: ", value: message.guild.id, inline: true },
            { name: "Membres: ", value: message.guild.members.cache.size, inline: false },
            { name: 'Membres en ligne: ', value: message.guild.members.cache.filter(({ presence }) => presence.status !== 'offline').size, inline: false },
            { name: 'Rôles:',value: message.guild.roles.cache.size, inline: true },
            { name: 'Salons:', value: message.guild.channels.cache.size, inline: true },
            { name: "Région: ", value: message.guild.region, inline: true },
            { name: 'Boost', value: `Nombre de boosts: \(${message.guild.premiumSubscriptionCount})\` /   Niveau: \`${message.guild.premiumTier}`, inline: false },
            { name: 'Création du serveur:', value: message.guild.createdAt, inline: false },
        )
        .setImage(message.guild.iconURL())
        .setTimestamp()
        .setFooter('https://cdn.discordapp.com/attachments/787466507943673886/790555829463416872/image0.jpg');
    message.channel.send(embedstats);


}

module.exports.help = {
    name: 'infoserv',
};