import React, { Component } from "react";
import { Redirect } from "react-router";
import Header from "../header/header";
import Footer from "../footer/footer";
import Nutrients from "../nutrients/nutrients";
import "./styles.css";
import { fetchOneResultAsync } from "../../services/micron/fetch";
import mergeSort from "../../lib/sorting/merge-sort";
import binarySearch from "../../lib/searching/binary-search";

let nutrientIndex = [
  { id: 204, sub: false },
  { id: 606, sub: true },
  { id: 605, sub: true },
  { id: 601, sub: false },
  { id: 307, sub: false },
  { id: 205, sub: false },
  { id: 269, sub: true },
  { id: 291, sub: true },
  { id: 203, sub: false }
];
class Info extends Component {
  constructor(props) {
    super(props);
    let { id } = props.match.params;
    this.id = id;
    this.state = {
      data: undefined
    };
  }

  async componentDidMount() {
    if (!this.id) {
      return;
    }
    await fetchOneResultAsync(this.id)
      .then(responseJson => {
        if (!responseJson.success) {
          return <Redirect to="/search" />;
        }
        let { report } = responseJson.data;
        let { food } = report;
        this.setState({
          data: food
        });
      })
      .catch(error => console.error(error));
  }

  findCalories = (nutrients, id) => {
    let calories = nutrients.find(obj => {
      return obj.nutrient_id === id;
    });
    if (calories) {
      return calories.value;
    }
    return "N/A";
  };

  parseNutrients = nutrients => {
    let sorted = mergeSort(nutrients, "nutrient_id");
    return nutrientIndex.map((val, key) => {
      let { id, sub } = val;

      let nutrient = binarySearch(sorted, "nutrient_id", id);
      if (!nutrient) {
        return undefined;
      }
      return <Nutrients data={nutrient} sub={sub} key={key} />;
    });
  };

  render() {
    if (!this.state.data) {
      return <div>loading...</div>;
    }
    let { fg, name, sd, manu, nutrients, ing } = this.state.data;
    return (
      <div
        style={{ height: "100vh", display: "flex", flexDirection: "column" }}
      >
        <Header />
        <div style={{ flexGrow: "1" }}>
          <div id="infoContainer" className="phs mha mts">
            <div id="infoHeader" className="info bbb">
              <span className="fsl fwb">{name}</span>
              <span className="fd">{sd}</span>
              <span className="fsm fwm">{fg || manu}</span>
            </div>
            <div id="infoSubHeader" className="infoSubHeader info bbm">
              <span className="bbs">
                <label className="fss fwb">Amount Per 100g</label>
              </span>
              <span>
                <label className="fsm fwb">Calories</label>&nbsp;
                <label className="fsm fwm">
                  {this.findCalories(nutrients, "208")}
                </label>
              </span>
            </div>
            <div id="infoBody" className="infoBody info bbb">
              {this.parseNutrients(nutrients)}
            </div>
            <div className="infoFooter info">
              <label className="font-default">Ingredients</label>
              {ing ? <span>{ing.desc}</span> : <span>N/A</span>}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Info;
