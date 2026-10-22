<script>
	import content from '$lib/data/content.json';
	let menuAbierto = false;
</script>

<div class="topbar">
	<a href="/" class="brand-movil">📘 Chery E5</a>
	<button class="hamburguesa" on:click={() => (menuAbierto = !menuAbierto)} aria-label="Menú">
		{#if menuAbierto}✕{:else}☰{/if}
	</button>
</div>

<div class="app">
	<aside class:abierto={menuAbierto}>
		<div class="cabecera-menu">
			<a href="/" class="brand" on:click={() => (menuAbierto = false)}>📘 Manual Chery E5</a>
			<button class="cerrar" on:click={() => (menuAbierto = false)} aria-label="Cerrar">✕</button>
		</div>
		<nav on:click={() => (menuAbierto = false)}>
			{#each content.chapters as ch (ch.slug)}
				<a class="cap" href="/capitulo/{ch.slug}/">{ch.title}</a>
				{#if ch.sections.length > 0}
					<div class="secs">
						{#each ch.sections.slice(0, 8) as s}
							<a href="/capitulo/{ch.slug}/#p{s.page}">{s.title}</a>
						{/each}
						{#if ch.sections.length > 8}
							<span class="mas">+{ch.sections.length - 8} secciones…</span>
						{/if}
					</div>
				{/if}
			{/each}
			<a class="cap" href="/buscar/">🔍 Buscar</a>
			<a class="cap" href="/pdf/">📄 Ver PDF completo</a>
		</nav>
	</aside>
	<main>
		<slot />
	</main>
</div>

<style>
	:global(body) {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
			'Helvetica Neue', Arial, sans-serif;
		-webkit-text-size-adjust: 100%;
		text-size-adjust: 100%;
		-webkit-font-smoothing: antialiased;
		margin: 0;
	}
	:global(img) {
		max-width: 100%;
		height: auto;
	}
	.topbar {
		display: none;
	}
	.cabecera-menu {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.cerrar {
		display: none;
		background: none;
		border: none;
		font-size: 1.3rem;
		color: #0b3d91;
		cursor: pointer;
		padding: 0.2rem 0.5rem;
	}
	.app {
		display: flex;
		min-height: 100vh;
	}
	aside {
		width: 300px;
		flex-shrink: 0;
		border-right: 1px solid #e3e8ef;
		padding: 1rem;
		position: sticky;
		top: 0;
		height: 100vh;
		overflow-y: auto;
		background: #f8fafc;
	}
	.brand {
		display: block;
		font-weight: 700;
		font-size: 1.05rem;
		margin-bottom: 1rem;
		color: #0b3d91;
		text-decoration: none;
	}
	nav {
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
	}
	.cap {
		font-weight: 600;
		margin-top: 0.6rem;
		color: #1e293b;
		text-decoration: none;
		font-size: 0.9rem;
	}
	.cap:hover {
		color: #003fff;
	}
	.secs {
		display: flex;
		flex-direction: column;
		padding-left: 0.8rem;
		border-left: 2px solid #dbeafe;
		margin-left: 0.2rem;
	}
	.secs a {
		color: #475569;
		text-decoration: none;
		font-size: 0.78rem;
		padding: 0.12rem 0;
	}
	.secs a:hover {
		color: #003fff;
	}
	.mas {
		font-size: 0.72rem;
		color: #94a3b8;
	}
	main {
		flex: 1;
		padding: 2rem;
		max-width: 900px;
		margin: 0 auto;
		min-width: 0;
	}
	@media (max-width: 800px) {
		.topbar {
			display: flex;
			justify-content: space-between;
			align-items: center;
			position: sticky;
			top: 0;
			z-index: 20;
			background: #0b3d91;
			color: white;
			padding: 0.55rem 1rem;
		}
		.brand-movil {
			color: white;
			text-decoration: none;
			font-weight: 700;
		}
		.hamburguesa {
			background: none;
			border: none;
			color: white;
			font-size: 1.4rem;
			cursor: pointer;
			padding: 0.1rem 0.4rem;
		}
		.cerrar {
			display: block;
		}
		.app {
			flex-direction: column;
		}
		aside {
			display: none;
			position: fixed;
			inset: 0;
			width: 100%;
			height: 100%;
			z-index: 50;
			overflow-y: auto;
			padding: 1rem 1.1rem;
		}
		aside.abierto {
			display: block;
		}
		main {
			padding: 1.1rem;
		}
	}
</style>
