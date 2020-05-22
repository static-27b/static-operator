
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
const wordfilter = new Keyv(
    "sqlite://settings.sqlite",
    { namespace: "wordfilter" }
  );

module.exports = class SetConfigCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'setconfig',
      aliases: ['setconf'],
			group: 'configurations',
			memberName: 'setconfig',
            description: 'Sets the server configuration.',
            args: [
                {
                    key: 'configuration',
                    prompt: 'What do you want me to set? Choose `modlog, logging, reporting, or blacklist`.',
                    type: 'string',
                    oneOf: ['modlog', 'logging', 'reporting', 'bl', 'wordfilter']
                },
                {
                    key: 'newvalue',
                    prompt: 'What do you want to set this to?',
                    type: 'string',
                }
            ],
		});
	}

	async run(message, { configuration, newvalue }) {
        if (configuration === "modlog") {
        await modlogchannel.set(message.guild.id, newvalue);
        }
        if (configuration === "logging") {
        await logging.set(message.guild.id, newvalue);
        }
        if (configuration === "reporting") {
        await reporting.set(message.guild.id, newvalue);
        }
        if (configuration === "blacklist") {
        await blacklist.set(message.guild.id, newvalue);
        }
        if (configuration === "wordfilter") {
        await wordfilter.set(message.guild.id, newvalue);
        }

        const embed = new MessageEmbed()
        .setTitle(`${process.env.OS_NAME} | Configurations`)
        .setColor(`#${process.env.EMB_COLOR}`)
        .setAuthor(`${message.guild.name} | ${message.guild.id}`, message.guild.iconURL())
        .setFooter(this.client.user.username, this.client.user.displayAvatarURL())
        .setDescription(stripIndents`I have set the configuration ${configuration} to ${newvalue} for guild ${message.guild.name} with the Discord Server ID ${message.guild.id}.`)
        message.embed(embed)
	}
};