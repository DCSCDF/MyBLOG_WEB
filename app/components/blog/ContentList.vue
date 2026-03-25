<template>
        <div>
                <!--                <header class="mb-6">-->
                <!--                        <h1 class="text-4xl font-extrabold tracking-tight text-on-background mb-2">Editorial-->
                <!--                                Feed</h1>-->
                <!--                        <p class="text-secondary text-sm">Deep dives into distributed systems, UI engineering,-->
                <!--                                and-->
                <!--                                digital philosophy.</p>-->
                <!--                </header>-->
                <!-- 加载状态 -->
                <Transition mode="out-in" enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0 translate-y-2" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition duration-200 ease-in" leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 -translate-y-2">
                        <div v-if="loading" key="loading" class="flex justify-center">
                                <div class="flex flex-col gap-6 w-full">
                                        <div v-for="i in 4" :key="i"
                                             class="flex flex-col sm:flex-row bg-white mb-8 gap-6">
                                                <!--                                                <div class="flex-shrink-0 flex items-center h-40 w-48">-->
                                                <!--                                                        <div-->
                                                <!--                                                            class="w-full sm:w-46 h-full bg-gray-100 rounded-lg animate-pulse"></div>-->
                                                <!--                                                </div>-->
                                                <div class="flex-1 min-w-0 flex flex-col h-40">
                                                        <div class="flex flex-row mb-2 gap-2">
                                                                <div
                                                                    class="h-6 w-24 bg-gray-100 rounded animate-pulse"></div>
                                                                <div
                                                                    class="h-6 w-16 bg-gray-100 rounded animate-pulse"></div>
                                                        </div>
                                                        <div
                                                            class="my-2 h-6 w-3/4 bg-gray-100 rounded animate-pulse"></div>
                                                        <div class="flex-1 space-y-2">
                                                                <div
                                                                    class="h-4 w-full bg-gray-100 rounded animate-pulse"></div>
                                                                <div
                                                                    class="h-4 w-5/6 bg-gray-100 rounded animate-pulse"></div>
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        </div>


                        <template v-else-if="articleList.length > 0" key="articles">
                                <a-timeline>
                                        <a-timeline-item
                                            v-for="article in articleList"
                                            :key="article.id"
                                            :color="article.isTop ? 'red' : 'blue'"
                                        >
                                                <router-link
                                                    :to="`/article/${article.id}`"
                                                    class="timeline-content group block pb-8 px-3"
                                                >
                                                        <h3 class="text-lg font-bold text-on-background group-hover:text-primary transition-colors mb-1">
                                                                {{ article.title }}
                                                        </h3>
                                                        <div class="flex pt-1 items-center mb-1">
                                                                <a-tag :bordered="false" color="blue">
                                                                        {{ article.categoryName || '未分类' }}
                                                                </a-tag>
                                                                <a-tag :bordered="false">
                                                                        <template #icon>
                                                                                <CalendarOutlined/>
                                                                        </template>
                                                                        {{ formatDate(article.createTime) }}
                                                                </a-tag>
                                                                <a-tag :bordered="false">
                                                                        <template #icon>
                                                                                <CommentOutlined/>
                                                                        </template>
                                                                        {{ article.commentCount }}条评论
                                                                </a-tag>
                                                                <a-tag v-if="article.isTop" :bordered="false"
                                                                       color="red">
                                                                        置顶
                                                                </a-tag>

                                                        </div>

                                                        <p class="text-sm pt-2 text-on-surface-variant line-clamp-2 leading-relaxed">
                                                                {{ article.summary || '暂无摘要' }}
                                                        </p>

                                                        <p class="text-blue-400 pt-2 flex items-center">Read more <span
                                                            class="mt-[3px]">
                                                                <svg
                                                                    class="relative mt-px overflow-visible ml-2.5 text-sky-300 dark:text-sky-700"
                                                                    fill="none" height="6" stroke="currentColor"
                                                                    stroke-linecap="round"
                                                                    stroke-linejoin="round" stroke-width="2"
                                                                    viewBox="0 0 3 6" width="3"><path
                                                                    d="M0 0L3 3L0 6"></path></svg>
                                                        </span>
                                                        </p>
                                                        <!--                                                        <div class="flex items-center gap-2 mt-2 text-xs text-gray-400">-->
                                                        <!--                                                                <CommentOutlined/>-->
                                                        <!--                                                                <span>{{ article.commentCount }}条评论</span>-->
                                                        <!--                                                        </div>-->
                                                </router-link>
                                        </a-timeline-item>
                                </a-timeline>
                        </template>


                        <!-- 空状态 -->
                        <a-empty v-else key="empty" description="暂无文章"/>
                </Transition>
        </div>

        <!-- 分页组件 -->
        <div v-if="total > 0" class="mt-6 flex justify-center">
                <a-pagination
                    v-model:current="currentPage"
                    :page-size="pageSize"
                    :show-size-changer="false"
                    :total="total"
                    show-less-items
                    @change="handlePageChange"
                />
        </div>
