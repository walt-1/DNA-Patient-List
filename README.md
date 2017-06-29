DNA Patient List 

After cloning the Repo : 

1. open a terminal and run `testrpc` [ `-s 'test'` flags will always create the same account addresses ]

1. open a separate terminal window, locate to the `blockchain` folder and run `truffle migrate` to deploy the contracts onto your testrpc.

1. find the hash associated with `People: ` in the migration log, copy and paste to set `const ADDRESS = '{your-hash-here}' ` in the src/App.js file

1. Then locate to the root of the app and run `npm install` 

1. run `npm start` to serve on http://localhost:3000

* Requires MetaMask Chrome extension to access private network on http://localhost:8545
