import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import Header from "../header/header";
import Footer from "../footer/footer";
import Loading from "../loading/loading";
import { debounce } from "lodash";
import { fetchAllResultsAsync } from "../../services/micron/fetch";
import "./styles.css";

class Search extends PureComponent {
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
    await fetchAllResultsAsync(text, max)
      .then(responseJson => {
        clearTimeout(this.timeout);
        if (!responseJson.success) {
          let error = responseJson.error;
          error = error
            .split(".")
            .join(". ")
            .replace("parameters", "search term");
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
    return item.map((food, key) => {
      let { name, group, ndbno } = food;
      let link = `/info/${ndbno}`;
      return (
        <div className="content" key={key}>
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
      <div
        style={{ height: "100vh", display: "flex", flexDirection: "column" }}
      >
        <Header enabled={false} />
        <div
          className="viewPort"
          style={{
            flexGrow: "1",
            overflow: "auto",
            padding: "15px 0",
            boxSizing: "border-box"
          }}
        >
          <div style={{ textAlign: "center" }}>
            <input
              id="searchInput"
              className="block"
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
