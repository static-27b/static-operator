const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const errembed = new MessageEmbed()
.setTitle("StaticOS | ERR!")
.setDescription("An error has been located!\nThis could have happened due to `missing argument, you are missing permissions, or I am lacking permissions.`\nIf this error persists and you have all then necessary arguments, permissions, etc.\nPlease contact joeywoah_#5364.")
.setColor('#ff0000');
const fetch = require('node-fetch')
const { stripIndents } = require('common-tags');

module.exports = class AvatarCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'avatar',
      aliases: ['av', 'pfp'],
			group: 'info',
			memberName: 'avatar',
			description: 'Replies with the Avatar from with account provided.',
      args: [
		{
			key: 'mentions',
            prompt: 'Who\'s account avatar do you want?',
            type: "user",
            default: message => message.author
		},
	],
		});
	}

	async run(message, { mentions }) {
        if(!mentions) {
          let sicon = message.author.avatarURL()
		  const embedav1 = new MessageEmbed()
		  .setColor(`#${process.env.EMB_COLOR}`)
		  .setTitle(`${process.env.OS_NAME} | Avatar`)
		  .setDescription(`${message.author}'s Avatar`)
		  .setImage(sicon)
		  .setThumbnail(this.client.user.displayAvatarURL())
		  .setFooter(this.client.user.username, this.client.user.displayAvatarURL());
          message.channel.send(embedav1)
        } else {
          let sicon = mentions.displayAvatarURL()
		  const embedav2 = new MessageEmbed()
		  .setColor(`#${process.env.EMB_COLOR}`)
		  .setTitle(`${process.env.OS_NAME} | Avatar`)
		  .setDescription(`${mentions}'s Avatar`)
		  .setImage(sicon)
		  .setThumbnail(this.client.user.displayAvatarURL())
		  .setFooter(this.client.user.username, this.client.user.displayAvatarURL());
          message.channel.send(embedav2)
		}
	}
};
