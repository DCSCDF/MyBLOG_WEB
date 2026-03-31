import type {AxiosRequestConfig} from 'axios';

declare module '../utils/request.js' {
    interface ApiResponse<T = unknown> {
        success: boolean;
        data: T;
        errorMsg?: string;
        code?: number;
    }

    interface Request {
        get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>>;

        post<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<ApiResponse<T>>;

        put<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<ApiResponse<T>>;

        delete<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>>;
    }

    const request: Request;
    export = request;
}
