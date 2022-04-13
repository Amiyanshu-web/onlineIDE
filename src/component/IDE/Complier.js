import React, { Component } from "react";

import "./Complier.css";
export default class Complier extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputData: `// Write your code here`,
      output: ``,
      language_id: 48,
      userTestCase: ``,
      progress: "bg-warning",
      progressPercent: 0,
    };
  }

  textareaClick = (data) => {
    console.log("TextArea is click");
    if (data.target.value === "// Write your code here")
      data.target.value = "";
  };

  clearInput = () => {
    console.log(this.state.inputData);
    this.setState({ inputData: "" });
    document.getElementById("outputBox").innerHTML = "";
    this.setState({
      progress: "bg-warning", progressPercent: 0, userTestCase: ``
    });
    document.getElementById("customInput").value = "";
  };

  inputCode = (data) => {
    console.log(this.state.inputData);
    data.preventDefault();
    this.setState({ inputData: data.target.value });
    console.log(this.state.inputData);
  };

  inputTestCase = (data) => {
    console.log(this.state.userTestCase);
    this.setState({ userTestCase: data.target.value });
  }
  processCode() {
    let code = this.state.inputData;
    console.log(code);
  }
  setLanguage = (element) => {
    console.log(element.target.value);
    element.preventDefault();
    this.setState({ language_id: element.target.value });
  };

  async PostSub(code) {
    let postResponse;
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Content-Type': 'application/json',
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
        'X-RapidAPI-Key': '31e5965cd7msh9c96f8635a0fc20p163f3djsn0195d1fc082c'
      },
      body: JSON.stringify({ language_id: this.state.language_id, source_code: code, stdin: this.state.userTestCase })
    };

    fetch('https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&fields=*', options)
      .then(postResponse => postResponse.json())
      .then(postResponse => {
        this.getSub("https://judge0-ce.p.rapidapi.com/submissions/" + postResponse.token + "?base64_encoded=true&fields=*");
      })
      .catch(err => console.error(err));
  }

  async getSub(url) {
    let getResponse;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
        'X-RapidAPI-Key': '31e5965cd7msh9c96f8635a0fc20p163f3djsn0195d1fc082c'
      }
    };

    await fetch(url, options)
      .then(getResponse => getResponse.json())
      .then(getResponse => {
        console.log(getResponse);
      })
      .catch(err => console.error(err));
  }

  submitCode = async () => {
    // this.PostSub(this.state.inputData);

    let outputText = document.getElementById("outputBox");
    outputText.innerHTML = "";
    outputText.innerHTML += "Submitting code...\n";
    const response = await fetch('https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&fields=*', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Content-Type': 'application/json',
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
        'X-RapidAPI-Key': '31e5965cd7msh9c96f8635a0fc20p163f3djsn0195d1fc082c'
      },
      body: JSON.stringify({ language_id: this.state.language_id, source_code: this.state.inputData, stdin: this.state.userTestCase }),
    });
    const getResponses = await response.json();

    let receivedResult = {
      status: { description: "Waiting" },
      stderr: null,
      compile_output: null,
    };

    while (
      receivedResult.status.description !== "Accepted" &&
      receivedResult.stderr == null &&
      receivedResult.compile_output == null
    ) {
      this.setState({
        progress: "bg-warning", progressPercent: 25
      });
      outputText.innerHTML = `Creating Submission...`;
      this.setState({
        progress: "bg-warning", progressPercent: 50
      });
      outputText.innerHTML += `\nSubmission Created ...`;
      this.setState({
        progress: "bg-warning", progressPercent: 75
      });
      outputText.innerHTML += `\nChecking Submission Status!\n`
      if (getResponses.token) {
        let url = `https://judge0-ce.p.rapidapi.com/submissions/${getResponses.token}?base64_encoded=true&fields=*`;

        const getSolution = await fetch(url, {
          method: 'GET',
          headers: {
            'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
            'X-RapidAPI-Key': '31e5965cd7msh9c96f8635a0fc20p163f3djsn0195d1fc082c'
          },
        });
        receivedResult = await getSolution.json();
      }
    }
    console.log(receivedResult);
    if (receivedResult.stdout) {
      this.setState({
        progress: "bg-success", progressPercent: 100
      });
      outputText.innerHTML = `Status: ${receivedResult.status.description}`;
      outputText.innerHTML += `Output: ${receivedResult.stdout}\nExecution Time : ${receivedResult.time} Secs\nMemory used : ${receivedResult.memory} bytes`;
    } else if (receivedResult.stderr) {
      this.setState({
        progress: "bg-danger", progressPercent: 100
      })
      outputText.innerHTML = `Status: ${receivedResult.status.description}`;
      outputText.innerHTML += "\nError: ";
      outputText.innerHTML += receivedResult.stderr;
    } else {
      this.setState({
        progress: "bg-danger", progressPercent: 100
      })
      outputText.innerHTML = `Status: ${receivedResult.status.description}`;
      outputText.innerHTML += "\nError: ";
      outputText.innerHTML += receivedResult.compile_output;
    }

  };


  render() {
    return (
      <>
        <div className="container d-flex flex-column bd-highlight mb-3">


          <div className="editor">
            <div className="form-group">
              <div className="dropdown my-1 d-grid gap-2 d-md-flex justify-content-md-end">

                <select value={this.state.language_id} onChange={this.setLanguage} className="form-select" aria-label="Default select example">
                  <option value="48">C</option>
                  <option value="52">C++</option>
                  <option value="62">Java</option>
                  <option value="51">C#</option>
                </select>

                <button className="btn btn-secondary btn-lg btn-sm mx-1" style={{ width: '10%', maxHeight: '37px' }} type="submit" onClick={this.clearInput}>Clear</button>
                <button className="btn btn-secondary btn-lg btn-sm" style={{ width: '10%', maxHeight: '37px' }} type="submit" onClick={this.submitCode}>Run</button>
              </div>

              <div className="progress my-2">
                <div className={`progress-bar ${this.state.progress}`} role="progressbar" style={{ width: `${this.state.progressPercent}%` }} aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
              </div>

              <textarea className="form-control  fs-6" id="exampleFormControlTextarea1" onClick={this.textareaClick} onChange={this.inputCode} rows="15" value={this.state.inputData} />
            </div>
            <div>

            </div>
            <div className="output-box">
              <div className="form-group">
                <span className="badge bg-dark text-light my-1 d-grid gap-2 d-md-block">Output</span>
                <textarea className="form-control" id="outputBox" rows="4"></textarea>
              </div>
            </div>
            <div className="custome-input">
              <div className="form-group">
                <span className="badge bg-dark text-light my-1 d-grid gap-2 d-md-block">Custom input</span>
                <textarea className="form-control" id="customInput" rows="4" onChange={this.inputTestCase}></textarea>
              </div>
            </div>
          </div>

        </div>
      </>
    );
  }
}
