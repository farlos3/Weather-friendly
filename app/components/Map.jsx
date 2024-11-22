'use client'; // บอก Next.js ว่านี่คือโค้ดที่รันฝั่งไคลเอนต์

import { useEffect } from 'react';

const NostraMap = ({ nostraApiKey }) => {
  useEffect(() => {
    let map;

    // โหลดสคริปต์ Nostra API
    const script = document.createElement('script');
    script.src = `https://api.nostramap.com/nostraapi/v2.0?key=${nostraApiKey}`;
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
        if (window.nostra && window.nostra.maps) {
          window.nostra.onready = function () {
            window.nostra.config.Language.setLanguage(window.nostra.language.E);
            initialize();
          };
        } else {
          console.error('Nostra maps API not available.');
        }
      };

    script.onerror = () => {
      console.error('Failed to load Nostra API');
    };

    function initialize() {
        const map = new window.nostra.maps.Map('map', {
            id: 'map', // เปลี่ยนจาก 'mapTest' เป็น 'map'
            logo: false,
            scalebar: true,
            basemap: 'streetmap',
            slider: true,
            country: 'th',
          });
          

      // สร้าง AGS Layer สำหรับ Traffic
      const layerTraffic = new window.nostra.maps.layers.AGSLayer(map, {
        id: 'test-ags',
        type: 'DYNAMIC',
        url: 'https://mapdynamic.nostramap.com/arcgis/rest/services/NOSTRATraffic/MapServer',
      });

      // สร้าง AGS Layer สำหรับ Guide
      const layerGuide = new window.nostra.maps.layers.AGSLayer(map, {
        id: 'test-ags-2',
        type: 'DYNAMIC',
        url: 'https://mapdynamic.nostramap.com/arcgis/rest/services/NOSTRAGuide/MapServer',
      });

      // เพิ่ม layer ลงในแผนที่เมื่อโหลดเสร็จ
      layerTraffic.events.load = function () {
        map.addLayer(layerTraffic);
      };

      layerGuide.events.load = function () {
        map.addLayer(layerGuide);
      };
    }

    // Clean up the script when the component is unmounted
    return () => {
      if (script && script.parentNode) {
        document.body.removeChild(script);
      }
    };
  }, [nostraApiKey]); // nostraApiKey จะถูกส่งจาก props

  return (
    <div>
      <div id="map"/>
    </div>
  );
};

export default NostraMap;
