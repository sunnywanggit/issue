const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const postcssParser = require('postcss-value-parser');
const compiler = require('@vue/compiler-sfc');

const TYPE_MAP = {
    WORD: 'word',
};

class VerifyCssToken {
    constructor() {}

    async run() {
        const paths = await this._getDiffFiles();
        const pathsLen = paths.length;
        for (let i = 0; i < pathsLen; i += 1) {
            const path = paths[i];
            let item;
            if (/\.vue$/.test(path)) {
                item = this._parseVue(path);
            } else {
                item = this._parseLess(path);
            }
            this._lint(item);
        }
    }

    _lint(item) {
        const { path, content } = item;
        const parsed = postcssParser(content);
        parsed.walk(function (node) {
            if (node.type !== TYPE_MAP.WORD) return;
            if (/@grey-/.test(node.value)) {
                console.log();
                console.log('\x1B[31m', `ERROR: ${path} 文件中使用了不允许使用的 css token ${node.value}`);
                console.log('\x1B[37m', ''); // 将命令行文字颜色置为白色
                process.exit(1);
            }
        });
    }

    _getDiffFiles() {
        return new Promise((resolve, reject) => {
            try {
                // 获取暂存区文件
                const GIT_DIFF = 'git diff --diff-filter=d --cached --name-only';

                // 执行 git 的命令,找出变更的文件（注意：这里一定要去除字符串中的换行符，否则含有插值表达式的 git 命令中含有换行符，会导致执行失败）
                const diffFiles = execSync(GIT_DIFF.replace(/[\r\n]/g, ''), {
                    encoding: 'utf8',
                })
                    .split('\n')
                    .map((filePath) => path.normalize(filePath)); // 规范化指定的 path

                const paths = diffFiles.filter((item) => /(\.vue$|\.scss$)/.test(item));
                resolve(paths);
            } catch (e) {
                reject(e);
            }
        });
    }

    _parseVue(path) {
        const content = fs.readFileSync(path).toString();
        const componentAst = compiler.parse(content);
        const { styles } = componentAst.descriptor;
        return {
            path,
            content: styles.reduce((acc, cur) => acc + cur.content, ''),
        };
    }

    _parseLess(path) {
        const content = fs.readFileSync(path).toString();
        return {
            path,
            content,
        };
    }
}

const verifyCssToken = new VerifyCssToken();
verifyCssToken.run();
