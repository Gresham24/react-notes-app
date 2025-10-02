export interface Note {
  id: number;
  created_at: string;
  note_title: string;
  note_text: string;
  is_pinned?: boolean;
}
