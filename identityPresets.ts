import type { IdentityPreset } from '../types';

export const identityPresets: IdentityPreset[] = [
  {
    type: 'student',
    emoji: '🎓',
    label: '大学生',
    description: '兼顾学业通知与校园社交，不错过任何截止日期',
    tagline: '不错过截止日，不被闲聊淹没',
    presetRules: [
      {
        name: '学业紧急',
        keywords: ['截止', '考试', '辅导', '答辩', '签到'],
        targetPriority: 'red',
        scopeLimit: { enabled: false, senders: [], groups: [] },
        excludeWords: ['模拟考试'],
        isActive: true,
      },
      {
        name: '学习资料',
        keywords: ['课件', '笔记', '资料', '讲义', '复习'],
        targetPriority: 'blue',
        scopeLimit: { enabled: false, senders: [], groups: [] },
        excludeWords: [],
        isActive: true,
      },
    ],
  },
  {
    type: 'professional',
    emoji: '💼',
    label: '职场人',
    description: '聚焦老板与客户消息，过滤无关群聊和广告',
    tagline: '老板消息秒回，无关消息静默',
    presetRules: [
      {
        name: '工作紧急',
        keywords: ['老板', '客户', '合同', 'Deadline', '急', '加急', '审批'],
        targetPriority: 'red',
        scopeLimit: { enabled: false, senders: [], groups: [] },
        excludeWords: ['物资', '团购'],
        isActive: true,
      },
      {
        name: '工作参考',
        keywords: ['周报', '纪要', '复盘', 'OKR', 'KPI', '季度'],
        targetPriority: 'blue',
        scopeLimit: { enabled: false, senders: [], groups: [] },
        excludeWords: [],
        isActive: true,
      },
      {
        name: '轻松时刻',
        keywords: ['团建', '下午茶', '生日会', '聚餐'],
        targetPriority: 'yellow',
        scopeLimit: { enabled: false, senders: [], groups: [] },
        excludeWords: [],
        isActive: true,
      },
    ],
  },
  {
    type: 'learner',
    emoji: '📚',
    label: '终身学习者',
    description: '深度文章优先阅读，碎片化资讯自动过滤',
    tagline: '深度内容集中读，碎片信息不打扰',
    presetRules: [
      {
        name: '深度好文',
        keywords: ['深度', '推荐', '必读', '精选', '年度'],
        targetPriority: 'blue',
        scopeLimit: { enabled: false, senders: [], groups: [] },
        excludeWords: ['广告', '推广'],
        isActive: true,
      },
      {
        name: '课程提醒',
        keywords: ['课程', '直播', '讲座', '训练营'],
        targetPriority: 'yellow',
        scopeLimit: { enabled: false, senders: [], groups: [] },
        excludeWords: [],
        isActive: true,
      },
    ],
  },
  {
    type: 'creator',
    emoji: '🎨',
    label: '创作者',
    description: '追踪粉丝互动与平台动态，不错过合作机会',
    tagline: '合作机会优先，粉丝互动集中看',
    presetRules: [
      {
        name: '商业机会',
        keywords: ['合作', '商单', 'PR', '品牌', '报价'],
        targetPriority: 'red',
        scopeLimit: { enabled: false, senders: [], groups: [] },
        excludeWords: ['诈骗', '刷量'],
        isActive: true,
      },
      {
        name: '粉丝互动',
        keywords: ['评论', '粉丝', '点赞', '转发', '互动'],
        targetPriority: 'blue',
        scopeLimit: { enabled: false, senders: [], groups: [] },
        excludeWords: [],
        isActive: true,
      },
    ],
  },
  {
    type: 'minimalist',
    emoji: '🧘',
    label: '极简主义者',
    description: '极致降噪，仅最重要的信息才触发通知',
    tagline: '极致降噪，只留真正重要的',
    presetRules: [
      {
        name: '真正紧急',
        keywords: ['紧急', '重要', '立即', '务必'],
        targetPriority: 'red',
        scopeLimit: { enabled: false, senders: [], groups: [] },
        excludeWords: ['广告', '营销', '优惠'],
        isActive: true,
      },
    ],
  },
];

export function getPresetByType(type: string): IdentityPreset | undefined {
  return identityPresets.find((p) => p.type === type);
}
