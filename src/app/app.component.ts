import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AgenteVistoriado } from './models/agente-vistoriado';
import { ChecklistItem } from './models/checklist-item';
import { Laudo } from './models/laudo';
import { Proprietario } from './models/proprietario';
import { TipoVeiculo } from './models/tipo-veiculo';
import { Veiculo } from './models/veiculo';
import { LaudoService } from './services/laudo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'SIGA Laudos';
  vehicleTypes = Object.values(TipoVeiculo) as TipoVeiculo[];
  currentStep = 1;
  selectedTipo: TipoVeiculo | '' = '';
  laudoCompleto: Laudo | null = null;
  jsonExport = '';
  checklistOptions = ['SIM', 'NÃO', 'N/A'] as const;

  getVehicleLabel(tipo: TipoVeiculo): string {
    switch (tipo) {
      case TipoVeiculo.AUTOMOVEL:
        return 'Automóvel';
      case TipoVeiculo.CAMINHAO:
        return 'Caminhão';
      case TipoVeiculo.MOTOCICLETA:
        return 'Motocicleta';
      default:
        return tipo;
    }
  }

  getTypeImages(tipo: TipoVeiculo | ''): string[] {
    switch (tipo) {
      case TipoVeiculo.AUTOMOVEL:
        return ['Imagem 1: Auto', 'Imagem 2: Sinistro', 'Imagem 3: Relatório'];
      case TipoVeiculo.CAMINHAO:
        return ['Imagem 1: Caminhão', 'Imagem 2: Cabine', 'Imagem 3: Carroceria'];
      case TipoVeiculo.MOTOCICLETA:
        return ['Imagem 1: Moto', 'Imagem 2: Suspensão', 'Imagem 3: Chassi'];
      default:
        return ['Imagem 1', 'Imagem 2', 'Imagem 3'];
    }
  }

  ownerForm!: FormGroup;
  vehicleForm!: FormGroup;
  agentForm!: FormGroup;
  checklistForm!: FormGroup;
  reportConfirmed = false;

  constructor(
    private fb: FormBuilder,
    private laudoService: LaudoService
  ) {}

  ngOnInit(): void {
    this.ownerForm = this.fb.group({
      nome: ['', Validators.required],
      cpf: ['', [Validators.required, Validators.minLength(11)]],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      endereco: ['', Validators.required]
    });

    this.vehicleForm = this.fb.group({
      marca: ['', Validators.required],
      modelo: ['', Validators.required],
      ano: ['', [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]],
      placa: ['', Validators.required],
      cor: ['', Validators.required],
      chassis: ['']
    });

    this.agentForm = this.fb.group({
      nome: ['', Validators.required],
      matricula: ['', Validators.required],
      orgao: ['', Validators.required]
    });

    this.createChecklistForm([]);
  }

  get checklistControls() {
    return (this.checklistForm.get('items') as FormArray).controls;
  }

  selectTipo(tipo: TipoVeiculo): void {
    this.selectedTipo = tipo;
    this.currentStep = 2;
    this.createChecklistForm(this.laudoService.getChecklist(tipo));
    this.laudoCompleto = null;
    this.jsonExport = '';
  }

  createChecklistForm(items: ChecklistItem[]): void {
    this.checklistForm = this.fb.group({
      items: this.fb.array(items.map(item => this.fb.group({
        id: [item.id],
        label: [item.label],
        response: [''],
        required: [item.required]
      }))),
      observacoes: ['']
    });
  }

  nextStep(): void {
    if (!this.validateCurrentStep()) {
      this.touchCurrentStepControls();
      return;
    }

    if (this.currentStep === 5) {
      this.completeLaudo();
      return;
    }

    this.currentStep += 1;
  }

  previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep -= 1;
    }
  }

  validateCurrentStep(): boolean {
    switch (this.currentStep) {
      case 1:
        return this.selectedTipo !== '';
      case 2:
        return this.ownerForm.valid;
      case 3:
        return this.vehicleForm.valid;
      case 4:
        return this.agentForm.valid;
      case 5:
        const items = this.checklistForm.value.items as Array<{ response: string; required: boolean }>;
        return items.every(item => !item.required || !!item.response);
      default:
        return true;
    }
  }

  private touchCurrentStepControls(): void {
    switch (this.currentStep) {
      case 2:
        this.ownerForm.markAllAsTouched();
        break;
      case 3:
        this.vehicleForm.markAllAsTouched();
        break;
      case 4:
        this.agentForm.markAllAsTouched();
        break;
      case 5:
        this.checklistForm.markAllAsTouched();
        break;
    }
  }

  completeLaudo(): void {
    if (!this.validateCurrentStep()) {
      this.touchCurrentStepControls();
      return;
    }

    const checklist = (this.checklistForm.value.items as Array<ChecklistItem & { response: 'SIM' | 'NÃO' | 'N/A'; required: boolean }>);
    const observacoes = this.checklistForm.value.observacoes || '';
    const laudo = this.laudoService.createLaudo(
      this.selectedTipo as TipoVeiculo,
      this.ownerForm.value as Proprietario,
      this.vehicleForm.value as Veiculo,
      this.agentForm.value as AgenteVistoriado,
      checklist,
      observacoes
    );

    this.laudoCompleto = laudo;
    this.currentStep = 6;
    this.generateExport();
  }

  startNewLaudo(): void {
    this.currentStep = 1;
    this.selectedTipo = '';
    this.ownerForm.reset();
    this.vehicleForm.reset();
    this.agentForm.reset();
    this.createChecklistForm([]);
    this.laudoCompleto = null;
    this.jsonExport = '';
  }

  generateExport(): void {
    if (this.laudoCompleto) {
      this.jsonExport = this.laudoService.exportJson(this.laudoCompleto);
    }
  }

  downloadJson(): void {
    if (!this.laudoCompleto) {
      return;
    }

    const blob = new Blob([this.jsonExport], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `laudo-${this.selectedTipo}-${new Date().getTime()}.json`;
    link.click();
    URL.revokeObjectURL(link.href);
  }

  printReport(): void {
    window.print();
  }

  confirmReport(): void {
    this.reportConfirmed = true;
  }
}
