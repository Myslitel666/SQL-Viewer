<script lang="ts">
	let { children } = $props();
</script>

<div class="app">
	<p>Hello, Vercel</p>
	<main>
		{@render children()}
	</main>
</div>