
const mongoose = require("mongoose");
const config = require("../config");
const GuildSettings = require("../models/settings");
const Dashboard = require("../dashboard/dashboard");
const economy = require("../models/bal");



module.exports = {
    name: 'bal', 
    description: 'shows the balance of a user', 
    minArgs: 0,  
    maxargs: 1,
    expectedArgs: '[target user`s @]',  
    async execute(client, message, args, Discord){
        const target = message.mentions.users.first() || message.author
        userbal = await economy.findOne({gid: message.guild.id, userid: target.id}) 
        const discordembed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle(`**${message.author.username}'s balance**`) 
        .setDescription(`**Wallet**: ${userbal.coins} ⏣ `)
        message.channel.send(discordembed);
    }
}; 

