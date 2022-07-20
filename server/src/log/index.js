import log4js from 'log4js';

log4js.configure({
  appenders: {
    application: {
      type: 'console',
    },
    file: {
      type: 'file',
      filename: './src/log/server.log',
      compression: true,
      maxLogSize: 10485760,
      backups: 100,
    },
  },
  categories: {
    default: {
      appenders: ['application', 'file'],
      level: 'info',
    },
  },
});

export const LOGGER = log4js.getLogger();
