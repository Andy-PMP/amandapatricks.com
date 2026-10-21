// Social preview cards (1200×630 PNG), rendered at build time: satori lays out
// HTML/CSS into SVG with embedded fonts, resvg rasterizes it.
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import sharp from 'sharp';
import { profile } from '../data/resume';

export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;

// Light-theme tokens from layouts/Base.astro
const C = {
  bg: '#fbfaf7',
  text: '#1b1f27',
  muted: '#5a6170',
  line: '#e4e1da',
  accent: '#1f3a68',
  accentSoft: '#e8edf6',
};

const root = process.cwd();
const fontFile = (pkg: string, file: string) => readFile(join(root, 'node_modules/@fontsource', pkg, 'files', file));

let fontsPromise: Promise<Parameters<typeof satori>[1]['fonts']> | undefined;
function fonts() {
  fontsPromise ??= Promise.all([
    fontFile('fraunces', 'fraunces-latin-400-normal.woff'),
    fontFile('fraunces', 'fraunces-latin-600-normal.woff'),
    fontFile('inter', 'inter-latin-400-normal.woff'),
    fontFile('inter', 'inter-latin-500-normal.woff'),
    fontFile('inter', 'inter-latin-600-normal.woff'),
  ]).then(([f400, f600, i400, i500, i600]) => [
    { name: 'Fraunces', data: f400, weight: 400, style: 'normal' },
    { name: 'Fraunces', data: f600, weight: 600, style: 'normal' },
    { name: 'Inter', data: i400, weight: 400, style: 'normal' },
    { name: 'Inter', data: i500, weight: 500, style: 'normal' },
    { name: 'Inter', data: i600, weight: 600, style: 'normal' },
  ]);
  return fontsPromise;
}

type Node = { type: string; props: Record<string, unknown> };
const h = (type: string, style: Record<string, unknown>, ...children: unknown[]): Node => ({
  type,
  props: { style: { display: 'flex', ...style }, children: children.flat().filter((c) => c != null && c !== false) },
});

/** Trim to whole words so long summaries don't overflow the card. */
function clip(text: string, max: number) {
  if (text.length <= max) return text;
  return text.slice(0, max).replace(/[\s,;:.–—-]+\S*$/, '') + '…';
}

const brand = () =>
  h('div', { alignItems: 'center', gap: 16 },
    h('div', {
      width: 52, height: 52, borderRadius: 12, background: C.accent, color: '#fff',
      alignItems: 'center', justifyContent: 'center', fontFamily: 'Fraunces', fontWeight: 600, fontSize: 24,
    }, 'AP'),
    h('div', { fontFamily: 'Inter', fontWeight: 600, fontSize: 26, color: C.text }, profile.name),
  );

const footer = (extra?: string) =>
  h('div', { fontFamily: 'Inter', fontSize: 22, color: C.muted },
    extra ? `amandapatricks.com  ·  ${extra}` : 'amandapatricks.com');

const frame = (...children: unknown[]) =>
  h('div', { width: OG_WIDTH, height: OG_HEIGHT, background: C.bg, position: 'relative', overflow: 'hidden' },
    h('div', { position: 'absolute', left: 0, top: 0, bottom: 0, width: 14, background: C.accent }),
    ...children);

async function toPng(node: Node) {
  const svg = await satori(node as never, { width: OG_WIDTH, height: OG_HEIGHT, fonts: await fonts() });
  return new Resvg(svg, { fitTo: { mode: 'width', value: OG_WIDTH } }).render().asPng();
}

export function homeCard() {
  return toPng(frame(
    h('div', { flexDirection: 'column', justifyContent: 'space-between', padding: '72px 88px', width: '100%' },
      brand(),
      h('div', { flexDirection: 'column' },
        h('div', { fontFamily: 'Inter', fontWeight: 600, fontSize: 24, letterSpacing: 4, color: C.accent, marginBottom: 20 },
          profile.headline.toUpperCase()),
        h('div', { alignItems: 'flex-end', fontFamily: 'Fraunces', fontSize: 96, color: C.text, lineHeight: 1 },
          profile.name,
          h('div', { fontSize: 40, color: C.muted, marginBottom: 10 }, `, ${profile.credential}`)),
        h('div', { fontFamily: 'Fraunces', fontSize: 36, color: C.text, marginTop: 28, maxWidth: 860, lineHeight: 1.35 },
          profile.tagline),
      ),
      footer(profile.location),
    ),
  ));
}

export interface ProjectCardData {
  title: string;
  summary: string;
  tags: string[];
  /** File name inside src/assets/projects/ */
  cover?: string;
}

async function coverDataUri(file: string, w: number, h_: number) {
  // Crop the top-left of the screenshot at 2× so it stays sharp after scaling down.
  const png = await sharp(join(root, 'src/assets/projects', file))
    .resize(w * 2, h_ * 2, { fit: 'cover', position: sharp.gravity.northwest })
    .png()
    .toBuffer();
  return `data:image/png;base64,${png.toString('base64')}`;
}

export async function projectCard({ title, summary, tags, cover }: ProjectCardData) {
  const shot = cover ? { w: 540, h: 520, src: await coverDataUri(cover, 540, 520) } : null;
  // Text column ends ~70px before the screenshot starts.
  const textWidth = shot ? 540 : 1000;

  const text = h('div', { flexDirection: 'column', justifyContent: 'space-between', padding: '64px 0 64px 88px', flexGrow: 1 },
    brand(),
    h('div', { flexDirection: 'column', width: textWidth },
      h('div', { fontFamily: 'Inter', fontWeight: 600, fontSize: 22, letterSpacing: 4, color: C.accent, marginBottom: 14 }, 'PROJECT'),
      h('div', { fontFamily: 'Fraunces', fontSize: shot ? 54 : 68, color: C.text, lineHeight: 1.08, marginBottom: 18 }, title),
      h('div', { fontFamily: 'Inter', fontSize: shot ? 23 : 25, color: C.muted, lineHeight: 1.45 }, clip(summary, shot ? 100 : 190)),
      h('div', { flexWrap: 'wrap', gap: 10, marginTop: 22 },
        tags.slice(0, shot ? 3 : 4).map((t) =>
          h('div', { fontFamily: 'Inter', fontWeight: 500, fontSize: 19, color: C.accent, background: C.accentSoft, borderRadius: 999, padding: '7px 16px' }, t))),
    ),
    footer(),
  );

  const image = shot && h('div', {
    position: 'absolute', left: OG_WIDTH - shot.w + 40, top: 70, width: shot.w, height: shot.h,
    borderRadius: 18, border: `1px solid ${C.line}`, overflow: 'hidden', background: '#fff',
    boxShadow: '0 24px 48px -12px rgba(27, 31, 39, 0.28)',
  }, { type: 'img', props: { src: shot.src, width: shot.w, height: shot.h, style: { width: shot.w, height: shot.h } } });

  return toPng(frame(text, image));
}
