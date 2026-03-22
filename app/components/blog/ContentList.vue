<template>
        <div class="flex flex-col gap-4">

                <!-- 加载状态 -->
                <Transition mode="out-in" name="fade">
                        <div v-if="loading" key="loading" class="flex justify-center">
                                <div class="flex flex-col gap-6 w-full">
                                        <div v-for="i in pageSize" :key="i"
                                             class="flex flex-col sm:flex-row bg-white mb-8 gap-6">
                                                <div class="flex-shrink-0 flex items-center h-40 w-48">
                                                        <div
                                                            class="w-full sm:w-46 h-full bg-gray-100 rounded-lg animate-pulse"></div>
                                                </div>
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

                        <!-- 文章列表 -->
                        <template v-else-if="articleList.length > 0" key="articles">
                                <TransitionGroup class="flex flex-col gap-4" name="list" tag="div">
                                        <router-link
                                            v-for="article in articleList"
                                            :key="article.id"
                                            :to="`/article/${article.id}`"
                                        >
                                                <article
                                                    class="group flex flex-col md:flex-row gap-6 p-4 rounded-lg border border-outline-variant/15 hover:bg-surface-container-low transition-all duration-300">
                                                        <div
                                                            class="w-full md:w-48 h-32 flex-shrink-0 overflow-hidden rounded-lg">
                                                                <img :alt="article.title"
                                                                     :src="article.coverImage || defaultCover"
                                                                     class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                                     data-alt="Minimalist workspace with warm atmospheric lighting"
                                                                     @error="handleImageError"/>
                                                        </div>
                                                        <div class="flex flex-col justify-center">
                                                                <div class="flex items-center gap-3 mb-2">

                                                                            <span
                                                                                class="text-[0.65rem] uppercase tracking-widest font-bold text-primary">
                                                                                     {{
                                                                                            article.categoryName || '未分类'
                                                                                    }}
                                                                            </span>
                                                                        <span
                                                                            class="text-[0.65rem] text-secondary font-medium">
                                                                                {{ formatDate(article.createTime) }}
                                                                        </span>
                                                                </div>
                                                                <h2
                                                                    class="text-xl font-bold text-on-background mb-2 group-hover:text-primary transition-colors">
                                                                        {{ article.title }}
                                                                </h2>
                                                                <p class="text-sm text-on-surface-variant line-clamp-2 leading-relaxed">
                                                                        {{ article.summary || '暂无摘要' }}
                                                                </p>
                                                        </div>
                                                </article>
                                        </router-link>
                                </TransitionGroup>
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
import {onMounted, ref, watch} from 'vue';
import {useRoute} from 'vue-router';
import {articleApi} from '~/api/article/articleApi.js';
import {message} from 'ant-design-vue';
import {useArticleStore} from '~/stores/articleStore';

const route = useRoute();

// 默认封面图
const defaultCover = '/images/main.png';

// 404封面图
const cover404 = '/images/404.png';

// 处理图片加载失败
const handleImageError = (event: Event) => {
        const img = event.target as HTMLImageElement;
        img.src = cover404;
};

// 文章列表数据
const articleList = ref<any[]>([]);

// 分页相关
const currentPage = ref(1);
const pageSize = ref(7);
const total = ref(0);

// 加载状态
const loading = ref(false);

// Pinia store
const articleStore = useArticleStore();

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
                // 从URL获取categoryId参数
                const urlCategoryId = route.query.categoryId
                    ? Number(route.query.categoryId)
                    : undefined;

                const result = await articleApi.getPublicArticleList({
                        currentPage: currentPage.value,
                        pageSize: pageSize.value,
                        keyword: articleStore.searchKeyword.trim(),
                        categoryId: urlCategoryId
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

// 组件挂载时获取数据
onMounted(() => {
        fetchArticleList();
});

// 监听搜索关键词变化
watch(() => articleStore.searchKeyword, () => {
        handleSearch();
});

// 监听搜索触发
watch(() => articleStore.shouldSearch, (shouldSearch) => {
        if (shouldSearch) {
                handleSearch();
                articleStore.clearSearchTrigger();
        }
});

// 监听URL中categoryId参数变化
watch(() => route.query.categoryId, () => {
        currentPage.value = 1;
        fetchArticleList();
});
</script>

<style scoped>
/* 加载状态和文章列表切换的淡入淡出效果 */
:deep(.fade-enter-active),
:deep(.fade-leave-active) {
        transition: opacity 0.3s ease, transform 0.3s ease;
}

:deep(.fade-enter-from) {
        opacity: 0;
        transform: translateY(10px);
}

:deep(.fade-leave-to) {
        opacity: 0;
        transform: translateY(-10px);
}

/* 文章列表项的过渡效果 */
:deep(.list-enter-active),
:deep(.list-leave-active) {
        transition: all 0.4s ease;
}

:deep(.list-enter-from) {
        opacity: 0;
        transform: translateX(-20px);
}

:deep(.list-leave-to) {
        opacity: 0;
        transform: translateX(20px);
}

:deep(.list-move) {
        transition: transform 0.4s ease;
}

.line-clamp-1 {
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
}

.line-clamp-3 {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
}
</style>
