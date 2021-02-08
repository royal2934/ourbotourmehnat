const mongoose = require("mongoose");
const config = require("../config");
const GuildSettings = require("../models/settings");
const Dashboard = require("../dashboard/dashboard");
const economy = require("../models/bal");
const usedcommand = new Set(); 
const Levels = require('discord-xp'); 
const canvacord = require('canvacord')






module.exports = {
    name: 'rank', 
    description: 'show the rank of a user', 
    async execute(client, message, args, Discord) {
        const target = message.mentions.users.first() || message.author; 
        const user = await Levels.fetch(target.id, message.guild.id);
        const neededxp = Levels.xpFor(parseInt(user.level) + 1)
        console.log(neededxp)

        if (!user) return message.reply('u dont have xp! send some message first');
        
        const rank = new canvacord.Rank()
        .setAvatar(target.displayAvatarURL({ dynamic: false, format: 'png'}))
        .setLevel(user.level)
        .setCurrentXP(user.xp)
        .setRequiredXP(neededxp)
        .setStatus(target.presence.status)
        .setProgressBar('#0099ff', 'COLOR')
        .setUsername(target.username)
        .setDiscriminator(target.discriminator)
        rank.build().then(data => {
            const attachment = new Discord.MessageAttachment(data, 'funny.png')
            message.channel.send(attachment)
        })



        

    }
}