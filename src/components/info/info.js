import React, { Component } from "react";
import { Redirect } from "react-router";
import Header from '../header/header';
import Nutrients from '../nutrients/nutrients';
import "./styles.css";
import "../../services/sorting/merge-sort";

let nutrient = ['204', '601', '307', '205', '203']

//until sorting and searching algorithms are implemented
let nutrientIndex = [
  {index:'2',
   sub:false},
  {index:'11',
   sub:true},
  {index:'12',
   sub:true},
  {index:'13',
   sub:false,},
  {index:'8',
   sub:false,},
  {index:'3',
   sub:false,},
  {index:'4',
   sub:true},
  {index:'5',
   sub:true},
  {index:'1',
   sub:false}]
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

  parseNutrients = (nutrients)=>{
    return nutrientIndex.map((val, key)=>{
      let {index, sub} = val
      return(<Nutrients data={nutrients[index]} sub={sub} key={key}/>)
    })
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
              <label className="fsm fwb">Calories</label>&nbsp;<label className="fsm fwm">{nutrients[0].value}</label>
            </span>
          </div>
          <div id="infoBody" className="infoBody info bbb">
              {
                this.parseNutrients(nutrients)
              }
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
