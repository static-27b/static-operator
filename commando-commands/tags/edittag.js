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
const Sequelize = require("sequelize");
const sequelize = new Sequelize("database", "user", "password", {
  host: "localhost",
  dialect: "sqlite",
  logging: false,
  // SQLite only
  storage: "tags.sqlite"
});
const Tags = sequelize.define('tags', {
	name: {
		type: Sequelize.STRING,
		unique: true,
	},
	description: Sequelize.TEXT,
	username: Sequelize.STRING,
	usage_count: {
		type: Sequelize.INTEGER,
		defaultValue: 0,
		allowNull: false,
	},
});

module.exports = class EditTagCommand extends Command {
  constructor(client) {
    super(client, {
      name: "edittag",
      aliases: ["et"],
      group: "tags",
      memberName: "edittag",
      description: "Edits a tag.",
    });
  }

  async run(message) {
    Tags.sync();
    const input = message.content.slice(this.client.commandPrefix.length).split(' ');
		const commandArgs = input.slice(1).join(' ');
    const splitArgs = commandArgs.split(' ');
const tagName = splitArgs.shift();
const tagDescription = splitArgs.join(' ');

// equivalent to: UPDATE tags (descrption) values (?) WHERE name='?';
const affectedRows = await Tags.update({ description: tagDescription }, { where: { name: tagName } });
if (affectedRows > 0) {
	return message.reply(`Tag ${tagName} was edited.`);
}
return message.reply(`Could not find a tag with name ${tagName}.`);
  }
};