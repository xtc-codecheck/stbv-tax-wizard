/**
 * Activity Presets Validierung (Phase 1.2)
 * @module utils/__tests__/activityPresets
 * 
 * Verifiziert die Korrektheit aller Activity Presets
 * gemäß StBVV 2025 (Stand: 01.07.2025)
 */

import { describe, it, expect } from 'vitest';
import { activityPresets, getActivityPreset } from '../activityPresets';
import { MIN_OBJECT_VALUES } from '@/constants';
import { ActivityPreset } from '@/types/stbvv';

// ============== Hilfsfunktionen ==============

/**
 * Gruppiert Presets nach Kategorie
 */
const groupByCategory = (presets: ActivityPreset[]): Record<string, ActivityPreset[]> => {
  return presets.reduce((acc, preset) => {
    if (!acc[preset.category]) {
      acc[preset.category] = [];
    }
    acc[preset.category].push(preset);
    return acc;
  }, {} as Record<string, ActivityPreset[]>);
};

// ============== Struktur-Tests ==============

describe('Activity Presets Struktur', () => {
  it('enthält mindestens 60 Presets', () => {
    expect(activityPresets.length).toBeGreaterThanOrEqual(60);
  });

  it('alle Presets haben eindeutige activity-Namen', () => {
    const names = activityPresets.map(p => p.activity);
    const uniqueNames = new Set(names);
    expect(uniqueNames.size).toBe(names.length);
  });

  it('alle Presets haben gültige Kategorien', () => {
    const validCategories = [
      'Einkommensteuererklärung',
      'Jahresabschluss & Buchführung',
      'Umsatzsteuer',
      'Gewerbe- & Körperschaftsteuer',
      'Beratungsleistungen',
      'Rechtsbehelfsverfahren',
      'Erbschaft- & Schenkungsteuer',
      'Sonstige Steuererklärungen',
      'Lohnbuchhaltung',
      'Sonstige Tätigkeiten',
    ];
    
    activityPresets.forEach(preset => {
      expect(validCategories).toContain(preset.category);
    });
  });

  it('alle Presets haben gültige Gebührentabellen', () => {
    const validTables = ['A', 'B', 'C', 'D'];
    activityPresets.forEach(preset => {
      expect(validTables).toContain(preset.suggestedFeeTable);
    });
  });

  it('alle Presets haben gültige Rate-Typen', () => {
    const validRateTypes = ['tenth', 'twentieth', 'hourly'];
    activityPresets.forEach(preset => {
      expect(validRateTypes).toContain(preset.rateType);
    });
  });

  it('alle Presets haben mindestens ein Suchkeyword', () => {
    activityPresets.forEach(preset => {
      expect(preset.searchKeywords.length).toBeGreaterThan(0);
    });
  });
});

// ============== Zehntelsatz-Tests ==============

describe('Zehntelsatz-Validierung', () => {
  it('Zehntel-Presets haben defaultTenthRate innerhalb minRate-maxRate', () => {
    const tenthPresets = activityPresets.filter(p => p.rateType === 'tenth' && p.defaultTenthRate > 0);
    
    tenthPresets.forEach(preset => {
      expect(preset.defaultTenthRate).toBeGreaterThanOrEqual(preset.minRate);
      expect(preset.defaultTenthRate).toBeLessThanOrEqual(preset.maxRate);
    });
  });

  it('Zwanzigstel-Presets haben defaultTenthRate innerhalb minRate-maxRate', () => {
    const twentiethPresets = activityPresets.filter(p => p.rateType === 'twentieth');
    
    twentiethPresets.forEach(preset => {
      expect(preset.defaultTenthRate).toBeGreaterThanOrEqual(preset.minRate);
      expect(preset.defaultTenthRate).toBeLessThanOrEqual(preset.maxRate);
    });
  });

  it('Stundensatz-Presets haben defaultTenthRate = 0 oder defaultHourlyRate gesetzt', () => {
    const hourlyPresets = activityPresets.filter(p => p.rateType === 'hourly');
    
    hourlyPresets.forEach(preset => {
      const hasHourlyRate = preset.defaultHourlyRate !== undefined && preset.defaultHourlyRate > 0;
      const hasTenthRate = preset.defaultTenthRate > 0;
      expect(hasHourlyRate || !hasTenthRate).toBe(true);
    });
  });
});

// ============== Mindestgegenstandswerte-Tests ==============

