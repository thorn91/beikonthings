<script lang="ts">
	export let data;
</script>

<svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
</svelte:head>

<div>
	<pre>{JSON.stringify(data, null, 2)}</pre>
</div>
