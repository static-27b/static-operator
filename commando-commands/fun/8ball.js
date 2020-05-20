const { MessageEmbed } = require('discord.js');
const errembed = new MessageEmbed()
.setTitle(`StaticOS | ERR!`)
.setDescription("An error has been located!\nThis could have happened due to `missing argument, you are missing permissions, or I am lacking permissions.`\nIf this error persists and you have all then necessary arguments, permissions, etc.\nPlease contact joeywoah_#5364.")
.setColor('#ff0000');

const { Command } = require('discord.js-commando')
module.exports = class BallCommand extends Command {
	constructor(client) {
		super(client, {
			name: '8ball',
      aliases: ['answer', "question"],
			group: 'fun',
			memberName: '8ball',
			description: 'Answers your question.',
		});
	}

	async run(message) {
        var responses = ["As I see it, yes.", "Ask again later.", "Better not tell you now.", "Cannot predict now.", "Concentrate and ask again.", "Don’t count on it.", "It is certain.", "It is decidedly so.", "Most likely.", "My reply is no.", "My sources say no.", "Outlook not so good.", "Outlook good.", "Reply hazy, try again.", "Signs point to yes.", "Very doubtful.", "Without a doubt.", "Yes.", "Yes – definitely.", "You may rely on it."]
var answer = responses[Math.floor(Math.random()*responses.length)];
const response = new MessageEmbed()
.setColor(`#${process.env.EMB_COLOR}`)
.setFooter(this.client.user.username, this.client.user.displayAvatarURL())
.setDescription(`${answer}`);
message.embed(response);
    }
}
