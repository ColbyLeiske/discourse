let prefix = process.env.PREFIX || '!';

const setPrefix = newPrefix => prefix = newPrefix;

const getPrefix = () => prefix;

module.exports = {
    setPrefix,
    getPrefix,
};