const ReplyableError = require('./replyableerror');
const { getPrefix } = require('./prefix');

/**
 * These are all closures to allow a command to configure the condition. For consistency in the API even conditions without config are closures.
 */
const inChannelByID = id => message => message.channel.id === id;
// const inBCS = () => inChannelByID(process.env.BCS_ID);
// const inTwitter = () => inChannelByID(process.env.TWITTER_CHANNEL_ID);

const inVC = () => message => message.member.voice.channel;

const hasPrefix = ({ prefix = getPrefix() } = {}) => message => message.content.startsWith(prefix);

const isCommand = (expectedCommand, { prefix = getPrefix() } = {}) => (message => {
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift();
    return command === expectedCommand;
});

const contains = (needle = '') => message => message.content.includes(needle);

// feels wrong, lets try to clean this up another day
const equalTo = (expectedAmount, actualAmount) => expectedAmount === actualAmount;
const greaterThan = (expectedAmount, actualAmount) => expectedAmount > actualAmount;
const greaterThanEqualTo = (expectedAmount, actualAmount) => greaterThan(expectedAmount, actualAmount) || equalTo(expectedAmount, actualAmount);
const lessThan = (expectedAmount, actualAmount) => expectedAmount < actualAmount;
const lessThanEqualTo = (expectedAmount, actualAmount) => lessThan(expectedAmount, actualAmount) || equalTo(expectedAmount, actualAmount);

const hasArgs = (argCount = 1, {
    includeCommand = false,
    throwOnError = true,
    onError,
    comparitor = equalTo,
} = {}) => message => {
    const args = message.content.trim().split(/ +/);
    if (!includeCommand) {
        args.shift();
    }

    const hasCorrectArgs = comparitor(argCount, args.length);
    if (!hasCorrectArgs && throwOnError) {
        if (onError) {
            // onError not guaranteed to throw, return to be safe. 
            onError(message);
            return;
        }
        throw new ReplyableError(`You are missing arguments! Found ${args.length} and was expecting ${argCount}`)
    }
    return hasCorrectArgs;
}

module.exports = {
    // inBCS,
    // inTwitter,
    inChannelByID,
    inVC,
    hasPrefix,
    contains,
    isCommand,
    hasArgs,

    // hasArgs comparitors
    equalTo,
    greaterThan,
    greaterThanEqualTo,
    lessThan,
    lessThanEqualTo,
}