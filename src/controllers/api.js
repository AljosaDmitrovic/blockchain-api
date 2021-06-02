const axios = require('axios');
const jwt = require('jsonwebtoken');
let ACCESS_TOKEN = "mili";

function makeGetRequest(url) {
    return (new Promise(async (resolve, reject) => {
        try {
            await axios.get(url).then((response) => { resolve(response.data); })
        } catch(err) {
            reject(err);
        };
    }));
}

function makePostRequest(url, body) {
    return (new Promise(async (resolve, reject) => {
        try {
            await axios.post(url, body).then((response) => { resolve(response.data); })
        } catch(err) {
            reject(err);
        };
    }));
}

module.exports = {

    getInfo: async (req, res) => {
        try {
            let info = await makeGetRequest("http://serv2.xyz.io:8888/v1/chain/get_info").catch(reason => { throw reason; });
            res.status(201).json(info)
        } catch(err) {
            res.status(400).json(err);
        }
    },

    getBlock: async (req, res) => {
        try {
            let info = await makePostRequest("http://serv2.xyz.io:8888/v1/chain/get_block", { 
                block_num_or_id: req.params.blockNum 
            })
            .catch(reason => { throw reason; });
            res.status(201).json(info)
        } catch(err) {
            res.status(400).json(err);
        }
    },

    getAccount: async (req, res) => {
        try {
            let info = await makePostRequest("http://serv2.xyz.io:8888/v1/chain/get_account", { 
                account_name: req.params.accountName 
            })
            .catch(reason => { throw reason; });
            res.status(201).json(info)
        } catch(err) {
            res.status(400).json(err);
        }
    },

    getAbi: async (req, res) => {
        try {
            let info = await makePostRequest("http://serv2.xyz.io:8888/v1/chain/get_abi", { 
                account_name: req.params.accountName 
            })
            .catch(reason => { throw reason; });
            res.status(201).json(info)
        } catch(err) {
            res.status(400).json(err);
        }
    },

    getCurrencyBalance: async (req, res) => {
        try {
            let info = await makePostRequest("http://serv2.xyz.io:8888/v1/chain/get_currency_balance", { 
                code: "ienio.token",
                account: req.params.accountName,
                symbol: "IEN"
            })
            .catch(reason => { throw reason; });
            res.status(201).json(info)
        } catch(err) {
            res.status(400).json(err);
        }
    },

    getCurrencyStats: async (req, res) => {
        try {
            let info = await makePostRequest("http://serv2.xyz.io:8888/v1/chain/get_currency_stats", { 
                code: "ienio.token",
                symbol: "IEN"
            })
            .catch(reason => { throw reason; });
            res.status(201).json(info)
        } catch(err) {
            res.status(400).json(err);
        }
    },

    getProducers: async (req, res) => {
        try {
            let info = await makePostRequest("http://serv2.xyz.io:8888/v1/chain/get_producers", { 
                limit: "10",
                lower_bound: 2,
                json: true
            })
            .catch(reason => { throw reason; });
            res.status(201).json(info)
        } catch(err) {
            res.status(400).json(err);s
        }
    },
    // 8a7f9157598f9c6a416fa5afdbdb6aa5abfe32201fe24d4a290f035a37fd5b24
    // 3
    getTransaction: async (req, res) => {
        try {
            let info = await makePostRequest("http://serv2.xyz.io:8888/v1/history/get_transaction", { 
                id: req.params.id,
                block_num_hint: req.params.blockNum
            })
            .catch(reason => { throw reason; });
            res.status(201).json(info)
        } catch(err) {
            res.status(400).json(err);
        }
    },

    getAllTransactionsFromBlock: async (req, res) => {
        try {
            let transactionList = [];
        
            let blockInfo = await makePostRequest("http://serv2.xyz.io:8888/v1/chain/get_block", { block_num_or_id: req.params.blockNum })
            .catch(reason => { throw reason; });

            for(let tx of blockInfo.transactions) {
                transactionList.push(tx);
            }

            res.status(201).json(transactionList);
        } catch(err) {
            res.status(400).json(err);
        }
    },

    getLastFour: async (req, res) => {
        try {        
            let info = await makeGetRequest("http://serv2.xyz.io:8888/v1/chain/get_info").catch(reason => { throw reason; });
            let blocks = [];
            let max = info.head_block_num;
            for(let i=0; i<4; i++) {
                let blockInfo = await makePostRequest("http://serv2.xyz.io:8888/v1/chain/get_block", { 
                    block_num_or_id: max
                }).catch(reason => { throw reason; });
                blocks.push(blockInfo);
                max--;
            }
            console.log(blocks)
            res.status(201).json(blocks);
        } catch(err) {
            res.status(400).json(err);
        }
    },

    getTransaction30: async (req, res) => {
        try {
            let transactionList = [];
        
            let info = await makeGetRequest("http://serv2.xyz.io:8888/v1/chain/get_info").catch(reason => { throw reason; });
            let max = info.head_block_num;

            while(transactionList.length < 30) {
                let blockInfo = await makePostRequest("http://serv2.xyz.io:8888/v1/chain/get_block", { 
                    block_num_or_id: max
                }).catch(reason => { throw reason; });
                for(let tx of blockInfo.transactions) {
                    transactionList.push(tx);
                }
                max--;
                console.log(transactionList.length);
            }
            res.status(201).json(transactionList);
        } catch(err) {
            res.status(400).json(err);
        }
    },
    register: (req, res) => {
      let admin = {
          pass: "asd"
      }
        if(req.headers['pass'] == admin.pass)
        jwt.sign({admin}, ACCESS_TOKEN, (err, token) => {
            res.json({
                token
            })
        }) 
        else
        res.json({
            error: "Password not valid"
        })

    }
};