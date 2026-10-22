<script>
	export let data;
	const ch = data.chapter;
</script>

<svelte:head>
	<title>{ch.title} · Manual Chery E5</title>
</svelte:head>

<nav class="migas">
	<a href="/">Inicio</a> <span>/</span> <strong>{ch.title}</strong>
</nav>

<h1>{ch.title}</h1>
<p class="rango">Páginas {ch.pageStart}–{ch.pageEnd} del manual</p>

{#if ch.sections.length > 0}
	<div class="indice">
		<h2>Secciones</h2>
		<ul>
			{#each ch.sections as s}
				<li><a href="#p{s.page}">{s.title}</a> <span class="pg">p.{s.page}</span></li>
			{/each}
		</ul>
	</div>
{/if}

{#each ch.pages as page (page.n)}
	<section class="pagina" id="p{page.n}">
		<h3>
			<a href="/pdf" title="Ver en PDF">Página {page.n}</a>
		</h3>
		{#if page.fullpage}
			<img class="fullpage" src={page.fullpage} alt="Página {page.n} del manual" loading="lazy" />
			<details>
				<summary>Texto de la página</summary>
				{#each page.bloques as b}
					{#if b.t === 'h4'}
						<h4>{b.x}</h4>
					{:else if b.t === 'h5'}
						<h5>{#if b.icon}<img class="ico" src={b.icon} alt="" loading="lazy" />{/if}{b.x}</h5>
					{:else if b.t === 'p'}
						<p>{b.x}</p>
					{:else if b.t === 'ul'}
						<ul>
							{#each b.x as item}
								<li>{item}</li>
							{/each}
						</ul>
					{:else if b.t === 'callout'}
					<span class="callout">{b.x}</span>
				{:else if b.t === 'img'}
						<a class="figura" href={b.x} target="_blank" rel="noopener">
							<img src={b.x} alt="Ilustración página {page.n}" loading="lazy" />
						</a>
					{/if}
				{/each}
			</details>
		{:else}
			{#each page.bloques as b}
				{#if b.t === 'h4'}
					<h4>{b.x}</h4>
				{:else if b.t === 'h5'}
					<h5>{#if b.icon}<img class="ico" src={b.icon} alt="" loading="lazy" />{/if}{b.x}</h5>
				{:else if b.t === 'p'}
					<p>{b.x}</p>
				{:else if b.t === 'ul'}
					<ul>
						{#each b.x as item}
							<li>{item}</li>
						{/each}
					</ul>
				{:else if b.t === 'callout'}
					<span class="callout">{b.x}</span>
				{:else if b.t === 'img'}
					<a class="figura" href={b.x} target="_blank" rel="noopener">
						<img src={b.x} alt="Ilustración página {page.n}" loading="lazy" />
					</a>
				{/if}
			{/each}
		{/if}
	</section>
{/each}

<style>
	.migas {
		font-size: 0.8rem;
		color: #64748b;
		margin-bottom: 1rem;
	}
	.migas a {
		color: #003fff;
		text-decoration: none;
	}
	h1 {
		font-size: 1.4rem;
		color: #0b3d91;
		margin: 0 0 0.2rem;
	}
	.rango {
		color: #94a3b8;
		font-size: 0.85rem;
		margin: 0 0 1.5rem;
	}
	.indice {
		background: #f0f6ff;
		border: 1px solid #dbeafe;
		border-radius: 10px;
		padding: 1rem 1.2rem;
		margin-bottom: 2rem;
	}
	.indice h2 {
		font-size: 0.9rem;
		margin: 0 0 0.5rem;
		color: #0b3d91;
	}
	.indice ul {
		margin: 0;
		padding-left: 1.2rem;
		columns: 2;
	}
	.indice li {
		font-size: 0.82rem;
		padding: 0.1rem 0;
		break-inside: avoid;
	}
	.indice a {
		color: #1e40af;
		text-decoration: none;
	}
	.indice .pg {
		color: #94a3b8;
		font-size: 0.72rem;
	}
	.pagina {
		border-top: 1px solid #eef2f7;
		padding: 1.2rem 0;
	}
	.pagina h3 {
		font-size: 0.78rem;
		color: #94a3b8;
		margin: 0 0 0.4rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}
	.pagina h3 a {
		color: inherit;
		text-decoration: none;
	}
	.pagina h3 a:hover {
		color: #003fff;
	}
	.pagina p {
		line-height: 1.65;
		font-size: 0.95rem;
		color: #1e293b;
		margin: 0 0 0.8rem;
		overflow-wrap: break-word;
		hyphens: auto;
		-webkit-hyphens: auto;
	}
	.pagina ul {
		margin: 0 0 0.8rem;
		padding-left: 1.4rem;
	}
	.pagina ul li {
		line-height: 1.6;
		font-size: 0.95rem;
		color: #1e293b;
		overflow-wrap: break-word;
	}
	.fullpage {
		display: block;
		width: 100%;
		height: auto;
		border: 1px solid #e3e8ef;
		border-radius: 8px;
		background: white;
	}
	details summary {
		cursor: pointer;
		color: #003fff;
		font-size: 0.85rem;
		margin: 0.4rem 0 0.6rem;
	}
	h4 {
		font-size: 1.02rem;
		color: #0b3d91;
		margin: 1rem 0 0.4rem;
	}
	h5 {
		font-size: 0.9rem;
		color: #1e40af;
		margin: 0.8rem 0 0.3rem;
	}
	h5 .ico {
		height: 1.6em;
		vertical-align: -0.45em;
		margin-right: 0.45rem;
	}
	.callout {
		display: inline-block;
		min-width: 1.5em;
		padding: 0.05em 0.3em;
		border: 1.5px solid #0b3d91;
		border-radius: 999px;
		font-size: 0.72rem;
		color: #0b3d91;
		text-align: center;
		margin: 0.05rem 0.15rem;
	}
	.figura {
		display: block;
		margin: 0.6rem 0 1rem;
	}
	.figura img {
		max-width: 100%;
		max-height: 640px;
		border: 1px solid #eef2f7;
		border-radius: 8px;
		background: white;
	}
</style>
