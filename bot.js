const fs = require('fs');
const Discord = require('discord.js');
const {prefix , token} = require('./config.json');

const active = new Map();

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for(const file of commandFiles)
{
    const command = require(`./commands/${file}`);
    let commandnames = command.name.split(',');
    for(i = 0; i < commandnames.length; i++)
    {
        client.commands.set(commandnames[i] , command);
        //console.log('Set Command:' + commandnames[i]);
    }
}


client.once('ready', ()=>
{
    console.log('Ready!');
});

client.on('message' , (message) => 
{
    var args = "";
    var command = "";
    console.log(message.content);
    if (message.content.startsWith(prefix))
    {
        args = message.content.slice(prefix.length).split(/ +/);
        command = args.shift().toLowerCase();
    }
    else if(message.isMentioned(client.user))
    {
        args = message.content.slice(client.user.id.length + 4).split(" ");
        command = args.shift().toLowerCase();
    }

    console.log(command);

	if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(message, args, active, client);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});

client.login(token);