const Discord = require("discord.js");
const { PREFIX } = require("../config.js");
const message = require("../events/message.js");
module.exports.run = async (client, message, args) => {

    let mention = message.mentions.members.first()
    utilisateur = message.mentions.members.first();

     /// check if the member has the permissions to ban a member
if(!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send(`${message.author} Vous n'avez pas les permissions d'utiliser cette commande ! `)
/// create a const BanMember = to a mentions of a member
    const BanMember = message.mentions.members.first()
/// check if the member mention a another member
    if(!BanMember) return message.channel.send(`${message.author} Vous devez mentionner quelqu'un à bannir ! `)
/// check if the member is highest to the BanMember
if(mention.hasPermission("ADMINISTRATOR")) return message.channel.send(`${message.author} Vous ne pouvez pas bannir ce membre ! `)
/// ban the member
message.channel.send(`${message.author} vous avez banni ${utilisateur} ! `)
message.guild.members.ban(utilisateur.id);
}
module.exports.help = {
    name: 'ban',
};
