<script>
	import { abiJson } from './contract';
	import { chainsData } from './chainData';

	let chainId;
	const chainSelection = document.getElementById('chain-selection');
	const rpcUrlInput = document.getElementById('rpc-url-input');

	// Populate the chain-selection dropdown with options, including the default option
	const defaultOption = document.createElement('option');
	defaultOption.text = 'Select a Chain';
	defaultOption.value = ''; // No value for the default option
	chainSelection.appendChild(defaultOption);

	chainsData.forEach((chain) => {
		const option = document.createElement('option');
		option.value = chain.value;
		option.textContent = chain.name;
		chainSelection.appendChild(option);
	});

	// Event listener to update RPC URLs based on selected chain
	chainSelection.addEventListener('change', function () {
		const selectedChain = chainSelection.value;
		const selectedChainData = chainsData.find((chain) => chain.value === selectedChain);
		const rpcUrlsForChain = selectedChainData ? selectedChainData.rpc : [];

		// Clear existing options
		rpcUrlInput.innerHTML = '';

		// Create new options based on the selected chain
		rpcUrlsForChain.forEach((url) => {
			const option = document.createElement('option');
			option.value = url;
			option.textContent = url;
			rpcUrlInput.appendChild(option);
		});

		// Set the chainId variable to the selected chain's chainid
		const preChainId = selectedChainData.chainId;
		chainId = '0x' + preChainId.toString(16);
	});

	// Initial population of RPC URLs based on the default selected chain
	const initialChain = chainSelection.value;
	const initialChainData = chainsData.find((chain) => chain.value === initialChain);
	const initialRpcUrls = initialChainData ? initialChainData.rpc : [];
	initialRpcUrls.forEach((url) => {
		const option = document.createElement('option');
		option.value = url;
		option.textContent = url;
		rpcUrlInput.appendChild(option);
	});

	// Initialize web3 using MetaMask provider
	const connectButton = document.getElementById('connect-button');
	const addressDisplay = document.getElementById('address-display');
	const balanceDisplay = document.getElementById('balance-display');
	const chainIdDisplay = document.getElementById('chainid-display');
	let accounts;

	// Create a function to replace the connect button with the disconnect button
	function replaceConnectButtonWithDisconnectButton() {
		// Create the disconnect button
		const disconnectButton = document.createElement('button');
		disconnectButton.textContent = 'Disconnect';
		disconnectButton.addEventListener('click', () => {
			// Replace disconnect button with connect button
			disconnectButton.parentNode.replaceChild(connectButton, disconnectButton);

			// Hide balance, address, and chain ID information
			addressDisplay.textContent = '';
			balanceDisplay.textContent = '';
			chainIdDisplay.textContent = '';
		});

		// Replace connect button with disconnect button
		connectButton.parentNode.replaceChild(disconnectButton, connectButton);
	}

	// Add an event listener to the connect button
	connectButton.addEventListener('click', async () => {
		try {
			// Check if MetaMask is installed
			if (typeof window.ethereum !== 'undefined') {
				// Get the current chain ID
				const currentChainId = await ethereum.request({ method: 'eth_chainId' });

				const hexChainId = chainId.toString(16);
				const convertedChainId = '0x' + hexChainId;

				// Check if the current chain ID matches the desired chain ID
				if (currentChainId !== convertedChainId) {
					// Request to change the chainId
					await ethereum.request({
						method: 'wallet_switchEthereumChain',
						params: [
							{
								chainId: chainId
							}
						]
					});
				}

				// If the user rejected the request, don't execute anything
				if (ethereum.selectedAddress === null) {
					return;
				}

				// Continue with the rest of the code...

				// Initialize web3 using MetaMask provider
				const web3 = new Web3(window.ethereum);

				// Get the user's balance
				const balance = await web3.eth.getBalance(ethereum.selectedAddress);

				// Display user's address on the page
				addressDisplay.textContent = `Connected to Address: ${ethereum.selectedAddress}`;

				// Display the balance on the page
				balanceDisplay.textContent = `Balance: ${web3.utils.fromWei(balance, 'ether')} ETH`;

				// Convert the chain ID to a string
				const metamaskChainIdString = currentChainId.toString();

				// Set the text content of the chainIdDisplay element
				chainIdDisplay.textContent = `Chain ID: ${metamaskChainIdString}`;

				// Replace connect button with disconnect button
				replaceConnectButtonWithDisconnectButton();
			} else {
				// MetaMask is not installed, show a message or provide a download link
				alert('MetaMask is not installed. Please install MetaMask to continue.');
			}
		} catch (error) {
			if (error.code === 4001) {
				// The user rejected the request
				// Cancel the MetaMask connection
				ethereum.request({
					method: 'eth_disconnect'
				});
				return;
			} else {
				// An unexpected error occurred
				console.error('MetaMask connection error:', error);
				alert('An error occurred while connecting to MetaMask. Check the console for details.');
			}
		}
	});

	// const web3 = new Web3(document.getElementById('rpc-url-input').value);
	let readFunctions = [];
	let writeFunctions = [];

	// Reusable function to create input fields for function parameters
	function createParamInputFields(formId, functionInputs) {
		const inputForm = document.getElementById(formId);
		inputForm.innerHTML = '';
		functionInputs.forEach((param) => {
			const label = document.createElement('label');
			label.textContent = `${param.name}: `;
			const input = document.createElement('input');
			input.type = 'text';
			input.id = `${formId}-param-input-${param.name}`;
			label.appendChild(input);
			inputForm.appendChild(label);
		});
	}

	// Event handler for the "Load Contract" button
	document.getElementById('load-contract-button').addEventListener('click', async () => {
		const web3 = new Web3(document.getElementById('rpc-url-input').value);
		try {
			const abi = JSON.parse(document.getElementById('abi-input').value);
			const contractAddress = document.getElementById('contract-address-input').value;
			const contract = new web3.eth.Contract(abi, contractAddress);

			readFunctions = abi.filter(
				(item) =>
					item.type === 'function' &&
					(item.constant === true || (item.outputs && item.outputs.length > 0))
			);

			writeFunctions = abi.filter((item) => item.type === 'function' && item.constant !== true);

			populateFunctionSelect('function-select', readFunctions);
			populateFunctionSelect('write-function-select', writeFunctions);

			document.getElementById('read-button').disabled = false;
			document.getElementById('write-button').disabled = false;

			createParamInputFields('function-params-form', []);
			createParamInputFields('write-function-params-form', []);

			document.getElementById('function-select').value = '';
			document.getElementById('write-function-select').value = '';
		} catch (error) {
			console.error('Error:', error);
			alert('An error occurred. Check the console for details.');
		}
	});

	// Function to populate a function select dropdown
	function populateFunctionSelect(selectId, functions) {
		const functionSelect = document.getElementById(selectId);
		functionSelect.innerHTML = '';
		const defaultOption = document.createElement('option');
		defaultOption.value = '';
		defaultOption.text = 'Select a Function';
		defaultOption.disabled = true;
		defaultOption.selected = true;
		functionSelect.appendChild(defaultOption);
		functions.forEach((func) => {
			const option = document.createElement('option');
			option.value = func.name;
			option.text = func.name;
			functionSelect.appendChild(option);
		});
	}

	// Event handler for function select change in the read section
	document.getElementById('function-select').addEventListener('change', () => {
		const functionName = document.getElementById('function-select').value;
		const abi = JSON.parse(document.getElementById('abi-input').value);
		const selectedFunction = abi.find((item) => item.name === functionName);
		createParamInputFields('function-params-form', selectedFunction.inputs || []);
	});

	// Event handler for function select change in the write section
	document.getElementById('write-function-select').addEventListener('change', () => {
		const functionName = document.getElementById('write-function-select').value;
		const abi = JSON.parse(document.getElementById('abi-input').value);
		const selectedFunction = abi.find((item) => item.name === functionName);
		createParamInputFields('write-function-params-form', selectedFunction.inputs || []);
	});

	// Event handler for the "Write Data" button
	document.getElementById('write-button').addEventListener('click', async () => {
		try {
			const functionName = document.getElementById('write-function-select').value;
			const abi = JSON.parse(document.getElementById('abi-input').value);
			const contractAddress = document.getElementById('contract-address-input').value;

			// Use the userAddress obtained from MetaMask
			const userAddress = selectedAddress; // Replace with your MetaMask integration logic

			const selectedFunction = abi.find((item) => item.name === functionName);
			const functionInputs = selectedFunction.inputs || [];
			const inputValues = [];

			for (const param of functionInputs) {
				const inputValue = document.getElementById(
					`write-function-params-form-param-input-${param.name}`
				).value;
				inputValues.push(inputValue);
			}

			// Continue with your write function using userAddress
			const web3 = new Web3(window.ethereum);

			// Estimate gas cost
			const gasCost = await web3.eth.estimateGas({
				to: contractAddress,
				data: web3.eth.abi.encodeFunctionCall(selectedFunction, inputValues),
				from: userAddress
			});

			// Check user's balance
			const balance = await web3.eth.getBalance(userAddress);

			if (balance < gasCost) {
				alert('Insufficient balance to cover the gas cost.');
				return;
			}

			// Build and send the transaction
			const txObject = {
				to: contractAddress,
				data: web3.eth.abi.encodeFunctionCall(selectedFunction, inputValues),
				gas: gasCost,
				from: userAddress
			};

			const txHash = await web3.eth.sendTransaction(txObject);
			const txHashString = txHash.toString();
			const writeResultDisplay = document.getElementById('write-result-display');
			writeResultDisplay.innerHTML = `Transaction Hash: ${txHashString}`;
		} catch (error) {
			console.error('Error:', error);
			alert('An error occurred. Check the console for details.');
		}
	});

	// Event handler for the "Read Data" button
	document.getElementById('read-button').addEventListener('click', async () => {
		try {
			const web3 = new Web3(document.getElementById('rpc-url-input').value);

			const functionName = document.getElementById('function-select').value;
			const abi = JSON.parse(document.getElementById('abi-input').value);
			const contractAddress = document.getElementById('contract-address-input').value;
			const contract = new web3.eth.Contract(abi, contractAddress);
			const selectedFunction = abi.find((item) => item.name === functionName);
			const functionInputs = selectedFunction.inputs || [];
			const inputValues = [];

			for (const param of functionInputs) {
				const inputValue = document.getElementById(
					`function-params-form-param-input-${param.name}`
				).value;
				inputValues.push(inputValue);
			}

			const result = await contract.methods[functionName](...inputValues).call();
			const resultDisplay = document.getElementById('result-display');
			resultDisplay.innerHTML = '';

			if (typeof result === 'object') {
				const resultString = JSON.stringify(result, null, 2);
				resultDisplay.textContent = `Result:\n${resultString}`;
			} else {
				resultDisplay.textContent = `Result: ${result}`;
			}
		} catch (error) {
			console.error('Error:', error);
			alert('An error occurred. Check the console for details.');
		}
	});
