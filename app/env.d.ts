/// <reference types="vite/client" />

// Vue 模块声明
declare module '*.vue' {
    import type {DefineComponent} from 'vue';
    const component: DefineComponent<object, object, unknown>;
    export default component;
}

// 图片资源模块声明
declare module '*.webp' {
    const src: string;
    export default src;
}

declare module '*.png' {
    const src: string;
    export default src;
}

declare module '*.jpg' {
    const src: string;
    export default src;
}

declare module '*.svg' {
    const src: string;
    export default src;
}

declare module 'axios' {
    export interface AxiosResponse<T = unknown> {
        data: ApiResponse<T>;
        status: number;
        statusText: string;
        headers: Record<string, string>;
        config: AxiosRequestConfig;
        request?: unknown;
    }

    export interface AxiosRequestConfig {
        url?: string;
        method?: string;
        baseURL?: string;
        headers?: Record<string, string>;
        params?: Record<string, unknown>;
        data?: Record<string, unknown>;
        timeout?: number;

        [key: string]: unknown;
    }
}

declare global {
    interface ApiResponse<T = unknown> {
        success: boolean;
        data: T;
        errorMsg?: string;
        code?: number;
    }

    interface SiteInfo {
        siteName: string;
        siteDomain?: string;
        siteDescription?: string;
        recordNumber?: string;

        [key: string]: unknown;
    }

    interface ArticleRecord {
        id: number;
        title: string;
        summary?: string;
        categoryName?: string;
        createTime: string;
        commentCount: number;
        isTop?: boolean;
        tags?: string;

        [key: string]: unknown;
    }

    interface ArticleListResponse {
        records: ArticleRecord[];
        total: number;
    }

    interface PageParams {
        currentPage: number;
        pageSize: number;
        keyword?: string;
        categoryId?: number;
    }
}

export {};
