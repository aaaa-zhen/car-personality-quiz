// ===== 10 维人格维度 =====
const DIMS = ['tech','status','driving','comfort','practicality','aesthetics','presence','family','individuality','conservatism'];
const SIGNALS = ['pioneer', 'feature', 'heritage', 'familyCare'];
const PERSONALITY_COUNT = 12;
const FILTER_COUNT = 5; // 年龄 + 性别 + 预算 + 动力 + 车身
const TOTAL_QUESTIONS = PERSONALITY_COUNT + FILTER_COUNT; // 17

// ===== 12 道人格题 =====
const questions = [
  {
    title: "周末你最可能在做什么？",
    options: [
      { text: "研究数码新品或刷科技资讯", w: { tech: 3, individuality: 1 } },
      { text: "陪家人逛超市或做顿饭", w: { family: 3, comfort: 1, conservatism: 1 } },
      { text: "和朋友去网红餐厅打卡", w: { aesthetics: 2, status: 1, individuality: 1 } },
      { text: "在车库里研究改装或跑山路", w: { driving: 3, individuality: 1 } }
    ]
  },
  {
    title: "你花钱时更像哪种人？",
    options: [
      { text: "最在意值不值，性价比优先", w: { practicality: 3, conservatism: 1 } },
      { text: "愿意为设计和质感买单", w: { aesthetics: 3, individuality: 1 } },
      { text: "愿意为更好的体验和品牌买单", w: { status: 2, comfort: 1, tech: 1 } },
      { text: "愿意为身份感和排面买单", w: { presence: 3, status: 1 } }
    ]
  },
  {
    title: "朋友通常觉得你更像哪种人？",
    options: [
      { text: "靠谱、稳，不太折腾", w: { conservatism: 3, practicality: 1 } },
      { text: "有自己的审美，不愿意太普通", w: { aesthetics: 2, individuality: 2 } },
      { text: "很拼，明显在往上走", w: { status: 3, driving: 1 } },
      { text: "有点强势，不太像会认输的人", w: { presence: 2, driving: 2 } }
    ]
  },
  {
    title: "你最看重车的哪个方面？",
    options: [
      { text: "智能化配置，科技拉满", w: { tech: 3, aesthetics: 1 } },
      { text: "操控和动力，推背感是信仰", w: { driving: 3, individuality: 1 } },
      { text: "空间和舒适，全家都满意", w: { family: 2, comfort: 2 } },
      { text: "品牌口碑和保值率", w: { conservatism: 2, practicality: 2 } }
    ]
  },
  {
    title: "你最受不了一辆车哪一点？",
    options: [
      { text: "车机卡顿，交互反人类", w: { tech: 3, aesthetics: 1 } },
      { text: "花里胡哨但不实用", w: { practicality: 3, conservatism: 1 } },
      { text: "太普通，开出去没记忆点", w: { individuality: 2, presence: 1, driving: 1 } },
      { text: "太软，没有气场和存在感", w: { presence: 3, status: 1 } }
    ]
  },
  {
    title: "如果给你一天时间自驾，你选？",
    options: [
      { text: "沿海公路劈弯，享受驾驶乐趣", w: { driving: 3, individuality: 1 } },
      { text: "带全家去郊外农庄放松", w: { family: 3, comfort: 1 } },
      { text: "城市巡游，感受街头目光", w: { aesthetics: 2, status: 1, presence: 1 } },
      { text: "高速直奔另一座城市办事", w: { practicality: 2, status: 1, comfort: 1 } }
    ]
  },
  {
    title: "你对「面子」这件事的态度更接近？",
    options: [
      { text: "实用最重要，面子排后面", w: { practicality: 3, conservatism: 1 } },
      { text: "不必夸张，但最好有点体面", w: { comfort: 2, status: 1, conservatism: 1 } },
      { text: "不能太普通，至少得看起来不错", w: { status: 2, aesthetics: 1, individuality: 1 } },
      { text: "既然买了，就要有存在感", w: { presence: 3, status: 1 } }
    ]
  },
  {
    title: "如果车是你的「分身」，你希望它更像什么？",
    options: [
      { text: "一个可靠的工具", w: { practicality: 3, family: 1 } },
      { text: "我的审美延伸", w: { aesthetics: 3, individuality: 1 } },
      { text: "我的身份名片", w: { status: 2, presence: 2 } },
      { text: "我的个性宣言", w: { individuality: 2, driving: 1, tech: 1 } }
    ]
  },
  {
    title: "你向往的生活更像哪一种？",
    options: [
      { text: "日子稳稳的，舒服最重要", w: { comfort: 2, conservatism: 2 } },
      { text: "城市精致生活，有风格有氛围", w: { aesthetics: 2, individuality: 1, tech: 1 } },
      { text: "事业在上升，资源、体面都在变好", w: { status: 3, presence: 1 } },
      { text: "活得更锋利一点，不想太平幸", w: { driving: 2, individuality: 2 } }
    ]
  },
  {
    title: "选一首你会在车里循环播放的音乐类型？",
    options: [
      { text: "电子/科技感音乐", w: { tech: 2, individuality: 1, driving: 1 } },
      { text: "爵士/古典，配一杯咖啡", w: { comfort: 2, aesthetics: 2 } },
      { text: "流行/民谣，温暖治愈", w: { family: 2, conservatism: 1, comfort: 1 } },
      { text: "说唱/摇滚，要的就是劲儿", w: { presence: 2, driving: 1, individuality: 1 } }
    ]
  },
  {
    title: "同样是智能车，你更认可哪种产品哲学？",
    options: [
      { text: "系统闭环、交互克制、长期体验稳定", w: { tech: 2, status: 1 }, s: { pioneer: 3 } },
      { text: "配置拉满、功能丰富、智驾体验更激进", w: { tech: 2, individuality: 1 }, s: { feature: 3 } },
      { text: "豪华舒适、照顾家人、体验全面", w: { comfort: 2, family: 2 }, s: { familyCare: 3 } },
      { text: "品牌口碑、做工成熟、长期持有放心", w: { conservatism: 2, practicality: 1, status: 1 }, s: { heritage: 3 } }
    ]
  },
  {
    title: "如果这台车要陪你 5 年，你最在意哪件事？",
    options: [
      { text: "品牌路线清晰，后续还能不断进化", w: { tech: 1, status: 1 }, s: { pioneer: 2 } },
      { text: "同价位里功能最全，买到就是赚到", w: { practicality: 1, tech: 1 }, s: { feature: 2 } },
      { text: "家人坐得舒服，用车场景都照顾到", w: { family: 1, comfort: 1, practicality: 1 }, s: { familyCare: 2 } },
      { text: "品牌够稳，长期持有心里踏实", w: { conservatism: 2, status: 1 }, s: { heritage: 2 } }
    ]
  }
];

