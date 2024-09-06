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

let map, featureSource, featureLayer;

// initMap 초기화 함수 (최초 지도 설정)
export function initMap() {
  if (map) {
    return;
  }

  // 배경지도 가져오기
  const osmLayer = new TileLayer({
    source: new OSM({
      url: 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png',
    }),
  });

  // 점을 저장할 벡터 소스
  featureSource = new VectorSource({});

  featureLayer = new VectorLayer({
    source: featureSource,
  });

  // 설악산, 속리산, 월악산, 소백산, 지리산, 방태산, 관악산, 남산(경주)
  // 구봉산(진안), 운장산, 청계산, 치악산, 팔공산
  const mountains = [
    { name: '설악산', coordinates: [128.45, 38.10] },
    { name: '속리산', coordinates: [127.83, 36.54] },
    { name: '월악산', coordinates: [128.08, 36.83] },
    { name: '소백산', coordinates: [128.57, 36.90] },
    { name: '지리산', coordinates: [127.73, 35.37] },
    { name: '방태산', coordinates: [128.53, 37.97] },
    { name: '관악산', coordinates: [126.95, 37.44] },
    { name: '남산(경주)', coordinates: [129.32, 35.83] },
    { name: '구봉산(진안)', coordinates: [127.45, 35.78] },
    { name: '운장산', coordinates: [127.42, 35.90] },
    { name: '청계산', coordinates: [127.08, 37.43] },
    { name: '치악산', coordinates: [128.03, 37.40] },
    { name: '팔공산', coordinates: [128.71, 35.98] },
  ];

  mountains.forEach(mountain => {
  const pointFeature = new Feature({
    geometry: new Point(fromLonLat(mountain.coordinates)),  // 좌표 설정
    name: mountain.name,  // 이름 설정
  });

  // 스타일 및 텍스트 설정
  pointFeature.setStyle(
    new Style({
      image: new CircleStyle({
        radius: 5,
        fill: new Fill({
          color: '#ff0000',  // 점 색상
        }),
      }),
      text: new Text({
        text: mountain.name,  // 산 이름
        font: '10px Calibri,sans-serif',
        fill: new Fill({
          color: '#555',
        }),
        stroke: new Stroke({
          color: '#fff',
          width: 2,
        }),
        offsetY: -15,  // 텍스트 위치 조정
      }),
    })
  );

  // featureSource에 피처 추가
  featureSource.addFeature(pointFeature);
});

  // 지도 생성
  map = new Map({
    target: 'map', // 렌더링할 div의 id
    layers: [osmLayer, featureLayer], // 배경지도 + 피처 레이어
    view: new View({
      center: fromLonLat([128, 37.5]), // 초기 중심점
      zoom: 7,
    }),
  });

  // "산" 클릭 이벤트 처리
  map.on('click', function (event) {
    map.forEachFeatureAtPixel(event.pixel, function (feature) {
      const mountainName = feature.get('name');
      if (mountainName) {
        alert(`${mountainName}이(가) 클릭되었습니다!`);
      }
    });
  });
}

// initMapWithMountains - 산 데이터를 받아와서 지도에 표시
export function initMapWithMountains(mountains) {
  if (!map) {
    initMap();
  }

  // 추가 산 데이터만 처리
  mountains.forEach((mountain) => {
    const pointFeature = new Feature({
      geometry: new Point(fromLonLat([mountain.longitude, mountain.latitude])), // 좌표 설정
      name: mountain.name  // 이름 추가
    });

    // 스타일 및 텍스트 설정
    pointFeature.setStyle(
      new Style({
        image: new CircleStyle({
          radius: 5,
          fill: new Fill({
            color: '#00ff00',  // 추가 산의 점 색상
          }),
        }),
        text: new Text({
          text: mountain.name,  // 산 이름
          font: '10px Calibri,sans-serif',
          fill: new Fill({
            color: '#555',
          }),
          stroke: new Stroke({
            color: '#fff',
            width: 2,
          }),
          offsetY: -15,  // 텍스트 위치 조정
        }),
      })
    );

    // 피처 소스에 추가
    featureSource.addFeature(pointFeature);
  });
}

// destroyMap - 지도 삭제
export function destroyMap() {
  if (map) {
    map.setTarget(null);
    map = null;
  }
}