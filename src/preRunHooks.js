const { getPrefix } = require('./prefix');

const getArgs = ({ prefix = getPrefix(), includeCommand = false } = {}) => message => {
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    if (!includeCommand) {
        args.shift();
    }
    return { args };
}

module.exports = {
    getArgs,
}