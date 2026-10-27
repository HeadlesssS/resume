// Downloads every image/SVG used by the design from Figma into public/assets.
// Figma asset URLs expire after 7 days. If they have expired, re-export the
// assets from Figma (or ask Claude to refresh the list) and replace the files.
import { mkdir, writeFile, access } from 'node:fs/promises'
import { join } from 'node:path'

const B = 'https://www.figma.com/api/mcp/asset/'
const ASSETS = {
  // mobile
  'mountain.png': '1bdf9928-2f84-4bfd-9597-3a2a9faaf8c4.png',
  'person-m.png': 'ac9bfb37-5b5c-42f5-8275-8f7ca5fbc534.png',
  'stella-demo-m.png': '42470d41-e112-496c-b758-e047dfa73854.png',
  'm-divider.svg': '8c66dd86-727f-4cdf-93d6-2753898bad06.svg',
  'm-guide.svg': '73226ae5-485c-4b49-8902-a6a748b020a4.svg',
  'm-play-white.svg': '4d038cdf-c80b-4c56-a348-3ea602df4cc9.svg',
  'm-play-dark.svg': '05b103a5-0f7a-4baf-a6c5-f997d3bd80e8.svg',
  // desktop
  'hero-band.png': '53ac83a0-c27c-4a9d-a443-1a2b12d487d1.png',
  'person-cutout.png': 'e11971ed-2598-4da2-93b5-b1c2624d9175.png',
  'gaia.png': 'eb0f92ce-02b1-4dfe-82ed-832203919d56.png',
  'line-hero.svg': '5fb97ecf-51fc-4785-bebf-49c81fea1dd2.svg',
  'line-stella.svg': 'b2f28ca4-fa71-464d-a5dd-1aaa9092d0af.svg',
  'play.svg': '99cb987a-b8d2-4103-91bf-4e0221755b86.svg',
  'line-grid.svg': '3f498ce8-9437-41b6-92a9-4ea566020a35.svg',
  'ampersand.svg': '37f37c85-c8a7-435a-be74-52a30d06aadf.svg',
  'skill-divider.svg': 'b96c9413-1330-49df-8aa8-b210f3696a2e.svg',
  'brackets.svg': 'cc234585-8697-4a00-b71b-c85b1dd57089.svg',
  'chart-network.svg': '52d3c7cc-c369-4fdf-bc49-863b8464b26a.svg',
  'diamond.svg': '00517451-6d3e-4d5d-85ab-c6bbd8cf08b5.svg',
  'coffee.svg': '9fe365e1-00c0-43a5-ba48-84bb230d51c7.svg',
  'triangle.svg': '2777bc65-e425-4fea-840c-4394d87a67e2.svg',
  'cuboid.svg': 'e4cfec3e-6575-4bdd-9ccc-61dc8f30a31e.svg',
  'circle-x.svg': '7df2d450-bbcb-4f04-8a0c-2fb663fa852b.svg',
  'settings.svg': 'a2ca25c4-6acc-4d82-bfe2-ff492809232d.svg',
  'leaf.svg': 'd623f503-7163-49e6-804d-28999ff6d79d.svg',
  'atom.svg': '6a8b83db-6ecc-40ee-a38c-440be63b7a9e.svg',
  'skill-divider-2.svg': 'e38b138c-3070-496f-b185-2d0628ca9378.svg',
  'badge.svg': '6644df6d-5406-4bf9-ba91-0ab7c3e63bb4.svg',
  'bold.svg': '5a961941-2328-401c-95cf-b33d82baa464.svg',
  'feather.svg': '049bac46-ac55-4e6f-a962-7fbef8ea3b34.svg',
  'chart-column-stacked.svg': '7d3b0a4b-65aa-46a1-8865-2ab77c82fa22.svg',
}

const ifMissing = process.argv.includes('--if-missing')
const dir = join(process.cwd(), 'public', 'assets')
await mkdir(dir, { recursive: true })
const exists = (p) => access(p).then(() => true, () => false)

let failed = 0
for (const [name, id] of Object.entries(ASSETS)) {
  const out = join(dir, name)
  if (ifMissing && (await exists(out))) continue
  try {
    const res = await fetch(B + id)
    if (!res.ok) throw new Error(res.status + ' ' + res.statusText)
    await writeFile(out, Buffer.from(await res.arrayBuffer()))
    console.log('✓', name)
  } catch (e) {
    failed++
    console.error('✗', name, '-', e.message)
  }
}
if (failed) {
  console.error(`\n${failed} asset(s) failed. Figma URLs expire after 7 days — ask Claude to refresh them.`)
  process.exit(1)
}
