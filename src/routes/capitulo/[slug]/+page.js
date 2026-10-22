import { error } from '@sveltejs/kit';
import content from '$lib/data/content.json';

export function entries() {
	return content.chapters.map((c) => ({ slug: c.slug }));
}

export function load({ params }) {
	const chapter = content.chapters.find((c) => c.slug === params.slug);
	if (!chapter) throw error(404, 'Capítulo no encontrado');
	return { chapter };
}