// ===== 5 道现实过滤题（年龄、性别、预算、动力、车身） =====
const filterQuestions = [
  {
    title: "你的年龄段是？",
    tag: "基本信息",
    options: [
      { text: "18-24 岁", value: 1 },
      { text: "25-30 岁", value: 2 },
      { text: "31-40 岁", value: 3 },
      { text: "41-50 岁", value: 4 },
      { text: "50 岁以上", value: 5 }
    ]
  },
  {
    title: "你的性别是？",
    tag: "基本信息",
    options: [
      { text: "男", value: "male" },
      { text: "女", value: "female" }
    ]
  },
  {
    title: "你的购车预算大概是？",
    tag: "现实过滤",
    options: [
      { text: "10 万以内", value: 1 },
      { text: "10-20 万", value: 2 },
      { text: "20-35 万", value: 3 },
      { text: "35-60 万", value: 4 },
      { text: "60 万以上", value: 5 }
    ]
  },
  {
    title: "你更倾向哪种动力类型？",
    tag: "现实过滤",
    options: [
      { text: "纯电", value: "纯电" },
      { text: "插混/增程", value: "插混/增程" },
      { text: "混动", value: "混动" },
      { text: "燃油", value: "燃油" },
      { text: "都可以", value: "都可以" }
    ]
  },
  {
    title: "你更倾向哪种车身类型？",
    tag: "现实过滤",
    options: [
      { text: "轿车", value: "轿车" },
      { text: "SUV", value: "SUV" },
      { text: "跑车", value: "跑车" },
      { text: "MPV", value: "MPV" },
      { text: "都行", value: "都行" }
    ]
  }
];

