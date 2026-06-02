// ============================================
// صوت الحقيقة - ملف الجافاسكريبت الرئيسي
// ============================================

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    renderNews();
    renderArticles();
    renderMissing();
    renderStories();
    renderComments();
    renderTrending();
    updateTime();
    setInterval(updateTime, 60000);
});

// ========== NAVIGATION ==========
function navigateTo(page) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('page-' + page).classList.add('active');

    document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
    const activeLink = document.querySelector('.nav-links a[data-page="' + page + '"]');
    if(activeLink) activeLink.classList.add('active');

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// ========== RENDER FUNCTIONS ==========
function renderNews() {
    const grid = document.getElementById('latest-news-grid');
    if (!grid) return;
    grid.innerHTML = newsData.map(news => `
        <div class="news-card" onclick="showArticleDetail(${news.id}, 'news')">
            <div class="news-card-img">
                <img src="${news.image}" alt="${news.title}">
                <span class="news-badge ${news.urgent ? 'urgent' : ''}">${news.urgent ? 'عاجل' : news.category}</span>
            </div>
            <div class="news-card-body">
                <div class="news-card-meta">
                    <span><i class="fas fa-user"></i> ${news.author}</span>
                    <span><i class="fas fa-clock"></i> ${news.date}</span>
                </div>
                <h3 class="news-card-title">${news.title}</h3>
                <p class="news-card-desc">${news.desc}</p>
                <span class="read-more">اقرأ المزيد <i class="fas fa-arrow-left"></i></span>
            </div>
        </div>
    `).join('');
}

function renderArticles() {
    const grid = document.getElementById('articles-grid');
    if (!grid) return;
    grid.innerHTML = articlesData.map(article => `
        <div class="news-card" onclick="showArticleDetail(${article.id}, 'article')">
            <div class="news-card-img">
                <img src="${article.image}" alt="${article.title}">
                <span class="news-badge">${article.category}</span>
            </div>
            <div class="news-card-body">
                <div class="news-card-meta">
                    <span><i class="fas fa-user"></i> ${article.author}</span>
                    <span><i class="fas fa-calendar"></i> ${article.date}</span>
                </div>
                <h3 class="news-card-title">${article.title}</h3>
                <p class="news-card-desc">${article.desc}</p>
                <span class="read-more">اقرأ المزيد <i class="fas fa-arrow-left"></i></span>
            </div>
        </div>
    `).join('');
}

function renderMissing() {
    const grid = document.getElementById('missing-grid');
    if (!grid) return;
    grid.innerHTML = missingData.map(person => `
        <div class="missing-card">
            <img src="${person.image}" alt="${person.name}" class="missing-img">
            <div class="missing-info">
                <h3 class="missing-name">${person.name}</h3>
                <p class="missing-details"><i class="fas fa-birthday-cake"></i> العمر: ${person.age} سنة</p>
                <p class="missing-details"><i class="fas fa-map-marker-alt"></i> ${person.location}</p>
                <p class="missing-details"><i class="fas fa-calendar"></i> ${person.date}</p>
                <span class="missing-status ${person.status === 'missing' ? 'status-missing' : 'status-found'}">
                    ${person.status === 'missing' ? 'مفقود' : 'تم العثور عليه'}
                </span>
                ${person.status === 'missing' ? `<button class="report-btn" onclick="openReportModal('${person.name}')"><i class="fas fa-info-circle"></i> لدي معلومات</button>` : ''}
            </div>
        </div>
    `).join('');
}

function renderStories() {
    const list = document.getElementById('stories-list');
    if (!list) return;
    list.innerHTML = storiesData.map(story => `
        <div class="story-card">
            <div class="story-header">
                <img src="${story.avatar}" alt="${story.name}" class="story-avatar">
                <div>
                    <h4 style="font-size: 18px; font-weight: 800;">${story.name}</h4>
                    <span style="color: var(--text-muted); font-size: 13px;">${story.age} سنة</span>
                </div>
            </div>
            <p class="story-text">${story.story}</p>
            <div class="story-tags">
                ${story.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
        </div>
    `).join('');
}

