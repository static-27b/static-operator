const {
  CommandoClient,
  SQLiteProvider,
  Commando
} = require("discord.js-commando");
const path = require("path");
const sqlite = require("sqlite");
const { stripIndents } = require("common-tags");
const { getMember, formatDate } = require("./functions.js");
const { MessageEmbed, Structures, Collection } = require("discord.js");
const chalk = require("chalk");
const config = require("./config.json");
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

Structures.extend("Guild", Guild => {
  class MusicGuild extends Guild {
    constructor(client, data) {
      super(client, data);
      this.musicData = {
        queue: [],
        isPlaying: false,
        volume: 1,
        songDispatcher: null
      };
      this.triviaData = {
        isTriviaRunning: false,
        wasTriviaEndCalled: false,
        triviaQueue: [],
        triviaScore: new Map()
      };
    }
  }
  return MusicGuild;
});

const client = new CommandoClient({
  commandPrefix: "ic-",
  owner: "630817206145646602",
  invite: "https://invite.gg/apolloisland",
  unknownCommandResponse: false
});

client.registry
  .registerDefaultTypes()
  .registerGroups([
    ["economy", "Your Economy Command Group"],
    ["configurations", "The Configuration and Security Command Group"],
    ["extreme-moderation", "The Administraton Command Group"],
    ["role-series", "The Role Series Command Group."],
    ["fun", "The Fun Command Group"],
    ["tags", "The Tags Command Group"],
    ["info", "The Info Command Group"],
    ["moderation", "The Normal Moderation Command Group"],
    ["music", "The Music Command Group"]
  ])
  .registerDefaultGroups()
  .registerDefaultCommands()
  .registerCommandsIn(path.join(__dirname, "commando-commands"));

client.once("ready", () => {
  console.log(
    chalk.magenta("STATIC OPERATOR"),
    `I have logged in as ${client.user.tag} (${client.user.id})`
  );
  client.user.setActivity(
    `${client.commandPrefix}help | Serving ${client.guilds.cache.size} servers!`
  );
});

client.on("guildCreate", guild => {
  client.user.setActivity(
    `${client.commandPrefix}help | Serving ${client.guilds.cache.size} servers!`
  );
  const embed = new MessageEmbed()
    .setAuthor(`${guild.name} | ${guild.id}`, guild.iconURL())
    .setTitle("🎉✨ | Thanks for inviting me!")
    .setColor(`${process.env.EMB_COLOR}`)
    .setThumbnail(client.user.displayAvatarURL())
    .setDescription(
      `Thanks for inviting me! To view all my commands, use command \`${client.commandPrefix}help\` or \`@${client.user.tag} help\`.`
    )
    .addField("Discord.js Version", "12.2.0", true)
    .addField("Node Version", "12", true)
    .addField("StaticOS Version", "v2-beta", true)
    .addField(
      `Developer of ${client.user.username}`,
      `Proudly developed by <@630817206145646602>!`
    )
    .setFooter(client.user.username, client.user.displayAvatarURL());

  guild.channels.cache
    .sort(function(chan1, chan2) {
      if (chan1.type !== `text`) return 1;
      if (!chan1.permissionsFor(guild.me).has(`SEND_MESSAGES`)) return -1;
      return chan1.position < chan2.position ? -1 : 1;
    })
    .first()
    .send(embed);
});

sqlite.open(path.join(__dirname, "settings.sqlite")).then(db => {
  client.setProvider(new SQLiteProvider(db));
});

client.on("error", console.error);

client.login(config.token);
