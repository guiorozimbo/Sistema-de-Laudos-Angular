import { TestBed } from '@angular/core/testing';
import { LaudoService } from './laudo.service';
import { TipoVeiculo } from '../models/tipo-veiculo';

describe('LaudoService', () => {
  let service: LaudoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LaudoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should provide a checklist for each vehicle type', () => {
    const autoChecklist = service.getChecklist(TipoVeiculo.AUTOMOVEL);
    const motoChecklist = service.getChecklist(TipoVeiculo.MOTOCICLETA);
    const caminhaoChecklist = service.getChecklist(TipoVeiculo.CAMINHAO);

    expect(autoChecklist.length).toBeGreaterThan(3);
    expect(motoChecklist.some(item => item.label.includes('Capacete'))).toBeTrue();
    expect(caminhaoChecklist.some(item => item.label.includes('carga'))).toBeTrue();
  });
});