function renderComments() {
    const list = document.getElementById('comments-list');
    if (!list) return;
    list.innerHTML = commentsData.map(comment => `
        <div class="comment-item">
            <div class="comment-avatar">${comment.avatar}</div>
            <div class="comment-body">
                <div class="comment-header">
                    <span class="comment-author">${comment.author}</span>
                    <span class="comment-time">${comment.time}</span>
                </div>
                <p class="comment-text">${comment.text}</p>
                <div class="comment-reactions">
                    <button class="reaction-btn" onclick="likeComment(this)">
                        <i class="fas fa-heart"></i> ${comment.likes}
                    </button>
                    <button class="reaction-btn">
                        <i class="fas fa-reply"></i> رد (${comment.replies})
                    </button>
                    <button class="reaction-btn">
                        <i class="fas fa-share"></i> مشاركة
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function renderTrending() {
    const list = document.getElementById('trending-list');
    if (!list) return;
    list.innerHTML = trendingData.map(item => `
        <div class="trending-item">
            <span class="trending-num">${item.num}</span>
            <div class="trending-content">
                <h4>${item.title}</h4>
                <span><i class="fas fa-eye"></i> ${item.views} مشاهدة</span>
            </div>
        </div>
    `).join('');
}

// ========== ARTICLE DETAIL ==========
function showArticleDetail(id, type) {
    const data = type === 'news' ? newsData : articlesData;
    const article = data.find(a => a.id === id);
    if (!article) return;

    const detailContent = document.getElementById('article-detail-content');
    detailContent.innerHTML = `
        <img src="${article.image}" alt="${article.title}" class="article-detail-img">
        <div class="article-detail-content">
            <div class="article-detail-meta">
                <span><i class="fas fa-user"></i> ${article.author}</span>
                <span><i class="fas fa-calendar"></i> ${article.date}</span>
                <span><i class="fas fa-tag"></i> ${article.category}</span>
            </div>
            <h1 class="article-detail-title">${article.title}</h1>
            <div class="article-detail-body">
                <p>${article.desc}</p>
                <p>${article.content || article.desc}</p>
                <p>هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربي، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التي يولدها التطبيق.</p>
                <p>إذا كنت تحتاج إلى عدد أكبر من الفقرات يتيح لك مولد النص العربي زيادة عدد الفقرات كما تريد، النص لن يبدو مقسماً ولا يحوي أخطاء لغوية، مولد النص العربي مفيد لمصممي المواقع على وجه الخصوص.</p>
            </div>
        </div>
    `;

    navigateTo('article-detail');
}

// ========== COMMENTS ==========
function addComment() {
    const input = document.getElementById('comment-input');
    const text = input.value.trim();
    if (!text) return;

    const newComment = {
        id: commentsData.length + 1,
        author: "زائر",
        avatar: "ز",
        time: "الآن",
        text: text,
        likes: 0,
        replies: 0
    };

    commentsData.unshift(newComment);
    renderComments();
    input.value = '';
    showToast('تم نشر تعليقك بنجاح!');
}

function likeComment(btn) {
    const icon = btn.querySelector('i');
    if (icon.classList.contains('fas')) {
        icon.classList.remove('fas');
        icon.classList.add('far');
        btn.style.color = 'var(--text-muted)';
    } else {
        icon.classList.remove('far');
        icon.classList.add('fas');
        btn.style.color = 'var(--primary)';
    }
}

// ========== MODALS ==========
function openPublishModal() {
    document.getElementById('publish-modal').classList.add('active');
}

function openReportModal(name) {
    document.getElementById('report-modal').classList.add('active');
    if (name) {
        const inputs = document.querySelectorAll('#report-modal input');
        if (inputs[0]) inputs[0].value = name;
    }
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

function submitPublish(event) {
    event.preventDefault();
    closeModal('publish-modal');
    showToast('تم إرسال خبرك للمراجعة! شكراً لمساهمتك.');
    event.target.reset();
}

function submitReport(event) {
    event.preventDefault();
    closeModal('report-modal');
    showToast('تم إرسال البلاغ بنجاح! سنتواصل معك قريباً.');
    event.target.reset();
}

// ========== TOAST ==========
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ========== TIME ==========
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('ar-SA', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    const timeElement = document.getElementById('current-time');
    if (timeElement) {
        timeElement.textContent = timeString;
    }
}

// ========== CLOSE MODAL ON OUTSIDE CLICK ==========
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal-overlay')) {
        e.target.classList.remove('active');
    }
});


// ========== PROFILE FUNCTIONS ==========
function renderUserHeader() {
    const userProfile = document.getElementById('user-profile-header');
    if (!userProfile) return;

    userProfile.innerHTML = `
        <img src="${currentUser.avatar}" alt="${currentUser.name}" class="user-avatar">
        <div class="user-info">
            <div class="user-name">${currentUser.name}</div>
            <div class="user-role">${currentUser.role}</div>
        </div>
        <div class="user-dropdown">
            <div class="dropdown-item" onclick="navigateTo('profile')">
                <i class="fas fa-user"></i> البروفايل
            </div>
            <div class="dropdown-item" onclick="navigateTo('profile')">
                <i class="fas fa-newspaper"></i> منشوراتي
            </div>
            <div class="dropdown-item" onclick="openPublishModal()">
                <i class="fas fa-pen"></i> نشر جديد
            </div>
            <div class="dropdown-divider"></div>
            <div class="dropdown-item">
                <i class="fas fa-cog"></i> الإعدادات
            </div>
            <div class="dropdown-item">
                <i class="fas fa-sign-out-alt"></i> تسجيل الخروج
            </div>
        </div>
    `;
}

function renderProfile() {
    const page = document.getElementById('page-profile');
    if (!page) return;

    page.innerHTML = `
        <div class="profile-header">
            <div class="profile-header-content">
                <img src="${currentUser.avatar}" alt="${currentUser.name}" class="profile-avatar-large">
                <div class="profile-info">
                    <h2>${currentUser.name}</h2>
                    <span class="role-badge">${currentUser.role}</span>
                    <p>${currentUser.bio}</p>
                    <p style="margin-top: 8px;"><i class="fas fa-map-marker-alt"></i> ${currentUser.location}</p>
                </div>
                <button class="edit-profile-btn" onclick="showToast('سيتم فتح صفحة تعديل البروفايل')">
                    <i class="fas fa-edit"></i> تعديل البروفايل
                </button>
            </div>
            <div class="profile-stats-bar">
                <div class="profile-stat">
                    <div class="number">${currentUser.stats.posts}</div>
                    <div class="label">منشور</div>
                </div>
                <div class="profile-stat">
                    <div class="number">${currentUser.stats.followers}</div>
                    <div class="label">متابع</div>
                </div>
                <div class="profile-stat">
                    <div class="number">${currentUser.stats.following}</div>
                    <div class="label">يتابع</div>
                </div>
                <div class="profile-stat">
                    <div class="number">${currentUser.stats.verified ? '<i class="fas fa-check-circle" style="color: var(--success);"></i>' : '0'}</div>
                    <div class="label">موثق</div>
                </div>
            </div>
        </div>

        <div class="profile-tabs">
            <button class="profile-tab active" onclick="switchProfileTab('posts', this)">
                <i class="fas fa-newspaper"></i> المنشورات
            </button>
            <button class="profile-tab" onclick="switchProfileTab('articles', this)">
                <i class="fas fa-file-alt"></i> المقالات
            </button>
            <button class="profile-tab" onclick="switchProfileTab('reports', this)">
                <i class="fas fa-broadcast-tower"></i> التقارير
            </button>
            <button class="profile-tab" onclick="switchProfileTab('saved', this)">
                <i class="fas fa-bookmark"></i> المحفوظات
            </button>
        </div>

        <div id="profile-content">
            <div class="profile-posts-grid" id="profile-posts-grid"></div>
        </div>
    `;

    renderProfilePosts();
}

function renderProfilePosts(filter = 'all') {
    const grid = document.getElementById('profile-posts-grid');
    if (!grid) return;

    let posts = userPosts;
    if (filter !== 'all') {
        posts = userPosts.filter(p => p.type === filter);
    }

    if (posts.length === 0) {
        grid.innerHTML = `
            <div class="empty-state" style="grid-column: 1/-1;">
                <i class="fas fa-inbox"></i>
                <h3>لا توجد منشورات</h3>
                <p>لم يتم نشر أي منشورات في هذا القسم بعد</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = posts.map(post => `
        <div class="news-card" onclick="showToast('فتح المقال: ${post.title}')">
            <div class="news-card-img">
                <img src="${post.image}" alt="${post.title}">
                <span class="news-badge">${post.category}</span>
            </div>
            <div class="news-card-body">
                <div class="news-card-meta">
                    <span><i class="fas fa-calendar"></i> ${post.date}</span>
                    <span><i class="fas fa-eye"></i> ${post.views}</span>
                </div>
                <h3 class="news-card-title">${post.title}</h3>
                <p class="news-card-desc">${post.desc}</p>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 15px;">
                    <span class="read-more">اقرأ المزيد <i class="fas fa-arrow-left"></i></span>
                    <span style="color: var(--text-muted); font-size: 13px;">
                        <i class="fas fa-heart" style="color: var(--primary);"></i> ${post.likes}
                    </span>
                </div>
            </div>
        </div>
    `).join('');
}

function switchProfileTab(type, btn) {
    document.querySelectorAll('.profile-tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');

    const filterMap = {
        'posts': 'all',
        'articles': 'article',
        'reports': 'report',
        'saved': 'saved'
    };

    renderProfilePosts(filterMap[type] || 'all');
}

// Update init to render user header
document.addEventListener('DOMContentLoaded', function() {
    renderUserHeader();
    renderNews();
    renderArticles();
    renderMissing();
    renderStories();
    renderComments();
    renderTrending();
    renderProfile();
    updateTime();
    setInterval(updateTime, 60000);
});


// ========== LIVE CHAT FUNCTIONS ==========
function renderLiveChat() {
    const chatMessagesContainer = document.getElementById('live-chat-messages');
    if (!chatMessagesContainer) return;

    chatMessagesContainer.innerHTML = chatMessages.map(msg => `
        <div class="chat-message ${msg.highlighted ? 'highlighted' : ''}" data-id="${msg.id}">
            <img src="${msg.avatar}" alt="${msg.author}" class="chat-avatar">
            <div class="chat-content">
                <div class="chat-author">
                    ${msg.author}
                    ${msg.verified ? '<i class="fas fa-check-circle verified-badge"></i>' : ''}
                    ${msg.mod ? '<span class="mod-badge">مشرف</span>' : ''}
                </div>
                <div class="chat-text">${msg.text}</div>
                <div class="chat-time">${msg.time}</div>
            </div>
        </div>
    `).join('');

    // Scroll to bottom
    scrollToBottom();
}

function addChatMessage() {
    const input = document.getElementById('chat-input');
    const text = input.value.trim();
    if (!text) return;

    const newMessage = {
        id: chatMessages.length + 1,
        author: currentUser.name,
        avatar: currentUser.avatar,
        text: text,
        time: "الآن",
        verified: currentUser.stats.verified,
        mod: false,
        highlighted: false
    };

    chatMessages.push(newMessage);

    // Add to UI with animation
    const chatMessagesContainer = document.getElementById('live-chat-messages');
    const messageHTML = `
        <div class="chat-message" data-id="${newMessage.id}" style="animation: chatSlideIn 0.3s ease;">
            <img src="${newMessage.avatar}" alt="${newMessage.author}" class="chat-avatar">
            <div class="chat-content">
                <div class="chat-author">
                    ${newMessage.author}
                    ${newMessage.verified ? '<i class="fas fa-check-circle verified-badge"></i>' : ''}
                </div>
                <div class="chat-text">${newMessage.text}</div>
                <div class="chat-time">${newMessage.time}</div>
            </div>
        </div>
    `;

    chatMessagesContainer.insertAdjacentHTML('beforeend', messageHTML);

    input.value = '';
    scrollToBottom();

    // Play notification sound (optional)
    // new Audio('notification.mp3').play().catch(e => {});
}

function scrollToBottom() {
    const container = document.getElementById('live-chat-messages');
    if (container) {
        container.scrollTop = container.scrollHeight;
    }
}

function handleChatScroll() {
    const container = document.getElementById('live-chat-messages');
    const scrollBtn = document.getElementById('scroll-bottom-btn');

    if (!container || !scrollBtn) return;

    const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 100;

    if (!isNearBottom) {
        scrollBtn.classList.add('show');
    } else {
        scrollBtn.classList.remove('show');
    }
}

// Simulate incoming messages
function simulateIncomingMessage() {
    const randomMessages = [
        { author: "زائر جديد", text: "الله ينصر المقاومة 💪", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100" },
        { author: "محمد", text: "أخبار دقيقة شكراً", avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100" },
        { author: "فاطمة", text: "دعواتكم للجميع", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100" },
        { author: "أحمد", text: "هل في تحديثات جديدة؟", avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100" },
        { author: "سارة", text: "صوت الحقيقة الأفضل 👍", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100" }
    ];

    const random = randomMessages[Math.floor(Math.random() * randomMessages.length)];

    const newMessage = {
        id: Date.now(),
        author: random.author,
        avatar: random.avatar,
        text: random.text,
        time: "الآن",
        verified: false,
        mod: false,
        highlighted: false
    };

    chatMessages.push(newMessage);

    const chatMessagesContainer = document.getElementById('live-chat-messages');
    if (chatMessagesContainer) {
        const messageHTML = `
            <div class="chat-message" data-id="${newMessage.id}" style="animation: chatSlideIn 0.3s ease;">
                <img src="${newMessage.avatar}" alt="${newMessage.author}" class="chat-avatar">
                <div class="chat-content">
                    <div class="chat-author">${newMessage.author}</div>
                    <div class="chat-text">${newMessage.text}</div>
                    <div class="chat-time">${newMessage.time}</div>
                </div>
            </div>
        `;
        chatMessagesContainer.insertAdjacentHTML('beforeend', messageHTML);

        // Auto scroll if user is near bottom
        const isNearBottom = chatMessagesContainer.scrollHeight - chatMessagesContainer.scrollTop - chatMessagesContainer.clientHeight < 200;
        if (isNearBottom) {
            scrollToBottom();
        } else {
            // Show new message indicator
            const indicator = document.getElementById('new-messages-indicator');
            if (indicator) indicator.classList.add('show');
        }
    }
}

// Override init to include live chat
document.addEventListener('DOMContentLoaded', function() {
    renderUserHeader();
    renderNews();
    renderArticles();
    renderMissing();
    renderStories();
    renderComments();
    renderTrending();
    renderProfile();
    renderLiveChat();
    updateTime();
    setInterval(updateTime, 60000);

    // Simulate incoming messages every 15-30 seconds
    setInterval(() => {
        if (Math.random() > 0.6) {
            simulateIncomingMessage();
        }
    }, 20000);

    // Chat scroll handler
    const chatContainer = document.getElementById('live-chat-messages');
    if (chatContainer) {
        chatContainer.addEventListener('scroll', handleChatScroll);
    }
});

// Handle Enter key in chat
function handleChatKeyPress(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        addChatMessage();
    }
}


// ========== FLOATING BUTTON & VERIFICATION TOOLS ==========
let currentPage = 'home';

function navigateTo(page) {
    currentPage = page;

    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('page-' + page).classList.add('active');

    document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
    const activeLink = document.querySelector('.nav-links a[data-page="' + page + '"]');
    if(activeLink) activeLink.classList.add('active');

    // Show/hide floating button based on page
    const floatBtn = document.getElementById('float-verification-btn');
    const tooltip = document.getElementById('float-btn-tooltip');

    if (page === 'profile') {
        floatBtn.classList.add('hidden');
        tooltip.classList.remove('show');
    } else {
        floatBtn.classList.remove('hidden');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function openVerificationModal() {
    document.getElementById('verification-modal').classList.add('active');
    renderVerificationTab('reverse-search');
}

function switchVerificationTab(tab, btn) {
    document.querySelectorAll('.verification-tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    renderVerificationTab(tab);
}

function renderVerificationTab(tab) {
    const content = document.getElementById('verification-content');

    switch(tab) {
        case 'reverse-search':
            content.innerHTML = `
                <div style="margin-bottom: 20px;">
                    <h3 style="font-size: 18px; font-weight: 800; margin-bottom: 10px;">
                        <i class="fas fa-search" style="color: var(--primary);"></i> البحث العكسي
                    </h3>
                    <p style="color: var(--text-muted); font-size: 14px;">ابحث عن أصل الصور والفيديوهات للتحقق من صحتها وتاريخ نشرها</p>
                </div>

                <div class="tool-card">
                    <div class="tool-card-header">
                        <div class="tool-icon"><i class="fas fa-link"></i></div>
                        <div class="tool-title">رابط الصورة أو الفيديو</div>
                    </div>
                    <div class="tool-desc">أدخل رابط الصورة أو الفيديو للبحث العكسي عنه</div>
                    <div class="tool-input-group">
                        <input type="text" class="tool-input" id="image-url-input" placeholder="https://example.com/image.jpg أو https://youtube.com/watch?v=...">
                        <button class="tool-btn" onclick="performReverseSearch()">
                            <i class="fas fa-search"></i> بحث
                        </button>
                    </div>
                </div>

                <div class="tool-card">
                    <div class="tool-card-header">
                        <div class="tool-icon"><i class="fas fa-upload"></i></div>
                        <div class="tool-title">رفع ملف</div>
                    </div>
                    <div class="tool-desc">ارفع صورة أو فيديو من جهازك للبحث العكسي</div>
                    <div class="file-upload" style="margin-top: 10px;">
                        <i class="fas fa-cloud-upload-alt"></i>
                        <p>اسحب الملف هنا أو انقر للاختيار</p>
                    </div>
                </div>

                <div style="margin-top: 25px;">
                    <h4 style="font-size: 16px; font-weight: 800; margin-bottom: 15px;">أدوات البحث العكسي</h4>
                    ${verificationTools.reverseSearch.map(tool => `
                        <div class="tool-card">
                            <div class="tool-card-header">
                                <div class="tool-icon"><i class="${tool.icon}"></i></div>
                                <div>
                                    <div class="tool-title">${tool.name}</div>
                                    <div class="tool-desc">${tool.desc}</div>
                                </div>
                            </div>
                            <button class="tool-btn" style="width: 100%; margin-top: 10px;" onclick="window.open('${tool.url}', '_blank')">
                                <i class="fas fa-external-link-alt"></i> فتح الأداة
                            </button>
                        </div>
                    `).join('')}
                </div>

                <div class="tool-loading" id="reverse-search-loading">
                    <div class="spinner"></div>
                    <p>جاري البحث...</p>
                </div>

                <div class="tool-results" id="reverse-search-results"></div>
            `;
            break;

        case 'metadata':
            content.innerHTML = `
                <div style="margin-bottom: 20px;">
                    <h3 style="font-size: 18px; font-weight: 800; margin-bottom: 10px;">
                        <i class="fas fa-fingerprint" style="color: var(--primary);"></i> تحليل البيانات الوصفية (EXIF)
                    </h3>
                    <p style="color: var(--text-muted); font-size: 14px;">افحص بيانات الصور والفيديوهات الرقمية (EXIF) للكشف عن التلاعب والتعديل</p>
                </div>

                <div class="tool-card">
                    <div class="tool-card-header">
                        <div class="tool-icon"><i class="fas fa-image"></i></div>
                        <div class="tool-title">رفع صورة للتحليل</div>
                    </div>
                    <div class="tool-desc">ارفع صورة لتحليل بياناتها الوصفية (تاريخ التقاط، الجهاز، الموقع، التلاعب)</div>
                    <div class="file-upload" style="margin-top: 10px;">
                        <i class="fas fa-camera"></i>
                        <p>اختر صورة لتحليلها</p>
                    </div>
                </div>

                <div class="tool-card">
                    <div class="tool-card-header">
                        <div class="tool-icon"><i class="fas fa-video"></i></div>
                        <div class="tool-title">رفع فيديو للتحليل</div>
                    </div>
                    <div class="tool-desc">ارفع فيديو لتحليل بياناته الوصفية والكشف عن أي تعديل أو تلاعب</div>
                    <div class="file-upload" style="margin-top: 10px;">
                        <i class="fas fa-film"></i>
                        <p>اختر فيديو لتحليله</p>
                    </div>
                </div>

                <div class="tool-card" style="background: rgba(192,57,43,0.05); border-color: rgba(192,57,43,0.2);">
                    <div class="tool-card-header">
                        <div class="tool-icon" style="background: linear-gradient(135deg, #e67e22, #d35400);"><i class="fas fa-info-circle"></i></div>
                        <div class="tool-title">ما هي البيانات الوصفية (EXIF)؟</div>
                    </div>
                    <div class="tool-desc">
                        البيانات الوصفية هي معلومات مخفية في الصور والفيديوهات تكشف عن:
                        <ul style="margin-top: 10px; padding-right: 20px; line-height: 2;">
                            <li>تاريخ ووقت التقاط الصورة</li>
                            <li>نوع الكاميرا أو الهاتف المستخدم</li>
                            <li>موقع GPS (إذا كان مفعل)</li>
                            <li>برامج التعديل المستخدمة (Photoshop, etc.)</li>
                            <li>الأبعاد الأصلية للصورة</li>
                        </ul>
                    </div>
                </div>

                <div style="margin-top: 25px;">
                    <h4 style="font-size: 16px; font-weight: 800; margin-bottom: 15px;">أدوات التحليل</h4>
                    ${verificationTools.metadata.map(tool => `
                        <div class="tool-card">
                            <div class="tool-card-header">
                                <div class="tool-icon"><i class="${tool.icon}"></i></div>
                                <div>
                                    <div class="tool-title">${tool.name}</div>
                                    <div class="tool-desc">${tool.desc}</div>
                                </div>
                            </div>
                            <button class="tool-btn" style="width: 100%; margin-top: 10px;" onclick="window.open('${tool.url}', '_blank')">
                                <i class="fas fa-external-link-alt"></i> فتح الأداة
                            </button>
                        </div>
                    `).join('')}
                </div>
            `;
            break;
    }
}

function performReverseSearch() {
    const input = document.getElementById('image-url-input');
    const url = input.value.trim();

    if (!url) {
        showToast('الرجاء إدخال رابط الصورة');
        return;
    }

    // Show loading
    document.getElementById('reverse-search-loading').classList.add('show');
    document.getElementById('reverse-search-results').classList.remove('show');

    // Simulate search
    setTimeout(() => {
        document.getElementById('reverse-search-loading').classList.remove('show');

        const results = document.getElementById('reverse-search-results');
        results.innerHTML = `
            <h4 style="font-size: 16px; font-weight: 800; margin-bottom: 15px;">نتائج البحث</h4>
            <div class="result-item">
                <div class="result-icon warning"><i class="fas fa-exclamation-triangle"></i></div>
                <div class="result-content">
                    <h4>تم العثور على الصورة في مصادر متعددة</h4>
                    <p>الصورة ظهرت في 5 مواقع مختلفة بتواريخ سابقة</p>
                </div>
            </div>
            <div class="result-item">
                <div class="result-icon safe"><i class="fas fa-check-circle"></i></div>
                <div class="result-content">
                    <h4>أول ظهور للصورة</h4>
                    <p>تم التقاط الصورة في 15 يناير 2024</p>
                </div>
            </div>
            <div class="result-item">
                <div class="result-icon warning"><i class="fas fa-info-circle"></i></div>
                <div class="result-content">
                    <h4>تنبيه</h4>
                    <p>الصورة تم استخدامها في سياق مختلف عن السياق الحالي</p>
                </div>
            </div>
        `;
        results.classList.add('show');

        showToast('تم إكمال البحث العكسي!');
    }, 2000);
}

// Show tooltip on hover
function showFloatTooltip() {
    const tooltip = document.getElementById('float-btn-tooltip');
    if (tooltip && currentPage !== 'profile') {
        tooltip.classList.add('show');
        setTimeout(() => {
            tooltip.classList.remove('show');
        }, 3000);
    }
}

// Update init to include floating button


// ========== NOTIFICATIONS ==========
let notifications = [];
let unreadCount = 0;

function loadNotifications() {
    const saved = localStorage.getItem('sawt_notifications');
    if (saved) {
        notifications = JSON.parse(saved);
    } else {
        notifications = [...notificationsData];
    }
    updateUnreadCount();
    renderNotifications();
}

function saveNotifications() {
    localStorage.setItem('sawt_notifications', JSON.stringify(notifications));
}

function updateUnreadCount() {
    unreadCount = notifications.filter(n => !n.read).length;
    const btn = document.getElementById('notifications-btn');
    if (btn) {
        if (unreadCount > 0) {
            btn.classList.add('has-unread');
            btn.setAttribute('data-count', unreadCount);
        } else {
            btn.classList.remove('has-unread');
            btn.removeAttribute('data-count');
        }
    }
}

function renderNotifications() {
    const list = document.getElementById('notifications-list');
    if (!list) return;

    if (notifications.length === 0) {
        list.innerHTML = `
            <div class="notifications-empty">
                <i class="fas fa-bell-slash"></i>
                <p>لا توجد إشعارات</p>
            </div>
        `;
        return;
    }

    list.innerHTML = notifications.map(n => `
        <div class="notification-item ${n.read ? '' : 'unread'}" onclick="handleNotificationClick(${n.id})">
            <div class="notification-icon ${n.type}">
                <i class="fas ${getNotificationIcon(n.type)}"></i>
            </div>
            <div class="notification-content">
                <h4>${n.title}</h4>
                <p>${n.message}</p>
                <div class="notification-time">${n.time}</div>
            </div>
        </div>
    `).join('');
}

function getNotificationIcon(type) {
    switch(type) {
        case 'post_banned': return 'fa-ban';
        case 'post_approved': return 'fa-check-circle';
        case 'new_comment': return 'fa-comment';
        default: return 'fa-bell';
    }
}

function handleNotificationClick(id) {
    const notification = notifications.find(n => n.id === id);
    if (notification) {
        notification.read = true;
        saveNotifications();
        updateUnreadCount();
        renderNotifications();
        if (notification.link) {
            navigateTo(notification.link);
        }
    }
    toggleNotifications();
}

function markAllNotificationsRead(e) {
    e.stopPropagation();
    notifications.forEach(n => n.read = true);
    saveNotifications();
    updateUnreadCount();
    renderNotifications();
    showToast('تم تحديد جميع الإشعارات كمقروءة');
}

function toggleNotifications(e) {
    if (e) e.stopPropagation();
    const wrapper = document.getElementById('notifications-wrapper');
    wrapper.classList.toggle('active');
}

function addNotification(type, title, message, link) {
    const newNotif = {
        id: Date.now(),
        type: type,
        title: title,
        message: message,
        time: 'الآن',
        read: false,
        link: link || 'home'
    };
    notifications.unshift(newNotif);
    saveNotifications();
    updateUnreadCount();
    renderNotifications();
    showToast(title);
}

// Close notifications on outside click
document.addEventListener('click', function(e) {
    const wrapper = document.getElementById('notifications-wrapper');
    if (wrapper && !wrapper.contains(e.target)) {
        wrapper.classList.remove('active');
    }
});


// ========== RESPONSE AREA (Outside Chat) ==========
let responseBoxes = [];
let myReplies = [];

function loadResponseBoxes() {
    const saved = localStorage.getItem('sawt_response_boxes');
    if (saved) {
        responseBoxes = JSON.parse(saved);
    } else {
        responseBoxes = [...responseBoxesData];
    }

    const savedReplies = localStorage.getItem('sawt_my_replies');
    if (savedReplies) {
        myReplies = JSON.parse(savedReplies);
    }

    renderResponseArea();
    renderMyReplies();
    updateResponseAreaCount();
}

function saveResponseBoxes() {
    localStorage.setItem('sawt_response_boxes', JSON.stringify(responseBoxes));
}

function saveMyReplies() {
    localStorage.setItem('sawt_my_replies', JSON.stringify(myReplies));
}

function updateResponseAreaCount() {
    const totalReplies = responseBoxes.reduce((sum, box) => sum + (box.replies ? box.replies.length : 0), 0);
    const countEl = document.getElementById('response-area-count');
    if (countEl) countEl.textContent = totalReplies;

    const myCountEl = document.getElementById('my-replies-count');
    if (myCountEl) myCountEl.textContent = myReplies.length;
}

function renderResponseArea() {
    const body = document.getElementById('response-area-body');
    if (!body) return;

    if (responseBoxes.length === 0) {
        body.innerHTML = `
            <div style="text-align: center; padding: 30px; color: var(--text-muted);">
                <i class="fas fa-box-open" style="font-size: 30px; margin-bottom: 10px; opacity: 0.3;"></i>
                <p>لا توجد صناديق ردود</p>
            </div>
        `;
        return;
    }

    body.innerHTML = responseBoxes.map(box => `
        <div class="response-box-card" data-box-id="${box.id}">
            <div class="response-box-header">
                <img src="${box.avatar}" alt="${box.author}" class="response-box-avatar">
                <span class="response-box-author">${box.author}</span>
                <span class="response-box-time">${box.time}</span>
            </div>
            <div class="response-box-text">${box.text}</div>
            <button class="respond-btn" onclick="openReplyModal(${box.id})">
                <i class="fas fa-reply"></i> Respond
            </button>
            ${box.replies && box.replies.length > 0 ? `
                <div class="replies-count">
                    <i class="fas fa-comments"></i> ${box.replies.length} رد مجهول
                </div>
                <div class="anonymous-replies">
                    ${box.replies.map(r => `
                        <div class="anonymous-reply">
                            <div class="anonymous-reply-avatar">
                                <i class="fas fa-user-secret"></i>
                            </div>
                            <div class="anonymous-reply-content">
                                <div class="anonymous-reply-text">${r.text}</div>
                                <div class="anonymous-reply-time">${r.time}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            ` : ''}
        </div>
    `).join('');
}

function toggleResponseArea() {
    const container = document.getElementById('response-area-container');
    container.classList.toggle('collapsed');
}

function openReplyModal(boxId) {
    const box = responseBoxes.find(b => b.id === boxId);
    if (!box) return;

    // Create inline reply input
    const card = document.querySelector(`.response-box-card[data-box-id="${boxId}"]`);
    if (!card) return;

    // Remove any existing reply inputs
    const existing = card.querySelector('.response-reply-input');
    if (existing) {
        existing.remove();
        return;
    }

    const replyHTML = `
        <div class="response-reply-input">
            <input type="text" id="reply-input-${boxId}" placeholder="اكتب ردك المجهول..." 
                onkeypress="if(event.key==='Enter')submitAnonymousReply(${boxId})">
            <button onclick="submitAnonymousReply(${boxId})">
                <i class="fas fa-paper-plane"></i>
            </button>
        </div>
    `;
    card.insertAdjacentHTML('beforeend', replyHTML);
    document.getElementById(`reply-input-${boxId}`).focus();
}

function submitAnonymousReply(boxId) {
    const input = document.getElementById(`reply-input-${boxId}`);
    const text = input.value.trim();
    if (!text) return;

    const box = responseBoxes.find(b => b.id === boxId);
    if (!box) return;

    const newReply = {
        id: Date.now(),
        text: text,
        time: 'الآن'
    };

    if (!box.replies) box.replies = [];
    box.replies.push(newReply);

    // Save to my replies (for the journalist to see)
    myReplies.push({
        boxId: boxId,
        boxText: box.text.substring(0, 50) + '...',
        replyText: text,
        time: 'الآن'
    });

    saveResponseBoxes();
    saveMyReplies();
    renderResponseArea();
    renderMyReplies();
    updateResponseAreaCount();
    showToast('تم إرسال الرد المجهول!');
}

function renderMyReplies() {
    const list = document.getElementById('my-replies-list');
    if (!list) return;

    if (myReplies.length === 0) {
        list.innerHTML = `
            <div style="text-align: center; padding: 40px; color: var(--text-muted);">
                <i class="fas fa-inbox" style="font-size: 40px; margin-bottom: 10px; opacity: 0.3;"></i>
                <p>لا توجد ردود على صناديقك</p>
            </div>
        `;
        return;
    }

    list.innerHTML = myReplies.map(r => `
        <div class="my-reply-item">
            <h4><i class="fas fa-box" style="color: var(--primary);"></i> ${r.boxText}</h4>
            <p>${r.replyText}</p>
            <div class="reply-meta">
                <span><i class="fas fa-user-secret"></i> مجهول</span>
                <span><i class="fas fa-clock"></i> ${r.time}</span>
            </div>
        </div>
    `).join('');
}

function switchChatTab(tab, btn) {
    document.querySelectorAll('.chat-tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');

    const messages = document.getElementById('live-chat-messages');
    const myReplies = document.getElementById('my-replies-list');

    if (tab === 'general') {
        messages.style.display = 'flex';
        myReplies.style.display = 'none';
    } else {
        messages.style.display = 'none';
        myReplies.style.display = 'block';
    }
}


// ========== RESPONSE BOX IN CHAT ==========
function renderResponseBoxesInChat() {
    const container = document.getElementById('live-chat-messages');
    if (!container || responseBoxes.length === 0) return;

    // Insert response boxes at the top of chat
    const boxesHTML = responseBoxes.map(box => `
        <div class="chat-response-box" data-box-id="${box.id}">
            <div class="response-box-header">
                <img src="${box.avatar}" alt="${box.author}" class="response-box-avatar">
                <span class="response-box-author">${box.author}</span>
                <span class="response-box-time">${box.time}</span>
            </div>
            <div class="response-box-text">${box.text}</div>
            <button class="respond-btn" onclick="openChatReply(${box.id})">
                <i class="fas fa-reply"></i> Respond
            </button>
            <div id="chat-reply-area-${box.id}"></div>
        </div>
    `).join('');

    // Prepend to existing messages
    const existing = container.innerHTML;
    container.innerHTML = boxesHTML + existing;
}

function openChatReply(boxId) {
    const area = document.getElementById(`chat-reply-area-${boxId}`);
    if (!area) return;

    if (area.innerHTML) {
        area.innerHTML = '';
        return;
    }

    area.innerHTML = `
        <div class="response-reply-input" style="margin-top: 10px;">
            <input type="text" id="chat-reply-input-${boxId}" placeholder="اكتب ردك المجهول..."
                onkeypress="if(event.key==='Enter')submitChatReply(${boxId})">
            <button onclick="submitChatReply(${boxId})">
                <i class="fas fa-paper-plane"></i>
            </button>
        </div>
    `;
    document.getElementById(`chat-reply-input-${boxId}`).focus();
}

function submitChatReply(boxId) {
    const input = document.getElementById(`chat-reply-input-${boxId}`);
    const text = input.value.trim();
    if (!text) return;

    const box = responseBoxes.find(b => b.id === boxId);
    if (!box) return;

    const newReply = {
        id: Date.now(),
        text: text,
        time: 'الآن'
    };

    if (!box.replies) box.replies = [];
    box.replies.push(newReply);

    myReplies.push({
        boxId: boxId,
        boxText: box.text.substring(0, 50) + '...',
        replyText: text,
        time: 'الآن'
    });

    saveResponseBoxes();
    saveMyReplies();
    renderResponseArea();
    renderMyReplies();
    updateResponseAreaCount();

    // Close reply input
    const area = document.getElementById(`chat-reply-area-${boxId}`);
    if (area) area.innerHTML = '';

    showToast('تم إرسال الرد المجهول!');
}


// ========== CREATE RESPONSE BOX (for journalist) ==========
function createResponseBox(text) {
    const newBox = {
        id: Date.now(),
        author: currentUser.name,
        avatar: currentUser.avatar,
        text: text,
        time: 'الآن',
        replies: []
    };
    responseBoxes.unshift(newBox);
    saveResponseBoxes();
    renderResponseArea();
    renderResponseBoxesInChat();
    updateResponseAreaCount();
    showToast('تم إنشاء صندوق الردود!');
}

document.addEventListener('DOMContentLoaded', function() {
    renderUserHeader();
    renderNews();
    renderArticles();
    renderMissing();
    renderStories();
    renderComments();
    renderTrending();
    renderProfile();
    renderLiveChat();
    loadNotifications();
    loadResponseBoxes();
    renderResponseBoxesInChat();
    updateTime();
    setInterval(updateTime, 60000);

    // Simulate incoming messages
    setInterval(() => {
        if (Math.random() > 0.6) {
            simulateIncomingMessage();
        }
    }, 20000);

    // Chat scroll handler
    const chatContainer = document.getElementById('live-chat-messages');
    if (chatContainer) {
        chatContainer.addEventListener('scroll', handleChatScroll);
    }

    // Show floating button tooltip after 2 seconds
    setTimeout(showFloatTooltip, 2000);
});
