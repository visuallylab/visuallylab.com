// it is a memory cache, for demo, record the system info

export enum SystemPage {
  Traffic = 'TRAFFIC',
  Electricity = 'ELECTRICITY',
  Home = 'HOME',
}

export enum NotifyEventType {
  // Traffic
  TrafficJam,
  TrafficJamDetail,
  TrafficSuggestion,
  FocusTrafficJam,

  // Electricity
  LowBackupStatus,
}

type TNotification = {
  action: () => void;
  cancel?: () => void;
};

const systemStatus: {
  type: NotifyEventType | '';
  page: SystemPage;
  notifications: TNotification[];
} = {
  type: '',
  page: SystemPage.Home,
  notifications: [],
};

export default systemStatus;
