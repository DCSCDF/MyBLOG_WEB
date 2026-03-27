<template>
	<div>
		<nuxt-layout>
			<nuxt-page/>
		</nuxt-layout>
	</div>
</template>

<style>
/* 修复Tailwind CSS导致的图片图标居中问题 */
img, svg, video, canvas, audio, iframe, embed, object {
        vertical-align: baseline !important;
}

/* 全局滚动条样式 */
::-webkit-scrollbar {
        width: 6px;
        height: 6px;
}

::-webkit-scrollbar-track {
        background: transparent;
}

::-webkit-scrollbar-thumb {
        background: rgba(155, 155, 155, 0.5);
        border-radius: 6px;
}

::-webkit-scrollbar-thumb:hover {
        background: rgba(155, 155, 155, 0.7);
}

/* 文章内容表格样式 */
.prose-sm table,
.prose table {
        width: 100%;
        border-collapse: collapse;
        border-radius: 8px;
        overflow: hidden;
        border: 1px solid #e5e7eb;
}

.prose-sm table thead,
.prose table thead {
        background-color: #f3f4f6;
}

.dark .prose-sm table thead,
.dark .prose table thead {
        background-color: #374151;
}

.prose-sm table th,
.prose table th,
.prose-sm table td,
.prose table td {
        padding: 12px 16px;
        border: 1px solid #e5e7eb;
        text-align: left;
}

.dark .prose-sm table th,
.dark .prose table th,
.dark .prose-sm table td,
.dark .prose table td {
        border-color: #4b5563;
}

.prose-sm table th,
.prose table th {
        font-weight: 600;
        color: #111827;
}

.dark .prose-sm table th,
.dark .prose table th {
        color: #f9fafb;
}

.prose-sm table td,
.prose table td {
        color: #374151;
}

.dark .prose-sm table td,
.dark .prose table td {
        color: #d1d5db;
}

.prose-sm table tr:nth-child(even),
.prose table tr:nth-child(even) {
        background-color: #f9fafb;
}

.dark .prose-sm table tr:nth-child(even),
.dark .prose table tr:nth-child(even) {
        background-color: rgba(55, 65, 81, 0.5);
}

.prose-sm table tr:hover,
.prose table tr:hover {
        background-color: #f3f4f6;
}

.dark .prose-sm table tr:hover,
.dark .prose table tr:hover {
        background-color: #374151;
}

/* 文章代码块增强样式 */
.prose pre,
.prose-lg pre {
        position: relative;
}

.prose pre code,
.prose-lg pre code {
        display: block;
        padding: 0 1.5rem !important;
        line-height: 1.7;
}

/* 文章图片增强样式 */
.prose img,
.prose-lg img {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.prose img:hover,
.prose-lg img:hover {
        transform: scale(1.01);
}

/* 文章引用块样式 */
.prose blockquote,
.prose-lg blockquote {
        position: relative;
}

.prose blockquote::before,
.prose-lg blockquote::before {
        content: '"';
        position: absolute;
        left: 0.5rem;
        top: -0.5rem;
        font-size: 3rem;
        color: currentColor;
        opacity: 0.2;
        font-family: Georgia, serif;
        line-height: 1;
}

/* 文章列表标记样式 */
.prose ul li::marker,
.prose-lg ul li::marker {
        color: #3b82f6;
}

.prose ol li::marker,
.prose-lg ol li::marker {
        color: #3b82f6;
        font-weight: 600;
}

/* 文章链接下划线动画 */
.prose a,
.prose-lg a {
        transition: color 0.2s ease, border-color 0.2s ease;
}

/* 文章标题滚动锚点偏移 */
.prose h2,
.prose-lg h2,
.prose h3,
.prose-lg h3,
.prose h4,
.prose-lg h4 {
        scroll-margin-top: 5rem;
}
</style>