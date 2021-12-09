const Discord = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
	name: 'commands',
	aliases: ['c',],
	description: 'This command is for fetching all valid commands',
	execute(message, args) {
    console.log('Received commands request')
    //console.log(args.length) //used for testing to check if it was properly determining the arguments length

    if(message.channel.id != '856441014062678017')
      return null;
    else fetchCommands(message, args)
	},
};

function fetchCommands(message, args){
  var files = fs.readdirSync('./commands/');
  // console.log(files)
  // message.reply('Console logged')
  generateCommandList(message, args, files)
}

function generateCommandList(message, args, files){

  let cleanedList = [];
  for (file of files){
    cleanedName = file.replace(/\.[^/.]+$/, "")
    cleanedList.push(cleanedName)
  }

  message.reply('Current commands are: ' + '\n' + cleanedList.join('\n'));

}
