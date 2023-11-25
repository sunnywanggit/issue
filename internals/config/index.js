const STATUS_MAP = {
    ENABLE: 'enable',
    DISABLE: 'disable',
};

const ENV_KEYS_MAP = {
    SITE: 'SITE',
    ENV: 'ENV',
    ENABLE_SSR: 'ENABLE_SSR',
};

const ENV_MAP = {
    DEV: 'dev',
    PRO: 'pro',
};

const DAM_DIRNAME = 'main';

const CONFIG = {
    main: {
        [ENV_MAP.DEV]: {
            name: 'DAM-Dev',
            dirName: DAM_DIRNAME,
            port: 3300,
        },
        [ENV_MAP.PRO]: {
            name: 'DAM-Pro',
            dirName: DAM_DIRNAME,
            port: 3304,
        },
    },
};

module.exports = {
    STATUS_MAP,
    ENV_MAP,
    CONFIG,
    ENV_KEYS_MAP,
};
