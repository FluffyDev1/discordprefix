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
    let newPrefix = "~";
    // Returns "Successfully changed prefix to `~`"
    message.channel.send(client.setPrefixOfGuild(message.guild.id, newPrefix));
});
```

Example in discord: [image](https://prnt.sc/10znd68)

### Useful Functions
```js
// message - the message that this function will get the arguments.
getArguments(message);

// args - the arguments that this function will try to get the command.
getCommand(args);
```