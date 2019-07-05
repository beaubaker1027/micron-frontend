import React, { Component } from "react";
import Header from "../header/header";
import Footer from "../footer/footer";

class About extends Component {
  render() {
    return (
      <div
        style={{ display: "flex", flexDirection: "column", height: "100vh" }}
      >
        <Header />
        <div
          style={{
            flex: 1,
            flexGrow: 1,
            justifyContent: "flex-end",
            alignItems: "center",
            boxSizing: "border-box",
            padding: "15px 15px"
          }}
        >
          <span
            style={{ padding: "5px 0", fontSize: "1.67em", fontWeight: "bold" }}
          >
            Welcome to Micron
          </span>
          <p>
            Micron is nutritional search app powered by the USDA nutritional
            database api. You can find info on the USDA api{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontWeight: "bold", textDecoration: "underline" }}
              href="https://ndb.nal.usda.gov"
            >
              here
            </a>
          </p>
          <p>
            The project can be found on github{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontWeight: "bold", textDecoration: "underline" }}
              href="https://github.com/beaubaker1027/micron-frontend"
            >
              here
            </a>
          </p>
          <p>
            The backend to this project can be found on github{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontWeight: "bold", textDecoration: "underline" }}
              href="https://github.com/beaubaker1027/micron-backend"
            >
              here
            </a>
          </p>
        </div>
        <Footer />
      </div>
    );
  }
}

export default About;
