import { AgenteVistoriado } from './agente-vistoriado';
import { ChecklistItem } from './checklist-item';
import { Proprietario } from './proprietario';
import { TipoVeiculo } from './tipo-veiculo';
import { Veiculo } from './veiculo';

export interface Laudo {
  tipoVeiculo: TipoVeiculo;
  proprietario: Proprietario;
  veiculo: Veiculo;
  agente: AgenteVistoriado;
  checklist: Array<ChecklistItem & { response: 'SIM' | 'NÃO' | 'N/A' }>;
  observacoes: string;
  dataCriacao: string;
}
