# discordprefix

discordprefix is a new and good [Node.js](https://nodejs.org) package, easy-to-use, manage your discord prefixes!

### Features

- ⏱️ Easy to use!
- 📁 JSON database!
- 🤖 Custom Prefixes!
- 😯 Useful Functions! (getArguments, getCommand)

## Installation

```js
npm install --save @danielquacks/discord-prefix
```

## Examples

You can read this example code on Github: [example.js](https://github.com/xMercyTheDeveloper/discordprefix/blob/master/example.js)

### Get the prefix of a guild

```js
client.on('message', (message) => {
    let prefix = client.getPrefixOfGuild(message.guild.id);
    console.log(prefix) // "!" or the custom prefix
});
```

### Set the prefix of a guild

```js
client.on('message', (message) => {
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
```

### Useful Functions
```js
// message - the message that this function will get the arguments.
getArguments(message);

// args - the arguments that this function will try to get the command.
getCommand(args);
```