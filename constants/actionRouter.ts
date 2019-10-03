// actionRouter
export enum ActionType {
  Show = 'SHOW', // 顯示、跳轉
  Compare = 'COMPARE', // 比較
  Find = 'FIND', // 針對已選定好的 data 做操作
  Focus = 'FOCUS', // 針對已選定好的 data 做操作，傳入所需的 extraProps
  Export = 'EXPORT', // 輸出
}

export enum TemplateType {
  // General
  Realtime = 'REALTIME',
  Statistics = 'STATISTICS',
  StatisticsDetail = 'STATISTICS_DETAIL',

  // Specific
  T_Realtime = 'T_REALTIME',
  T_Statistics = 'T_STATISTICS',
  E_Realtime = 'E_REALTIME',
  E_Statistics = 'E_STATISTICS',
  Home = 'HOME',
}

export enum FocusStatus {
  Minimum = 'MINIMUM',
  Max = 'MAX',
}

export enum DataType {
  // Electricity
  E_BackupCapacity = 'E_BACKUPCAPACITY',
  E_TransferValue = 'E_TRANSFER_VALUE',
  E_GeneratedValue = 'E_GENERATED_VALUE',
  E_UsageRatio = 'E_USAGE_RATIO',
  E_MaxValue = 'E_MAX_VALUE',
  E_EstimateMaxValue = 'E_ESTIMATE_MAX_VALUE',
}
