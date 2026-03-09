<template>

        <header class="sticky top-0 left-0 right-0 z-40 duration-300 flex justify-center">
                <div
                    class="my-6 w-full max-w-4xl mx-4 md:mx-12 bg-white/90 rounded-full backdrop-blur-md
                    shadow-[0_0px_0.34px_0.34px_rgba(30,45,82,0.06),0.34px_0.34px_0.34px_0px_rgba(30,45,82,0.2)] opacity-100 mix-blend-plus-lighter">
                        <div class="p-2 flex justify-between flex-row">
                                <div class="mx-4 flex h-10">
                                        <div class="flex items-center">
                                                <img alt="" height="30" src="../assets/images/白猫.svg" width="30">
                                        </div>
                                        <div class="hidden md:flex items-center gap-2 mx-4">
                                                <a-button v-for="(item, index) in menu" :key="index"
                                                          type="text">
                                                        {{ item.name }}
                                                </a-button>
                                        </div>
                                </div>
                                <div class="flex items-center gap-2 mx-1 ">
                                        <a
                                            class="hidden md:flex p-2 text-md px-6 text-white rounded-full bg-gradient-to-b
                                            from-gray-600 to-gray-900 shadow-[inset_0_1px_1px_0px_rgba(255,255,255,0.25),0_3px_3px_0px_rgba(0,0,0,0.15)]"
                                            href="#">
                                                登陆
                                        </a>
                                        <div class="mx-4 flex md:hidden">
                                                <button class="flex items-center" @click="toggleMenu">
                                                        <MenuOutlined :style="{ fontSize: '18px' }"/>
                                                </button>
                                        </div>
                                </div>
                        </div>
                </div>
        </header>

        <transition
            enter-active-class="transition-opacity duration-300"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition-opacity duration-300"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0">
                <div v-if="isMenuOpen" class="md:hidden fixed w-full h-full bg-white z-30">
                        <div class="mt-28 flex flex-col">
                                <a v-for="(item, index) in menu"
                                   :key="index" class="mb-4 mx-6 text-xl font-black "
                                   type="text">
                                        {{ item.name }}
                                </a>
                        </div>
                </div>
        </transition>
</template>

<script lang="ts" setup>

const menu = ref([
        {
                name: "主页",
                link: "/"
        },
        {
                name: "友情链接",
                link: "/"
        },
        {
                name: "MyBlog",
                link: "/"
        }
])

const isMenuOpen = ref(false)

const toggleMenu = () => {
        isMenuOpen.value = !isMenuOpen.value
}


</script>