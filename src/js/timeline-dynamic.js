/**
 * 罗聘年谱时间轴动态加载脚本
 * 用于从JSON数据动态生成时间轴内容
 */

// 动态加载年谱数据
document.addEventListener('DOMContentLoaded', async () => {
    const chronologyContainer = document.getElementById('chronology-container');
    const timelineLine = document.getElementById('timeline-line');

    if (!chronologyContainer) {
        console.error('找不到chronology-container元素');
        return;
    }

    // 清空现有的静态内容（保留时间线和容器结构）
    const existingEntries = chronologyContainer.querySelectorAll('.timeline-entry');
    existingEntries.forEach(entry => entry.remove());

    try {
        // 加载数据
        const data = await window.luoPinData.getAllData();

        if (data.length === 0) {
            // 添加错误状态
            const errorDiv = document.createElement('div');
            errorDiv.className = 'text-center py-20';
            errorDiv.innerHTML = `
                <div class="text-2xl font-headline text-red-500 mb-4">数据加载失败</div>
                <div class="text-outline">请检查网络连接或刷新页面重试</div>
            `;
            chronologyContainer.appendChild(errorDiv);
            return;
        }

        // 生成时间轴内容
        const timelineHTML = data.map((item, index) => `
            <div class="relative grid grid-cols-1 md:grid-cols-3 gap-4 py-6 border-b border-outline-variant/10 timeline-entry" data-year="${item.year}">
                <div class="md:text-right pr-6 z-10 timeline-trigger">
                    <div class="flex flex-col md:items-end">
                        <span class="text-xl md:text-2xl font-headline font-medium text-primary">${item.year}</span>
                        <span class="text-sm md:text-base font-headline text-on-surface mt-1">${item.qing_calendar}</span>
                        <span class="font-label text-[10px] uppercase tracking-wide text-outline mt-2 bg-surface-container-low px-2 py-1 inline-block">${item.age}岁</span>
                    </div>
                </div>
                <div class="md:col-span-2 pl-2 md:pl-8">
                    <div class="max-w-xl">
                        ${item.title ? `<p class="text-base md:text-lg leading-normal font-serif mb-2">${item.title}</p>` : ''}
                        <p class="text-base md:text-lg leading-normal font-serif mb-2">${item.description}</p>
                        ${item.reference ? `<p class="text-xs font-label text-outline text-right italic tracking-wide">参考文献: ${item.reference}</p>` : ''}
                    </div>
                </div>
            </div>
        `).join('');

        // 添加到容器中
        chronologyContainer.insertAdjacentHTML('beforeend', timelineHTML);

        // 重新初始化观察器
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -15% 0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.timeline-trigger').forEach(el => observer.observe(el));
        timelineLine.classList.add('is-visible');

    } catch (error) {
        console.error('加载年谱数据失败:', error);
        const errorDiv = document.createElement('div');
        errorDiv.className = 'text-center py-20';
        errorDiv.innerHTML = `
            <div class="text-2xl font-headline text-red-500 mb-4">数据加载失败</div>
            <div class="text-outline">请检查网络连接或刷新页面重试</div>
        `;
        chronologyContainer.appendChild(errorDiv);
    }
});