import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import {
  DEFAULT_TITLE,
  STORAGE_KEY,
  normalizeTitle,
  createNote,
  deleteNote,
  searchNotes,
  moveBlock,
  loadNotes,
  saveNotes,
  animationsEnabled,
} from '../js/notes.js';

function memoryStorage(initial = {}) {
  const data = { ...initial };
  return {
    getItem: (key) => (key in data ? data[key] : null),
    setItem: (key, value) => {
      data[key] = String(value);
    },
    raw: data,
  };
}

describe('createNote', () => {
  test('normal: creates a note with title, content and timestamps', () => {
    const note = createNote({ title: 'Compras', content: 'leche', id: 'a1', now: 100 });
    assert.deepEqual(note, {
      id: 'a1',
      title: 'Compras',
      content: 'leche',
      createdAt: 100,
      updatedAt: 100,
    });
  });

  test('edge: empty title falls back to the default title', () => {
    const note = createNote({ title: '   ', content: 'algo', id: 'a2' });
    assert.equal(note.title, DEFAULT_TITLE);
  });

  test('invalid: whitespace-only content is rejected', () => {
    assert.throws(() => createNote({ title: 'x', content: '   \n ' }), /no puede estar vacío/);
  });

  test('edge: very long content (100k chars) is kept intact', () => {
    const long = 'a'.repeat(100_000);
    const note = createNote({ content: long, id: 'big' });
    assert.equal(note.content.length, 100_000);
  });
});

describe('normalizeTitle', () => {
  test('edge: trims surrounding spaces and handles null', () => {
    assert.equal(normalizeTitle('  Hola  '), 'Hola');
    assert.equal(normalizeTitle(null), DEFAULT_TITLE);
  });
});

describe('deleteNote', () => {
  test('edge: deleting a missing id leaves the list unchanged', () => {
    const notes = [{ id: '1' }, { id: '2' }];
    assert.deepEqual(deleteNote(notes, 'nope'), notes);
  });

  test('normal: removes only the matching note', () => {
    const notes = [{ id: '1' }, { id: '2' }];
    assert.deepEqual(deleteNote(notes, '1'), [{ id: '2' }]);
  });
});

describe('searchNotes', () => {
  const notes = [
    { id: '1', title: 'Compras', content: 'Leche y PAN' },
    { id: '2', title: 'Ideas', content: 'app de notas' },
  ];

  test('normal: matches title or content, case-insensitive', () => {
    assert.deepEqual(searchNotes(notes, 'pan').map((n) => n.id), ['1']);
    assert.deepEqual(searchNotes(notes, 'IDEAS').map((n) => n.id), ['2']);
  });

  test('edge: empty query returns every note', () => {
    assert.equal(searchNotes(notes, '  ').length, 2);
  });
});

describe('moveBlock', () => {
  test('normal: moves a block and keeps every block', () => {
    assert.deepEqual(moveBlock(['a', 'b', 'c'], 0, 2), ['b', 'c', 'a']);
  });

  test('invalid: out-of-range index throws', () => {
    assert.throws(() => moveBlock(['a'], 0, 5), RangeError);
  });
});

describe('loadNotes / saveNotes', () => {
  test('normal: round-trips notes through storage', () => {
    const storage = memoryStorage();
    const notes = [{ id: '1', title: 'T', content: 'C' }];
    saveNotes(storage, notes);
    assert.equal(typeof storage.raw[STORAGE_KEY], 'string');
    assert.deepEqual(loadNotes(storage), notes);
  });

  test('invalid: corrupted JSON loads as an empty list', () => {
    const storage = memoryStorage({ [STORAGE_KEY]: '{not json' });
    assert.deepEqual(loadNotes(storage), []);
  });

  test('edge: nothing stored yet loads as an empty list', () => {
    assert.deepEqual(loadNotes(memoryStorage()), []);
  });
});

describe('animationsEnabled', () => {
  test('normal: animations are on when reduced motion is not requested', () => {
    assert.equal(animationsEnabled({ matches: false }), true);
  });

  test('edge: animations are off when reduced motion is requested', () => {
    assert.equal(animationsEnabled({ matches: true }), false);
  });
});
