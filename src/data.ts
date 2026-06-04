import { Category } from './types';

export const portfolioCategories: Category[] = [
  {
    id: 'creative-short-films',
    title: '创意短片',
    englishTitle: 'Creative Short Films',
    description: '通过独特的镜头语言与视觉合成，探索商业叙事与创意的极限表达。',
    accentColor: '#3B5249', // Deep Forest Moss
    bgColor: '#E6EFE9',     // Very pale sage green
    projects: [
      {
        id: 'film-a',
        title: '【实拍+合成】豪士面包 TVC 30s',
        subtitle: '融化清晨：豪士暖阳面包商业广告',
        description: '该片将实拍的面包质感与三维暖金色调宏观粒子结合。通过流体动力学合成，将面粉纷飞和牛油融化的微观瞬间，渲染为如朝霞般绚烂的视觉盛宴，传递“有温度的早餐伴侣”核心理念。',
        videoUrl: 'https://player.vimeo.com/external/432924355.sd.mp4?s=d7e7ee8e3d6f1df18f2edced16a3a4b9eeab26e4&profile_id=165&oauth2_token_id=57447761', // High-quality coffee and baking slow-motion
        externalUrl: 'https://vimeo.com/432924355',
        colors: {
          primary: '#8D7A68',
          secondary: '#C2B29F',
          accent: '#7A624B'
        },
        details: [
          { label: '职位', value: '导演 / 后期合成监制' },
          { label: '拍摄设备', value: 'RED V-Raptor / Laowa 24mm Probe' },
          { label: '合成软件', value: 'Davinci Resolve / Nuke / Houdini' },
          { label: '投放渠道', value: '全国分众电梯电视 / 线上官方社媒' }
        ]
      },
      {
        id: 'film-b',
        title: '【实拍+合成】三福 TVC 16s',
        subtitle: '寻找多面自我：三福新青年夏日国潮记',
        description: '短促、强节奏、极具冲击力的视觉快剪。结合实拍国潮穿搭与故障风赛博合成视觉，用16秒的极限篇幅诠释“随心搭配，自成一格”的潮流主张。通过不规则的色块拼接与重影转场，展现少年的不羁态度。',
        videoUrl: 'https://player.vimeo.com/external/384761655.sd.mp4?s=3828efb040f7b189d5c12f409999f8d97e68b002&profile_id=165&oauth2_token_id=57447761', // Stylish fast model runway/portrait shots
        externalUrl: 'https://vimeo.com/384761655',
        colors: {
          primary: '#3B5249',
          secondary: '#A2B59F',
          accent: '#476356'
        },
        details: [
          { label: '职位', value: '视觉指导 / 剪辑与特效合成' },
          { label: '核心手法', value: '分屏排版 / 故障艺术合成 / 动态追焦' },
          { label: '制作周期', value: '14 天' }
        ]
      },
      {
        id: 'film-c',
        title: '【AIGC】品牌叙事片《心田 The Source》',
        subtitle: '万物滋养，生生不息：大地品牌诗意视觉呈现',
        description: '探索 AIGC 图像生成与流体动效的叙事深度。以中国云贵梯田为视觉母题，生成烟雨朦胧的叠翠层峦，再利用人工智能深度扩散模型，模拟云雾凝聚成甘露、浸润梯田稻谷的有机生命进程。展现出一幅高雅的东方大地交响卷轴。',
        videoUrl: 'https://player.vimeo.com/external/372545938.sd.mp4?s=319a91cfa6ae57c4c3e80b8529f8c6df3f27ae2e&profile_id=139&oauth2_token_id=57447761', // Misty green nature rivers and green hills
        externalUrl: 'https://vimeo.com/372545938',
        colors: {
          primary: '#5B6B56',
          secondary: '#A9B89E',
          accent: '#2C3E28'
        },
        details: [
          { label: '职位', value: 'AI 美术指导 / 剪辑与声效合成' },
          { label: '技术流程', value: 'Midjourney v6 / Runway Gen-2 / Premiere' },
          { label: '设计美学', value: '东方极简 / 水墨意境与三维立体交透' }
        ]
      },
      {
        id: 'film-d',
        title: '【MG动画】梯田视觉动态呈现 30s',
        subtitle: '大地波纹：抽象梯田地理流线视觉交互',
        description: '纯向量美学与流畅物理运动的视觉对话。通过波纹、线条和等高线的起伏演变，将大自然鬼斧神工的梯田重塑为极简抽象几何运动。片中完美的正弦波流体形变与欢快的原声打击乐合拍，为本网站提供概念源泉。',
        videoUrl: 'https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c022273eecaf26d6d45f3f0194883584&profile_id=139&oauth2_token_id=57447761', // Abstract organic natural pattern flowing smoothly
        externalUrl: 'https://vimeo.com/371433846',
        colors: {
          primary: '#776555',
          secondary: '#C2B29F',
          accent: '#5E4E3F'
        },
        details: [
          { label: '职位', value: '独立动态摄影 / 动效设计师' },
          { label: '动画手法', value: '路径演变 / 弹性运动表达式 / 立体折纸透视' },
          { label: '帧率', value: '60 FPS' }
        ]
      }
    ]
  },
  {
    id: 'post-production-editing',
    title: '后期与剪辑',
    englishTitle: 'Editing & Color',
    description: '重组时空，用色调和节奏赋予镜头灵魂、叙事张力与情感回响。',
    accentColor: '#8D7A68', // Muted brown
    bgColor: '#FAF5EF',     // Warm textured cream white
    projects: [
      {
        id: 'edit-a',
        title: '自媒体短视频剪辑与节奏美学',
        subtitle: '信息洪流中的留白与重音',
        description: '针对当下碎片化、高密度传播的自媒体生态，独创平衡卡点与内容留白的新节奏。摒弃无意义的纯技巧堆叠，运用巧妙的心流音效设计、分屏快切与文字动效，在3秒内抓取眼球的同时流露高级的人文关怀。',
        videoUrl: 'https://player.vimeo.com/external/403061730.sd.mp4?s=d0db58ebd747514a4cbd9008bc59e7a898bd048a&profile_id=165&oauth2_token_id=57447761', // High quality cooking, nature cutting, traveling edit
        externalUrl: 'https://vimeo.com/403061730',
        colors: {
          primary: '#504136',
          secondary: '#C2B29F',
          accent: '#A68D75'
        },
        details: [
          { label: '工作流', value: '脚本提炼 -> 粗剪韵律定位 -> 动态图形嵌入 -> 高频声效工程' },
          { label: '软剪应用', value: 'Premiere / After Effects / Sound Forge' },
          { label: '最高播放', value: '单全网 100W+ 曝光' }
        ]
      },
      {
        id: 'edit-b',
        title: '调色与纪实叙事作品对比拆解',
        subtitle: '还原情绪深处的真实色彩弧光',
        description: '这是一组专业的调色（DIT Color Grading）深度解构作品。展示了纪实叙事、野外求索类风格从初始相机 RAW（Log/灰色调）到最终电影级别色系塑造的过程。以中灰调莫兰迪大地色为基础，重构高光温度与阴影深度。',
        videoUrl: 'https://player.vimeo.com/external/409241517.sd.mp4?s=543419992bb1ff212df860ba329ecb7ca2c68f23&profile_id=165&oauth2_token_id=57447761', // Beautiful landscape mountain scenery (perfect for RAW vs Graded demo)
        externalUrl: 'https://vimeo.com/409241517',
        isColorGrade: true,
        // Using sample links for before/after demo in interactive slider
        rawImageUrl: 'https://images.unsplash.com/photo-1518098268026-4e43a1a009de?auto=format&fit=crop&q=40&w=1200&sat=-100&contrast=80&blur=2', // Simulates RAW/Log foggy look
        gradedImageUrl: 'https://images.unsplash.com/photo-1518098268026-4e43a1a009de?auto=format&fit=crop&q=80&w=1200', // Beautiful warm graded output
        colors: {
          primary: '#3B5249',
          secondary: '#8D7A68',
          accent: '#D2DBCE'
        },
        details: [
          { label: '监看系统', value: 'FSI AM211 Reference Monitor' },
          { label: '调色软件', value: 'DaVinci Resolve Studio 18.6' },
          { label: '色彩空间', value: 'DaVinci YRGB Color Managed (ACES cc Target)' },
          { label: '风格特征', value: '复古低反差 / 莫兰迪自然绿与焦赭阴影对比 / 暖柔光颗粒' }
        ]
      }
    ]
  },
  {
    id: 'graphic-design',
    title: '平面包装与IP',
    englishTitle: 'Graphic & IP Design',
    description: '融于自然的泥土与茶叶，在极简排版中触及品牌温度与人格印记。',
    accentColor: '#A2B59F', // Muted sage green
    bgColor: '#FAF9F6',     // Off-white paper background
    projects: [
      {
        id: 'graphic-a',
        title: '闰土的茶 - 品牌包装设计',
        subtitle: '层层回甘，大地寄信给岁月的茶礼',
        description: '“闰土的茶”是一个返璞归真的乡村高端原叶茶品牌。设计理念源自“云雾梯田层层跌宕”。外盒材质选用可再生的手揉糙浆卡纸，表面印有精致起鼓压凹的梯田地理等高线条。盒体打开后呈层级翻叠，正如梯田重峦，呈现出极致的仪式感。',
        images: [
          'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=800', // Green tea and teapot steaming
          'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&q=80&w=800'  // Elegant organic cups/matcha style
        ],
        colors: {
          primary: '#5B6B56',
          secondary: '#C2B29F',
          accent: '#3B5249'
        },
        details: [
          { label: '服务内容', value: '品牌标志 / 原生褶皱礼盒 / 等高线辅助图形设计' },
          { label: '工艺标准', value: '大豆环保墨印刷 / 亚光大面积击凸 / 枯草纤维再生纸' },
          { label: '设计美学', value: '不规则留白 / Wabi-Sabi 侘寂风 / 粗陶大地色系' }
        ]
      },
      {
        id: 'graphic-b',
        title: '白参参 - IP形象品牌化设计',
        subtitle: '萌化森林深处的天然治愈精灵',
        description: '“白参参”是以长白山优质白人参为原型的文创IP。设计师摒弃复杂修饰，提取其须根化为头頂舒展的绿叶与萌动姿态。极简圆弧身体搭配豆子眼，将珍稀草药的古板传统面孔，重构为充满现代疗愈感的可读性角色。衍生玩具包装亦巧妙仿造覆土埋藏开合结构。',
        images: [
          'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800', // Organic roots, botanical
          'https://images.unsplash.com/photo-1513530534585-c7b1394c6d51?auto=format&fit=crop&q=80&w=800'  // Elegant minimalist studio object mockup
        ],
        colors: {
          primary: '#859E81',
          secondary: '#D6C7B7',
          accent: '#A2B59F'
        },
        details: [
          { label: '服务内容', value: 'IP 三视图形象设计 / 表情包延展 / 潮玩包装打样' },
          { label: '软件平台', value: 'Blender 3D Render / Illustrator' },
          { label: '客群定位', value: '一二线都市疗愈消费群 / 潮玩收集者' }
        ]
      }
    ]
  }
];
