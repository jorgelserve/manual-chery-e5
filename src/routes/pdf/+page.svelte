<script>
	import { base } from '$app/paths';

	const pdf = base + '/manual_liviano.pdf';
</script>

<svelte:head>
	<title>PDF completo · Manual Chery E5</title>
</svelte:head>

<h1>Manual completo (PDF)</h1>
<p class="nota">
	Versión recomprimida para web, mismas 378 páginas e ilustraciones legibles.
</p>

<object data={pdf} type="application/pdf" width="100%" height="85vh">
	<p>
		Tu navegador no puede mostrar PDFs embebidos.
		<a href={pdf}>Abrir en una pestaña nueva</a>
	</p>
</object>

<style>
	h1 {
		font-size: 1.3rem;
		color: #0b3d91;
	}
	.nota {
		color: #64748b;
		font-size: 0.85rem;
	}
	object {
		border: 1px solid #e3e8ef;
		border-radius: 10px;
	}
</style>
