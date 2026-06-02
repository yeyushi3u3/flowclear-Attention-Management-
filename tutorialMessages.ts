import type { Message } from '../types';

type MessageInput = Omit<Message, 'id'>;

export const tutorialMessages: MessageInput[] = [
  {
    title: '【演示】紧急提醒：项目截止日期即将到来',
    summary:
      '您的项目"Q2市场分析报告"截止日期为2026年6月15日，请及时提交。这是静流的红色紧急通知演示，仅此类重要消息会触发即时提醒。',
    sourceType: 'browser_notification',
    sourceApp: '钉钉',
    priority: 'red',
    category: 'work',
    timestamp: Date.now() - 60000,
    sender: '静流助手',
    groupName: '',
    originalLink: '',
    isRead: false,
    isMock: true,
  },
  {
    title: '【演示】深度好文推荐：信息爆炸时代如何保持专注力？',
    summary:
      '本文探讨了在日均接收80+条通知的环境下，如何通过认知负荷理论优化信息摄入策略。建议安排时间集中阅读，标记为蓝色（重要不紧急）。',
    sourceType: 'rss',
    sourceApp: '少数派',
    priority: 'blue',
    category: 'study',
    timestamp: Date.now() - 120000,
    sender: '静流助手',
    groupName: '',
    originalLink: 'https://sspai.com/post/example',
    isRead: false,
    isMock: true,
  },
  {
    title: '【演示】系统更新通知：静流 V1.0 版本已就绪',
    summary:
      '欢迎使用静流 FlowClear！当前版本 V1.0 已成功部署。请点击右上角"切换视图"按钮，体验看板与时间轴两种信息组织方式。',
    sourceType: 'browser_notification',
    sourceApp: '系统',
    priority: 'gray',
    category: 'system',
    timestamp: Date.now() - 180000,
    sender: '静流助手',
    groupName: '',
    originalLink: '',
    isRead: false,
    isMock: true,
  },
];
