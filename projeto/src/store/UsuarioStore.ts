// src/store/UsuarioStore.ts
import { create } from 'zustand';

interface UsuarioState {
  usuarioId: number;
  setUsuarioLogado: (id: number) => void;
}

const useUsuarioStore = create<UsuarioState>((set) => ({
  usuarioId: 0,
  setUsuarioLogado: (id) => set({ usuarioId: id }),
}));

// ✅ Esta linha garante que a exportação padrão existe
export default useUsuarioStore;