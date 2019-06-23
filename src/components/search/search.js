import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "../header/header";
import Footer from "../footer/footer";
import Loading from "../loading/loading";
import { debounce } from "lodash";
import "./styles.css";

//const numColumns = 1;

/*const formatLastRow = (data, columns) => {
  if (columns <= 1) {
    return data;
  }
  let dividend = Math.ceil(data.length / columns);
  let nextHighestMultiple = dividend * columns;
  let remainder = Math.floor(nextHighestMultiple % data.length);
  for (let i = 0; i < remainder; i++) {
    data.push({ empty: true });
  }
  return data;
};*/

class Search extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    inputValue: "",
    max: undefined,
    placeholder: "Food Search"
  };
  timeout;

  fetchData = async (text, max = 15) => {
    this.timeout = setTimeout(() => {
      this.setState({ error: "This query is taking longer than expected" });
    }, 3000);
    await fetch(
      `${process.env.REACT_APP_FETCH_ALL_API_ENDPOINT}query=${text}&max=${max}`
    )
      .then(response => {
        return response.json();}
      })
      .then(responseJson => {
        clearTimeout(this.timeout);
        if (!responseJson.success) {
          let error = responseJson.error;
          error = error.split(".");
          error = error.join(".  ");
          throw new Error(error);
        }
        return this.setState({
          error: undefined,
          data: responseJson.data
        });
      })
      .catch(error => {
        return this.setState({
          error: error.message,
          data: {}
        });
      });
  };

  onChangeText = debounce((input, options, callback) => {
    let text = input.value;
    if (text === this.state.lastQuery) {
      return;
    }
    this.setState({
      data: undefined,
      lastQuery: text
    });
    if (!options) {
      callback(text);
    }
    return options.textLengthCheck(text, 3) ? callback(text) : undefined;
  }, 750);

  textLengthCheck = (text, length) => {
    return text.length >= length;
  };

  renderListItems = data => {
    if (data.errors) {
      return (
        <span key={0} className="informer">
          {"No results to display".toUpperCase()}
        </span>
      );
    }
    let { list = {} } = data;
    let { item = undefined } = list;
    if (!list || !item) {
      return;
    }
    //item = formatLastRow(item, numColumns);
    return item.map((food, key) => {
      /*if (food.empty) {
        return <div class="content" style={{ opacity: "0" }} key={key} />;
      }*/
      let { name, group, ndbno } = food;
      //name = name.split(',')[0];
      let link = `/info/${ndbno}`;
      return (
        <div class="content" key={key}>
          <span>
            <Link to={link}>{name}</Link>
          </span>
          <span>{group}</span>
        </div>
      );
    });
  };

  render() {
    return (
      <div style={{ height: "100vh" }}>
        <Header enabled={false} />
        <div
          className="viewPort"
          style={{
            overflow: "auto",
            boxSizing: "border-box",
            minHeight: "90vh",
            maxHeight: "90vh"
          }}
        >
          <div style={{ textAlign: "center" }}>
            <input
              id="searchInput"
              class="block"
              ref={ref => (this.input = ref)}
              placeholder={this.state.placeholder}
              onFocus={() => {
                this.setState({ placeholder: "" });
              }}
              onBlur={() => {
                this.setState({ placeholder: "Food Search" });
              }}
              onChange={() => {
                this.setState(
                  {
                    results: this.input.value.length > 0 ? true : false,
                    search: this.input.value.length >= 3 ? true : false,
                    error: undefined
                  },
                  this.onChangeText(
                    this.input,
                    { textLengthCheck: this.textLengthCheck },
                    text => {
                      this.fetchData(text, this.state.max);
                    }
                  )
                );
              }}
            />
          </div>
          {this.state.results ? (
            <div className="contentContainer">
              <ul className="contentList">
                {this.state.error && (
                  <span className="informer">{this.state.error}</span>
                )}
                {this.state.data ? (
                  this.renderListItems(this.state.data)
                ) : this.state.search ? (
                  <span className="informer">
                    <Loading />
                  </span>
                ) : (
                  <span className="informer">
                    Search Must Be Atleast 3 Characters
                  </span>
                )}
              </ul>
            </div>
          ) : (
            undefined
          )}
        </div>
        {<Footer />}
      </div>
    );
  }
}

export default Search;
