const { Command } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");
const errembed = new MessageEmbed()
  .setTitle(`StaticOS | ERR!`)
  .setDescription(
    "An error has been located!\nThis could have happened due to `missing argument, you are missing permissions, or I am lacking permissions.`\nIf this error persists and you have all then necessary arguments, permissions, etc.\nPlease contact joeywoah_#5364."
  )
  .setColor("#ff0000");
module.exports = class RoleColorCommand extends Command {
  constructor(client) {
    super(client, {
      name: "rolecolor",
      aliases: ["rrc"],
      group: "role-series",
      memberName: "rolecolor",
      description: "Changes the role color of a role!",
      clientPermissions: ["MANAGE_ROLES"],
      userPermissions: ["MANAGE_ROLES"],
      args: [
        {
          key: "role",
          prompt: "What role do you want to edit?",
          type: "role"
        },
        {
            key: 'color',
            prompt: 'What do you want to change the color to?',
            type: 'string'
        }
      ]
    });
  }
  async run(message, { role, color }) {
    role.edit({ color: `${color}` })
    const embed = new MessageEmbed()
    .setTitle(`${process.env.OS_NAME} | RoleEdit`)
    .setColor(`#${process.env.EMB_COLOR}`)
    .setFooter(this.client.user.username, this.client.user.displayAvatarURL())
    .setDescription(`${role} has been updated!`)
    .setThumbnail(this.client.user.displayAvatarURL())
    .addField('**> Role:**', `${role}`)
    .addField('**> Thing Changed:**', `color`)
    .addField('**> New Value:**', `${color}`)
    .setTimestamp();
    message.embed(embed)
  }
};
