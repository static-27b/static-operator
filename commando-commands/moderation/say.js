const { Command } = require('discord.js-commando')
const { MessageEmbed } = require('discord.js');
const errembed = new MessageEmbed()
.setTitle(`StaticOS | ERR!`)
.setDescription("An error has been located!\nThis could have happened due to `missing argument, you are missing permissions, or I am lacking permissions.`\nIf this error persists and you have all then necessary arguments, permissions, etc.\nPlease contact joeywoah_#5364.")
.setColor('#ff0000');
module.exports = class SayCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'say',
      aliases: ['repeat'],
      group: 'moderation',
      memberName: 'say',
      description: 'Sends the message you supplied as the bot/client.',
      clientPermissions: ['MANAGE_MESSAGES'],
	    userPermissions: ['MANAGE_MESSAGES'],
      args: [
		{
			key: 'say',
            prompt: 'What do you want the bot/client to say?',
            type: 'string'
        },
	],
    });
  }
  async run(message, { say }) {
    message.delete()
      message.say(say)
}
}
