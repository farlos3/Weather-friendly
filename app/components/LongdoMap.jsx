import React, { Component } from "react";

export let longdo;
export let map;

export class LongdoMap extends Component {
  constructor(props) {
    super(props);
    this.mapCallback = this.mapCallback.bind(this);
  }

  mapCallback() {
    longdo = window.longdo;
    map = new window.longdo.Map({
      placeholder: document.getElementById(this.props.id),
      language: "en",
    });
  }

  componentDidMount() {
    const existingScript = document.getElementById("longdoMapScript");
    const callback = this.props.callback;

    if (!existingScript) {
      const script = document.createElement("script");
      script.src = `https://api.longdo.com/map/?key=${this.props.mapKey}`;
      script.id = "longdoMapScript";
      document.body.appendChild(script);

      script.onload = () => {
        // ตรวจสอบว่า window.longdo พร้อมใช้งาน
        if (window.longdo) {
          this.mapCallback();
          if (callback) callback();
        } else {
          console.error("Longdo Map API not available.");
        }
      };
    } else {
      // ถ้า existingScript มีอยู่แล้ว
      if (window.longdo) {
        this.mapCallback();
        if (callback) callback();
      } else {
        console.error("Longdo Map API not available.");
      }
    }
  }

  render() {
    return (
      <div id={this.props.id} style={{ width: "100%", height: "100%" }}></div>
    );
  }
}