// ===== 25 款车型数据库 =====
// age: { young(18-24), prime(25-30), mid(31-40), mature(41-50), senior(50+) } 0-10
// gender: { male, female } 0-10
// pop: 市场热度/销量 0-10（影响同分排序）
const carDatabase = [
  // --- 10万以内 ---
  { name: "五菱缤果", brand: "五菱", price: "6万+", energy: "纯电", body: "轿车", tier: 1, pop: 7,
    w: { tech:3, status:0, driving:1, comfort:2, practicality:10, aesthetics:4, presence:0, family:3, individuality:2, conservatism:5 },
    s: { pioneer:1, feature:4, heritage:1, familyCare:3 },
    age: { young:8, prime:5, mid:3, mature:2, senior:2 },
    gender: { male:3, female:8 },
    tags: ["代步神器","省钱王者","城市小精灵","实用至上"] },
  { name: "比亚迪 海鸥", brand: "比亚迪", price: "7万+", energy: "纯电", body: "轿车", tier: 1, pop: 9,
    w: { tech:5, status:1, driving:2, comfort:3, practicality:9, aesthetics:5, presence:0, family:3, individuality:3, conservatism:4 },
    s: { pioneer:2, feature:7, heritage:2, familyCare:4 },
    age: { young:8, prime:6, mid:4, mature:3, senior:2 },
    gender: { male:5, female:7 },
    tags: ["性价比之王","国民纯电","智能入门","通勤利器"] },
  { name: "大众 朗逸", brand: "大众", price: "9万+", energy: "燃油", body: "轿车", tier: 1, pop: 8,
    w: { tech:2, status:3, driving:3, comfort:5, practicality:8, aesthetics:3, presence:2, family:5, individuality:0, conservatism:10 },
    s: { pioneer:1, feature:2, heritage:8, familyCare:5 },
    age: { young:3, prime:5, mid:7, mature:8, senior:7 },
    gender: { male:6, female:5 },
    tags: ["国民轿车","稳字当头","口碑保障","省心之选"] },
  // --- 10-20万 ---
  { name: "比亚迪 秦L DM-i", brand: "比亚迪", price: "10万+", energy: "插混", body: "轿车", tier: 2, pop: 9,
    w: { tech:6, status:2, driving:3, comfort:5, practicality:9, aesthetics:5, presence:1, family:5, individuality:2, conservatism:4 },
    s: { pioneer:3, feature:8, heritage:2, familyCare:6 },
    age: { young:5, prime:7, mid:7, mature:5, senior:4 },
    gender: { male:6, female:5 },
    tags: ["省油神器","插混标杆","家用首选","超长续航"] },
  { name: "丰田 卡罗拉", brand: "丰田", price: "11万+", energy: "混动", body: "轿车", tier: 2, pop: 7,
    w: { tech:2, status:2, driving:3, comfort:5, practicality:8, aesthetics:3, presence:1, family:6, individuality:0, conservatism:10 },
    s: { pioneer:1, feature:2, heritage:9, familyCare:7 },
    age: { young:3, prime:5, mid:7, mature:8, senior:8 },
    gender: { male:5, female:5 },
    tags: ["全球神车","皮实耐用","保值率高","家庭之友"] },
  { name: "马自达3 昂克赛拉", brand: "马自达", price: "12万+", energy: "燃油", body: "轿车", tier: 2, pop: 3,
    w: { tech:2, status:2, driving:9, comfort:3, practicality:4, aesthetics:7, presence:1, family:1, individuality:7, conservatism:2 },
    s: { pioneer:2, feature:2, heritage:7, familyCare:1 },
    age: { young:8, prime:7, mid:4, mature:2, senior:1 },
    gender: { male:7, female:4 },
    tags: ["弯道之王","人马一体","魂动设计","驾控信仰"] },
  { name: "小鹏 MONA M03", brand: "小鹏", price: "12万+", energy: "纯电", body: "轿车", tier: 2, pop: 6,
    w: { tech:7, status:1, driving:4, comfort:4, practicality:6, aesthetics:6, presence:1, family:2, individuality:5, conservatism:1 },
    s: { pioneer:4, feature:9, heritage:1, familyCare:2 },
    age: { young:9, prime:7, mid:4, mature:2, senior:1 },
    gender: { male:6, female:5 },
    tags: ["智驾入门","科技新秀","年轻之选","智能座舱"] },
  { name: "比亚迪 宋PLUS DM-i", brand: "比亚迪", price: "15万+", energy: "插混", body: "SUV", tier: 2, pop: 9,
    w: { tech:6, status:2, driving:3, comfort:5, practicality:8, aesthetics:4, presence:2, family:8, individuality:2, conservatism:4 },
    s: { pioneer:3, feature:8, heritage:2, familyCare:8 },
    age: { young:3, prime:6, mid:8, mature:6, senior:4 },
    gender: { male:6, female:5 },
    tags: ["家用SUV王","大空间","省油顾家","全能之选"] },
  { name: "smart 精灵#1", brand: "smart", price: "16万+", energy: "纯电", body: "SUV", tier: 2, pop: 3,
    w: { tech:5, status:3, driving:4, comfort:4, practicality:2, aesthetics:10, presence:1, family:1, individuality:9, conservatism:0 },
    s: { pioneer:4, feature:4, heritage:6, familyCare:1 },
    age: { young:9, prime:7, mid:3, mature:1, senior:0 },
    gender: { male:3, female:9 },
    tags: ["颜值即正义","设计控","个性座驾","都市精灵"] },
  // --- 20-35万 ---
  { name: "特斯拉 Model 3", brand: "特斯拉", price: "23万+", energy: "纯电", body: "轿车", tier: 3, pop: 9,
    w: { tech:10, status:5, driving:8, comfort:4, practicality:5, aesthetics:7, presence:3, family:3, individuality:6, conservatism:1 },
    s: { pioneer:10, feature:4, heritage:2, familyCare:2 },
    age: { young:8, prime:8, mid:5, mature:3, senior:1 },
    gender: { male:6, female:5 },
    tags: ["极简科技","纯电标杆","驾驶直接","全球爆款"] },
  { name: "特斯拉 Model Y", brand: "特斯拉", price: "25万+", energy: "纯电", body: "SUV", tier: 3, pop: 10,
    w: { tech:10, status:5, driving:6, comfort:5, practicality:6, aesthetics:6, presence:3, family:6, individuality:6, conservatism:1 },
    s: { pioneer:10, feature:4, heritage:2, familyCare:4 },
    age: { young:6, prime:8, mid:6, mature:4, senior:2 },
    gender: { male:5, female:6 },
    tags: ["科技标杆","智驾先锋","全球爆款","纯电SUV"] },
  { name: "小米 SU7", brand: "小米", price: "22万+", energy: "纯电", body: "轿车", tier: 3, pop: 7,
    w: { tech:9, status:4, driving:8, comfort:5, practicality:4, aesthetics:8, presence:3, family:2, individuality:7, conservatism:0 },
    s: { pioneer:6, feature:6, heritage:1, familyCare:1 },
    age: { young:9, prime:8, mid:4, mature:2, senior:0 },
    gender: { male:8, female:4 },
    tags: ["科技旗舰","性能轿跑","智能座舱","年度话题"] },
  { name: "小鹏 P7+", brand: "小鹏", price: "19万+", energy: "纯电", body: "轿车", tier: 3, pop: 5,
    w: { tech:8, status:2, driving:5, comfort:5, practicality:5, aesthetics:6, presence:1, family:3, individuality:4, conservatism:1 },
    s: { pioneer:5, feature:10, heritage:1, familyCare:2 },
    age: { young:7, prime:7, mid:4, mature:2, senior:1 },
    gender: { male:6, female:5 },
    tags: ["智驾旗舰","纯电轿跑","科技美学","长续航"] },
  { name: "宝马 3系", brand: "宝马", price: "30万+", energy: "燃油", body: "轿车", tier: 3, pop: 8,
    w: { tech:4, status:7, driving:9, comfort:5, practicality:3, aesthetics:6, presence:4, family:2, individuality:4, conservatism:5 },
    s: { pioneer:2, feature:2, heritage:8, familyCare:2 },
    age: { young:6, prime:8, mid:6, mature:4, senior:2 },
    gender: { male:8, female:4 },
    tags: ["操控标杆","运动豪华","BBA门面","驾驶者之车"] },
  { name: "理想 L6", brand: "理想", price: "25万+", energy: "增程", body: "SUV", tier: 3, pop: 8,
    w: { tech:7, status:4, driving:3, comfort:8, practicality:5, aesthetics:5, presence:4, family:9, individuality:2, conservatism:3 },
    s: { pioneer:5, feature:7, heritage:1, familyCare:10 },
    age: { young:2, prime:6, mid:9, mature:6, senior:3 },
    gender: { male:8, female:4 },
    tags: ["奶爸神车","移动的家","大五座","舒适空间"] },
  { name: "丰田 凯美瑞", brand: "丰田", price: "18万+", energy: "混动", body: "轿车", tier: 3, pop: 7,
    w: { tech:3, status:4, driving:4, comfort:7, practicality:7, aesthetics:4, presence:3, family:5, individuality:0, conservatism:9 },
    s: { pioneer:1, feature:2, heritage:9, familyCare:6 },
    age: { young:2, prime:4, mid:7, mature:8, senior:7 },
    gender: { male:7, female:4 },
    tags: ["中级车王","稳重之选","商务家用","省心可靠"] },
  { name: "MINI Cooper", brand: "MINI", price: "22万+", energy: "燃油", body: "轿车", tier: 3, pop: 4,
    w: { tech:3, status:4, driving:6, comfort:3, practicality:1, aesthetics:10, presence:2, family:0, individuality:10, conservatism:0 },
    s: { pioneer:3, feature:2, heritage:7, familyCare:0 },
    age: { young:9, prime:7, mid:3, mature:1, senior:0 },
    gender: { male:3, female:9 },
    tags: ["独一无二","复古潮流","设计icon","个性先锋"] },
  // --- 35-60万 ---
  { name: "问界 M9", brand: "问界", price: "47万+", energy: "增程", body: "SUV", tier: 4, pop: 8,
    w: { tech:10, status:6, driving:4, comfort:9, practicality:4, aesthetics:6, presence:7, family:7, individuality:4, conservatism:2 },
    s: { pioneer:7, feature:8, heritage:2, familyCare:8 },
    age: { young:2, prime:4, mid:7, mature:8, senior:5 },
    gender: { male:8, female:3 },
    tags: ["科技旗舰","华为生态","豪华智能","全家出行"] },
  { name: "宝马 X3", brand: "宝马", price: "37万+", energy: "燃油", body: "SUV", tier: 4, pop: 7,
    w: { tech:4, status:7, driving:7, comfort:6, practicality:4, aesthetics:5, presence:5, family:4, individuality:3, conservatism:6 },
    s: { pioneer:2, feature:2, heritage:8, familyCare:4 },
    age: { young:3, prime:6, mid:7, mature:7, senior:4 },
    gender: { male:6, female:5 },
    tags: ["运动SUV","豪华品质","全能选手","BBA之选"] },
  { name: "奥迪 A6L", brand: "奥迪", price: "42万+", energy: "燃油", body: "轿车", tier: 4, pop: 7,
    w: { tech:4, status:8, driving:4, comfort:8, practicality:3, aesthetics:5, presence:7, family:3, individuality:1, conservatism:9 },
    s: { pioneer:2, feature:2, heritage:9, familyCare:3 },
    age: { young:1, prime:3, mid:6, mature:9, senior:7 },
    gender: { male:8, female:3 },
    tags: ["官车气质","沉稳大气","商务首选","面面俱到"] },
  { name: "腾势 D9", brand: "腾势", price: "34万+", energy: "插混", body: "MPV", tier: 4, pop: 7,
    w: { tech:7, status:5, driving:2, comfort:10, practicality:6, aesthetics:5, presence:5, family:10, individuality:2, conservatism:3 },
    s: { pioneer:5, feature:7, heritage:2, familyCare:10 },
    age: { young:1, prime:4, mid:8, mature:7, senior:5 },
    gender: { male:6, female:5 },
    tags: ["MPV之王","头等舱","全家尊享","商务接待"] },
  // --- 60万以上 ---
  { name: "保时捷 Cayenne", brand: "保时捷", price: "72万+", energy: "燃油", body: "SUV", tier: 5, pop: 6,
    w: { tech:5, status:9, driving:7, comfort:7, practicality:2, aesthetics:7, presence:9, family:3, individuality:6, conservatism:4 },
    s: { pioneer:4, feature:2, heritage:9, familyCare:3 },
    age: { young:3, prime:5, mid:7, mature:8, senior:4 },
    gender: { male:6, female:6 },
    tags: ["豪华运动","身份象征","全能旗舰","气场压制"] },
  { name: "保时捷 911", brand: "保时捷", price: "130万+", energy: "燃油", body: "跑车", tier: 5, pop: 4,
    w: { tech:5, status:9, driving:10, comfort:3, practicality:0, aesthetics:9, presence:8, family:0, individuality:9, conservatism:2 },
    s: { pioneer:5, feature:2, heritage:10, familyCare:0 },
    age: { young:5, prime:7, mid:6, mature:5, senior:2 },
    gender: { male:8, female:4 },
    tags: ["终极驾控","传奇跑车","Dream Car","速度图腾"] },
  { name: "奔驰 GLE", brand: "奔驰", price: "65万+", energy: "燃油", body: "SUV", tier: 5, pop: 6,
    w: { tech:5, status:8, driving:5, comfort:9, practicality:3, aesthetics:6, presence:8, family:5, individuality:2, conservatism:7 },
    s: { pioneer:2, feature:2, heritage:9, familyCare:5 },
    age: { young:1, prime:3, mid:6, mature:8, senior:6 },
    gender: { male:7, female:4 },
    tags: ["豪华气场","舒适旗舰","大气稳重","商务精英"] },
  { name: "仰望 U8", brand: "比亚迪", price: "110万+", energy: "插混", body: "SUV", tier: 5, pop: 3,
    w: { tech:10, status:8, driving:6, comfort:8, practicality:2, aesthetics:7, presence:10, family:4, individuality:8, conservatism:1 },
    s: { pioneer:8, feature:7, heritage:2, familyCare:4 },
    age: { young:3, prime:5, mid:7, mature:7, senior:4 },
    gender: { male:9, female:2 },
    tags: ["国产天花板","黑科技","气场无敌","硬核豪华"] }
];

