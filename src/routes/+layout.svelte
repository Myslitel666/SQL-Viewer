<script lang="ts">
	let { children } = $props();
</script>

<div class="app">
	<p>Hello, Vercel 2</p>
	<main>
		{@render children()}
	</main>
</div>