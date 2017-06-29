import React, { Component } from 'react';
import './App.css';
import Web3 from 'web3';
import _ from 'lodash';

// creating web3 provider

const ETHEREUM_PROVIDER = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
const ADDRESS = "0x2cb8b666d87e79abd87c09688f147397cad7b727";
const ABI = [{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"patient","outputs":[{"name":"firstName","type":"bytes32"},{"name":"lastName","type":"bytes32"},{"name":"dna","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getPatient","outputs":[{"name":"","type":"bytes32[]"},{"name":"","type":"bytes32[]"},{"name":"","type":"uint256[]"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_firstName","type":"bytes32"},{"name":"_lastName","type":"bytes32"},{"name":"_dna","type":"uint256"}],"name":"addPatient","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_firstName","type":"bytes32"},{"indexed":true,"name":"_lastName","type":"bytes32"},{"indexed":true,"name":"_dna","type":"uint256"}],"name":"patientAdded","type":"event"}]
const peopleContract = ETHEREUM_PROVIDER.eth.contract(ABI).at(ADDRESS);
const coinbase = ETHEREUM_PROVIDER.eth.coinbase;



class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      firstNames: [],
      lastNames:[],
      dnas: [],
      userFirst: undefined,
      userLast: undefined,
      userDNA: undefined
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  // can see that our provider is running when the app loads
  componentWillMount() {


    peopleContract.patientAdded({ fromBlock: ETHEREUM_PROVIDER.eth.currentBlock, toBlock: 'latest' }).watch((err, res) => {
      console.log(res.args);
    })
    // populates state with blockchain data
    this.updateTable()
  }

  updateTable(){
    var data = peopleContract.getPatient();
    // converts
    this.setState({
      firstNames: String(data[0]).split(','),
      lastNames: String(data[1]).split(','),
      dnas: String(data[2]).split(','),
      userFirst: '',
      userLast: '',
      userDNA: ''
    })

  }


  handleInputChange(e) {
    const target = e.target;

    if (target.name === 'userFirst') {
      this.setState({userFirst: target.value})
    } else if (target.name === 'userLast') {
      this.setState({userLast: target.value})
    } else {
      const number = isNaN(target.value) ? 0 : target.value
      this.setState({userDNA: number})
    }

  }

  handleSubmit(e){
    e.preventDefault()
    // every state change requires options object
    peopleContract.addPatient(this.state.userFirst, this.state.userLast , this.state.userDNA, { from: coinbase, gas: 210000 }, (err, res) => {
      // repopulates state with new data
      this.updateTable()
    })

  }

  render() {

    let tableRows = [];
    _.each(this.state.firstNames, (value, index) => {
      tableRows.push(
        <tr key={index}>
          <td>{ETHEREUM_PROVIDER.toAscii(this.state.firstNames[index])}</td>
          <td>{ETHEREUM_PROVIDER.toAscii(this.state.lastNames[index])}</td>
          <td>{this.state.dnas[index]}</td>
        </tr>
      )
    })

    return (
      <div className="App">
        <div className="App-header">
          <h1>PATIENT INFO</h1>
          <form onSubmit={this.handleSubmit}>
            <label>
              First Name:
              <input type="text" ref={(input) => { this.nameInput = input; }} name="userFirst" value={this.state.userFirst} onChange={this.handleInputChange} required/>
              Last Name:
              <input type="text" name="userLast" value={this.state.userLast} onChange={this.handleInputChange} required/>
              DNA:
              <input type="text" name="userDNA" value={this.state.userDNA} onChange={this.handleInputChange} required/>
            </label>
            <br />
            <input id="submitBtn" type="submit" value="Enter" />
          </form>
        </div>
        <div className="App-content">
          <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>DNA</th>
            </tr>
          </thead>
          <tbody>
            {tableRows}
          </tbody>
          </table>
        </div>
        <div>

        </div>
      </div>
    );
  }
}

export default App;
