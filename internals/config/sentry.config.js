const org = 'linctex';
const authToken = '0709c2c48b224542be1dad403aaa21c52558176ae59e4ffca58dd7cc0e223d10';
const release = 'dam1.0.0';

export const SentryConfig = {
    // 国外配置
    abroad: {
        org,
        authToken,
        release,
        project: 'lt_dragon_well_front_abroad',
    },
    // 国内配置
    internal: {
        org,
        authToken,
        release,
        project: 'lt_dragon_well_front',
    },
};
