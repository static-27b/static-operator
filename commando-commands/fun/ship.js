const { Command } = require('discord.js-commando')
const { MessageEmbed } = require('discord.js');
const errembed = new MessageEmbed()
.setTitle(`${process.env.OS_NAME} | ERR!`)
.setDescription("An error has been located!\nThis could have happened due to `missing argument, you are missing permissions, or I am lacking permissions.`\nIf this error persists and you have all then necessary arguments, permissions, etc.\nPlease contact joeywoah_#5364.")
.setColor('#ff0000');
const config = require('../../config.json');

module.exports = class ShipCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'ship',
      aliases: ['lovecheck'],
      group: 'fun',
      memberName: 'say',
      description: 'Ships the mentioned people.',
      throttling: {
        usages: 1,
        duration: 10,
      },
      args: [
		{
			key: 'ship1',
            prompt: 'Who do you want to ship?',
            type: "member",
            default: ''
        },
        {
            key: 'ship2',
            prompt: 'Who do you want to ship them with?',
            type: 'member',
            default: "random"
        },

	],
    });
  }
  async run(message, { ship1, ship2 }) {
    if (ship1) {
    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
      }
      let me = message.author;
      let percent = getRandomInt(10);
               
      let barSize = 10
      let empty = barSize - percent;
      let taken = "🥰".repeat(percent);
      let nottaken = "💔".repeat(empty);

      if (ship2 === "random") {
        const newship2 = message.guild.members.cache.random();
        let pres = "";
               if (percent < 5) pres = "💔 Not Compatible... Sadness.";
               if (percent = 5) pres = "🤔 Who knows! Try your luck again or go tell them!"
               if (percent > 5) pres = "😁 Compatible! Go get them!";
              let loveembed = new MessageEmbed()
      .setTitle(`${process.env.OS_NAME} | Compatibility`)
      .setDescription(`[${taken}${nottaken}] - ${percent}0\n${pres}\nThank you for using the ${process.env.OS_NAME} Love Module.`)
      .setColor(`#${process.env.EMB_COLOR}`);
               await message.say(`**${process.env.OS_NAME} Love Module | Compatibility**\n🔽 \`${ship1.displayName}\`\n🔼 \`${newship2.displayName}\``)
               await message.embed(loveembed);
      } else {
        let pres = "ERR! UNABLE TO PROCESS MESSAGE!";
               if (percent < 5) pres = "💔 Not Compatible... Sadness.";
               if (percent > 5) pres = "😁 Compatible! Go get them!";
              let loveembed = new MessageEmbed()
      .setTitle(`${process.env.OS_NAME} | Compatibility`)
      .setDescription(`[${taken}${nottaken}] - ${percent}0\n${pres}\nThank you for using the ${process.env.OS_NAME} Love Module.`)
      .setColor(`#${process.env.EMB_COLOR}`);
               message.say(`**${process.env.OS_NAME} Love Module | Compatibility**\n🔽 \`${ship1.displayName}\`\n🔼 \`${ship2.displayName}\``)
               message.embed(loveembed);
      }
    }
    if (!ship1) {
      function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
      }
      let me = message.author;
      let percent = getRandomInt(10);
               
      let barSize = 10
      let empty = barSize - percent;
      let taken = "🥰".repeat(percent);
      let nottaken = "💔".repeat(empty);

      if (ship2 === "random") {
        const newship2 = message.guild.members.cache.random();
        let pres = "ERR! UNABLE TO PROCESS MESSAGE!";
               if (percent < 5) pres = "💔 Not Compatible... Sadness.";
               if (percent > 5) pres = "😁 Compatible! Go get them!";
              let loveembed = new MessageEmbed()
      .setTitle(`${process.env.OS_NAME} | Compatibility`)
      .setDescription(`[${taken}${nottaken}] - ${percent}0\n${pres}\nThank you for using the ${process.env.OS_NAME} Love Module.`)
      .setColor(`#${process.env.EMB_COLOR}`);
               message.say(`**${process.env.OS_NAME} Love Module | Compatibility**\n🔽 \`${message.member.displayName}\`\n🔼 \`${newship2.displayName}\``)
               message.embed(loveembed);
      } else {
        let pres = "ERR! UNABLE TO PROCESS MESSAGE!";
               if (percent < 5) pres = "💔 Not Compatible... Sadness.";
               if (percent > 5) pres = "😁 Compatible! Go get them!";
              let loveembed = new MessageEmbed()
      .setTitle(`${process.env.OS_NAME} | Compatibility`)
      .setDescription(`[${taken}${nottaken}] - ${percent}0\n${pres}\nThank you for using the ${process.env.OS_NAME} Love Module.`)
      .setColor(`#${process.env.EMB_COLOR}`);
               message.say(`**${process.env.OS_NAME} Love Module | Compatibility**\n🔽 \`${message.member.displayName}\`\n🔼 \`${ship2.displayName}\``)
               message.embed(loveembed);
      }
    }
    }
}
