import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { MapStatus } from '@/components/demo/Traffic/Map';
import { i18nNamespace } from '@/constants';
import { TButton, TTrafficFlow } from '../components/demo/Traffic/Panel';

type TProps = {
  mapState: MapStatus;
  setMapState: (state: MapStatus) => void;
  trafficJamCount: number;
  trafficJamLength: number;
  transportation: Array<{
    id: string;
    speed: number;
    latlng: number[];
    timestamp: number;
    direction: number;
    vehicleId: string;
    type: number;
  }>;
};

type TStates = {
  title: string;
  infos: string[];
  buttonConfigs: TButton[];
  trafficFlowData?: TTrafficFlow;
};

const usePanelProps = ({
  mapState,
  transportation,
  trafficJamCount,
  trafficJamLength,
}: TProps) => {
  const [panelProps, setPanelProps] = useState<TStates>({
    title: '',
    infos: [],
    buttonConfigs: [],
    trafficFlowData: [],
  });
  const { t } = useTranslation(i18nNamespace.TrafficMap);

  useEffect(() => {
    let title = t('title.Start');
    switch (mapState) {
      case MapStatus.FocusXimenRdSec1:
        title = t('title.FocusXimenRdSec1');
        break;
      case MapStatus.FocusXimenRdSec2:
        title = t('title.FocusXimenRdSec2');
        break;
      case MapStatus.FocusZhongzhengRd:
        title = t('title.FocusZhongzhengRd');
        break;
      case MapStatus.ShowAccidentXimenRdSec1:
        title = t('title.ShowAccidentXimenRdSec1');
        break;
      case MapStatus.ShowAccidentXimenRdSec2:
        title = t('title.ShowAccidentXimenRdSec2');
        break;
      case MapStatus.ShowAccidentZhongzhengRd:
        title = t('title.ShowAccidentZhongzhengRd');
        break;
      case MapStatus.Start:
        title = t('title.Start');
        break;
      case MapStatus.TrafficJam:
        title = t('title.TrafficJam');
        break;
      case MapStatus.TrainUtilization:
        title = t('title.TrainUtilization');
        break;
    }

    const buttonConfigs: TButton[] = [];
    /* Buttons for debugging
    const buttonConfigs = [
      {
        text: 'TrafficJam',
        onClick: () => setMapState(MapStatus.TrafficJam),
      },
      {
        text: 'Start',
        onClick: () => setMapState(MapStatus.Start),
      },
      {
        text: 'ShowAccidentZhongzhengRd',
        onClick: () => setMapState(MapStatus.ShowAccidentZhongzhengRd),
      },
      {
        text: 'ShowAccidentXimenRdSec2',
        onClick: () => setMapState(MapStatus.ShowAccidentXimenRdSec2),
      },
      {
        text: 'ShowAccidentXimenRdSec1',
        onClick: () => setMapState(MapStatus.ShowAccidentXimenRdSec1),
      },
      {
        text: 'FocusZhongzhengRd',
        onClick: () => setMapState(MapStatus.FocusZhongzhengRd),
      },
      {
        text: 'FocusXimenRdSec2',
        onClick: () => setMapState(MapStatus.FocusXimenRdSec2),
      },
      {
        text: 'FocusXimenRdSec1',
        onClick: () => setMapState(MapStatus.FocusXimenRdSec1),
      },
      {
        text: 'TrainUtilization',
        onClick: () => setMapState(MapStatus.TrainUtilization),
      },
    ]; */

    setPanelProps(prev => ({
      ...prev,
      title,
      buttonConfigs,
    }));
  }, [mapState]);

  useEffect(() => {
    const carsAmount = transportation.filter(d => d.type === 0 && d.speed !== 0)
      .length;
    const scooterAmount = transportation.filter(
      d => d.type === 1 && d.speed !== 0,
    ).length;

    const averageSpeed =
      transportation.reduce((prev, curr) => prev + curr.speed, 0) /
      (carsAmount + scooterAmount);
    const averageSpeedDesc = t('panel.averageSpeed', {
      speed: isNaN(averageSpeed) ? '0' : averageSpeed.toFixed(2),
    });
    const carsAndScootersAmountDesc = t('panel.carsAndScootersAmount', {
      carsAmount,
      scooterAmount,
    });
    const accidentDesc = t('panel.accident');
    const busDesc = t('panel.bus');
    const trafficJamDesc = t('panel.trafficJam', {
      trafficJamCount,
      trafficJamLength,
    });

    let infos: string[] = [];
    switch (mapState) {
      case MapStatus.Start:
        infos = [
          averageSpeedDesc,
          carsAndScootersAmountDesc,
          accidentDesc,
          busDesc,
          trafficJamDesc,
        ];
        break;
      case MapStatus.FocusXimenRdSec1:
      case MapStatus.ShowAccidentXimenRdSec1:
      case MapStatus.FocusXimenRdSec2:
      case MapStatus.ShowAccidentXimenRdSec2:
      case MapStatus.FocusZhongzhengRd:
      case MapStatus.ShowAccidentZhongzhengRd:
      case MapStatus.TrafficJam:
        infos = [trafficJamDesc, busDesc];
        break;
      case MapStatus.TrainUtilization:
        infos = [];
        break;
    }

    setPanelProps(prev => ({
      ...prev,
      infos,
    }));
  }, [mapState, transportation]);

  return { panelProps };
};

export default usePanelProps;