// ===== 维度中文名（结果页用） =====
const dimLabels = {
  tech: "科技", status: "精英", driving: "驾控",
  comfort: "舒享", practicality: "务实", aesthetics: "审美",
  presence: "气场", family: "顾家", individuality: "个性",
  conservatism: "稳健"
};

// ===== 维度对应的 slogan / 描述 / 画像 =====
const dimMeta = {
  tech:          { slogan: "你不跟随潮流，你定义潮流", desc: "你是科技的信仰者，喜欢尝试新鲜事物，追求前沿体验。车对你来说不只是交通工具，更是科技生活方式的延伸。智能座舱、辅助驾驶、OTA升级，这些才是你的核心关注点。", portrait: "互联网从业者、数码爱好者、追求科技感的年轻人" },
  status:        { slogan: "人生就是不断升级的过程", desc: "你是一个目标明确的人，一直在往上走。车对你来说是事业阶段的证明，选车就像选合伙人——要能配得上你当前的段位，还得有继续往上走的空间。", portrait: "奔往成功路上的精英人士、中层管理者、创业者" },
  driving:       { slogan: "方向盘后面，才是真正的自己", desc: "你追求速度与激情，骨子里住着一个赛车手。操控、动力、推背感是你选车的核心标准。你不是在开车，你是在和每一段弯道较劲。", portrait: "追求速度与激情、个性张扬、特立独行的人" },
  comfort:       { slogan: "真正的奢华，是让每一程都值得享受", desc: "你追求生活的质感，相信好的体验值得投资。座椅的包裹感、车内的静谧性、悬挂的滤震质感——这些细节构成了你的用车哲学。", portrait: "注重生活品质、成熟稳重、享受人生的人" },
  practicality:  { slogan: "钱要花在刀刃上", desc: "你是最清醒的消费者，不被品牌和营销裹挟。省油、耐用、保值率——这些才是你的核心指标。你知道车就是工具，好用比好看重要一万倍。", portrait: "普通打工族、踏实过日子的人、精打细算的理性派" },
  aesthetics:    { slogan: "生活是一场关于美的修行", desc: "你有自己独特的审美标准，拒绝一切平庸和粗糙。车的设计、配色、内饰质感都在你的考量范围内。你选的不是车，是你的审美宣言。", portrait: "都市精致小资、文化产业从业者、设计师、有品位的年轻人" },
  presence:      { slogan: "气场这种东西，开出来就知道了", desc: "你需要的不只是代步工具，而是一种无声的震慑力。车要大、要稳、要有存在感。当你的车停在那里，别人就知道——这个人不简单。", portrait: "企业老板、做事高调的人、注重排面的社交达人" },
  family:        { slogan: "家人坐得舒服，才是最大的成功", desc: "你的选车标准只有一个：全家满意。空间够大、乘坐舒适、安全配置齐全——这些才是硬指标。你不是在选车，你是在选全家人的移动空间。", portrait: "有娃家庭、注重家庭生活、把家人放在第一位的人" },
  individuality: { slogan: "我不随波逐流，我就是潮流", desc: "你拒绝千篇一律，骨子里有一种不愿妥协的倔强。你的车必须有辨识度，必须能代表你的态度。街上同款越少，你越满意。", portrait: "文艺青年、创意工作者、追求与众不同的人" },
  conservatism:  { slogan: "稳，才是最高级的人设", desc: "你信奉规则和秩序，选车也不例外。品牌要正、口碑要好、不出格不冒险。你选的车就像你这个人——让人放心、值得信赖。", portrait: "国企职工、体制内人士、注重稳定的中年人" }
};

