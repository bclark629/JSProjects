const fetch = require("node-fetch");
const Discord = require('discord.js');
const Canvas = require('canvas');
const Image = require('canvas');
const image1 = 'https://static.wikia.nocookie.net/deadbydaylight_gamepedia_en/images/9/9f/K01_charSelect_portrait.png/revision/latest?cb=20200721164223';
const image2 = 'https://static.wikia.nocookie.net/deadbydaylight_gamepedia_en/images/0/0d/K02_charSelect_portrait.png/revision/latest?cb=20200721164229';
const image3 = 'https://static.wikia.nocookie.net/deadbydaylight_gamepedia_en/images/a/a3/K03_charSelect_portrait.png/revision/latest?cb=20200721164218';
const image4 = 'https://static.wikia.nocookie.net/deadbydaylight_gamepedia_en/images/3/31/K04_charSelect_portrait.png/revision/latest?cb=20200721164254';
const image5 = 'https://static.wikia.nocookie.net/deadbydaylight_gamepedia_en/images/0/04/K05_charSelect_portrait.png/revision/latest?cb=20200721164303';
const image6 = 'https://static.wikia.nocookie.net/deadbydaylight_gamepedia_en/images/b/b4/K06_charSelect_portrait.png/revision/latest?cb=20200721164314';
const image7 = 'https://static.wikia.nocookie.net/deadbydaylight_gamepedia_en/images/a/ad/K07_charSelect_portrait.png/revision/latest?cb=20200721164415';
const image8 = 'https://static.wikia.nocookie.net/deadbydaylight_gamepedia_en/images/1/1a/K08_charSelect_portrait.png/revision/latest?cb=20200721165100';
const image9 = 'https://static.wikia.nocookie.net/deadbydaylight_gamepedia_en/images/c/c6/K09_charSelect_portrait.png/revision/latest?cb=20200721164443';
const image10 = 'https://static.wikia.nocookie.net/deadbydaylight_gamepedia_en/images/f/f7/K10_charSelect_portrait.png/revision/latest?cb=20200721164332';
const image11 = 'https://static.wikia.nocookie.net/deadbydaylight_gamepedia_en/images/c/c7/K11_charSelect_portrait.png/revision/latest?cb=20200721164341';
const image12 = 'https://static.wikia.nocookie.net/deadbydaylight_gamepedia_en/images/e/e1/K12_charSelect_portrait.png/revision/latest?cb=20200721164354';
const image13 = 'https://static.wikia.nocookie.net/deadbydaylight_gamepedia_en/images/b/b0/K13_charSelect_portrait.png/revision/latest?cb=20200721164404';
const image14 = 'https://static.wikia.nocookie.net/deadbydaylight_gamepedia_en/images/a/af/K14_charSelect_portrait.png/revision/latest?cb=20200721164501';
const image15 = 'https://static.wikia.nocookie.net/deadbydaylight_gamepedia_en/images/6/68/K15_charSelect_portrait.png/revision/latest?cb=20200721165053';
const image16 = 'https://static.wikia.nocookie.net/deadbydaylight_gamepedia_en/images/b/bd/K16_charSelect_portrait.png/revision/latest?cb=20200721164531';
const image17 = 'https://static.wikia.nocookie.net/deadbydaylight_gamepedia_en/images/6/6d/K17_charSelect_portrait.png/revision/latest?cb=20200721164539';
const image18 = 'https://static.wikia.nocookie.net/deadbydaylight_gamepedia_en/images/c/c5/K18_charSelect_portrait.png/revision/latest?cb=20200721164845';
const image19 = 'https://static.wikia.nocookie.net/deadbydaylight_gamepedia_en/images/8/84/K19_charSelect_portrait.png/revision/latest?cb=20200721164606';
const image20 = 'https://static.wikia.nocookie.net/deadbydaylight_gamepedia_en/images/9/95/K20_charSelect_portrait.png/revision/latest?cb=20200721164619';
const image21 = 'https://static.wikia.nocookie.net/deadbydaylight_gamepedia_en/images/0/0b/K21_charSelect_portrait.png/revision/latest?cb=20200820001506';
const image22 = 'https://static.wikia.nocookie.net/deadbydaylight_gamepedia_en/images/0/03/K22_charSelect_portrait.png/revision/latest?cb=20210307122322';
const image23 = 'https://static.wikia.nocookie.net/deadbydaylight_gamepedia_en/images/3/3e/K23_charSelect_portrait.png/revision/latest?cb=20210307122436';
const image24 = 'https://static.wikia.nocookie.net/deadbydaylight_gamepedia_en/images/8/84/K24_charSelect_portrait.png/revision/latest?cb=20210529095217';
const image25 = 'https://static.wikia.nocookie.net/deadbydaylight_gamepedia_en/images/3/35/K25_charSelect_portrait.png/revision/latest?cb=20210819131518';
const imagePerkTeachableModifier = '_Teachable.png'

