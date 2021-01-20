const { MessageEmbed } = require("discord.js");
const Discord = require('discord.js');
const client = new Discord.Client(); 

module.exports = {
	name: 'ping',
	description: 'Ping!',
	execute(message, args) {
        message.channel.send('pinging....')
        const pingembed = new MessageEmbed()
        .setColor("0x0099ff")
        .addFields(
            { name:  '<a:red:770647287084089354> **bot ping is**', value: `${Date.now() - message.createdTimestamp}ms`},
            { name:  '<a:green:770647253391507456> **api ping is**', value: `${Math.round(client.ws.ping)}ms`}

        )
        message.channel.send(pingembed); 
	}
};