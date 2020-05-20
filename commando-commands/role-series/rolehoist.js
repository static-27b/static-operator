const { Command } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");
const errembed = new MessageEmbed()
  .setTitle(`StaticOS | ERR!`)
  .setDescription(
    "An error has been located!\nThis could have happened due to `missing argument, you are missing permissions, or I am lacking permissions.`\nIf this error persists and you have all then necessary arguments, permissions, etc.\nPlease contact joeywoah_#5364."
  )
  .setColor("#ff0000");
module.exports = class RoleHoistCommand extends Command {
  constructor(client) {
    super(client, {
      name: "rolehoist",
      aliases: ["rrh"],
      group: "role-series",
      memberName: "rolehoist",
      description: "Changed if the role is showed in the role hierarchy list.",
      clientPermissions: ["MANAGE_ROLES"],
      userPermissions: ["MANAGE_ROLES"],
      args: [
        {
          key: "role",
          prompt: "What role do you want to edit?",
          type: "role"
        },
        {
            key: 'hoist',
            prompt: 'What do you want to change it to?',
            type: 'boolean',
            oneOf: ['true', 'false']
        }
      ]
    });
  }
  async run(message, { role, hoist }) {
    role.edit({ hoist: hoist })
    const embed = new MessageEmbed()
    .setTitle(`${process.env.OS_NAME} | RoleEdit`)
    .setColor(`#${process.env.EMB_COLOR}`)
    .setFooter(this.client.user.username, this.client.user.displayAvatarURL())
    .setDescription(`${role} has been updated!`)
    .setThumbnail(this.client.user.displayAvatarURL())
    .addField('**> Role:**', `${role}`)
    .addField('**> Thing Changed:**', `hoist`)
    .addField('**> New Value:**', `${hoist}`)
    .setTimestamp();
    message.embed(embed)
  }
};
