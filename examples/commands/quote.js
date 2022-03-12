import { hasPrefix, isCommand } from 'discourse-unstable/conditions';

const quotes = [
    'Yo, this is pretty cool',
    'Hey who writes these?',
    'Did you write this?',
    'Do you know what you just said?',
];

/**
 * This will send to the channel a random quote from the list above.
 */
export const quote = {
    name: 'quote',
    conditions: [hasPrefix(), isCommand('quote')],
    onRun: msg => msg.channel.send(quotes[Math.floor((Math.random() * quotes.length))]),
};
