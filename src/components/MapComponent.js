import React, { useEffect } from 'react';
import { initMap, destroyMap } from '../js/map';

const MapComponent = () => {
  useEffect(() => {

    initMap();

    // 컴포넌트가 언마운트될 때..
    return () => {
      destroyMap();
    };
  }, []);

  return (
    <div id="map" className="map" style={{ width: '95%', height: '700px', border: '1px solid #333', margin: '0 auto' }}></div>
  );
};

export default MapComponent;