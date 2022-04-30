from flask import Flask, json, request

from web3 import Web3
from solcx import install_solc
install_solc(version='latest')

from solcx import compile_source


w3 = Web3(Web3.EthereumTesterProvider())

dmv_account = w3.eth.accounts[0]

w3.eth.default_account = dmv_account


user_address_dict = {}

global counter

counter = 1

compiled_sol = compile_source(
    '''
    pragma solidity >0.5.0;

    contract Greeter {
        string public data;

        constructor() public {
            data = '';
        }

        function setData(string memory _data) public {
            data = _data;
        }

        function getData() view public returns (string memory) {
            return data;
        }
    }
    ''',
    output_values=['abi', 'bin']
)


contract_id, contract_interface = compiled_sol.popitem()

bytecode = contract_interface['bin']

abi = contract_interface['abi']

DataSetter = w3.eth.contract(abi=abi, bytecode=bytecode)

tx_hash = DataSetter.constructor().transact()

tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)

dataSetter = w3.eth.contract(
    address=tx_receipt.contractAddress,
    abi=abi
)

# Setting a standard digitized document, in replace of populating many
tx_hash = dataSetter.functions.setData('This is a vital document stored on the blockchain.').transact()

# Looks up the user address or creates a new one if it does not exist
def getUserAddress(identifier):
    # c = counter
    global counter
    for i in user_address_dict:
        if i == identifier:
            return user_address_dict[i]

    # if w3.eth.get_balance(w3.eth.accounts[c]) < 5000000000000000000:
    #     counter += 1

    user_account = w3.eth.accounts[counter]
    counter += 1    

    user_address_dict[identifier] = user_account

    return user_account
    
# Sets the data of the smart contract from the specified user to the dmv account
def addToChain(identifier, data):
    user_address = getUserAddress(identifier)
    
    if 'doc_name' in data:
        return dataSetter.functions.getData().call()

    tx_hash = dataSetter.functions.setData(data).transact({
        'from': user_address,
        'to': dmv_account
    })
    tx_receipt = 0
    tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
    print(data)
    print(tx_receipt)
    if tx_receipt != 0:
        return ["SUCCESS", tx_receipt, data]

    return ["FAILURE", tx_receipt, data]



api = Flask(__name__)

@api.route('/addToChain', methods=['GET'])
def get_message():
    output = addToChain(request.args['identifier'], request.args['data'])
    return str(output)

if __name__ == '__main__':
    api.run(debug=True,host='0.0.0.0',port=5000)