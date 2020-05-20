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
const leet = require("leet");
const config = require('../../config.json');

module.exports = class LeetCommand extends Command {
  constructor(client) {
    super(client, {
      name: "report",
      aliases: ["rpt"],
      group: "info",
      memberName: "report",
      description: "Reports the mentioned member to Server Staff.",
      args: [
        {
          key: "member",
          prompt: "Who do you want to report?",
          type: "member"
        },
        {
          key: "reason",
          prompt: "Why do you want to report them?",
          type: "string"
        }
      ]
    });
  }

  async run(message, { member, reason }) {
    const logsChannel = this.client.channels.cache.find(
      ch => ch.name === `${config.forcedlogs}`
    );
    if (!logsChannel)
      message.guild.channels
        .create(`${config.forcedlogs}`, { type: "text" })
        .catch(console.error);
    message.delete();
    const reported = new MessageEmbed()
      .setTitle(`${process.env.OS_NAME} | Report`)
      .setDescription("Reported")
      .setColor(`#${process.env.EMB_COLOR}`)
      .addField("Reporter", `${message.author}`)
      .addField("Member Reported", `${member}`)
      .addField("Reason", `${reason}`)
      .setFooter(
        "Take action with kick, ban, mute or not.",
        this.client.user.displayAvatarURL()
      );
    logsChannel.send(reported);
    const thankreport = new MessageEmbed()
      .setTitle(`${process.env.OS_NAME} | Report`)
      .setFooter(this.client.user.username, this.client.user.displayAvatarURL())
      .setDescription(
        "Reported! Thank you for reporting this member! Your message may or may have not been deleted. This is due to how Discord.js Commando is built. **NOTE:** Staff may or may not take action!"
      )
      .setColor(`#${process.env.EMB_COLOR}`);
    message.embed(thankreport);
  }
};
