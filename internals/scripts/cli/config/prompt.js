const { ENV_MAP, STATUS_MAP } = require('../../../config/index');
const { PROJECT_MAP, DIR_MAP } = require('./constant');

// 启动项目配置
const PROJECT_PROMPT = [
    {
        type: 'list',
        message: '启动项目:',
        name: 'project',
        choices: [
            {
                name: PROJECT_MAP.DAM,
                value: DIR_MAP[PROJECT_MAP.DAM],
                checked: true,
            },
            {
                name: PROJECT_MAP.SOFTWARE,
                value: DIR_MAP[PROJECT_MAP.SOFTWARE],
            },
        ],
    },
];

// 启动环境配置
const ENV_PROMPT = [
    {
        type: 'list',
        message: '启动环境:',
        name: 'env',
        choices: [
            {
                name: ENV_MAP.DEV,
                value: ENV_MAP.DEV,
                checked: true,
            },
            {
                name: ENV_MAP.TEST,
                value: ENV_MAP.TEST,
            },
            {
                name: ENV_MAP.BETA,
                value: ENV_MAP.BETA,
            },
            {
                name: ENV_MAP.PRO,
                value: ENV_MAP.PRO,
            },
        ],
    },
];

// SSR 开关配置
const SSR_PROMPT = [
    {
        type: 'list',
        message: '是否开启SSR:',
        name: 'ssr',
        choices: [
            {
                name: '否',
                value: STATUS_MAP.DISABLE,
                checked: true,
            },
            {
                name: '是',
                value: STATUS_MAP.ENABLE,
            },
        ],
    },
];

module.exports = {
    PROJECT_PROMPT,
    ENV_PROMPT,
    SSR_PROMPT,
};
