function mapInit() {
  // OpenStreetMap 레이어
  let osmLayer = new ol.layer.Tile({
    source: new ol.source.OSM({
      url: 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png'
    })
  });

  // 점 생성
  let featureSource = new ol.source.Vector({});
  const featureLayer = new ol.layer.Vector({
    source: featureSource
  });

  let pointFeature = new ol.Feature({
    geometry: new ol.geom.Point(ol.proj.fromLonLat([128.45, 38.10])) // 설악산
  });
  // 점 css + text
  pointFeature.setStyle(new ol.style.Style({
    image: new ol.style.Circle({
      radius: 5,
      fill: new ol.style.Fill({
        color: '#ff0000'
      })
    }),
    text: new ol.style.Text({
      text: '설악산',
      font: '12px Calibri,sans-serif',
      fill: new ol.style.Fill({
        color: '#555'
      }),
      stroke: new ol.style.Stroke({
        color: '#fff',
        width: 2
      }),
      offsetY: -15 // 위치 조정
    })
  }));
  featureSource.addFeature(pointFeature);

  // 지도 생성
  let map = new ol.Map({
      target: 'map',
      layers: [
        osmLayer
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([128, 37.5]),
        zoom: 7
      }),
      interactions: new ol.interaction.defaults({ 
        altShiftDragRotate: true, //alt+shift+드래그 회전
        doubleClickZoom: true, // 더블클릭 줌
        dragPan: true, //드래그 팬(이동)
        mouseWheelZoom: true, //마우스 휠 줌
        pinchRotate: false, //핀치 회전
        pinchZoom: false, // 핀치 줌
        shiftDragZoom: true //shift+드래그 줌
      }),
  });
  // 산 클릭 이벤트
  map.on('click', function(event) {
    map.forEachFeatureAtPixel(event.pixel, function(feature) {
      if (feature === pointFeature) {
        mountain();
      }
    });
  });

  // 점 출력
  map.addLayer(featureLayer);
}

// 최종 함수출력
$(document).ready(function(){
  mapInit();
})