import { hasPrefix, isCommand, hasArgs } from './conditions';
import { getArgs } from './preRunHooks';

// This is exposed as a debugging command

/**
 * This command will echo back to the channel the arguments provided
 * Example:
 *  > !echo can you echo @Colby for me?
 *  > can you echo @Colby for me?
 */
 export const echo = {
    name: 'echo',
    conditions: [hasPrefix(), isCommand('echo'), hasArgs()],
    preRunHooks: [getArgs()],
    onRun: (msg, { args }) => msg.channel.send(args.join(' ')),
};
