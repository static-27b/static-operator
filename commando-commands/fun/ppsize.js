const { Command } = require('discord.js-commando')
const { MessageEmbed } = require('discord.js');
const errembed = new MessageEmbed()
.setTitle(`StaticOS | ERR!`)
.setDescription("An error has been located!\nThis could have happened due to `missing argument, you are missing permissions, or I am lacking permissions.`\nIf this error persists and you have all then necessary arguments, permissions, etc.\nPlease contact joeywoah_#5364.")
.setColor('#ff0000');
module.exports = class PPCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'pp',
      aliases: ['ppsize'],
      group: 'fun',
      memberName: 'ppsize',
      description: 'Shows how big someones pp is... ikr funny.',
      args: [
		{
			key: 'sizer',
            prompt: 'Whos pp do you want to measure',
            type: "member",
            default: message => message.author
        },
	],
    });
  }
  async run(message, { sizer }) {
    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
      }
          let size = getRandomInt(12);
          const ppsize = new MessageEmbed()
          .setTitle(`${process.env.OS_NAME} | PeePee Size`)
          .setDescription(`${sizer}'s penis size\n8${'='.repeat(size)}D - ${size}in.`)
          .setFooter(this.client.user.username, this.client.user.displayAvatarURL())
          .setColor(`#${process.env.EMB_COLOR}`);
          message.embed(ppsize)
    }
}
