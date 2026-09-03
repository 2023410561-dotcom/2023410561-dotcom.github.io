# 黎静蕾 · TK 海外剪辑师 个人作品集

> React + Vite 实现的个人作品集网站，深色高级风、1700px 适配 PC 端。

## 🚀 快速开始

```bash
# 1. 安装依赖
npm install

# 2. 启动开发服务器（默认 http://localhost:5173）
npm run dev

# 3. 打包生产版本
npm run build

# 4. 预览生产版本
npm run preview
```

## 📁 项目结构

```
portfolio-site/
├── package.json           # 依赖配置
├── vite.config.js         # Vite 配置
├── index.html             # HTML 入口（含 Google Fonts 预加载）
├── public/                # 静态资源
└── src/
    ├── main.jsx           # React 入口
    ├── App.jsx            # 主组件，串联所有 section
    ├── index.css          # 全局样式 + Design Tokens
    └── components/
        ├── Nav.jsx        # 顶部导航
        ├── Hero.jsx       # 全屏首页 Hero
        ├── About.jsx      # 个人经历模块
        ├── Projects.jsx   # 精选项目（含视频位）
        ├── Skills.jsx     # 个人优势
        └── Contact.jsx     # 底部联系方式
```

## 🎨 设计系统

### 色板（参考自提供图片）
- **背景色**: `#0a1628` → `#0d1b2e` → `#15263f` 深海军蓝渐层
- **强调色**: `#8be8cb`（Aquamarine）/ `#7ea2aa`（Cool Steel）
- **辅助色**: `#888da7`（Lavender Grey）/ `#9c7a97`（Dusty Mauve）
- **文字色**: `#f0f4f8` 主文 / `#a3b1c2` 次文 / `#6b7e94` 弱文

### 字体
- **Display**: `Inter` (Bold 800) - 大标题
- **Accent Serif**: `Cormorant Garamond` - 优雅装饰文字
- **Mono**: `JetBrains Mono` - 数据 / 标签
- **中文衬线**: `Noto Serif SC`

### 布局
- **最大宽度**: 1700px
- **内边距**: 80px（PC）/ 24px（移动端）
- **区块间距**: 100px

## ✏️ 如何替换内容

### 替换视频

打开 `src/components/Projects.jsx`，修改每个项目的 `videoSrc` 字段：

```jsx
// YouTube
videoSrc: 'https://www.youtube.com/embed/你的视频ID'

// Bilibili
videoSrc: 'https://player.bilibili.com/player.html?bvid=你的BV号'

// TikTok
videoSrc: 'https://www.tiktok.com/embed/v2/你的视频ID'

// 留空显示占位符
videoSrc: ''
```

### 替换个人头像

编辑 `src/components/About.jsx`，找到 `.about-avatar` 部分：

```jsx
<div className="about-avatar">L</div>
```

改为：
```jsx
<div className="about-avatar">
  <img src="/avatar.jpg" alt="黎静蕾" />
</div>
```

把 `avatar.jpg` 放到 `public/` 目录。

### 替换文案 / 数据

所有内容都集中在 `src/components/*.jsx` 中，按组件名查找即可：
- `Hero.jsx` — 首页大标题、副文案
- `About.jsx` — `stats` 和 `contacts` 数组
- `Projects.jsx` — `projects` 数组
- `Skills.jsx` — `skills` 数组
- `Contact.jsx` — `methods` 数组

## 🌐 部署

### 方案一：GitHub Pages（推荐，已安装 Web Deploy GitHub Pages 技能）
```bash
# 1. 构建
npm run build

# 2. 将 dist/ 目录部署到 GitHub Pages
#    （使用安装好的 web-deploy-github 技能）
```

### 方案二：CloudStudio（沙箱预览）
```bash
# 构建后，将 dist/ 目录上传到 CloudStudio 即可获得临时访问链接
```

### 方案三：静态托管
将 `dist/` 目录上传到任何静态网站服务（Vercel、Netlify、阿里云 OSS 等）。

## 🎯 后续优化

当前为基础版本，后续可以：
1. ✨ 添加滚动动画（IntersectionObserver + 渐入）
2. 🎬 接入实际项目视频
3. 📱 移动端布局优化
4. 🌙 主题切换（基于 CSS 变量）
5. 📊 添加更多作品分类筛选

---

Built with ❤️ by WorkBuddy · React + Vite