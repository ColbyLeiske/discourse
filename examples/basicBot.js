const { createClient } = require('../src/bot');
const echo = require('./commands/echo');
const quote = require('./commands/quote');

/**
 * Creating our discord client with configuration. This also returns the discord client from discord.js for use.
 */
createClient({
    discordToken: process.env.DISCORD_TOKEN,
    commands: [echo, quote]
    // sortCommands: false, // This is to prevent sorting by the condition count
});
