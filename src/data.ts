import { Category } from './types';

// ==========================================
// 1. 视频文件导入 (videos 文件夹)
// ==========================================
import haoshiVideo from '../assets/videos/haoshi.mp4';       // 豪士面包
import jinglingVideo from '../assets/videos/jingling.mp4';   // 奇遇(精灵)
import mouseVideo from '../assets/videos/mouse.mp4';         // 方寸之间(鼠标)
import xyVideo from '../assets/videos/xy.mp4';               // 开业视频/或其他视频
import yanyuanVideo from '../assets/videos/yanyuan.mp4';     // 演员/或其他视频

// ==========================================
// 2. 图片与混合文件导入 (pictures 文件夹)
// ==========================================
// 校园类 - 招生海报
import zhao1Img from '../assets/pictures/zhao1.jpg';
import zhao2Img from '../assets/pictures/zhao2.jpg';
import zhao3Img from '../assets/pictures/zhao3.jpg';

// 基地研学 - 折页宣传册
import brochureFront from '../assets/pictures/宣传册正.png';
import brochureBack from '../assets/pictures/宣传册反.png';

// 白参参IP - 展板
// ⚠️ 注意：根据你的截图，"展板1"后面有一个空格。代码里必须和文件名完全一致。
// 建议：最好在电脑里把文件名改成没有空格的 "展板1.jpg"，然后把下面的空格去掉，这样不容易报错。
import zhanban1Img from '../assets/pictures/展板1 .jpg';
import zhanban2Img from '../assets/pictures/展板2 .jpg';
import zhanban3Img from '../assets/pictures/展板3 .jpg';

// 校园类 - 诚信纸巾宣传图
import tissue1Img from '../assets/pictures/诚信纸巾宣传图1.jpg';
import tissue2Img from '../assets/pictures/诚信纸巾宣传图2.jpg';

// 存放在 pictures 文件夹里的视频文件
import hongbohuiVideo from '../assets/pictures/洪博会H5邀请函.mp4'; // 洪博会H5
import yanshiVideo from '../assets/pictures/演示视频.mp4';          // 演示视频


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
        title: '自制TVC广告片段 10s',
        subtitle: '商业映像创作',
        description: '由主创全流程独立掌镜与制作的10秒商业TVC广告片段。统筹导演、实拍、剪辑、合成及配音全项工作，使用索尼 zve10 设备进行高画质拍摄。',
        videoUrl:haoshiVideo,
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
        description: '独立制作。采用数字化后期合成技术，将幻想中的精灵角色无缝嫁接并沉浸式融入真实宿舍生活场景。',
        videoUrl:jinglingVideo,
        colors: {
          primary: '#3B5249',
          secondary: '#A2B59F',
          accent: '#476356'
        },
        details: [
          { label: '职位', value: '独立制作 (独立创作与后期合成)' }
        ]
      },
      {
        id: 'creative-c',
        title: '创意短视频《方寸之间》',
        subtitle: '鼠标成精出逃记',
        description: '独立制作。讲述办公桌方寸微观世界里“鼠标成精并出逃”的奇趣故事，以精准的物体运动规律与拟人化视效创意趣味呈现。',
        videoUrl:mouseVideo,
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
        subtitle: '温情人文纪实',
        description: '专业后期与画面剪辑。聚焦社区街区开业庆典盛况，通过轻快的节奏排布与温情的视听叙事拉近社区与人文日常的归属连接。',
        videoUrl:xyVideo,
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
        subtitle: '营销&预热',
        description: '游乐场盛大开业，配合演员拍摄真人出镜。',
        videoUrl:yanyuanVideo,
        colors: {
          primary: '#3B5249',
          secondary: '#8D7A68',
          accent: '#D2DBCE'
        },
        details: [
          { label: '服务包含', value: '节奏卡位剪辑 / 文字动画 / 专业校色' }
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
        subtitle: '三张竖版海报',
        description: '原创长白山吉祥物人设视觉。将传统白人参设计进行拟人重塑，定制白参参IP形象。海报包含三张成套竖版平面视觉系统展现。',
        images: [
          zhanban1Img,
          zhanban2Img,
          zhanban3Img
        ],
        colors: {
          primary: '#5B6B56',
          secondary: '#C2B29F',
          accent: '#3B5249'
        },
        details: [
          { label: '企划包含', value: '白参参精品IP设定 / 三张竖版平面海报' }
        ]
      },
      {
        id: 'graphic-b',
        title: '基地研学折页手册设计',
        subtitle: '两张横板超长矢量文件',
        description: '为研学基地量身定制的折页手册，全套排版输出为两张横板高精度一体超长矢量图稿件。',
        images: [
          brochureFront,
          brochureBack
        ],
        colors: {
          primary: '#8D7A68',
          secondary: '#C2B29F',
          accent: '#899679'
        },
        details: [
          { label: '图稿尺寸', value: '横式全通栏大片结构排版' }
        ]
      },
      {
        id: 'graphic-c',
        title: '中国第二届（南昌）洪博会H5页面设计',
        subtitle: 'H5',
        description: '南昌洪博会盛世数字化展陈页面，采用高精度滑动融媒体布局打造。附带高帧率竖版视频一站演示实况流畅翻页与页面视觉结构。',
        videoUrl: hongbohuiVideo,
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
        description: '全套高定校园视觉包。精简拆分为：一部动态多媒体微宣传H5（以竖版视频呈现演示）；三张高逼格精品招生视觉主海报；以及两张干净雅致的诚信包装纸巾广告海报。',
        images: [
          zhao1Img,
          zhao2Img,
          zhao3Img,
          tissue1Img,
          tissue2Img
        ],
        videoUrl: yanshiVideo,
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
        description: 'AE视觉动画合集视频。整合多用途创意文字粒子渲染、动态图形变幻与空间摄像机巡游的高光镜头集锦。',
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
