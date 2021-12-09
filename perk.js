// Set global variables & requirements
const fetch = require("node-fetch");
const Discord = require('discord.js');
const fs = require('fs');
const path = require('path');
//Local path names & modifier to end the file path
let APIlink = 'http://localhost:3000/Perks'
let APIlinkmodifier = '?name='
const imagePerkIconModifier = "_IconPerks.png"

//Command information
module.exports = {
	name: 'perk',
	aliases: ['p',],
	description: 'This command is for fetching perk information',

	execute(message, args) {
		argsString = args[0].toLowerCase()
    console.log('Received perk request')

		if(message.channel.id != '858834437525078096'){
			return null;
		}
		else{
		//Check if arguments were provided
    	if(!args.length){
      	message.channel.send("You did not provide a perk name!")
    	}
    	else if (args.length == 1) {
				fetch(APIlink + APIlinkmodifier + argsString)
					.then(res => res.json())
					.then(data => {
						APIdata = data[0]
						MessageInfo(message, argsString, APIdata);
			 		})

    	}

			//Handling command if two or more arguments were provided by combining them into a single string
    	else if (args.length >= 2) {
				argsString = args.join("").replace(/\s/g, '')
				argsString = argsString.toLowerCase()

				//Reaching out to JSON server to fetch information based on arguments provided
				fetch(APIlink + APIlinkmodifier + argsString)
					.then(res => res.json())
					.then(data => {
						APIdata = data[0]
						MessageInfo(message, argsString, APIdata);
					})
    	}
		}
	}
};

//Creating the Embed message based on API data
function MessageInfo(message, argsString, APIdata){

	//If API data has no information in it (I.E. it wasn't able to find anything based on arguments provided)
	if(APIdata === undefined){message.reply('Unable to locate that perk. Please check spelling or formatting.')
		return null;}
	//If API data does contain information
	else{
	const PerkInfo = new Discord.MessageEmbed()
		.attachFiles(['./icons/perks/' + APIdata.imageName + imagePerkIconModifier])
		.setThumbnail('attachment://' + APIdata.imageName + imagePerkIconModifier)
		.setColor('#ffffff')
		.setAuthor('Perk description')
		.setTitle(APIdata.displayName)
		.setDescription(APIdata.tag + ' Perk for ' + APIdata.associatedDisplayName)
		.addFields(
			{name: 'Description', value: APIdata.description}
		)
		.setFooter('Bolded text refers to values that change as the Perk increases in Tier.')
	message.channel.send(PerkInfo);
	}
}
