const { createClient } = require('../src/bot');
const echo = require('./commands/echo');
const quote = require('./commands/quote');

createClient({
    discordToken: process.env.DISCORD_TOKEN,
    commands: [echo, quote]
    // sortCommands: false, // This is to prevent sorting by the condition count
});
