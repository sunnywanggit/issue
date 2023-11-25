import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const dirname = path.dirname(fileURLToPath(import.meta.url), '..');
const msgPath = path.resolve(dirname, '../../.git/COMMIT_EDITMSG');
const msg = readFileSync(msgPath, 'utf-8').trim();

const commitRE = /^(revert: )?(feat|fix|docs|style|refactor|perf|test|chore|deps|ci)(\(.+\))?: .{1,50}/;

if (!commitRE.test(msg)) {
    console.log();
    console.log(
        '\x1B[31m',
        'ERROR: commit message 格式错误，请使用 feat|fix|docs|style|refactor|perf|test|chore|deps|ci|revert 作为 commit type!!!',
    );
    console.log('\x1B[37m', ''); // 将命令行文字颜色置为白色
    process.exit(1);
}

const commitScope = /^(revert: )?(feat|fix|docs|style|refactor|perf|test|chore|deps|ci)(\(\w+-\d+\)): .{1,50}/;

if (!commitScope.test(msg)) {
    console.log('\x1B[31m', 'ERROR: 请在 commit msg scope 中携带云效任务 ID, 如 feat(ZZVK-862): xxx功能');
    console.log('\x1B[37m', ''); // 将命令行文字颜色置为白色
    process.exit(1);
}
