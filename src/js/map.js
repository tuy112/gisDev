import 'ol/ol.css';

import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj';

import {
      Circle as CircleStyle,
      Fill,
      Stroke,
      Style,
      Text
} from 'ol/style';

let map = null;
let featureSource = null;

// 마커 스타일
const createMountainStyle = (name) => {

      return new Style({
            image: new CircleStyle({
                  radius: 6,
                  fill: new Fill({
                        color: '#ff0000'
                  }),
                  stroke: new Stroke({
                        color: '#ffffff',
                        width: 2
                  })
            }),

            text: new Text({
                  text: name,
                  font: 'bold 12px sans-serif',
                  fill: new Fill({
                        color: '#333333'
                  }),
                  stroke: new Stroke({
                        color: '#ffffff',
                        width: 3
                  }),
                  offsetY: -17
            })

      });
};

// 지도 초기화
export function initMap(target) {
      if (map) {
            return;
      }

      featureSource = new VectorSource();

      const osmLayer = new TileLayer({
            source: new OSM()
      });
      const featureLayer = new VectorLayer({
            source: featureSource
      });

      map = new Map({
            target: target,
            layers: [
                  osmLayer,
                  featureLayer
            ],
            view: new View({
                  center: fromLonLat([128, 37.5]),
                  zoom: 7
            })
      });

      // 산 마커 클릭
      map.on('click', (event) => {
            map.forEachFeatureAtPixel(
                  event.pixel,
                  (feature) => {
                        const mountainName = feature.get('name');
                        if (mountainName) {
                              alert(`${mountainName}이(가) 클릭되었습니다!`);
                        }

                  }
            );
      });
}

// DB 산행 데이터 마커 갱신
export function setMountains(mountains) {
      if (!featureSource) {
            return;
      }
      featureSource.clear();

      mountains.forEach((mountain) => {
            const longitude = Number(mountain.longitude);
            const latitude = Number(mountain.latitude);

            if (
                  !Number.isFinite(longitude) ||
                  !Number.isFinite(latitude)
            ) {
                  return;
            }

            const pointFeature = new Feature({
                  geometry: new Point(
                        fromLonLat([longitude, latitude])
                  ),
                  name: mountain.name
            });
            pointFeature.setStyle(
                  createMountainStyle(mountain.name)
            );
            featureSource.addFeature(pointFeature);
      });
}

// 지도 제거
export function destroyMap() {

      if (map) {
            map.setTarget(null);
            map.dispose();
            map = null;
            featureSource = null;

      }
}
