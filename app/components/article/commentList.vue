<template>
        <section>
                <h3 class="text-2xl font-headline font-bold text-on-background mb-8 border-b pb-2 border-outline-variant/10">
                        评论 <span class="text-base font-normal text-slate-400">({{ totalComments }})</span></h3>

                <!-- 提交评论表单 -->
                <div class="mb-12">
                        <!-- 未登录用户：显示用户名、邮箱、头像URL输入框 -->
                        <div v-if="!isLoggedIn" class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                        <label
                                            class="block text-xs font-bold text-secondary uppercase tracking-wider mb-1.5 ml-0.5">名称</label>
                                        <input
                                            v-model="commentForm.username"
                                            class="antd-input w-full px-3 py-2 text-sm rounded-md border-[1.6px] border-gray-200"
                                            placeholder="e.g. John Doe" type="text"/>
                                </div>
                                <div>
                                        <label
                                            class="block text-xs font-bold text-secondary uppercase tracking-wider mb-1.5 ml-0.5">邮箱</label>
                                        <input
                                            v-model="commentForm.email"
                                            class="antd-input w-full px-3 py-2 text-sm rounded-md border-[1.6px] border-gray-200"
                                            placeholder="email@address.com" type="email"/>
                                </div>
                                <div>
                                        <label
                                            class="block text-xs font-bold text-secondary uppercase tracking-wider mb-1.5 ml-0.5">头像链接</label>
                                        <input
                                            v-model="commentForm.avatarUrl"
                                            class="antd-input w-full px-3 py-2 text-sm rounded-md border-[1.6px] border-gray-200"
                                            placeholder="https://image.url" type="url"/>
                                </div>
                                <div>
                                        <label
                                            class="block text-xs font-bold text-secondary uppercase tracking-wider mb-1.5 ml-0.5">网站链接</label>
                                        <input
                                            v-model="commentForm.website"
                                            class="antd-input w-full px-3 py-2 text-sm rounded-md border-[1.6px] border-gray-200"
                                            placeholder="https://yoursite.com" type="url"/>
                                </div>
                        </div>
                        <!-- 已登录用户：只显示网站链接 -->
                        <div v-else class="mb-4">
                                <div class="flex items-center gap-3 mb-4 p-3 bg-primary/5 rounded-lg">
                                        <img v-if="currentUser?.avatarUrl" :alt="currentUser.nickname || currentUser.username"
                                             class="w-10 h-10 rounded-full object-cover"
                                             :src="currentUser.avatarUrl"/>
                                        <div v-else
                                             class="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">
                                                {{ (currentUser?.nickname || currentUser?.username || '?').charAt(0).toUpperCase() }}
                                        </div>
                                        <span class="text-sm font-medium text-on-background">
                                                {{ currentUser?.nickname || currentUser?.username }}
                                        </span>
                                        <span class="text-xs text-secondary">(已登录)</span>
                                </div>
                                <div>
                                        <label
                                            class="block text-xs font-bold text-secondary uppercase tracking-wider mb-1.5 ml-0.5">网站链接</label>
                                        <input
                                            v-model="commentForm.website"
                                            class="antd-input w-full px-3 py-2 text-sm rounded-md border-[1.6px] border-gray-200"
                                            placeholder="https://yoursite.com" type="url"/>
                                </div>
                        </div>
                        <div class="mb-4">
                                <label
                                    class="block text-xs font-bold text-secondary uppercase tracking-wider mb-1.5 ml-0.5">评论内容</label>
                                <textarea
                                    v-model="commentForm.content"
                                    class="antd-input w-full p-3 text-sm min-h-[100px] rounded-md border-[1.6px] border-gray-200"
                                    placeholder="Write a comment..."></textarea>
                        </div>
                        <div class="flex justify-end">
                                <button
                                    :disabled="submitting"
                                    class="bg-primary text-white px-8 py-2.5 rounded-md text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
                                    @click="handleSubmitComment">
                                        {{ submitting ? '提交中...' : '提交评论' }}
                                </button>
                        </div>
                </div>

                <!-- 加载状态 -->
                <div v-if="loading" class="space-y-6">
                        <div v-for="i in 2" :key="i" class="py-6 border-b border-outline-variant/10">
                                <div class="flex gap-4">
                                        <div class="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
                                        <div class="flex-1 space-y-3">
                                                <div class="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                                                <div class="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                                                <div class="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                                        </div>
                                </div>
                        </div>
                </div>

                <!-- 评论列表 -->
                <div v-else-if="commentList.length > 0" class="space-y-0">
                        <div v-for="comment in commentList" :key="comment.id" class="py-8 border-b border-outline-variant/10">
                                <div class="flex flex-col md:flex-row gap-4">
                                        <!-- 头像 -->
                                        <img v-if="comment.avatarUrl" :alt="comment.username"
                                             class="w-10 h-10 rounded-full object-cover"
                                             :src="comment.avatarUrl"/>
                                        <div v-else
                                             class="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center text-secondary font-bold text-sm">
                                                {{ getNameInitial(comment.username) }}
                                        </div>

                                        <div class="flex-1">
                                                <div class="flex items-center gap-2 mb-1 flex-wrap">
                                                        <span class="text-sm font-bold text-on-background">{{ comment.username }}</span>
                                                        <span class="text-xs text-outline">{{ maskEmail(comment.email) }}</span>
                                                        <a-tag v-if="comment.isAdmin" :bordered="false" color="red">管理员</a-tag>
                                                </div>
                                                <p class="text-sm text-on-surface-variant leading-relaxed mb-3">{{ comment.content }}</p>
                                                <div class="flex items-center gap-4 text-[11px] text-outline font-medium">
                                                        <span>{{ formatDateTime(comment.createTime) }}</span>
                                                        <button
                                                            class="text-primary hover:underline cursor-pointer font-bold"
                                                            @click="toggleReplyForm(comment.id)">
                                                                回复
                                                        </button>
                                                </div>

                                                <!-- 回复表单 -->
                                                <div v-if="activeReplyId === comment.id" class="mt-6">
                                                        <!-- 未登录用户：显示完整表单 -->
                                                        <div v-if="!isLoggedIn" class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                                                <div>
                                                                        <label class="block text-xs font-bold text-secondary uppercase tracking-wider mb-1.5 ml-0.5">名称</label>
                                                                        <input
                                                                            v-model="replyForm.username"
                                                                            class="antd-input w-full px-3 py-2 text-sm rounded-md border-[1.6px] border-gray-200"
                                                                            placeholder="e.g. John Doe" type="text"/>
                                                                </div>
                                                                <div>
                                                                        <label class="block text-xs font-bold text-secondary uppercase tracking-wider mb-1.5 ml-0.5">邮箱</label>
                                                                        <input
                                                                            v-model="replyForm.email"
                                                                            class="antd-input w-full px-3 py-2 text-sm rounded-md border-[1.6px] border-gray-200"
                                                                            placeholder="email@address.com" type="email"/>
                                                                </div>
                                                                <div>
                                                                        <label class="block text-xs font-bold text-secondary uppercase tracking-wider mb-1.5 ml-0.5">头像链接</label>
                                                                        <input
                                                                            v-model="replyForm.avatarUrl"
                                                                            class="antd-input w-full px-3 py-2 text-sm rounded-md border-[1.6px] border-gray-200"
                                                                            placeholder="https://image.url" type="url"/>
                                                                </div>
                                                                <div>
                                                                        <label class="block text-xs font-bold text-secondary uppercase tracking-wider mb-1.5 ml-0.5">网站链接</label>
                                                                        <input
                                                                            v-model="replyForm.website"
                                                                            class="antd-input w-full px-3 py-2 text-sm rounded-md border-[1.6px] border-gray-200"
                                                                            placeholder="https://yoursite.com" type="url"/>
                                                                </div>
                                                        </div>
                                                        <!-- 已登录用户：显示简化表单 -->
                                                        <div v-else class="mb-4">
                                                                <div class="flex items-center gap-3 mb-4 p-3 bg-primary/5 rounded-lg">
                                                                        <img v-if="currentUser?.avatarUrl" :alt="currentUser.nickname || currentUser.username"
                                                                             class="w-8 h-8 rounded-full object-cover"
                                                                             :src="currentUser.avatarUrl"/>
                                                                        <div v-else
                                                                             class="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xs">
                                                                                {{ (currentUser?.nickname || currentUser?.username || '?').charAt(0).toUpperCase() }}
                                                                        </div>
                                                                        <span class="text-sm font-medium text-on-background">
                                                                                {{ currentUser?.nickname || currentUser?.username }}
                                                                        </span>
                                                                        <span class="text-xs text-secondary">(已登录)</span>
                                                                </div>
                                                                <div>
                                                                        <label class="block text-xs font-bold text-secondary uppercase tracking-wider mb-1.5 ml-0.5">网站链接</label>
                                                                        <input
                                                                            v-model="replyForm.website"
                                                                            class="antd-input w-full px-3 py-2 text-sm rounded-md border-[1.6px] border-gray-200"
                                                                            placeholder="https://yoursite.com" type="url"/>
                                                                </div>
                                                        </div>
                                                        <div class="mb-4">
                                                                <label class="block text-xs font-bold text-secondary uppercase tracking-wider mb-1.5 ml-0.5">回复 @{{ comment.username }}</label>
                                                                <textarea
                                                                    v-model="replyForm.content"
                                                                    class="antd-input w-full p-3 text-sm min-h-[100px] rounded-md border-[1.6px] border-gray-200"
                                                                    placeholder="写下你的回复..."></textarea>
                                                        </div>
                                                        <div class="flex justify-end">
                                                                <button
                                                                    class="bg-gray-200 mx-3 px-8 py-2.5 rounded-md text-sm font-semibold hover:opacity-90 transition-opacity"
                                                                    @click="closeReplyForm">
                                                                        关闭
                                                                </button>
                                                                <button
                                                                    :disabled="submitting"
                                                                    class="bg-primary text-white px-8 py-2.5 rounded-md text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
                                                                    @click="handleSubmitReply(comment.id)">
                                                                        {{ submitting ? '提交中...' : '提交回复' }}
                                                                </button>
                                                        </div>
                                                </div>

                                                <!-- 子评论（回复） -->
                                                <div v-if="comment.children && comment.children.length > 0" class="mt-6 space-y-6">
                                                        <div v-for="child in comment.children" :key="child.id" class="flex gap-3 pl-6 border-l-2 border-slate-100">
                                                                <!-- 子评论头像 -->
                                                                <img v-if="child.avatarUrl" :alt="child.username"
                                                                     class="w-8 h-8 rounded-full object-cover"
                                                                     :src="child.avatarUrl"/>
                                                                <div v-else
                                                                     class="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center text-secondary font-bold text-[10px]">
                                                                        {{ getNameInitial(child.username) }}
                                                                </div>

                                                                <div class="flex-1">
                                                                        <div class="flex items-center gap-2 mb-1 flex-wrap">
                                                                                <span class="text-xs font-bold text-on-background">{{ child.username }}</span>
                                                                                <span class="text-xs text-blue-500">@{{ comment.username }}</span>
                                                                        </div>
                                                                        <p class="text-sm text-on-surface-variant leading-relaxed mb-2">{{ child.content }}</p>
                                                                        <div class="flex items-center gap-3 text-[10px] text-outline font-medium">
                                                                                <span>{{ formatDateTime(child.createTime) }}</span>
                                                                                <button
                                                                                    class="text-primary hover:underline cursor-pointer font-bold"
                                                                                    @click="toggleReplyForm(child.id)">
                                                                                        回复
                                                                                </button>
                                                                        </div>

                                                                        <!-- 子评论的回复表单 -->
                                                                        <div v-if="activeReplyId === child.id" class="mt-4">
                                                                                <!-- 未登录用户：显示完整表单 -->
                                                                                <div v-if="!isLoggedIn" class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                                                                        <div>
                                                                                                <label class="block text-xs font-bold text-secondary uppercase tracking-wider mb-1.5 ml-0.5">名称</label>
                                                                                                <input
                                                                                                    v-model="replyForm.username"
                                                                                                    class="antd-input w-full px-3 py-2 text-sm rounded-md border-[1.6px] border-gray-200"
                                                                                                    placeholder="e.g. John Doe" type="text"/>
                                                                                        </div>
                                                                                        <div>
                                                                                                <label class="block text-xs font-bold text-secondary uppercase tracking-wider mb-1.5 ml-0.5">邮箱</label>
                                                                                                <input
                                                                                                    v-model="replyForm.email"
                                                                                                    class="antd-input w-full px-3 py-2 text-sm rounded-md border-[1.6px] border-gray-200"
                                                                                                    placeholder="email@address.com" type="email"/>
                                                                                        </div>
                                                                                        <div>
                                                                                                <label class="block text-xs font-bold text-secondary uppercase tracking-wider mb-1.5 ml-0.5">头像链接</label>
                                                                                                <input
                                                                                                    v-model="replyForm.avatarUrl"
                                                                                                    class="antd-input w-full px-3 py-2 text-sm rounded-md border-[1.6px] border-gray-200"
                                                                                                    placeholder="https://image.url" type="url"/>
                                                                                        </div>
                                                                                        <div>
                                                                                                <label class="block text-xs font-bold text-secondary uppercase tracking-wider mb-1.5 ml-0.5">网站链接</label>
                                                                                                <input
                                                                                                    v-model="replyForm.website"
                                                                                                    class="antd-input w-full px-3 py-2 text-sm rounded-md border-[1.6px] border-gray-200"
                                                                                                    placeholder="https://yoursite.com" type="url"/>
                                                                                        </div>
                                                                                </div>
                                                                                <!-- 已登录用户：显示简化表单 -->
                                                                                <div v-else class="mb-4">
                                                                                        <div class="flex items-center gap-3 mb-4 p-3 bg-primary/5 rounded-lg">
                                                                                                <img v-if="currentUser?.avatarUrl" :alt="currentUser.nickname || currentUser.username"
                                                                                                     class="w-8 h-8 rounded-full object-cover"
                                                                                                     :src="currentUser.avatarUrl"/>
                                                                                                <div v-else
                                                                                                     class="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xs">
                                                                                                        {{ (currentUser?.nickname || currentUser?.username || '?').charAt(0).toUpperCase() }}
                                                                                                </div>
                                                                                                <span class="text-sm font-medium text-on-background">
                                                                                                        {{ currentUser?.nickname || currentUser?.username }}
                                                                                                </span>
                                                                                                <span class="text-xs text-secondary">(已登录)</span>
                                                                                        </div>
                                                                                        <div>
                                                                                                <label class="block text-xs font-bold text-secondary uppercase tracking-wider mb-1.5 ml-0.5">网站链接</label>
                                                                                                <input
                                                                                                    v-model="replyForm.website"
                                                                                                    class="antd-input w-full px-3 py-2 text-sm rounded-md border-[1.6px] border-gray-200"
                                                                                                    placeholder="https://yoursite.com" type="url"/>
                                                                                        </div>
                                                                                </div>
                                                                                <div class="mb-4">
                                                                                        <label class="block text-xs font-bold text-secondary uppercase tracking-wider mb-1.5 ml-0.5">回复 @{{ child.username }}</label>
                                                                                        <textarea
                                                                                            v-model="replyForm.content"
                                                                                            class="antd-input w-full p-3 text-sm min-h-[100px] rounded-md border-[1.6px] border-gray-200"
                                                                                            placeholder="写下你的回复..."></textarea>
                                                                                </div>
                                                                                <div class="flex justify-end">
                                                                                        <button
                                                                                            class="bg-gray-200 mx-3 px-8 py-2.5 rounded-md text-sm font-semibold hover:opacity-90 transition-opacity"
                                                                                            @click="closeReplyForm">
                                                                                                关闭
                                                                                        </button>
                                                                                        <button
                                                                                            :disabled="submitting"
                                                                                            class="bg-primary text-white px-8 py-2.5 rounded-md text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
                                                                                            @click="handleSubmitReply(child.id)">
                                                                                                {{ submitting ? '提交中...' : '提交回复' }}
                                                                                        </button>
                                                                                </div>
                                                                        </div>
                                                                </div>
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        </div>
                </div>

                <!-- 空状态 -->
                <div v-else class="text-center py-12 text-slate-400">
                        <p>暂无评论，快来抢沙发吧~</p>
                </div>
        </section>
