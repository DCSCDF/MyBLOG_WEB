<template>
        <div>
                <div class="md:my-36 my-20"></div>
                <div class="mx-auto  max-w-2xl px-3">

                        <content-list></content-list>
                        <!--                                <div class="flex w-auto flex-col-reverse lg:flex-row lg:gap-10">-->
                        <!--                                   -->
                        <!--                                        &lt;!&ndash;					<div class="basis-2/3">&ndash;&gt;-->
                        <!--                                        &lt;!&ndash;						<content-list></content-list>&ndash;&gt;-->
                        <!--                                        &lt;!&ndash;					</div>&ndash;&gt;-->
                        <!--                                        &lt;!&ndash; Sidebar - currently commented out-->
                        <!--                                        <div class="basis-1/3">-->
                        <!--                                                <div class="lg:sticky lg:top-28">-->
                        <!--                                                        <sidebar :initial-categories="categoryData"></sidebar>-->
                        <!--                                                </div>-->
                        <!--                                        </div>-->
                        <!--                                        &ndash;&gt;-->
                        <!--                                </div>-->

                </div>
        </div>
</template>

<script lang="ts" setup>
import ContentList from "~/components/blog/ContentList.vue";
</script>
