import React, { useEffect } from 'react';
import { initMap, destroyMap, initMapWithMountains } from '../js/map';

const MapComponent = ({ mountains }) => {
  useEffect(() => {

    initMap();
    initMapWithMountains(mountains);

    // 컴포넌트가 언마운트될 때..
    return () => {
      destroyMap();
    };
  }, [mountains]);

  return (
    <div id="map" className="map" style={{ width: '95%', height: '700px', border: '1px solid #333', margin: '0 auto' }}></div>
  );
};

export default MapComponent;