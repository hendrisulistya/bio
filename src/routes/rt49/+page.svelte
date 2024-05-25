<script>
	// @ts-nocheck

	import avatar from '$lib/image/people.svg';

	// @ts-nocheck

	let data = [
		{
			tanggal: '02-07-2023',
			keterangan: 'MEJA',
			pemasukan: 0,
			pengeluaran: 600000
		},
		{
			tanggal: '02-07-2023',
			keterangan: 'BAHAN DINGKLIK',
			pemasukan: 0,
			pengeluaran: 300000
		},
		{
			tanggal: '02-07-2023',
			keterangan: 'PAKU',
			pemasukan: 0,
			pengeluaran: 30000
		},
		{
			tanggal: '24-07-2023',
			keterangan: 'KAS PAKDE JAN IJOL PERKAKAS',
			pemasukan: 100000,
			pengeluaran: 0
		},
		{
			tanggal: '24-07-2023',
			keterangan: 'UANG MASUK SENG',
			pemasukan: 500000,
			pengeluaran: 0
		},
		{
			tanggal: '04-09-2023',
			keterangan: 'BELI LAMPU 80WATT PEREMPATAN RT49',
			pemasukan: 0,
			pengeluaran: 160000
		},
		{
			tanggal: '24-09-2023',
			keterangan: 'GAYUNG STENLIS',
			pemasukan: 0,
			pengeluaran: 35000
		},
		{
			tanggal: '24-09-2023',
			keterangan: 'KANEBO 2 BIJI',
			pemasukan: 0,
			pengeluaran: 36000
		},
		{
			tanggal: '24-09-2023',
			keterangan: 'SARINGAN TEH 2',
			pemasukan: 0,
			pengeluaran: 25000
		},
		{
			tanggal: '11-10-2023',
			keterangan: 'KAS BP. SARIMAN',
			pemasukan: 250000,
			pengeluaran: 0
		},
		{
			tanggal: '13-10-2023',
			keterangan: 'KAS TENDA',
			pemasukan: 750000,
			pengeluaran: 0
		},
		{
			tanggal: '18-11-2023',
			keterangan: 'KAS TENDA',
			pemasukan: 500000,
			pengeluaran: 0
		},
		{
			tanggal: '20-12-2023',
			keterangan: 'KAS SEWA KOMPOR bp Apriyanto',
			pemasukan: 25000,
			pengeluaran: 0
		},
		{
			tanggal: '23-12-2023',
			keterangan: 'KAS Masuk dari Bp PONIMIN',
			pemasukan: 500000,
			pengeluaran: 0
		},
		{
			tanggal: '27-01-2024',
			keterangan: 'KAS TENDA',
			pemasukan: 500000,
			pengeluaran: 0
		},
		{
			tanggal: '27-01-2024',
			keterangan: 'KAS Bpk Ari Adam',
			pemasukan: 30000,
			pengeluaran: 0
		}
	];

	// Function to add comma separators for thousands
	// @ts-ignore
	const addCommas = (number) => {
		return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	};

	// Initialize initialSaldo with a specific value
	let initialSaldo = 1196000;

	// Calculate saldo based on pemasukan and pengeluaran
	data.forEach((item, index) => {
		// @ts-ignore
		item.saldo =
			index === 0
				? initialSaldo + item.pemasukan - item.pengeluaran
				: data[index - 1].saldo + item.pemasukan - item.pengeluaran;
	});

	// Calculate finalSaldo
	// @ts-ignore
	let finalSaldo = data.length > 0 ? data[data.length - 1].saldo : initialSaldo;

	let selectedElement = 'kasrt'; // Default element
	console.log(selectedElement)

</script>

<title>Document</title>
<link
	href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.16/dist/tailwind.min.css"
	rel="stylesheet"
/>

<!-- Navbar -->

<nav
	class="sticky top-0 h-16 border-b z-10 bg-gray-100 py-3 px-4 flex items-center justify-between"
>
	<a class="font-bold text-xl tracking-tight" href="/">Dashboard</a>
	<div class="flex items-center">
		<a class="text-sm px-4 py-2 leading-none rounded-full hover:bg-gray-700" href="/">Setting</a>
	</div>
</nav>

