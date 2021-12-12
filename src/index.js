const bot = require('./bot');
const conditions = require('./conditions');
const preRunHooks = require('./preRunHooks');
const prefix = require('./prefix');
const replyableError = require('./replyableerror');

modules.exports = {
    ...bot,
    ...conditions,
    ...preRunHooks,
    ...prefix,
    ...replyableError,
}