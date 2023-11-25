const { execSync } = require('child_process');

// sourcemap 上传完成后，批量清除 *.map 文件
(function () {
    execSync('rm -rf ./.output/**/*.map', { encoding: 'utf8', cwd: process.cwd() });
})();
