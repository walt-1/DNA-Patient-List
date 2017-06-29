DNA Electronic Medical Record 

After cloning the Repo : 

1. open a terminal and run `tesrpc` [ `-s 'test'` flags will always create the same account addresses ]

1. open a separate terminal window, locate to the `blockchain` folder and run `truffle migrate` to deploy the contracts onto your testrpc.

1. find the hash associated with `People: ` in the migration log

1. Then locate to the root of the app and run `npm start` to serve on http://localhost:3000

* Recommend MetaMask Chrome extension to access private network on http://localhost:8545
