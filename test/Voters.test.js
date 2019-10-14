const Voters = artifacts.require('./ListVoters.sol')

contract('Voters', (accounts) => {
    before(async () => {
        this.voters_deployed = await Voters.deployed()
    })

    it('deployed successfully', async () => {
        const address = await this.voters_deployed.address
        assert.notEqual(address, 0x0)
        assert.notEqual(address, null)
        assert.notEqual(address, undefined)
        assert.notEqual(address, '')
    })
})