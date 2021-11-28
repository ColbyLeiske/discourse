const { hasPrefix, isCommand, hasArgs } = require('../../src/conditions');
const { getArgs } = require('../../src/preRunHooks');

const echo = {
    name: 'echo',
    conditions: [hasPrefix(), isCommand('echo'), hasArgs(1)],
    preRunHooks: [getArgs()],
    onRun: (msg, { args }) => msg.channel.send(...args),
};

module.exports = echo;