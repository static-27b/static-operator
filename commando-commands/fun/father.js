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

module.exports = class LeetCommand extends Command {
  constructor(client) {
    super(client, {
      name: "isfather",
      aliases: ["ruf", "isf"],
      group: "fun",
      memberName: "father",
      description: "Checks if the member is the father.",
      args: [
        {
          key: "dna",
          prompt: "Who do you want to run a DNA check on?",
          type: "member",
          default: message => message.author
        }
      ]
    });
  }

  async run(message, { dna }) {
    var amifather = ["**IS THE FATHER!**", "**IS NOT THE FATHER!**"];
    var aif = amifather[Math.floor(Math.random() * amifather.length)];
    const amifatheremb = new MessageEmbed()
      .setColor("#b603fc")
      .setTitle(`${process.env.OS_NAME} | DNA Results`)
      .setDescription(`Results came back... and ${dna} ${aif}`)
      .setFooter(
        this.client.user.username,
        this.client.user.displayAvatarURL()
      );
    message.embed(amifatheremb);
  }
};
