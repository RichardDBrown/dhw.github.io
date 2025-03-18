# DHW 文档管理系统

这是一个简单的前端文档管理系统，允许用户浏览、搜索和上传各种格式的文档。

## 功能特性

- 文档分类浏览
- 文档搜索功能
- 本地文档上传（支持Markdown、HTML和PDF）
- 从URL加载远程文档
- Markdown格式支持（使用Marked.js解析）
- 响应式设计（支持移动设备）
- 暗黑模式支持

## 技术栈

- HTML5
- CSS3 (使用CSS变量实现主题切换)
- JavaScript (原生)
- Bootstrap 5 (用于UI组件)
- Bootstrap Icons (用于图标)
- Marked.js (用于Markdown解析)

## 安装与使用

1. 克隆仓库：
```
git clone https://github.com/username/dhw.github.io.git
```

2. 直接在浏览器中打开`index.html`文件或使用Web服务器提供服务

## 文件结构

```
dhw.github.io/
├── index.html          # 主HTML文件
├── css/
│   └── style.css       # 样式表
├── js/
│   └── app.js          # JavaScript逻辑
├── docs/
│   └── sample.md       # 示例Markdown文档
└── README.md           # 项目说明文档
```

## 自定义文档

目前，文档数据存储在`js/app.js`文件的`documentData`数组中。在实际应用中，您可以将其替换为从API或本地文件系统中获取数据。

### 添加文档的方式

1. **上传本地文档**：点击界面右上角的"上传文档"按钮
2. **从URL加载**：点击界面右上角的"从URL加载"按钮，输入文档URL
3. **手动添加**：修改`js/app.js`中的`documentData`数组

## 支持的文档格式

- Markdown (.md)
- HTML (.html)
- PDF (.pdf)（需浏览器支持）

## 浏览器兼容性

该项目使用现代Web技术构建，建议使用以下浏览器的最新版本：

- Google Chrome
- Mozilla Firefox
- Microsoft Edge
- Safari

## 许可证

MIT 