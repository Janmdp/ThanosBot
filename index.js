// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');
const { token } = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS] });
client.guilds.fetch();
// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

		const { commandName } = interaction;

	if(await interaction.user.id === await interaction.guild.ownerId || await interaction.user.id === "419840727313285121"){
		
	
		if (commandName === 'ping') {
			await interaction.reply('Pong!');
		} else if (commandName === 'server') {
			await interaction.reply('Server info.');
		} else if (commandName === 'user') {
			await interaction.reply('User info.');
		}
		else if (commandName === 'snap') {
			//console.log("Attempting snap!");
			//Get the server information
			const guil = interaction.guild;
			await guil.members.fetch()
			.then(console.log("fetched members"))
			.catch(console.error);

			await guil.roles.fetch()
			.then(console.log("fetched roles"))
			
			//console.log("retrieved guild")
			//Console log all usernames for debugging
			//guil.members.cache.forEach(member => console.log(member.user.username));
			//Generate an amount of unique numbers equal to 50% of users in the sevrver
			var arr = [];
			while(arr.length < guil.memberCount / 2){
				var r = Math.floor(Math.random() * guil.memberCount);
				if(arr.indexOf(r) === -1) arr.push(r);
			}
	
			let role = guil.roles.cache.find(r => r.id === "993179718838931498");
			arr.forEach(num => {
				if(guil.members.cache.at(num).user.id != "737739166758207499"){
					guil.members.cache.at(num).roles.add(role);
				}
				
				//interaction.channel.send("Has been snapped: " + guil.members.cache.at(num).user.username)
			} );
			


			//console.log(arr);
			await interaction.reply('https://tenor.com/view/thanos-infinity-gauntlet-snap-finger-snap-gif-12502580');
		}
		else if (commandName === 'revive') {
			const guil = interaction.guild;
			await guil.members.fetch()
			.then(console.log("fetched members"))
			.catch(console.error);

			await guil.roles.fetch()
			.then(console.log("fetched roles"))

			let role = guil.roles.cache.find(r => r.id === "993179718838931498");

			guil.members.cache.forEach(member => member.roles.remove(role));
			await interaction.reply('https://tenor.com/view/snap-avengers-end-game-end-game-iron-man-gif-17433565');
		}
		else if(commandName === 'setup'){
			const guil = interaction.guild;

			await guil.roles.fetch()
			.then(console.log("fetched roles"))
			let snappedRole = guil.roles.cache.find(r => r.id === "993179718838931498");

			guil.channels.fetch()
			.then(console.log("fetched channels"));

			guil.channels.cache.forEach(channel => {
				channel.permissionOverwrites.create(snappedRole, {
					VIEW_CHANNEL: false
				})
				.then(channel => console.log(channel.permissionOverwrites.cache.get(snappedRole)));
			})

			await interaction.reply('completed setup');
		}
	}
	else{
		interaction.channel.send("You do not posses the stones.")
;	}
	
});

// Login to Discord with your client's token
client.login(token);