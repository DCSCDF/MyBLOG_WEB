<script lang="ts" setup>
import Sidebar from "~/components/blog/Sidebar.vue";
import ContentList from "~/components/blog/ContentList.vue";
</script>

<template>
        <div class="md:my-20"></div>
        <div class="mx-auto  max-w-7xl w-auto">
                <div class="flex md:mx-32 mx-4 lg:mx-14 w-auto flex-col lg:flex-row lg:gap-10">
                        <div class="basis-1/3">
                                <div class="lg:sticky lg:top-28">
                                        <sidebar></sidebar>
                                </div>
                        </div>
                        <div class="basis-2/3">
                                <content-list></content-list>
                        </div>
                </div>
        </div>
</template>

<style scoped>

</style>