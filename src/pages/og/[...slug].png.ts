import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { homeCard, projectCard, type ProjectCardData } from '../../lib/og';

// Builds /og/home.png and /og/projects/<id>.png for link previews.
export const getStaticPaths = (async () => {
  const projects = await getCollection('projects', (p) => !p.data.draft);
  return [
    { params: { slug: 'home' }, props: {} },
    ...projects.map((p) => ({
      params: { slug: `projects/${p.id}` },
      props: { project: { title: p.data.title, summary: p.data.summary, tags: p.data.tags, cover: p.data.cover } },
    })),
  ];
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
  const { project } = props as { project?: ProjectCardData };
  const png = project ? await projectCard(project) : await homeCard();
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
