<script>
	import content from '$lib/data/content.json';

	const stats = {
		caps: content.chapters.length,
		paginas: content.chapters.reduce((a, c) => a + c.pages.length, 0),
		imgs: content.chapters.reduce(
			(a, c) =>
				a + c.pages.reduce(
					(b, p) => b + p.bloques.filter((x) => x.t === 'img').length, 0),
			0
		)
	};
</script>

<svelte:head>
	<title>Manual Chery E5</title>
</svelte:head>

<header>
	<h1>Manual del Propietario · Chery E5</h1>
	<p class="sub">
		Versión T19CFLEVRHDOM26ES01 · Marzo 2026 · {stats.paginas} páginas ·
		{stats.imgs} ilustraciones en alta definición
	</p>
	<div class="acciones">
		<a class="btn" href="/buscar">🔍 Buscar en el manual</a>
		<a class="btn btn2" href="/pdf">📄 Ver PDF completo</a>
	</div>
</header>

<section class="grilla">
	{#each content.chapters as ch (ch.slug)}
		<a class="card" href="/capitulo/{ch.slug}/">
			<h2>{ch.title}</h2>
			<p>
				Págs. {ch.pageStart}–{ch.pageEnd} · {ch.sections.length} secciones ·
				{ch.pages.reduce((a, p) => a + p.bloques.filter((x) => x.t === 'img').length, 0)} ilustraciones
			</p>
		</a>
	{/each}
</section>

<style>
	header {
		margin-bottom: 2rem;
	}
	h1 {
		font-size: 1.6rem;
		color: #0b3d91;
		margin: 0 0 0.3rem;
	}
	.sub {
		color: #64748b;
		margin: 0 0 1rem;
		font-size: 0.9rem;
	}
	.acciones {
		display: flex;
		gap: 0.6rem;
		flex-wrap: wrap;
	}
	.btn {
		background: #003fff;
		color: white;
		padding: 0.5rem 1rem;
		border-radius: 8px;
		text-decoration: none;
		font-weight: 600;
		font-size: 0.9rem;
	}
	.btn2 {
		background: #1e293b;
	}
	.grilla {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
		gap: 0.8rem;
	}
	.card {
		border: 1px solid #e3e8ef;
		border-radius: 10px;
		padding: 1rem;
		text-decoration: none;
		color: inherit;
		transition: border-color 0.15s;
	}
	.card:hover {
		border-color: #003fff;
	}
	.card h2 {
		font-size: 0.95rem;
		margin: 0 0 0.4rem;
		color: #0b3d91;
	}
	.card p {
		margin: 0;
		color: #64748b;
		font-size: 0.8rem;
	}
</style>
