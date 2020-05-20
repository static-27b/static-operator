const { Command } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");
const errembed = new MessageEmbed()
  .setTitle(`StaticOS | ERR!`)
  .setDescription(
    "An error has been located!\nThis could have happened due to `missing argument, you are missing permissions, or I am lacking permissions.`\nIf this error persists and you have all then necessary arguments, permissions, etc.\nPlease contact joeywoah_#5364."
  )
  .setColor("#ff0000");
const config = require('../../config.json');

module.exports = class MuteCommand extends Command {
  constructor(client) {
    super(client, {
      name: "mute",
      aliases: ["stfu"],
      group: "moderation",
      memberName: "mute",
      description: "Mutes the mentioned user in that channel.",
      clientPermissions: ["MUTE_MEMBERS"],
      userPermissions: ["MUTE_MEMBERS"],
      args: [
        {
          key: "member",
          prompt: "Who would you like to mute?",
          type: "member"
        },
        {
          key: "chanorserv",
          prompt: "How do you want to mute them? Choose `channel` or `server`.",
          type: "string",
          oneOf: ["channel", "server"]
        },
        {
          key: "reason",
          prompt: "Why do you want to mute them?",
          type: "string"
        }
      ]
    });
  }
  async run(message, { member, chanorserv, reason }) {
    if (chanorserv === "channel") {
      const logsChannel = this.client.channels.cache.find(
        ch => ch.name === `${config.forcedlogs}`
      );
      if (!logsChannel)
        message.guild.channels
          .create(`${config.forcedlogs}`, { type: "text" })
          .catch(console.error);
      message.channel.updateOverwrite(member.id, { SEND_MESSAGES: false });
      const cmuteembedo = new MessageEmbed()
        .setTitle(`${process.env.OS_NAME} | Mute`)
        .setDescription("Muted")
        .setColor(`#${process.env.EMB_COLOR}`)
        .addField("Moderator | Administrator", `${message.author}`)
        .addField("User Muted", `${member}`)
        .addField("Reason", `${reason}`)
        .addField("Where?", `${chanorserv}`)
        .setFooter(
          `Undo this by using command ${this.client.commandPrefix}unmute <member>`,
          this.client.user.displayAvatarURL()
        );
      const cmutesendembed = new MessageEmbed()
        .setTitle(`${process.env.OS_NAME} | Mute`)
        .setDescription(
          `**${message.author.tag}**, You have muted ${member} for ${reason} in the ${chanorserv}!`
        )
        .setFooter(
          `Undo this by using command ${this.client.commandPrefix}unmute <member>`,
          this.client.user.displayAvatarURL()
        )
        .setColor(`#${process.env.EMB_COLOR}`);
      message.embed(cmutesendembed);
      logsChannel.send(cmuteembedo);
    }
    if (chanorserv === "server") {
      const Role = message.guild.roles.cache.find(r => r.name === "Muted");
      const logsChannel = this.client.channels.cache.find(
        ch => ch.name === "mochi-logs"
      );
      if (!logsChannel)
        message.guild.channels
          .create("mochi-logs", { type: "text" })
          .catch(console.error);
      member.roles.add(r => r.name === "Muted").catch(console.error)
      const smuteembedo = new MessageEmbed()
        .setTitle(`${process.env.OS_NAME} | Mute`)
        .setDescription("Muted")
        .setColor(`#${process.env.EMB_COLOR}`)
        .addField("Moderator | Administrator", `${message.author}`)
        .addField("User Muted", `${member}`)
        .addField("Reason", `${reason}`)
        .addField("Where?", `${chanorserv}`)
        .setFooter(
          `Undo this by using command ${this.client.commandPrefix}unmute <member>`,
          this.client.user.displayAvatarURL()
        );
      const smutesendembed = new MessageEmbed()
        .setTitle(`${process.env.OS_NAME} | Mute`)
        .setDescription(
          `**${message.author.tag}**, You have muted ${member} for ${reason} in the ${chanorserv}!`
        )
        .setFooter(
          `Undo this by using command ${this.client.commandPrefix}unmute <member>`,
          this.client.user.displayAvatarURL()
        )
        .setColor(`#${process.env.EMB_COLOR}`);
      message.embed(smutesendembed);
      logsChannel.send(smuteembedo);
    }
  }
};
