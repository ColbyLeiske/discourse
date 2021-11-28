const { hasPrefix, isCommand } = require('../../src/conditions');

const quotes = [
    'Yo, this is pretty cool',
    'Hey who writes these?',
    'Did you write this?',
    'Do you know what you just said?',
];

const quote = {
    name: 'quote',
    conditions: [hasPrefix(), isCommand('quote')],
    onRun: msg => msg.channel.send(quotes[Math.floor((Math.random() * quotes.length))]),
};

module.exports = quote;