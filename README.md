# lt_dragon_well_front

## 插件推荐
安装以下插件可以让你在 `vscode` 中有更友好的开发体验
1. [Vue Language Features(Volar)](https://marketplace.visualstudio.com/items?itemName=vue.volar)
2. [TypeScript Vue Plugin(Volar)](https://marketplace.visualstudio.com/items?itemName=vue.vscode-typescript-vue-plugin)

## 项目说明

> 使用 pnpm 的 nuxt3 monorepo 示例。目前仅适用于 --samefully-hoist 选项。

monorepo 包含 `packages` and `apps` 目录：

- `apps` 目录包含所有 `nuxt` 应用程序。

- `packages` 目录包含所有包，可以为所有 `nuxt` 应用程序共享。

### 快速开始
```bash
# 在根目录下，执行安装依赖
$ pnpm install
# 本地运行全部应用
$ pnpm run build:apps
```

### 依赖管理
```bash
# 全局安装共用包 vue 依赖到 dependencies
$ pnpm install vue -w -S
# 全局安装共用包 vue 依赖到 devDependencies
$ pnpm install vue -w -D
# 全局卸载共用包 vue
$ pnpm uninstall vue -w

# 安装在所有 packages 中，使用 -r 代替 -w
$ pnpm install vue -r -S
# 卸载在所有 packages 中，使用 -r 代替 -w
$ pnpm install vue -r -S

# 安装：使用 --filter 后面接子 package 的 name 表示只把安装的新包装入这个 package 中
$ pnpm install vue -r --filter @pkgs/components
# 卸载：使用 --filter 后面接子 package 的 name 表示只在这个 package 卸载对应的包
$ pnpm install vue -r --filter @pkgs/components
```

### pnpm
pnpm 是新一代 node 包管理器。它由 npm/yarn 衍生而来，但却解决了 npm/yarn 内部潜在的 bug，并且极大了地优化了性能，扩展了使用场景。

pnpm 相比 yarn，npm，yarn PnP 安装包更快速，对包的依赖管理更偏平，对磁盘占用也有优势。


**pnpm-lock.yaml 冲突解决方案：** 如果遇到了  pnpm-lock.yaml 文件冲突，直接 pnpm intall 然后重新提交即可。
> 但是需要注意的是，建议在重新提交之前 review 一下 pnpm-lock.yaml，因为 pnpm 并不能百分之百保证 install 之后依赖版本是你所期望的。
> 

### Proxy

配置路径： `apps/main/configs/request.config.json

配置方式：

```json
{
    "requestUrl": "https://public-test-services.style3d.com",
    "proxy": {
        "^/v1/asset/resource/export/get_detail": {
            "target": "http://10.10.9.246:8887"
        }
    }
}
```

## 目录结构

# 项目部署

## 本地部署

```js
pnpm build:main:dev // 本地构建
pnpm pm2:main:dev // 本地部署
```

部署完成后，访问本地 3000 端口即可。

## 测试环境部署

```js
pnpm build:main:test // 测试环境构建
pnpm pm2:main:test // 测试环境部署
```

## 代理配置

request.config.json

```js
{
  "requestUrl": "https://apigateway-test.style3d.com/cloud.x.dam",
  "proxy": {
  "/resource": {
      "target": "http://10.10.10.0:8886"
    }
  }
}
```


## 待办 list
- [x] Nuxt3 + pnpm 项目初始化
- [x] 🛹 [状态管理库 (Pinia)](https://pinia.vuejs.org/)
- [x] Eslint & Prettier 支持
- [x] Husky & Commitlint & Changelog 支持
- [x] 🚩 [国际化 (i18n) by @intlify](https://github.com/intlify/nuxt3)
- [ ] 通用请求库 支持
- [ ] 微前端 支持
- [ ] SSR + CSR 双模式支持
- [ ] Nuxt 开发规范和标准
- [ ] node 并发处理
- [ ] 项目开发文档
- [ ] PWA 支持
