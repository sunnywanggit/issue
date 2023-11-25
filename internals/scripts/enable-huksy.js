const { exec } = require('child_process');

const isWin = process.platform.startsWith('win');

try {
    if (!isWin) {
        exec('chmod +x .husky/pre-commit', { cwd: process.cwd() });
    }
} catch (e) {
    console.log('\x1B[31m', 'husky 启动失败， 请联系管理员处理');
}
