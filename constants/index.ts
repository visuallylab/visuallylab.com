import { getRelativePath } from '@/utils';

/* head meta tag data */
export const SITE_TITLE = 'Visually Lab';
export const SITE_DESC = 'visualize everything';
export const SITE_URL = 'localhost';
export const FAVICON_PATH = getRelativePath('/static/favicon.ico');
export const LARGE_ICON_PATH = getRelativePath('/static/large-icon.png');

/* Traffic animation config */
export const frames = 30;
export const accidentFrames = 15;

export enum TrafficStatus {
  Normal = 'Normal',
  RoadCrowed = 'RoadCrowded',
  TrainCrowed = 'TrainCrowded',
}

export enum IndicatorColor {
  normal = '#009900',
  warning = '#EE0000',
}

export enum i18nNamespace {
  Common = 'common',
  TrafficMap = 'trafficMap',
}
