export const UI_STATUS = {
  PLACEHOLDER: 'placeholder',
  PLANNED: 'planned',
  INACTIVE: 'inactive',
  OFFLINE: 'offline',
} as const;

export type UiStatus = (typeof UI_STATUS)[keyof typeof UI_STATUS];

export const UI_STATUS_LABELS: Record<UiStatus, string> = {
  placeholder: 'Placeholder',
  planned: 'Планируется позже',
  inactive: 'Отключено на этом этапе',
  offline: 'Не подключено',
};

export const UI_STATUS_BADGE_VARIANTS: Record<UiStatus, 'info' | 'warning' | 'neutral' | 'disabled'> = {
  placeholder: 'info',
  planned: 'neutral',
  inactive: 'disabled',
  offline: 'warning',
};
