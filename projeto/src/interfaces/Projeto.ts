import { type Autor } from './Autor';

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