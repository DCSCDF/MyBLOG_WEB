<template>
        <div>
                <div class="my-24"></div>
                <div class="mx-auto max-w-5xl w-auto px-4 md:px-8">
                        <Transition enter-active-class="transition duration-300 ease-out"
                                    enter-from-class="opacity-0 translate-y-2"
                                    enter-to-class="opacity-100 translate-y-0"
                                    leave-active-class="transition duration-200 ease-in"
                                    leave-from-class="opacity-100 translate-y-0"
                                    leave-to-class="opacity-0 -translate-y-2"
                                    mode="out-in">

                                <div v-if="pending" class="mt-40">
                                        <div class="h-8 w-48 bg-gray-200 rounded mb-4"></div>
                                        <div class="h-12 w-3/4 bg-gray-200 rounded mb-6"></div>
                                        <!--                                        <div class="flex gap-4 mb-8">-->
                                        <!--                                                <div class="h-4 w-24 bg-gray-200 rounded"></div>-->
                                        <!--                                                <div class="h-4 w-32 bg-gray-200 rounded"></div>-->
                                        <!--                                                <div class="h-4 w-20 bg-gray-200 rounded"></div>-->
                                        <!--                                        </div>-->
                                        <div class="space-y-3">
                                                <div class="h-4 w-full bg-gray-200 rounded"></div>
                                                <div class="h-4 w-5/6 bg-gray-200 rounded"></div>
                                                <div class="h-4 w-4/5 bg-gray-200 rounded"></div>
                                                <div class="h-4 w-full bg-gray-200 rounded"></div>
                                                <div class="h-4 w-3/4 bg-gray-200 rounded"></div>
                                        </div>
                                </div>

                                <!-- 错误状态 -->
                                <div v-else-if="error" class="text-center py-20">
                                        <div class="text-6xl mb-4">404</div>
                                        <div class="text-xl text-gray-500 mb-6">{{ error }}</div>
                                        <button
                                            class="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                                            @click="goHome"
                                        >
                                                返回首页
                                        </button>
                                </div>

                                <!-- 文章详情 -->
                                <div v-else>
                                        <article class="bg-white/80 backdrop-blur-sm rounded-xl p-6 md:p-10 shadow-sm">
                                                <!-- 文章头部信息 -->
                                                <header class="mb-8 pb-6 border-b border-outline-variant/15">
                                                        <!-- 分类和标签 -->
                                                        <div class="flex items-center gap-3 mb-4">
								<span v-if="article.categoryName"
                                                                      class="text-xs uppercase tracking-widest font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
									{{ article.categoryName }}
								</span>
                                                                <span v-if="article.isTop"
                                                                      class="text-xs uppercase tracking-widest font-bold text-red-500 bg-red-50 px-3 py-1 rounded-full">
									置顶
								</span>
                                                        </div>

                                                        <!-- 标题 -->
                                                        <h1 class="text-2xl md:text-4xl font-bold text-on-background mb-4 leading-tight">
                                                                {{ article.title }}
                                                        </h1>

                                                        <!-- 作者和时间 -->
                                                        <div
                                                            class="flex flex-wrap items-center gap-4 text-sm text-on-surface-variant">
                                                                <div class="flex items-center gap-2">
                                                                        <span>{{ article.authorNickname }}</span>
                                                                </div>
                                                                <span class="flex items-center gap-1">
									<svg class="w-4 h-4" fill="none"
                                                                             stroke="currentColor"
                                                                             viewBox="0 0 24 24">
										<path
                                                                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                                                    stroke-linecap="round"
                                                                                    stroke-linejoin="round"
                                                                                    stroke-width="2"></path>
									</svg>
									{{ formatDate(article.createTime) }}
								</span>
                                                                <span class="flex items-center gap-1">
									<svg class="w-4 h-4" fill="none"
                                                                             stroke="currentColor"
                                                                             viewBox="0 0 24 24">
										<path
                                                                                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                                                                    stroke-linecap="round"
                                                                                    stroke-linejoin="round"
                                                                                    stroke-width="2"></path>
									</svg>
									{{ article.commentCount }} 评论
								</span>
                                                        </div>

                                                        <!-- 标签 -->
                                                        <div v-if="article.tags" class="mt-4 flex flex-wrap gap-2">
								<span
                                                                    v-for="tag in articleTags"
                                                                    :key="tag"
                                                                    class="text-xs px-2 py-1 bg-surface-container-low text-on-surface-variant rounded"
                                                                >
									{{ tag }}
								</span>
                                                        </div>
                                                </header>

                                                <!-- 封面图 -->
                                                <div v-if="article.coverImage" class="mb-8 rounded-lg overflow-hidden">
                                                        <img
                                                            :alt="article.title"
                                                            :src="article.coverImage"
                                                            class="w-full h-64 md:h-80 object-cover"
                                                        />
                                                </div>

                                                <!-- 文章内容 -->
                                                <!-- 文章内容 -->
                                                <div v-if="article.htmlContent"
                                                     :key="article.id"
                                                     class="article-content prose-sm max-w-none dark:prose-invert
            prose-h1:text-3xl prose-h1:mb-8 prose-h1:font-bold prose-h1:text-gray-900 dark:prose-h1:text-gray-100
            prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:font-semibold prose-h2:text-gray-800 dark:prose-h2:text-gray-200 prose-h2:pt-2
            prose-h3:text-xl prose-h3:mt-10 prose-h3:mb-4 prose-h3:font-medium prose-h3:text-gray-700 dark:prose-h3:text-gray-300
            prose-p:text-gray-600 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-p:my-5 prose-p:text-[15.5px]

            prose-blockquote:border-l-4 prose-blockquote:border-gray-300 dark:prose-blockquote:border-gray-600
            prose-blockquote:pl-4 prose-blockquote:py-0 prose-blockquote:my-6
            prose-blockquote:not-italic prose-blockquote:text-gray-700 dark:prose-blockquote:text-gray-300

            prose-ul:list-disc prose-ul:pl-6 prose-ul:my-6 prose-ul:space-y-1.5
            prose-ol:list-decimal prose-ol:pl-6 prose-ol:my-6 prose-ol:space-y-1.5
            prose-li:text-gray-600 dark:prose-li:text-gray-300 prose-li:pl-1
            prose-li:marker:text-gray-400 dark:prose-li:marker:text-gray-500
            prose-a:text-blue-600 dark:prose-a:text-blue-400
            prose-a:underline prose-a:underline-offset-2 prose-a:decoration-blue-300 dark:prose-a:decoration-blue-600
            hover:prose-a:text-blue-700 dark:hover:prose-a:text-blue-300 hover:prose-a:decoration-2
            prose-img:rounded-lg prose-img:shadow-md prose-img:mx-auto prose-img:my-8 prose-img:border prose-img:border-gray-200 dark:prose-img:border-gray-700
            prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:bg-gray-100 dark:prose-code:bg-gray-800/60 prose-code:text-gray-800 dark:prose-code:text-gray-200 prose-code:font-mono prose-code:border prose-code:border-gray-200 dark:prose-code:border-gray-700
            prose-pre:rounded-lg prose-pre:my-7 prose-pre:overflow-x-auto prose-pre:bg-gray-800 dark:prose-pre:bg-gray-800/40 prose-pre:border prose-pre:border-gray-200 dark:prose-pre:border-gray-700
            prose-pre code:bg-transparent code:text-gray-200 code:border-0 prose-pre code:p-0

            prose-table:w-full prose-table:text-sm prose-table:overflow-hidden prose-table:my-8 prose-table:rounded-lg prose-table:border prose-table:border-separate prose-table:border-spacing-0 prose-table:border-gray-200 dark:prose-table:border-gray-700 prose-table:shadow-sm
            prose-thead:bg-gray-50 dark:prose-thead:bg-gray-800/30
            prose-th:px-5 prose-th:py-3.5 prose-th:text-left prose-th:font-semibold prose-th:text-gray-700 dark:prose-th:text-gray-300 prose-th:border-b prose-th:border-b-gray-300 dark:prose-th:border-b-gray-600
            prose-td:px-5 prose-td:py-3.5 prose-td:text-gray-600 dark:prose-td:text-gray-300
            prose-tr:border-b prose-tr:border-gray-100 dark:prose-tr:border-gray-700
            prose-tr:hover:bg-gray-50/50 dark:prose-tr:hover:bg-gray-800/20 prose-tr:transition-colors prose-tr:duration-150

            prose-th:first-child:rounded-tl-lg prose-th:last-child:rounded-tr-lg
            prose-tr:last-child prose-td:first-child:rounded-bl-lg prose-tr:last-child prose-td:last-child:rounded-br-lg

            prose-hr:my-8 prose-hr:border-gray-200 dark:prose-hr:border-gray-700
            line-numbers
            selection:bg-blue-100 dark:selection:bg-blue-900/40
            prose-strong:font-semibold prose-strong:text-gray-800 dark:prose-strong:text-gray-200
            prose-em:italic
            first:prose-p:mt-0 last:prose-p:mb-0"
                                                     v-html="article.htmlContent">
                                                </div>

                                                <!-- 文章底部 -->
                                                <footer class="mt-12 pt-6 border-t border-outline-variant/15">
                                                        <div class="flex items-center justify-between">
                                                                <button
                                                                    class="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors"
                                                                    @click="goHome"
                                                                >
                                                                        <svg class="w-5 h-5" fill="none"
                                                                             stroke="currentColor"
                                                                             viewBox="0 0 24 24">
                                                                                <path d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                                                                      stroke-linecap="round"
                                                                                      stroke-linejoin="round"
                                                                                      stroke-width="2"></path>
                                                                        </svg>
                                                                        返回首页
                                                                </button>
                                                        </div>
                                                </footer>
                                        </article>

                                        <!-- 评论区 -->
                                        <div class="mt-8 pb-12  bg-white/80 backdrop-blur-sm rounded-xl p-3 shadow-sm">
                                                <article-comment-list :blog-id="article.id"/>
                                        </div>
                                </div>

                        </Transition>
                </div>
        </div>