</template>

<script lang="ts" setup>
import {onMounted, onUnmounted, ref, watch} from 'vue';
import {useRoute} from 'vue-router';
import {articleApi} from '~/api/article/articleApi.js';
import {message} from 'ant-design-vue';

import {useArticleStore} from '~/stores/articleStore';

// // 默认封面图
// const defaultCover = '/images/main.png';
//
// // 404封面图
// const cover404 = '/images/404.png';

// 记录加载失败的图片ID
const failedImages = ref<number[]>([]);

// 检测图片是否可以加载
const checkImage = (url: string): Promise<boolean> => {
        return new Promise((resolve) => {
                const img = new Image();
                img.onload = () => resolve(true);
                img.onerror = () => resolve(false);
                img.src = url;
        });
};

// // 获取文章图片
// const getArticleImage = (article: any) => {
//         // 如果之前加载失败，返回404的图片
//         if (failedImages.value.includes(article.id)) {
//                 return cover404;
//         }
//         // 如果没有coverImage或coverImage为空，返回默认封面
//         if (!article.coverImage) {
//                 return defaultCover;
//         }
//         return article.coverImage;
// };

// // 处理图片加载失败
// const handleImageError = (event: Event, articleId: number) => {
//         const img = event.target as HTMLImageElement;
//         img.src = cover404;
//         if (!failedImages.value.includes(articleId)) {
//                 failedImages.value.push(articleId);
//         }
// };

// 检测文章封面图是否有效
const validateArticleImages = async () => {
        for (const article of articleList.value) {
                if (article.coverImage && !failedImages.value.includes(article.id)) {
                        const isValid = await checkImage(article.coverImage);
                        if (!isValid) {
                                failedImages.value.push(article.id);
                        }
                }
        }
};

// 文章列表数据
const articleList = ref<any[]>([]);

// 分页相关
const currentPage = ref(1);
const pageSize = ref(7);
const total = ref(0);
const loading = ref(true);

// 本地存储键名
const STORAGE_KEY = 'selectedCategoryId'

// Route
const route = useRoute();

// Pinia store
const articleStore = useArticleStore();

// 获取分类ID（优先从URL query参数读取，其次从本地存储读取）
const getCategoryId = (): number | undefined => {
        // 优先从URL query参数读取
        if (route.query.categoryId) {
                return Number(route.query.categoryId);
        }
        // 其次从本地存储读取
        if (import.meta.client) {
                const stored = localStorage.getItem(STORAGE_KEY)
                if (stored) {
                        return stored === 'all' ? undefined : Number(stored)
                }
        }
        return undefined
}

// 格式化日期
const formatDate = (dateStr: string) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}/${month}/${day}`;
};

// 获取文章列表
const fetchArticleList = async () => {
        loading.value = true;
        try {
                // 从URL参数或本地存储获取categoryId
                const categoryId = getCategoryId()

                const result = await articleApi.getPublicArticleList({
                        currentPage: currentPage.value,
                        pageSize: pageSize.value,
                        keyword: articleStore.searchKeyword.trim(),
                        categoryId: categoryId
                });

                if (result && result.data) {
                        articleList.value = result.data.records || [];
                        total.value = result.data.total || 0;
                } else {
                        articleList.value = [];
                        total.value = 0;
                }
        } catch (error: any) {
                console.error('获取文章列表失败:', error);
                message.error(error.message || '获取文章列表失败');
                articleList.value = [];
        } finally {
                loading.value = false;
        }
};

// 搜索文章（由Sidebar触发）
const handleSearch = () => {
        currentPage.value = 1;
        fetchArticleList();
};

// 分页变化
const handlePageChange = (page: number) => {
        currentPage.value = page;
        fetchArticleList();
        window.scrollTo({top: 0, behavior: 'smooth'});
};

// 监听搜索触发
watch(() => articleStore.shouldSearch, (shouldSearch) => {
        if (shouldSearch) {
                handleSearch();
                articleStore.clearSearchTrigger();
        }
});

// 监听URL query参数变化（分类切换）
watch(() => route.query.categoryId, () => {
        handleSearch();
});

// 客户端挂载后初始化
onMounted(() => {
        // 监听自定义分类变化事件
        window.addEventListener('categoryChange', handleCategoryChange)
        // 监听其他标签页的存储变化
        window.addEventListener('storage', handleCategoryChange)
        // 初始化文章列表
        fetchArticleList();
        // 验证图片
        validateArticleImages();
});

onUnmounted(() => {
        window.removeEventListener('categoryChange', handleCategoryChange)
        window.removeEventListener('storage', handleCategoryChange)
});

// 监听分类变化事件
const handleCategoryChange = () => {
        currentPage.value = 1;
        fetchArticleList();
};
</script>

