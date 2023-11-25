/**
 * 初始化配置
 */
const fs = require('fs');
const path = require('path');
const configs = require('../../configs/configs.js');

const root = path.join(__dirname, '../..'); // 项目根目录
const configPath = path.join(root, 'configs'); // 配置文件的目录

// 环境
const nodeEnv = process.env.ENV || 'dev';
// 国内/海外
const site = process.env.SITE || 'internal';

const requestConfig = configs[site][nodeEnv];

// 写入配置到文件
fs.writeFileSync(path.join(configPath, 'request.config.json'), JSON.stringify(requestConfig, null, 2), 'utf-8');
