/**
 * 网站配置API模块
 * 统一管理网站公共配置相关的API接口
 * 文档: /api/public/config/*
 */

// API路径配置
const API_BASE = '/api/public/config';

import request from '../../utils/request.js';

/**
 * 获取网站基础信息
 * @returns {Promise<Object>} 包含 siteName, siteDomain, siteDescription, recordNumber
 */
export const getSiteInfo = async () => {
	return request.get(`${API_BASE}/site-info`);
};

// 导出模块
export const siteApi = {
	getSiteInfo
};
