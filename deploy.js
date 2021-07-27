const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { bytecode, contractInterface } = require('./compile');
const provider = new HDWalletProvider(
    'attitude noodle orange lemon middle define push dilemma hat effort spike brief',
    'https://rinkeby.infura.io/v3/859013a13aea48a297df59fa9b98a9b4'
    );

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from', accounts[0]);
    const contract = await new web3.eth.Contract(JSON.parse(contractInterface))
        .deploy({data: bytecode, arguments: ['hello']})
        .send({from: accounts[0], gas: 1000000});

    console.log(contract.options.address);
}

console.log(web3.eth)
deploy();
