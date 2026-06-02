import type { Message, PriorityColor } from '../types';

type MessageInput = Omit<Message, 'id'>;

const now = Date.now();
const HOUR = 3600000;
const DAY = 86400000;

/**
 * Pool of realistic mock messages for the simulator.
 * Timestamps are relative — they get Date.now() on injection.
 * Priorities are pre-assigned; these will be re-evaluated by the rule engine
 * when injected to simulate real rule processing.
 */
export const mockMessagePool: MessageInput[] = [
  // ===== RED — Urgent & Important =====
  {
    title: '老板：合同需要今天下班前签好',
    summary: '王总刚发消息，北京客户的合同需要今天18:00前完成签署并扫描回传。法务已经审过了最终版本，请尽快处理。',
    sourceType: 'browser_notification',
    sourceApp: '微信',
    priority: 'red',
    category: 'work',
    timestamp: now - 30 * 60000,
    sender: '王总',
    groupName: '核心工作群',
    originalLink: '',
    isRead: false,
    isMock: false,
  },
  {
    title: '辅导员通知：毕业论文提交截止日期',
    summary: '各位同学请注意，毕业论文最终版提交截止日期为6月10日17:00，逾期不予受理。请相互转告。',
    sourceType: 'browser_notification',
    sourceApp: '微信',
    priority: 'red',
    category: 'study',
    timestamp: now - 2 * HOUR,
    sender: '张辅导员',
    groupName: '2026届毕业生群',
    originalLink: '',
    isRead: false,
    isMock: false,
  },
  {
    title: '客户急电：服务器宕机需立即处理',
    summary: '李客户来电，生产环境API服务全部不可用。已经影响了200+终端用户，要求30分钟内恢复。这是本月第二次宕机。',
    sourceType: 'browser_notification',
    sourceApp: '钉钉',
    priority: 'red',
    category: 'work',
    timestamp: now - 3 * HOUR,
    sender: '李客户',
    groupName: '技术支持群',
    originalLink: '',
    isRead: true,
    isMock: false,
  },
  {
    title: '日程提醒：Q3预算评审会议（今天14:00）',
    summary: '您有一个日历事件即将开始：Q3预算评审会议。地点：A栋3楼302会议室。参会人：财务部全体、各事业部负责人。',
    sourceType: 'calendar',
    sourceApp: 'Google Calendar',
    priority: 'red',
    category: 'work',
    timestamp: now - 4 * HOUR,
    sender: '',
    groupName: '',
    originalLink: '',
    isRead: true,
    isMock: false,
  },

  // ===== BLUE — Important, Not Urgent =====
  {
    title: '少数派：深度解析 2026 年 AI 开发工具趋势',
    summary: '本文深度分析了2026年AI辅助开发工具的五大趋势，包括代码生成、智能调试、自动化测试等方向的最新进展。',
    sourceType: 'rss',
    sourceApp: '少数派',
    priority: 'blue',
    category: 'study',
    timestamp: now - 1 * HOUR,
    sender: '',
    groupName: '',
    originalLink: 'https://sspai.com/post/ai-tools-2026',
    isRead: false,
    isMock: false,
  },
  {
    title: '阮一峰：科技爱好者周刊第300期',
    summary: '本周话题：信息管理工具的进化史。从RSS到Newsletter再到AI摘要，我们获取信息的方式正在经历一场静默革命。',
    sourceType: 'rss',
    sourceApp: '阮一峰的网络日志',
    priority: 'blue',
    category: 'study',
    timestamp: now - 5 * HOUR,
    sender: '',
    groupName: '',
    originalLink: 'https://ruanyifeng.com/blog/2026/05/weekly-300.html',
    isRead: false,
    isMock: false,
  },
  {
    title: 'B站：UP主「影视飓风」发布了新视频',
    summary: '【深度】我们花了三个月时间测试了市面上所有手机稳定器，这是最终推荐榜单。含详细的对比数据和实拍样片。',
    sourceType: 'rss',
    sourceApp: 'B站',
    priority: 'blue',
    category: 'entertainment',
    timestamp: now - 6 * HOUR,
    sender: '影视飓风',
    groupName: '',
    originalLink: 'https://bilibili.com/video/example1',
    isRead: false,
    isMock: false,
  },
  {
    title: '邮箱：周报汇总 — 产品部门第22周工作总结',
    summary: '本周产品部门完成了用户调研、PRD评审、技术方案设计三个里程碑。下周启动MVP开发，预计4周完成。详见附件。',
    sourceType: 'email',
    sourceApp: 'Outlook',
    priority: 'blue',
    category: 'work',
    timestamp: now - 8 * HOUR,
    sender: 'product@company.com',
    groupName: '',
    originalLink: 'mailto:product@company.com',
    isRead: true,
    isMock: false,
  },
  {
    title: '知乎：如何建立个人知识管理体系？',
    summary: '高赞回答分享了从信息收集、整理、消化到输出的完整闭环流程，推荐了Notion、Obsidian、Readwise等工具组合。',
    sourceType: 'rss',
    sourceApp: '知乎',
    priority: 'blue',
    category: 'study',
    timestamp: now - 1 * DAY,
    sender: '',
    groupName: '',
    originalLink: 'https://zhihu.com/question/example',
    isRead: true,
    isMock: false,
  },
  {
    title: 'GitHub：你关注的仓库「FlowClear」发布了新版本',
    summary: 'v1.0.0-beta 发布了！新增双视图布局、规则引擎优化、模拟消息注入器等多项功能。查看完整 Changelog。',
    sourceType: 'rss',
    sourceApp: 'GitHub',
    priority: 'blue',
    category: 'system',
    timestamp: now - 1 * DAY,
    sender: '',
    groupName: '',
    originalLink: 'https://github.com/flowclear/flowclear/releases',
    isRead: false,
    isMock: false,
  },

  // ===== BLUE — simulation-enriched messages =====
  {
    title: 'Q3季度KPI复盘会议纪要已生成',
    summary: 'Q3季度KPI数据已汇总，整体达成率112%。其中产品线超额完成20%，建议安排周五前完成复盘会议。详细数据见附件。',
    sourceType: 'email',
    sourceApp: 'Outlook',
    priority: 'blue',
    category: 'work',
    timestamp: now - 2 * HOUR,
    sender: 'analytics@company.com',
    groupName: '',
    originalLink: 'mailto:analytics@company.com',
    isRead: false,
    isMock: false,
  },
  {
    title: '年度精选：2026年最值得阅读的10本产品思维书籍',
    summary: '年度精选推荐！从认知科学、用户体验到商业策略，这份书单涵盖了产品经理进阶必备的10本深度好书。建议收藏慢慢看。',
    sourceType: 'rss',
    sourceApp: '少数派',
    priority: 'blue',
    category: 'study',
    timestamp: now - 4 * HOUR,
    sender: '',
    groupName: '',
    originalLink: 'https://sspai.com/post/books-2026',
    isRead: false,
    isMock: false,
  },

  // ===== YELLOW — Urgent, Not Important =====
  {
    title: '同事：今天下午茶是奶茶，快来！',
    summary: '行政部准备了喜茶，放在茶水间了！！先到先得，芝芝莓莓和满杯红柚都有，限量的哦！',
    sourceType: 'browser_notification',
    sourceApp: '微信',
    priority: 'yellow',
    category: 'life',
    timestamp: now - 1 * HOUR,
    sender: '小明',
    groupName: '摸鱼小分队',
    originalLink: '',
    isRead: false,
    isMock: false,
  },
  {
    title: '钉钉：群聊「周末篮球局」有 15 条新消息',
    summary: '大家讨论这周六去哪打球，目前投票结果：奥体中心领先。小明说那边场地要提前三天预约，建议今天就定下来。',
    sourceType: 'browser_notification',
    sourceApp: '钉钉',
    priority: 'yellow',
    category: 'social',
    timestamp: now - 3 * HOUR,
    sender: '阿强',
    groupName: '周末篮球局',
    originalLink: '',
    isRead: false,
    isMock: false,
  },
  {
    title: 'B站：你订阅的直播间开播了',
    summary: '老番茄正在直播「艾尔登法环」DLC攻略实况，当前观众12890人。点击进入直播间。',
    sourceType: 'browser_notification',
    sourceApp: 'B站',
    priority: 'yellow',
    category: 'entertainment',
    timestamp: now - 4 * HOUR,
    sender: '老番茄',
    groupName: '',
    originalLink: 'https://live.bilibili.com/example',
    isRead: true,
    isMock: false,
  },
  {
    title: '邮箱：您的云存储空间即将用完',
    summary: '尊敬的用户，您的云存储空间已使用85%（剩余约2.3GB）。建议清理大文件或升级至Pro套餐获得200GB空间。',
    sourceType: 'email',
    sourceApp: 'Gmail',
    priority: 'yellow',
    category: 'system',
    timestamp: now - 1 * DAY,
    sender: 'noreply@cloud.com',
    groupName: '',
    originalLink: '',
    isRead: true,
    isMock: false,
  },
  {
    title: '下周二直播讲座预告：AI时代如何提升个人效能',
    summary: '特邀嘉宾分享AI工具在工作流中的实战经验，涵盖ChatGPT高阶用法、自动化脚本、知识管理三大板块。点击预约直播。',
    sourceType: 'browser_notification',
    sourceApp: '钉钉',
    priority: 'yellow',
    category: 'study',
    timestamp: now - 5 * HOUR,
    sender: '培训部',
    groupName: '全员学习群',
    originalLink: '',
    isRead: false,
    isMock: false,
  },
  {
    title: '预告：五一假期团建活动方案投票',
    summary: 'HR发了三个团建方案：1. 黄山徒步 2. 千岛湖骑行 3. 安吉露营。请大家在周五前投票选择最喜欢的方案。',
    sourceType: 'browser_notification',
    sourceApp: '微信',
    priority: 'yellow',
    category: 'social',
    timestamp: now - 1 * DAY,
    sender: 'HR小王',
    groupName: '全体员工群',
    originalLink: '',
    isRead: true,
    isMock: false,
  },

  // ===== GRAY — Not Urgent & Not Important =====
  {
    title: '淘宝：您关注的店铺上新了',
    summary: '「优衣库官方旗舰店」2026夏季新款已上架！限时满300减50，AIRism科技面料清凉一夏。去看看有什么新款吧。',
    sourceType: 'browser_notification',
    sourceApp: '淘宝',
    priority: 'gray',
    category: 'shopping',
    timestamp: now - 30 * 60000,
    sender: '',
    groupName: '',
    originalLink: 'https://taobao.com/example',
    isRead: false,
    isMock: false,
  },
  {
    title: '微信：群聊「老同学聚会」有 42 条新消息',
    summary: '大家在聊最近的工作和家庭情况。刘强说他刚跳槽去了字节，张敏在晒她家新养的柯基。气氛十分活跃。',
    sourceType: 'browser_notification',
    sourceApp: '微信',
    priority: 'gray',
    category: 'social',
    timestamp: now - 1 * HOUR,
    sender: '刘强',
    groupName: '老同学聚会群',
    originalLink: '',
    isRead: false,
    isMock: false,
  },
  {
    title: '微博：今天的热搜话题 #某明星官宣恋情#',
    summary: '该话题阅读量已破10亿，讨论量超500万。网友纷纷送上祝福，相关表情包正在快速传播。',
    sourceType: 'browser_notification',
    sourceApp: '微博',
    priority: 'gray',
    category: 'entertainment',
    timestamp: now - 2 * HOUR,
    sender: '',
    groupName: '',
    originalLink: 'https://weibo.com/trending/example',
    isRead: false,
    isMock: false,
  },
  {
    title: '知乎：你收到了一条新回答邀请',
    summary: '「如何看待2026年AI取代初级程序员的现象？」邀请你来回答。目前已有328个回答，最高赞5600。',
    sourceType: 'browser_notification',
    sourceApp: '知乎',
    priority: 'gray',
    category: 'social',
    timestamp: now - 5 * HOUR,
    sender: '',
    groupName: '',
    originalLink: 'https://zhihu.com/question/invite',
    isRead: true,
    isMock: false,
  },
  {
    title: '支付宝：您有一笔 36.50 元的消费',
    summary: '交易提醒：2026年5月28日 12:35 在「瑞幸咖啡（科技园店）」消费36.50元。当前余额：2,847.32元。',
    sourceType: 'browser_notification',
    sourceApp: '支付宝',
    priority: 'gray',
    category: 'finance',
    timestamp: now - 6 * HOUR,
    sender: '',
    groupName: '',
    originalLink: '',
    isRead: true,
    isMock: false,
  },
  {
    title: '邮箱：每周精选商品推荐',
    summary: '根据您的浏览历史，为您精选了本周最值得购买的商品：降噪耳机、机械键盘、人体工学椅、便携显示器。',
    sourceType: 'email',
    sourceApp: 'Gmail',
    priority: 'gray',
    category: 'shopping',
    timestamp: now - 2 * DAY,
    sender: 'recommend@shopping.com',
    groupName: '',
    originalLink: '',
    isRead: true,
    isMock: false,
  },
  {
    title: '得到：今日学习打卡提醒',
    summary: '你已经连续学习5天了！今天还没有完成学习计划哦。已为你准备好今日推荐内容：《薛兆丰经济学讲义》第15讲。',
    sourceType: 'browser_notification',
    sourceApp: '得到',
    priority: 'gray',
    category: 'study',
    timestamp: now - 2 * DAY,
    sender: '',
    groupName: '',
    originalLink: '',
    isRead: true,
    isMock: false,
  },
  {
    title: '日历：同事生日提醒 — 陈小红 5月30日',
    summary: '三天后是同事陈小红的生日，你设置过提醒。上次团队给她准备了蛋糕，这次也可以提前准备一个小礼物。',
    sourceType: 'calendar',
    sourceApp: 'Google Calendar',
    priority: 'gray',
    category: 'life',
    timestamp: now - 2 * DAY,
    sender: '',
    groupName: '',
    originalLink: '',
    isRead: true,
    isMock: false,
  },
];

