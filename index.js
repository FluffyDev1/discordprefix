const {Client: DiscordClient, Message} = require("discord.js");
const fs = require("fs");

class Client extends DiscordClient {

    constructor(options) {
        super(options);
        if(options && options.defaultPrefix) { this.defaultPrefix = options.defaultPrefix; }
    }

    readyEvent() {
        if(!fs.existsSync("./prefixes.json")) {
            fs.writeFileSync("./prefixes.json", "{}");
        }
    }

    /**
     * 
     * @param {Message} message 
     * 
     * @returns {boolean}
     */
    checkMessage(message) {

        if(!message.content.toLowerCase().startsWith(this.getPrefixOfGuild(message.guild.id))) {
            return false;
        } else return true;

    }

    /**
     * 
     * @param {Message} message 
     * 
     * @returns {boolean}
     */
    checkForMention(message) {
        if(message.content == `<@!${this.user.id}>`) {
            return true;
        } else return false;
    }


    // Helpful Functions - START

    /**
     * 
     * @param {Message} message
     * 
     * @returns {String[]}
     */
    getArguments(message) {

        return message.content.slice(this.getPrefixOfGuild(message.guild.id).length).trim().split(/ +/g);

    }

    /**
     * 
     * @param {String[]} args
     * 
     * @returns {String}
     */
     getCommand(args) {

        return args.shift().toLowerCase();

    }

    // Helpful Functions - END

    /**
     * 
     * @param {String} guildId 
     * @returns {String}
     */
    getPrefixOfGuild(guildId) {
        let config = this.getConfig();
        if(!config[guildId]) {
            config[guildId] = this.defaultPrefix;
            this.writeConfig(config);
        }
        return config[guildId];
    }

    /**
     * 
     * @param {String} guildId 
     * @param {String} prefix 
     */
    setPrefixOfGuild(guildId, prefix) {
        let config = this.getConfig();
        if(!config[guildId]) {
            config[guildId] = this.defaultPrefix;
            this.writeConfig(config);
        }
        config[guildId] = prefix;
        this.writeConfig(config);
        return `Successfully changed prefix to \`${prefix}\``;
    }

    getConfig() { return JSON.parse(fs.readFileSync("./prefixes.json")); }
    writeConfig(config) { fs.writeFileSync("./prefixes.json", JSON.stringify(config, null, 4)); }

}

module.exports = {Client};