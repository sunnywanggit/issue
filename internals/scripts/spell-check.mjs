import fs from 'fs';
import path from 'path';
import * as cspell from 'cspell-lib';
import { validateText, getDefaultSettings } from 'cspell-lib';

// 拼写检查配置
const CHECK_CONFIG = {
    // 项目配置
    projects: [
        {
            name: 'dam',
            i18n: JSON.parse(fs.readFileSync(path.join(process.cwd(), './apps/main/locales/en.json'), 'utf-8')),
            blankList: [
                'Linctex',
                'zprj',
                'sproj',
                'sgar',
                'sfab',
                'webm',
                'Gltf',
                'Subtable',
                'Recrop',
                'Uncategorized',
            ],
        },
    ],
};

/**
 * @description 对项目中国际化英文翻译进行拼写检查
 */
async function spellCheck(i18nEnJson) {
    /**
     * @description 检查字符串中的单词是否合法
     * @param {string} str 字符串
     */
    async function checkString(str) {
        const defaultSettings = { ...getDefaultSettings(), enabledLanguageIds: ['plaintext', 'javascript'] };

        function getSettings(text, languageId) {
            return cspell.constructSettingsForText(defaultSettings, text, languageId);
        }

        const languageId = 'plaintext';
        const settings = getSettings(str, languageId);
        const results = await validateText(str, settings);
        return results.map(({ text }) => text);
    }

    const result = [];
    async function check(json) {
        for (let key in json) {
            if (typeof json[key] === 'object') {
                await check(json[key]);
            } else {
                const invalidWords = await checkString(json[key]);
                if (invalidWords.length) result.push(invalidWords);
            }
        }
    }
    await check(i18nEnJson);
    return result;
}

for (const project of CHECK_CONFIG.projects) {
    let projectResult = await spellCheck(project.i18n);
    // 过滤白名单
    projectResult = projectResult.flat(Infinity).filter((word) => !project.blankList.includes(word));
    if (projectResult.length) {
        console.log();
        console.log(
            '\x1B[31m',
            `ERROR: ${project.name} 项目中的英文翻译文件中使用了不规范的英文拼写 ${projectResult.join(',')}`,
        );
        console.log('\x1B[31m', `请校对您的英文翻译，如英文翻译无误请将英文拼写添加到校验白名单中`);
        console.log('\x1B[37m', ''); // 将命令行文字颜色置为白色
        process.exit(1);
    }
}
