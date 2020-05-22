const { Command } = require('discord.js-commando')
const { MessageEmbed } = require('discord.js');
const errembed = new MessageEmbed()
.setTitle(`StaticOS | ERR!`)
.setDescription("An error has been located!\nThis could have happened due to `missing argument, you are missing permissions, or I am lacking permissions.`\nIf this error persists and you have all then necessary arguments, permissions, etc.\nPlease contact joeywoah_#5364.")
.setColor('#ff0000');


module.exports = class SayInCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'sendto',
      aliases: ['echoto'],
      group: 'moderation',
      memberName: 'sendto',
      description: 'Sends the message to the specified member.',
      clientPermissions: ['MANAGE_MESSAGES'],
	    userPermissions: ['MANAGE_MESSAGES'],
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
    const member = message.mentions.members.first() || this.client.users.cache.get(args[1]);
    const say = args.slice(2).join(" ");
    if (!member) return message.embed(errembed);
    if (!say) return message.embed(errembed);
    
    member.send(say);
    message.delete();
}
}
