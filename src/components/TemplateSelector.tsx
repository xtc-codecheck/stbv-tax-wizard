import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileText, Save, Trash2, Download } from "lucide-react";
import { Template } from "@/types/stbvv";
import { getTemplates, saveCustomTemplate, deleteTemplate } from "@/utils/templateManager";
import { toast } from "sonner";

interface TemplateSelectorProps {
  onLoadTemplate: (template: Template) => void;
  onSaveAsTemplate: (name: string) => void;
  hasPositions: boolean;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  onLoadTemplate,
  onSaveAsTemplate,
  hasPositions
}) => {
  const [templates, setTemplates] = useState<Template[]>(getTemplates());
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('');
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [newTemplateName, setNewTemplateName] = useState('');

  const refreshTemplates = () => {
    setTemplates(getTemplates());
  };

  const handleLoadTemplate = () => {
    const template = templates.find(t => t.id === selectedTemplateId);
    if (template) {
      onLoadTemplate(template);
      // Toast wird jetzt in der loadTemplate-Funktion angezeigt
    } else {
      toast.error('Vorlage konnte nicht geladen werden');
    }
  };

  const handleSaveTemplate = () => {
    if (!newTemplateName.trim()) {
      toast.error('Bitte geben Sie einen Namen für die Vorlage ein');
      return;
    }
    onSaveAsTemplate(newTemplateName);
    setNewTemplateName('');
    setShowSaveDialog(false);
    refreshTemplates();
    toast.success(`Vorlage "${newTemplateName}" gespeichert`);
  };

  const handleDeleteTemplate = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template?.isCustom) {
      deleteTemplate(templateId);
      refreshTemplates();
      if (selectedTemplateId === templateId) {
        setSelectedTemplateId('');
      }
      toast.success(`Vorlage "${template.name}" gelöscht`);
    }
  };

  return (
    <>
      <Card className="border-2 border-purple-200 bg-purple-50/30">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-purple-700 flex items-center">
            <FileText className="w-5 h-5 mr-2" />
            Vorlagen
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex gap-2">
              <div className="flex-1">
                <Select value={selectedTemplateId} onValueChange={setSelectedTemplateId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Vorlage wählen..." />
                  </SelectTrigger>
                  <SelectContent>
                    <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                      Standardvorlagen
                    </div>
                    {templates.filter(t => !t.isCustom).map(template => (
                      <SelectItem key={template.id} value={template.id}>
                        {template.name}
                      </SelectItem>
                    ))}
                    {templates.some(t => t.isCustom) && (
                      <>
                        <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground border-t mt-1 pt-2">
                          Eigene Vorlagen
                        </div>
                        {templates.filter(t => t.isCustom).map(template => (
                          <SelectItem key={template.id} value={template.id}>
                            <div className="flex items-center justify-between w-full">
                              <span>{template.name}</span>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-5 w-5 p-0 ml-2 text-destructive hover:text-destructive"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteTemplate(template.id);
                                }}
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </SelectItem>
                        ))}
                      </>
                    )}
                  </SelectContent>
                </Select>
              </div>
              <Button
                onClick={handleLoadTemplate}
                disabled={!selectedTemplateId}
                variant="outline"
                className="border-purple-600 text-purple-600 hover:bg-purple-50"
              >
                <Download className="w-4 h-4" />
              </Button>
            </div>
            
            <Button
              onClick={() => setShowSaveDialog(true)}
              disabled={!hasPositions}
              variant="outline"
              className="w-full border-purple-600 text-purple-600 hover:bg-purple-50"
            >
              <Save className="w-4 h-4 mr-2" />
              Als Vorlage speichern
            </Button>
          </div>
        </CardContent>
      </Card>

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
};

export default TemplateSelector;
