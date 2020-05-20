const { Command } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");
const errembed = new MessageEmbed()
  .setTitle(`StaticOS | ERR!`)
  .setDescription(
    "An error has been located!\nThis could have happened due to `missing argument, you are missing permissions, or I am lacking permissions.`\nIf this error persists and you have all then necessary arguments, permissions, etc.\nPlease contact joeywoah_#5364."
  )
  .setColor("#ff0000");
const config = require('../../config.json');

module.exports = class KickCommand extends Command {
  constructor(client) {
    super(client, {
      name: "kick",
      aliases: ["getrid"],
      group: "moderation",
      memberName: "kick",
      description: "Kicks the mentioned member.",
      clientPermissions: ["KICK_MEMBERS"],
      userPermissions: ["KICK_MEMBERS"]
    });
  }
  async run(message) {
    const errembed = new MessageEmbed()
      .setTitle(`${process.env.OS_NAME} | ERROR!`)
      .setColor(`#${process.env.EMB_COLOR}`)
      .setThumbnail(this.client.user.displayAvatarURL())
      .setDescription(
        `Looks like you've recieved a error! Here are some possible reasons this might happen!`
      )
      .setFooter(this.client.user.username, this.client.user.displayAvatarURL())
      .setAuthor(
        `${message.guild.name} | ${message.guild.id}`,
        message.guild.iconURL()
      )
      .addField(
        "Missing Argument",
        `A \`Missing Argument\` is the cause of a missing user input. If you need help with something user ${this.client.commandPrefix}help or @${this.client.tag} help!`
      )
      .addField(
        "Missing Permissions",
        `A \`Missing Permission\` error is the cause of a permission that you may not have. If you aren't allowed to use this command. Then don't. Simple :)`
      )
      .addField(
        "Client Permissions",
        `A \`Client Permissions\` error is the cause of the client/bot not having sufficient permissions in this guild/server! Please fix this if you wish to run this command!`
      );
    const args = message.content
      .slice(this.client.commandPrefix.length)
      .trim()
      .split(/ +/g);
    const Reason = args.slice(2).join(" ");
    if (!Reason) return message.embed(errembed);
    const member =
      message.mentions.members.first() || this.client.users.cache.get(args[0]);
    if (!member) return message.embed(errembed);
    const logsChannel = this.client.channels.cache.find(
      ch => ch.name === `${config.forcedlogs}`
    );
    if (!logsChannel)
      message.guild.channels
        .create(`${config.forcedlogs}`, { type: "text" })
        .catch(console.error);
    await member
      .kick({ reason: `${Reason}` })
      .catch(error =>
        message.reply(
          `Sorry ${message.author} I couldn't kick because of : ${error}`
        )
      );
    const kicklog = new MessageEmbed()
      .setTitle(`${process.env.OS_NAME} | Kick`)
      .setDescription("Kicked")
      .setColor(`#${process.env.EMB_COLOR}`)
      .setFooter(this.client.user.username, this.client.user.displayAvatarURL())
      .setThumbnail(this.client.user.displayAvatarURL())
      .addField("**> Moderator | Administrator:**", `${message.author}`)
      .addField("**> Member Kicked:**", `${member}`)
      .addField("**> Reason:**", `${Reason}`);
    const kicked = new MessageEmbed()
      .setFooter(this.client.user.username, this.client.user.displayAvatarURL())
      .setTitle(`${process.env.OS_NAME} | Kick`)
      .setColor("#77dd77")
      .setThumbnail(this.client.user.displayAvatarURL())
      .setDescription(
        `**${message.author.tag}**, You have kicked ${member} from the server for ${Reason}`
      )
      .addField("**> Kicked Member Id:**", `${member.id}`)
      .addField("**> Moderator | Administrator:**", `${message.author.id}`)
      .addField("**> Reason for kick:**", `${Reason}`);
    message.embed(kicked);
  }
};
