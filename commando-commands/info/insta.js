const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const errembed = new MessageEmbed()
.setTitle("StaticOS | ERR!")
.setDescription("An error has been located!\nThis could have happened due to `missing argument, you are missing permissions, or I am lacking permissions.`\nIf this error persists and you have all then necessary arguments, permissions, etc.\nPlease contact joeywoah_#5364.")
.setColor('#ff0000');
const fetch = require('node-fetch')
const { stripIndents } = require('common-tags');

module.exports = class InstaCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'instagram',
      aliases: ['insta', 'ig'],
			group: 'info',
			memberName: 'insta',
			description: 'Replies with the Instagram Account provided.',
      args: [
		{
			key: 'name',
			prompt: 'What account would you like me to look for?',
			type: 'string',
		},
	],
		});
	}

	async run(message, { name }) {
	  const url = `https://instagram.com/${name}/?__a=1`;

        const res =  await fetch(url).then(url => url.json())
        
        if (!res.graphql.user.username) {
            return message.channel.send(errembed)
            .then(m => m.delete(5000));
        }

        const account = res.graphql.user;

        const embed = new MessageEmbed()
        .setColor(`#${process.env.EMB_COLOR}`)
        .setTitle(account.full_name)
        .setURL(`https://instagram.com/${name}/`)
        .setThumbnail(account.profile_pic_url_hd)
        .addField("Profile Information", stripIndents`**> Username:** ${account.username}
        **> Full Name:** ${account.full_name}
        **> Biography:** ${account.biography.length == 0 ? "none" : account.biography}
        **> Posts:** ${account.edge_owner_to_timeline_media.count}
        **> Followers:** ${account.edge_followed_by.count}
        **> Following:** ${account.edge_follow.count}
        **> Private Account:** ${account.is_private ? "Yes 🔐" : "Nope 🔓"}`);

        message.embed(embed);
	}
};
