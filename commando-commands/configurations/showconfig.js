const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const errembed = new MessageEmbed()
.setTitle("StaticOS | ERR!")
.setDescription("An error has been located!\nThis could have happened due to `missing argument, you are missing permissions, or I am lacking permissions.`\nIf this error persists and you have all then necessary arguments, permissions, etc.\nPlease contact joeywoah_#5364.")
.setColor('#ff0000');
const fetch = require('node-fetch')
const { stripIndents } = require('common-tags');
const leet = require('leet');
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

module.exports = class ShowConfigCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'config',
      aliases: ['sconf'],
			group: 'configurations',
			memberName: 'showconfig',
			description: 'Shows the server configurations.',
		});
	}

	async run(message) {
        const modlog = await modlogchannel.get(message.guild.id);
        const logs = await logging.get(message.guild.id);
        const reports = await reporting.get(message.guild.id);
        const blacklists = await blacklist.get(message.guild.id);

        const embed = new MessageEmbed()
        .setTitle(`${process.env.OS_NAME} | Configurations`)
        .setColor(`#${process.env.EMB_COLOR}`)
        .setAuthor(`${message.guild.name} | ${message.guild.id}`, message.guild.iconURL())
        .setFooter(this.client.user.username, this.client.user.displayAvatarURL())
        .setDescription(`Configurations for server ${message.guild.name} with the Discord Guild ID of ${message.guild.id}.`)
        .setThumbnail(this.client.user.displayAvatarURL())
        .addField(`Modlog Configuration:`, `\`[p]setconfig modlog (channel)\``)
        .addField(`Logging Configuration:`, `\`[p]setconfig logging (on|off)\``)
        .addField(`Reports Configuration:`, `\`[p]setconfig reporting (on|off)\``)
        .addField(`Blacklist Configuration:`, `\`[p]setconfig bl (on|off)\``)
        .addField(`Word Filter Configuration:`,  `\`[p]setconfig wordfilter (on|off)\``)
        .addField(`Server Configurations:`, stripIndents`\`\`\`Modlog Channel: ${modlog},
        Logging: ${logs},
        Reporting: ${reports},
        Blacklist: ${blacklists}\`\`\``)
        message.embed(embed)
	}
};