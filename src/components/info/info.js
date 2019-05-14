import React, { Component } from "react";
import { Redirect } from "react-router";
import Header from '../header/header';
import "./styles.css";


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
    if(!this.id) { return; }
    await fetch(`http://localhost:5000/usda-api/retrieve?id=${this.id}`)
      .then(response => response.json())
      .then(responseJson => {
        if (!responseJson.success) {
          console.error(responseJson.error);
          alert('Error: ',responseJson.error);
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

  render() {
    console.log(this.state.data);
    if(!this.state.data) {
      return(<div>loading...</div>)
    }
    let { fg, name, sd, manu, nutrients, ing} = this.state.data;
    return (
      <div style={{height:'100vh'}}>
        <Header />
        <div id="infoContainer" className="padding-small">
          <div className="infoHeader info bottom-border-big">
            <span className="font-bold-larger">{name}</span>
            <span className="font-default">{sd}</span>
            <span className="font-default">{fg || manu}</span>
          </div>
          <div className="infoSubHeader info bottom-border-medium">
            <span className="bottom-border-small">
              <label className="font-bold-smaller">Amount Per 100g</label>
            </span>
            <span>
              <label className="font-bold-default">Calories {nutrients[1].value}</label>
            </span>
          </div>
          <div className="infoBody info bottom-border-big">
            <span className="flex-block bottom-border-small">
              <label className="font-bold-default left">Nutrient</label>
              <label className="font-default middle">(unit)</label>
              <label className="font-bold-default right">value</label>
            </span>
          </div>
          <div className="infoFooter info">
            <label className="font-default">Ingredients</label>
            {
              ing?
              <span>{ing.desc}</span>
              :
              <span>N/A</span>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Info;
