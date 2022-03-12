import ReplyableError from './replyableerror';
import { getPrefix } from './prefix';

/**
 * These are all closures to allow a command to configure the condition. For consistency in the API even conditions without config are closures.
 */
export const inChannelByID = id => message => message.channel.id === id;

export const inVC = () => message => message.member.voice.channel;

export const hasPrefix = ({ prefix = getPrefix() } = {}) => message => message.content.startsWith(prefix);

export const isCommand = (expectedCommand, { prefix = getPrefix() } = {}) => (message => {
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift();
    return command === expectedCommand;
});

export const contains = (needle = '') => message => message.content.includes(needle);

// feels wrong, lets try to clean this up another day
export const equalTo = (expectedAmount, actualAmount) => expectedAmount === actualAmount;
export const greaterThan = (expectedAmount, actualAmount) => actualAmount > expectedAmount;
export const greaterThanEqualTo = (expectedAmount, actualAmount) => greaterThan(expectedAmount, actualAmount) || equalTo(expectedAmount, actualAmount);
export const lessThan = (expectedAmount, actualAmount) => actualAmount < expectedAmount;
export const lessThanEqualTo = (expectedAmount, actualAmount) => lessThan(expectedAmount, actualAmount) || equalTo(expectedAmount, actualAmount);

export const hasArgs = ({
    argCount = 1,
    includeCommand = false,
    throwOnError = true,
    onError,
    comparitor = greaterThanEqualTo,
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
            return false;
        }
        throw new ReplyableError(`You are missing arguments! Found ${args.length} and was expecting ${argCount}`)
    }
    return hasCorrectArgs;
}
