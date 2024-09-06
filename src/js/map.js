import 'ol/ol.css';  // 스타일 가져오기
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj';
import { Circle as CircleStyle, Fill, Stroke, Style, Text } from 'ol/style';

let map;

// initMap
export function initMap() {
  if (map) {
    // 맵이 이미 생성되어 있는 경우 중복 생성하지 않음
    return;
  }

  // 배경지도 가져오기
  const osmLayer = new TileLayer({
    source: new OSM({
      url: 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png',
    }),
  });

  // 점 생성
  const featureSource = new VectorSource({});
  const featureLayer = new VectorLayer({
    source: featureSource,
  });

  const pointFeature = new Feature({
    geometry: new Point(fromLonLat([128.45, 38.10])), // 설악산 좌표
  });

  // 점 스타일 및 텍스트 설정
  pointFeature.setStyle(
    new Style({
      image: new CircleStyle({
        radius: 5,
        fill: new Fill({
          color: '#ff0000',
        }),
      }),
      text: new Text({
        text: '설악산',
        font: '10px Calibri,sans-serif',
        fill: new Fill({
          color: '#555',
        }),
        stroke: new Stroke({
          color: '#fff',
          width: 2,
        }),
        offsetY: -15, // 텍스트 위치 조정
      }),
    })
  );

  featureSource.addFeature(pointFeature);

  // 지도 생성
  map = new Map({
    target: 'map', // 렌더링할 div의 id
    layers: [osmLayer],
    view: new View({
      center: fromLonLat([128, 37.5]), // 초기 중심점 설정
      zoom: 7,
    }),
  });

  // 점 레이어 추가
  map.addLayer(featureLayer);

  // 산 클릭 이벤트 처리
  map.on('click', function (event) {
    map.forEachFeatureAtPixel(event.pixel, function (feature) {
      if (feature === pointFeature) {
        alert('산이 클릭되었습니다!');
      }
    });
  });
}

// destroyMap
export function destroyMap() {
  if (map) {
    map.setTarget(null);
    map = null;
  }
}