const fs = require('fs');
const path = require('path');
const axios = require('axios');

const projectRoots = []; // 有子项目的目录
const packageJsonPaths = ['package.json']; // 所有含有package.json文件的项目路径
// 获取所有package.json的文件目录
projectRoots.forEach((projectRoot) => {
    fs.readdirSync(projectRoot).forEach((item) => {
        const itemPath = path.join(projectRoot, item);

        // 检查是否是目录
        if (fs.statSync(itemPath).isDirectory()) {
            const packageJsonPath = path.join(itemPath, 'package.json');

            // 检查是否存在package.json
            if (fs.existsSync(packageJsonPath)) {
                packageJsonPaths.push(packageJsonPath);
            }
        }
    });
});

// 更新package.json中的包版本
const updateVersion = async (packagePath) => {
    // 根据路径读取package.json文件
    const packageJson = fs.readFileSync(packagePath).toString();

    // 获取Verdaccio私库下所有包的最新版本
    const result = await axios.get('http://192.168.31.18:4873/-/verdaccio/data/packages');
    const ltPackages = result.data.reduce((packages, package) => {
        return {
            ...packages,
            [package.name]: package.version,
        };
    }, {});

    // 获取package.json下的resolutions，并替换为最新的版本
    const packageObj = JSON.parse(packageJson);
    const packageName = packageObj.name || '@lt'; // 项目名称
    const resolutions = packageObj.resolutions;
    const dependencies = packageObj.dependencies;

    if (dependencies || resolutions) {
        // 替换dependencies
        if (dependencies) {
            Object.keys(dependencies).forEach((packageName) => {
                // 不修改workspace:*、latest的版本
                // 保留版本控制符号：^ ~
                const keepVersionSymbols = ['workspace:*'];
                if (!keepVersionSymbols.includes(dependencies[packageName]) && ltPackages[packageName]) {
                    const packageVersion = dependencies[packageName];
                    const regex = /[\^~]/;
                    const matches = packageVersion.match(regex); // 获取版本控制符号
                    let versionControlSymbols = '';
                    if (matches?.length) {
                        versionControlSymbols = matches[0];
                    }
                    dependencies[packageName] = `${versionControlSymbols}${ltPackages[packageName]}`;
                }
            });
        }
        // 替换resolutions
        if (resolutions) {
            Object.keys(resolutions).forEach((packageName) => {
                if (ltPackages[packageName]) {
                    resolutions[packageName] = ltPackages[packageName];
                }
            });
        }

        return await fs.writeFile(packagePath, JSON.stringify(packageObj, null, 4), () => {
            console.log(`${packageName}包版本更新完成`);
        });
    }
};

const updateAllPackagesVersion = () => {
    packageJsonPaths.forEach(async (path) => {
        await updateVersion(path);
    });
};

updateAllPackagesVersion();