</script>

<!-- Header -->
<h1 class="title">EVM Contract Interaction</h1>

<!-- Contract Setup Section -->
<div>
	<h2>Contract Setup</h2>
	<label for="abi-input">ABI JSON:</label>
	<textarea id="abi-input" rows="5" cols="50" />

	<!-- Chain Selection -->
	<div>
		<label for="chain-selection">Choose Chain:</label>
		<select id="chain-selection" />
		<p id="chain-id-display" />
	</div>

	<!-- RPC URL Selection -->
	<div>
		<label for="rpc-url-input">RPC URL:</label>
		<select id="rpc-url-input" />
		<p id="rpc-url-display" />
	</div>

	<!-- Contract Address Input -->
	<div>
		<label for="contract-address-input">Contract Address:</label>
		<input type="text" id="contract-address-input" value="" />
	</div>

	<!-- Load Contract Button -->
	<button id="load-contract-button" class="btn-load">Load Contract</button>
</div>

<!-- Read Section -->
<div>
	<h2>Read Section</h2>
	<label for="function-select">Select a Function:</label>
	<select id="function-select">
		<option value="" disabled selected>Select a Function</option>
		<!-- Default option -->
	</select>
	<form id="function-params-form" />
	<button id="read-button" disabled>Read Data</button>
	<div>
		<h3>Result:</h3>
		<div id="result-display" />
	</div>
</div>

<!-- Write Section -->
<div>
	<h2>Write Section</h2>

	<!-- Connect Wallet Button -->
	<button id="connect-button">Connect Wallet</button>

	<!-- Ethereum Address Display -->
	<div class="wallet-info">
		<p class="header-address" />
		<p id="address-display" class="address-display" />
		<p class="header-balance" />
		<p id="balance-display" class="balance-display" />
		<p class="header-chainid" />
		<p id="chainid-display" class="chainid-display" />
	</div>

	<!-- Select Write Function -->
	<label for="write-function-select">Select a Function:</label>
	<select id="write-function-select">
		<option value="" disabled selected>Select a Function</option>
		<!-- Default option -->
	</select>
	<form id="write-function-params-form" />
	<button id="write-button" disabled>Write Data</button>
	<div>
		<h3>Transaction Hash:</h3>
		<div id="write-result-display" />
	</div>
</div>