</template>

<script lang="ts" setup>
import {computed, onMounted} from 'vue';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
import {articleApi} from '~/api/article/articleApi';
import {useSiteStore} from '~/stores/siteStore';

// 路由
const route = useRoute();
const siteStore = useSiteStore();

// 验证 ID 是否为有效数字
const isValidArticleId = (id: any): boolean => {
        const num = Number(id);
        return !isNaN(num) && num > 0 && Number.isFinite(num);
};

// 服务端渲染：使用 useAsyncData 获取初始数据
const {data: apiResult, error: fetchError, pending} = await useAsyncData(
    `article-${route.params.id}`,
    async () => {
            // 验证 ID 格式
            if (!isValidArticleId(route.params.id)) {
                    throw createError({
                            statusCode: 404,
                            statusMessage: 'Invalid article ID'
                    });
            }
            return await articleApi.getPublicArticleDetail(route.params.id);
    },
    {
            watch: [() => route.params.id]
    }
);

// 文章数据
const article = computed(() => {
        if (apiResult.value) {
                const result = apiResult.value as any;
                if (result.success !== false) {
                        return result.data;
                }
        }
        return null;
});

// 错误信息
const error = computed(() => {
        if (fetchError.value) {
                const err = fetchError.value as any;
                if (err?.statusCode === 404) {
                        return '文章不存在';
                }
                return '获取文章详情失败';
        }
        const result = apiResult.value as any;
        if (result && result.success === false) {
                return result.errorMsg || '文章不存在或已下架';
        }
        return null;
});