</template>

<script lang="ts" setup>
import {ref, computed, onMounted, onUnmounted} from 'vue';
import {useRoute} from 'vue-router';
import {message} from 'ant-design-vue';
import {commentApi} from '~/api/comment/commentApi.js';
import {authApi} from '~/api/user/authApi';

const props = defineProps<{
	blogId?: number;
}>();

const route = useRoute();

// 用户登录状态
const isLoggedIn = ref(false);
const currentUser = ref<{
	id: number;
	username: string;
	nickname: string;
	email: string;
	avatarUrl: string | null;
} | null>(null);

// 检查是否有可用的 token
const hasToken = (): boolean => {
	if (typeof window === 'undefined') return false;

	// 根据 remember 值决定从哪里读取 token
	const isRemember = localStorage.getItem('remember') === 'true';

	if (isRemember) {
		return !!localStorage.getItem('token');
	} else {
		return !!(sessionStorage.getItem('token') || localStorage.getItem('token'));
	}
};

// 同步 localStorage token 到 sessionStorage（跨标签页共享）
const syncTokenFromLocalStorage = () => {
	if (typeof window === 'undefined') return;

	// 只在 remember=false 且 sessionStorage 没有 token 时同步
	const isRemember = localStorage.getItem('remember') === 'true';
	if (isRemember) return;

	const localToken = localStorage.getItem('token');
	const sessionToken = sessionStorage.getItem('token');

	if (localToken && !sessionToken) {
		sessionStorage.setItem('token', localToken);
	}
};

