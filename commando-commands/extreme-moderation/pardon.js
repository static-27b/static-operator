const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const errembed = new MessageEmbed()
.setTitle("StaticOS | ERR!")
.setDescription("An error has been located!\nThis could have happened due to `missing argument, you are missing permissions, or I am lacking permissions.`\nIf this error persists and you have all then necessary arguments, permissions, etc.\nPlease contact joeywoah_#5364.")
.setColor('#ff0000');
const fetch = require('node-fetch')
const { stripIndents } = require('common-tags');
const leet = require('leet');
const config = require('../../config.json');

module.exports = class PardonCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'pardon',
      aliases: ['unban'],
			group: 'extreme-moderation',
			memberName: 'pardon',
			description: 'Pardons/unbans the mentioned member.',
      clientPermissions: ['BAN_MEMBERS'],
      userPermissions: ['BAN_MEMBERS'],
      args: [
		{
			key: 'member',
            prompt: 'Who do you want to pardon?',
            type: "integer",
        },
        {
            key: 'Reason',
            prompt: 'Why do you want to give them a pardon?',
            type: 'string'
        },
	],
		});
	}

	async run(message, { member, Reason }) {
    const logsChannel = this.client.channels.cache.find(ch => ch.name === `${config.forcedlogs}`);
    if (!logsChannel) message.guild.channels.create(`${config.forcedlogs}`, { type: 'text' }).catch(console.error);
    await message.guild.members.unban(`${member}`)
            .catch (error => message.say(`Sorry ${message.author} I couldn't pardon them because of : ${error}`))
        const pardonlog = new MessageEmbed()
		.setTitle(`${process.env.OS_NAME} | Pardon`)
		.setDescription("Pardoned")
		.setColor(`#${process.env.EMB_COLOR}`)
    .setFooter(this.client.user.username, this.client.user.displayAvatarURL())
    .setThumbnail(this.client.user.displayAvatarURL())
		.addField("**> Moderator | Administrator:**", `${message.author}`)
		.addField("**> Member Pardoned:**", `<@${member}>`)
		.addField("**> Reason:**", `${Reason}`);
    const unbanned = new MessageEmbed()
		.setTitle(`${process.env.OS_NAME} | Pardon`)
		.setColor(`#${process.env.EMB_COLOR}`)
    .setFooter(this.client.user.username, this.client.user.displayAvatarURL())
    .setThumbnail(this.client.user.displayAvatarURL())
    .setDescription(`**> ${message.author}**, You have pardoned <@${member}> from the server for ${Reason}!`)
    .addField("**> Pardoned Member ID:**", `${member}`)
    .addField("**> Moderator | Administrator:**", `${message.author.id}`)
    .addField("**> Reason for pardon:**", `${Reason}`);
          message.embed(unbanned)
    logsChannel.send(pardonlog)
  }
};
