<script>
	import imgHamburger from '$lib/image/hamburger.svg';
	let isMobileMenuOpen = false;

	function toggleMobileMenu() {
		isMobileMenuOpen = !isMobileMenuOpen;
	}

	function closeMobileMenu() {
		isMobileMenuOpen = false;
	}

	const menuItems = [
		{ label: 'Home', href: '/bio' },
		{ label: 'Story', href: '/bio/story' },
		{ label: 'Portfolio', href: '/bio/cv' },
		{ label: 'Project', href: '/bio/project' },
		{ label: 'Blog', href: '/bio/blog' }
	];
</script>

<nav class="m-2 relative">
	<div class="flex justify-center z-20">
		<div class="block sm:hidden">
			<button
				class="text-black hover:text-sky-600 p-2 focus:outline-none"
				on:click={toggleMobileMenu}
			>
				<img src={imgHamburger} alt="hamburger" class="w-12 h-12" />
			</button>
		</div>
		<div class="hidden sm:block flex-wrap justify-center self-center">
			{#each menuItems as item (item.href)}
				<a
					href={item.href}
					on:click={closeMobileMenu}
					class="w-full sm:w-1/2 md:w-1/4 lg:w-1/6 p-2 m-2 bg-sky-200 hover:bg-sky-300"
					>{item.label}</a
				>
			{/each}
		</div>
	</div>
	{#if isMobileMenuOpen}
		<div
			class="fixed top-0 right-0 bottom-0 bg-white bg-opacity-80 w-full sm:hidden shadow-lg transform translate-x-0 transition-transform duration-300 ease-in-out"
			style="z-index: 10;"
		>
			<button
				class="absolute top-5 right-5 text-sky-600 hover:text-sky-800"
				on:click={closeMobileMenu}
			>
				<span class="text-3xl">X</span>
			</button>
			<div class="p-4 text-center mt-8">
				{#each menuItems as item (item.href)}
					<a
						href={item.href}
						on:click={closeMobileMenu}
						class="block p-2 text-sky-800 hover:text-sky-600">{item.label}</a
					>
				{/each}
			</div>
		</div>
	{/if}
</nav>
