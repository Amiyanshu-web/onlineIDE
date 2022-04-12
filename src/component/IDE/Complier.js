import React, { Component } from "react";

import "./Complier.css";
export default class Complier extends Component {
  render() {

    return (
      <>
        <div className="container d-flex flex-column bd-highlight mb-3">
          <p>Progression Bar</p>
          <div className="progress">
            <div className="progress-bar bg-success" role="progressbar" style={{ width: "25%" }} aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
          <div className="editor">
            <div className="form-group">
              <label htmlFor="exampleFormControlTextarea1">Editor</label>
              <textarea className="form-control" id="exampleFormControlTextarea1" rows="15"></textarea>
            </div>
            <div>
              <div className="dropdown">
                <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton" style={{ border: '1ps solid black' }} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Language
                </button>
                <div className="dropdown-menu mx-2" aria-labelledby="dropdownMenuButton">
                  <a className="dropdown-item" href="#">C</a>
                  <a className="dropdown-item" href="#">C++</a>
                  <a className="dropdown-item" href="#">Java</a>
                  <a className="dropdown-item" href="#">C#</a>
                </div>
                <button className="btn btn-primary mx-2" type="submit">Clear</button>
                <button className="btn btn-primary mx-2" type="submit">Run</button>

              </div>
            </div>
            <div className="output-box">
              <div className="form-group">
                <label htmlFor="exampleFormControlTextarea1">Output</label>
                <textarea className="form-control" id="exampleFormControlTextarea1" rows="4"></textarea>
              </div>
            </div>
            <div className="custome-input">
              <div className="form-group">
                <label htmlFor="exampleFormControlTextarea1">Custom input</label>
                <textarea className="form-control" id="exampleFormControlTextarea1" rows="4"></textarea>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
