import { Popup } from 'react-map-gl';
import styled from 'styled-components';

type TProps = {
  lat: number;
  lng: number;
  texts: string[];
};

const P = styled.p`
  color: rgba(0, 217, 255, 0.8);
  padding: 0px;
  margin: 0px;
  margin-bottom: 8px;
  font-weight: 100px;
  font-size: 24px;
`;

const CarInfoPopup: React.FC<TProps> = ({ lat, lng, texts }) => (
  <Popup latitude={lat} longitude={lng} offsetTop={-30} closeButton={false}>
    {texts.map(text => (
      <P key={text}>{text}</P>
    ))}
  </Popup>
);

export default CarInfoPopup;
