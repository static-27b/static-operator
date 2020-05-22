const { MessageEmbed } = require('discord.js');
const errembed = new MessageEmbed()
.setTitle(`StaticOS | ERR!`)
.setDescription("An error has been located!\nThis could have happened due to `missing argument, you are missing permissions, or I am lacking permissions.`\nIf this error persists and you have all then necessary arguments, permissions, etc.\nPlease contact joeywoah_#5364.")
.setColor('#ff0000');
const { Command } = require('discord.js-commando');
const config = require('../../config.json');
const Keyv = require("keyv");
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

module.exports = class UnlockdownCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'enablechat',
      aliases: ['unlock', "lockdown off", 'lock off'],
      group: 'extreme-moderation',
      memberName: 'lockdown_off',
      description: 'Unlocks the channel.',
      clientPermissions: ['MANAGE_CHANNELS'],
	    userPermissions: ['MANAGE_CHANNELS'],
      args: [
    {
      key: 'channel',
      prompt: 'What channel would you like me to unlock?',
      type: 'channel',
    },
  ],
    });
  }
  async run(message, { channel }) {
    const logs = await logging.get(message.guild.id);
	const modlog = await modlogchannel.get(message.guild.id);
    const logsChannel = this.client.channels.cache.find(ch => ch.name === `${modlog}`);
    channel.updateOverwrite(channel.guild.roles.everyone, { SEND_MESSAGES: true });
const embed = new MessageEmbed()
    .setColor(`#${process.env.EMB_COLOR}`)
    .setFooter(this.client.user.username, this.client.user.displayAvatarURL())
    .setTitle(`${process.env.OS_NAME} | Lockdown`)
    .setDescription(`${channel} has been unlocked.`);
message.embed(embed);
if (logs === "on") {
logsChannel.send(embed);
}
    }
}