const signalLabels = {
  pioneer: "先锋闭环",
  feature: "配置体验",
  heritage: "品牌口碑",
  familyCare: "家庭友好"
};

// ===== 品牌 Logo SVGs =====
const brandLogos = {
  '特斯拉': '<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M50 12 L50 88" stroke="#E82127" stroke-width="7" stroke-linecap="round"/><path d="M20 20 C20 20 35 28 50 12 C65 28 80 20 80 20" stroke="#E82127" stroke-width="5" stroke-linecap="round" fill="none"/></svg>',
  '宝马': '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="44" fill="none" stroke="#333" stroke-width="4"/><circle cx="50" cy="50" r="38" fill="none" stroke="#333" stroke-width="2"/><line x1="50" y1="12" x2="50" y2="88" stroke="#333" stroke-width="2"/><line x1="12" y1="50" x2="88" y2="50" stroke="#333" stroke-width="2"/><path d="M50 12 A38 38 0 0 1 88 50 L50 50 Z" fill="#4BA2DB"/><path d="M12 50 A38 38 0 0 1 50 88 L50 50 Z" fill="#4BA2DB"/><text x="50" y="10" text-anchor="middle" font-size="6" font-weight="bold" fill="#333">BMW</text></svg>',
  '奔驰': '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="42" fill="none" stroke="#333" stroke-width="4"/><circle cx="50" cy="50" r="38" fill="none" stroke="#333" stroke-width="2"/><line x1="50" y1="12" x2="50" y2="50" stroke="#333" stroke-width="3.5"/><line x1="50" y1="50" x2="17" y2="69" stroke="#333" stroke-width="3.5"/><line x1="50" y1="50" x2="83" y2="69" stroke="#333" stroke-width="3.5"/></svg>',
  '奥迪': '<svg viewBox="0 0 140 60" xmlns="http://www.w3.org/2000/svg"><circle cx="28" cy="30" r="18" fill="none" stroke="#333" stroke-width="3"/><circle cx="52" cy="30" r="18" fill="none" stroke="#333" stroke-width="3"/><circle cx="76" cy="30" r="18" fill="none" stroke="#333" stroke-width="3"/><circle cx="100" cy="30" r="18" fill="none" stroke="#333" stroke-width="3"/></svg>',
  '保时捷': '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50 8 L90 30 L90 85 L50 92 L10 85 L10 30 Z" fill="none" stroke="#333" stroke-width="3"/><line x1="50" y1="30" x2="50" y2="85" stroke="#333" stroke-width="2"/><line x1="10" y1="55" x2="90" y2="55" stroke="#333" stroke-width="2"/><text x="50" y="48" text-anchor="middle" font-size="11" font-weight="bold" fill="#A6192E" font-family="sans-serif">P</text><text x="30" y="75" text-anchor="middle" font-size="7" fill="#333" font-family="sans-serif">911</text><text x="70" y="75" text-anchor="middle" font-size="7" fill="#333" font-family="sans-serif">RS</text></svg>',
  '大众': '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="42" fill="none" stroke="#00437A" stroke-width="4"/><text x="50" y="55" text-anchor="middle" font-size="28" font-weight="bold" fill="#00437A" font-family="sans-serif">VW</text></svg>',
  '丰田': '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><ellipse cx="50" cy="50" rx="42" ry="28" fill="none" stroke="#EB0A1E" stroke-width="3"/><ellipse cx="50" cy="50" rx="18" ry="28" fill="none" stroke="#EB0A1E" stroke-width="3"/><ellipse cx="50" cy="42" rx="32" ry="16" fill="none" stroke="#EB0A1E" stroke-width="3"/></svg>',
  '马自达': '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><ellipse cx="50" cy="50" rx="42" ry="30" fill="none" stroke="#333" stroke-width="3"/><path d="M25 50 Q37 32 50 38 Q63 32 75 50" fill="none" stroke="#333" stroke-width="3"/><path d="M50 38 L50 50" stroke="#333" stroke-width="2"/></svg>',
  '比亚迪': '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><ellipse cx="50" cy="50" rx="42" ry="26" fill="none" stroke="#1A1A6C" stroke-width="3"/><text x="50" y="56" text-anchor="middle" font-size="22" font-weight="bold" fill="#1A1A6C" font-family="sans-serif">BYD</text></svg>',
  '小米': '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="14" y="14" width="72" height="72" rx="18" fill="none" stroke="#FF6900" stroke-width="4"/><text x="50" y="62" text-anchor="middle" font-size="28" font-weight="bold" fill="#FF6900" font-family="sans-serif">MI</text></svg>',
  '小鹏': '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="42" fill="none" stroke="#3366FF" stroke-width="3"/><path d="M30 35 L50 55 L70 35" stroke="#3366FF" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M30 65 L50 45 L70 65" stroke="#3366FF" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  '理想': '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="14" y="14" width="72" height="72" rx="8" fill="none" stroke="#333" stroke-width="3"/><text x="50" y="62" text-anchor="middle" font-size="30" font-weight="bold" fill="#00B87A" font-family="sans-serif">Li</text></svg>',
  '五菱': '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50 15 L72 38 L60 38 L72 62 L50 85 L28 62 L40 62 L28 38 L40 38 Z" fill="none" stroke="#E60012" stroke-width="3" stroke-linejoin="round"/></svg>',
  'smart': '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="42" fill="none" stroke="#333" stroke-width="3"/><text x="50" y="40" text-anchor="middle" font-size="12" font-weight="bold" fill="#333" font-family="sans-serif">smart</text><path d="M30 55 Q50 70 70 55" stroke="#FF8C00" stroke-width="3" fill="none" stroke-linecap="round"/></svg>',
  'MINI': '<svg viewBox="0 0 120 60" xmlns="http://www.w3.org/2000/svg"><path d="M10 30 L25 10 L95 10 L110 30 L95 50 L25 50 Z" fill="none" stroke="#333" stroke-width="3"/><text x="60" y="36" text-anchor="middle" font-size="18" font-weight="bold" fill="#333" font-family="sans-serif">MINI</text></svg>',
  '问界': '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="42" fill="none" stroke="#E60012" stroke-width="3"/><path d="M30 35 L30 65 M30 50 L50 50 M50 35 L50 65 M55 35 L55 65 M55 50 L75 50 M75 35 L75 65" stroke="#E60012" stroke-width="3.5" stroke-linecap="round"/></svg>',
  '腾势': '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="42" fill="none" stroke="#1A1A6C" stroke-width="3"/><path d="M40 25 L40 75 Q40 75 60 65 Q72 58 72 50 Q72 42 60 35 Q40 25 40 25 Z" fill="none" stroke="#1A1A6C" stroke-width="3"/></svg>'
};

