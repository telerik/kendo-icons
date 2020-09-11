const colors = require('ansi-colors');
const gulplogger = require('gulplog');

const colorTheme = {
    error: colors.red,
    info: colors.magentaBright
};

const logger = {
    info: ( message, ...args ) => {
        gulplogger.info( colors.gray(message), ...args ); // eslint-disable-line no-console
    },
    warn: ( message, ...args ) => {
        gulplogger.warn( colors.yellow(message), ...args ); // eslint-disable-line no-console
    },
    error: ( message, ...args ) => {
        gulplogger.error( message, ...args ); // eslint-disable-line no-console
    }
};

function getArg(key) {
    let index = process.argv.indexOf(key);
    let next = process.argv[index + 1];

    return (index < 0) ? null : (!next || next[0] === "-") ? true : next; // eslint-disable-line no-nested-ternary
}


module.exports = {
    getArg,
    logger,
    colorTheme
};
