/**
 * 罗聘年谱数据加载模块
 * 用于动态加载和展示luopin.json数据
 */

class LuoPinDataLoader {
    constructor() {
        this.data = null;
        this.loaded = false;
    }

    /**
     * 加载JSON数据
     * @returns {Promise} 返回数据加载的Promise
     */
    async loadData() {
        if (this.loaded && this.data) {
            return this.data;
        }

        try {
            const response = await fetch('../data/luopin.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.data = await response.json();
            this.loaded = true;
            console.log('罗聘年谱数据加载成功，共', this.data.length, '条记录');
            return this.data;
        } catch (error) {
            console.error('加载数据失败:', error);
            return [];
        }
    }

    /**
     * 获取所有数据
     * @returns {Array} 完整的年谱数据
     */
    async getAllData() {
        return await this.loadData();
    }

    /**
     * 根据年份范围筛选数据
     * @param {number} startYear 起始年份
     * @param {number} endYear 结束年份
     * @returns {Array} 筛选后的数据
     */
    async getDataByYearRange(startYear, endYear) {
        const data = await this.loadData();
        return data.filter(item => {
            const year = parseInt(item.year);
            return year >= startYear && year <= endYear;
        });
    }

    /**
     * 关键词搜索
     * @param {string} keyword 搜索关键词
     * @returns {Array} 匹配的搜索结果
     */
    async searchByKeyword(keyword) {
        const data = await this.loadData();
        if (!keyword || keyword.trim() === '') {
            return data;
        }

        const searchTerm = keyword.toLowerCase().trim();
        return data.filter(item => {
            return (
                (item.title && item.title.toLowerCase().includes(searchTerm)) ||
                (item.description && item.description.toLowerCase().includes(searchTerm)) ||
                (item.qing_calendar && item.qing_calendar.toLowerCase().includes(searchTerm)) ||
                (item.reference && item.reference.toLowerCase().includes(searchTerm))
            );
        });
    }

    /**
     * 获取年份范围
     * @returns {Object} 包含最小和最大年份的对象
     */
    async getYearRange() {
        const data = await this.loadData();
        if (data.length === 0) return { min: 1733, max: 1799 };

        const years = data.map(item => parseInt(item.year));
        return {
            min: Math.min(...years),
            max: Math.max(...years)
        };
    }

    /**
     * 获取特定年份的数据
     * @param {number} year 指定年份
     * @returns {Array} 该年份的所有记录
     */
    async getDataByYear(year) {
        const data = await this.loadData();
        return data.filter(item => parseInt(item.year) === year);
    }

    /**
     * 高亮文本中的关键词
     * @param {string} text 原始文本
     * @param {string} keyword 要高亮的关键词
     * @returns {string} 带有高亮标记的HTML
     */
    highlightKeyword(text, keyword) {
        if (!keyword || !text) return text;

        const regex = new RegExp(`(${keyword})`, 'gi');
        return text.replace(regex, '<span class="highlight-red">$1</span>');
    }

    /**
     * 格式化显示年份和年龄
     * @param {Object} item 数据项
     * @returns {Object} 格式化后的显示信息
     */
    formatDisplayData(item, keyword = '') {
        return {
            year: item.year,
            qingCalendar: item.qing_calendar,
            age: item.age,
            title: keyword ? this.highlightKeyword(item.title, keyword) : item.title,
            description: keyword ? this.highlightKeyword(item.description, keyword) : item.description,
            reference: item.reference,
            date: item.date
        };
    }
}

// 创建全局实例
window.luoPinData = new LuoPinDataLoader();