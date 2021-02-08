const punishments = require('../models/mod');

module.exports = {
    name: 'warn', 
    description: 'warns a user',
    aliases: ['w', 'warns'], 
    async execute(client, message, args, Discord) {
        const toWarn = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(" ") || x.user.username === args[0]) 

        if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            const emb = Discord.MessageEmbed()
            .setdescription('u dont have enough permisson to execute this command ')
            return message.channel.send(emb); 

        }

        if(message.author.id === toWarn.id) return;
        let reason = args.slice(1).join(" ")
        if(!reason) return message.channel.send('command execution failed no reason was provided');
        let data = await punishments.findOne({
            GuildID: message.guild.id,
            UserID: toWarn.id
        });

        if(data) {
            data.Punishments.unshift({
                PunishType: 'Warn',
                Moderator: message.author.id,
                Reason: reason,
            });
            data.save();
            const embi = new Discord.MessageEmbed()
            .setColor('#ff005')
            .setDescription(`${toWarn} has been warned by ${message.author.username} for ${reason}`)
            message.channel.send(embi);

        } else if (!data) {
            let newData = new punishments({
                GuildID: message.guild.id,
                UserID: toWarn.id,
                Punishments: [{
                    PunishType: 'Warn',
                    Moderator: message.author.id,
                    Reason: reason,
                }, ],
            });
            newData.save();
    
            const emb1 = new Discord.MessageEmbed()
            .setColor('#ff550') 
            .setdescription(`**${toWarn} has been warned by ${message.author.username} for ${reason}**`)
            message.channel.send(emb1) 
            const emb2 = new Discord.MessageEmbed()
            .setColor('#ff550')
            .setdescription(`**u have been warned in ${message.guild} for ${reason} by ${message.author.username}**`) 
            toWarn.send(emb2);

        }
    }

}