describe('Mindestgegenstandswerte (§ 24 StBVV)', () => {
  const minValueTests: Array<{ activity: string; expectedMin: number; legalRef: string }> = [
    { activity: 'Einkommensteuererklärung', expectedMin: 8000, legalRef: '§ 24 Abs. 1 Nr. 1' },
    { activity: 'Anlage EÜR (Einnahmen-Überschuss-Rechnung)', expectedMin: 17500, legalRef: '§ 25' },
    { activity: 'Buchführung (monatlich)', expectedMin: 15000, legalRef: '§ 33' },
    { activity: 'Jahresabschluss GmbH', expectedMin: 8000, legalRef: '§ 35' },
    { activity: 'Körperschaftsteuererklärung', expectedMin: 16000, legalRef: '§ 24 Abs. 1 Nr. 3' },
    { activity: 'Gewerbesteuererklärung', expectedMin: 8000, legalRef: '§ 24 Abs. 1 Nr. 5' },
    { activity: 'Umsatzsteuer-Voranmeldung', expectedMin: 650, legalRef: '§ 24 Abs. 1 Nr. 7' },
    { activity: 'Umsatzsteuererklärung', expectedMin: 8000, legalRef: '§ 24 Abs. 1 Nr. 8' },
    { activity: 'Erbschaftsteuererklärung', expectedMin: 16000, legalRef: '§ 24 Abs. 1 Nr. 12' },
    { activity: 'Schenkungsteuererklärung', expectedMin: 16000, legalRef: '§ 24 Abs. 1 Nr. 13' },
    { activity: 'Anmeldung Lohnsteuer', expectedMin: 1000, legalRef: '§ 24 Abs. 1 Nr. 15' },
    { activity: 'Grundsteuererklärung', expectedMin: 25000, legalRef: '§ 24 Abs. 1 Nr. 11a' },
  ];

  minValueTests.forEach(({ activity, expectedMin, legalRef }) => {
    it(`${activity} hat Mindestgegenstandswert ${expectedMin.toLocaleString('de-DE')}€ (${legalRef})`, () => {
      const preset = getActivityPreset(activity);
      expect(preset).toBeDefined();
      expect(preset?.minObjectValue).toBe(expectedMin);
    });
  });

  it('Zeitgebühr-basierte Tätigkeiten haben minObjectValue = 0', () => {
    const hourlyActivities = ['Prüfung Steuerbescheid', 'Erstberatung'];
    
    hourlyActivities.forEach(activity => {
      const preset = getActivityPreset(activity);
      expect(preset?.minObjectValue).toBe(0);
    });
  });
});

// ============== Rechtsgrundlagen-Tests ==============

describe('Rechtsgrundlagen-Validierung', () => {
  it('alle Presets haben eine Rechtsgrundlage', () => {
    activityPresets.forEach(preset => {
      expect(preset.legalBasis).toBeDefined();
      expect(preset.legalBasis.length).toBeGreaterThan(0);
    });
  });

  it('Rechtsgrundlagen enthalten Paragraphen-Referenz', () => {
    activityPresets.forEach(preset => {
      expect(preset.legalBasis).toMatch(/§\s*\d+/);
    });
  });

  describe('Spezifische Rechtsgrundlagen', () => {
    const legalBasisTests: Array<{ activity: string; expectedBasis: string }> = [
      { activity: 'Einkommensteuererklärung', expectedBasis: '§ 24 Abs. 1 Nr. 1' },
      { activity: 'Anlage N (Einkünfte aus nichtselbständiger Arbeit)', expectedBasis: '§ 27' },
      { activity: 'Anlage EÜR (Einnahmen-Überschuss-Rechnung)', expectedBasis: '§ 25' },
      { activity: 'Buchführung (monatlich)', expectedBasis: '§ 33' },
      { activity: 'Jahresabschluss GmbH', expectedBasis: '§ 35 Abs. 1 Nr. 1a' },
      { activity: 'Prüfung Steuerbescheid', expectedBasis: '§ 13' },
      { activity: 'Erstberatung', expectedBasis: '§ 21' },
      { activity: 'Einspruch beim Finanzamt', expectedBasis: '§ 40 Abs. 1' },
    ];

    legalBasisTests.forEach(({ activity, expectedBasis }) => {
      it(`${activity} hat Rechtsgrundlage ${expectedBasis}`, () => {
        const preset = getActivityPreset(activity);
        expect(preset?.legalBasis).toContain(expectedBasis);
      });
    });
  });
});

// ============== Gebührentabellen-Zuordnung ==============

describe('Gebührentabellen-Zuordnung', () => {
  it('Einkommensteuer-Anlagen verwenden Tabelle A', () => {
    const anlagePresets = activityPresets.filter(p => 
      p.activity.startsWith('Anlage') && p.category === 'Einkommensteuererklärung'
    );
    
    // Ausnahme: Anlage EÜR verwendet Tabelle B, Anlage L verwendet Tabelle D
    const tableAAnlagen = anlagePresets.filter(p => 
      !p.activity.includes('EÜR') && !p.activity.includes('Land- und Forstwirtschaft')
    );
    
    tableAAnlagen.forEach(preset => {
      expect(preset.suggestedFeeTable).toBe('A');
    });
  });

  it('Anlage EÜR verwendet Tabelle B', () => {
    const eurPreset = getActivityPreset('Anlage EÜR (Einnahmen-Überschuss-Rechnung)');
    expect(eurPreset?.suggestedFeeTable).toBe('B');
  });

  it('Jahresabschluss-Tätigkeiten verwenden Tabelle B', () => {
    const jahresabschlussPresets = activityPresets.filter(p => 
      p.activity.includes('Jahresabschluss')
    );
    
    jahresabschlussPresets.forEach(preset => {
      expect(preset.suggestedFeeTable).toBe('B');
    });
  });

  it('Buchführung verwendet Tabelle C', () => {
    const buchfuehrungPresets = activityPresets.filter(p => 
      p.activity.includes('Buchführung') && !p.activity.includes('Lohn')
    );
    
    buchfuehrungPresets.forEach(preset => {
      expect(preset.suggestedFeeTable).toBe('C');
    });
  });

  it('Anlage L (Landwirtschaft) verwendet Tabelle D', () => {
    const anlageLPreset = getActivityPreset('Anlage L (Land- und Forstwirtschaft)');
    expect(anlageLPreset?.suggestedFeeTable).toBe('D');
  });
});

