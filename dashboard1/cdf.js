const discord = require('discord.js')
const client = new discord.Client()

client.on("ready", () => {
  console.log(`Bot is ready. (${client.guilds.cache.size} Guilds - ${client.channels.cache.size} Channels - ${client.users.cache.size} Users)`);
  Dashboard(client);
});


//---------------------------------------------------on-ready-event---------------------------------------------

for(const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command)

}

// We listen for message events.
client.on("message", async (message) => {
  // Declaring  reply function for easier replies - we grab all arguments provided into the function and we pass them to message.channel.send function.



}); 

