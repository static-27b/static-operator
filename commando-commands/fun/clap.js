const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

const fetch = require('node-fetch')
const { stripIndents } = require('common-tags');
const leet = require('leet');

module.exports = class ClapCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'clap',
      aliases: ['sass', 'clapify'],
			group: 'fun',
			memberName: 'slap',
            description: 'Claps the text you put!',
		});
	}

	async run(message) {
        const errembed = new MessageEmbed()
            .setTitle(`${process.env.OS_NAME} | ERROR!`)
            .setColor(`#${process.env.EMB_COLOR}`)
            .setThumbnail(this.client.user.displayAvatarURL())
            .setDescription(`Looks like you've recieved a error! Here are some possible reasons this might happen!`)
            .setFooter(this.client.user.username, this.client.user.displayAvatarURL())
            .setAuthor(`${message.guild.name} | ${message.guild.id}`, message.guild.iconURL())
            .addField('Missing Argument', `A \`Missing Argument\` is the cause of a missing user input. If you need help with something user ${this.client.commandPrefix}help or @${this.client.user.tag} help!`)
            .addField('Missing Permissions', `A \`Missing Permission\` error is the cause of a permission that you may not have. If you aren't allowed to use this command. Then don't. Simple :)`)
            .addField('Client Permissions', `A \`Client Permissions\` error is the cause of the client/bot not having sufficient permissions in this guild/server! Please fix this if you wish to run this command!`)
        const args = message.content.slice(this.client.commandPrefix.length).trim().split(/ +/g);
        let claptext = args.slice(1).join(' 👏 ');
        if (!claptext) message.embed(errembed);
        message.say(claptext)
	}
};
