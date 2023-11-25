import { resolve } from 'path';
import { IntlifyModuleOptions } from '@intlify/nuxt3';
import { defineNuxtConfig } from 'nuxt/config';
// import Components from 'unplugin-vue-components/vite';
// import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import { createStyleImportPlugin, VxeTableResolve } from 'vite-plugin-style-import';
import VueTypeImports from 'vite-plugin-vue-type-imports';
import viteCompression from 'vite-plugin-compression';
import requireTransform from 'vite-plugin-require-transform';
const { ENV_KEYS_MAP, STATUS_MAP } = require('../../internals/config/index');

const Static = require('./configs/static');

declare module '@nuxt/schema' {
    interface NuxtConfig {
        intlify?: IntlifyModuleOptions;
    }
}

// @babel/runtime for  resolve import "@babel/runtime/helpers/esm/objectSpread2.js"
const transpileConfig = process.env.NODE_ENV === 'development' ? [] : ['@babel/runtime', 'lt-material-modal'];

const ENV = process.env.ENV!;
const SITE = process.env.SITE!;

let nuxtConfig = {
    sourcemap: {
        client: false,
        server: false,
    },
    app: {
        buildAssetsDir: '/main/',
        cdnURL: Static?.[SITE]?.[ENV].cdnURL ?? '',
        head: {
            title: 'Style3D',
            link: [{ rel: 'icon', type: 'image/x-ico', href: '/favicon.ico' }],
        },
    },
    modules: [
        '@vueuse/nuxt',
        '@pinia/nuxt',
        '@pinia-plugin-persistedstate/nuxt',
        '@intlify/nuxt3',
        'nuxt-graphql-client',
        '@nuxtjs/tailwindcss',
    ],
    runtimeConfig: {
        public: {
            ENV: process.env.ENV,
            SITE: process.env.SITE,
            // GQL_HOST: 'http://localhost:8000/graphql', // overwritten by process.env.GQL_HOST
        },
    },

    alias: {
        '@domains': resolve(__dirname, './domains'),
        '@tools': resolve(__dirname, './tools'),
        '@assets': resolve(__dirname, './assets'),
        '@': resolve(__dirname, './'),
        dayjs: 'dayjs/esm/',
    },
    experimental: {
        writeEarlyHints: false,
    },
    build: {
        // extractCSS: true,
        transpile: transpileConfig,
    },
    components: {
        dirs: ['@/components'],
    },

    // unocss: {
    //   preflight: true,
    //   configFile: '../../unocss.config.ts',
    // },

    // css: ['ant-design-vue/es/modal/style/index.css', 'ant-design-vue/es/message/style/index.css'],

    vite: {
        resolve: {
            alias: {
                '~@': resolve(__dirname, './'),
            },
        },
        define: {
            CONFIG: {
                // IS_DEV_OR_TESTING: isDevOrTesting,
                // IS_PRODUCTION: isProd,
                // IS_TESTING: isTesting,
                // IS_DEV: isDev,
                // IS_DAM: true,
                IS_CLOUD: true,
                // IS_VIEWER: environment.isViewer.
            },
            BACK_ENDPOINT: "'https://cloud_feat_cloud_design.test.linctex.com'",
            API_VERSION: "'api'",
        },
        plugins: [
            // Components({
            //     resolvers: [AntDesignVueResolver()],
            // }),
            createStyleImportPlugin({
                resolves: [VxeTableResolve()],
            }),
            requireTransform({
                fileRegex: /.js$|.vue$|.ts$|.tsx$/,
            }),
            VueTypeImports(),
            viteCompression({
                verbose: true,
                disable: false,
                threshold: 10240,
                algorithm: 'gzip',
                ext: '.gz',
            }),
        ],
        ssr: {
            noExternal: ['compute-scroll-into-view', 'ant-design-vue', 'dayjs'],
        },
    },
    ssr: false,
};
if (process.env[ENV_KEYS_MAP.ENABLE_SSR] === STATUS_MAP.DISABLE) {
    nuxtConfig = {
        ...nuxtConfig,
        ssr: false,
        target: 'static',
        nitro: {
            routeRules: {
                '**': {
                    ssr: false,
                },
            },
        },
        build: {
            ...nuxtConfig.build,
            ssr: false,
        },
        vite: {
            ...nuxtConfig.vite,
            build: {
                ...nuxtConfig.vite.build,
                ssr: false,
            },
        },
    };
}

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({ ...nuxtConfig });
