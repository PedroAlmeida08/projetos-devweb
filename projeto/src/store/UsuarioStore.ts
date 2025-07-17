// src/store/UsuarioStore.ts
import { create } from 'zustand';

interface UsuarioState {
  usuarioId: number;
  favoritoIds: Set<number>; // ✅ Guarda os IDs dos projetos favoritos
  setUsuarioLogado: (id: number) => void;
  setFavoritos: (ids: number[]) => void; // ✅ Ação para definir os favoritos
  adicionarFavorito: (id: number) => void;
  removerFavorito: (id: number) => void;
}

const useUsuarioStore = create<UsuarioState>((set) => ({
  usuarioId: 0,
  favoritoIds: new Set(), // Estado inicial vazio
  setUsuarioLogado: (id) => set({ usuarioId: id }),
  setFavoritos: (ids) => set({ favoritoIds: new Set(ids) }),
  adicionarFavorito: (id) => set((state) => ({ favoritoIds: new Set(state.favoritoIds).add(id) })),
  removerFavorito: (id) => set((state) => {
    const newFavoritos = new Set(state.favoritoIds);
    newFavoritos.delete(id);
    return { favoritoIds: newFavoritos };
  }),
}));

export default useUsuarioStore;