const log4js = require('log4js');

// 配置log4js
log4js.configure({
    appenders: {
        cheese: {
            type: 'file',
            filename: './logs/access.log'
        }
    },
    categories: {
        default: {
            appenders: ['cheese'],
            level: 'error'
        }
    }
});

const logger = log4js.getLogger('cheese');
logger.trace('Entering cheese testing');
logger.info('Cheees is quite smelly');
logger.warn('Cheese is warning');
logger.error('Cheese is too ripe');
logger.fatal('Cheese was breeding ground for listeria');

module.exports = logger;