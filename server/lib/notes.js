import supabase from './supabase.js';

export async function listNotes() {
  const { data, error } = await supabase
    .from('NotesDB')
    .select('id, created_at, note_title, note_text')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function createNote(noteData) {
  const payload = { note_title: noteData.note_title, note_text: noteData.note_text };
  const { data, error } = await supabase.from('NotesDB').insert([payload]).select().single();
  if (error) throw error;
  return data;
}

export async function updateNote(id, patch) {
  const { data, error } = await supabase
    .from('NotesDB')
    .update(patch)
    .eq('id', id).select().single();
  if (error) throw error;
  return data;
}

export async function deleteNote(id) {
  const { error } = await supabase.from('NotesDB').delete().eq('id', id);
  if (error) throw error;
  return { ok: true };
}

export async function searchNotes(query) {
  console.log('Searching for query:', query);
  const { data, error } = await supabase
    .from('NotesDB')
    .select('id, created_at, note_title, note_text')
    .or(`note_title.ilike.%${query}%,note_text.ilike.%${query}%`)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Supabase search error:', error);
    throw error;
  }

  console.log('Search results:', data);
  return data;
}