// ===== Icon SVGs =====
const iconSVGs = {
  tech: '<svg viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M9 9h6"/><path d="M9 13h6"/><path d="M9 17h4"/></svg>',
  status: '<svg viewBox="0 0 24 24"><path d="M23 6l-9.5 9.5-5-5L1 18"/><path d="M17 6h6v6"/></svg>',
  driving: '<svg viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>',
  comfort: '<svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>',
  practicality: '<svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
  aesthetics: '<svg viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>',
  presence: '<svg viewBox="0 0 24 24"><path d="M18 8L22 12L18 16"/><path d="M6 8L2 12L6 16"/><path d="M12 2v20"/></svg>',
  family: '<svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><path d="M9 22V12h6v10"/></svg>',
  individuality: '<svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
  conservatism: '<svg viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>'
};

// ===== 粒子效果 =====
(function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  for (let i = 0; i < 25; i++) {
    const span = document.createElement('span');
    span.style.left = Math.random() * 100 + '%';
    span.style.top = (50 + Math.random() * 50) + '%';
    span.style.animationDuration = (6 + Math.random() * 10) + 's';
    span.style.animationDelay = Math.random() * 8 + 's';
    span.style.width = span.style.height = (1 + Math.random() * 2.5) + 'px';
    container.appendChild(span);
  }
})();

// ===== 状态 =====
let currentQ = 0;
let userProfile = {};
let userSignals = {};
let answers = [];
let filterAge = null;      // 1-5
let filterGender = null;   // 'male' | 'female'
let filterBudget = null;   // 1-5
let filterEnergy = null;   // string
let filterBody = null;     // string
const labels = ["A", "B", "C", "D", "E"];

function resetProfile() {
  userProfile = {};
  DIMS.forEach(d => userProfile[d] = 0);
}

function resetSignals() {
  userSignals = {};
  SIGNALS.forEach(s => userSignals[s] = 0);
}

function applyWeights(target, weights, direction = 1) {
  if (!weights) return;
  for (const [k, v] of Object.entries(weights)) {
    target[k] = (target[k] || 0) + (v * direction);
  }
}

function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function startQuiz() {
  currentQ = 0;
  resetProfile();
  resetSignals();
  answers = [];
  filterAge = null;
  filterGender = null;
  filterBudget = null;
  filterEnergy = null;
  filterBody = null;
  showPage('page-question');
  renderQuestion();
}

function goBack() {
  if (currentQ <= 0) { showPage('page-start'); return; }
  currentQ--;
  const last = answers.pop();
  if (currentQ < PERSONALITY_COUNT) {
    applyWeights(userProfile, last && last.w, -1);
    applyWeights(userSignals, last && last.s, -1);
  } else {
    const fi = currentQ - PERSONALITY_COUNT;
    if (fi === 0) filterAge = null;
    else if (fi === 1) filterGender = null;
    else if (fi === 2) filterBudget = null;
    else if (fi === 3) filterEnergy = null;
    else if (fi === 4) filterBody = null;
  }
  renderQuestion();
}

