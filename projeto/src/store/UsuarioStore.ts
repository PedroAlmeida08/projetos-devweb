import { create } from 'zustand';

/**
 * Define a estrutura das informações do usuário que queremos armazenar globalmente.
 */
interface UserInfo {
  id: number;
  username: string;
  role: string;
}

/**
 * Define a "forma" do nosso store: os dados que ele armazena e as ações para modificá-los.
 */
interface UsuarioState {
  // --- ESTADO (DADOS) ---
  user: UserInfo | null;      // Guarda o objeto do usuário logado, ou null se ninguém estiver logado.
  favoritoIds: Set<number>;   // Guarda apenas os IDs dos projetos favoritos para checagens rápidas.

  // --- AÇÕES (FUNÇÕES PARA MODIFICAR O ESTADO) ---
  /**
   * Define o usuário logado. Recebe o objeto completo ou null.
   */
  setUsuario: (user: UserInfo | null) => void;

  /**
   * Define a lista inicial de favoritos, geralmente após o login.
   * @param ids Um array de números (IDs dos projetos).
   */
  setFavoritos: (ids: number[]) => void;

  /**
   * Adiciona um único ID à lista de favoritos (usado para update otimista da UI).
   */
  adicionarFavorito: (id: number) => void;

  /**
   * Remove um único ID da lista de favoritos (usado para update otimista da UI).
   */
  removerFavorito: (id: number) => void;

  /**
   * Ação completa de logout, que limpa todos os dados do usuário.
   */
  logout: () => void;
}

const useUsuarioStore = create<UsuarioState>((set) => ({
  // --- ESTADO INICIAL ---
  user: null,
  favoritoIds: new Set(),

  // --- IMPLEMENTAÇÃO DAS AÇÕES ---
  setUsuario: (user) => set({ user }),

  setFavoritos: (ids) => set({ favoritoIds: new Set(ids) }),

  adicionarFavorito: (id) => set((state) => ({ 
    favoritoIds: new Set(state.favoritoIds).add(id) 
  })),

  removerFavorito: (id) => set((state) => {
    const newFavoritos = new Set(state.favoritoIds);
    newFavoritos.delete(id);
    return { favoritoIds: newFavoritos };
  }),
  
  logout: () => set({ 
    user: null, 
    favoritoIds: new Set() 
  }),
}));

export default useUsuarioStore;