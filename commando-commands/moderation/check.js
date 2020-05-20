const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const Keyv = require('keyv');
const wMember = new Keyv(
  "sqlite://warnings.sqlite",
  { namespace: "warnMember" }
);
const wReason = new Keyv(
  "sqlite://warnings.sqlite",
  { namespace: "warnReason" }
);
const wModerator = new Keyv(
  "sqlite://warnings.sqlite",
  { namespace: "warnModerator" }
);

module.exports = class WarningCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'searchid',
      aliases: ['details'],
      group: 'moderation',
      memberName: 'check',
      description: 'Checks the details about case ID.',
      clientPermissions: ['MANAGE_MESSAGES'],
	    userPermissions: ['MANAGE_MESSAGES'],
      args: [
		{
			key: 'casesearch',
            prompt: 'What case number do you want to search for?',
            type: 'integer'
        },
	],
    });
  }
  async run(message, { casesearch }) {
    const member = await wMember.get(`${casesearch}_member`);
    const reason = await wReason.get(`${casesearch}_reason`);
    const mod = await wModerator.get(`${casesearch}_mod`);
    
    const embed = new MessageEmbed()
    .setTitle(`${process.env.OS_NAME} | Case #${casesearch}`)
    .setDescription(`This is case number #${casesearch}.`)
    .addField(`Member:`, `${member}`)
    .addField(`Reason:`, `${reason}`)
    .addField(`Moderator:`, `${mod}`)
    .setColor(`#${process.env.EMB_COLOR}`)
    .setFooter(this.client.user.username, this.client.user.displayAvatarURL())
    .setThumbnail(this.client.user.displayAvatarURL())
    .setAuthor(`${message.guild.name} | ${message.guild.id}`, message.guild.iconURL())
    
    message.embed(embed)
        
}
}