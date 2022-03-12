let prefix = process.env.PREFIX || '!';

export const setPrefix = newPrefix => prefix = newPrefix;

export const getPrefix = () => prefix;
