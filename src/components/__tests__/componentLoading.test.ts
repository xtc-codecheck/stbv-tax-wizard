/**
 * Component Loading Tests
 * 
 * Verifies that all critical components are exported as valid React components.
 * This prevents "Component is not a function" errors at runtime.
 */

import { describe, it, expect } from 'vitest';

describe('Critical Component Exports', () => {
  it('should export PositionCard as a valid React component', async () => {
    const module = await import('@/components/PositionCard');
    const PositionCard = module.default;
    
    expect(PositionCard).toBeDefined();
    expect(typeof PositionCard).toBe('object'); // memo returns an object
    expect(PositionCard.$$typeof).toBeDefined(); // React element marker
  });

  it('should export TotalCalculation as a valid React component', async () => {
    const module = await import('@/components/TotalCalculation');
    const TotalCalculation = module.default;
    
    expect(TotalCalculation).toBeDefined();
    expect(typeof TotalCalculation).toBe('object'); // memo returns an object
    expect(TotalCalculation.$$typeof).toBeDefined();
  });

  it('should export KeyboardShortcutsDialog as a valid React component', async () => {
    const module = await import('@/components/KeyboardShortcutsDialog');
    const { KeyboardShortcutsDialog } = module;
    
    expect(KeyboardShortcutsDialog).toBeDefined();
    expect(typeof KeyboardShortcutsDialog).toBe('function');
  });

  it('should export ErrorBoundary as a valid React component', async () => {
    const module = await import('@/components/ErrorBoundary');
    const ErrorBoundary = module.default;
    
    expect(ErrorBoundary).toBeDefined();
    expect(typeof ErrorBoundary).toBe('function');
  });

  it('should export all calculator components correctly', async () => {
    const calculatorModule = await import('@/components/calculator');
    
    const expectedExports = [
      'ClientDataFormAdvanced',
      'DocumentSettings',
      'PositionList',
      'FloatingSummaryBar',
      'BulkActionsToolbar',
      'ActionButtons',
      'CalculatorHeader',
      'CalculatorFooter',
      'AddPositionCard',
      'PDFPreviewModal',
      'DocumentTabs',
    ];

    for (const exportName of expectedExports) {
      const component = calculatorModule[exportName as keyof typeof calculatorModule];
      expect(component, `${exportName} should be defined`).toBeDefined();
      
      // Check it's either a function or a memo object
      const isValidComponent = 
        typeof component === 'function' || 
        (typeof component === 'object' && component !== null && '$$typeof' in component);
      
      expect(isValidComponent, `${exportName} should be a valid React component`).toBe(true);
    }
  });

  it('should export wizard components correctly', async () => {
    const wizardModule = await import('@/components/wizard');
    
    expect(wizardModule.GuidedWorkflow).toBeDefined();
    expect(typeof wizardModule.GuidedWorkflow).toBe('function');
  });
});

describe('Component displayName', () => {
  it('should have displayName on memoized PositionCard', async () => {
    const module = await import('@/components/PositionCard');
    const PositionCard = module.default;
    
    expect(PositionCard.displayName).toBe('PositionCard');
  });

  it('should have displayName on memoized TotalCalculation', async () => {
    const module = await import('@/components/TotalCalculation');
    const TotalCalculation = module.default;
    
    expect(TotalCalculation.displayName).toBe('TotalCalculation');
  });
});
