import { type Autor } from './Autor';

export interface Projeto {
  id: number;
  imagem: string;
  nome: string;
  descricao: string;
  dataCadastro: string;
  preco: number; // ou BigDecimal se você tiver uma lib para isso
  autor: Autor;
  url: string;
}