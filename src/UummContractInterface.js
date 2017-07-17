import UummContract from '../build/contracts/Uumm.json'
import Config from '../truffle-config.js'
import Web3 from 'web3'

class UummContractInterface
{
    constructor()
    {
        var that=this
        this.setupFinished = new Promise(function(resolve, reject)
        {
        
            var {host, port} = Config.networks[process.env.NODE_ENV]
            
            const provider = new Web3.providers.HttpProvider('http://' + host + ':' + port)
            const contract = require('truffle-contract')
            const uummContract = contract(UummContract)

            uummContract.setProvider(provider)
            that.contractDeployedPromise = uummContract.deployed()
            that.contractInstance = {}
            that.accounts = {}

            
            const web3RPC = new Web3(provider)
            web3RPC.eth.getAccounts(function(error, accounts)
            {
                that.accounts = accounts
                that.contractDeployedPromise
                .then(function(instance){
                    that.contractInstance = instance
                    resolve()
                })
            }) 
        })
    }

    isReady()
    {
        return this.setupFinished
    }

    createProject(projectName)
    {
        var that = this

        return new Promise(function (resolve, reject)
        {
            that.contractInstance.CreateProject.estimateGas(projectName)
            .then(function(estimatedGas){
                return that.contractInstance.CreateProject(projectName, {from: that.accounts[0], gas:estimatedGas})
            }).then(function(result) {
                resolve()
            }).catch(function(error){console.error(error)})
        })
    }

    getUserProjects()
    {     
        var that = this
        return new Promise(function (resolve, reject)
        {
            var array = []
            var loadedCount = 0

            that.contractInstance.GetProjectsLength.call(that.accounts[0])
            .then(function(numberOfProjects)
            {
                for(var i=0; i<=numberOfProjects.toNumber(); i++)
                {
                    that.getProjectDetails(that.accounts[0], i)
                    .then(function(details)
                    {
                        array.push(details)
                        loadedCount ++
                        if(loadedCount===numberOfProjects.toNumber())
                            resolve(array)
                    }).catch(function(error){reject(error)})
                }
            
            }).catch(function(error){reject(error)})
        })
    }


    getProjectDetails(creatorAddress, projectId)
    {
        var that = this

        return new Promise(function (resolve, reject)
        {
           that.contractInstance.GetProjectDetails.call(creatorAddress, projectId)
            .then(function(details)
            {
                var projectDetails = {
                    'creator' : details[0],
                    'name' : details[1],
                    'id' : details[2].toNumber(),
                    'creationDate' : new Date (details[3].toNumber()*1000),
                    'totalSupply': details[4].toNumber()
                }
              resolve(projectDetails)
            }).catch(function(error){reject()})
        })         
    }
}

const instance = new UummContractInterface();
export default instance;