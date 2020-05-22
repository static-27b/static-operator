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
const Keyv = require('keyv');
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

module.exports = class RevokeCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'revoke',
      aliases: ['rmvrole'],
			group: 'extreme-moderation',
			memberName: 'revoke',
			description: 'Revokes the specified role from the mentioned member.',
			clientPermissions: ['MANAGE_ROLES'],
	    	userPermissions: ['MANAGE_ROLES'],
      args: [
		{
			key: 'member',
            prompt: 'Who do you want to revoke the role from?',
            type: "member",
        },
        {
            key: 'Role',
            prompt: 'What role do you want to revoke from them?',
            type: 'role'
        },
	],
		});
	}

	async run(message, { member, Role }) {
		const logs = await logging.get(message.guild.id);
	const modlog = await modlogchannel.get(message.guild.id);
    const logsChannel = this.client.channels.cache.find(ch => ch.name === `${modlog}`);
     member.roles.remove(Role).catch(console.error)
	  const revokeembed = new MessageEmbed()
	  .setTitle(`${process.env.OS_NAME} | Revoke`)
	  .setDescription("Revoked!")
	  .setColor(`#${process.env.EMB_COLOR}`)
	  .setFooter(`Undo this command by doing ${this.client.commandPrefix}grant <member> <role>`, this.client.user.displayAvatarURL())
	  .addField("Administrator", `${message.author}`)
	  .addField("User role has been revoked from", `${member}`)
	  .addField("Revoked Role", `${Role}`);
    const revokeembedo = new MessageEmbed()
	  .setTitle(`${process.env.OS_NAME} | Revoke`)
	  .setDescription(`**${message.author.tag}**, You have revoked role ${Role} from user ${member}!`)
	  .setColor(`#${process.env.EMB_COLOR}`)
	  .setFooter(`Undo this command by doing ${this.client.commandPrefix}grant <member> <role>`, this.client.user.displayAvatarURL());
  message.embed(revokeembedo)
  if (logs === "on") {
	logsChannel.send(revokeembed)
  }
	}
};
