const fetch = require("node-fetch");
const Discord = require('discord.js');
const Canvas = require('canvas');
const Image = require('canvas');
const image1 = 'https://static.wikia.nocookie.net/deadbydaylight_gamepedia_en/images/8/8c/S01_charSelect_portrait.png/revision/latest?cb=20200721164239';
const image2 = 'https://static.wikia.nocookie.net/deadbydaylight_gamepedia_en/images/7/77/S02_charSelect_portrait.png/revision/latest?cb=20200721164249';
const image3 = 'https://static.wikia.nocookie.net/deadbydaylight_gamepedia_en/images/6/65/S03_charSelect_portrait.png/revision/latest?cb=20200721164234';
const image4 = 'https://static.wikia.nocookie.net/deadbydaylight_gamepedia_en/images/c/cb/S04_charSelect_portrait.png/revision/latest?cb=20200721164244';
const image5 = 'https://static.wikia.nocookie.net/deadbydaylight_gamepedia_en/images/1/14/S05_charSelect_portrait.png/revision/latest?cb=20200721164259';
const image6 = 'https://static.wikia.nocookie.net/deadbydaylight_gamepedia_en/images/c/cc/S06_charSelect_portrait.png/revision/latest?cb=20200721164309';
const image7 = 'https://static.wikia.nocookie.net/deadbydaylight_gamepedia_en/images/9/9f/S07_charSelect_portrait.png/revision/latest?cb=20200721164319';
const image8 = 'https://static.wikia.nocookie.net/deadbydaylight_gamepedia_en/images/6/66/S08_charSelect_portrait.png/revision/latest?cb=20200721164326';
const image9 = 'https://static.wikia.nocookie.net/deadbydaylight_gamepedia_en/images/a/ac/S09_charSelect_portrait.png/revision/latest?cb=20200721164421';
const image10 = 'https://static.wikia.nocookie.net/deadbydaylight_gamepedia_en/images/5/57/S10_charSelect_portrait.png/revision/latest?cb=20200721164450';
const image11 = 'https://static.wikia.nocookie.net/deadbydaylight_gamepedia_en/images/b/b2/S11_charSelect_portrait.png/revision/latest?cb=20200721164337';
const image12 = 'https://static.wikia.nocookie.net/deadbydaylight_gamepedia_en/images/1/15/S12_charSelect_portrait.png/revision/latest?cb=20200721164348';
const image13 = 'https://static.wikia.nocookie.net/deadbydaylight_gamepedia_en/images/1/19/S13_charSelect_portrait.png/revision/latest?cb=20200721164359';
const image14 = 'https://static.wikia.nocookie.net/deadbydaylight_gamepedia_en/images/e/e1/S14_charSelect_portrait.png/revision/latest?cb=20200721164409';
const image15 = 'https://static.wikia.nocookie.net/deadbydaylight_gamepedia_en/images/b/b9/S15_charSelect_portrait.png/revision/latest?cb=20200721164507';
const image16 = 'https://static.wikia.nocookie.net/deadbydaylight_gamepedia_en/images/d/d7/S16_charSelect_portrait.png/revision/latest?cb=20200721164524';
const image17 = 'https://static.wikia.nocookie.net/deadbydaylight_gamepedia_en/images/7/78/S17_charSelect_portrait.png/revision/latest?cb=20200721164518';
const image18 = 'https://static.wikia.nocookie.net/deadbydaylight_gamepedia_en/images/0/0e/S18_charSelect_portrait.png/revision/latest?cb=20200721164545';
const image19 = 'https://static.wikia.nocookie.net/deadbydaylight_gamepedia_en/images/7/75/S19_charSelect_portrait.png/revision/latest?cb=20200721164551';
const image20 = 'https://static.wikia.nocookie.net/deadbydaylight_gamepedia_en/images/3/35/S20_charSelect_portrait.png/revision/latest?cb=20200721164558';
const image21 = 'https://static.wikia.nocookie.net/deadbydaylight_gamepedia_en/images/3/3d/S21_charSelect_portrait.png/revision/latest?cb=20200721164613';
const image22 = 'https://static.wikia.nocookie.net/deadbydaylight_gamepedia_en/images/3/38/S22_charSelect_portrait.png/revision/latest?cb=20200721164624';
const image23 = 'https://static.wikia.nocookie.net/deadbydaylight_gamepedia_en/images/2/2e/S23_charSelect_portrait.png/revision/latest?cb=20200820001351';
const image24 = 'https://static.wikia.nocookie.net/deadbydaylight_gamepedia_en/images/4/45/S24_charSelect_portrait.png/revision/latest?cb=20210307122333';
const image25 = 'https://static.wikia.nocookie.net/deadbydaylight_gamepedia_en/images/7/79/S25_charSelect_portrait.png/revision/latest?cb=20210307122429';
const image26 = 'https://static.wikia.nocookie.net/deadbydaylight_gamepedia_en/images/9/99/S26_charSelect_portrait.png/revision/latest?cb=20210529095206';
const image27 = 'https://static.wikia.nocookie.net/deadbydaylight_gamepedia_en/images/5/5d/S27_charSelect_portrait.png/revision/latest?cb=20210529095201';
const imagePerkTeachableModifier = '_Teachable.png'

//Local path names & modifier to end the file path
let APIlink = 'http://localhost:3000/Survivors'
let APIPerklink = 'http://localhost:3000/Perks'
let APIlinknickmodifier = '?nick='
let APIlinknamemodifier = '?name='
let APIPerkLinkModifier = '?associatedDisplayName='

