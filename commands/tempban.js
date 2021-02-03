const Discord = require("discord.js");
const { PREFIX } = require("../config.js");
const message = require("../events/message.js");
module.exports.run = async (client, message, args) => {

                let mention = message.mentions.members.first()
               

            utilisateur = message.mentions.members.first();
            temps = args[1];
            raison = args[2];
            if(!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send(`${message.author} Vous n'avez pas les permissions d'utiliser cette commande`)
            if(!utilisateur){
                return message.channel.send(` ${message.author} Vous devez mentionner un membre à bannir ! `);
            }
            if(mention.hasPermission("ADMINISTRATOR")) return message.channel.send(`${message.author} Vous ne pouvez pas bannir ce membre ! `)
            else{
                if(!temps || isNaN(temps)){
                    return message.channel.send(`${message.author} Vous devez indiquer un temps en secondes ! `)
                }else{
                    message.channel.send(`${message.author} vous avez banni ${utilisateur} pendant ${temps} secondes ! `)
                    message.guild.members.ban(utilisateur.id);
                    setTimeout(function(){
                        message.guild.members.unban(utilisateur.id)
                    }, temps*1000);
                }
            }
    

}

module.exports.help = {
    name: 'tempban',
};