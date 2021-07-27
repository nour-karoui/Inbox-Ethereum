const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const { bytecode, contractInterface } = require('../compile');

let accounts;
let inbox;

beforeEach(async () => {
    // retrieve all accounts
    accounts = await web3.eth.getAccounts()

    //use one account to deploy the smart contract
    inbox = await new web3.eth.Contract(JSON.parse(contractInterface))
        .deploy({ data: bytecode, arguments: ['Hi There!']})
        .send({from: accounts[0], gas: 1000000})
})

describe('Inbox', () => {
    it('should deploy a contract', () => {
        assert.ok(inbox.options.address)
    });

    it('should have a default message', async () => {
       const message = await inbox.methods.message().call();
        assert.strictEqual(message, 'Hi There!');
    });

    it('can update the message', async () => {
        await inbox.methods.setMessage('new message').send({ from: accounts[0] })
        const newMessage = await inbox.methods.message().call();
        assert.strictEqual(newMessage, 'new message');
    })
})
