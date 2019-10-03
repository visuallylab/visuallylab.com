interface IData<T> {
  data: T;
  goal: {
    more: boolean;
    value: number;
  };
}

type TGreenData = {
  wind: number;
  solar: number;
  hydro: number;
  coGen: number;
};

type TFireData = {
  oil: number;
  coal: number;
  lng: number;
};

type TNuclearData = {
  nuclear1: number;
  nuclear2: number;
};

type TEnergy = {
  green: IData<TGreenData>;
  fire: IData<TFireData>;
  nuclear: IData<TNuclearData>;
};

type TEnergyData = {
  hour: number;
  minute: number;
  sec: number;
  energy: TEnergy;
  total: number;
  hourStr: string;
  minStr: string;
  secStr: string;
};

type TUsageData = {
  hour: number;
  minute: number;
  sec: number;
  hourStr: string;
  minStr: string;
  secStr: string;
  useValue: number;
  estimatedHigh: number;
  maxProvide: number;
  backupCapacity: number;
};
