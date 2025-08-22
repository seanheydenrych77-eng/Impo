import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Library, 
  FileText, 
  Download, 
  Plus,
  Search,
  Filter
} from 'lucide-react';

const TemplateLibrary = ({ templates, onSelectTemplate, onCreateTemplate }) => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [previewTemplate, setPreviewTemplate] = useState(null);

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || template.bindingType === filterType;
    return matchesSearch && matchesType;
  });

  const groupedTemplates = filteredTemplates.reduce((groups, template) => {
    const type = template.bindingType || 'other';
    if (!groups[type]) groups[type] = [];
    groups[type].push(template);
    return groups;
  }, {});

  const handleSelectTemplate = (template) => {
    onSelectTemplate(template);
    setOpen(false);
  };

  const TemplateCard = ({ template }) => (
    <Card 
      className="cursor-pointer hover:shadow-md transition-shadow border-2 hover:border-blue-300"
      onClick={() => setPreviewTemplate(template)}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <CardTitle className="text-sm font-medium">{template.name}</CardTitle>
          <Badge variant="secondary" className="text-xs">
            {template.bindingType === 'perfect' ? 'Perfect' :
             template.bindingType === 'saddle' ? 'Saddle' :
             template.bindingType === 'step-repeat' ? 'Step & Repeat' : 'Other'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-xs text-gray-600">{template.description}</p>
        <div className="flex justify-between text-xs text-gray-500">
          <span>Sheet: {template.sheetSize}</span>
          <span>{template.pages?.length || 0} pages</span>
        </div>
        <div className="flex gap-1 pt-1">
          <Button 
            size="sm" 
            variant="outline" 
            className="flex-1 h-7 text-xs"
            onClick={(e) => {
              e.stopPropagation();
              handleSelectTemplate(template);
            }}
          >
            <Download className="w-3 h-3 mr-1" />
            Use
          </Button>
          <Button 
            size="sm" 
            variant="ghost" 
            className="h-7 text-xs"
            onClick={(e) => {
              e.stopPropagation();
              setPreviewTemplate(template);
            }}
          >
            Preview
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const TemplatePreview = ({ template }) => {
    if (!template) return null;

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">{template.name}</h3>
          <Button 
            size="sm" 
            onClick={() => handleSelectTemplate(template)}
          >
            Use Template
          </Button>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <strong>Type:</strong> {template.impositionType}
          </div>
          <div>
            <strong>Sheet Size:</strong> {template.sheetSize}
          </div>
          <div>
            <strong>Pages:</strong> {template.pages?.length || 0}
          </div>
          <div>
            <strong>Orientation:</strong> {template.orientation}
          </div>
        </div>

        <div className="space-y-2">
          <strong className="text-sm">Description:</strong>
          <p className="text-sm text-gray-600">{template.description}</p>
        </div>

        {template.margins && (
          <div>
            <strong className="text-sm">Margins:</strong>
            <div className="grid grid-cols-2 gap-2 mt-1 text-xs">
              <span>Top: {template.margins.top}"</span>
              <span>Bottom: {template.margins.bottom}"</span>
              <span>Left: {template.margins.left}"</span>
              <span>Right: {template.margins.right}"</span>
            </div>
          </div>
        )}

        {template.marks && (
          <div>
            <strong className="text-sm">Print Marks:</strong>
            <div className="flex gap-2 mt-1 flex-wrap">
              {template.marks.cropMarks && <Badge variant="outline" className="text-xs">Crop Marks</Badge>}
              {template.marks.registrationMarks && <Badge variant="outline" className="text-xs">Registration</Badge>}
              {template.marks.colorBars && <Badge variant="outline" className="text-xs">Color Bars</Badge>}
              {template.marks.foldingMarks && <Badge variant="outline" className="text-xs">Folding Marks</Badge>}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="w-full justify-start">
          <Library className="w-3 h-3 mr-2" />
          Template Library
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Library className="w-5 h-5" />
            Template Library
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex gap-4">
          {/* Left Panel - Templates */}
          <div className="flex-1 space-y-4">
            {/* Search and Filter */}
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search templates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="perfect">Perfect Binding</SelectItem>
                  <SelectItem value="saddle">Saddle Stitch</SelectItem>
                  <SelectItem value="step-repeat">Step & Repeat</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Templates Grid */}
            <ScrollArea className="h-96">
              <Tabs value={filterType === 'all' ? 'all' : filterType} className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="all" onClick={() => setFilterType('all')}>All</TabsTrigger>
                  <TabsTrigger value="perfect" onClick={() => setFilterType('perfect')}>Perfect</TabsTrigger>
                  <TabsTrigger value="saddle" onClick={() => setFilterType('saddle')}>Saddle</TabsTrigger>
                  <TabsTrigger value="step-repeat" onClick={() => setFilterType('step-repeat')}>Step & Repeat</TabsTrigger>
                </TabsList>
                
                <div className="mt-4">
                  {Object.entries(groupedTemplates).map(([type, templates]) => (
                    <div key={type} className="mb-6">
                      {filterType === 'all' && (
                        <h4 className="font-medium mb-3 capitalize">
                          {type === 'step-repeat' ? 'Step & Repeat' : 
                           type === 'perfect' ? 'Perfect Binding' :
                           type === 'saddle' ? 'Saddle Stitch' : type}
                        </h4>
                      )}
                      <div className="grid grid-cols-1 gap-3">
                        {templates.map((template) => (
                          <TemplateCard key={template.id} template={template} />
                        ))}
                      </div>
                    </div>
                  ))}
                  
                  {filteredTemplates.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <FileText className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                      <p>No templates found</p>
                      <p className="text-sm">Try adjusting your search or filter</p>
                    </div>
                  )}
                </div>
              </Tabs>
            </ScrollArea>
          </div>

          {/* Right Panel - Preview */}
          {previewTemplate && (
            <div className="w-80 border-l border-gray-200 pl-4">
              <div className="sticky top-0">
                <h3 className="font-semibold mb-4">Template Preview</h3>
                <TemplatePreview template={previewTemplate} />
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-between pt-4 border-t">
          <Button 
            variant="outline"
            onClick={() => onCreateTemplate && onCreateTemplate()}
          >
            <Plus className="w-4 h-4 mr-2" />
            Create New Template
          </Button>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TemplateLibrary;