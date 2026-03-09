<template>
        <img alt=""
             class="fixed top-0 left-0 w-full h-full object-cover opacity-50  pointer-events-none min-w-[100vw] min-h-[100vh] "
             src="../assets/images/web_bg.avif">
        <header class="sticky top-0 left-0 right-0 z-40 duration-300 flex justify-center">
                <!--                <div-->
                <!--                    class="my-6 backdrop-blur-md bg-white/88 rounded-full shadow-[0_0px_0.34px_0.34px_rgba(30,45,82,0.06),0.34px_0.34px_0.34px_0px_rgba(30,45,82,0.2)] opacity-100">-->
                <!--                        <div class="p-2 flex justify-between w-80 flex-row">-->
                <!--                                <div class="mx-4">-->
                <!--                                        123123-->
                <!--                                </div>-->
                <!--                                <div class="mx-4">-->
                <!--                                        123-->
                <!--                                </div>-->
                <!--                        </div>-->
                <!--                </div>-->
                <div
                    class="my-6 w-full max-w-4xl  mx-12 backdrop-blur-md bg-white/60 rounded-full shadow-[0_0px_0.34px_0.34px_rgba(30,45,82,0.06),0.34px_0.34px_0.34px_0px_rgba(30,45,82,0.2)] opacity-100">
                        <div class="p-2 flex justify-between flex-row">
                                <div class="mx-4 flex h-10">
                                        <div class="flex items-center">
                                                <img alt="" height="30" src="../assets/images/白猫.svg" width="30">
                                        </div>
                                        <div class="hidden md:flex items-center gap-2 mx-4">
                                                <a-button type="link">主页</a-button>
                                                <a-button type="text">友情链接</a-button>
                                                <a-button type="text">MyBlog</a-button>

                                        </div>
                                </div>
                                <div class="flex items-center gap-2 mx-1 ">
                                        <a
                                            class="hidden md:flex p-2 text-md px-6 text-white rounded-full bg-gradient-to-b from-gray-600 to-gray-900 shadow-[inset_0_1px_1px_0px_rgba(255,255,255,0.25),0_3px_3px_0px_rgba(0,0,0,0.15)]"
                                            href="#">
                                                登陆
                                        </a>
                                        <div class="mx-4 flex md:hidden">
                                                <MenuOutlined/>
                                        </div>
                                </div>
                        </div>
                </div>

        </header>

</template>

<script setup>

</script>