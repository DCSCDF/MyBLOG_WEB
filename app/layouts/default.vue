<template>
        <div>
                <img alt=""
                     class="fixed top-0 left-0 w-full h-full object-cover opacity-50 z-40 pointer-events-none min-w-[100vw] min-h-[100vh] "
                     src="../assets/images/webbg.webp"
                     style="mix-blend-mode: multiply;">

                <div class="min-h-screen flex flex-col">
                        <a-back-top/>
                        <app-header/>

                        <main class="flex-1">
                                <slot/>
                        </main>

                        <app-footer/>

                </div>
        </div>
</template>


<script lang="ts" setup>

</script>


<style scoped>

</style>