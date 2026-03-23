/**
 * 公共文章API模块
 * 用于前台公开接口，无需登录即可访问
 */

// API基础路径配置
const PUBLIC_ARTICLE_BASE_PATH = '/api/public/article';

import request from '../../utils/request.js';

/**
 * 公共文章相关API函数
 */
export const articleApi = {

	/**
	 * 获取公共文章列表（支持分页、关键词搜索和分类筛选）
	 * @param {Object} params - 查询参数
	 * @param {number} params.currentPage - 当前页码（从1开始）
	 * @param {number} params.pageSize - 每页数量
	 * @param {string} [params.keyword] - 搜索关键词（可选）
	 * @param {number} [params.categoryId] - 分类ID（可选）
	 * @returns {Promise} 返回文章分页列表
	 */
	getPublicArticleList: async ({ currentPage, pageSize, keyword = '', categoryId }) => {
		return request.post(`${PUBLIC_ARTICLE_BASE_PATH}/list`, {
			currentPage,
			pageSize,
			keyword,
			...(categoryId && { categoryId })
		})
	},

	/**
	 * 获取公共文章详情
	 * @param {number} id - 文章ID
	 * @returns {Promise} 返回文章详情信息
	 */
	getPublicArticleDetail: async (id) => {
		return request.get(`${PUBLIC_ARTICLE_BASE_PATH}/${id}`)
	},

};
