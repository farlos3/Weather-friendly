import React, { Component } from "react";

export let longdo;
export let map;

export class LongdoMap extends Component {
  constructor(props) {
    super(props);
    this.mapCallback = this.mapCallback.bind(this);
  }

  mapCallback() {
    // Initialize Longdo Map
    longdo = window.longdo;
    map = new window.longdo.Map({
      placeholder: document.getElementById(this.props.id),
      language: "en", // ใช้ภาษาอังกฤษ (ปรับได้)
    });

    // ตั้งค่าตำแหน่งเริ่มต้นและซูม
    const { center, zoom, bounds } = this.props;

    if (center) {
      map.location(center, true); // ตั้งค่าตำแหน่งเริ่มต้น
    }
    if (zoom) {
      map.zoom(zoom, true); // ตั้งค่าระดับการซูม
    }

    // ตั้งค่าขอบเขต (bounds) หากมี
    if (bounds) {
      const mapBounds = new window.longdo.Bounds(
        bounds.minLat,
        bounds.minLon,
        bounds.maxLat,
        bounds.maxLon
      );
      map.bound(mapBounds, { passive: false });
    }

    // เรียก callback หากมี
    const callback = this.props.callback;
    if (callback) {
      callback(map);
    }
  }

  componentDidMount() {
    const existingScript = document.getElementById("longdoMapScript");
    const mapKey = this.props.mapKey;

    if (!existingScript) {
      // เพิ่มสคริปต์สำหรับ Longdo Map
      const script = document.createElement("script");
      script.src = `https://api.longdo.com/map/?key=${mapKey}`;
      script.id = "longdoMapScript";
      document.body.appendChild(script);

      script.onload = () => {
        this.mapCallback(); // เรียก mapCallback หลังโหลดสำเร็จ
      };
    } else if (!window.longdo) {
      existingScript.onload = () => {
        this.mapCallback(); // กรณีสคริปต์มีอยู่แล้วแต่ยังไม่โหลดเสร็จ
      };
    } else {
      this.mapCallback(); // กรณีสคริปต์มีอยู่แล้วและโหลดเสร็จ
    }
  }

  render() {
    return (
      <div id={this.props.id} style={{ width: "100%", height: "100%" }}></div>
    );
  }
}

LongdoMap.defaultProps = {
  id: "longdo-map", // ค่าเริ่มต้นของ id
  mapKey: "", // ต้องใส่ API Key
  center: { lon: 100.5018, lat: 13.7563 }, // Default: กรุงเทพ
  zoom: 6, // Default: ซูมระดับ 6
  bounds: null, // Default: ไม่ตั้งขอบเขต
  callback: null, // Default: ไม่มี callback
};
