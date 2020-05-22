const { Command } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");
const Keyv = require("keyv");
const wMember = new Keyv(
  "sqlite://warnings.sqlite",
  { namespace: "warnMember" }
);
const wReason = new Keyv(
  "sqlite://warnings.sqlite",
  { namespace: "warnReason" }
);
const wModerator = new Keyv(
  "sqlite://warnings.sqlite",
  { namespace: "warnModerator" }
);
const errembed = new MessageEmbed()
  .setTitle(`${process.env.OS_NAME} | ERR!`)
  .setDescription(
    "An error has been located!\nThis could have happened due to `missing argument, you are missing permissions, or I am lacking permissions.`\nIf this error persists and you have all then necessary arguments, permissions, etc.\nPlease contact joeywoah_#5364."
  )
  .setColor("RED");
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

module.exports = class WarningCommand extends Command {
  constructor(client) {
    super(client, {
      name: "warn",
      aliases: ["warning"],
      group: "moderation",
      memberName: "warn",
      description: "Warns the mentioned member.",
      clientPermissions: ["MANAGE_MESSAGES"],
      userPermissions: ["MANAGE_MESSAGES"],
      args: [
        {
          key: "member",
          prompt: "Who do you want to warn?",
          type: "member"
        },
        {
          key: "reason",
          prompt:
            "Reasons aren't currently supported yet. Still why do you want to warn them?",
          type: "string"
        }
      ]
    });
  }
  async run(message, { member, reason }) {
    const logs = await logging.get(message.guild.id);
    const modlog = await modlogchannel.get(message.guild.id);
    if (message.author.id === member.id) return message.embed(this.client.errembed)//message.say('`WARNING: The ID you are trying to warn is the same one as yours!`');
    const logsChannel = this.client.channels.cache.find(ch => ch.name === `${modlog}`);
    
    function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }
    let casenumber = getRandomInt(100000000);
    await wMember.set(`${casenumber}_member`, `${member}`); // true
    await wReason.set(`${casenumber}_reason`, `${reason}`); // true
    await wModerator.set(`${casenumber}_mod`, `${message.author}`); // true

    const embed1 = new MessageEmbed()
      .setTitle(`${process.env.OS_NAME} | Case #${casenumber}`)
      .setColor(`#${process.env.EMB_COLOR}`)
      .setDescription(`Someone has been warned. Details:`)
      .addField("Case Number:", `${casenumber}`)
      .addField("Moderator:", `${message.author}`)
      .addField("Member Warned:", `${member}`)
      .addField("Reason:", `${reason}`)
      .setThumbnail(this.client.user.displayAvatarURL())
      .setFooter(this.client.user.username, this.client.user.displayAvatarURL())
      .setAuthor(
        `${message.guild.name} | ${message.guild.id}`,
        message.guild.iconURL()
      );
    message.embed(embed1)
    if (logs === "on") {
      logsChannel.send(embed1)
    }
  }
};