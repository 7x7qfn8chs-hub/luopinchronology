// 1. 获取容器
const timeline = document.getElementById("timeline");
const searchBox = document.getElementById("searchBox");

// 2. 读取 JSON 数据
let eventsData = [];
fetch('luopin.json')
    .then(response => response.json())
    .then(data => {
        eventsData = data;

        // 按年份排序
        eventsData.sort((a,b) => a.year - b.year);

        renderEvents(eventsData);
    })
    .catch(error => console.error("加载 JSON 出错:", error));

// 3. 渲染函数
function renderEvents(data, keyword='') {
  timeline.innerHTML = '';
  data.forEach(event => {
    const card = document.createElement('div');
    // TailwindCSS 美化
    card.className = 'bg-white rounded-lg shadow p-4 hover:shadow-lg transition duration-200';

    // 高亮函数
    function highlight(text, keyword) {
      if (!keyword) return text;
      const regex = new RegExp(`(${keyword})`, 'gi');
      return text.replace(regex, '<span class="bg-yellow-200">$1</span>');
    }

    card.innerHTML = `
      <h3 class="text-xl font-semibold mb-2 cursor-pointer">${highlight(event.title || '无标题', keyword)}</h3>
      <div class="text-gray-700 hidden">
        <p class="text-gray-600 mb-1"><strong>年份：</strong>${highlight(String(event.year), keyword)}</p>
        <p>${highlight(event.description || '无描述', keyword)}</p>
      </div>
    `;

    // 折叠展开事件
    const descDiv = card.querySelector('div');
    card.querySelector('h3').addEventListener('click', () => {
      descDiv.classList.toggle('hidden');
    });

    timeline.appendChild(card);
  });
}

// 4. 搜索功能
searchBox.addEventListener('input', () => {
    const keyword = searchBox.value.trim();
    const filtered = eventsData.filter(ev => 
        (ev.title && ev.title.includes(keyword)) || 
        (ev.description && ev.description.includes(keyword))
    );
    renderEvents(filtered, keyword);
});