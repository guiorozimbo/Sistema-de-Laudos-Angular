import { Injectable } from '@angular/core';
import { ChecklistItem } from '../models/checklist-item';
import { Laudo } from '../models/laudo';
import { TipoVeiculo } from '../models/tipo-veiculo';
import { AgenteVistoriado } from '../models/agente-vistoriado';
import { Proprietario } from '../models/proprietario';
import { Veiculo } from '../models/veiculo';

@Injectable({
  providedIn: 'root'
})
export class LaudoService {

  constructor() { }

  getChecklist(tipo: TipoVeiculo): ChecklistItem[] {
    switch (tipo) {
      case TipoVeiculo.AUTOMOVEL:
        return [
          { id: 'painel-corta-fogo', label: 'Painel corta-fogo', required: true },
          { id: 'longarina-dianteira-esquerda', label: 'Longarina dianteira esquerda', required: true },
          { id: 'caixa-roda-dianteira-esquerda', label: 'Caixa de roda dianteira esquerda', required: true },
          { id: 'estrutura-soleira-esquerda', label: 'Estrutura da soleira esquerda', required: true },
          { id: 'airbags-frontais', label: 'Air Bags frontais', required: true },
          { id: 'airbags-laterais', label: 'Air Bags laterais', required: true },
          { id: 'coluna-dianteira-esquerda', label: 'Estrutura da coluna dianteira esquerda', required: true },
          { id: 'coluna-central-esquerda', label: 'Estrutura da coluna central esquerda', required: true },
          { id: 'coluna-traseira-esquerda', label: 'Estrutura da coluna traseira esquerda', required: true },
          { id: 'caixa-roda-traseira-esquerda', label: 'Caixa de roda traseira esquerda', required: true },
          { id: 'assoalho-central-esquerdo', label: 'Assoalho central esquerdo', required: true },
        ];
      case TipoVeiculo.CAMINHAO:
        return [
          { id: 'cabine-variada', label: 'Cabine avariada sem danos colunas/assobio/soleira', required: true },
          { id: 'carroceria-carga', label: 'Carroceria avariada sem danos compartimento carga', required: true },
          { id: 'parachoque-traseiro', label: 'Para choque traseiro danificado', required: true },
          { id: 'suspensao', label: 'Dano em qualquer componente do Sistema de Suspensão', required: true },
          { id: 'eixos', label: 'Avaria em qualquer um dos eixos', required: true },
          { id: 'chassi-torcido', label: 'Chassi com deformação torsional menor ou igual à altura da longarina', required: true },
          { id: 'chassi-vertical', label: 'Chassi com deformação vertical menor ou igual à altura da longarina', required: true },
          { id: 'chassi-lateral', label: 'Chassi com deformação lateral menor ou igual à distância interna entre as longarinas', required: true },
          { id: 'chassi-termico-pequeno', label: 'Chassi com região termicamente afetada menor ou igual a 2/3 do comprimento do chassi', required: true },
          { id: 'chassi-termico-grande', label: 'Chassi com região termicamente afetada maior que 2/3 do comprimento do chassi', required: true },
          { id: 'airbags', label: 'Air Bags (se existir)', required: true },
        ];
      case TipoVeiculo.MOTOCICLETA:
        return [
          { id: 'capacete', label: 'Capacete e equipamentos de segurança conferidos', required: true },
          { id: 'mesa-superior-suspensao', label: 'Mesa superior da suspensão dianteira', required: true },
          { id: 'mesa-inferior-suspensao', label: 'Mesa inferior da suspensão dianteira', required: true },
          { id: 'coluna-direcao', label: 'Coluna de direção', required: true },
          { id: 'chassi', label: 'Chassi', required: true },
          { id: 'garfo-traseiro', label: 'Garfo traseiro', required: true },
          { id: 'eixo-traseiro', label: 'Eixo traseiro (triciclo e quadriciclo)', required: true },
        ];
      default:
        return [];
    }
  }

  createLaudo(
    tipoVeiculo: TipoVeiculo,
    proprietario: Proprietario,
    veiculo: Veiculo,
    agente: AgenteVistoriado,
    checklist: Array<ChecklistItem & { response: 'SIM' | 'NÃO' | 'N/A' }>,
    observacoes: string
  ): Laudo {
    return {
      tipoVeiculo,
      proprietario,
      veiculo,
      agente,
      checklist,
      observacoes,
      dataCriacao: new Date().toISOString()
    };
  }

  exportJson(laudo: Laudo): string {
    return JSON.stringify(laudo, null, 2);
  }
}
