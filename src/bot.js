import { Client } from 'discord.js';
import { setPrefix } from './prefix';
import ReplyableError from './replyableerror';

/**
 * An onMessage handler that runs on given list of commands. While commands can have side effects, the onMessage is generally a pure function otherwise
 * @param {Array<Command>} commands 
 * @returns Function - onMessage handler with provided commands
 */
const onMessage = commands => async message => {
    if (message.author.bot) return;

    try {
        const startTime = Date.now();

        // console.log('about to find the command');
        const command = commands.find(({ name, conditions }) => conditions.every(condition => {
            // console.log(name, condition(message));
            return condition(message);
        }));
        if (!command) {
            console.log('command not found');
            return;
        }

        const {
            onRun = async () => { },
            preRunHooks = [],
        } = command;

        // console.log('about to run transforms');
        const flattenObjects = objs => objs.reduce((prev, curr) => ({ ...prev, ...curr }), {});
        // pass in flat return values from previous pre-run hooks <---- huh
        const transformResults = preRunHooks.map((t, i, preRunHooks) => {
            // @todo memoize the object flattening. We can reduce allocation
            const flattenedResults = flattenObjects(preRunHooks.slice(0, Math.max(i - 1, 0)));
            return t(message, flattenedResults);
        });

        const flatTransformResults = flattenObjects(transformResults);

        await onRun(message, flatTransformResults);

        console.log(`Processed command in ${Date.now() - startTime}ms`);
    } catch (err) {
        if (err instanceof ReplyableError && err.message) {
            await message.channel.send(err.message);
        }
        console.log(err)
    }
};

const defaultOnReady = async () => { console.log("Connected to Discord") };

export function createClient({
    discordToken,
    commands = [],
    prefix = '!',
    sortCommands = true,
    onReady = defaultOnReady,
}) {
    setPrefix(prefix);
    // check conditions that are more restrictive (larger array length) before checking broader, more lax condition lists. Can be overrided with sortCommands
    const processedCommands = sortCommands ? commands.sort((a, b) => a.conditions.length > b.conditions.length) : commands;
    const client = new Client();
    client.on('ready', onReady);
    client.on('message', onMessage(processedCommands));
    client.login(discordToken);
}
