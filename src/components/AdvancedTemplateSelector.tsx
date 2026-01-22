/**
 * AdvancedTemplateSelector - Vorlagen mit Fuzzy-Search, Kategorien und Vorschau
 * @module components/AdvancedTemplateSelector
 */

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import {
  FileText,
  Save,
  Trash2,
  Search,
  ChevronDown,
  ChevronRight,
  Clock,
  Sparkles,
  X,
} from 'lucide-react';
import { Template } from '@/types/stbvv';
import { getTemplates, saveCustomTemplate, deleteTemplate } from '@/utils/templateManager';
import { useTemplateSearch, getCategoryForTemplate, TEMPLATE_CATEGORIES } from '@/hooks/useTemplateSearch';
import { toast } from 'sonner';

interface AdvancedTemplateSelectorProps {
  onLoadTemplate: (template: Template) => void;
  onSaveAsTemplate: (name: string) => void;
  hasPositions: boolean;
}

function TemplatePreview({ template }: { template: Template }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="font-medium text-sm">{template.name}</span>
        <Badge variant="outline" className="text-xs">
          {template.positions.length} Positionen
        </Badge>
      </div>
      <div className="text-xs text-muted-foreground space-y-1 max-h-[200px] overflow-y-auto">
        {template.positions.slice(0, 5).map((pos, i) => (
          <div key={i} className="flex items-center gap-2 py-1 border-b border-border/50 last:border-0">
            <span className="w-4 h-4 rounded-full bg-primary/10 text-primary text-[10px] flex items-center justify-center flex-shrink-0">
              {i + 1}
            </span>
            <span className="truncate">{pos.activity || 'Unbenannt'}</span>
          </div>
        ))}
        {template.positions.length > 5 && (
          <div className="text-muted-foreground/60 pt-1">
            + {template.positions.length - 5} weitere Positionen
          </div>
        )}
      </div>
    </div>
  );
}

export function AdvancedTemplateSelector({
  onLoadTemplate,
  onSaveAsTemplate,
  hasPositions,
}: AdvancedTemplateSelectorProps) {
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [newTemplateName, setNewTemplateName] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const templates = useMemo(() => getTemplates(), []);
  const {
    searchQuery,
    setSearchQuery,
    recentTemplates,
    addToRecent,
    categorizedTemplates,
    customTemplates,
  } = useTemplateSearch(templates);

  const handleLoadTemplate = (template: Template) => {
    addToRecent(template.id);
    onLoadTemplate(template);
    toast.success(`Vorlage "${template.name}" geladen`);
  };

  const handleSaveTemplate = () => {
    if (!newTemplateName.trim()) {
      toast.error('Bitte geben Sie einen Namen ein');
      return;
    }
    onSaveAsTemplate(newTemplateName);
    setNewTemplateName('');
    setShowSaveDialog(false);
    toast.success(`Vorlage "${newTemplateName}" gespeichert`);
  };

  const handleDeleteTemplate = (templateId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const template = templates.find(t => t.id === templateId);
    if (template?.isCustom) {
      deleteTemplate(templateId);
      toast.success(`Vorlage "${template.name}" gelöscht`);
    }
  };

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  return (
    <>
      <Card className="border-2 border-primary/20 bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Vorlagen
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Vorlagen durchsuchen..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-9"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
                onClick={() => setSearchQuery('')}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>

          {/* Recent Templates */}
          {!searchQuery && recentTemplates.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <Clock className="h-3 w-3" />
                Zuletzt verwendet
              </div>
              <div className="flex flex-wrap gap-1.5">
                {recentTemplates.map(template => (
                  <HoverCard key={template.id} openDelay={300}>
                    <HoverCardTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 text-xs"
                        onClick={() => handleLoadTemplate(template)}
                      >
                        {template.name.length > 25
                          ? template.name.slice(0, 22) + '...'
                          : template.name}
                      </Button>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80" side="right">
                      <TemplatePreview template={template} />
                    </HoverCardContent>
                  </HoverCard>
                ))}
              </div>
            </div>
          )}

          {/* Template List */}
          <ScrollArea className="h-[300px] pr-3">
            <div className="space-y-2">
              {/* Categorized Templates */}
              {categorizedTemplates.map(category => (
                <Collapsible
                  key={category.id}
                  open={expandedCategories.includes(category.id)}
                  onOpenChange={() => toggleCategory(category.id)}
                >
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full justify-between h-8 px-2 hover:bg-accent"
                    >
                      <div className="flex items-center gap-2">
                        {expandedCategories.includes(category.id) ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                        <span className="text-sm font-medium">{category.name}</span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {category.templates.length}
                      </Badge>
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pl-6 space-y-1 pt-1">
                    {category.templates.map(template => (
                      <HoverCard key={template.id} openDelay={400}>
                        <HoverCardTrigger asChild>
                          <Button
                            variant="ghost"
                            className="w-full justify-start h-auto py-2 px-2 text-left hover:bg-accent"
                            onClick={() => handleLoadTemplate(template)}
                          >
                            <span className="text-sm truncate">{template.name}</span>
                          </Button>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-80" side="right" align="start">
                          <TemplatePreview template={template} />
                        </HoverCardContent>
                      </HoverCard>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              ))}

              {/* Custom Templates */}
              {customTemplates.length > 0 && (
                <Collapsible
                  open={expandedCategories.includes('custom')}
                  onOpenChange={() => toggleCategory('custom')}
                >
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full justify-between h-8 px-2 hover:bg-accent"
                    >
                      <div className="flex items-center gap-2">
                        {expandedCategories.includes('custom') ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                        <Sparkles className="h-4 w-4 text-amber-500" />
                        <span className="text-sm font-medium">Eigene Vorlagen</span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {customTemplates.length}
                      </Badge>
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pl-6 space-y-1 pt-1">
                    {customTemplates.map(template => (
                      <div key={template.id} className="flex items-center gap-1">
                        <HoverCard openDelay={400}>
                          <HoverCardTrigger asChild>
                            <Button
                              variant="ghost"
                              className="flex-1 justify-start h-auto py-2 px-2 text-left hover:bg-accent"
                              onClick={() => handleLoadTemplate(template)}
                            >
                              <span className="text-sm truncate">{template.name}</span>
                            </Button>
                          </HoverCardTrigger>
                          <HoverCardContent className="w-80" side="right" align="start">
                            <TemplatePreview template={template} />
                          </HoverCardContent>
                        </HoverCard>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={(e) => handleDeleteTemplate(template.id, e)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              )}
            </div>
          </ScrollArea>

          {/* Save Button */}
          <Button
            onClick={() => setShowSaveDialog(true)}
            disabled={!hasPositions}
            variant="outline"
            className="w-full"
          >
            <Save className="w-4 h-4 mr-2" />
            Als Vorlage speichern
          </Button>
        </CardContent>
      </Card>

      {/* Save Dialog */}
      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Vorlage speichern</DialogTitle>
            <DialogDescription>
              Geben Sie einen Namen für die Vorlage ein. Die aktuelle Konfiguration wird gespeichert.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="templateName">Vorlagenname</Label>
              <Input
                id="templateName"
                value={newTemplateName}
                onChange={(e) => setNewTemplateName(e.target.value)}
                placeholder="z.B. Meine Standard-Rechnung"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSaveTemplate();
                  }
                }}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSaveDialog(false)}>
              Abbrechen
            </Button>
            <Button onClick={handleSaveTemplate}>
              Speichern
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