// 检查登录状态
const checkLoginStatus = async () => {
	// 根据 remember 值决定从哪里读取 token
	const isRemember = localStorage.getItem('remember') === 'true';
	let token = null;

	if (isRemember) {
		token = localStorage.getItem('token');
	} else {
		token = sessionStorage.getItem('token');
		// 如果 sessionStorage 没有，尝试 localStorage 作为降级
		if (!token) {
			token = localStorage.getItem('token');
		}
	}

	if (!token) {
		isLoggedIn.value = false;
		currentUser.value = null;
		return;
	}

	try {
		const result = await authApi.profile();
		if (result.data) {
			currentUser.value = result.data;
			isLoggedIn.value = true;
		} else {
			currentUser.value = null;
			isLoggedIn.value = false;
		}
	} catch (error) {
		// token 过期或无效，清除存储
		currentUser.value = null;
		isLoggedIn.value = false;
		sessionStorage.removeItem('token');
		localStorage.removeItem('token');
	}
};

// 处理其他标签页的登录状态变化
const handleStorageChange = (event: StorageEvent) => {
	const triggerKeys = ['token', 'login_status', 'session_login_trigger', 'logout_trigger'];

	if (event.key && triggerKeys.includes(event.key)) {
		if (event.key === 'logout_trigger') {
			currentUser.value = null;
			isLoggedIn.value = false;
			sessionStorage.removeItem('token');
		} else if (event.newValue === null && event.key === 'token') {
			currentUser.value = null;
			isLoggedIn.value = false;
		} else if (event.key === 'login_status' || event.key === 'session_login_trigger') {
			syncTokenFromLocalStorage();
			if (hasToken()) {
				checkLoginStatus();
			}
		}
	}
};

