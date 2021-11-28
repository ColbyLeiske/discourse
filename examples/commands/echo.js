const { hasPrefix, isCommand, hasArgs } = require('../../src/conditions');
const { getArgs } = require('../../src/preRunHooks');

/**
 * This command will echo back to the channel the arguments provided
 * Example:
 *  > !echo can you echo @Colby for me?
 *  > can you echo @Colby for me?
 */
const echo = {
    name: 'echo',
    conditions: [hasPrefix(), isCommand('echo'), hasArgs()],
    preRunHooks: [getArgs()],
    onRun: (msg, { args }) => msg.channel.send(...args),
};

module.exports = echo;