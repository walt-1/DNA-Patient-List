import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Web3 from 'web3';
import _ from 'lodash';

// creating web3 provider
const ETHEREUM_PROVIDER = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
const ADDRESS = '0x7fdaccb8d58b18b0209f05162f0bb9dcbbfc3aae';
const ABI = [{"constant":true,"inputs":[],"name":"getPeople","outputs":[{"name":"","type":"bytes32[]"},{"name":"","type":"bytes32[]"},{"name":"","type":"uint256[]"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_firstName","type":"bytes32"},{"name":"_lastName","type":"bytes32"},{"name":"_age","type":"uint256"}],"name":"addPerson","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"people","outputs":[{"name":"firstName","type":"bytes32"},{"name":"lastName","type":"bytes32"},{"name":"age","type":"uint256"}],"payable":false,"type":"function"}];

const peopleContract = ETHEREUM_PROVIDER.eth.contract(ABI).at(ADDRESS);

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      firstNames: [],
      lastNames:[],
      ages: [],
      userFirst: '',
      userLast: '',
      userAge: undefined
    }
  }

  // can see that our provider is running when the app loads
  componentWillMount() {
    var data = peopleContract.getPeople();
    console.log(data);
    this.setState({
      firstNames: String(data[0]).split(','),
      lastNames: String(data[1]).split(','),
      ages: String(data[2]).split(',')
    })
  }

  render() {

    let tableRows = [];
    _.each(this.state.firstNames, (value, index) => {

      tableRows.push(
        <tr key={index}>
          <td>{this.state.firstNames[index]}</td>
          <td>{this.state.lastNames[index]}</td>
          <td>{this.state.ages[index]}</td>
        </tr>
      )

    })

    return (
      <div className="App">
        <div className="App-header">
          <form onSubmit={this.postToBlock}>
            <label>
              First Name:
              <input type="text" value={this.state.userFirst} />
              Last Name:
              <input type="text" value={this.state.userLast} />
              Age:
              <input type="text" value={this.state.userAge} />
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
