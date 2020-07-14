const { Command } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");
const errembed = new MessageEmbed()
  .setTitle(`StaticOS | ERR!`)
  .setDescription(
    "An error has been located!\nThis could have happened due to `missing argument, you are missing permissions, or I am lacking permissions.`\nIf this error persists and you have all then necessary arguments, permissions, etc.\nPlease contact joeywoah_#5364."
  )
  .setColor("#ff0000");
module.exports = class SayCommand extends Command {
  constructor(client) {
    super(client, {
      name: "say",
      aliases: ["repeat"],
      group: "moderation",
      memberName: "say",
      description: "Sends the message you supplied as the bot/client.",
      clientPermissions: ["MANAGE_MESSAGES"],
      userPermissions: ["MANAGE_MESSAGES"],
      args: [
        {
          key: "say",
          prompt: "What do you want the bot/client to say?",
          type: "string",
          default: "This has no message."
        }
      ]
    });
  }
  async run(message, { say }) {
    const embed = new MessageEmbed()
      .setAuthor(
        `${message.guild.name} | ${message.guild.id}`,
        message.guild.iconURL()
      )
      .setColor(`#${process.env.EMB_COLOR}`)
      .setTitle(`Message From ${message.author.username}.`)
      .setFooter(this.client.user.username, this.client.user.displayAvatarURL())
      .setDescription(`${say}`);
    message.delete();
    message.embed(embed);
  }
};
