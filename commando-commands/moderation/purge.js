const { Command } = require('discord.js-commando')
const { MessageEmbed } = require('discord.js');
const errembed = new MessageEmbed()
.setTitle(`StaticOS | ERR!`)
.setDescription("An error has been located!\nThis could have happened due to `missing argument, you are missing permissions, or I am lacking permissions.`\nIf this error persists and you have all then necessary arguments, permissions, etc.\nPlease contact joeywoah_#5364.")
.setColor('#ff0000');
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

module.exports = class PurgeCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'purge',
      aliases: ['clear'],
      group: 'moderation',
      memberName: 'purge',
      description: 'Bulk deletes how many messages you supplied to delete.',
      clientPermissions: ['MANAGE_MESSAGES'],
	    userPermissions: ['MANAGE_MESSAGES'],
      args: [
		{
			key: 'numMsg',
            prompt: 'How many messages do you want to delete?',
            type: 'integer',
        },
	],
    });
  }
  async run(message, { numMsg }) {
    const logs = await logging.get(message.guild.id);
    const modlog = await modlogchannel.get(message.guild.id);
    const logsChannel = this.client.channels.cache.find(ch => ch.name === `${modlog}`);
    parseInt(numMsg, 10);
    
    if(!numMsg || numMsg < 2 || numMsg > 100) return message.embed(errembed);
    
    const fetched = await message.channel.messages.fetch({ limit: numMsg });;
            message.channel.bulkDelete(fetched).catch(error => error)
              const embed = new MessageEmbed()
              .setColor(`#${process.env.EMB_COLOR}`)
              .setTitle(`${process.env.OS_NAME} | Purge`)
              .setDescription(`${numMsg} messages have been deleted in ${message.channel}!`)
              .setFooter(this.client.user.username, this.client.user.displayAvatarURL());
    const msg = await message.embed(embed)
    msg.delete({timeout: 5000})
    if (logs === "on") {
    logsChannel.send(embed)
    }
  }
}
