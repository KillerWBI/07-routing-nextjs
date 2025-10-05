// src/services/noteService.ts
import type { AxiosResponse } from "axios";
import axios from "axios";
import type { Note } from "../types/note";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    Authorization: `${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
});

// Тип відповіді для колекції нотаток
export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface NewNoteData {
  title: string;
  content: string;
  tag: string;
}


// 1. Отримати список нотаток (підтримує пагінацію та пошук)
export async function fetchNotes(
  search?: string,
  page: number = 1,
  tag?: string
): Promise<NotesResponse> {
  const response: AxiosResponse<NotesResponse> = await api.get("/notes", {
    params: {
      page,
      ...(search ? { search } : {}),
      ...(tag ? { tag } : {}),
    },
  });
  return response.data;
}

// 2. Створити нову нотатку
export async function createNote(data: NewNoteData): Promise<Note> {
  const response: AxiosResponse<Note> = await api.post("/notes", data);
  return response.data;
}

// 3. Видалити нотатку
export async function deleteNote(id: string): Promise<Note> {
  const response: AxiosResponse<Note> = await api.delete(`/notes/${id}`);
  return response.data;
}


export async function getSingleNote(id: string): Promise<Note> {
  const response: AxiosResponse<Note> = await api.get(`/notes/${id}`);
  return response.data;
}