//Local path names & modifier to end the file path
let APIlink = 'http://localhost:3000/Killers'
let APIPerklink = 'http://localhost:3000/Perks'
let APIlinknickmodifier = '?nick='
let APIlinknamemodifier = '?name='
let APIPerkLinkModifier = '?associatedDisplayName='

module.exports = {
	name: 'killer',
	aliases: ['k'],
	description: 'This command is for fetching killer information',

  execute(message, args){
    console.log('Received Killer information request')

    if(message.channel.id != '858834437525078096'){
			return null;
		}
		else{
		//Check if arguments were provided
    	if(!args.length){
      	message.reply("You did not provide a killer name! Use !killer (killername)")
    	}
    	else if (args.length == 1) {
        argsString = args.join("").replace(/\s/g, '')
				argsString = argsString.toLowerCase()
        console.log(argsString)
				obtainKillerData(message, argsString);
    	}

			//Handling command if two or more arguments were provided by combining them into a single string
    	else if (args.length >= 2) {
				argsString = args.join("").replace(/\s/g, '')
				argsString = argsString.toLowerCase()

        obtainKillerData(message, argsString);
    	}
		}
	}
};

  function obtainKillerData(message, argsString, APIdata){
    console.log('Fetching information for ' + argsString)
    fetch(APIlink + APIlinknickmodifier + argsString)
      .then(res => res.json())
      .then(data => {
        APIdata = data[0]
        console.log(APIdata)
        if(APIdata === undefined){
          fetch(APIlink + APIlinknamemodifier + argsString)
            .then(res => res.json())
            .then(data => {
              APIdata = data[0]
              if(APIdata === undefined){
                message.reply('Unable to locate that Killer. Please check spelling or formatting.')
              }
              else{
                console.log(APIdata)
                obtainThumbnailData(message, argsString, APIdata)
              }
            })
        }
        else{
          console.log('Made it this far at least')
          console.log(APIlink + APIlinknickmodifier + APIdata.nick)
          obtainThumbnailData(message, argsString, APIdata)
        }
      })
  }

  function obtainThumbnailData(message, argsString, APIdata){
    console.log('nick is currently: ' + APIdata.nick)
    switch(APIdata.nick){
      case 'trapper':
      killerThumbnailImage = image1
      break;
      case 'wraith':
      killerThumbnailImage = image2
      break;
      case 'hillbilly':
      killerThumbnailImage = image3
      break;
      case 'nurse':
      killerThumbnailImage = image4
      break;
      case 'shape':
      killerThumbnailImage = image5
      break;
      case 'hag':
      killerThumbnailImage = image6
      break;
      case 'doctor':
      killerThumbnailImage = image7
      break;
      case 'huntress':
      killerThumbnailImage = image8
      break;
      case 'cannibal':
      killerThumbnailImage = image9
      break;
      case 'nightmare':
      killerThumbnailImage = image10
      break;
      case 'pig':
      killerThumbnailImage = image11
      break;
      case 'clown':
      killerThumbnailImage = image12
      break;
      case 'spirit':
      killerThumbnailImage = image13
      break;
      case 'legion':
      killerThumbnailImage = image14
      break;
      case 'plague':
      killerThumbnailImage = image15
      break;
      case 'ghostface':
      killerThumbnailImage = image16
      break;
      case 'demogorgon':
      killerThumbnailImage = image17
      break;
      case 'oni':
      killerThumbnailImage = image18
      break;
      case 'deathslinger':
      killerThumbnailImage = image19
      break;
      case 'executioner':
      killerThumbnailImage = image20
      break;
      case 'blight':
      killerThumbnailImage = image21
      break;
      case 'twins':
      killerThumbnailImage = image22
      break;
      case 'trickster':
      killerThumbnailImage = image23
      break;
      case 'nemesis':
      killerThumbnailImage = image24
      break;
			case 'pinhead':
      killerThumbnailImage = image25
      break;
    }

    //Obtain perk information based on killer
    fetch(APIPerklink + APIPerkLinkModifier + APIdata.displayName)
      .then(res => res.json())
      .then(data => {
        APIPerkdata = data

        // console.log(APIPerklink + APIPerkLinkModifier + APIdata.displayName)
        // console.log(APIdata)
        console.log(APIPerkdata)


				SortedPerkData = APIPerkdata.sort(function(a, b) {
				return a.teachableLevel - b.teachableLevel;
				});

        CreateKillerPerkImage(message, APIdata, SortedPerkData, killerThumbnailImage)
      })

  }

  async function CreateKillerPerkImage(message, APIdata, SortedPerkData, killerThumbnailImage){
  	     //create a Canvas to work within
         const canvas = Canvas.createCanvas(500, 200);
         const context = canvas.getContext('2d');

  	      //load our images into the Canvas and start layering them
  	       // const perkBackgroundImage = await Canvas.loadImage('./icons/resavedasnewjpg.jpg');
  	       const perkIcon1 = await Canvas.loadImage('./icons/perks/'+ SortedPerkData[0].imageName + imagePerkTeachableModifier);
  	       const perkIcon2 = await Canvas.loadImage('./icons/perks/'+ SortedPerkData[1].imageName + imagePerkTeachableModifier);
  	       const perkIcon3 = await Canvas.loadImage('./icons/perks/'+ SortedPerkData[2].imageName + imagePerkTeachableModifier);
  		       await context.drawImage(perkIcon1, 0, 50, 125, 125);
  		       await context.drawImage(perkIcon2, 150, 50, 125, 125);
  		       await context.drawImage(perkIcon3, 300, 50, 125, 125);

  	//set our finished Canvas to an object to use later
    const PerkImage = new Discord.MessageAttachment(canvas.toBuffer(), 'PerkImage.png');
  	console.log(PerkImage)
  	MessageInfo(message, argsString, APIdata, killerThumbnailImage, SortedPerkData, PerkImage)
  };

  function MessageInfo(message, argsString, APIdata, killerThumbnailImage, SortedPerkData, PerkImage){
		if(APIdata.DLC === true){
			const KillerInfo = new Discord.MessageEmbed()
	        .setImage('attachment://PerkImage.png')
	        .setColor('#ffffff')
	        .setTitle(APIdata.displayName)
	        .setDescription('**Perks**\n' + 'Level 30 teachable: ' + SortedPerkData[0].displayName + '\n' + 'Level 35 teachable: ' + SortedPerkData[1].displayName + '\n' + 'Level 40 teachable: ' + SortedPerkData[2].displayName)
					.addFields(
						{name:'Wiki page', value: `[${APIdata.displayName} wiki page](${APIdata.wiki})`},
						{name:'Chapter', value: `[${APIdata.chapter}](${APIdata.chapterStorePage})`}
					)
					.setThumbnail(killerThumbnailImage)
	        .setFooter('Unfamiliar with a perk? Use !perk (perk name) to learn more.')
	    message.channel.send({files: [PerkImage],embed: KillerInfo});
		}
		else{
			const KillerInfo = new Discord.MessageEmbed()
	        .setImage('attachment://PerkImage.png')
	        .setColor('#ffffff')
	        .setTitle(APIdata.displayName)
	        .setDescription('**Perks**\n' + 'Level 30 teachable: ' + SortedPerkData[0].displayName + '\n' + 'Level 35 teachable: ' + SortedPerkData[1].displayName + '\n' + 'Level 40 teachable: ' + SortedPerkData[2].displayName)
					.addFields(
						{name:'Wiki page', value: `[${APIdata.displayName} wiki page](${APIdata.wiki})`},
						{name:'Chapter', value: `${APIdata.displayName} is part of the base game`}
					)
					.setThumbnail(killerThumbnailImage)
	        .setFooter('Unfamiliar with a perk? Use !perk (perk name) to learn more.')
	    message.channel.send({files: [PerkImage],embed: KillerInfo});
		}
  }
