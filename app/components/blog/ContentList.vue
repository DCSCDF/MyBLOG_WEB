<template>
        <div class="flex flex-col gap-4">
                <!-- 加载状态 -->
                <a-spin v-if="loading" class="flex justify-center py-20">
                        <div class="flex flex-col gap-6 w-full">
                                <div v-for="i in pageSize" :key="i"
                                     class="flex flex-col sm:flex-row bg-white mb-8 gap-6">
                                        <div class="flex-shrink-0 flex items-center h-40 w-48">
                                                <div class="w-full sm:w-46 h-full bg-gray-100 rounded-lg"></div>
                                        </div>
                                        <div class="flex-1 min-w-0 flex flex-col h-40">
                                                <div class="flex flex-row mb-2 gap-2">
                                                        <div class="h-6 w-24 bg-gray-100 rounded"></div>
                                                        <div class="h-6 w-16 bg-gray-100 rounded"></div>
                                                </div>
                                                <div class="my-2 h-6 w-3/4 bg-gray-100 rounded"></div>
                                                <div class="flex-1 space-y-2">
                                                        <div class="h-4 w-full bg-gray-100 rounded"></div>
                                                        <div class="h-4 w-5/6 bg-gray-100 rounded"></div>
                                                </div>
                                        </div>
                                </div>
                        </div>
                </a-spin>

                <!-- 文章列表 -->
                <template v-else-if="articleList.length > 0">
                        <router-link
                            v-for="article in articleList"
                            :key="article.id"
                            :to="`/article/${article.id}`"
                            class="block flex flex-col sm:flex-row bg-white mb-8 gap-6 transition-all duration-300 rounded-lg p-2 sm:p-0"
                        >
                                <div class="flex-shrink-0 flex items-center h-40 w-full sm:w-48 relative">
                                        <img
                                            :alt="article.title"
                                            :class="['w-full', 'sm:w-46', 'h-full', 'object-cover', 'rounded-lg', { 'opacity-50': article.isTop }]"
                                            :src="article.coverImage || defaultCover"
                                            @error="handleImageError"
                                        >
                                        <a-badge
                                            v-if="article.isTop"
                                            class="absolute top-2 left-2"
                                            color="red"
                                            text="置顶"
                                        />
                                </div>
                                <div class="flex-1 min-w-0 flex flex-col h-40 relative">
                                        <div class="flex flex-row mb-2 flex-wrap gap-1">
                                                <a-tag :bordered="false">
                                                        <template #icon>
                                                                <CalendarOutlined/>
                                                        </template>
                                                        {{ formatDate(article.createTime) }}
                                                </a-tag>
                                                <a-tag :bordered="false" color="processing">
                                                        {{ article.categoryName || '未分类' }}
                                                </a-tag>
                                                <a-tag v-if="article.tags" :bordered="false" color="cyan">
                                                        {{ article.tags.split(',')[0] }}
                                                </a-tag>
                                        </div>
                                        <div class="my-2">
                                                <h1 class="text-lg font-semibold text-gray-800 hover:text-blue-500 line-clamp-1">
                                                        {{ article.title }}
                                                </h1>
                                        </div>
                                        <div class="h-full max-h-24 overflow-hidden flex-1">
                                                <p class="text-gray-600 line-clamp-3 text-sm">
                                                        {{ article.summary || '暂无摘要' }}
                                                </p>
                                        </div>
                                        <div class="flex items-center gap-4 text-xs text-gray-500 mt-2">
						<span class="flex items-center gap-1">
							<EyeOutlined/>
							{{ article.viewCount || 0 }}
						</span>
                                                <span class="flex items-center gap-1">
							<MessageOutlined/>
							{{ article.commentCount || 0 }}
						</span>
                                                <span class="flex items-center gap-1">
							<LikeOutlined/>
							{{ article.likeCount || 0 }}
						</span>
                                                <span class="ml-auto text-gray-400">
							{{ article.authorNickname || '匿名作者' }}
						</span>
                                        </div>
                                </div>
                        </router-link>
                </template>

                <!-- 空状态 -->
                <a-empty v-else-if="!loading" description="暂无文章"/>
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
import {articleApi} from '~/api/article/articleApi.js';
import {message} from 'ant-design-vue';
import {useArticleStore} from '~/stores/articleStore';

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
const pageSize = ref(5);
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
                const result = await articleApi.getPublicArticleList({
                        currentPage: currentPage.value,
                        pageSize: pageSize.value,
                        keyword: articleStore.searchKeyword.trim()
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
</script>

<style scoped>
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
