export interface Autor {
  id?: number;
  nome: string;
}

export interface Projeto {
  id: number;
  imagem: string;
  nome: string;
  descricao: string;
  destaque: boolean;
  dataCadastro: string;
  autor: Autor;
  url: string;
}