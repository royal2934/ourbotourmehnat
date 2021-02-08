const Discord = require("discord.js");
const mongoose = require("mongoose");
const config = require("../../config");
const GuildSettings = require("../../models/settings");
const Dashboard = require("../../dashboard/dashboard");
const economy = require("../../models/bal"); 
const fs = require("fs");
const Levels = require('discord-xp')


Levels.setURL(config.mongodbUrl)

module.exports = async(Discord, client, message) => {
    
    const reply = (...arguments) => message.channel.send(...arguments);

    // Doing some basic command logic.
    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.channel.permissionsFor(message.guild.me).has("SEND_MESSAGES")) return;
   
    // Retriving the guild settings from database.
    var storedSettings = await GuildSettings.findOne({ gid: message.guild.id });
    var economysettings = await economy.findOne({ gid: message.guild.id, userid: message.author.id });
    if (!economysettings){
      const neweconomySettings = new economy({
        gid: message.guild.id,
        userid: message.author.id 
        
      }); 
      await neweconomySettings.save().catch(()=>{});
    }
    if (!storedSettings) {
      // If there are no settings stored for this guild, we create them and try to retrive them again.
      const newSettings = new GuildSettings({
        gid: message.guild.id
      });
      await newSettings.save().catch(()=>{});
      storedSettings = await GuildSettings.findOne({ gid: message.guild.id });
    }
  
    // If the message does not start with the prefix stored in database, we ignore the message.
    if (message.content.indexOf(storedSettings.prefix) !== 0) return;
  
    // We remove the prefix from the message and process the arguments.
    const args = message.content.slice(storedSettings.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
  
    if(!client.commands.has(command)) return;
    try{ 
      client.commands.get(command).execute(client, message, args, Discord);
    }catch(error){
      const emb = new Discord.MessageEmbed()
      .setColor('#ff554')
      .settitle('Error Catched') 
      .setDescription('there was a error while executing the command pls wait for the owner to fix it')
      message.channel.send(emb);
    }
    
    
    const randomXP = Math.floor(Math.random() *9) + 1;
    const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomXP);
    if (hasLeveledUp) {
      const user = await Levels.fetch(message.author.id, message.guild.id);
      message.channel.send(`${message.author} You leveled up to ${user.level}! Keep it going!`);
  }
  
              
      

}