import { PolygonLayer } from '@deck.gl/layers';
import { PhongMaterial } from '@luma.gl/core';
import buildings from 'static/data/traffic/building.json';
import { AmbientLight, PointLight, LightingEffect } from '@deck.gl/core';

const layerConfig = {
  material: {
    ambient: 0.1,
    diffuse: 0.6,
    shininess: 32,
    specularColor: [60, 64, 70],
  },
  ambientLight: {
    color: [255, 255, 255],
    intensity: 1.0,
  },
  pointLight: {
    color: [255, 200, 255],
    intensity: 1.0,
    position: [120.1063, 22.8922, 8000],
  },
};

export const getBuildingLayer = () => {
  const material = new PhongMaterial(layerConfig.material);

  return new PolygonLayer({
    id: 'buildings',
    data: buildings,
    extruded: true,
    wireframe: false,
    opacity: 0.5,
    getPolygon: (f: any) => f.polygon,
    getElevation: (f: any) => f.height,
    getFillColor: [74, 80, 87],
    material,
  });
};

export const getLightEffect = () => {
  const ambientLight = new AmbientLight(layerConfig.ambientLight);
  const pointLight = new PointLight(layerConfig.pointLight);
  return new LightingEffect({ ambientLight, pointLight });
};

export const createTrafficFlowData = (current: Date) => {
  const data = [];
  for (let i = 0; i < 12; i++) {
    const time = new Date(current);
    time.setHours(current.getHours() - 12 + i);
    data.push({
      time: `${time.getHours()}:00`,
      value: Math.round(20 + Math.random() * 10 + Math.random() * i * i * 2), // cars per minute
    });
  }

  return data;
};
