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
			name: 'leet',
      aliases: ['lt'],
			group: 'fun',
			memberName: 'leet',
			description: 'S3ND5 7H3 5P3CIFI3D M355463 IN 1337ZORZ.',
      args: [
		{
			key: 'text',
            prompt: 'What do you want me to leetify?',
            type: "string",
		},
	],
		});
	}

	async run(message, { text }) {
    if (!text) return message.embed(errembed);
    message.say(leet.convert(text));
	}
};
