const Discord = require('discord.js');
const fs = require('fs');
const path = require('path');
let scoreboardchannel = '863548285058416650';
let filename = 'C:/Users/billy/Desktop/Projects/TheEntity/ScoreboardInfo.csv';

module.exports = {
	name: 'scoreboard',
	aliases: ['sb',],
	description: 'This command is for providing a scoreboard for tournaments',
	execute(message, args) {
    console.log('Received scoreboard request')
    //console.log(args.length) //used for testing to check if it was properly determining the arguments length

    if(message.channel.id != scoreboardchannel || args.length > 0)
      {message.delete()
      return;}
    else message.delete()
    console.log('Creating Scoreboard')
    Initialization(message)
	},
};

function Initialization(message){

  //Clear channel of all messages just because we can
  message.channel.messages.fetch({ limit: 100 }).then(messages => {
    console.log('Retrieved message');
    //Iterate through the messages here with the variable "messages".
    messages.forEach(message => message.delete())
  })

  //Call the function to create the Embed message
  MessageScoreboard(message)
}

function MessageScoreboard(message){

  //We got to pull the information BRUH
  var Data = fs.readFileSync(filename).toString()
  var ScoreboardData = Data.split(',')
  // console.log(ScoreboardData);

  //Creating Embed message here
  const Scoreboard = new Discord.MessageEmbed()
		// .attachFiles(['./icons/perks/' + APIdata.imageName + imagePerkIconModifier])
		// .setThumbnail('attachment://' + APIdata.imageName + imagePerkIconModifier)
		.setColor('#ffffff')
		// .setAuthor('Scoreboard for Summer Swelter Games!')
		.setTitle('Scoreboard for the Summer Swelter Games!')
		.setDescription('This scoreboard reflects the score obtained by the Teams and Killers in Gen Rush (GR) & Protect the President (PtP) of the Summer Swelter Games. \n')
		.addFields(
			{name: ScoreboardData[0], value: 'GR-K: ' + ScoreboardData[1] + '\n' + 'GR-T: ' +  ScoreboardData[2] + '\n' + 'PtP-K: ' + ScoreboardData[3] + '\n' + 'PtP-T: ' + ScoreboardData[4] + '\n' + 'Total: ' + ScoreboardData[5], inline: true},
      {name: ScoreboardData[6], value: ScoreboardData[7] + '\n' + ScoreboardData[8] + '\n' + ScoreboardData[9] + '\n' + ScoreboardData[10] + '\n' + ScoreboardData[11], inline: true},
      {name: ScoreboardData[12], value: ScoreboardData[13] + '\n' + ScoreboardData[14] + '\n' + ScoreboardData[15] + '\n' + ScoreboardData[16] + '\n' + ScoreboardData[17], inline: true},
      {name: ScoreboardData[18], value: 'GR-M1: ' + ScoreboardData[19] + '\n' + 'PtP-M1: ' + ScoreboardData[20] + '\n' + 'GR-JM: ' + ScoreboardData[21] + '\n' + 'PtP-JM: ' + ScoreboardData[22] + '\n' + 'GR-NR: ' + ScoreboardData[23] + '\n' + 'PtP-NR: ' + ScoreboardData[24] + '\n' + 'Total: ' + ScoreboardData[25], inline: true},
      {name: ScoreboardData[26], value: ScoreboardData[27] + '\n' +  ScoreboardData[28] + '\n' +  ScoreboardData[29] + '\n' +  ScoreboardData[30] + '\n' +  ScoreboardData[31] + '\n' +  ScoreboardData[32] + '\n' + ScoreboardData[33], inline: true},
		)
		.setFooter('Questions about the scores? Contact Manastryna or BackAlleyLlama')
	message.channel.send(Scoreboard);
}
