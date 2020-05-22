const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const errembed = new MessageEmbed()
.setTitle("StaticOS | ERR!")
.setDescription("An error has been located!\nThis could have happened due to `missing argument, you are missing permissions, or I am lacking permissions.`\nIf this error persists and you have all then necessary arguments, permissions, etc.\nPlease contact joeywoah_#5364.")
.setColor('#ff0000');
const fetch = require('node-fetch')
const { stripIndents } = require('common-tags');
const leet = require('leet');

module.exports = class InviteCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'invite',
      aliases: ['inv'],
			group: 'info',
			memberName: 'invite',
			description: 'Invite this bot!',
		});
	}

	async run(message) {
    const embed = new MessageEmbed()
    .setTitle('🎉✨ | Invite Me!')
    .setAuthor(`${this.client.user.username} | ${this.client.user.id}`, this.client.user.displayAvatarURL())
    .setDescription('You called sir? You wanted an Invite? Sure!')
    .setThumbnail(this.client.user.displayAvatarURL())
    .addField('Click on the title of this embed!', `Or click [here!](https://discordapp.com/oauth2/authorize?client_id=708902278836518973&scope=bot&permissions=410086454)`)
    .setColor(`#${process.env.EMB_COLOR}`)
    .setImage(this.client.user.displayAvatarURL())
    .setFooter(this.client.user.username, this.client.user.displayAvatarURL())
    .setURL('https://discordapp.com/oauth2/authorize?client_id=708902278836518973&scope=bot&permissions=410086454');
    message.embed(embed);
	}
};