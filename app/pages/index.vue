<template>
        <div class="md:my-36 my-20"></div>
        <div class="mx-auto  max-w-7xl w-auto">
                <div class="flex md:mx-32 mx-4 lg:mx-14 w-auto flex-col lg:flex-row lg:gap-10">
                        <div class="basis-2/3">
                                <content-list></content-list>
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
import {categoryApi} from '~/api/category/categoryApi.js';

// 启用 SSR - 在服务端获取分类列表
const {data: categoryData} = await useAsyncData(
    'home-categories',
    async () => {
            const result = await categoryApi.getCategoryList();
            return result?.data || [];
    }
);
</script>
