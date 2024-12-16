import React, { Component } from "react";

export let longdo;
export let map;

class LongdoMap extends Component {
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

    if (this.props.onMapInit) {
      this.props.onMapInit(map);
    }
  }

  componentDidMount() {
    const existingScript = document.getElementById("longdoMapScript");

    if (!existingScript) {
      const script = document.createElement("script");
      script.src = `https://api.longdo.com/map/?key=${this.props.mapKey}`;
      script.id = "longdoMapScript";
      document.body.appendChild(script);

      script.onload = () => {
        if (window.longdo) {
          this.mapCallback();
        } else {
          console.error("Longdo Map API not available.");
        }
      };
    } else {
      if (window.longdo) {
        this.mapCallback();
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

export default LongdoMap;
