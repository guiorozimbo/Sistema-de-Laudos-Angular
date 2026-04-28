export interface ChecklistItem {
  id: string;
  label: string;
  required: boolean;
  response?: 'SIM' | 'NÃO' | 'N/A';
}
