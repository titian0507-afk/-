import { Category } from './types';

export const portfolioCategories: Category[] = [
  {
    id: 'creative-short-films',
    title: '创意短片',
    englishTitle: 'Creative Short Films',
    description: '独立编导与实景视觉创意，融合实拍、AIGC及数字镜头。',
    accentColor: '#3B5249',
    bgColor: '#E6EFE9',
    projects: [
      {
        id: 'creative-a',
        title: '豪士面包TVC广告片段 10s',
        subtitle: '自制广告影片创作',
        description: '由主创全流程独立掌镜与制作的10秒商业TVC广告片段。统筹导演、实拍、剪辑、合成及配音全项工作，设备：SONY zve-10。',
        videoUrl: haoshiVideo
        colors: {
          primary: '#807264',
          secondary: '#C2B29F',
          accent: '#7A624B'
        },
        details: [
          { label: '职位', value: '导演 / 拍摄 / 剪辑 / 合成 / 配音' },
          { label: '拍摄设备', value: '索尼 zve10' },
          { label: '片长时间', value: '10s 商业片段' }
        ]
      },
      {
        id: 'creative-b',
        title: 'AI实景合成短视频《奇遇》',
        subtitle: '宿舍中突然出现的精灵们',
        description: '独立制作。采用数字化后期合成技术，将精灵角色融入真实大学生活场景。',
        videoUrl: 'https://player.vimeo.com/external/432924355.sd.mp4?s=d7e7ee8e3d6f1df18f2edced16a3a4b9eeab26e4&profile_id=165&oauth2_token_id=57447761',
        colors: {
          primary: '#3B5249',
          secondary: '#A2B59F',
          accent: '#476356'
        },
        details: [
          { label: '职位', value: '独立制作' }
        ]
      },
      {
        id: 'creative-c',
        title: '创意短视频《方寸之间》',
        subtitle: '鼠标成精出逃记',
        description: '独立制作。讲述宿舍里“鼠标成精并出逃”的奇趣故事。',
        videoUrl: 'https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c022273eecaf26d6d45f3f0194883584&profile_id=139&oauth2_token_id=57447761',
        colors: {
          primary: '#5B6B56',
          secondary: '#A9B89E',
          accent: '#2C3E28'
        },
        details: [
          { label: '职位', value: '独立制作' }
        ]
      }
    ]
  },
  {
    id: 'post-production-editing',
    title: '后期与剪辑',
    englishTitle: 'Editing & Post-Production',
    description: '精确剪辑与声画工程，重组真实事件并彰显气势与质感。',
    accentColor: '#8D7A68',
    bgColor: '#FAF5EF',
    projects: [
      {
        id: 'edit-a',
        title: '社区开业视频',
        subtitle: '活动纪实',
        description: '聚焦社区党群服务中心开业庆典盛况，通过轻快的节奏排布与温情的视听叙事拉近社区与人文日常的归属连接。',
        videoUrl: 'https://player.vimeo.com/external/403061730.sd.mp4?s=d0db58ebd747514a4cbd9008bc59e7a898bd048a&profile_id=165&oauth2_token_id=57447761',
        colors: {
          primary: '#504136',
          secondary: '#C2B29F',
          accent: '#A68D75'
        },
        details: [
          { label: '服务包含', value: '后期剪辑 / 人文色调调色 / 声效混合' }
        ]
      },
      {
        id: 'edit-b',
        title: '场馆开业视频',
        subtitle: '游乐场活动预热',
        description: '配合真人出镜，拍摄并剪辑游乐场开业预热营销视频。',
        videoUrl: 'https://player.vimeo.com/external/409241517.sd.mp4?s=543419992bb1ff212df860ba329ecb7ca2c68f23&profile_id=165&oauth2_token_id=57447761',
        colors: {
          primary: '#3B5249',
          secondary: '#8D7A68',
          accent: '#D2DBCE'
        },
        details: [
          { label: '服务包含', value: '节奏卡位剪辑 / 字幕动画 / 专业校色' }
        ]
      }
    ]
  },
  {
    id: 'graphic-design',
    title: '平面与H5',
    englishTitle: 'Graphic & H5 Design',
    description: '精雕细琢的网格排版系统，连接实体纸页和移动端竖幅界面。',
    accentColor: '#A2B59F',
    bgColor: '#FAF9F6',
    projects: [
      {
        id: 'graphic-a',
        title: '白参参IP设计',
        subtitle: '展板',
        description: '原创长白山吉祥物。将传统白人参设计进行拟人重塑，定制白参参IP形象。海报包含三张成套竖版平面视觉系统展现。',
        images: [
          'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800&h=1200',
          'https://images.unsplash.com/photo-1618005198143-e5283b519a7f?auto=format&fit=crop&q=80&w=800&h=1200',
          'https://images.unsplash.com/photo-1604871000636-074fa5117945?auto=format&fit=crop&q=80&w=800&h=1200'
        ],
        colors: {
          primary: '#5B6B56',
          secondary: '#C2B29F',
          accent: '#3B5249'
        },
        details: [
          { label: '企划包含', value: '白参参精品IP设定 / 三张竖版展板' }
        ]
      },
      {
        id: 'graphic-b',
        title: '基地研学折页手册设计',
        subtitle: '双面10页手册，用于发放给参加基地研学的学生',
        description: '为研学基地量身定制的折页手册',
        images: [
          'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=1400&h=600',
          'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=1400&h=600'
        ],
        colors: {
          primary: '#8D7A68',
          secondary: '#C2B29F',
          accent: '#899679'
        },
        details: [
          { label: '图稿尺寸', value: '横式全通栏大片结构排版 (共两幅)' }
        ]
      },
      {
        id: 'graphic-c',
        title: '中国第二届（南昌）洪博会H5页面设计',
        subtitle: '竖版视频',
        description: '南昌洪博会盛世数字化展陈页面，采用高精度滑动融媒体布局打造。附带高帧率竖版视频一站演示实况流畅翻页与页面视觉结构。',
        videoUrl: 'https://player.vimeo.com/external/392271813.sd.mp4?s=d7fa30dd4320b92db21e06c1bd7b3e14440c9cf9&profile_id=165&oauth2_token_id=57447761',
        colors: {
          primary: '#859E81',
          secondary: '#D6C7B7',
          accent: '#A2B59F'
        },
        details: [
          { label: '页面演示', value: '精美融媒体翻页、动态加载动画与排版结构剖析' }
        ]
      },
      {
        id: 'graphic-d',
        title: '校园类',
        subtitle: '分为H5（竖版视频）, 招生海报（3张竖版海报），诚信纸巾海报（2张竖版海报）',
        description: '全套高定校园视觉包。包含动态多媒体微宣传H5；三张招生视觉主海报；以及两张诚信包装纸巾广告海报。',
        images: [
          'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=600&h=900',
          'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=600&h=900',
          'https://images.unsplash.com/photo-1498243691581-b145c3f54a91?auto=format&fit=crop&q=80&w=600&h=900',
          'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600&h=900',
          'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=600&h=900'
        ],
        videoUrl: 'https://player.vimeo.com/external/403061730.sd.mp4?s=d0db58ebd747514a4cbd9008bc59e7a898bd048a&profile_id=165&oauth2_token_id=57447761',
        colors: {
          primary: '#3B5249',
          secondary: '#C2B29F',
          accent: '#5E6B56'
        },
        details: [
          { label: '项目包含', value: 'H5页面、3张招生海报、2张诚信纸巾海报' }
        ]
      },
      {
        id: 'graphic-e',
        title: 'AE合集（视频）',
        subtitle: '动态图形集',
        description: 'AE视觉动画合集视频。',
        videoUrl: 'https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c022273eecaf26d6d45f3f0194883584&profile_id=139&oauth2_token_id=57447761',
        colors: {
          primary: '#5D574F',
          secondary: '#A2B59F',
          accent: '#E5EAD9'
        },
        details: [
          { label: '核心工具', value: 'Adobe After Effects 视频动效合成' }
        ]
      }
    ]
  }
];
