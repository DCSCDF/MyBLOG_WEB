<template>
        <div class="my-36"></div>
        <div class="mx-auto  max-w-7xl w-auto">
                <!--                <header class="mb-12 md:mx-32 mx-4 lg:mx-14">-->
                <!--                        <h1 class="text-3xl font-extrabold tracking-tight text-on-background mb-4">-->
                <!--                                最新文章</h1>-->
                <!--                        <p class="text-secondary text-lg max-w-xl leading-relaxed">Reflections on-->
                <!--                                design, technology, and-->
                <!--                                the subtle art of curation.</p>-->
                <!--                </header>-->
                <div class="flex md:mx-32 mx-4 lg:mx-14 w-auto flex-col lg:flex-row lg:gap-10">
                        <div class="basis-2/3">
                                <content-list
                                    :initial-data="articleData"
                                ></content-list>
                        </div>
                        <div class="basis-1/3">
                                <div class="lg:sticky lg:top-28">
                                        <sidebar
                                            :initial-categories="categoryData"
                                        ></sidebar>
                                </div>
                        </div>

                </div>
        </div>
</template>

<script lang="ts" setup>
import Sidebar from "~/components/blog/Sidebar.vue";
import ContentList from "~/components/blog/ContentList.vue";
import {articleApi} from '~/api/article/articleApi.js';
import {categoryApi} from '~/api/category/categoryApi.js';

// 启用 SSR - 在服务端获取初始文章列表
const {data: articleData} = await useAsyncData(
    'home-articles',
    async () => {
            const result = await articleApi.getPublicArticleList({
                    currentPage: 1,
                    pageSize: 7,
                    keyword: '',
                    categoryId: undefined
            });
            return result?.data || {records: [], total: 0};
    }
);

// 启用 SSR - 在服务端获取分类列表
const {data: categoryData} = await useAsyncData(
    'home-categories',
    async () => {
            const result = await categoryApi.getCategoryList();
            return result?.data || [];
    }
);
</script>
