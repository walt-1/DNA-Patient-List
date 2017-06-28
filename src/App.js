import React, { Component } from 'react';
import './App.css';
import Web3 from 'web3';
import _ from 'lodash';

// creating web3 provider
const ETHEREUM_PROVIDER = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
const ADDRESS = "0x73bbdf61b11b399190fe5dea4ed9dfa3772c3668";
const ABI = [{"constant":true,"inputs":[],"name":"getPeople","outputs":[{"name":"","type":"bytes32[]"},{"name":"","type":"bytes32[]"},{"name":"","type":"uint256[]"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_firstName","type":"bytes32"},{"name":"_lastName","type":"bytes32"},{"name":"_age","type":"uint256"}],"name":"addPerson","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"people","outputs":[{"name":"firstName","type":"bytes32"},{"name":"lastName","type":"bytes32"},{"name":"age","type":"uint256"}],"payable":false,"type":"function"}];

const peopleContract = ETHEREUM_PROVIDER.eth.contract(ABI).at(ADDRESS);

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      firstNames: [],
      lastNames:[],
      ages: [],
      userFirst: undefined,
      userLast: undefined,
      userAge: undefined

    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  // can see that our provider is running when the app loads
  componentWillMount() {
    var data = peopleContract.getPeople();
    this.setState({
      firstNames: String(data[0]).split(','),
      lastNames: String(data[1]).split(','),
      ages: String(data[2]).split(',')
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
      this.setState({userAge: number})
    }

  }

  handleSubmit(e){
    alert(this.state.userFirst + this.state.userLast + this.state.userAge);

    e.preventDefault();
  }

  render() {

    let tableRows = [];
    _.each(this.state.firstNames, (value, index) => {
      tableRows.push(
        <tr key={index}>
          <td>{ETHEREUM_PROVIDER.toAscii(this.state.firstNames[index])}</td>
          <td>{ETHEREUM_PROVIDER.toAscii(this.state.lastNames[index])}</td>
          <td>{this.state.ages[index]}</td>
        </tr>
      )
    })

    return (
      <div className="App">
        <div className="App-header">
          <form onSubmit={this.handleSubmit}>
            <label>
              First Name:
              <input type="text" name="userFirst" value={this.state.userFirst} onChange={this.handleInputChange} required/>
              Last Name:
              <input type="text" name="userLast" value={this.state.userLast} onChange={this.handleInputChange} required/>
              Age:
              <input type="text" name="userAge" value={this.state.userAge} onChange={this.handleInputChange} required/>
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
        <div className="App-content">
          <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            {tableRows}
          </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;
