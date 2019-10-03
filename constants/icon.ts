import { IconType } from 'react-icons/lib/cjs';
import {
  GiWindTurbine,
  GiWaterfall,
  GiTeslaCoil,
  GiOilPump,
  GiCoalWagon,
  GiFluffyTrefoil,
  GiNuclear,
} from 'react-icons/gi';
import { WiSolarEclipse } from 'react-icons/wi';
import { FaLeaf, FaFireAlt } from 'react-icons/fa';
import {
  IoIosNuclear,
  IoMdWarning,
  IoMdAlert,
  IoMdInformationCircle,
} from 'react-icons/io';

type TIconMap = {
  [key: string]: IconType;
};

export const iconMap: TIconMap = {
  // energy
  green: FaLeaf,
  fire: FaFireAlt,
  nuclear: IoIosNuclear,

  // green
  wind: GiWindTurbine,
  solar: WiSolarEclipse,
  hydro: GiWaterfall,
  coGen: GiTeslaCoil,

  // fire
  coal: GiCoalWagon,
  lng: GiFluffyTrefoil,
  oil: GiOilPump,

  // nuclear
  nuclear1: GiNuclear,
  nuclear2: GiNuclear,

  // notify
  info: IoMdInformationCircle,
  warning: IoMdWarning,
  alert: IoMdAlert,
};
