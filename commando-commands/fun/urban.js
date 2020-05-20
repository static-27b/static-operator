const { Command } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
const { stripIndents } = require("common-tags");
const leet = require("leet");
const urban = require("urban");

module.exports = class UrbanCommand extends Command {
  constructor(client) {
    super(client, {
      name: "urban",
      aliases: ["urb"],
      group: "fun",
      memberName: "urban",
      description: "Search for a word on the urban dictionary website!",
      throttling: {
        usages: 1,
        duration: 10
      }
    });
  }

  async run(message) {
    if (!message.channel.nsfw) return message.channel.send('v2 Update: Urban command can now onlt be used in `NSFW CHANNELS`.');
    const errembed = new MessageEmbed()
            .setTitle(`${process.env.OS_NAME} | ERROR!`)
            .setColor(`#${process.env.EMB_COLOR}`)
            .setThumbnail(this.client.user.displayAvatarURL())
            .setDescription(`Looks like you've recieved a error! Here are some possible reasons this might happen!`)
            .setFooter(this.client.user.username, this.client.user.displayAvatarURL())
            .setAuthor(`${message.guild.name} | ${message.guild.id}`, message.guild.iconURL())
            .addField('Missing Argument', `A \`Missing Argument\` is the cause of a missing user input. If you need help with something user ${this.client.commandPrefix}help or @${this.client.tag} help!`)
            .addField('Missing Permissions', `A \`Missing Permission\` error is the cause of a permission that you may not have. If you aren't allowed to use this command. Then don't. Simple :)`)
            .addField('Client Permissions', `A \`Client Permissions\` error is the cause of the client/bot not having sufficient permissions in this guild/server! Please fix this if you wish to run this command!`)
    const args = message.content
      .slice(this.client.commandPrefix.length)
      .trim()
      .split(/ +/g);
    if (args < 2 || !["random", "search"].includes(args[1]))
      return message.channel.send(errembed);
    let image = this.client.user.displayAvatarURL();
    let search = args[1] ? urban(args.slice(2).join(" ")) : urban.random;
    try {
      search.first(res => {
        if (!res) return message.channel.send("No results found!");
        let {
          word,
          definition,
          example,
          thumbs_up,
          thumbs_down,
          permalink,
          author
        } = res;
        const embed = new MessageEmbed()
          .setColor(`#${process.env.EMB_COLOR}`)
          .setTitle(`${process.env.OS_NAME} | Urban`)
          .setAuthor(`Urban Dictionary | ${word}`, image)
          .setThumbnail(image)
          .setDescription(
            stripIndents`**> Definition:** ${definition ||
              "No Definition Provided."}
                        **> Example:** ${example || "No Example Provided"}
                        **> Upvotes:** ${thumbs_up || 0}
                        **> Downvotes:** ${thumbs_down || 0}
                        **> Link:** [Link to ${word}](${permalink ||
              "https://urbandictionary.com/"})`
          )
          .setTimestamp()
          .setFooter(
            `Submitted by ${author || "Anonymous"}`,
            this.client.user.displayAvatarURL()
          );
        message.channel.send(embed);
      });
    } catch (e) {
      console.log(e);
    }
  }
};
