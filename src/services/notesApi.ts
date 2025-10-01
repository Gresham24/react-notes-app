import type { Note } from '../types/note';

const API_BASE_URL = 'http://localhost:3001/api';

export const notesApi = {
  async getAllNotes(): Promise<Note[]> {
    const response = await fetch(`${API_BASE_URL}/notes`);
    if (!response.ok) {
      throw new Error('Failed to fetch notes');
    }
    return response.json();
  },

  async getNoteById(id: number): Promise<Note> {
    const response = await fetch(`${API_BASE_URL}/notes/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch note');
    }
    return response.json();
  },

  async createNote(noteData: { note_title: string; note_text: string }): Promise<Note> {
    const response = await fetch(`${API_BASE_URL}/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(noteData),
    });
    if (!response.ok) {
      throw new Error('Failed to create note');
    }
    return response.json();
  },

  async updateNote(id: number, noteData: { note_title: string; note_text: string }): Promise<Note> {
    const response = await fetch(`${API_BASE_URL}/notes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(noteData),
    });
    if (!response.ok) {
      throw new Error('Failed to update note');
    }
    return response.json();
  },

  async deleteNote(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/notes/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete note');
    }
  },

  async searchNotes(query: string): Promise<Note[]> {
    const response = await fetch(`${API_BASE_URL}/notes/search?q=${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error('Failed to search notes');
    }
    return response.json();
  },
};
