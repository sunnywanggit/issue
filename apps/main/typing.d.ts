// store
declare module 'store2';
declare module 'qs';
// 声明图片
declare module '*.png';
declare module '*.jpg';

declare module 'tinycolor2';

declare const API_PREFIX: string;
declare const API_VERSION: string;
declare const BACK_ENDPOINT: string;

// 获取指定对象属性类型
type ValueOf<T, U extends keyof T> = T[U];

interface Options {
    key: string;
    label: string;
    parentKey?: string;
    children?: Options[];
}
