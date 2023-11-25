module.exports = {
    darkMode: 'class',
    content: ['./apps/**/*.{vue, js,jsx,ts,tsx,css}'],
    theme: {
        fontSize: {
            xs: ['12px', '16px'],
            sm: ['14px', '18px'],
            base: ['16px', '21px'],
            middle: ['20px', '28px'],
            '4xl': ['36px', '40px'],
        },
        fontFamily: {
            default: [
                '-apple-system',
                'BlinkMacSystemFont',
                'Segoe UI',
                'Roboto',
                'Helvetica Neue',
                'PingFang SC',
                'Noto Sans',
                'Noto Sans CJK SC',
                'Microsoft YaHei',
                'sans-serif',
            ],
        },

        extend: {
            boxShadow: {
                level1: 'var(--box-shadow-level1)',
                level2: 'var(--box-shadow-level2)',
            },
            minHeight: {
                160: '40rem',
                40: '10rem',
            },
            width: {
                panel: '288px', // 面板、一些组件的通用宽度
                'panel-select': '174px', // 面板属性的select的通用宽度
            },
            height: {
                form: '22px', // 表单类：Slider、Input、Select，以及tab等的通用高度
                'select-item': '32px', // 下拉项统一的高度
            },
            lineHeight: {
                form: '22px', // 表单类：Slider、Input、Select，以及tab等的通用高度
            },
            spacing: {
                112: '28rem',
                128: '32rem',
                144: '36rem',
                22.5: '5.625rem',
                12.5: '3.125rem',
            },
            inset: {
                15.25: '3.8125rem',
            },
            colors: {
                primary1: 'var(--blue-1)',
                primary: 'var(--blue-2)',
                disabled: 'var(--gray-disabled)',
                // 背景色
                gray: {
                    900: 'var(--gray-1)',
                    800: 'var(--gray-2)',
                    700: 'var(--gray-3)',
                    600: 'var(--gray-4)',
                    500: 'var(--gray-5)',
                    400: 'var(--gray-6)',
                },
                yellow: {
                    600: '#f5930a',
                },
                scrollbar: 'var(--bg-color-2)',
                // 字体颜色
                font: {
                    h1: 'var(--text-color-main)',
                    h2: 'var(--text-color-main)',
                    p: 'var(--text-color-body)',
                    assist: 'var(--text-color-assist)',
                    disabled: 'var(--text-color-disabled)',
                },
                // 下拉颜色相关
                select: {
                    selected: 'var(--select-selected-bg)', // 下拉框有已选值时的颜色
                    dropdown: 'var(--select-dropdown-bg)', // 下拉框的背景色
                    'item-hover': 'var(--select-item-hover)', // 下拉选项hover的颜色
                },
                bar: {
                    selected: 'var(--blue-2)', //
                    'item-hover': 'var(--bar-item-hover)', // 下拉选项hover的颜色
                },
                // message信息提示
                message: {
                    'notice-content': 'var(--message-notice-content)',
                },
                dimensionLine: {
                    color: 'var(--dimension-line-color)',
                },
            },
            outline: {
                detail: ['1px solid var(--text-color-main)', '4px'],
            },
        },
    },
    variants: {
        // scrollbar: ['rounded'],
    },
    plugins: [
        require('tailwind-scrollbar'),
        function ({ addComponents, theme }) {
            const iconStatus = {
                color: 'var(--text-color-assist)',
                cursor: 'pointer',
                transition: 'all ease-in-out .3s',
                '&:hover': {
                    color: 'var(--text-color-main)',
                },
            };
            addComponents({
                // 下拉选项的状态
                '.select-item-status': {
                    fontSize: theme('fontSize.xs'),
                    color: theme('colors.font.h1'),
                    '&:hover': {
                        backgroundColor: 'var(--select-item-hover)',
                    },
                    '&:active': {
                        backgroundColor: 'var(--bg-color-primary)',
                        color: 'white',
                    },
                },
                // Bar的状态
                '.bar-item-status': {
                    color: theme('colors.font.h1'),
                    '&:hover': {
                        backgroundColor: 'var(--bar-item-hover)',
                    },
                    '&:active': {
                        backgroundColor: 'var(--bg-color-primary)',
                        color: 'white',
                    },
                },
                // flex垂直水平居中
                '.flex-center': {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                // position垂直水平居中
                '.position-center': {
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    margin: 'auto',
                },
                // translate垂直水平居中
                '.translate-center': {
                    position: 'absolute',
                    left: '50%',
                    transform: 'translateX(-50%)',
                },
                // 自定义字体
                '.text-xxs': {
                    fontSize: '12px',
                    lineHeight: '16px',
                    transform: 'scale(calc(10 / 12))',
                },
                // icon通用状态
                '.icon-status': iconStatus,
                // 关闭X
                '.close-x': {
                    fontSize: '16px',
                    ...iconStatus,
                },
                // message提示位置在高级工具下方
                '.message-position-under-advance-tool': {
                    marginTop: '39px!important',
                },
            });
        },
    ],
};
