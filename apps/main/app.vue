<script setup>
    import { ref } from 'vue';
    // message css需要手动加载，此处引入 https://www.antdv.com/docs/vue/getting-started-cn#Import-on-Demand
    // import 'ant-design-vue/es/message/style/css';
    // eslint-disable-next-line

    // import theme, { ThemeMode } from '@/assets/styles/theme';
    // nextTick(() => {
    //     if (process.client) {
    //         theme.setVariables();
    //         const defaultTheme = localStorage.getItem('theme') || ThemeMode.Light;
    //         theme.setTheme(defaultTheme);
    //     }
    // });

</script>

<template>
    <NuxtLayout :name="layout">
        <NuxtPage />
    </NuxtLayout>
</template>

<style lang="scss">
</style>
