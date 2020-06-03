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
const ms = require("ms");
const moment = require("moment");

module.exports = class InfoCommand extends Command {
  constructor(client) {
    super(client, {
      name: "guild",
      aliases: ["ginfo"],
      group: "info",
      memberName: "guild",
      description: "Sends information about the server!"
    });
  }

  async run(message) {
    const ago = ms(Date.now() - message.guild.createdTimestamp, { long: true });
    const text = message.guild.channels.cache.filter(c => c.type === "text")
      .size;
    const voice = message.guild.channels.cache.filter(c => c.type === "voice")
      .size;
    const embed = new MessageEmbed()
      .setColor(`#${process.env.EMB_COLOR}`)
      .setTitle(`${process.env.OS_NAME} | Bot Information`)
      .setDescription(
        `This server was created at ${moment(
          message.guild.createdAt,
          "MM-DD-YYYY hh:mm:ss a"
        )}. Thats ${ago} ago!`
      )
      .addField("Server Name:", `${message.guild.name}`)
      .addField("Server ID:", `${message.guild.id}`)
      .addField("Owner:", `${message.guild.owner.username}`)
      .addField("Role Count", `${message.guild.roles.cache.size}`)
      .addField("Member Count:", `${message.guild.memberCount}`)
      .addField("Running:", "StaticOS Beta")
      .addField("Region:", `${message.guild.region}`)
      .addField("Text Channels:", `${text}`)
      .addField("Voice Channels:", `${voice}`);
    message.embed(embed);
  }
};
