import React from 'react';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { 
  MousePointer, 
  Move3d, 
  RotateCw, 
  Square, 
  ZoomIn, 
  ZoomOut, 
  Grid3x3, 
  Eye, 
  Layers,
  Copy,
  Scissors,
  Download,
  Upload,
  Printer
} from 'lucide-react';

const Toolbar = ({ 
  tool, 
  setTool, 
  zoomLevel, 
  onZoomIn, 
  onZoomOut, 
  showGrid, 
  setShowGrid 
}) => {
  const tools = [
    { id: 'select', icon: MousePointer, label: 'Select' },
    { id: 'move', icon: Move3d, label: 'Move' },
    { id: 'rotate', icon: RotateCw, label: 'Rotate' },
    { id: 'rect', icon: Square, label: 'Rectangle' }
  ];

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center gap-2">
      {/* Selection Tools */}
      <div className="flex items-center gap-1">
        {tools.map((toolItem) => {
          const Icon = toolItem.icon;
          return (
            <Button
              key={toolItem.id}
              variant={tool === toolItem.id ? "default" : "ghost"}
              size="sm"
              onClick={() => setTool(toolItem.id)}
              className="w-8 h-8 p-0"
              title={toolItem.label}
            >
              <Icon className="w-4 h-4" />
            </Button>
          );
        })}
      </div>

      <Separator orientation="vertical" className="h-6 mx-2" />

      {/* Zoom Controls */}
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="sm" onClick={onZoomOut} className="w-8 h-8 p-0">
          <ZoomOut className="w-4 h-4" />
        </Button>
        <div className="text-sm font-mono w-12 text-center">{zoomLevel}%</div>
        <Button variant="ghost" size="sm" onClick={onZoomIn} className="w-8 h-8 p-0">
          <ZoomIn className="w-4 h-4" />
        </Button>
      </div>

      <Separator orientation="vertical" className="h-6 mx-2" />

      {/* View Options */}
      <div className="flex items-center gap-1">
        <Button
          variant={showGrid ? "default" : "ghost"}
          size="sm"
          onClick={() => setShowGrid(!showGrid)}
          className="w-8 h-8 p-0"
          title="Toggle Grid"
        >
          <Grid3x3 className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" className="w-8 h-8 p-0" title="Layers">
          <Layers className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" className="w-8 h-8 p-0" title="Preview">
          <Eye className="w-4 h-4" />
        </Button>
      </div>

      <Separator orientation="vertical" className="h-6 mx-2" />

      {/* Actions */}
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="sm" className="w-8 h-8 p-0" title="Copy">
          <Copy className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" className="w-8 h-8 p-0" title="Cut">
          <Scissors className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex-1" />

      {/* Output Options */}
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="sm" title="Import">
          <Upload className="w-4 h-4 mr-1" />
          Import
        </Button>
        <Button variant="ghost" size="sm" title="Export">
          <Download className="w-4 h-4 mr-1" />
          Export
        </Button>
        <Button variant="ghost" size="sm" title="Print">
          <Printer className="w-4 h-4 mr-1" />
          Print
        </Button>
      </div>
    </div>
  );
};

export default Toolbar;