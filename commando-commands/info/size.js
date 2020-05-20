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

module.exports = class ClientCommand extends Command {
  constructor(client) {
    super(client, {
      name: "clientinfo",
      aliases: ["soinfo"],
      group: "info",
      memberName: "size",
      description: "See how many guilds and members this client is serving!"
    });
  }

  async run(message) {
    message.say(`Welcome to ${process.env.OS_NAME}!\nServing ${this.client.guilds.cache.size} Servers.\nServing ${this.client.users.cache.size} users.`)
  }
};