function renderQuestion() {
  document.getElementById('progress').style.width = (((currentQ + 1) / TOTAL_QUESTIONS) * 100) + '%';
  document.getElementById('q-num').textContent = currentQ + 1;
  document.getElementById('q-total').textContent = TOTAL_QUESTIONS;

  const tagEl = document.getElementById('q-tag');
  const optionsEl = document.getElementById('q-options');
  optionsEl.innerHTML = '';

  if (currentQ < PERSONALITY_COUNT) {
    tagEl.style.display = 'none';
    const q = questions[currentQ];
    document.getElementById('q-text').textContent = q.title;

    q.options.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.className = 'opt-btn';
      btn.innerHTML = '<span class="opt-idx">' + labels[i] + '</span><span>' + opt.text + '</span>';
      btn.onclick = () => {
        btn.classList.add('selected');
        setTimeout(() => {
          applyWeights(userProfile, opt.w, 1);
          applyWeights(userSignals, opt.s, 1);
          answers.push({ w: opt.w, s: opt.s });
          currentQ++;
          if (currentQ >= TOTAL_QUESTIONS) {
            showPage('page-loading');
            setTimeout(showResult, 2000);
          } else {
            renderQuestion();
          }
        }, 180);
      };
      optionsEl.appendChild(btn);
    });
  } else {
    const fi = currentQ - PERSONALITY_COUNT;
    const fq = filterQuestions[fi];
    tagEl.style.display = 'inline-block';
    tagEl.textContent = fq.tag || '现实过滤';
    document.getElementById('q-text').textContent = fq.title;

    fq.options.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.className = 'opt-btn';
      btn.innerHTML = '<span class="opt-idx">' + labels[i] + '</span><span>' + opt.text + '</span>';
      btn.onclick = () => {
        btn.classList.add('selected');
        setTimeout(() => {
          if (fi === 0) filterAge = opt.value;
          else if (fi === 1) filterGender = opt.value;
          else if (fi === 2) filterBudget = opt.value;
          else if (fi === 3) filterEnergy = opt.value;
          else if (fi === 4) filterBody = opt.value;
          answers.push({ filter: opt.value });
          currentQ++;
          if (currentQ >= TOTAL_QUESTIONS) {
            showPage('page-loading');
            setTimeout(showResult, 2000);
          } else {
            renderQuestion();
          }
        }, 180);
      };
      optionsEl.appendChild(btn);
    });
  }
}

// ===== 余弦相似度匹配算法 =====
function cosineSim(vecA, vecB) {
  let dot = 0, nA = 0, nB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dot += vecA[i] * vecB[i];
    nA += vecA[i] * vecA[i];
    nB += vecB[i] * vecB[i];
  }
  if (nA === 0 || nB === 0) return 0;
  return dot / (Math.sqrt(nA) * Math.sqrt(nB));
}

function matchEnergy(carEnergy, userEnergy) {
  if (userEnergy === '都可以') return true;
  if (userEnergy === '插混/增程') return carEnergy === '插混' || carEnergy === '增程';
  return carEnergy === userEnergy;
}

function matchBody(carBody, userBody) {
  return userBody === '都行' || carBody === userBody;
}

function weightedPreferenceScore(userVec, targetVec) {
  const total = userVec.reduce((sum, value) => sum + value, 0);
  if (!total) return 0;
  return userVec.reduce((sum, value, index) => {
    return sum + ((value / total) * ((targetVec[index] || 0) / 10));
  }, 0);
}

function budgetFitScore(carTier, userTier) {
  const dist = Math.abs(carTier - userTier);
  if (dist === 0) return 0.12;
  if (dist === 1) return -0.05;
  return -0.24 - ((dist - 2) * 0.08);
}

function energyFitScore(carEnergy, userEnergy) {
  if (userEnergy === '都可以') return 0.03;
  return matchEnergy(carEnergy, userEnergy) ? 0.08 : -0.22;
}

function bodyFitScore(carBody, userBody) {
  if (userBody === '都行') return 0.03;
  return carBody === userBody ? 0.08 : -0.18;
}

// ===== 年龄适配分 =====
function ageFitScore(car, userAge) {
  if (!userAge || !car.age) return 0;
  const ageKeys = { 1: 'young', 2: 'prime', 3: 'mid', 4: 'mature', 5: 'senior' };
  const key = ageKeys[userAge];
  const score = (car.age[key] || 5) / 10; // 0-1
  // 映射到 -0.12 ~ +0.12 的加减分
  return (score - 0.5) * 0.24;
}

// ===== 性别适配分 =====
function genderFitScore(car, userGender) {
  if (!userGender || !car.gender) return 0;
  const score = (car.gender[userGender] || 5) / 10; // 0-1
  // 映射到 -0.1 ~ +0.1 的加减分
  return (score - 0.5) * 0.20;
}

