// ============================================
// صوت الحقيقة - ملف البيانات
// ============================================

const newsData = [
    {
        id: 1,
        title: "فريق إغاثة دولي يصل إلى المناطق الشمالية",
        desc: "وصلت قوافل الإغاثة الدولية إلى المناطق الشمالية بعد أيام من التنسيق، حاملة معها مواد غذائية وأدوية أساسية...",
        image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=600",
        category: "إغاثة",
        date: "منذ ساعتين",
        author: "أحمد محمود",
        urgent: true
    },
    {
        id: 2,
        title: "افتتاح مركز إيواء مؤقت للنازحين في رفح",
        desc: "تم افتتاح مركز إيواء جديد يستوعب أكثر من 500 عائلة نازحة، مزود بكافة الخدمات الأساسية...",
        image: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=600",
        category: "إيواء",
        date: "منذ 4 ساعات",
        author: "سارة خالد",
        urgent: false
    },
    {
        id: 3,
        title: "مستشفى المقاصد يستأنف عمله جزئياً",
        desc: "أعلن مستشفى المقاصد عن استئناف عمله بشكل جزئي بعد إصلاح الأضرار التي لحقت بالمبنى...",
        image: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=600",
        category: "صحة",
        date: "منذ 6 ساعات",
        author: "د. محمد علي",
        urgent: false
    }
];

const articlesData = [
    {
        id: 1,
        title: "الإعلام في زمن الحرب: بين الحقيقة والتضليل",
        desc: "تحليل معمق لدور الإعلام في نقل الحقائق وتأثيره على الرأي العام في ظل الأزمات...",
        image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600",
        category: "تحليل",
        date: "2024-01-15",
        author: "د. ليلى أحمد",
        content: "في ظل الأوضاع الراهنة، يصبح الإعلام أداة فاعلة في تشكيل الوعي الجمعي. لكن مع تدفق المعلومات من مصادر متعددة، يواجه المواطن تحدياً كبيراً في التمييز بين الحقيقة والتضليل..."
    },
    {
        id: 2,
        title: "الصحة النفسية للأطفال في مناطق النزاع",
        desc: "دراسة حول تأثير الصدمات النفسية على الأطفال وسبل التعامل معها في المخيمات...",
        image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600",
        category: "صحة نفسية",
        date: "2024-01-14",
        author: "د. نورا سامي",
        content: "تشير الدراسات إلى أن الأطفال في مناطق النزاع يعانون من صدمات نفسية عميقة تؤثر على نموهم وتطورهم..."
    },
    {
        id: 3,
        title: "الاقتصاد الفلسطيني: التحديات والفرص",
        desc: "قراءة في الواقع الاقتصادي وآفاق التعافي بعد انتهاء الأزمة الحالية...",
        image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600",
        category: "اقتصاد",
        date: "2024-01-13",
        author: "خالد عمر",
        content: "يواجه الاقتصاد الفلسطيني تحديات غير مسبوقة، لكن هناك فرصاً حقيقية للتعافي والبناء..."
    },
    {
        id: 4,
        title: "التعليم في ظل الحصار: قصص إصرار وتحدٍ",
        desc: "كيف يواصل الطلاب والمعلمون رحلة التعليم رغم الظروف الصعبة...",
        image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600",
        category: "تعليم",
        date: "2024-01-12",
        author: "فاطمة حسن",
        content: "رغم التحديات الجسام، يستمر التعليم في العديد من المناطق عبر الفصول الدراسية البديلة..."
    }
];

const missingData = [
    {
        id: 1,
        name: "محمد عبدالله",
        age: 12,
        location: "الشمال - بيت لاهيا",
        date: "2024-01-10",
        status: "missing",
        image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400"
    },
    {
        id: 2,
        name: "أمل خالد",
        age: 8,
        location: "غزة - الشجاعية",
        date: "2024-01-08",
        status: "missing",
        image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=400"
    },
    {
        id: 3,
        name: "يوسف أحمد",
        age: 45,
        location: "رفح - تل السلطان",
        date: "2024-01-05",
        status: "found",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400"
    },
    {
        id: 4,
        name: "ليلى محمود",
        age: 65,
        location: "الشمال - جباليا",
        date: "2024-01-03",
        status: "missing",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400"
    }
];