// 解析标签
const articleTags = computed(() => {
        if (!article.value?.tags) return [];
        return article.value.tags.split(',').map((tag: string) => tag.trim()).filter(Boolean);
});


// 格式化日期
const formatDate = (dateStr: string) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}年${month}月${day}日`;
};

// 返回首页
const goHome = () => {
        const router = useRouter();
        router.push('/');
};

// 高亮代码块（带重试机制）
const highlightCode = (attempt = 0) => {
        let container = document.querySelector('.prose-sm');
        if (!container) {
                container = document.querySelector('[class*="prose"]');
        }
        if (!container) {
                container = document.querySelector('article');
        }

        if (!container) {
                const allPre = document.querySelectorAll('pre');
                if (allPre.length > 0) {
                        allPre.forEach((pre) => {
                                let code = pre.querySelector('code');
                                if (!code) {
                                        code = document.createElement('code');
                                        code.innerHTML = pre.innerHTML;
                                        pre.innerHTML = '';
                                        pre.appendChild(code);
                                }
                                hljs.highlightElement(code as HTMLElement);
                        });
                        return;
                }
        }

        if (!container) {
                if (attempt < 3) {
                        setTimeout(() => highlightCode(attempt + 1), 100);
                }
                return;
        }

        const codeBlocks = container.querySelectorAll('pre code');

        if (codeBlocks.length === 0) {
                const preBlocks = container.querySelectorAll('pre');
                preBlocks.forEach((pre) => {
                        let code = pre.querySelector('code');
                        if (!code) {
                                code = document.createElement('code');
                                code.innerHTML = pre.innerHTML;
                                pre.innerHTML = '';
                                pre.appendChild(code);
                        }
                        hljs.highlightElement(code as HTMLElement);
                });
        } else {
                codeBlocks.forEach((block) => {
                        hljs.highlightElement(block as HTMLElement);
                });
        }
};

// 组件挂载时执行代码高亮（客户端）
onMounted(() => {
        setTimeout(() => highlightCode(0), 100);
});


// 提取文章摘要用于 meta description（取纯文本前200字符）
const articleDescription = computed(() => {
        if (!article.value?.htmlContent) return '';
        const text = article.value.htmlContent
            .replace(/<[^>]*>/g, ' ')  // 移除HTML标签
            .replace(/\s+/g, ' ')        // 合并空白字符
            .trim();
        return text.length > 200 ? text.substring(0, 200) + '...' : text;
});

// SEO 配置（使用响应式数据）
useHead({
        title: () => article.value ? `${article.value.title} - ${siteStore.siteName}` : '加载中...',
        meta: [
                {
                        name: 'description',
                        content: () => article.value?.categoryName
                            ? `${article.value.categoryName} - ${articleDescription.value}`
                            : articleDescription.value
                },
                {
                        name: 'keywords',
                        content: () => article.value?.tags || ''
                }
        ]
});

// OG 标签（社交分享优化）
useSeoMeta({
        title: () => article.value ? `${article.value.title} - ${siteStore.siteName}` : '加载中...',
        description: () => articleDescription.value,
        keywords: () => article.value?.tags || '',
        ogTitle: () => article.value?.title || '',
        ogDescription: () => articleDescription.value,
        ogImage: () => article.value?.coverImage || '',
        articleAuthor: () => article.value?.authorNickname || '',
        articlePublishedTime: () => article.value?.createTime || ''
});
</script>

