const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const errembed = new MessageEmbed()
.setTitle("StaticOS | ERR!")
.setDescription("An error has been located!\nThis could have happened due to `missing argument, you are missing permissions, or I am lacking permissions.`\nIf this error persists and you have all then necessary arguments, permissions, etc.\nPlease contact joeywoah_#5364.")
.setColor('#ff0000');
const fetch = require('node-fetch')
const { stripIndents } = require('common-tags');
const leet = require('leet');
const randomPuppy = require('random-puppy')

module.exports = class LeetCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'meme',
      aliases: ['givememe'],
			group: 'fun',
			memberName: 'meme',
			description: 'Sends a meme for the meme subreddits!',
		});
	}

	async run(message) {
    if (!message.channel.nsfw) return message.channel.send('v1 Update: Meme command can now only be used in `NSFW CHANNELS`.');
    const subReddits = ["dankmeme", "meme", "me_irl"];
        const random = subReddits [Math.floor(Math.random() * subReddits.length)];

        const img = await randomPuppy(random);
        const embed = new MessageEmbed()
        .setColor(`#${process.env.EMB_COLOR}`)
        .setFooter(this.client.user.username, this.client.user.displayAvatarURL())
        .setImage(img)
        .setTitle(`From the subreddit /r/${random}`)
        .setURL(`Https://reddit.com/r/${random}`);

        message.channel.send(embed);
	}
};