// 处理页面可见性变化
const handleVisibilityChange = () => {
	if (document.visibilityState === 'visible') {
		syncTokenFromLocalStorage();
		if (hasToken()) {
			checkLoginStatus();
		} else {
			currentUser.value = null;
			isLoggedIn.value = false;
		}
	}
};

// 评论列表数据
const commentList = ref<any[]>([]);
const loading = ref(true);
const submitting = ref(false);

// 当前打开回复表单的评论ID
const activeReplyId = ref<number | null>(null);

// 计算评论总数（包括子评论）
const totalComments = computed(() => {
	let count = 0;
	const countComments = (comments: any[]) => {
		for (const comment of comments) {
			count++;
			if (comment.children && comment.children.length > 0) {
				countComments(comment.children);
			}
		}
	};
	countComments(commentList.value);
	return count;
});

// 评论表单
const commentForm = ref({
	username: '',
	email: '',
	avatarUrl: '',
	website: '',
	content: ''
});

// 回复表单
const replyForm = ref({
	username: '',
	email: '',
	avatarUrl: '',
	website: '',
	content: ''
});

// 获取评论列表
const fetchCommentList = async () => {
	loading.value = true;
	try {
		const articleId = props.blogId || Number(route.params.id);
		if (!articleId) return;

		const result = await commentApi.getCommentList(articleId);
		if (result && result.success && result.data) {
			commentList.value = result.data || [];
		} else {
			commentList.value = [];
		}
	} catch (error: any) {
		console.error('获取评论列表失败:', error);
		message.error(error.message || '获取评论列表失败');
		commentList.value = [];
	} finally {
		loading.value = false;
	}
};

