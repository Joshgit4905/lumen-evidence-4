// Pure note-logic module for Lumen. No DOM access, so it runs in Node tests and in the browser.

export const DEFAULT_TITLE = 'Sin título';
export const STORAGE_KEY = 'lumen-notas';

export function normalizeTitle(title) {
  const trimmed = String(title ?? '').trim();
  return trimmed === '' ? DEFAULT_TITLE : trimmed;
}

export function createNote({ title = '', content = '', id, now = Date.now() } = {}) {
  if (String(content).trim() === '') {
    throw new Error('El contenido no puede estar vacío');
  }
  return {
    id: id ?? `note-${now}`,
    title: normalizeTitle(title),
    content: String(content),
    createdAt: now,
    updatedAt: now,
  };
}

export function deleteNote(notes, id) {
  return notes.filter((note) => note.id !== id);
}

export function searchNotes(notes, query) {
  const q = String(query ?? '').trim().toLowerCase();
  if (q === '') return notes.slice();
  return notes.filter(
    (note) =>
      note.title.toLowerCase().includes(q) || note.content.toLowerCase().includes(q)
  );
}

export function moveBlock(blocks, fromIndex, toIndex) {
  const inRange = (i) => Number.isInteger(i) && i >= 0 && i < blocks.length;
  if (!inRange(fromIndex) || !inRange(toIndex)) {
    throw new RangeError('Índice fuera de rango');
  }
  const copy = blocks.slice();
  const [moved] = copy.splice(fromIndex, 1);
  copy.splice(toIndex, 0, moved);
  return copy;
}

// storage: any object with getItem(key) and setItem(key, value), e.g. window.localStorage.
export function loadNotes(storage) {
  const raw = storage.getItem(STORAGE_KEY);
  if (raw === null || raw === undefined) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveNotes(storage, notes) {
  storage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

// Animations are turned off when the user asks for reduced motion.
export function animationsEnabled(mediaQueryList) {
  return !(mediaQueryList && mediaQueryList.matches);
}
