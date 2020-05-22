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
const Keyv = require("keyv");
const modlogchannel = new Keyv(
  "sqlite://settings.sqlite",
  { namespace: "modlog" }
);
const logging = new Keyv(
    "sqlite://settings.sqlite",
    { namespace: "logging" }
  );
const reporting = new Keyv(
    "sqlite://settings.sqlite",
    { namespace: "reporting" }
  );
const blacklist = new Keyv(
    "sqlite://settings.sqlite",
    { namespace: "blacklisting" }
  );

module.exports = class GrantCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'grant',
      aliases: ['addrole'],
			group: 'extreme-moderation',
			memberName: 'grant',
			description: 'Give the specified role to the mentioned member.',
			clientPermissions: ['MANAGE_ROLES'],
			userPermissions: ['MANAGE_ROLES'],
      args: [
		{
			key: 'member',
            prompt: 'Who do you want to grant the role to?',
            type: "member",
        },
        {
            key: 'Role',
            prompt: 'What role do you want to grant them?',
            type: 'role'
        },
	],
		});
	}

	async run(message, { member, Role }) {
	const logs = await logging.get(message.guild.id);
	const modlog = await modlogchannel.get(message.guild.id);
	const logsChannel = this.client.channels.cache.find(ch => ch.name === `${modlog}`);
        member.roles.add(Role).catch(console.error)
	    const grantembed = new MessageEmbed()
	    .setTitle(`${this.client.user.username} | Grant`)
	    .setDescription("Granted")
		.setColor(`#${process.env.EMB_COLOR}`)
		.setThumbnail(this.client.user.displayAvatarURL())
	    .setFooter(`Undo this command by doing ${this.client.commandPrefix}revoke <member> <role>`, this.client.user.displayAvatarURL())
	    .addField("Administrator", `${message.author}`)
	    .addField("User role has been granted to", `${member}`)
	    .addField("Granted Role", `${Role}`);
    const grantembedo = new MessageEmbed()
		.setTitle(`${this.client.user.username} | Grant`)
		.setThumbnail(this.client.user.displayAvatarURL())
	    .setDescription(`**${message.author.tag}**, You have granted role ${Role} to user ${member}!`)
	    .setColor(`#${process.env.EMB_COLOR}`)
	    .setFooter(`Undo this command by doing ${this.client.commandPrefix}revoke <member> <role>`, this.client.user.displayAvatarURL());
	message.embed(grantembedo);
	if (logs === "on") {
	logsChannel.send(grantembed)
	}
	}
};
