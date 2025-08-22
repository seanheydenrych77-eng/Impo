import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';
import { Resizable, ResizableHandle, ResizablePanel, ResizablePanelGroup } from './ui/resizable';
import { 
  File, 
  FolderOpen, 
  Save, 
  Settings, 
  Grid3x3, 
  RotateCw, 
  ZoomIn, 
  ZoomOut, 
  Eye,
  Layers,
  Move3d,
  Square,
  MousePointer,
  Download,
  Upload,
  Printer,
  Copy,
  Scissors
} from 'lucide-react';
import Toolbar from './Toolbar';
import ProjectNavigator from './ProjectNavigator';
import PropertiesPanel from './PropertiesPanel';
import PreviewArea from './PreviewArea';
import { mockData } from '../data/mockData';

const PrepsWorkspace = () => {
  const [jobs, setJobs] = useState(mockData.jobs);
  const [templates, setTemplates] = useState(mockData.templates);
  const [selectedTemplate, setSelectedTemplate] = useState(mockData.templates[0]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [tool, setTool] = useState('select');
  const [showGrid, setShowGrid] = useState(true);
  
  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 10, 200));
  };
  
  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 10, 25));
  };

  const handleCreateJob = (newJob) => {
    setJobs(prev => [...prev, newJob]);
    setSelectedJob(newJob);
  };

  const handleCreateTemplate = () => {
    // TODO: Implement template creation dialog
    console.log('Create new template');
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Main Menu Bar */}
      <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="text-xl font-bold text-blue-600">Preps</div>
          <div className="text-sm text-gray-500">Imposition Software</div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <File className="w-4 h-4 mr-1" />
            New
          </Button>
          <Button variant="ghost" size="sm">
            <FolderOpen className="w-4 h-4 mr-1" />
            Open
          </Button>
          <Button variant="ghost" size="sm">
            <Save className="w-4 h-4 mr-1" />
            Save
          </Button>
          <Separator orientation="vertical" className="h-6 mx-2" />
          <Button variant="ghost" size="sm">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Toolbar */}
      <Toolbar 
        tool={tool} 
        setTool={setTool}
        zoomLevel={zoomLevel}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        showGrid={showGrid}
        setShowGrid={setShowGrid}
      />

      {/* Main Workspace */}
      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal" className="h-full">
          {/* Left Panel - Project Navigator */}
          <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
            <ProjectNavigator 
              jobs={mockData.jobs}
              templates={mockData.templates}
              selectedTemplate={selectedTemplate}
              setSelectedTemplate={setSelectedTemplate}
              selectedJob={selectedJob}
              setSelectedJob={setSelectedJob}
            />
          </ResizablePanel>
          
          <ResizableHandle />
          
          {/* Center Panel - Preview Area */}
          <ResizablePanel defaultSize={60} minSize={40}>
            <PreviewArea 
              selectedTemplate={selectedTemplate}
              selectedJob={selectedJob}
              zoomLevel={zoomLevel}
              tool={tool}
              showGrid={showGrid}
            />
          </ResizablePanel>
          
          <ResizableHandle />
          
          {/* Right Panel - Properties */}
          <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
            <PropertiesPanel 
              selectedTemplate={selectedTemplate}
              selectedJob={selectedJob}
              setSelectedTemplate={setSelectedTemplate}
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      {/* Status Bar */}
      <div className="bg-white border-t border-gray-200 px-4 py-1 flex items-center justify-between text-sm text-gray-600">
        <div className="flex items-center gap-4">
          <span>Ready</span>
          <span>Template: {selectedTemplate?.name || 'None'}</span>
        </div>
        <div className="flex items-center gap-4">
          <span>Zoom: {zoomLevel}%</span>
          <span>Pages: {selectedJob?.pages?.length || 0}</span>
        </div>
      </div>
    </div>
  );
};

export default PrepsWorkspace;