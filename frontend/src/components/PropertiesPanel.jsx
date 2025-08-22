import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ScrollArea } from './ui/scroll-area';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { 
  Settings, 
  FileText, 
  Layers, 
  Grid,
  RotateCw,
  Move3d,
  Ruler
} from 'lucide-react';

const PropertiesPanel = ({ 
  selectedTemplate, 
  selectedJob, 
  setSelectedTemplate 
}) => {
  const [activeTab, setActiveTab] = useState("template");

  const bindingTypes = [
    { value: "perfect", label: "Perfect Binding" },
    { value: "saddle", label: "Saddle Stitch" },
    { value: "step-repeat", label: "Step and Repeat" }
  ];

  const sheetSizes = [
    "8.5 x 11", "11 x 17", "12 x 18", "13 x 19", 
    "25 x 38", "26 x 40", "Custom"
  ];

  const updateTemplate = (field, value) => {
    if (selectedTemplate) {
      setSelectedTemplate({
        ...selectedTemplate,
        [field]: value
      });
    }
  };

  const updateMarks = (markType, enabled) => {
    if (selectedTemplate) {
      setSelectedTemplate({
        ...selectedTemplate,
        marks: {
          ...selectedTemplate.marks,
          [markType]: enabled
        }
      });
    }
  };

  return (
    <div className="h-full bg-white border-l border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <Settings className="w-4 h-4 text-gray-600" />
          <span className="font-semibold">Properties</span>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-3 m-2">
          <TabsTrigger value="template">Template</TabsTrigger>
          <TabsTrigger value="pages">Pages</TabsTrigger>
          <TabsTrigger value="marks">Marks</TabsTrigger>
        </TabsList>

        <ScrollArea className="flex-1">
          <TabsContent value="template" className="p-4 mt-0 space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Template Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="template-name" className="text-xs">Template Name</Label>
                  <Input
                    id="template-name"
                    value={selectedTemplate?.name || ''}
                    onChange={(e) => updateTemplate('name', e.target.value)}
                    className="h-8 mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="binding-type" className="text-xs">Binding Type</Label>
                  <Select 
                    value={selectedTemplate?.bindingType || 'perfect'}
                    onValueChange={(value) => updateTemplate('bindingType', value)}
                  >
                    <SelectTrigger className="h-8 mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {bindingTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="sheet-size" className="text-xs">Sheet Size</Label>
                  <Select 
                    value={selectedTemplate?.sheetSize || '25 x 38'}
                    onValueChange={(value) => updateTemplate('sheetSize', value)}
                  >
                    <SelectTrigger className="h-8 mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {sheetSizes.map((size) => (
                        <SelectItem key={size} value={size}>
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="pages-across" className="text-xs">Pages Across</Label>
                    <Input
                      id="pages-across"
                      type="number"
                      value={selectedTemplate?.pagesAcross || 2}
                      onChange={(e) => updateTemplate('pagesAcross', parseInt(e.target.value))}
                      className="h-8 mt-1"
                      min="1"
                      max="10"
                    />
                  </div>
                  <div>
                    <Label htmlFor="pages-down" className="text-xs">Pages Down</Label>
                    <Input
                      id="pages-down"
                      type="number"
                      value={selectedTemplate?.pagesDown || 2}
                      onChange={(e) => updateTemplate('pagesDown', parseInt(e.target.value))}
                      className="h-8 mt-1"
                      min="1"
                      max="10"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Ruler className="w-4 h-4" />
                  Margins & Gutters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="top-margin" className="text-xs">Top</Label>
                    <Input
                      id="top-margin"
                      type="number"
                      step="0.125"
                      value={selectedTemplate?.margins?.top || 0.5}
                      onChange={(e) => updateTemplate('margins', {
                        ...selectedTemplate?.margins,
                        top: parseFloat(e.target.value)
                      })}
                      className="h-8 mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="bottom-margin" className="text-xs">Bottom</Label>
                    <Input
                      id="bottom-margin"
                      type="number"
                      step="0.125"
                      value={selectedTemplate?.margins?.bottom || 0.5}
                      onChange={(e) => updateTemplate('margins', {
                        ...selectedTemplate?.margins,
                        bottom: parseFloat(e.target.value)
                      })}
                      className="h-8 mt-1"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="left-margin" className="text-xs">Left</Label>
                    <Input
                      id="left-margin"
                      type="number"
                      step="0.125"
                      value={selectedTemplate?.margins?.left || 0.5}
                      onChange={(e) => updateTemplate('margins', {
                        ...selectedTemplate?.margins,
                        left: parseFloat(e.target.value)
                      })}
                      className="h-8 mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="right-margin" className="text-xs">Right</Label>
                    <Input
                      id="right-margin"
                      type="number"
                      step="0.125"
                      value={selectedTemplate?.margins?.right || 0.5}
                      onChange={(e) => updateTemplate('margins', {
                        ...selectedTemplate?.margins,
                        right: parseFloat(e.target.value)
                      })}
                      className="h-8 mt-1"
                    />
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="gutter-x" className="text-xs">H Gutter</Label>
                    <Input
                      id="gutter-x"
                      type="number"
                      step="0.125"
                      value={selectedTemplate?.gutters?.x || 0.125}
                      onChange={(e) => updateTemplate('gutters', {
                        ...selectedTemplate?.gutters,
                        x: parseFloat(e.target.value)
                      })}
                      className="h-8 mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="gutter-y" className="text-xs">V Gutter</Label>
                    <Input
                      id="gutter-y"
                      type="number"
                      step="0.125"
                      value={selectedTemplate?.gutters?.y || 0.125}
                      onChange={(e) => updateTemplate('gutters', {
                        ...selectedTemplate?.gutters,
                        y: parseFloat(e.target.value)
                      })}
                      className="h-8 mt-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pages" className="p-4 mt-0 space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Layers className="w-4 h-4" />
                  Page Layout
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedTemplate?.pages ? (
                  <div className="space-y-2">
                    {selectedTemplate.pages.map((page, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="w-8 h-6 text-xs">
                            {index + 1}
                          </Badge>
                          <span className="text-sm">
                            {page.width}" × {page.height}"
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          {page.rotation !== 0 && (
                            <Badge variant="outline" className="text-xs">
                              <RotateCw className="w-3 h-3 mr-1" />
                              {page.rotation}°
                            </Badge>
                          )}
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <Move3d className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 text-center py-4">
                    No pages configured
                  </p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Page Controls</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" size="sm" className="w-full">
                  Auto Arrange
                </Button>
                <Button variant="outline" size="sm" className="w-full">
                  Reset Positions
                </Button>
                <Button variant="outline" size="sm" className="w-full">
                  Duplicate Page
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="marks" className="p-4 mt-0 space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Grid className="w-4 h-4" />
                  Print Marks
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="crop-marks"
                    checked={selectedTemplate?.marks?.cropMarks || false}
                    onCheckedChange={(checked) => updateMarks('cropMarks', checked)}
                  />
                  <Label htmlFor="crop-marks" className="text-sm">Crop Marks</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="registration-marks"
                    checked={selectedTemplate?.marks?.registrationMarks || false}
                    onCheckedChange={(checked) => updateMarks('registrationMarks', checked)}
                  />
                  <Label htmlFor="registration-marks" className="text-sm">Registration Marks</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="color-bars"
                    checked={selectedTemplate?.marks?.colorBars || false}
                    onCheckedChange={(checked) => updateMarks('colorBars', checked)}
                  />
                  <Label htmlFor="color-bars" className="text-sm">Color Bars</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="folding-marks"
                    checked={selectedTemplate?.marks?.foldingMarks || false}
                    onCheckedChange={(checked) => updateMarks('foldingMarks', checked)}
                  />
                  <Label htmlFor="folding-marks" className="text-sm">Folding Marks</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="job-info"
                    checked={selectedTemplate?.marks?.jobInfo || false}
                    onCheckedChange={(checked) => updateMarks('jobInfo', checked)}
                  />
                  <Label htmlFor="job-info" className="text-sm">Job Information</Label>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Mark Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label htmlFor="mark-size" className="text-xs">Mark Size</Label>
                  <Input
                    id="mark-size"
                    type="number"
                    step="0.025"
                    value="0.125"
                    className="h-8 mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="mark-offset" className="text-xs">Offset from Edge</Label>
                  <Input
                    id="mark-offset"
                    type="number"
                    step="0.025"
                    value="0.125"
                    className="h-8 mt-1"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  );
};

export default PropertiesPanel;