<template>
        <!-- 文章分类 -->
        <div class="p-1">
                <h3 class="text-[0.7rem] font-bold tracking-[0.15em] uppercase text-secondary/50 mb-4">
                        文章分类
                </h3>
                <div v-if="loading" class="flex flex-wrap gap-2">
                        <div v-for="i in 4" :key="i"
                             class="px-4 py-1.5 bg-gray-100 rounded-full animate-pulse"></div>
                </div>
                <div v-else-if="categoryList.length > 0" class="flex flex-wrap gap-3">
                        <router-link
                            v-for="category in categoryList"
                            :key="category.id"
                            :class="[
					'px-3 py-1.5 border rounded-md text-xs font-medium transition-colors cursor-pointer ',
					isActiveCategory(category.id)
						? 'bg-primary text-white border-primary '
						: 'bg-gray-100 border-outline-variant/20 text-secondary hover:border-primary hover:text-primary '
				]"
                            :to="isActiveCategory(category.id) ? '/' : { path: '/', query: { categoryId: category.id } }"
                        >
                                {{ category.name }}
                        </router-link>
                        
                </div>
                <p v-else class="text-xs text-secondary/60 px-1">暂无分类</p>
        </div>


</template>

<script lang="ts" setup>
import {computed, ref} from 'vue';
import {useRoute} from 'vue-router';

const props = defineProps<{
        initialCategories?: any[];
}>();

const route = useRoute();

// 当前选中的分类ID
const currentCategoryId = computed(() => {
        return route.query.categoryId ? Number(route.query.categoryId) : null;
});

// 判断分类是否被选中
const isActiveCategory = (categoryId: number) => {
        return currentCategoryId.value === categoryId;
};

// 分类列表数据 - 优先使用传入的初始数据
const categoryList = ref<any[]>(props.initialCategories || []);

// 加载状态 - 如果有初始数据则不需要加载
const loading = ref(!props.initialCategories?.length);

// 延迟加载分类列表（仅在无初始数据时调用）
import {onMounted} from 'vue';
import {categoryApi} from '~/api/category/categoryApi.js';
import {message} from 'ant-design-vue';

const fetchCategoryList = async () => {
        if (props.initialCategories?.length) return; // 已有数据，跳过

        loading.value = true;
        try {
                const result = await categoryApi.getCategoryList();
                if (result && result.data) {
                        categoryList.value = result.data || [];
                } else {
                        categoryList.value = [];
                }
        } catch (error: any) {
                console.error('获取分类列表失败:', error);
                message.error(error.message || '获取分类列表失败');
                categoryList.value = [];
        } finally {
                loading.value = false;
        }
};

// 组件挂载时获取数据（仅在无初始数据时）
onMounted(() => {
        fetchCategoryList();
});
</script>

<style scoped>

</style>
