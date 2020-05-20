const { getMember, formatDate } = require('../../functions.js');
const { MessageEmbed } = require("discord.js");
const { stripIndents } = require('common-tags');
const { Command } = require('discord.js-commando')
const errembed = new MessageEmbed()
.setTitle("StaticOS | ERR!")
.setDescription("An error has been located!\nThis could have happened due to `missing argument, you are missing permissions, or I am lacking permissions.`\nIf this error persists and you have all then necessary arguments, permissions, etc.\nPlease contact joeywoah_#5364.")
.setColor('#ff0000');
const fetch = require('node-fetch')

module.exports = class WhoIsCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'whois',
      aliases: ['who', "userinfo"],
			group: 'info',
			memberName: 'whois',
			description: 'Returns the information about a user.',
		});
	}

	async run(message) {
        const args = message.content.slice(this.client.commandPrefix.length).trim().split(/ +/g);
                const member = getMember(message, args.join(" "));
                // Member Info
                const joined = formatDate(member.joinedAt);
                const roles = member.roles.cache
                .filter(r => r.id !== message.guild.id)
                .map(r => r)
                .join(", ") || "none";
        
                //User Info
                const created = formatDate(member.user.createdAt);
        
                const embed = new MessageEmbed()
                .setFooter(member.displayName, member.user.displayAvatarURL())
                .setThumbnail(member.user.displayAvatarURL)
                .setColor(member.displayHexColor === "#000000" ? "#ffffff" : member.displayHexColor)
                
                .addField('Member Information', stripIndents`**> Display Name:** ${member.displayName}
                **> Joined at:** ${joined}
                **> Roles:** ${roles}`, true)
        
                .addField('User Information', stripIndents`**> ID:** ${member.user.id}
                **> Username:** ${member.user.username}
                **> Discord Tag:** ${member.user.tag}
                **> Created at:** ${created}`, true)
        
                .setTimestamp()
        
                if(member.user.presence.game)
                embed.addField('**> Playing/Listening/Watching/Streaming:**', stripIndents`${member.user.presence.game.name}`)
        
                message.embed(embed);
    
	}
};
