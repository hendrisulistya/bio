export const abiJson = [
	{
		inputs: [
			{
				internalType: 'string',
				name: '_patientName',
				type: 'string'
			},
			{
				internalType: 'string',
				name: '_diagnosis',
				type: 'string'
			},
			{
				internalType: 'string',
				name: '_treatment',
				type: 'string'
			}
		],
		name: 'createMedicalRecord',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: '_id',
				type: 'uint256'
			}
		],
		name: 'deleteMedicalRecord',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [],
		stateMutability: 'nonpayable',
		type: 'constructor'
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: '_id',
				type: 'uint256'
			},
			{
				internalType: 'string',
				name: '_diagnosis',
				type: 'string'
			},
			{
				internalType: 'string',
				name: '_treatment',
				type: 'string'
			}
		],
		name: 'updateMedicalRecord',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [],
		name: 'getAllMedicalRecords',
		outputs: [
			{
				components: [
					{
						internalType: 'uint256',
						name: 'id',
						type: 'uint256'
					},
					{
						internalType: 'string',
						name: 'patientName',
						type: 'string'
					},
					{
						internalType: 'string',
						name: 'diagnosis',
						type: 'string'
					},
					{
						internalType: 'string',
						name: 'treatment',
						type: 'string'
					}
				],
				internalType: 'struct MedicalRecordContract.MedicalRecord[]',
				name: '',
				type: 'tuple[]'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: '_id',
				type: 'uint256'
			}
		],
		name: 'getMedicalRecord',
		outputs: [
			{
				internalType: 'uint256',
				name: 'id',
				type: 'uint256'
			},
			{
				internalType: 'string',
				name: 'patientName',
				type: 'string'
			},
			{
				internalType: 'string',
				name: 'diagnosis',
				type: 'string'
			},
			{
				internalType: 'string',
				name: 'treatment',
				type: 'string'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'getTotalMedicalRecords',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			}
		],
		name: 'medicalRecords',
		outputs: [
			{
				internalType: 'uint256',
				name: 'id',
				type: 'uint256'
			},
			{
				internalType: 'string',
				name: 'patientName',
				type: 'string'
			},
			{
				internalType: 'string',
				name: 'diagnosis',
				type: 'string'
			},
			{
				internalType: 'string',
				name: 'treatment',
				type: 'string'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'recordCounter',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			}
		],
		stateMutability: 'view',
		type: 'function'
	}
];

const contractAddress = '0x70fD230107a897545Bad7a1782dC6ca05Aac440e';
let rpcUrl = 'http://eth.bd.evmos.org:8545';
