import { TipoVeiculo } from './tipo-veiculo';

export interface Veiculo {
  tipo: TipoVeiculo;
  marca: string;
  modelo: string;
  ano: number;
  placa: string;
  cor: string;
  chassis?: string; // optional
}
