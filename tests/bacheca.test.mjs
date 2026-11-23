import test from 'node:test';
import assert from 'node:assert/strict';
import { handleBoard } from '../netlify/functions/bacheca.mjs';

const endpoint = 'https://example.com/api/bacheca';
const vercelli = {
  id: 3164565, name: 'Vercelli', region: 'Piemonte', country: 'Italia', latitude: 45.32, longitude: 8.42
};
const findCity = async id => id === vercelli.id ? vercelli : null;

function makeStore() {
  let value = null;
  return {
    async get() { return value?.data ?? null; },
    async getWithMetadata() { return value; },
    async setJSON(key, data, condition) {
      const modified = condition.onlyIfNew ? !value : value?.etag === condition.onlyIfMatch;
      if (modified) value = { data, etag: String(data.length) };
      return { modified };
    }
  };
}

function post(body, origin = 'https://example.com') {
  return new Request(endpoint, {
    method: 'POST', headers: { 'Content-Type': 'application/json', origin }, body: JSON.stringify(body)
  });
}

test('anonymous greetings are immediately readable at the selected city', async () => {
  const store = makeStore();
  const response = await handleBoard(post({ cityId: vercelli.id, message: ' Ciao! ' }), store, findCity);
  assert.equal(response.status, 201);
  const entry = await response.json();
  assert.equal(entry.nickname, '');
  assert.equal(entry.message, 'Ciao!');
  assert.deepEqual(entry.city, vercelli);
  const list = await handleBoard(new Request(endpoint), store, findCity);
  assert.deepEqual(await list.json(), [entry]);
});

test('concurrent greetings are saved without overwriting each other', async () => {
  const store = makeStore();
  const responses = await Promise.all(['Ciao!', 'Saluti!'].map(message =>
    handleBoard(post({ cityId: vercelli.id, message }), store, findCity)
  ));
  assert.deepEqual(responses.map(response => response.status), [201, 201]);
  assert.deepEqual((await store.get()).map(item => item.message).sort(), ['Ciao!', 'Saluti!']);
});

test('unknown cities, oversized greetings and cross-origin submissions are rejected', async () => {
  const store = makeStore();
  for (const [body, origin, status] of [
    [{ cityId: 1, message: 'Ciao' }, undefined, 400],
    [{ cityId: vercelli.id, message: 'x'.repeat(281) }, undefined, 400],
    [{ cityId: vercelli.id, message: 'Ciao' }, 'https://other.example', 403]
  ]) assert.equal((await handleBoard(post(body, origin), store, findCity)).status, status);
  assert.equal(await store.get(), null);
});
