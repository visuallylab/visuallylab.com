type TransporationItem = {
  delay: number;
  data: SelfUsedTransportation[];
};

type Transportation = {
  timestamp: number;
  latlng: number[];
  direction?: number;
  speed: number;
  vehicleId: string; // 車牌
};

type SelfUsedTransportation = {
  type: SelfUsedTransportationType;
  vehicleId: string;
} & Transportation;

type PublicTransportation = {
  capacity: number;
  ridership: number;
  capacityUtilization: number;
} & Transportation;
