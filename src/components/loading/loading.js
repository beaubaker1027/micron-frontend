import React, { Component } from "react";
import generateNewBarcodeData from "../../lib/lib/barcode";

export default class MyComponent extends Component {
  state = {
    barcodeData: []
  };

  interval;

  componentDidMount() {
    this.createBarCode();
    this.interval = setInterval(this.createBarCode, 200);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  createBarCode = () => {
    this.setState({
      barcodeData: generateNewBarcodeData(30, {
        color: "black",
        min: 1,
        max: 5
      })
    });
  };

  render() {
    if (this.state.barcodeData.length < 1) {
      return <div>Gathering Barcodes</div>;
    }
    return (
      <div
        style={{
          width: "200px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        {this.state.barcodeData.map((data, index) => {
          return (
            <div
              key={index}
              style={{
                height: 100 + "px",
                display: "inline-block",
                margin: 1.5 + "px",
                minHeight: 100 + "%",
                width: data.width + "px",
                backgroundColor: data.color
              }}
            />
          );
        })}
      </div>
    );
  }
}
