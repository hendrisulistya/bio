// Define a combined data structure for chains and RPC URLs
export const chainsData = [
	{
		name: 'Ethereum',
		value: 'ethereum',
		chainId: 1,
		rpc: [
			'https://eth.llamarpc.com',
			'https://rpc.ankr.com/eth',
			'https://uk.rpc.blxrbdn.com',
			'https://eth.drpc.org'
		]
	},
	{
		name: 'Binance Smart Chain',
		value: 'binance',
		chainId: 56,
		rpc: [
			'https://bsc-dataseed.binance.org/',
			'https://binance.llamarpc.com',
			'https://bsc-dataseed1.ninicoin.io',
			'https://bsc.publicnode.com'
		]
	},
	{
		name: 'Evmos',
		value: 'evmos',
		chainId: 9001,
		rpc: [
			'https://eth.bd.evmos.org:8545',
			'https://evmos-mainnet.public.blastapi.io',
			'https://evmos-evm.publicnode.com'
		]
	},
	{
		name: 'Polygon',
		value: 'polygon',
		chainId: 137,
		rpc: [
			'https://eth.bd.evmos.org:8545',
			'https://evmos-mainnet.public.blastapi.io',
			'https://evmos-evm.publicnode.com'
		]
	},
	{
		name: 'Arbitrum',
		value: 'arbitrum',
		chainId: 42161,
		rpc: [
			'https://eth.bd.evmos.org:8545',
			'https://evmos-mainnet.public.blastapi.io',
			'https://evmos-evm.publicnode.com'
		]
	},
	{
		name: 'Canto',
		value: 'canto',
		chainId: 7700,
		rpc: [
			'https://eth.bd.evmos.org:8545',
			'https://evmos-mainnet.public.blastapi.io',
			'https://evmos-evm.publicnode.com'
		]
	}
];
