import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { html, loadCore } from './helpers.js';

const { uid, norm, esc, LANGS, langOf } = loadCore();

describe('norm (search normalization)', () => {
  test('normal: lowercases text', () => {
    assert.equal(norm('Hola MUNDO'), 'hola mundo');
  });
  test('normal: strips accents so "página" matches "pagina"', () => {
    assert.equal(norm('Página Diseño Ñandú'), 'pagina diseno nandu');
  });
  test('edge: ñ is kept as a distinct letter in search keys', () => {
    assert.equal(norm('Ñandú'), 'ñandu');
  });
  test('edge: null and undefined become an empty string', () => {
    assert.equal(norm(null), '');
    assert.equal(norm(undefined), '');
  });
});

describe('esc (HTML escaping)', () => {
  test('normal: escapes <, >, & and quotes', () => {
    assert.equal(esc('<b>"a" & b</b>'), '&lt;b&gt;&quot;a&quot; &amp; b&lt;/b&gt;');
  });
  test('invalid: a script tag cannot survive as markup', () => {
    assert.ok(!esc('<script>alert(1)</script>').includes('<script'));
  });
  test('edge: null, undefined and numbers are handled', () => {
    assert.equal(esc(null), '');
    assert.equal(esc(undefined), '');
    assert.equal(esc(42), '42');
  });
});

describe('langOf (code block language)', () => {
  test('normal: known language codes are kept', () => {
    assert.equal(langOf('py'), 'py');
    assert.equal(langOf('JS'), 'js');
  });
  test('normal: aliases map to canonical codes', () => {
    assert.equal(langOf('python'), 'py');
    assert.equal(langOf('typescript'), 'ts');
    assert.equal(langOf('shell'), 'bash');
  });
  test('invalid: unknown or empty languages fall back to plain text', () => {
    assert.equal(langOf('klingon'), 'plain');
    assert.equal(langOf(''), 'plain');
    assert.equal(langOf(undefined), 'plain');
  });
  test('edge: every listed language maps to itself', () => {
    for (const [code] of LANGS) assert.equal(langOf(code), code);
  });
});

describe('uid', () => {
  test('normal: returns a short alphanumeric string', () => {
    assert.match(uid(), /^[a-z0-9]{1,8}$/);
  });
  test('edge: 1000 ids contain no duplicates', () => {
    const ids = new Set(Array.from({ length: 1000 }, uid));
    assert.equal(ids.size, 1000);
  });
});

describe('index.html (single-file app)', () => {
  test('normal: is a complete HTML document with a script', () => {
    assert.match(html, /<!doctype html>/i);
    assert.match(html, /<\/html>\s*$/i);
    assert.ok(html.includes('<script>'));
  });
  test('invalid: contains no external script sources, keeping it self-contained', () => {
    assert.doesNotMatch(html, /<script[^>]+src=/i);
  });
  test('edge: contains no obvious secrets (tokens or private keys)', () => {
    assert.doesNotMatch(html, /ghp_[A-Za-z0-9]{20,}|BEGIN (RSA |EC )?PRIVATE KEY|AKIA[0-9A-Z]{16}/);
  });
});