const storiesData = [
    {
        id: 1,
        name: "أبو خالد",
        age: 52,
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200",
        story: "كنت في منزلي عندما سقطت القذيفة على المبنى المجاور. ركضت لإنقاذ جيراني، واستطعت إخراج ثلاثة أطفال من تحت الأنقاض قبل وصول الإسعاف. لم أفكر في نفسي، كل ما فكرت فيه هو إنقاذ هؤلاء الأطفال...",
        tags: ["إنقاذ", "شجاعة", "تضحية"]
    },
    {
        id: 2,
        name: "أم أحمد",
        age: 38,
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200",
        story: "فقدت منزلي وكل ممتلكاتي، لكنني لم أفقد الأمل. بدأت بإعداد الوجبات للنازحين في المدرسة التي نأوي فيها. كل يوم أطبخ لأكثر من 100 شخص. الطعام ليس مجرد غذاء، إنه رسالة أمل...",
        tags: ["أمل", "تطوع", "إغاثة"]
    },
    {
        id: 3,
        name: "الطفل عمر",
        age: 14,
        avatar: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=200",
        story: "رغم كل شيء، أحلم بأن أصبح طبيباً. أدرس كل يوم لساعتين على الأقل باستخدام الكتب التي أنقذتها من منزلنا المدمر. أريد أن أعالج الناس وأساعدهم كما ساعدني الأطباء عندما أصبت...",
        tags: ["طموح", "تعليم", "إصرار"]
    }
];

const commentsData = [
    {
        id: 1,
        author: "خالد محمود",
        avatar: "خ",
        time: "منذ 30 دقيقة",
        text: "شكراً على هذه المنصة الموثوقة. نحتاج مثل هذه المبادرات في ظل تدفق الأخبار الكاذبة.",
        likes: 24,
        replies: 3
    },
    {
        id: 2,
        author: "نورا سامي",
        avatar: "ن",
        time: "منذ ساعة",
        text: "أتمنى أن نرى المزيد من التقارير الميدانية. الصحافة الموثوقة هي سلاحنا في هذه الأوقات.",
        likes: 18,
        replies: 1
    },
    {
        id: 3,
        author: "أحمد علي",
        avatar: "أ",
        time: "منذ ساعتين",
        text: "هل يمكن إضافة قسم خاص بالدعم النفسي؟ الكثير منا يحتاج إلى هذا الدعم في هذه الأوقات العصيبة.",
        likes: 45,
        replies: 8
    }
];

const trendingData = [
    { num: "01", title: "وصول قوافل إغاثة إلى الشمال", views: "12.5K" },
    { num: "02", title: "افتتاح مستشفى ميداني جديد", views: "9.2K" },
    { num: "03", title: "مبادرة تعليمية للأطفال النازحين", views: "8.1K" },
    { num: "04", title: "عائلة مفقودة تعود بعد 10 أيام", views: "7.4K" },
    { num: "05", title: "شاب ينقذ 5 أشخاص من الأنقاض", views: "6.8K" }
];


// ========== USER DATA ==========
const currentUser = {
    id: 1,
    name: "أحمد الخالدي",
    role: "صحفي موثوق",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
    bio: "صحفي مستقل متخصص في الشؤون الإنسانية والتغطيات الميدانية",
    location: "غزة - فلسطين",
    joinDate: "2023-08-15",
    stats: {
        posts: 24,
        followers: 1250,
        following: 89,
        verified: true
    }
};

const userPosts = [
    {
        id: 101,
        title: "تقرير ميداني: الوضع الإنساني في الشمال",
        desc: "جولة ميدانية في المناطق الشمالية ورصد الاحتياجات العاجلة للنازحين...",
        image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=600",
        category: "تقرير ميداني",
        date: "2024-01-20",
        type: "report",
        views: 3450,
        likes: 128
    },
    {
        id: 102,
        title: "قصة نجاة: طفل عمره 5 سنوات تحت الأنقاض 3 أيام",
        desc: "قصة مؤثرة عن طفل نجا بأعجوبة من تحت أنقاض منزله المدمر...",
        image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600",
        category: "قصة إنسانية",
        date: "2024-01-18",
        type: "story",
        views: 8900,
        likes: 456
    },
    {
        id: 103,
        title: "تحليل: مستقبل التعليم في ظل الأزمة",
        desc: "قراءة في الواقع التعليمي وكيفية استمرار العملية التعليمية...",
        image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600",
        category: "تحليل",
        date: "2024-01-15",
        type: "article",
        views: 2100,
        likes: 89
    },
    {
        id: 104,
        title: "إغاثة عاجلة: قافلة مساعدات تصل إلى رفح",
        desc: "وصول قافلة إغاثة دولية محملة بالمواد الغذائية والأدوية...",
        image: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=600",
        category: "إغاثة",
        date: "2024-01-12",
        type: "news",
        views: 5600,
        likes: 234
    }
];


