// 示例文档数据 - 实际应用中可能从服务器获取
const documentData = [
    {
        id: 'doc1',
        title: '入门指南',
        content: '# DHW文档管理系统入门指南\n\n## 简介\n\nDHW文档管理系统是一个简单的文档浏览和管理工具。\n\n## 功能特点\n\n- 支持Markdown格式\n- 分类管理文档\n- 搜索功能\n- 暗黑模式\n',
        category: '指南'
    },
    {
        id: 'doc2',
        title: '使用说明',
        content: '# 使用说明\n\n## 浏览文档\n\n点击左侧导航栏中的文档标题即可浏览文档内容。\n\n## 搜索\n\n在搜索框中输入关键词即可搜索相关文档。\n\n## 切换主题\n\n点击右上角的图标可以在亮色和暗色主题之间切换。\n',
        category: '指南'
    },
    {
        id: 'doc3',
        title: '技术规范',
        content: '# 技术规范\n\n## 前端技术\n\n- HTML5\n- CSS3\n- JavaScript\n- Bootstrap 5\n\n## 支持的文档格式\n\n- Markdown\n- HTML\n- PDF\n',
        category: '技术'
    }
];

// DOM加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化文档树
    initDocumentTree();
    
    // 初始化搜索功能
    initSearch();
    
    // 初始化暗黑模式
    initDarkMode();
    
    // 添加上传文档按钮
    addUploadButton();
    
    // 添加从URL加载文档按钮
    addLoadFromUrlButton();
});

// 初始化文档树
function initDocumentTree() {
    const documentTree = document.getElementById('documentTree');
    const categories = {};
    
    // 分组文档
    documentData.forEach(doc => {
        if (!categories[doc.category]) {
            categories[doc.category] = [];
        }
        categories[doc.category].push(doc);
    });
    
    // 渲染文档树
    for (const category in categories) {
        // 创建分类标题
        const categoryHeader = document.createElement('li');
        categoryHeader.className = 'nav-item category-header';
        categoryHeader.innerHTML = `<span class="nav-link text-muted">${category}</span>`;
        documentTree.appendChild(categoryHeader);
        
        // 添加该分类下的文档
        categories[category].forEach(doc => {
            const docItem = document.createElement('li');
            docItem.className = 'nav-item';
            docItem.innerHTML = `<a class="nav-link" href="#" data-doc-id="${doc.id}">${doc.title}</a>`;
            documentTree.appendChild(docItem);
            
            // 添加点击事件
            docItem.querySelector('a').addEventListener('click', function(e) {
                e.preventDefault();
                displayDocument(doc.id);
                
                // 移除其他活动项目的激活状态
                document.querySelectorAll('#documentTree .nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                
                // 添加当前项目的激活状态
                this.classList.add('active');
            });
        });
    }
    
    // 默认显示第一个文档（如果有的话）
    if (documentData.length > 0) {
        displayDocument(documentData[0].id);
        document.querySelector(`#documentTree a[data-doc-id="${documentData[0].id}"]`).classList.add('active');
    }
}

// 显示文档内容
function displayDocument(docId) {
    const doc = documentData.find(d => d.id === docId);
    if (!doc) return;
    
    document.getElementById('currentDocTitle').textContent = doc.title;
    
    const contentDiv = document.getElementById('documentContent');
    // 使用marked库将Markdown转换为HTML
    contentDiv.innerHTML = marked.parse(doc.content);
}

// 初始化搜索功能
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        if (searchTerm.length < 2) {
            // 如果搜索词少于2个字符，显示所有文档
            document.querySelectorAll('#documentTree li').forEach(item => {
                item.style.display = 'block';
            });
            return;
        }
        
        // 隐藏所有文档和类别
        document.querySelectorAll('#documentTree li').forEach(item => {
            item.style.display = 'none';
        });
        
        // 显示匹配的文档
        documentData.forEach(doc => {
            if (doc.title.toLowerCase().includes(searchTerm) || 
                doc.content.toLowerCase().includes(searchTerm)) {
                const docLink = document.querySelector(`#documentTree a[data-doc-id="${doc.id}"]`);
                if (docLink) {
                    docLink.parentElement.style.display = 'block';
                    
                    // 显示该文档所属的类别
                    let categoryHeader = docLink.parentElement.previousElementSibling;
                    while (categoryHeader && !categoryHeader.classList.contains('category-header')) {
                        categoryHeader = categoryHeader.previousElementSibling;
                    }
                    
                    if (categoryHeader) {
                        categoryHeader.style.display = 'block';
                    }
                }
            }
        });
    });
}

// 初始化暗黑模式
function initDarkMode() {
    const toggleButton = document.getElementById('toggleDarkMode');
    const icon = toggleButton.querySelector('i');
    
    // 检查本地存储中的主题设置
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    
    // 应用保存的主题设置
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        icon.classList.remove('bi-moon');
        icon.classList.add('bi-sun');
    }
    
    // 切换暗黑模式
    toggleButton.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        const isDarkModeNow = document.body.classList.contains('dark-mode');
        
        // 更新图标
        if (isDarkModeNow) {
            icon.classList.remove('bi-moon');
            icon.classList.add('bi-sun');
        } else {
            icon.classList.remove('bi-sun');
            icon.classList.add('bi-moon');
        }
        
        // 保存设置到本地存储
        localStorage.setItem('darkMode', isDarkModeNow);
    });
}

