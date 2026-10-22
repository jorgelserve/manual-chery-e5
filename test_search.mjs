#!/usr/bin/env node
// Prueba la busqueda contra search.json igual que el cliente
import MiniSearch from 'minisearch';
import { readFileSync } from 'fs';
import { homedir } from 'os';

const docs = JSON.parse(readFileSync(homedir() + '/Documents/JORGE/e5/site/static/search.json', 'utf8'));
const ms = new MiniSearch({
  fields: ['text', 'chapter'],
  storeFields: ['page', 'chapter', 'text', 'images'],
  idField: 'page'
});
ms.addAll(docs);
for (const q of ['presión de llantas', 'llantas', 'presión', 'fusibles', 'cinturón']) {
  const r = ms.search(q, { fuzzy: 0.2, prefix: true });
  console.log(q, '->', r.length, r[0] ? `p.${r[0].page} ${r[0].chapter}` : '');
}
