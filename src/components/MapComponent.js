import React, { useEffect, useRef } from 'react';
import { initMap, destroyMap, initMapWithMountains } from '../js/map';

const MapComponent = ({ mountains }) => {
      const mapRef = useRef(null);
      
      // 지도 최초 생성
      useEffect(() => {
            if (!mapRef.current) {
                  return;
            }
            initMap(mapRef.current);

            return () => {
                  destroyMap();
            };
      }, []);

      // 산행 데이터 변경 시 마커 갱신
      useEffect(() => {
            setMountains(mountains);
      }, [mountains]);

      return (
            <div
                  id="map"
                  ref={mapRef}
                  className="map"
                  style={{
                        width: '95%',
                        height: '700px',
                        border: '1px solid #333',
                        margin: '0 auto'
                  }}
            />
      );
};

export default MapComponent;