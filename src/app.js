App = {

  contracts: {},

  load: async () => {
    await App.loadWeb3()
    await App.loadContract()
    await App.renderAccounts()
    await App.render()
    await App.renderVoters()
  },

  // https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
  loadWeb3: async () => {
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider
      web3 = new Web3(web3.currentProvider)
    } else {
      window.alert("Please connect to Metamask.")
    }
    // Modern dapp browsers...
    if (window.ethereum) {
      window.web3 = new Web3(ethereum)
      try {
        // Request account access if needed
        await ethereum.enable()
        // Acccounts now exposed
        web3.eth.sendTransaction({/* ... */ })
      } catch (error) {
        // User denied account access...
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = web3.currentProvider
      window.web3 = new Web3(web3.currentProvider)
      // Acccounts always exposed
      web3.eth.sendTransaction({/* ... */ })
    }
    // Non-dapp browsers...
    else {
      console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  },

  loadContract: async () => {
    // Load a JavaScript version of teh smart contract
    const VotersContract = await $.getJSON('ListVoters.json')
    App.contracts.ListVoters = TruffleContract(VotersContract)
    App.contracts.ListVoters.setProvider(App.web3Provider)

    App.VotersContract = await App.contracts.ListVoters.deployed()
    console.log(App.VotersContract)
    const voterNumber = await App.VotersContract.voter
    console.log()
  },

  renderAccounts: async () => {
    App.account = web3.eth.accounts[0]
    // const VotersContract = await $.getJSON('ListVoters.json')
    $('#account').html("Address deployed to: " + App.account)
  },

  render: async () => {
    const voterNumber = await App.VotersContract.voterNumber()
    console.log(voterNumber)
    $('#voterNumber').html(voterNumber)

    //for some reason this voter number doesn't render find out why...
  },

  addVoter: async () => {
    // const age = $('age').val()
    const name = $('#name').val()
    const voted = false
    // await App.ListVoters.addVoter(age, name, voted)
    await App.VotersContract.addVoter(name)
    window.location.reload()
  },

  renderVoters: async () => {
    const voterCount = await App.ListVoters.voterNumber()

    for (var i = 1; i <= 7; i++) {
      const voter = await App.ListVoters.voters(i)
      const voterAge = voter[0].toNumber()
      const voterName = voter[1]
      const voterStatus = voter[2]

      // Create the HTML for the task
      // const 
      $('.votername').html(voter(i))
      console.log(i)
    }
  },

  addOneVoter: async () => {
    // const oneNameContent = $('#jinaMoja').val()
    // await App.VotersContract.addVoterName(oneNameContent)
    // window.location.reload()

  },

  renderVoters: async () => {
    // Display the details of the registered voters
    const voterNumber = await App.VotersContract.voterNumber()
    const $voterTemplate = $('.voterTemplate')

    for (var i = 0; i <= 7; i++) {
      const voters = await App.VotersContract.voters(i)
      const voterId = voters[0].toNumber()
      const voterAge = voters[1]
      const voterName = voters[2][1]
      const voterStatus = voters[3]
      console.log(voterAge)

      // Create the HTML for the task
      const $newVoterTemplate = $voterTemplate.clone()
      $newVoterTemplate.find('.voterName').html(voters)

      $('.voterName').html(voters)
      // const 
    }
  }
}

$(() => {
  $(window).load(() => {
    App.load()
  })
})
