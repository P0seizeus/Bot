const Discord = require('discord.js');
const token = require("./token.json")
const fs = require("fs");
const bdd = require("./bdd.json");
const moment = require('moment');

const bot = new Discord.Client();

bot.on("ready", async () =>{
    console.log("Le bot est allumé");
    bot.user.setStatus ("online");
    setTimeout(() => {
        bot.user.setActivity("se développer", {type: 'PLAYING'});
    }, 100)
});
    
bot.on("message", async message => {
   //commande /clear
   if(message.content.startsWith("/clear")){
    message.delete();
    if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(` ${message.author} Vous ne pouvez pas éxécuter cette commande !`);
    let args = message.content.trim().split(/ +/g);
    if(args[1]) {
        if(!isNaN(args[1]) && args[1] >= 1 && args[1] <= 99) {
            message.channel.bulkDelete(args[1])
            message.channel.send(` ${message.author.username} vous avez supprimé ${args[1]} message(s)`);
        }
    } else{
        message.channel.send(`${message.author} vous devez indiquer une valeur entre 1 et 99 !`)
    }
}

//commande /warn
if(message.content.startsWith("/warn")){
    if(!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send(`${message.author} Vous n'avez pas les permissions d'utiliser cette commande ! `);
    if(!message.mentions.users.first()) return message.channel.send(` ${message.author} Vous devez mentionner un membre à avertir ! `)
    let mention = message.mentions.members.first();
    let utilisateur = message.mentions.users.first().id;
    if(mention.hasPermission("ADMINISTRATOR")) return message.channel.send(` ${message.author} Je ne peux pas avertir les administrateurs`)

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
            message.channel.send("<@"+utilisateur+"> Tu as à présent " + bdd["warn"][utilisateur] + " avertissement(s)");
        } else {
            bdd["warn"][utilisateur]++;
            savebdd();
            message.channel.send("<@"+utilisateur+">Tu as à présent " + bdd["warn"][utilisateur] + " avertissements")
        }
    }
}

//commande /unwarn
if(message.content.startsWith("/unwarn")){
    if(!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send(`${message.author} Vous n'avez pas les permissions d'utiliser cette commande`)
    let mention = message.mentions.members.first()
    let utilisateur = message.mentions.users.first().id;    
    if(mention.hasPermission("ADMINISTRATOR")) return message.channel.send(`${message.author} je ne peux pas retirer les avertissements de ce membre ! `)

    if(bdd["warn"][utilisateur] === 0) return message.channel.send(`${message.author} Vous ne pouvez pas enlever d'avertissement à ce membre, il a déjà 0 avertissement`);
    bdd["warn"][utilisateur]--;
    message.channel.send("<@"+utilisateur+"> vous êtes maintenant à " + bdd["warn"][utilisateur] + " avertissement(s) ");
    savebdd();
}

//commande /infoserveur
if(message.content.startsWith("/infoserveur")){
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

if (message.content.startsWith("/userinfo")) {
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

if (message.content.startsWith('/ban')){
    const args = message.content.trim().split(/ +/g)
    /// check if the member has the permissions to ban a member
if(!message.member.hasPermission('MENTION_EVERYONE')) return message.channel.send("Vous n'avez pas les permissions !")
/// create a const BanMember = to a mentions of a member
const BanMember = message.mentions.members.first()
/// check if the member mention a another member
if(!BanMember) return message.channel.send("Vous devez mentionner un membre !")
/// check if the member is highest to the BanMember
if(BanMember.hasPermission("ADMINISTRATOR")) return message.channel.send("Je ne peux pas bannir les administrateurs")
if (message.member.roles.highest.comparePositionTo(BanMember.roles.highest) < 1) return message.channel.send("Vous ne pouvez pas bannir un membre au dessus de vous !")
/// check if the bot can ban this member
if(!BanMember.bannable) return message.channel.send("Je peux pas bannir ce membre ! ")
/// create a const BanReason = to the reason of the ban
const BanReason = args.slice(1).join(" ")
/// check if he specify a reason
if(!BanReason) return message.channel.send("Tu dois préciser une raison ! ")
/// ban the member
message.guild.members.ban(BanMember.id, {
 reason: `${BanReason}`,
}).then(() => {
   message.channel.send(`${BanMember} a été banni pour ${BanReason} !`)
})

};

if (message.content.startsWith('/kick')){
    const args = message.content.trim().split(/ +/g)
    if(!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send("Vous n'avez pas les permissions !")
 /// on définit le membre à bannir comme étant la première mention d'un membre
 const KickMember = message.mentions.members.first()
 /// on vérifie si il y a une mention sinon on retourne
 if(!KickMember) return message.channel.send("Tu dois mentionner un membre")
 /// si le membre a kick est plus élevé que celui qui fait la commande, on retourne
 if (message.member.roles.highest.comparePositionTo(KickMember.roles.highest) < 1) return message.channel.send("Vous ne pouvez pas kick un membre au dessus de vous !")
 if(KickMember.hasPermission("ADMINISTRATOR")) return message.channel.send("Je ne peux pas Kick les administrateurs")
    /// on vérifie si le bot peut kick le membre
    if(!KickMember.kickable) return message.channel.send("Je ne peux pas kick ce membre")
    /// on demande une raison du kick
    const KickReason = args.slice(1).join(" ")
    if(!KickReason) return message.channel.send("Vous devez mentionner la raison du kick")
    /// le bot kick le membre
    KickMember.kick(KickMember.id, {
        reason: `${KickReason}`
    }).then(() => {
        message.channel.send(`${KickMember} à bien été kick ${KickReason}`)
    })
}

    if(message.content.startsWith('/tempban')) {
        message.delete()
                let mention = message.mentions.members.first()
               
            let arg = message.content.trim().split(/ +/g)

            utilisateur = message.mentions.members.first();
            temps = arg[2];
            raison = arg[3];
            if(!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send(`${message.author} Vous n'avez pas les permissions !`)
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
            if(message.channel.type === "dm"){
          

                if (message.author.bot) return;
                const channel = bot.channels.cache.get('806236828360769598')
                const author = message.author.tag
                const content = message.content
                channel.send(`Message reçu de ${author}: \n ${content} `);
                }
                

})
function savebdd() {
fs.writeFile("./bdd.json", JSON.stringify(bdd, null, 4), (err) => {
 if (err) message.channel.send("Une erreur est survenue.");
});
}
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

fs.readdir("./events/", (error, f) => {
    if (error) console.log(error);
    console.log(`${f.length} events en chargement`);

    f.forEach((f) => {
        const events = require(`./events/${f}`);
        const event = f.split(".")[0];

        client.on(event, events.bind(null, client));
    });

});
    
    

bot.login(token.token);