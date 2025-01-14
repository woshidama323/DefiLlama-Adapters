const { queryV1Beta1 } = require('../helper/chain/cosmos');
const { transformBalances } = require('../helper/portedTokens')

const chain = 'kava'

async function tvl(_, _1, _2, { api }) {
  const { result: pools } = await queryV1Beta1({ chain, url: '/earn/v1beta1/total_supply' });
  pools.forEach(({ denom, amount }) => api.add(denom, amount, { skipChain: true }))
  return transformBalances(chain, api.getBalances())
}

module.exports = {
  timetravel: false,
  kava: { tvl }
};