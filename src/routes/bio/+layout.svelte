<script>
	import Navbar from '../../components/Navbar.svelte';
	import '../../app.css';
</script>

<main>
	<div class="flex justify-center text-center">
		<div class="flex w-5/6 flex-col">
			<div class="navbar sticky top-0 z-10 bg-gray-100">
				<Navbar />
			</div>
			<div class="content">
				<slot transition="opacity, 500ms, 250ms" />
			</div>
		</div>
	</div>
</main>
