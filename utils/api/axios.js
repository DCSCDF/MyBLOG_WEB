// utils/api/axios.js
import axios from 'axios'


/**
 * 创建可配置的 axios 实例
 * @param {string} baseURL - API 基础地址
 * @returns {AxiosInstance}
 */
export function createAxiosInstance(baseURL) {
    const instance = axios.create({
        baseURL,
        timeout: 30000,
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        }
    })

    return instance
}

