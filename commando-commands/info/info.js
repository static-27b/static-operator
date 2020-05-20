const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const errembed = new MessageEmbed()
.setTitle("StaticOS | ERR!")
.setDescription("An error has been located!\nThis could have happened due to `missing argument, you are missing permissions, or I am lacking permissions.`\nIf this error persists and you have all then necessary arguments, permissions, etc.\nPlease contact joeywoah_#5364.")
.setColor('#ff0000');
const fetch = require('node-fetch')
const { stripIndents } = require('common-tags');
const leet = require('leet');

module.exports = class LeetCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'info',
      aliases: ['botinfo'],
			group: 'info',
			memberName: 'info',
			description: 'Sends information about the bot!',
		});
	}

	async run(message) {
    const embed = new MessageEmbed()
    .setColor(`#${process.env.EMB_COLOR}`)
    .setTitle(`${process.env.OS_NAME} | Bot Information`)
    .setDescription(`Thank you for using ${this.client.user.username}! The prefix is ${this.client.commandPrefix} or @${this.client.user.tag} and just add help to see the bot commands!\nThis bot is owned by <@${this.client.owner}> and developed by <@630817206145646602>!\n`)
    .addField('Developer:', `<@630817206145646602>`)
    .addField('Owner:', `<@${this.client.owner}>`)
    .addField('Github Repository:', `Soon to be added to github!`)
    .addField('Support Server:', `https://invite.gg/apolloisland`)
    .addField('Community Sever:', `https://discord.gg/Tg9naT5`)
    .addField('Versions:', '\u200b')
    .addField('Discord.js', 'v12.2.0')
    .addField('Discord.js Commando', 'v0.11.0')
    message.embed(embed)
	}
};