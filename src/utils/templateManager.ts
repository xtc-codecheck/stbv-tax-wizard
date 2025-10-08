import { Position, Template } from "@/types/stbvv";

// Predefined Templates
export const DEFAULT_TEMPLATES: Template[] = [
  {
    id: 'template-1',
    name: 'Einkommensteuererklärung Privatperson',
    isCustom: false,
    createdAt: new Date().toISOString(),
    positions: [
      {
        id: '1',
        activity: 'Einkommensteuererklärung (Privatperson)',
        description: 'Einkommensteuererklärung für Privatperson',
        objectValue: 30000,
        tenthRate: { numerator: 6, denominator: 10 },
        quantity: 1,
        feeTable: 'A',
        applyExpenseFee: true,
        billingType: 'objectValue'
      }
    ]
  },
  {
    id: 'template-2',
    name: 'Jahresabschluss kleine GmbH',
    isCustom: false,
    createdAt: new Date().toISOString(),
    positions: [
      {
        id: '1',
        activity: 'Jahresabschluss (Kapitalgesellschaften)',
        description: 'Jahresabschluss für kleine GmbH',
        objectValue: 250000,
        tenthRate: { numerator: 15, denominator: 10 },
        quantity: 1,
        feeTable: 'B',
        applyExpenseFee: true,
        billingType: 'objectValue'
      },
      {
        id: '2',
        activity: 'Finanzbuchhaltung (monatlich)',
        description: 'Monatliche Finanzbuchhaltung',
        objectValue: 20000,
        tenthRate: { numerator: 5, denominator: 10 },
        quantity: 12,
        feeTable: 'C',
        applyExpenseFee: true,
        billingType: 'objectValue'
      }
    ]
  },
  {
    id: 'template-3',
    name: 'Umsatzsteuer-Voranmeldung (Quartal)',
    isCustom: false,
    createdAt: new Date().toISOString(),
    positions: [
      {
        id: '1',
        activity: 'Umsatzsteuer-Voranmeldung',
        description: 'Quartalsweise USt-Voranmeldung',
        objectValue: 50000,
        tenthRate: { numerator: 2, denominator: 10 },
        quantity: 4,
        feeTable: 'A',
        applyExpenseFee: true,
        billingType: 'objectValue'
      }
    ]
  },
  {
    id: 'template-4',
    name: 'Gründungsberatung',
    isCustom: false,
    createdAt: new Date().toISOString(),
    positions: [
      {
        id: '1',
        activity: 'Beratung bei Unternehmensgründung',
        description: 'Beratung zu Rechtsform und Steuerfragen',
        billingType: 'hourly',
        hourlyRate: 150,
        hours: 4,
        quantity: 1,
        objectValue: 0,
        tenthRate: { numerator: 6, denominator: 10 },
        feeTable: 'A',
        applyExpenseFee: true
      },
      {
        id: '2',
        activity: 'Betriebswirtschaftliche Beratung',
        description: 'Erstellung Businessplan und Finanzplanung',
        billingType: 'hourly',
        hourlyRate: 150,
        hours: 6,
        quantity: 1,
        objectValue: 0,
        tenthRate: { numerator: 6, denominator: 10 },
        feeTable: 'A',
        applyExpenseFee: true
      }
    ]
  }
];

const STORAGE_KEY = 'stbvv_custom_templates';

export const getTemplates = (): Template[] => {
  const customTemplates = getCustomTemplates();
  return [...DEFAULT_TEMPLATES, ...customTemplates];
};

export const getCustomTemplates = (): Template[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    return JSON.parse(stored) as Template[];
  } catch (error) {
    console.error('Error loading custom templates:', error);
    return [];
  }
};

export const saveCustomTemplate = (name: string, positions: Position[]): Template => {
  const newTemplate: Template = {
    id: `custom-${Date.now()}`,
    name,
    positions: positions.map(pos => ({
      ...pos,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
    })),
    isCustom: true,
    createdAt: new Date().toISOString()
  };

  const customTemplates = getCustomTemplates();
  customTemplates.push(newTemplate);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(customTemplates));
  
  return newTemplate;
};

export const deleteTemplate = (templateId: string): void => {
  const customTemplates = getCustomTemplates();
  const filtered = customTemplates.filter(t => t.id !== templateId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
};
