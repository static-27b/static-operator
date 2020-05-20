const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const errembed = new MessageEmbed()
.setTitle("StaticOS | ERR!")
.setDescription("An error has been located!\nThis could have happened due to `missing argument, you are missing permissions, or I am lacking permissions.`\nIf this error persists and you have all then necessary arguments, permissions, etc.\nPlease contact joeywoah_#5364.")
.setColor('#ff0000');
const fetch = require('node-fetch')
const { stripIndents } = require('common-tags');
const leet = require('leet');
const ascii = require('ascii-art');

module.exports = class AsciiCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'ascii',
      aliases: ['aii'],
			group: 'fun',
			memberName: 'ascii',
			description: 'Sends the message in ASCII.',
      args: [
		{
			key: 'text',
            prompt: 'What do you want me to asciify?',
            type: "string",
		},
	],
		});
	}

	async run(message, { text }) {
  ascii.font(text, "Doom", function(err, rendered) {
      rendered = rendered.trimRight();
      if (rendered.length > 2000) return message.channel.send(errembed);
      message.channel.send(rendered, {
        code: "md"
      });
    });}
};
