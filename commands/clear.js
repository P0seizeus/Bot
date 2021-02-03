const Discord = require("discord.js");
const { PREFIX } = require("../config.js");
const message = require("../events/message.js");
module.exports.run = async (client, message,) => {
    const args = message.content.slice(PREFIX.length).trim().split(/ +/g);

    //commande /clear
    if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(`${message.author} Vous n'avez pas les permissions d'utiliser cette commande ! `);
    
    if(args[1]) {
        if(!isNaN(args[1]) && args[1] >= 1 && args[1] <= 99) {
            message.channel.bulkDelete(args[1])
            message.channel.send(` ${message.author} vous avez supprimé ${args[1]} message(s) ! `);
        }
        
    } else{
    
        message.channel.send(`${message.author} vous devez indiquer une valeur entre 1 et 99 !`)
    }
}


module.exports.help = {
    name: 'clear',
};
