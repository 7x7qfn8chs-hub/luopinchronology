# 罗聘年谱数字档案

**Luo Pin Digital Chronicle (1733-1799)**

一个清代画家罗聘的完整年谱数字档案，包含2296条历史记录。

## 🏛️ 项目概述

本项目是一个完整的数字档案系统，记录清代"扬州八怪"之一罗聘的生平事迹、艺术创作与交游经历。

### 📊 数据规模
- **2296条** 完整历史记录
- **66年** 时间跨度 (1733-1799)
- **多维度** 信息分类：生平、交游、创作、游历等

## 🗂️ 项目结构

```
luopinchronology/
├── src/                    # 源代码目录
│   ├── js/                # JavaScript模块
│   │   ├── data-loader.js     # 数据加载核心模块
│   │   └── timeline-dynamic.js # 动态时间轴模块
│   ├── css/               # 样式文件
│   └── images/            # 图片资源
├── data/                  # 数据文件
│   ├── luopin.json        # 主数据文件 (2296条记录)
│   └── luopin.xlsx        # 原始Excel数据源
├── pages/                 # 页面文件
│   ├── index.html         # 主页入口
│   ├── timeline.html      # 完整时间轴
│   ├── keyword.html       # 关键词搜索
│   ├── research.html      # 高级搜索
│   └── landingpage.html   # 着陆页
├── backup/                # 备份文件
└── README.md             # 项目文档
```

## 🚀 快速开始

### 本地运行
1. 克隆仓库
2. 直接在浏览器中打开任意HTML文件
3. 无需额外依赖，纯前端实现

### 页面导航
- **主页**: `landingpage.html` - 项目入口，包含快速导航
- **时间轴**: `timeline.html` - 完整按时间展示所有记录
- **搜索**: `research.html` - 高级关键词和时间段搜索
- **结果**: `keyword.html` - 搜索结果展示

## 🔍 搜索功能

### 支持搜索字段
- 年份 (1733-1799)
- 清代年号
- 事件描述
- 相关人物
- 地点信息
- 参考文献

### 搜索方式
- **关键词搜索**: 任意文本匹配
- **时间段筛选**: 自定义年份范围
- **组合查询**: 关键词+时间段

## 🎨 技术特点

- **纯前端实现**: HTML + CSS + JavaScript
- **响应式设计**: 适配所有设备尺寸
- **动态加载**: AJAX无刷新数据加载
- **优雅降级**: 支持禁用JavaScript的浏览器
- **SEO友好**: 静态页面结构

## 📱 浏览器兼容性

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- 移动端浏览器

## 🔄 开发状态

当前版本: v1.0.0 - 基础功能完成
- ✅ 数据连接完成
- ✅ 搜索功能实现
- ✅ 响应式设计
- ✅ 导航优化

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/new-feature`)
3. 提交更改 (`git commit -am 'Add new feature'`)
4. 推送到分支 (`git push origin feature/new-feature`)
5. 创建 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🏛️ 数据来源

- 《罗聘年谱》整理数据
- 清代档案文献
- 现代学术研究
- 博物馆收藏记录