// 提交评论
const handleSubmitComment = async () => {
	// 验证必填项
	if (!commentForm.value.content.trim()) {
		message.warning('请输入评论内容');
		return;
	}
	// 未登录用户需要验证名称
	if (!isLoggedIn.value && !commentForm.value.username.trim()) {
		message.warning('请输入名称');
		return;
	}

	submitting.value = true;
	try {
		const articleId = props.blogId || Number(route.params.id);

		// 如果已登录，使用当前用户信息
		const username = isLoggedIn.value && currentUser.value
			? (currentUser.value.nickname || currentUser.value.username)
			: commentForm.value.username;
		const email = isLoggedIn.value && currentUser.value
			? currentUser.value.email
			: commentForm.value.email;
		const avatarUrl = isLoggedIn.value && currentUser.value
			? (currentUser.value.avatarUrl || '')
			: commentForm.value.avatarUrl;

		const result = await commentApi.submitComment({
			blogId: articleId,
			parentId: 0,
			username: username,
			email: email,
			avatarUrl: avatarUrl,
			website: commentForm.value.website,
			content: commentForm.value.content
		});

		if (result && result.success) {
			message.success(result.data?.message || '评论提交成功');
			// 清空表单
			commentForm.value = {
				username: '',
				email: '',
				avatarUrl: '',
				website: '',
				content: ''
			};
			// 刷新评论列表
			await fetchCommentList();
		} else {
			message.error(result?.errorMsg || '评论提交失败');
		}
	} catch (error: any) {
		console.error('提交评论失败:', error);
		message.error(error.message || '评论提交失败');
	} finally {
		submitting.value = false;
	}
};

