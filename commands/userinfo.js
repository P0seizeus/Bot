const Discord = require("discord.js");
const { PREFIX } = require("../config.js");
const message = require("../events/message.js");
const moment = require('moment');
module.exports.run = async (client, message,) => {

 
        if(message.mentions.users.first()) {
           user = message.mentions.users.first(); 
        } else{
            user = message.author;
        }
        const member = message.guild.member(user);
    
        const embed = new Discord.MessageEmbed()
        .setColor('#ff5555')
        .setThumbnail(user.avatarURL)
        .setTitle(`Information sur ${user.username}#${user.discriminator} :`)
        .addField('ID du compte:', `${user.id}`, true)
        .addField('Pseudo sur le serveur :', `${member.nickname ? member.nickname : 'Aucun'}`, true)
        .addField('A crée son compte le :', `${moment.utc(member.createAt).format('dddd, MMMM do YYYY, HH:mm:ss')}`, true)
        .addField('A rejoint le serveur le :', `${moment.utc(member.joineAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`, true)
        .addField('Status :', `${user.presence.status}`, true)
        .addField('Joue a :', `${user.presence.game ? user.presence.game.name : 'Rien'}`, true)
        .addField('Roles :', member.roles.cache.map(roles => `${roles.name}`).join(', '), true)
        .addField(`En réponse a :`,`${message.author.tag}`)
    message.channel.send(embed);   
    }

module.exports.help = {
    name: 'userinfo',
};