// 添加上传文档功能
function uploadDocument() {
    // 创建一个隐藏的文件输入
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.md,.html,.pdf';
    fileInput.style.display = 'none';
    document.body.appendChild(fileInput);
    
    // 触发点击事件
    fileInput.click();
    
    // 监听文件选择事件
    fileInput.addEventListener('change', function() {
        if (this.files.length === 0) return;
        
        const file = this.files[0];
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const fileName = file.name;
            const fileExt = fileName.split('.').pop().toLowerCase();
            
            // 根据文件类型处理内容
            if (fileExt === 'md') {
                // 处理Markdown文件
                const newDoc = {
                    id: 'doc' + (documentData.length + 1),
                    title: fileName.replace('.' + fileExt, ''),
                    content: e.target.result,
                    category: '上传文档'
                };
                addNewDocument(newDoc);
                displayDocument(newDoc.id);
            } else if (fileExt === 'html') {
                // 处理HTML文件
                const newDoc = {
                    id: 'doc' + (documentData.length + 1),
                    title: fileName.replace('.' + fileExt, ''),
                    content: '```html\n' + e.target.result + '\n```',
                    category: '上传文档'
                };
                addNewDocument(newDoc);
                displayDocument(newDoc.id);
            } else if (fileExt === 'pdf') {
                // 处理PDF文件 - 嵌入PDF查看器
                const newDoc = {
                    id: 'doc' + (documentData.length + 1),
                    title: fileName.replace('.' + fileExt, ''),
                    content: '# ' + fileName + '\n\n<iframe src="' + URL.createObjectURL(file) + '" width="100%" height="600px"></iframe>',
                    category: '上传文档'
                };
                addNewDocument(newDoc);
                displayDocument(newDoc.id);
            }
        };
        
        // 读取文件内容
        if (file.type === 'application/pdf') {
            reader.readAsArrayBuffer(file);
        } else {
            reader.readAsText(file);
        }
        
        // 清理DOM
        document.body.removeChild(fileInput);
    });
}

// 从URL加载文档
function loadDocumentFromUrl() {
    const url = prompt('请输入文档URL:');
    if (!url) return;
    
    // 检查URL是否有效
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        alert('请输入有效的URL（以http://或https://开头）');
        return;
    }
    
    const fileName = url.split('/').pop() || '未命名文档';
    const fileExt = fileName.split('.').pop().toLowerCase();
    
    // 检查文件类型
    if (['md', 'html', 'pdf'].indexOf(fileExt) === -1) {
        alert('只支持.md、.html和.pdf格式的远程文档');
        return;
    }
    
    // 使用fetch加载文档
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('网络响应错误');
            }
            
            if (fileExt === 'pdf') {
                return response.blob();
            } else {
                return response.text();
            }
        })
        .then(content => {
            let docContent;
            
            if (fileExt === 'md') {
                docContent = content;
            } else if (fileExt === 'html') {
                docContent = '```html\n' + content + '\n```';
            } else if (fileExt === 'pdf') {
                const pdfUrl = URL.createObjectURL(content);
                docContent = '# ' + fileName + '\n\n<iframe src="' + pdfUrl + '" width="100%" height="600px"></iframe>';
            }
            
            const newDoc = {
                id: 'doc' + (documentData.length + 1),
                title: fileName.replace('.' + fileExt, ''),
                content: docContent,
                category: '远程文档'
            };
            
            addNewDocument(newDoc);
            displayDocument(newDoc.id);
        })
        .catch(error => {
            alert('无法加载文档: ' + error.message);
        });
}

// 添加上传按钮到界面
function addUploadButton() {
    const contentHeader = document.querySelector('.content-header');
    const uploadButton = document.createElement('button');
    uploadButton.className = 'btn btn-primary mx-2';
    uploadButton.innerHTML = '<i class="bi bi-upload"></i> 上传文档';
    uploadButton.addEventListener('click', uploadDocument);
    
    // 插入到头部操作区
    const headerActions = contentHeader.querySelector('.header-actions');
    headerActions.insertBefore(uploadButton, headerActions.firstChild);
}

// 添加从URL加载按钮
function addLoadFromUrlButton() {
    const contentHeader = document.querySelector('.content-header');
    const urlButton = document.createElement('button');
    urlButton.className = 'btn btn-outline-primary mx-2';
    urlButton.innerHTML = '<i class="bi bi-link"></i> 从URL加载';
    urlButton.addEventListener('click', loadDocumentFromUrl);
    
    // 插入到头部操作区
    const headerActions = contentHeader.querySelector('.header-actions');
    headerActions.insertBefore(urlButton, headerActions.firstChild);
}

// 添加新文档（示例函数）
function addNewDocument(doc) {
    documentData.push(doc);
    // 重新初始化文档树
    document.getElementById('documentTree').innerHTML = '';
    initDocumentTree();
} 