// 切换回复表单
const toggleReplyForm = (commentId: number) => {
	if (activeReplyId.value === commentId) {
		activeReplyId.value = null;
	} else {
		activeReplyId.value = commentId;
		// 清空回复表单
		replyForm.value = {
			username: '',
			email: '',
			avatarUrl: '',
			website: '',
			content: ''
		};
	}
};

// 关闭回复表单
const closeReplyForm = () => {
	activeReplyId.value = null;
	replyForm.value = {
		username: '',
		email: '',
		avatarUrl: '',
		website: '',
		content: ''
	};
};

// 提交回复
const handleSubmitReply = async (parentId: number) => {
	// 验证必填项
	if (!replyForm.value.content.trim()) {
		message.warning('请输入回复内容');
		return;
	}
	// 未登录用户需要验证名称
	if (!isLoggedIn.value && !replyForm.value.username.trim()) {
		message.warning('请输入名称');
		return;
	}

	submitting.value = true;
	try {
		const articleId = props.blogId || Number(route.params.id);

		// 如果已登录，使用当前用户信息
		const username = isLoggedIn.value && currentUser.value
			? (currentUser.value.nickname || currentUser.value.username)
			: replyForm.value.username;
		const email = isLoggedIn.value && currentUser.value
			? currentUser.value.email
			: replyForm.value.email;
		const avatarUrl = isLoggedIn.value && currentUser.value
			? (currentUser.value.avatarUrl || '')
			: replyForm.value.avatarUrl;

		const result = await commentApi.submitComment({
			blogId: articleId,
			parentId: parentId,
			username: username,
			email: email,
			avatarUrl: avatarUrl,
			website: replyForm.value.website,
			content: replyForm.value.content
		});

		if (result && result.success) {
			message.success(result.data?.message || '回复提交成功');
			// 关闭回复表单
			closeReplyForm();
			// 刷新评论列表
			await fetchCommentList();
		} else {
			message.error(result?.errorMsg || '回复提交失败');
		}
	} catch (error: any) {
		console.error('提交回复失败:', error);
		message.error(error.message || '回复提交失败');
	} finally {
		submitting.value = false;
	}
};

// 获取名字首字母
const getNameInitial = (name: string) => {
	if (!name) return '?';
	return name.charAt(0).toUpperCase();
};

// 格式化邮箱（脱敏）
const maskEmail = (email: string) => {
	if (!email) return '';
	const [username, domain] = email.split('@');
	if (!domain) return email;
	const maskedUsername = username.charAt(0) + '***';
	return `${maskedUsername}@${domain}`;
};

// 格式化日期时间
const formatDateTime = (dateStr: string) => {
	if (!dateStr) return '';
	const date = new Date(dateStr);
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');
	const hours = String(date.getHours()).padStart(2, '0');
	const minutes = String(date.getMinutes()).padStart(2, '0');
	return `${year}-${month}-${day} ${hours}:${minutes}`;
};

// 组件挂载时获取评论列表和登录状态
onMounted(() => {
	syncTokenFromLocalStorage();
	checkLoginStatus();
	fetchCommentList();

	window.addEventListener('storage', handleStorageChange);
	document.addEventListener('visibilitychange', handleVisibilityChange);
});

onUnmounted(() => {
	window.removeEventListener('storage', handleStorageChange);
	document.removeEventListener('visibilitychange', handleVisibilityChange);
});
</script>
