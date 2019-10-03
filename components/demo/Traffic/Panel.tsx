import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { TrafficStatus, IndicatorColor, i18nNamespace } from '@/constants';
import Indicator from './Indicator';
import Button from '../Button';
import LineChart from './LineChart';
import { MapStatus } from './Map';

const Container = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 64px 64px 36px 24px;
  pointer-events: none;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const ExtraContainer = styled.div`
  flex-grow: 1;
  min-height: 25vh;
`;

const Info = styled.p<{ large?: boolean }>`
  color: rgba(0, 217, 255, 0.8);
  padding-left: 24px;
  margin: 8px 0;
  font-weight: 100;
  font-size: ${props => (props.large ? '2.5em' : '18px')};
  max-width: 35vw;
`;

const VerticalLayoutWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const HorizontalLayoutWrapper = styled.div`
  display: flex;
  flex: 1;
  align-items: bottom;
`;

const ButtonWrapper = styled.div`
  display: flex;
  max-width: 1300px;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export type TButton = {
  text: string;
  onClick: () => void;
};

export type TTrafficFlow = Array<{ value: number; time: string }>;

export type TProps = {
  title: string;
  infos: string[];
  buttonConfigs: TButton[];
  status: TrafficStatus;
  trafficFlowData?: TTrafficFlow;
  mapState: MapStatus;
};

const Panel: React.FC<TProps> = ({
  title,
  // infos,
  buttonConfigs,
  status,
  trafficFlowData,
  mapState,
}) => {
  const { t } = useTranslation(i18nNamespace.TrafficMap);
  return (
    <Container>
      <HorizontalLayoutWrapper>
        <MainContainer>
          <VerticalLayoutWrapper>
            <Info large={true}>{title}</Info>
            <Indicator
              status={status}
              color={
                status === TrafficStatus.Normal
                  ? IndicatorColor.normal
                  : IndicatorColor.warning
              }
            />
          </VerticalLayoutWrapper>
          {/* {infos.map(info => (
            <Info key={info}>{info}</Info>
          ))} */}
          <ButtonWrapper>
            {buttonConfigs.map(config => (
              <Button key={config.text} onClick={config.onClick}>
                {config.text}
              </Button>
            ))}
          </ButtonWrapper>
        </MainContainer>
        <ExtraContainer>
          {trafficFlowData && <LineChart data={trafficFlowData} />}
          {mapState === MapStatus.TrainUtilization && (
            <div style={{ display: 'flex' }}>
              <div style={{ padding: '12px' }}>
                {t('panel.trainLegend.maxCapacity')}
                <div
                  style={{
                    margin: '12px',
                    width: '50px',
                    height: '50px',
                    border: '2.5px solid white',
                    borderRadius: '50%',
                  }}
                />
              </div>
              <div style={{ padding: '12px' }}>
                {t('panel.trainLegend.current')}
                <div
                  style={{
                    margin: '12px',
                    width: '30px',
                    height: '30px',
                    backgroundColor: 'white',
                    borderRadius: '50%',
                  }}
                />
              </div>
              <div style={{ padding: '12px' }}>
                {t('panel.trainLegend.nearTheLimit')}
                <div
                  style={{
                    margin: '12px',
                    width: '30px',
                    height: '30px',
                    backgroundColor: 'red',
                    borderRadius: '50%',
                  }}
                />
              </div>
            </div>
          )}
        </ExtraContainer>
      </HorizontalLayoutWrapper>
    </Container>
  );
};

export default Panel;
