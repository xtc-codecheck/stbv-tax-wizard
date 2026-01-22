/**
 * Wizard Step 2: Vorlagen-Auswahl
 */

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Template } from '@/types/stbvv';
import { DEFAULT_TEMPLATES, getCustomTemplates } from '@/utils/templateManager';
import { useTemplateSearch, getCategoryForTemplate, TEMPLATE_CATEGORIES } from '@/hooks/useTemplateSearch';
import { FileText, ArrowLeft, ArrowRight, Search, Check, Sparkles } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface WizardStepTemplateProps {
  selectedTemplate: Template | null;
  onSelectTemplate: (template: Template) => void;
  onBack: () => void;
  onNext: () => void;
  onSkip: () => void;
}

export function WizardStepTemplate({ 
  selectedTemplate, 
  onSelectTemplate, 
  onBack, 
  onNext,
  onSkip 
}: WizardStepTemplateProps) {
  const customTemplates = getCustomTemplates();
  const allTemplates = [...DEFAULT_TEMPLATES, ...customTemplates];
  
  const { 
    searchQuery, 
    setSearchQuery, 
    searchResults, 
    categorizedTemplates 
  } = useTemplateSearch(allTemplates);

  const displayTemplates = searchQuery ? searchResults : null;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
          <FileText className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold">Vorlage auswählen</h2>
        <p className="text-muted-foreground mt-2">
          Wählen Sie eine Vorlage für Ihre häufigsten Tätigkeiten
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Vorlage suchen..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Selected Template Preview */}
      {selectedTemplate && (
        <Card className="border-primary bg-primary/5">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Check className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Ausgewählt: {selectedTemplate.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedTemplate.positions.length} Positionen
                  </p>
                </div>
              </div>
              <Badge variant="default">Ausgewählt</Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Template List */}
      <ScrollArea className="h-[400px] pr-4">
        {displayTemplates ? (
          // Search Results
          <div className="space-y-2">
            {displayTemplates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                isSelected={selectedTemplate?.id === template.id}
                onSelect={() => onSelectTemplate(template)}
              />
            ))}
            {displayTemplates.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                Keine Vorlagen gefunden
              </div>
            )}
          </div>
        ) : (
          // Grouped by Category
          <div className="space-y-6">
            {categorizedTemplates.map(({ id, name, color, templates }) => (
              <div key={id}>
                <div className="flex items-center gap-2 mb-3">
                  <div 
                    className="w-3 h-3 rounded-full bg-primary" 
                  />
                  <h3 className="font-semibold text-sm">{name}</h3>
                  <Badge variant="secondary" className="text-xs">
                    {templates.length}
                  </Badge>
                </div>
                <div className="space-y-2">
                  {templates.map((template) => (
                    <TemplateCard
                      key={template.id}
                      template={template}
                      isSelected={selectedTemplate?.id === template.id}
                      onSelect={() => onSelectTemplate(template)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-4 border-t">
        <Button variant="outline" onClick={onBack} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Zurück
        </Button>
        
        <div className="flex gap-2">
          <Button variant="ghost" onClick={onSkip} className="gap-2">
            <Sparkles className="w-4 h-4" />
            Ohne Vorlage
          </Button>
          <Button 
            size="lg" 
            onClick={onNext} 
            disabled={!selectedTemplate}
            className="gap-2"
          >
            Weiter zu Werten
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

// Template Card Component
function TemplateCard({ 
  template, 
  isSelected, 
  onSelect,
  categoryColor 
}: { 
  template: Template; 
  isSelected: boolean; 
  onSelect: () => void;
  categoryColor?: string;
}) {
  return (
    <Card 
      className={cn(
        'cursor-pointer transition-all hover:border-primary/50',
        isSelected && 'border-primary bg-primary/5'
      )}
      onClick={onSelect}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {categoryColor && (
              <div 
                className="w-2 h-8 rounded-full" 
                style={{ backgroundColor: categoryColor }}
              />
            )}
            <div>
              <p className="font-medium">{template.name}</p>
              <p className="text-sm text-muted-foreground">
                {template.positions.length} Position{template.positions.length !== 1 ? 'en' : ''}
                {template.isCustom && <Badge variant="outline" className="ml-2 text-xs">Eigene</Badge>}
              </p>
            </div>
          </div>
          {isSelected && (
            <Check className="w-5 h-5 text-primary" />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
