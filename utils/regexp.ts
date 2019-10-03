import dayjs from 'dayjs';
import { Time } from '@/contexts/actionRouter';

const regexp = {
  HEY_JARVIS: /[J|T|G|D]arvis/i,
  STOP: /thank you|stop/i,
  PARSE_ACTION: /show|tell|see|analyze|compare|find|focus/i,
  PARSE_TEMPLATE: /home|status|statistics|traffic (status|statistics)|electricity (status|statistics)/i,
  PARSE_DATA: /backup capacity|electricity usage|electricity generated value|electricity transfer value/gi,
  PARSE_TIME: /(this|last) (year|month)|from (June|A) to (July|B)/i,
  PARSE_STATUS: /alert|report|max value|minimum value/i,

  YES: /yes|show|check|okay|ok/i,
  NO: /no/i,
  FOCUS1: /focus (one|1|what|why|white)/i,
  FOCUS2: /focus (two|2|to)/i,
  FOCUS3: /focus (three|3|green)/i,
};

export const matchStop = (transcript: string) => regexp.STOP.exec(transcript);
export const matchYes = (transcript: string) => regexp.YES.exec(transcript);
export const matchNo = (transcript: string) => regexp.NO.exec(transcript);
export const matchFocus1 = (transcript: string) =>
  regexp.FOCUS1.exec(transcript);
export const matchFocus2 = (transcript: string) =>
  regexp.FOCUS2.exec(transcript);
export const matchFocus3 = (transcript: string) =>
  regexp.FOCUS3.exec(transcript);

export const matchHeyJarvis = (transcript: string) =>
  regexp.HEY_JARVIS.exec(transcript);

export const matchAction = (transcript: string) => {
  const result = regexp.PARSE_ACTION.exec(transcript);
  return result ? result[0].toLowerCase() : null;
};

export const matchTemplate = (transcript: string) => {
  const result = regexp.PARSE_TEMPLATE.exec(transcript);
  return result ? result[0].toLowerCase() : null;
};

export const matchData = (transcript: string) => {
  const result = [];
  let tempArr = regexp.PARSE_DATA.exec(transcript);
  while (tempArr) {
    result.push(tempArr[0].toLowerCase());
    tempArr = regexp.PARSE_DATA.exec(transcript);
  }
  return result;
};

export const matchTimes = (transcript: string) => {
  const result = regexp.PARSE_TIME.exec(transcript);
  const times: Time[] = [];
  if (result) {
    const timeScript = result[0].toLowerCase();
    switch (timeScript) {
      case 'this year': {
        times.push([
          dayjs()
            .startOf('year')
            .unix(),
          dayjs()
            .endOf('year')
            .unix(),
        ]);
        break;
      }
    }
  }
  return times;
};

export const matchStatus = (transcript: string) => {
  const result = regexp.PARSE_STATUS.exec(transcript);
  return result ? result[0].toLowerCase() : null;
};