/**
 * Get a random message from the pool and return a copy with fresh timestamp.
 */
export function getRandomMockMessage(): MessageInput {
  const idx = Math.floor(Math.random() * mockMessagePool.length);
  const msg = mockMessagePool[idx];
  return {
    ...msg,
    timestamp: Date.now(),
    isRead: false,
  };
}

/**
 * Simulated message injection with controlled priority distribution.
 *
 * Distribution:
 *   red    ~8%   (重要紧急 — 最少)
 *   blue   ~22%  (重要不紧急)
 *   yellow ~30%  (紧急不重要)
 *   gray   ~40%  (不重要不紧急 — 最多)
 *
 * Picks a random message from the pool that has the target priority,
 * so message content stays realistic for its priority level.
 */
export function getSimulatedMessage(): MessageInput {
  const rand = Math.random();

  // Step 1: Determine target priority by distribution
  let target: PriorityColor;
  if (rand < 0.08) {
    target = 'red';
  } else if (rand < 0.30) {
    target = 'blue';
  } else if (rand < 0.60) {
    target = 'yellow';
  } else {
    target = 'gray';
  }

  // Step 2: Pick a random message with that priority
  const candidates = mockMessagePool.filter((m) => m.priority === target);
  const pool = candidates.length > 0 ? candidates : mockMessagePool;
  const idx = Math.floor(Math.random() * pool.length);
  const msg = pool[idx];

  return {
    ...msg,
    priority: target,
    timestamp: Date.now(),
    isRead: false,
    isMock: false,
  };
}