// ===== 市场热度加分 =====
function popularityBonus(car) {
  return ((car.pop || 5) / 10) * 0.08; // 0 ~ 0.08 加分，热门车微弱优势
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function getCandidatePool() {
  const exactPool = carDatabase.filter(car => matchEnergy(car.energy, filterEnergy) && matchBody(car.body, filterBody));
  if (exactPool.length) return { cars: exactPool, mode: 'exact' };

  const partialPool = carDatabase.filter(car => matchEnergy(car.energy, filterEnergy) || matchBody(car.body, filterBody));
  if (partialPool.length) return { cars: partialPool, mode: 'partial' };

  return { cars: carDatabase, mode: 'open' };
}

function computeResult() {
  const userVec = DIMS.map(d => userProfile[d] || 0);
  const userSignalVec = SIGNALS.map(s => userSignals[s] || 0);
  const topDims = getTopDims(3);
  const { cars, mode } = getCandidatePool();

  const scored = cars.map(car => {
    const carVec = DIMS.map(d => car.w[d] || 0);
    const carSignalVec = SIGNALS.map(s => (car.s && car.s[s]) || 0);
    const sim = cosineSim(userVec, carVec);
    const preferenceScore = weightedPreferenceScore(userVec, carVec);
    const signalScore = weightedPreferenceScore(userSignalVec, carSignalVec);
    const topDimBonus = topDims.reduce((sum, dim, index) => {
      const weight = [0.07, 0.05, 0.03][index] || 0;
      return sum + (((car.w[dim] || 0) / 10) * weight);
    }, 0);
    const fitScore =
      budgetFitScore(car.tier, filterBudget) +
      energyFitScore(car.energy, filterEnergy) +
      bodyFitScore(car.body, filterBody) +
      ageFitScore(car, filterAge) +
      genderFitScore(car, filterGender);

    const popBonus = popularityBonus(car);
    const finalScore = (sim * 0.36) + (preferenceScore * 0.28) + (signalScore * 0.12) + topDimBonus + fitScore + popBonus;
    return { car, sim, preferenceScore, signalScore, fitScore, finalScore };
  });

  scored.sort((a, b) => b.finalScore - a.finalScore);
  return { ranked: scored, poolMode: mode };
}

// ===== 获取用户 Top 维度 =====
function getTopDims(count = 2) {
  const sorted = DIMS.slice().sort((a, b) => (userProfile[b] || 0) - (userProfile[a] || 0));
  return sorted.slice(0, count);
}

function getTopSignal() {
  const sorted = SIGNALS.slice().sort((a, b) => (userSignals[b] || 0) - (userSignals[a] || 0));
  return sorted[0];
}

function getMatchedDims(car, count = 3) {
  return DIMS
    .map(dim => ({ dim, score: (userProfile[dim] || 0) * (car.w[dim] || 0) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map(item => dimLabels[item.dim]);
}

function buildPoolNotice(poolMode) {
  if (poolMode === 'exact') return '';
  if (poolMode === 'partial') return '你选的动力和车身在当前库里没有足够多的完全匹配项，这次优先保留了至少符合一项硬条件的车型。';
  return '你选的动力和车身在当前库里没有可直接匹配的车型，这次按人格画像给你找了最接近的方向。';
}

function buildBudgetNotice(car) {
  const dist = Math.abs(car.tier - filterBudget);
  if (dist === 0) return '';
  if (dist === 1) return '按你当前的筛选条件，预算上可能需要前后一档去看。';
  return '按你当前的筛选条件，预算区间里的可选车很少，这台已经是更接近你的方向。';
}

function buildResultSummary(best, runnerUp, topSignal, poolMode) {
  const parts = [];
  const poolNotice = buildPoolNotice(poolMode);
  const budgetNotice = buildBudgetNotice(best.car);
  const matchedDims = getMatchedDims(best.car);

  if (poolNotice) parts.push(poolNotice);
  if (budgetNotice) parts.push(budgetNotice);
  parts.push('这台车最贴你的点，是「' + matchedDims.join('、') + '」。');

  if ((userSignals[topSignal] || 0) > 0) {
    parts.push('同时你对「' + signalLabels[topSignal] + '」路线的偏好，也把它明显推到了前面。');
  }

  if (runnerUp && (best.finalScore - runnerUp.finalScore) < 0.04) {
    parts.push('不过第一名和第二名非常接近，说明你的偏好其实横跨两种车型路线。');
  }

  return parts.join('');
}

// ===== 显示结果 =====
function showResult() {
  const { ranked, poolMode } = computeResult();
  const best = ranked[0];
  const alts = ranked.slice(1, 4);
  const car = best.car;

  const [dim1, dim2] = getTopDims();
  const topSignal = getTopSignal();
  const typeName = dimLabels[dim1] + dimLabels[dim2] + '型';
  const meta = dimMeta[dim1];
  const summaryText = buildResultSummary(best, ranked[1], topSignal, poolMode);

  // 匹配度：72-96%
  const gapPenalty = ranked[1] && (best.finalScore - ranked[1].finalScore) < 0.04 ? 3 : 0;
  const poolPenalty = poolMode === 'exact' ? 0 : (poolMode === 'partial' ? 4 : 7);
  const matchPct = clamp(
    Math.round(72 + (clamp(best.finalScore, 0, 1.15) / 1.15) * 24 - poolPenalty - gapPenalty),
    68,
    96
  );

  document.getElementById('r-brand-logo').innerHTML = brandLogos[car.brand] || brandLogos['比亚迪'];
  document.getElementById('r-icon').innerHTML = iconSVGs[dim1] || iconSVGs.tech;
  document.getElementById('r-type').textContent = typeName;
  document.getElementById('r-car').textContent = car.name;
  document.getElementById('r-brand').textContent = car.brand + ' · ' + car.energy + ' · ' + car.price;
  document.getElementById('r-price').textContent = car.price;
  document.getElementById('r-power').textContent = car.energy;
  document.getElementById('r-match').textContent = matchPct + '%';
  document.getElementById('r-slogan').textContent = '「' + meta.slogan + '」';
  document.getElementById('r-portrait').textContent = meta.portrait;
  document.getElementById('r-desc').textContent = summaryText + meta.desc;
  document.getElementById('r-more-title').textContent = poolMode === 'exact' ? '同条件下也适合你' : '相近路线也值得看';

  const tagsEl = document.getElementById('r-tags');
  tagsEl.innerHTML = '';
  car.tags.forEach(tag => {
    const span = document.createElement('span');
    span.className = 'r-tag';
    span.textContent = tag;
    tagsEl.appendChild(span);
  });

  const moreEl = document.getElementById('r-more');
  moreEl.innerHTML = '';
  alts.forEach(a => {
    const c = a.car;
    const div = document.createElement('div');
    div.className = 'r-alt';
    const altLogo = brandLogos[c.brand] || brandLogos['比亚迪'];
    div.innerHTML = '<div class="r-alt-left"><div class="r-alt-logo">' + altLogo + '</div><div><div class="r-alt-name">' + c.name + '</div><div class="r-alt-info">' + c.energy + ' · ' + c.body + '</div></div></div><div class="r-alt-price">' + c.price + '</div>';
    moreEl.appendChild(div);
  });

  showPage('page-result');
}

function restart() { showPage('page-start'); }
