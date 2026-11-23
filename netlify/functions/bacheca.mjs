import { randomUUID } from 'node:crypto';

const boardKey = 'saluti';
const json = (body, status = 200) => Response.json(body, {
  status, headers: { 'Cache-Control': 'no-store' }
});

async function lookupCity(id, language) {
  const params = new URLSearchParams({ id: String(id), language });
  const response = await fetch(`https://geocoding-api.open-meteo.com/v1/get?${params}`, {
    signal: AbortSignal.timeout(5000)
  });
  if (response.status === 400 || response.status === 404) return null;
  if (!response.ok) throw new Error('City lookup failed');
  const place = await response.json();
  if (place.id !== id || !place.feature_code?.startsWith('PPL') || !place.name ||
      !Number.isFinite(place.latitude) || !Number.isFinite(place.longitude)) return null;
  return {
    id, name: place.name, region: place.admin1, country: place.country,
    latitude: place.latitude, longitude: place.longitude
  };
}

export async function handleBoard(request, store, findCity = lookupCity) {
  try {
    if (request.method === 'GET') return json((await store.get(boardKey, { type: 'json' })) || []);
    if (request.method !== 'POST') return new Response(null, { status: 405, headers: { Allow: 'GET, POST' } });

    const origin = request.headers.get('origin');
    if (origin && origin !== new URL(request.url).origin) return json({ error: 'origin' }, 403);
    if (request.headers.get('content-type')?.split(';')[0] !== 'application/json') return json({ error: 'format' }, 415);
    if (Number(request.headers.get('content-length')) > 4096) return json({ error: 'length' }, 413);
    const body = await request.text();
    if (body.length > 4096) return json({ error: 'length' }, 413);

    let input;
    try { input = JSON.parse(body); } catch { return json({ error: 'format' }, 400); }
    const message = typeof input?.message === 'string' ? input.message.trim() : '';
    const nickname = typeof input?.nickname === 'string' ? input.nickname.trim() : '';
    const cityId = input?.cityId;
    if (!message || message.length > 280 || nickname.length > 40 || !Number.isSafeInteger(cityId) || cityId < 1) {
      return json({ error: 'invalid_greeting' }, 400);
    }

    const city = await findCity(cityId, input.language === 'en' ? 'en' : 'it');
    if (!city) return json({ error: 'unknown_city' }, 400);
    const item = { id: randomUUID(), city, nickname, message, createdAt: new Date().toISOString() };

    // An ETag keeps two people posting at the same time from overwriting each other.
    for (let attempt = 0; attempt < 5; attempt += 1) {
      const current = await store.getWithMetadata(boardKey, { type: 'json' });
      const condition = current ? { onlyIfMatch: current.etag } : { onlyIfNew: true };
      const result = await store.setJSON(boardKey, [item, ...(current?.data || [])], condition);
      if (result.modified) return json(item, 201);
    }
    return json({ error: 'busy' }, 503);
  } catch {
    return json({ error: 'unavailable' }, 503);
  }
}

export default async function bacheca(request) {
  const { getStore } = await import('@netlify/blobs');
  return handleBoard(request, getStore({ name: 'bacheca', consistency: 'strong' }));
}

export const config = {
  path: '/api/bacheca',
  rateLimit: { windowLimit: 40, windowSize: 60, aggregateBy: 'ip' }
};