<div class="flex">
	<div class="flex-auto w-1/5">
		<!-- Sidebar -->
		<section class="w-64 min-h-screen bg-white border-r fixed">
			<div class="mt-8 text-center">
				<img
					src={avatar}
					alt=""
					class="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
				/>
				<h5 class="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">Widiamiko</h5>
				<span class="hidden text-gray-400 lg:block">Admin</span>
			</div>
			<ul class="space-y-2 tracking-wide mt-8">
				<li>
					<button on:click={() => selectedElement = 'kasrt'} class="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-5 w-5"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								class="fill-current text-gray-300 group-hover:text-cyan-300"
								fill-rule="evenodd"
								d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z"
								clip-rule="evenodd"
							/>
							<path
								class="fill-current text-gray-600 group-hover:text-cyan-600"
								d="M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H2h2a2 2 0 002-2v-2z"
							/>
						</svg>
						<span class="group-hover:text-gray-700">Kas RT</span>
					</button>
				</li>
				<li>
					<button on:click={() => selectedElement = 'tabungan'} class="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-5 w-5"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								class="fill-current text-gray-600 group-hover:text-cyan-600"
								fill-rule="evenodd"
								d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z"
								clip-rule="evenodd"
							/>
							<path
								class="fill-current text-gray-300 group-hover:text-cyan-300"
								d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z"
							/>
						</svg>
						<span class="group-hover:text-gray-700">Tabungan</span>
					</button>
				</li>
				<li>
					<a href="/" class="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-5 w-5"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								class="fill-current text-gray-600 group-hover:text-cyan-600"
								d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"
							/>
							<path
								class="fill-current text-gray-300 group-hover:text-cyan-300"
								d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"
							/>
						</svg>
						<span class="group-hover:text-gray-700">Other data</span>
					</a>
				</li>
				<li>
					<a href="/" class="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-5 w-5"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								class="fill-current text-gray-300 group-hover:text-cyan-300"
								d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"
							/>
							<path
								class="fill-current text-gray-600 group-hover:text-cyan-600"
								fill-rule="evenodd"
								d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
								clip-rule="evenodd"
							/>
						</svg>
						<span class="group-hover:text-gray-700">Inventaris</span>
					</a>
				</li>
			</ul>
			<div class="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
				<button class="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
						/>
					</svg>
					<span class="group-hover:text-gray-700">Logout</span>
				</button>
			</div>
		</section>
	</div>

	<div class="flex-auto w-4/5">
		{#if selectedElement === 'tabungan'}
		  <!-- Tabungan Element code -->
		  <p>Iki tabungan</p>
		{:else if selectedElement === 'otherdata'}
		  <!-- Other Data Element code -->
		  <p>Iki otherdata</p>
		{:else if selectedElement === 'inventaris'}
		  <!-- Inventaris Element code -->
		  <p>Iki inventaris</p>
		{:else}
		  <!-- Kas RT Element code -->
		  <section class="container mx-auto p-6 font-mono">
			<p class="text-2xl text-bold p-4">KAS RT 49</p>

			<!-- SALDO AWAL  -->
			<div class="flex justify-center mt-4 text-center p-4">
				<table class="w-full table-auto border border-collapse border-gray-300 shadow-md">
					<tr class="bg-gray-200">
						<th class="py-2 border border-gray-300">SALDO AWAL</th>
						<td colspan="4" class="border border-gray-300">{addCommas(initialSaldo)}</td>
					</tr>
				</table>
			</div>

			<div class="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
				<div class="w-full overflow-x-auto">
					<table class="w-full">
						<thead>
							<tr
								class="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600"
							>
								<th class="px-4 py-3">NO</th>
								<th class="px-4 py-3">TANGGAL</th>
								<th class="px-4 py-3">KETERANGAN</th>
								<th class="px-4 py-3 text-black">DEBET</th>
								<th class="px-4 py-3 text-black">KREDIT</th>
								<th class="px-4 py-3">SALDO</th>
							</tr>
						</thead>
						<tbody class="bg-white" id="tableBody">
							{#each data as item, index (index)}
								<tr class="text-gray-700">
									<td class="px-4 py-3 border">
										<div class="flex items-center text-sm">
											<div>
												<p class="font-semibold text-black">{index + 1}</p>
											</div>
										</div>
									</td>
									<td class="px-4 py-3 text-ms font-semibold border">{item.tanggal}</td>
									<td class="px-4 py-3 text-ms font-semibold border">{item.keterangan}</td>
									<td
										class="px-4 py-3 text-sm border {item.pemasukan !== 0 ? 'text-green-600' : ''}"
									>{addCommas(item.pemasukan)}</td>
									<td
										class="px-4 py-3 text-sm border {item.pengeluaran !== 0 ? 'text-red-600' : ''}"
									>{addCommas(item.pengeluaran)}</td>
									<td class="px-4 py-3 text-sm border">{addCommas(item.saldo)}</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
				<!-- SALDO AKHIR row below cashflow-table -->
				<div class="flex justify-center mt-4 text-center">
					<table class="w-full table-auto border border-collapse border-gray-300 shadow-md">
						<tr class="bg-gray-200">
							<th class="py-2 border border-gray-300">SALDO AKHIR</th>
							<td colspan="4" class="border border-gray-300">{addCommas(finalSaldo)}</td>
						</tr>
					</table>
				</div>
			</div>
		</section>

		{/if}
	  </div>
</div>
<!-- Kas RT Element -->

<!-- Tabungan Element -->
<!-- Tabungan Element -->

<!-- Other Data Element -->
<!-- Other Data Element -->

<!-- Inventaris Element -->
<!-- Inventaris Element -->
