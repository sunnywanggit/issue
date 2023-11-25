const { CONFIG } = require('./internals/config/index.js');

const { ENV_APP, ENV } = process.env;
const currentConfig = CONFIG[ENV_APP][ENV];

module.exports = {
    apps: [
        {
            name: currentConfig.name,
            exec_mode: 'cluster',
            instances: 2,
            script: './.output/server/index.mjs',
            env: {
                PORT: currentConfig.port,
            },
        },
    ],
};
