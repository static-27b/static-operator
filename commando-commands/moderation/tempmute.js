const { Command } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");
const errembed = new MessageEmbed()
  .setTitle("StaticOS | ERR!")
  .setDescription(
    "An error has been located!\nThis could have happened due to `missing argument, you are missing permissions, or I am lacking permissions.`\nIf this error persists and you have all then necessary arguments, permissions, etc.\nPlease contact joeywoah_#5364."
  )
  .setColor("#ff0000");
const fetch = require("node-fetch");
const { stripIndents } = require("common-tags");
const ms = require("ms");
const leet = require("leet");
const Keyv = require("keyv");
const modlogchannel = new Keyv("sqlite://settings.sqlite", {
  namespace: "modlog"
});
const logging = new Keyv("sqlite://settings.sqlite", { namespace: "logging" });
const reporting = new Keyv("sqlite://settings.sqlite", {
  namespace: "reporting"
});
const blacklist = new Keyv("sqlite://settings.sqlite", {
  namespace: "blacklisting"
});

module.exports = class TempMuteCommand extends Command {
  constructor(client) {
    super(client, {
      name: "tempmute",
      aliases: ["tpm"],
      group: "moderation",
      memberName: "tempmute",
      description: "Temporarily mutes the member.",
      clientPermissions: ["MUTE_MEMBERS"],
      userPermissions: ["MUTE_MEMBERS"],
      args: [
        {
          key: "member",
          prompt: "Who do you want to tempmute?",
          type: "member"
        },
        {
          key: "time",
          prompt: "For how long do you want to temp mute them?",
          type: "string"
        },
        {
          key: "reason",
          prompt: "Why do you want to tempmute them?",
          type: "string"
        }
      ]
    });
  }

  async run(message, { member, reason, time }) {
    const logs = await logging.get(message.guild.id);
    const modlog = await modlogchannel.get(message.guild.id);
    const role = message.guild.roles.cache.find(role => role.name === 'Muted');
    const logsChannel = this.client.channels.cache.find(
      ch => ch.name === `${modlog}`
    );
    const smuteembedo = new MessageEmbed()
      .setTitle(`${process.env.OS_NAME} | TempMute`)
      .setDescription("Muted")
      .setColor(`#${process.env.EMB_COLOR}`)
      .addField("Moderator | Administrator", `${message.author}`)
      .addField("User Muted", `${member}`)
      .addField("Reason", `${reason}`)
      .addField("Time", `${time}`)
      .setFooter(
        `Undo this by using command ${this.client.commandPrefix}unmute <member>`,
        this.client.user.displayAvatarURL()
      );
    const smutesendembed = new MessageEmbed()
      .setTitle(`${process.env.OS_NAME} | TempMute`)
      .setDescription(
        `**${message.author.tag}**, You have muted ${member} for ${reason} for ${time}!`
      )
      .setFooter(
        `Undo this by using command ${this.client.commandPrefix}unmute <member>`,
        this.client.user.displayAvatarURL()
      )
      .setColor(`#${process.env.EMB_COLOR}`);
    const exmuteembed = new MessageEmbed()
      .setTitle(`${process.env.OS_NAME} | TempMute`)
      .setDescription(
        `The temporary mute by ${message.author} for ${member} has expried.`
      )
      .addField(`Moderator:`, `${message.author}`)
      .addField(`Member:`, `${member}`)
      .addField(`Time:`, `${time}`)
      .addField(`Reason:`, `${reason}`)
      .setFooter(this.client.user.username, this.client.user.displayAvatarURL())
      .setThumbnail(this.client.user.displayAvatarURL())
      .setColor(`#${process.env.EMB_COLOR}`);

    member.roles.add(role);
    message.channel.send(smutesendembed);
    if (logs === "on") {
      logsChannel.send(smuteembedo);
    }

    setTimeout(function() {
      member.roles.remove(role);
      if (logs === "on") {
        logsChannel.send(exmuteembed);
      }
    }, ms(time));
  }
};
