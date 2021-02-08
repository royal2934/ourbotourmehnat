
const mongoose = require("mongoose");
const config = require("../config");
const GuildSettings = require("../models/settings");
const Dashboard = require("../dashboard/dashboard");
const economy = require("../models/bal");
const usedcommand = new Set(); 


module.exports = {
    name: 'beg', 
    description: 'gives you some money', 
    minArgs: 0,  
    maxargs: 0,
    async execute(client, message, args, Discord){
        if(usedcommand.has(message.author.id)){
          const emb2 = new Discord.MessageEmbed() 
          .setColor('#55ff8')
          .setDescription('This command is on cooldown for 25 seconds pls try again later')
          message.channel.send(emb2)
        } else {
          user = Math.round(Math.random() * 500)
          userbal = await economy.findOne({gid: message.guild.id, userid: message.author.id})  
          moneytoadd = userbal.coins + user; 
          console.log(moneytoadd); 
          console.log(user); 
          console.log(userbal.coins);
      
          userbalupdated = await economy.findOneAndUpdate({gid: message.guild.id, userid: message.author.id}, { 
            coins: moneytoadd
          })
          const begembed =  new Discord.MessageEmbed() 
          .setColor('#0099ff') 
          .setTitle(`**${message.author.username} hurry up someone just dropped ${user} ⏣ **`) 
      
          message.channel.send(begembed);

          usedcommand.add(message.author.id); 
          setTimeout(() => {
            usedcommand.delete(message.author.id);

          }, 25000);

        }
 
        

    }
}; 