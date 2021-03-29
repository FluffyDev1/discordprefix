// Get the client from the package.
const { Client } = require("@danielquacks/discordprefix");
// Initiate the client.
const client = new Client({ defaultPrefix: "!" });

// ready Event!. (When the adventure begins!)
client.on("ready", () => {
    // Set the user activity. (you can remove it if u want)
    client.user.setActivity(`Really Cool Discord Prefix Package!`);

    // Initiate the prefixes.json file!
    client.readyEvent();

});

// Check for mentions.
// Message Response Example: "My Prefix in **Testing** is `!`"
client.on("message", (message) => {
    // Check if the message has the bot mention in the message.
    if(client.checkForMention(message)) {
        // Get the guild name.
        let guildName = message.guild.name;
        // Get the prefix of the guild.
        let prefix = client.getPrefixOfGuild(message.guild.id);
        // Send a message
        // Message Response Example: "My Prefix in **Testing** is `!`".
        message.channel.send(`My Prefix in **${guildName}** is \`${prefix}\``);
    }
});

// Checking if message starts with the prefix of guild.
// Also added some useful functions, like getArguments, getCommand.
client.on("message", (message) => {
    if(!client.checkMessage(message)) return;

    // Get the arguments of the message. USEFUL FUNCTION.
    let args = client.getArguments(message);
    // Get the command of the arguments. USEFUL FUNCTION.
    let cmd = client.getCommand(args);

    // Checking for commands
    switch(cmd) {
        // If cmd is "setprefix"
        case "setprefix":
            // Check for permissions! WARNING: if you don't add this, all members can use this command!
            if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('You don\'t have permission to use this command!');
            // Check if there is no arguments, and send the current prefix of the guild.
            if(!args[0]) return message.channel.send(`${message.guild.name}'s Current prefix is \`${client.getPrefixOfGuild(message.guild.id)}\``);
            // Getting the first argument of the command (Example: ?)
            let newPrefix = args[0].toLowerCase();
            // Message Response Example: "Successfully changed prefix to `?`"
            message.channel.send(client.setPrefixOfGuild(message.guild.id, newPrefix));
            // End the case.
            break;
        // End the switch
    }
});

// Login your bot with the token
client.login("BOT_TOKEN");