module.exports = {
	name: 'survivor',
	aliases: ['s'],
	description: 'This command is for fetching survivor information',

  execute(message, args){
    console.log('Received Survivor information request')

    if(message.channel.id != '858834437525078096'){
			return null;
		}
		else{
		//Check if arguments were provided
    	if(!args.length){
      	message.channel.send("You did not provide a survivor name!")
    	}
    	else if (args.length == 1) {
        argsString = args.join("").replace(/\s/g, '')
				argsString = argsString.toLowerCase()
        console.log(argsString)
				obtainSurvivorData(message, argsString);
    	}

			//Handling command if two or more arguments were provided by combining them into a single string
    	else if (args.length >= 2) {
				argsString = args.join("").replace(/\s/g, '')
				argsString = argsString.toLowerCase()

        obtainSurvivorData(message, argsString);
    	}
		}
	}
};

  function obtainSurvivorData(message, argsString, APIdata){
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
                message.reply('Unable to locate that Survivor. Please check spelling or formatting.')
              }
              else{
                console.log(APIdata)
                obtainThumbnailData(message, argsString, APIdata)
              }
            })
        }
        else{
          // console.log('Made it this far at least')
          console.log(APIlink + APIlinknickmodifier + APIdata.nick)
          obtainThumbnailData(message, argsString, APIdata)
        }
      })
  }

  function obtainThumbnailData(message, argsString, APIdata){
    console.log('nick is currently: ' + APIdata.nick)
    switch(APIdata.nick){
      case 'dwight':
      survivorThumbnailImage = image1
      break;
      case 'meg':
      survivorThumbnailImage = image2
      break;
      case 'claudette':
      survivorThumbnailImage = image3
      break;
      case 'jake':
      survivorThumbnailImage = image4
      break;
      case 'nea':
      survivorThumbnailImage = image5
      break;
      case 'laurie':
      survivorThumbnailImage = image6
      break;
      case 'ace':
      survivorThumbnailImage = image7
      break;
      case 'bill':
      survivorThumbnailImage = image8
      break;
      case 'feng':
      survivorThumbnailImage = image9
      break;
      case 'david':
      survivorThumbnailImage = image10
      break;
      case 'quentin':
      survivorThumbnailImage = image11
      break;
      case 'tapp':
      survivorThumbnailImage = image12
      break;
      case 'kate':
      survivorThumbnailImage = image13
      break;
      case 'adam':
      survivorThumbnailImage = image14
      break;
      case 'jeff':
      survivorThumbnailImage = image15
      break;
      case 'jane':
      survivorThumbnailImage = image16
      break;
      case 'ash':
      survivorThumbnailImage = image17
      break;
      case 'nancy':
      survivorThumbnailImage = image18
      break;
      case 'steve':
      survivorThumbnailImage = image19
      break;
      case 'yui':
      survivorThumbnailImage = image20
      break;
      case 'zarina':
      survivorThumbnailImage = image21
      break;
      case 'cheryl':
      survivorThumbnailImage = image22
      break;
      case 'felix':
      survivorThumbnailImage = image23
      break;
      case 'elodie':
      survivorThumbnailImage = image24
      break;
      case 'yun-jin':
      survivorThumbnailImage = image25
      break;
      case 'jill':
      survivorThumbnailImage = image26
      break;
      case 'leon':
      survivorThumbnailImage = image27
      break;
    }

		//Obtain perk information based on survivor
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

        CreateSurvivorPerkImage(message, APIdata, SortedPerkData, survivorThumbnailImage)
      })

  }

  async function CreateSurvivorPerkImage(message, APIdata, SortedPerkData, survivorThumbnailImage){
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
  	MessageInfo(message, argsString, APIdata, survivorThumbnailImage, SortedPerkData, PerkImage)
  };

  function MessageInfo(message, argsString, APIdata, survivorThumbnailImage, SortedPerkData, PerkImage){
		if(APIdata.DLC === true){
			const SurvivorInfo = new Discord.MessageEmbed()
	        .setImage('attachment://PerkImage.png')
	        .setColor('#ffffff')
	        .setTitle(APIdata.displayName)
	        .setDescription('**Perks**\n' + 'Level 30 teachable: ' + SortedPerkData[0].displayName + '\n' + 'Level 35 teachable: ' + SortedPerkData[1].displayName + '\n' + 'Level 40 teachable: ' + SortedPerkData[2].displayName)
					.addFields(
						{name:'Wiki page', value: `[${APIdata.displayName} wiki page](${APIdata.wiki})`},
						{name:'Chapter', value: `[${APIdata.chapter}](${APIdata.chapterStorePage})`}
					)
					.setThumbnail(survivorThumbnailImage)
	        .setFooter('Unfamiliar with a perk? Use !perk (perk name) to learn more.')
	    message.channel.send({files: [PerkImage],embed: SurvivorInfo});
		}
		else{
			const SurvivorInfo = new Discord.MessageEmbed()
	        .setImage('attachment://PerkImage.png')
	        .setColor('#ffffff')
	        .setTitle(APIdata.displayName)
	        .setDescription('**Perks**\n' + 'Level 30 teachable: ' + SortedPerkData[0].displayName + '\n' + 'Level 35 teachable: ' + SortedPerkData[1].displayName + '\n' + 'Level 40 teachable: ' + SortedPerkData[2].displayName)
					.addFields(
						{name:'Wiki page', value: `[${APIdata.displayName} wiki page](${APIdata.wiki})`},
						{name:'Chapter', value: `${APIdata.displayName} is part of the base game`}
					)
					.setThumbnail(survivorThumbnailImage)
	        .setFooter('Unfamiliar with a perk? Use !perk (perk name) to learn more.')
	    message.channel.send({files: [PerkImage],embed: SurvivorInfo});
		}



  }
