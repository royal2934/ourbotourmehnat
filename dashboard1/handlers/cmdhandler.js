const fs = require('fs');



module.exports = (client, Discord) => {
    const command_files = fs.readdirSync(`./commands/`).filter(file => file.endsWith('.js'));
    for(const file of command_files){
      const command = require(`../commands/${file}`);
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

    }
}