<script>
	import img1 from '$lib/image/work-1.jpg';
	import img2 from '$lib/image/work-2.jpg';
	import img3 from '$lib/image/work-3.jpg';
	import img4 from '$lib/image/work-4.jpg';

	const data = [
		{
			img: img1,
			title: 'BIP39 Mnemonic',
			text: 'Implementation of BIP39'
		},
		{
			img: img2,
			title: 'Kewr Dashboard',
			text: 'Dashboard for interacting with cosmos ecosystem'
		},
		{
			img: img3,
			title: 'ProtoMailer',
			text: 'Mail Daemon for client'
		},
		{
			img: img4,
			title: 'Pick it',
			text: 'Communication tool without server [concept]'
		},
		{
			img: img1,
			title: 'EVM ABI client',
			text: 'Read/Write Contract interact helper for EVM-based contract'
		}
	];

	let currentSlide = 0;

	function nextSlide() {
		currentSlide = (currentSlide + 1) % data.length;
	}

	function prevSlide() {
		currentSlide = (currentSlide - 1 + data.length) % data.length;
	}
</script>

<main>
	<div class="carousel relative overflow-hidden">
		<div
			class="left-arrow absolute top-1/2 transform -translate-y-1/2 text-3xl cursor-pointer transition-transform duration-200 left-4"
			on:click={prevSlide}
		>
			&larr;
		</div>
		<div class="svg-container flex items-center justify-center">
			<div
				class="image-overlay absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black opacity-50 pointer-events-none"
			/>
			<img src={data[currentSlide].img} alt={data[currentSlide].title} class="w-3/4 h-3/4" />
			<div
				class="text-overlay absolute bottom-4 left-4 text-white font-bold text-2xl pointer-events-none"
			>
				{data[currentSlide].title}
				<p class="text-sm">{data[currentSlide].text}</p>
			</div>
		</div>
		<div
			class="right-arrow absolute top-1/2 transform -translate-y-1/2 text-3xl cursor-pointer transition-transform duration-200 right-4"
			on:click={nextSlide}
		>
			&rarr;
		</div>
		<div class="slide-indicators absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white">
			{#each data as item, i (item)}
				<span class="mx-1 text-xl">{i === currentSlide ? '●' : '○'}</span>
			{/each}
		</div>
	</div>
</main>
