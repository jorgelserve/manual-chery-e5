<script>
	import MiniSearch from 'minisearch';
	import { onMount } from 'svelte';
	import content from '$lib/data/content.json';

	let q = '';
	let resultados = [];
	let listo = false;
	let minisearch;

	onMount(async () => {
		const res = await fetch('/search.json');
		const docs = await res.json();
		minisearch = new MiniSearch({
			fields: ['text', 'chapter'],
			storeFields: ['page', 'chapter', 'text', 'images'],
			idField: 'page'
		});
		minisearch.addAll(docs);
		listo = true;
	});

	function buscar() {
		if (!minisearch || q.trim().length < 2) {
			resultados = [];
			return;
		}
		resultados = minisearch.search(q, { fuzzy: 0.2, prefix: true }).slice(0, 40);
	}

	function slugDe(titulo) {
		const c = content.chapters.find((x) => x.title === titulo);
		return c ? c.slug : '';
	}
</script>

<svelte:head>
	<title>Buscar · Manual Chery E5</title>
</svelte:head>

<h1>Buscar en el manual</h1>

<input
	class="caja"
	type="search"
	placeholder="Ej: presión de llantas, cinturón de seguridad, fusibles…"
	bind:value={q}
	on:input={buscar}
	on:keydown={(e) => e.key === 'Enter' && buscar()}
	disabled={!listo}
/>

{#if !listo}
	<p class="nota">Cargando índice…</p>
{:else if q.trim().length >= 2}
	<p class="nota">{resultados.length} página(s) encontradas</p>
	<div class="res">
		{#each resultados as r (r.page)}
			<a class="item" href="/capitulo/{slugDe(r.chapter)}/#p{r.page}">
				<span class="cap">{r.chapter} · pág. {r.page}</span>
				{#if r.images.length > 0}
					<span class="imgs">🖼 {r.images.length} ilustración(es)</span>
				{/if}
				<p>{(r.text || '').slice(0, 220)}…</p>
			</a>
		{/each}
		{#if resultados.length === 0}
			<p>Sin resultados para “{q}”.</p>
		{/if}
	</div>
{:else}
	<p class="nota">Escribe al menos 2 caracteres. El índice cubre las 378 páginas.</p>
{/if}

<style>
	h1 {
		font-size: 1.3rem;
		color: #0b3d91;
	}
	.caja {
		width: 100%;
		box-sizing: border-box;
		padding: 0.7rem 1rem;
		font-size: 1rem;
		border: 2px solid #dbeafe;
		border-radius: 10px;
		outline: none;
	}
	.caja:focus {
		border-color: #003fff;
	}
	.nota {
		color: #64748b;
		font-size: 0.85rem;
	}
	.res {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin-top: 0.5rem;
	}
	.item {
		border: 1px solid #e3e8ef;
		border-radius: 8px;
		padding: 0.7rem 0.9rem;
		text-decoration: none;
		color: inherit;
	}
	.item:hover {
		border-color: #003fff;
	}
	.item .cap {
		font-size: 0.75rem;
		color: #003fff;
		font-weight: 600;
	}
	.item .imgs {
		float: right;
		font-size: 0.72rem;
		color: #64748b;
	}
	.item p {
		margin: 0.3rem 0 0;
		font-size: 0.85rem;
		color: #334155;
	}
</style>
