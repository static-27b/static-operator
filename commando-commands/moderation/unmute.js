const { Command } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");
const errembed = new MessageEmbed()
  .setTitle(`StaticOS | ERR!`)
  .setDescription(
    "An error has been located!\nThis could have happened due to `missing argument, you are missing permissions, or I am lacking permissions.`\nIf this error persists and you have all then necessary arguments, permissions, etc.\nPlease contact joeywoah_#5364."
  )
  .setColor("#ff0000");
const config = require('../../config.json');
const Keyv = require('keyv');
const modlogchannel = new Keyv(
	"sqlite://settings.sqlite",
	{ namespace: "modlog" }
  );
  const logging = new Keyv(
	  "sqlite://settings.sqlite",
	  { namespace: "logging" }
	);
  const reporting = new Keyv(
	  "sqlite://settings.sqlite",
	  { namespace: "reporting" }
	);
  const blacklist = new Keyv(
	  "sqlite://settings.sqlite",
	  { namespace: "blacklisting" }
	);

module.exports = class UnmuteCommand extends Command {
  constructor(client) {
    super(client, {
      name: "unmute",
      aliases: ["speak"],
      group: "moderation",
      memberName: "unmute",
      description: "Unmutes the mentioned user in that channel.",
      clientPermissions: ["MUTE_MEMBERS"],
      userPermissions: ["MUTE_MEMBERS"],
      args: [
        {
          key: "member",
          prompt: "Who would you like to unmute?",
          type: "member"
        },
        {
          key: "reason",
          prompt: "Why do you want to unmute them?",
          type: "string"
        }
      ]
    });
  }
  async run(message, { member, reason }) {
    const logs = await logging.get(message.guild.id);
    const modlog = await modlogchannel.get(message.guild.id);
    const logsChannel = this.client.channels.cache.find(ch => ch.name === `${modlog}`);
    message.channel.permissionOverwrites.get(member.id).delete();
    const muteembedo = new MessageEmbed()
      .setTitle(`${process.env.OS_NAME} | Unmute`)
      .setDescription("Unmute")
      .setColor(`#${process.env.EMB_COLOR}`)
      .addField("Moderator | Administrator", `${message.author}`)
      .addField("User Unmuted", `${member}`)
      .addField("Reason", `${reason}`)
      .setFooter(
        `Undo this by using command ${this.client.commandPrefix}mute <member>`,
        this.client.user.displayAvatarURL()
      );
    const mutesendembed = new MessageEmbed()
	    .setTitle(`${process.env.OS_NAME} | Mute`)
	    .setDescription(`**${message.author.tag}**, You have unmuted ${member} for ${reason}!`)
	    .setFooter(`Undo this by using command ${this.client.commandPrefix}mute <member>`, this.client.user.displayAvatarURL())
	    .setColor(`#${process.env.EMB_COLOR}`);
    message.embed(mutesendembed);
    if (logs === "on") {
    logsChannel.send(muteembedo);
    }
  }
};
