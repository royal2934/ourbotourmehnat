const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
require("dotenv").config();
client.commands = new Discord.Collection(); 
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const prefix = process.env.PREFIX


//-----------------------------------------------MODULES-----------------------------------------------------------------------------------------------------//

client.once('ready', () => {
	console.log('Ready!');
});


//-----------------------------------------------START-FUNCTION-----------------------------------------------------------------------------------------------------// 

for(const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}
client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/); 
    const command = args.shift().toLowerCase();
    try{
        client.commands.get(command).execute(message, args);

    }catch(error){
        console.log(error);
        message.reply('a error occured while executing the command')
    }
    

  


});
//-----------------------------------------------COMMANDS-FUNCTION------------------------------------------------------------------------------------------------// 

const token = process.env.TOKEN;
console.log(token)
client.login(`${token}`);