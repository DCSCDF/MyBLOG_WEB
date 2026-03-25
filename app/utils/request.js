import axios from 'axios';
import {handleApi} from '../config/apiInterceptor.js';

// 基础 URL 配置
const getBaseURL = () => {
	// 服务端使用默认值
	if (typeof window === 'undefined') {
		return 'http://localhost:8088';
	}
	// 客户端使用相对路径，让浏览器自动使用当前域名
	return '';
};

const BASE_URL = getBaseURL();
axios.defaults.baseURL = BASE_URL;

/**
 * 创建一个axios实例
 * 包含预设的配置参数和拦截器
 * @type {import('axios').AxiosInstance}
 */
const service = axios.create({
	// 设置请求基础URL
	baseURL: BASE_URL,
	// 设置请求超时时间为40秒，避免长时间等待
	timeout: 40000,
	// 默认请求头配置，指定请求来源和数据格式
	headers: {
		'X-Requested-With': 'XMLHttpRequest', // 告诉服务器这是一个Ajax请求
		'Content-Type': 'application/json; charset=UTF-8',// 指定请求数据格式为JSON
	},
})

// 请求拦截器 - 在发送请求前对请求进行处理
service.interceptors.request.use(
    (config) => {

	    // 在客户端环境中获取token，避免SSR报错
	    if (typeof window !== 'undefined') {
		    // 根据 remember 值决定从哪里读取 token
		    const isRemember = localStorage.getItem('remember') === 'true';
		    let token;

		    if (isRemember) {
			    // 记住登录：从 localStorage 读取
			    token = localStorage.getItem('token');
		    } else {
			    // 会话登录：从 sessionStorage 读取
			    token = sessionStorage.getItem('token');
			    // 如果 sessionStorage 没有，尝试 localStorage 作为降级
			    if (!token) {
				    token = localStorage.getItem('token');
			    }
		    }

		    if (token) {
			    config.headers.token = `${token}`;
		    }
	    }
	    return config;
    },
    error => {
	    // 请求错误时的处理 - 需要返回Promise.reject
	    return Promise.reject(error)
    }
)

// 响应拦截器 - 对响应数据进行处理
service.interceptors.response.use(
    response => {
	    // 初始化返回结果变量
	    let finalResult = null;
	    let isError = false;
	    let errorObj = null;

	    // 提取响应中的数据
	    const {data, success, errorMsg, code} = response.data;

	    // 根据新的统一返回格式处理响应
	    if (success === false) {
		    isError = true;
		    errorObj = new Error(errorMsg || '请求失败');

		    // 使用API响应处理工具处理错误码
		    if (code !== undefined) {
			    handleApi(code.toString());
		    }
	    } else {
		    // 成功响应，使用API响应处理工具处理状态码
		    if (code !== undefined) {
			    handleApi(code.toString());
		    }

		    // 设置成功响应的数据
		    finalResult = {
			    data: data,
			    success: success,
			    errorMsg: errorMsg,
			    code: code
		    };
	    }

	    // 统一返回处理 - 只有一个返回点
	    return isError ? Promise.reject(errorObj) : finalResult;
    },
    error => {
	    // 初始化错误处理变量
	    let finalError = error;

	    // 如果是HTTP状态码错误，提取相关信息
	    if (error.response) {
		    const {status, data} = error.response;

		    // 处理HTTP状态码错误
		    handleApi(status.toString());

		    // 如果响应体有我们定义的格式，按格式处理
		    if (data && typeof data === 'object') {
			    const {errorMsg, code} = data;
			    if (code !== undefined) {
				    handleApi(code.toString());
			    }
			    finalError = new Error(errorMsg || `请求失败 (${status})`);
		    } else {
			    finalError = new Error(`请求失败 (${status})`);
		    }
	    }

	    // 统一返回错误处理
	    return Promise.reject(finalError);
    }
)

/**
 * 导出配置好的axios实例
 * 提供请求配置、拦截器和错误处理机制
 * 作为模块默认导出，供其他组件或页面导入使用
 */
export default service