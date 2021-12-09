const fetch = require("node-fetch");
const Discord = require('discord.js');
const Canvas = require('canvas');
const Image = require('canvas');
const rouletteThumbnailSurvivor = 'https://static.wikia.nocookie.net/deadbydaylight_gamepedia_en/images/b/b3/IconHelpLoading_survivor.png/revision/latest?cb=20170926082103';
const rouletteThumbnailKiller = 'https://static.wikia.nocookie.net/deadbydaylight_gamepedia_en/images/0/06/IconHelpLoading_killer.png/revision/latest?cb=20170926082027';

let APIlink = 'http://localhost:3000/Perks'
let APIlinkmodifier = '?tag='
const imagePerkIconModifier = "_IconPerks.png"

module.exports = {
	name: 'roulette',
	aliases: ['r',],
	description: 'This command is for generating a randomized perk setup',
	execute(message, args) {
    console.log('Received roulette request')
    //console.log(args.length) //used for testing to check if it was properly determining the arguments length

    if(message.channel.id != '858834437525078096')
      return null;
    else roulette(message, args)
	},
};

function roulette(message, args){

  if(!args.length){
    message.channel.send("Please use the format: !roulette (survivor | killer)");
  }
  else if (args.length == 1) {
    console.log(args[0])
    switch (args[0]){
      case 'survivor':
        console.log('Generate survivor perks here');
				PerkTag = 'Survivor';
				rouletteThumbnail = rouletteThumbnailSurvivor;
				obtainPerkData(message, args, PerkTag, rouletteThumbnail)
        break;
      case 's':
        console.log('Generate survivor perks here');
				PerkTag = 'Survivor';
				rouletteThumbnail = rouletteThumbnailSurvivor;
				obtainPerkData(message, args, PerkTag, rouletteThumbnail)
        break;
      case 'killer':
        console.log('Generate killer perks here');
				PerkTag = 'Killer';
				rouletteThumbnail = rouletteThumbnailKiller;
				obtainPerkData(message, args, PerkTag, rouletteThumbnail)
        break;
      case 'k':
        console.log('Generate killer perks here');
				PerkTag = 'Killer';
				rouletteThumbnail = rouletteThumbnailKiller;
				obtainPerkData(message, args, PerkTag, rouletteThumbnail)
        break;
      default:
        message.reply("Please use the format: !roulette (survivor | killer)")
        break;
    }
  }
  else if (args.length >= 2) {
    message.reply("Please use the format: !roulette (survivor | killer)")
  }
}

function obtainPerkData(message, args, PerkTag, rouletteThumbnail){
	let urlLink = APIlink + APIlinkmodifier + PerkTag
	fetch(APIlink + APIlinkmodifier + PerkTag)
		.then(res => res.json())
		.then(data => {
			PerkList = data
			// MessageInfo(message, argsString, APIdata);
			generateList(message, PerkList, PerkTag, rouletteThumbnail)
		})
}

function generateList(message, PerkList, PerkTag, rouletteThumbnail){
	//determine max and establish min
	max = PerkList.length
	min = 1
	//Generate unique numbers between min and max
	var rouletteList = [];
	var rCheck = [];
	while(rouletteList.length < 4){
    var r = Math.floor(Math.random() * max) + 1;
		// console.log(r);
    if(rCheck.indexOf(r) === -1) {
			rCheck.push(r)
			console.log(rCheck)
			rouletteList.push(PerkList[r])
		}
	}
	CreateRouletteImage(message, rouletteList, PerkTag, rouletteThumbnail);
}

async function CreateRouletteImage(message, rouletteList, PerkTag, rouletteThumbnail){
	//create a Canvas to work within
  const canvas = Canvas.createCanvas(625, 250);
  const context = canvas.getContext('2d');

	console.log(rouletteList)

	//load our images into the Canvas and start layering them
	const perkBackgroundImage = await Canvas.loadImage('./icons/resavedasnewjpg.jpg');
	const perkBorderImage1 = await Canvas.loadImage('./icons/perkBorderImage.png');
	const perkBorderImage2 = await Canvas.loadImage('./icons/perkBorderImage.png');
	const perkBorderImage3 = await Canvas.loadImage('./icons/perkBorderImage.png');
	const perkBorderImage4 = await Canvas.loadImage('./icons/perkBorderImage.png');
	const perkIcon1 = await Canvas.loadImage('./icons/perks/'+ rouletteList[0].imageName + imagePerkIconModifier);
	const perkIcon2 = await Canvas.loadImage('./icons/perks/'+ rouletteList[1].imageName + imagePerkIconModifier);
	const perkIcon3 = await Canvas.loadImage('./icons/perks/'+ rouletteList[2].imageName + imagePerkIconModifier);
	const perkIcon4 = await Canvas.loadImage('./icons/perks/'+ rouletteList[3].imageName + imagePerkIconModifier);
		await context.drawImage(perkBackgroundImage, canvas.width, canvas.height, canvas.width, canvas.height);
		await context.drawImage(perkBorderImage1, 0, 50, 125, 125);
		await context.drawImage(perkBorderImage1, 150, 50, 125, 125);
		await context.drawImage(perkBorderImage1, 300, 50, 125, 125);
		await context.drawImage(perkBorderImage1, 450, 50, 125, 125);
		await context.drawImage(perkIcon1, 0, 50, 125, 125);
		await context.drawImage(perkIcon2, 150, 50, 125, 125);
		await context.drawImage(perkIcon3, 300, 50, 125, 125);
		await context.drawImage(perkIcon4, 450, 50, 125, 125);

	//set our finished Canvas to an object to use later
  const RouletteImage = new Discord.MessageAttachment(canvas.toBuffer(), 'RouletteImage.png');
	console.log(RouletteImage)
	MessageInfo(message, rouletteList, PerkTag, RouletteImage, rouletteThumbnail)
}

function MessageInfo(message, rouletteList, PerkTag, RouletteImage, rouletteThumbnail){

    const RouletteInfo = new Discord.MessageEmbed()
        .setImage('attachment://RouletteImage.png')
        .setColor('#ffffff')
        .setTitle('Roulette for ' + PerkTag)
        .setDescription('**Perks**\n' + rouletteList[0].displayName + '\n' + rouletteList[1].displayName + '\n' +rouletteList[2].displayName + '\n' +rouletteList[3].displayName)
				.setThumbnail(rouletteThumbnail)
        .setFooter('Unfamiliar with a perk? Use !perk (perk name) to learn more.')
    message.channel.send({files: [RouletteImage],embed: RouletteInfo});
}
