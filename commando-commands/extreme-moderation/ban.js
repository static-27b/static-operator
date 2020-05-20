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


module.exports = class BanCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'ban',
      aliases: ['banish'],
			group: 'extreme-moderation',
			memberName: 'ban',
      description: 'Bans the mentioned member.',
      clientPermissions: ['BAN_MEMBERS'],
	    userPermissions: ['BAN_MEMBERS'],
		});
	}

	async run(message) {
    const args = message.content.slice(this.client.commandPrefix.length).trim().split(/ +/g);
    const Reason = args.slice(2).join(" ");
    const member = message.mentions.members.first() || this.client.users.cache.get(args[0])
    const logsChannel = this.client.channels.cache.find(ch => ch.name === `${config.forcedlogs}`);
    if (!logsChannel) message.guild.channels.create(`${config.forcedlogs}`, { type: 'text' }).catch(console.error);
    await message.guild.members.ban(`${member}`, {reason: `${Reason}`})
            .catch(error => message.say(`Sorry ${message.author} I couldn't ban because of : ${error}`))
        const banlog = new MessageEmbed()
		.setTitle(`${process.env.OS_NAME} | Ban`)
		.setDescription("Banned")
		.setColor(`#${process.env.EMB_COLOR}`)
    .setFooter(this.client.user.username, this.client.user.displayAvatarURL())
    .setThumbnail(this.client.user.displayAvatarURL())
		.addField("**> Moderator | Administrator:**", `${message.author}`)
		.addField("**> Member Banned:**", `${member}`)
		.addField("**> Reason:**", `${Reason}`);
    const banned = new MessageEmbed()
		.setTitle(`${process.env.OS_NAME} | Ban`)
		.setColor(`#${process.env.EMB_COLOR}`)
    .setFooter(this.client.user.username, this.client.user.displayAvatarURL())
    .setThumbnail(this.client.user.displayAvatarURL())
    .setDescription(`**> ${message.author}**, You have banned ${member} from the server for ${Reason}!`)
    .addField("**> Banned Member ID:**", `${member.id}`)
    .addField("**> Moderator | Administrator:**", `${message.author.id}`)
    .addField("**> Reason for banishment:**", `${Reason}`);
          message.embed(banned)
    logsChannel.send(banlog)
  }
};
