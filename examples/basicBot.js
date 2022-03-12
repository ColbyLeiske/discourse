import { createClient } from 'discourse-unstable/bot';
import { echo, quote } from './commands';
import { config } from 'dotenv';

config();

/**
 * Creating our discord client with configuration. This also returns the discord client from discord.js for use.
 */
createClient({
    discordToken: process.env.DISCORD_TOKEN,
    commands: [echo, quote]
    // sortCommands: false, // This is to prevent sorting by the condition count
});