// ========== LIVE CHAT MESSAGES ==========
const chatMessages = [
    {
        id: 1,
        author: "محمد أحمد",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
        text: "الله ينصر إخواننا في غزة 💪",
        time: "الآن",
        verified: false,
        mod: false,
        highlighted: false
    },
    {
        id: 2,
        author: "سارة خالد",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
        text: "أخبار موثوقة أخيراً! شكراً على الجهد",
        time: "منذ دقيقة",
        verified: true,
        mod: false,
        highlighted: false
    },
    {
        id: 3,
        author: "أبو خالد",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
        text: "هل في تحديثات عن المناطق الشمالية؟",
        time: "منذ دقيقتين",
        verified: false,
        mod: false,
        highlighted: false
    },
    {
        id: 4,
        author: "فاطمة",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
        text: "دعواتكم للأطفال النازحين 🙏",
        time: "منذ 3 دقائق",
        verified: false,
        mod: false,
        highlighted: true
    },
    {
        id: 5,
        author: "د. أحمد",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
        text: "المستشفيات بحاجة لمساعدات عاجلة",
        time: "منذ 4 دقائق",
        verified: true,
        mod: true,
        highlighted: false
    },
    {
        id: 6,
        author: "ليلى",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100",
        text: "صوت الحقيقة أفضل مصدر إخباري حالياً",
        time: "منذ 5 دقائق",
        verified: false,
        mod: false,
        highlighted: false
    },
    {
        id: 7,
        author: "عمر",
        avatar: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=100",
        text: "الله يفرجها على الجميع",
        time: "منذ 6 دقائق",
        verified: false,
        mod: false,
        highlighted: false
    },
    {
        id: 8,
        author: "نور الهدى",
        avatar: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=100",
        text: "هل يمكن التطوع في فريق الإغاثة؟",
        time: "منذ 7 دقائق",
        verified: false,
        mod: false,
        highlighted: false
    },
    {
        id: 9,
        author: "خالد محمود",
        avatar: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=100",
        text: "نحتاج مزيد من التغطية الميدانية",
        time: "منذ 8 دقائق",
        verified: true,
        mod: false,
        highlighted: false
    },
    {
        id: 10,
        author: "أم أحمد",
        avatar: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=100",
        text: "الأطفال يحتاجون دعماً نفسياً عاجلاً",
        time: "منذ 10 دقائق",
        verified: false,
        mod: false,
        highlighted: true
    }
];


// ========== VERIFICATION TOOLS DATA ==========
const verificationTools = {
    reverseSearch: [
        {
            name: "Google Reverse Image",
            url: "https://images.google.com",
            icon: "fab fa-google",
            desc: "البحث العكسي عن الصور في Google"
        },
        {
            name: "TinEye",
            url: "https://tineye.com",
            icon: "fas fa-eye",
            desc: "محرك بحث عكسي متقدم للصور"
        },
        {
            name: "Yandex Images",
            url: "https://yandex.com/images",
            icon: "fas fa-search",
            desc: "بحث Yandex العكسي للصور"
        }
    ],
    metadata: [
        {
            name: "Jeffrey's Exif Viewer",
            url: "http://exif.regex.info",
            icon: "fas fa-image",
            desc: "عرض بيانات EXIF للصور"
        },
        {
            name: "FotoForensics",
            url: "https://fotoforensics.com",
            icon: "fas fa-fingerprint",
            desc: "تحليل الصور الرقمية والتلاعب"
        }
    ],

}

// ========== NOTIFICATIONS DATA ==========
const notificationsData = [
    {
        id: 1,
        type: 'post_banned',
        title: 'تم حظر منشورك',
        message: 'تم حظر منشور "تقرير ميداني: الوضع الإنساني في الشمال" لعدم مطابقته لمعايير المنصة.',
        time: 'منذ 5 دقائق',
        read: false,
        link: 'profile'
    },
    {
        id: 2,
        type: 'post_approved',
        title: 'تمت الموافقة على منشورك',
        message: 'تمت الموافقة على منشور "قصة نجاة: طفل عمره 5 سنوات" وهو الآن منشور.',
        time: 'منذ ساعة',
        read: false,
        link: 'profile'
    },
    {
        id: 3,
        type: 'new_comment',
        title: 'تعليق جديد على مقالك',
        message: 'علق خالد محمود على مقالك "الإعلام في زمن الحرب"',
        time: 'منذ ساعتين',
        read: true,
        link: 'articles'
    }
];

// ========== RESPONSE BOXES DATA ==========
const responseBoxesData = [
    {
        id: 1,
        author: "أحمد الخالدي",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
        text: "🎉 بنحتفل اليوم بإطلاق مبادرة جديدة للدعم النفسي للأطفال النازحين. نحتاج دعمكم واقتراحاتكم!",
        time: "منذ 10 دقائق",
        replies: [
            { id: 101, text: "فكرة رائعة! كيف نساعد؟", time: "منذ 8 دقائق" },
            { id: 102, text: "أنا طبيب نفسي وأقدر أساعد", time: "منذ 6 دقائق" },
            { id: 103, text: "الله يوفقكم", time: "منذ 3 دقائق" }
        ]
    },
    {
        id: 2,
        author: "أحمد الخالدي",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
        text: "📢 تحديث عاجل: قافلة إغاثة جديدة وصلت إلى رفح. من يحتاج مساعدات عاجلة يراسلني خاص.",
        time: "منذ 30 دقيقة",
        replies: [
            { id: 201, text: "عائلة في تل السلطان بحاجة دواء", time: "منذ 25 دقيقة" },
            { id: 202, text: "أنا في الشمال ومحتاج مساعدة", time: "منذ 20 دقيقة" }
        ]
    }
];
