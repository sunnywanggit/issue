module.exports = {
    // 阻止 eslint 在父级目录中寻找配置文件
    root: true,
    env: {
        es6: true,
        browser: true,
        node: true,
    },
    plugins: ['@typescript-eslint', 'prettier'],
    extends: [
        'plugin:vue/vue3-essential',
        'eslint:recommended',
        '@nuxtjs/eslint-config-typescript',
        'plugin:@typescript-eslint/recommended',
        'prettier',
        '@style3d/eslint-config-vue3-ts',
    ],
    rules: {
        /*
          nuxt3 项目 resolve 路径别名引入会报错，暂时关闭
         */
        'import/no-unresolved': 'off',
        /*
         暂时关闭该配置，nuxt 项目中将类型声明在全局进入导入了，所以在使用到具体类型声明的时候，不会进行导入
         如果开启该配置的话，eslint 校验就会报错
         */
        'no-undef': 'off',
        'prefer-regex-literals': 'off',

        // prettier
        'prettier/prettier': 'off',
    },
};
