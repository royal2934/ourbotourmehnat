const Discord = require("discord.js");
const mongoose = require("mongoose");
const config = require("./config");
const GuildSettings = require("./models/settings");
const Dashboard = require("./dashboard/dashboard");
const economy = require("./models/bal"); 
const fs = require("fs");
const client = new Discord.Client();
client.commands = new Discord.Collection(); 
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const events = new Discord.Collection();
//---------------------------------------------imports----------------------------------------------------

mongoose.connect(config.mongodbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

console.log(config.mongodbUrl)

for(const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command)

} 


//-----------------------------------------------------mongo-connection-----------------------------------------
client.config = config;

['cmdhandler.js', 'eventhandler.js'].forEach(
  handler => {
    require(`./handlers/${handler}`)(client, Discord)
  }
)

client.on("ready", () => {
  console.log(`Bot is ready. (${client.guilds.cache.size} Guilds - ${client.channels.cache.size} Channels - ${client.users.cache.size} Users)`);
  Dashboard(client);
});


//-------------------------------on-message-event and command handler-------------------------------------------------




// Listening for error & warn events.
client.on("error", console.error);
client.on("warn", console.warn);

// We login into the bot.
client.login(config.token);