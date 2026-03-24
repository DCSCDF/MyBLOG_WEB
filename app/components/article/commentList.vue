<template>
        <section>
                <h3 class="text-2xl font-headline font-bold text-on-background mb-8 border-b pb-2 border-outline-variant/10">
                        评论</h3>
                <!-- Updated Comment Input Form -->


                <div class="mb-12">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                        <label
                                            class="block text-xs font-bold text-secondary uppercase tracking-wider mb-1.5 ml-0.5">名称</label>
                                        <input
                                            class="antd-input w-full px-3 py-2 text-sm rounded-md border-[1.6px] border-gray-200"
                                            placeholder="e.g. John Doe" type="text"/>
                                </div>
                                <div>
                                        <label
                                            class="block text-xs font-bold text-secondary uppercase tracking-wider mb-1.5 ml-0.5">邮箱</label>
                                        <input
                                            class="antd-input w-full px-3 py-2 text-sm rounded-md border-[1.6px] border-gray-200"
                                            placeholder="email@address.com" type="email"/>
                                </div>
                                <div>
                                        <label
                                            class="block text-xs font-bold text-secondary uppercase tracking-wider mb-1.5 ml-0.5">头像链接</label>
                                        <input
                                            class="antd-input w-full px-3 py-2 text-sm rounded-md border-[1.6px] border-gray-200"
                                            placeholder="https://image.url" type="url"/>
                                </div>
                                <div>
                                        <label
                                            class="block text-xs font-bold text-secondary uppercase tracking-wider mb-1.5 ml-0.5">网站链接</label>
                                        <input
                                            class="antd-input w-full px-3 py-2 text-sm rounded-md border-[1.6px] border-gray-200"
                                            placeholder="https://yoursite.com" type="url"/>
                                </div>
                        </div>
                        <div class="mb-4">
                                <label
                                    class="block text-xs font-bold text-secondary uppercase tracking-wider mb-1.5 ml-0.5">评论内容</label>
                                <textarea
                                    class="antd-input w-full p-3 text-sm min-h-[100px] rounded-md border-[1.6px] border-gray-200"
                                    placeholder="Write a comment..."></textarea>
                        </div>
                        <div class="flex justify-end">
                                <button
                                    class="bg-primary text-white px-8 py-2.5 rounded-md text-sm font-semibold hover:opacity-90 transition-opacity">
                                        提交评论
                                </button>
                        </div>
                </div>


                <!-- Updated Comment List -->
                <div class="space-y-0">
                        <!-- Admin Comment -->
                        <div class="py-8 border-b border-outline-variant/10">
                                <div class="flex flex-col md:flex-row gap-4">
                                        <img alt="Erik Van-Houten" class="w-10 h-10 rounded-full object-cover"
                                             src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAfqE3IeomA_rncCU6i4peY-tj13ziMy-7GPiJsFrHRJowqC1bnvUIf3PaCAwEqGQNCLZB2JzetM-xVNpPynnMAtIOAaFA-Bke1XoWJWAv6vYz1E2CDkv2IfEhEqNICOuLwnDfu47nzNaUZGM7gEeL-204mXSZrZwKsdombIajktKFiiOIyM9ZUcrFlk-3oIngh6CO3xid_4LKSob62ghtJyONlK5eJwPQh8vUt40XJ1P2FgT_g2FHiVDAe59tWL6W0xafg4pLHp8"/>
                                        <div class="flex-1">
                                                <div class="flex items-center gap-2 mb-1 flex-wrap">
                                                        <span class="text-sm font-bold text-on-background">Erik Van-Houten</span>
                                                        <span class="text-xs text-outline">erik***@techjournal.io</span>
                                                        <a-tag :bordered="false" color="red">管理员</a-tag>
                                                </div>
                                                <p class="text-sm text-on-surface-variant leading-relaxed mb-3">Thanks
                                                        for reading. The source code for the memory pool implementation
                                                        mentioned in section 2 will be released on GitHub next week.</p>
                                                <div
                                                    class="flex items-center gap-4 text-[11px] text-outline font-medium">
                                                        <span>2024-03-20 14:30</span>
                                                        <button
                                                            class="text-primary hover:underline cursor-pointer font-bold">
                                                                回复
                                                        </button>
                                                </div>
                                                <!-- Nested Child -->
                                                <div class="mt-6 space-y-6">
                                                        <div class="flex gap-3 pl-6 border-l-2 border-slate-100">
                                                                <div
                                                                    class="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center text-secondary font-bold text-[10px]">
                                                                        JD
                                                                </div>
                                                                <div class="flex-1">
                                                                        <div
                                                                            class="flex items-center gap-2 mb-1 flex-wrap">
                                                                                <span
                                                                                    class="text-xs font-bold text-on-background">John Doe</span>
                                                                                <span class="text-xs text-blue-500">@Erik Van-Houten</span>
                                                                        </div>
                                                                        <p class="text-sm text-on-surface-variant leading-relaxed mb-2">
                                                                                Will the source code be available under
                                                                                an MIT license?</p>
                                                                        <div
                                                                            class="flex items-center gap-3 text-[10px] text-outline font-medium">
                                                                                <span>2024-03-20 15:05</span>
                                                                                <button
                                                                                    class="text-primary hover:underline cursor-pointer font-bold">
                                                                                        回复
                                                                                </button>
                                                                        </div>
                                                                </div>
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        </div>


                        <!-- Updated Comment List -->
                        <div class="space-y-0">
                                <!-- Admin Comment -->
                                <div class="py-8 border-b border-outline-variant/10">
                                        <div class="flex flex-col md:flex-row gap-4">
                                                <img alt="Erik Van-Houten" class="w-10 h-10 rounded-full object-cover"
                                                     src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAfqE3IeomA_rncCU6i4peY-tj13ziMy-7GPiJsFrHRJowqC1bnvUIf3PaCAwEqGQNCLZB2JzetM-xVNpPynnMAtIOAaFA-Bke1XoWJWAv6vYz1E2CDkv2IfEhEqNICOuLwnDfu47nzNaUZGM7gEeL-204mXSZrZwKsdombIajktKFiiOIyM9ZUcrFlk-3oIngh6CO3xid_4LKSob62ghtJyONlK5eJwPQh8vUt40XJ1P2FgT_g2FHiVDAe59tWL6W0xafg4pLHp8"/>
                                                <div class="flex-1">
                                                        <div class="flex items-center gap-2 mb-1 flex-wrap">
                                                                <span class="text-sm font-bold text-on-background">Erik Van-Houten</span>
                                                                <span class="text-xs text-outline">erik***@techjournal.io</span>
                                                                <a-tag :bordered="false" color="red">管理员</a-tag>
                                                        </div>
                                                        <p class="text-sm text-on-surface-variant leading-relaxed mb-3">
                                                                Thanks
                                                                for reading. The source code for the memory pool
                                                                implementation
                                                                mentioned in section 2 will be released on GitHub next
                                                                week.</p>
                                                        <div
                                                            class="flex items-center gap-4 text-[11px] text-outline font-medium">
                                                                <span>2024-03-20 14:30</span>
                                                                <button
                                                                    class="text-primary hover:underline cursor-pointer font-bold">
                                                                        回复
                                                                </button>
                                                        </div>

                                                        <!--点击回复会展开的内容-->
                                                        <div class="mt-6">
                                                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                                                        <div>
                                                                                <label
                                                                                    class="block text-xs font-bold text-secondary uppercase tracking-wider mb-1.5 ml-0.5">名称</label>
                                                                                <input
                                                                                    class="antd-input w-full px-3 py-2 text-sm rounded-md border-[1.6px] border-gray-200"
                                                                                    placeholder="e.g. John Doe"
                                                                                    type="text"/>
                                                                        </div>
                                                                        <div>
                                                                                <label
                                                                                    class="block text-xs font-bold text-secondary uppercase tracking-wider mb-1.5 ml-0.5">邮箱</label>
                                                                                <input
                                                                                    class="antd-input w-full px-3 py-2 text-sm rounded-md border-[1.6px] border-gray-200"
                                                                                    placeholder="email@address.com"
                                                                                    type="email"/>
                                                                        </div>
                                                                        <div>
                                                                                <label
                                                                                    class="block text-xs font-bold text-secondary uppercase tracking-wider mb-1.5 ml-0.5">头像链接</label>
                                                                                <input
                                                                                    class="antd-input w-full px-3 py-2 text-sm rounded-md border-[1.6px] border-gray-200"
                                                                                    placeholder="https://image.url"
                                                                                    type="url"/>
                                                                        </div>
                                                                        <div>
                                                                                <label
                                                                                    class="block text-xs font-bold text-secondary uppercase tracking-wider mb-1.5 ml-0.5">网站链接</label>
                                                                                <input
                                                                                    class="antd-input w-full px-3 py-2 text-sm rounded-md border-[1.6px] border-gray-200"
                                                                                    placeholder="https://yoursite.com"
                                                                                    type="url"/>
                                                                        </div>
                                                                </div>
                                                                <div class="mb-4">
                                                                        <label
                                                                            class="block text-xs font-bold text-secondary uppercase tracking-wider mb-1.5 ml-0.5">评论内容</label>
                                                                        <textarea
                                                                            class="antd-input w-full p-3 text-sm min-h-[100px] rounded-md border-[1.6px] border-gray-200"
                                                                            placeholder="Write a comment..."></textarea>
                                                                </div>
                                                                <div class="flex justify-end">
                                                                        <button
                                                                            class="bg-gray-200 mx-3  px-8 py-2.5 rounded-md text-sm font-semibold hover:opacity-90 transition-opacity">
                                                                                关闭
                                                                        </button>
                                                                        <button
                                                                            class="bg-primary text-white px-8 py-2.5 rounded-md text-sm font-semibold hover:opacity-90 transition-opacity">
                                                                                提交评论
                                                                        </button>
                                                                </div>
                                                        </div>

                                                        <!-- Nested Child -->
                                                        <div class="mt-6 space-y-6">
                                                                <div
                                                                    class="flex flex-col md:flex-row gap-3 pl-6 border-l-2 border-slate-100">

                                                                        <img alt="Erik Van-Houten"
                                                                             class="w-10 h-10 rounded-full object-cover"
                                                                             src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAfqE3IeomA_rncCU6i4peY-tj13ziMy-7GPiJsFrHRJowqC1bnvUIf3PaCAwEqGQNCLZB2JzetM-xVNpPynnMAtIOAaFA-Bke1XoWJWAv6vYz1E2CDkv2IfEhEqNICOuLwnDfu47nzNaUZGM7gEeL-204mXSZrZwKsdombIajktKFiiOIyM9ZUcrFlk-3oIngh6CO3xid_4LKSob62ghtJyONlK5eJwPQh8vUt40XJ1P2FgT_g2FHiVDAe59tWL6W0xafg4pLHp8"/>

                                                                        <div class="flex-1">
                                                                                <div
                                                                                    class="flex items-center gap-2 mb-1 flex-wrap">
                                                                                <span
                                                                                    class="text-xs font-bold text-on-background">John Doe</span>
                                                                                        <span
                                                                                            class="text-xs text-blue-500">@Erik Van-Houten</span>
                                                                                </div>
                                                                                <p class="text-sm text-on-surface-variant leading-relaxed mb-2">
                                                                                        Will the source code be
                                                                                        available under
                                                                                        an MIT license?</p>
                                                                                <div
                                                                                    class="flex items-center gap-3 text-[10px] text-outline font-medium">
                                                                                        <span>2024-03-20 15:05</span>
                                                                                        <button
                                                                                            class="text-primary hover:underline cursor-pointer font-bold">
                                                                                                回复
                                                                                        </button>
                                                                                </div>
                                                                        </div>
                                                                </div>
                                                        </div>

                                                        <!--点击回复会展开的内容-->
                                                        <div class="mt-6">
                                                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                                                        <div>
                                                                                <label
                                                                                    class="block text-xs font-bold text-secondary uppercase tracking-wider mb-1.5 ml-0.5">名称</label>
                                                                                <input
                                                                                    class="antd-input w-full px-3 py-2 text-sm rounded-md border-[1.6px] border-gray-200"
                                                                                    placeholder="e.g. John Doe"
                                                                                    type="text"/>
                                                                        </div>
                                                                        <div>
                                                                                <label
                                                                                    class="block text-xs font-bold text-secondary uppercase tracking-wider mb-1.5 ml-0.5">邮箱</label>
                                                                                <input
                                                                                    class="antd-input w-full px-3 py-2 text-sm rounded-md border-[1.6px] border-gray-200"
                                                                                    placeholder="email@address.com"
                                                                                    type="email"/>
                                                                        </div>
                                                                        <div>
                                                                                <label
                                                                                    class="block text-xs font-bold text-secondary uppercase tracking-wider mb-1.5 ml-0.5">头像链接</label>
                                                                                <input
                                                                                    class="antd-input w-full px-3 py-2 text-sm rounded-md border-[1.6px] border-gray-200"
                                                                                    placeholder="https://image.url"
                                                                                    type="url"/>
                                                                        </div>
                                                                        <div>
                                                                                <label
                                                                                    class="block text-xs font-bold text-secondary uppercase tracking-wider mb-1.5 ml-0.5">网站链接</label>
                                                                                <input
                                                                                    class="antd-input w-full px-3 py-2 text-sm rounded-md border-[1.6px] border-gray-200"
                                                                                    placeholder="https://yoursite.com"
                                                                                    type="url"/>
                                                                        </div>
                                                                </div>
                                                                <div class="mb-4">
                                                                        <label
                                                                            class="block text-xs font-bold text-secondary uppercase tracking-wider mb-1.5 ml-0.5">评论内容</label>
                                                                        <textarea
                                                                            class="antd-input w-full p-3 text-sm min-h-[100px] rounded-md border-[1.6px] border-gray-200"
                                                                            placeholder="Write a comment..."></textarea>
                                                                </div>
                                                                <div class="flex justify-end">
                                                                        <button
                                                                            class="bg-gray-200 mx-3  px-8 py-2.5 rounded-md text-sm font-semibold hover:opacity-90 transition-opacity">
                                                                                关闭
                                                                        </button>
                                                                        <button
                                                                            class="bg-primary text-white px-8 py-2.5 rounded-md text-sm font-semibold hover:opacity-90 transition-opacity">
                                                                                提交评论
                                                                        </button>
                                                                </div>
                                                        </div>


                                                </div>
                                        </div>
                                </div>
                        </div>


                </div>
        </section>


</template>

<script lang="ts" setup>

</script>
