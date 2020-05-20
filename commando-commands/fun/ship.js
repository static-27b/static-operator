const { Command } = require('discord.js-commando')
const { MessageEmbed } = require('discord.js');
const errembed = new MessageEmbed()
.setTitle(`${process.env.OS_NAME} | ERR!`)
.setDescription("An error has been located!\nThis could have happened due to `missing argument, you are missing permissions, or I am lacking permissions.`\nIf this error persists and you have all then necessary arguments, permissions, etc.\nPlease contact joeywoah_#5364.")
.setColor('#ff0000');
module.exports = class ShipCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'ship',
      aliases: ['lovecheck'],
      group: 'fun',
      memberName: 'say',
      description: 'Ships the mentioned people.',
      args: [
		{
			key: 'ship1',
            prompt: 'Who do you want to kick?',
            type: "member",
        },
        {
            key: 'ship2',
            prompt: 'Why do you want to kick them?',
            type: 'string'
        },
	],
    });
  }
  async run(message, { ship1, ship2 }) {
    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
      }
      let me = message.author;
      const percent = getRandomInt(10);
               
      let barSize = 10
      let empty = barSize - percent;
      let taken = "🥰".repeat(percent);
      let nottaken = "💔".repeat(empty);
      
    
      let pres = "ERR! UNABLE TO PROCESS MESSAGE!";
               if (percent < 5) pres = "💔 Not Compatible... Sadness.";
               if (percent > 5) pres = "😁 Compatible! Go get them!";
              const loveembed = new MessageEmbed()
      .setTitle(`${process.env.OS_NAME} | Compatibility`)
      .setDescription(`[${taken}${nottaken}] - ${percent}/10\n${pres}\nThank you for using the Crystelian Love Module.`)
      .setColor(`#${process.env.EMB_COLOR}`);
               message.say(`**${process.env.OS_NAME} Love Module | Compatibility**\n🔽${ship1}\n🔼${ship2}`)
               message.embed(loveembed);
    }
}
