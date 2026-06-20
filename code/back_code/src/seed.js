export const seedData = {
  schemaVersion: 1,
  recipes: [
    {
      id: "recipe-hongshao-rou",
      name: "家常红烧肉",
      type: "荤菜",
      coverPath: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&h=350&fit=crop&auto=format",
      status: "mastered",
      tags: ["拿手菜", "荤菜", "慢炖"],
      currentVersionId: "version-hongshao-rou-3",
      createdAt: "2026-04-01T09:20:00.000Z",
      updatedAt: "2026-06-15T12:00:00.000Z"
    },
    {
      id: "recipe-butter-shrimp",
      name: "蒜香黄油虾",
      type: "荤菜",
      coverPath: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=600&h=350&fit=crop&auto=format",
      status: "mastered",
      tags: ["快手菜", "海鲜", "宴客"],
      currentVersionId: "version-butter-shrimp-2",
      createdAt: "2026-04-20T09:20:00.000Z",
      updatedAt: "2026-06-10T12:00:00.000Z"
    },
    {
      id: "recipe-mapo-tofu",
      name: "麻婆豆腐",
      type: "素菜",
      coverPath: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&h=350&fit=crop&auto=format",
      status: "learning",
      tags: ["学习中", "川味", "下饭"],
      currentVersionId: "version-mapo-tofu-2",
      createdAt: "2026-05-02T09:20:00.000Z",
      updatedAt: "2026-06-08T12:00:00.000Z"
    },
    {
      id: "recipe-fried-rice",
      name: "蛋炒饭",
      type: "主食",
      coverPath: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600&h=350&fit=crop&auto=format",
      status: "quick",
      tags: ["快手菜", "主食"],
      currentVersionId: "version-fried-rice-1",
      createdAt: "2026-03-20T09:20:00.000Z",
      updatedAt: "2026-06-18T12:00:00.000Z"
    },
    {
      id: "recipe-sweet-sour-ribs",
      name: "糖醋里脊",
      type: "荤菜",
      coverPath: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=600&h=350&fit=crop&auto=format",
      status: "challenge",
      tags: ["想攻克", "酸甜口", "荤菜"],
      currentVersionId: "version-sweet-sour-ribs-2",
      createdAt: "2026-05-12T09:20:00.000Z",
      updatedAt: "2026-06-12T12:00:00.000Z"
    }
  ],
  recipeVersions: [
    {
      id: "version-hongshao-rou-1",
      recipeId: "recipe-hongshao-rou",
      version: "v1",
      ingredients: [
        { name: "五花肉", amount: "500g" },
        { name: "生抽", amount: "2勺" },
        { name: "老抽", amount: "1勺" }
      ],
      steps: [
        { order: 1, text: "五花肉切块焯水，捞出擦干。" },
        { order: 2, text: "炒糖色后加入肉块翻炒。" },
        { order: 3, text: "加热水没过肉块，小火炖60分钟。" }
      ],
      videoUrl: "",
      createdAt: "2026-04-01T09:20:00.000Z"
    },
    {
      id: "version-hongshao-rou-2",
      recipeId: "recipe-hongshao-rou",
      version: "v2",
      ingredients: [
        { name: "五花肉", amount: "500g" },
        { name: "生抽", amount: "2勺" },
        { name: "老抽", amount: "半勺" },
        { name: "冰糖", amount: "25g" }
      ],
      steps: [
        { order: 1, text: "冷水下锅焯肉，加入姜片和料酒。" },
        { order: 2, text: "小火炒冰糖，保持琥珀色即可。" },
        { order: 3, text: "加热水小火炖75分钟，留少量汤汁。" }
      ],
      videoUrl: "",
      createdAt: "2026-05-10T09:20:00.000Z"
    },
    {
      id: "version-hongshao-rou-3",
      recipeId: "recipe-hongshao-rou",
      version: "v3",
      ingredients: [
        { name: "五花肉", amount: "500g" },
        { name: "生抽", amount: "2勺" },
        { name: "老抽", amount: "半勺" },
        { name: "冰糖", amount: "30g" },
        { name: "八角", amount: "2颗" },
        { name: "黄酒", amount: "3勺" }
      ],
      steps: [
        { order: 1, text: "五花肉冷水下锅，加入姜片和料酒，煮开后捞出擦干。" },
        { order: 2, text: "小火炒冰糖到琥珀色，放入五花肉翻炒上色。" },
        { order: 3, text: "加入生抽、老抽、黄酒和香料，加热水没过肉块。" },
        { order: 4, text: "小火炖80分钟，最后开盖收汁，尝咸淡后出锅。" }
      ],
      videoUrl: "https://www.bilibili.com/video/example",
      createdAt: "2026-06-15T09:20:00.000Z"
    },
    {
      id: "version-butter-shrimp-2",
      recipeId: "recipe-butter-shrimp",
      version: "v2",
      ingredients: [
        { name: "鲜虾", amount: "300g" },
        { name: "黄油", amount: "20g" },
        { name: "蒜末", amount: "2勺" }
      ],
      steps: [
        { order: 1, text: "虾剪须开背，擦干水分。" },
        { order: 2, text: "黄油融化后炒香蒜末。" },
        { order: 3, text: "虾煎到变色，撒黑胡椒和少量盐。" }
      ],
      videoUrl: "",
      createdAt: "2026-06-10T09:20:00.000Z"
    },
    {
      id: "version-mapo-tofu-2",
      recipeId: "recipe-mapo-tofu",
      version: "v2",
      ingredients: [
        { name: "豆腐", amount: "1盒" },
        { name: "郫县豆瓣酱", amount: "1勺" },
        { name: "牛肉末", amount: "80g" }
      ],
      steps: [
        { order: 1, text: "豆腐切块焯水去豆腥。" },
        { order: 2, text: "炒香牛肉末和豆瓣酱。" },
        { order: 3, text: "加入豆腐小火煮入味，勾薄芡。" }
      ],
      videoUrl: "",
      createdAt: "2026-06-08T09:20:00.000Z"
    },
    {
      id: "version-fried-rice-1",
      recipeId: "recipe-fried-rice",
      version: "v1",
      ingredients: [
        { name: "米饭", amount: "1碗" },
        { name: "鸡蛋", amount: "2个" },
        { name: "小葱", amount: "1把" }
      ],
      steps: [
        { order: 1, text: "鸡蛋打散，米饭提前打散。" },
        { order: 2, text: "先炒鸡蛋，再下米饭大火翻炒。" },
        { order: 3, text: "盐调味，出锅前撒葱花。" }
      ],
      videoUrl: "",
      createdAt: "2026-03-20T09:20:00.000Z"
    },
    {
      id: "version-sweet-sour-ribs-2",
      recipeId: "recipe-sweet-sour-ribs",
      version: "v2",
      ingredients: [
        { name: "里脊肉", amount: "400g" },
        { name: "番茄酱", amount: "3勺" },
        { name: "白醋", amount: "1勺" }
      ],
      steps: [
        { order: 1, text: "里脊切条，腌制后裹淀粉。" },
        { order: 2, text: "炸至定型后复炸。" },
        { order: 3, text: "调酸甜汁，快速翻裹出锅。" }
      ],
      videoUrl: "",
      createdAt: "2026-06-12T09:20:00.000Z"
    }
  ],
  cookLogs: [
    {
      id: "log-hongshao-rou-1",
      recipeId: "recipe-hongshao-rou",
      versionId: "version-hongshao-rou-1",
      logDate: "2026-05-10",
      isSuccess: false,
      scores: { color: 3, aroma: 3, taste: 4, texture: 3, fidelity: 3 },
      reason: "火太急，底部略焦。",
      notes: "下次减少老抽，收汁时不要离锅。",
      mediaPaths: [],
      createdAt: "2026-05-10T12:00:00.000Z"
    },
    {
      id: "log-hongshao-rou-5",
      recipeId: "recipe-hongshao-rou",
      versionId: "version-hongshao-rou-2",
      logDate: "2026-05-28",
      isSuccess: true,
      scores: { color: 4, aroma: 5, taste: 4, texture: 4, fidelity: 4 },
      reason: "老抽减半后颜色更清亮，小火更稳。",
      notes: "正式加入拿手菜墙。",
      mediaPaths: [],
      createdAt: "2026-05-28T12:00:00.000Z"
    },
    {
      id: "log-hongshao-rou-18",
      recipeId: "recipe-hongshao-rou",
      versionId: "version-hongshao-rou-3",
      logDate: "2026-06-15",
      isSuccess: true,
      scores: { color: 5, aroma: 5, taste: 5, texture: 5, fidelity: 4 },
      reason: "收汁时间刚好，肉皮软糯。",
      notes: "最后8分钟开盖收汁，口感最好。",
      mediaPaths: [],
      createdAt: "2026-06-15T12:00:00.000Z"
    },
    {
      id: "log-butter-shrimp-1",
      recipeId: "recipe-butter-shrimp",
      versionId: "version-butter-shrimp-2",
      logDate: "2026-06-10",
      isSuccess: true,
      scores: { color: 5, aroma: 5, taste: 4, texture: 4, fidelity: 5 },
      reason: "虾擦干后煎得更香，蒜末没有糊。",
      notes: "第一次请朋友吃饭，反馈不错。",
      mediaPaths: [],
      createdAt: "2026-06-10T12:00:00.000Z"
    },
    {
      id: "log-fried-rice-1",
      recipeId: "recipe-fried-rice",
      versionId: "version-fried-rice-1",
      logDate: "2026-06-18",
      isSuccess: true,
      scores: { color: 4, aroma: 4, taste: 4, texture: 5, fidelity: 4 },
      reason: "隔夜饭粒粒分明。",
      notes: "快手晚饭。",
      mediaPaths: [],
      createdAt: "2026-06-18T12:00:00.000Z"
    }
  ],
  inspirations: [
    {
      id: "inspiration-1",
      title: "复刻夜市铁板鱿鱼",
      content: "刷到的视频，重点是酱汁比例。",
      link: "https://www.douyin.com/video/example",
      source: "抖音视频",
      tag: "想尝试",
      isConverted: false,
      createdAt: "2026-06-18T10:00:00.000Z"
    },
    {
      id: "inspiration-2",
      title: "外婆的雪菜黄鱼汤",
      content: "家乡味，先记一句话。",
      link: "",
      source: "一句话灵感",
      tag: "家乡味",
      isConverted: false,
      createdAt: "2026-06-17T10:00:00.000Z"
    },
    {
      id: "inspiration-3",
      title: "番茄牛腩教程",
      content: "B站教程，周末整理。",
      link: "https://www.bilibili.com/video/example",
      source: "B站链接",
      tag: "待整理",
      isConverted: false,
      createdAt: "2026-06-16T10:00:00.000Z"
    }
  ],
  badges: [
    { code: "first_log", name: "初入江湖", note: "完成第一次下厨记录", unlockedAt: "2026-03-20T12:00:00.000Z" },
    { code: "review_master", name: "复盘达人", note: "累计写满20篇日记", unlockedAt: "2026-06-01T12:00:00.000Z" },
    { code: "three_success", name: "小有所成", note: "同一道菜成功3次", unlockedAt: "2026-05-28T12:00:00.000Z" }
  ],
  goals: [
    {
      id: "goal-1",
      title: "本周学会水煮肉片",
      targetCount: 1,
      currentCount: 0.7,
      isDone: false,
      createdAt: "2026-06-17T09:00:00.000Z"
    },
    {
      id: "goal-2",
      title: "一个月新增 5 道拿手菜",
      targetCount: 5,
      currentCount: 2,
      isDone: false,
      createdAt: "2026-06-01T09:00:00.000Z"
    }
  ],
  settings: {
    autoBackup: true,
    appLock: true,
    lastExportedAt: "2026-06-01T08:00:00.000Z"
  }
};
