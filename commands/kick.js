const Discord = require("discord.js");
const { PREFIX } = require("../config.js");
const message = require("../events/message.js");
module.exports.run = async (client, message, args) => {

        if(!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send(`${message.author} Vous n'avez pas les permissions d'utiliser cette commande ! `)
     /// on définit le membre à bannir comme étant la première mention d'un membre
     const KickMember = message.mentions.members.first()
     /// on vérifie si il y a une mention sinon on retourne
     if(!KickMember) return message.channel.send(`${message.author} Vous devez mentionner une personne à kick !  `)
     if(KickMember.hasPermission("ADMINISTRATOR")) return message.channel.send(`${message.author} Vous ne pouvez pas kick ce membre ! `)
        /// on vérifie si le bot peut kick le membre
        if(!KickMember.kickable) return message.channel.send(`${message.author} Je ne peux pas kick ce membre ! `)
        message.channel.send(`${message.author} Vous avez kick ${KickMember} ! `)
        /// le bot kick le membre
        KickMember.kick();

}

module.exports.help = {
    name: 'kick',
};