// ============== Zwanzigstelsatz-Presets ==============

describe('Zwanzigstelsatz-Presets (§ 27 StBVV)', () => {
  const twentiethRateActivities = [
    'Anlage N (Einkünfte aus nichtselbständiger Arbeit)',
    'Anlage V (Vermietung und Verpachtung)',
    'Anlage G (Gewerbebetrieb)',
    'Anlage S (Einkünfte aus selbständiger Arbeit)',
    'Anlage KAP (Kapitalerträge)',
    'Anlage SO (Sonstige Einkünfte)',
    'Anlage R (Renten)',
    'Anlage L (Land- und Forstwirtschaft)',
    'Anlage Kind',
    'Anlage AV (Altersvorsorge)',
    'Anlage Unterhalt',
    'Anlage Vorsorgeaufwand',
    'Anlage Sonderausgaben',
    'Anlage Außergewöhnliche Belastungen',
    'Anlage Haushaltsnahe Aufwendungen',
  ];

  twentiethRateActivities.forEach(activity => {
    it(`${activity} ist als Zwanzigstelsatz konfiguriert`, () => {
      const preset = getActivityPreset(activity);
      expect(preset?.rateType).toBe('twentieth');
    });
  });
});

// ============== Stundensatz-Presets ==============

describe('Stundensatz-Presets (§ 13 StBVV)', () => {
  it('Prüfung Steuerbescheid hat korrekten Stundensatz (115€)', () => {
    const preset = getActivityPreset('Prüfung Steuerbescheid');
    expect(preset?.rateType).toBe('hourly');
    expect(preset?.defaultHourlyRate).toBe(115);
  });

  it('Erstberatung hat korrekten Stundensatz (190€)', () => {
    const preset = getActivityPreset('Erstberatung');
    expect(preset?.rateType).toBe('hourly');
    expect(preset?.defaultHourlyRate).toBe(190);
  });
});

// ============== Kategorien-Abdeckung ==============

describe('Kategorien-Abdeckung', () => {
  const categories = groupByCategory(activityPresets);

  it('Einkommensteuererklärung hat mindestens 15 Presets', () => {
    expect(categories['Einkommensteuererklärung']?.length).toBeGreaterThanOrEqual(15);
  });

  it('Jahresabschluss & Buchführung hat mindestens 10 Presets', () => {
    expect(categories['Jahresabschluss & Buchführung']?.length).toBeGreaterThanOrEqual(10);
  });

  it('Umsatzsteuer hat mindestens 3 Presets', () => {
    expect(categories['Umsatzsteuer']?.length).toBeGreaterThanOrEqual(3);
  });

  it('Lohnbuchhaltung hat mindestens 4 Presets', () => {
    expect(categories['Lohnbuchhaltung']?.length).toBeGreaterThanOrEqual(4);
  });
});

// ============== getActivityPreset() Tests ==============

describe('getActivityPreset() Lookup', () => {
  it('findet existierende Presets exakt', () => {
    const preset = getActivityPreset('Einkommensteuererklärung');
    expect(preset).toBeDefined();
    expect(preset?.activity).toBe('Einkommensteuererklärung');
  });

  it('gibt undefined für nicht existierende Presets zurück', () => {
    const preset = getActivityPreset('Nicht existierende Tätigkeit');
    expect(preset).toBeUndefined();
  });

  it('unterscheidet zwischen Groß-/Kleinschreibung', () => {
    const preset = getActivityPreset('einkommensteuererklärung');
    expect(preset).toBeUndefined();
  });
});

// ============== Prüfsumme für Änderungsdetektion ==============

describe('Presets Prüfsumme', () => {
  it('Anzahl der Presets ist stabil', () => {
    // Bei Änderungen an Presets muss dieser Test aktualisiert werden
    expect(activityPresets.length).toBe(66);
  });

  it('Kategorien-Verteilung ist stabil', () => {
    const categories = groupByCategory(activityPresets);
    const categoryCount = Object.keys(categories).length;
    expect(categoryCount).toBe(10);
  });
});
