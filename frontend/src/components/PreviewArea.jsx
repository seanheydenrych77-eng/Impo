import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { 
  RotateCw, 
  Move, 
  Square,
  Grid3x3
} from 'lucide-react';

const PreviewArea = ({ 
  selectedTemplate, 
  selectedJob, 
  zoomLevel, 
  tool, 
  showGrid 
}) => {
  const canvasRef = useRef(null);
  const [draggedPage, setDraggedPage] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    drawImposition();
  }, [selectedTemplate, selectedJob, zoomLevel, showGrid]);

  const drawImposition = () => {
    const canvas = canvasRef.current;
    if (!canvas || !selectedTemplate) return;

    const ctx = canvas.getContext('2d');
    const scale = zoomLevel / 100;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Set up scaling
    ctx.save();
    ctx.scale(scale, scale);
    
    // Draw sheet background
    const sheetWidth = selectedTemplate.sheetSize.split(' x ')[0] * 20; // Convert inches to pixels (20px per inch)
    const sheetHeight = selectedTemplate.sheetSize.split(' x ')[1] * 20;
    
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#cccccc';
    ctx.lineWidth = 2;
    ctx.fillRect(50, 50, sheetWidth, sheetHeight);
    ctx.strokeRect(50, 50, sheetWidth, sheetHeight);
    
    // Draw grid if enabled
    if (showGrid) {
      drawGrid(ctx, 50, 50, sheetWidth, sheetHeight);
    }
    
    // Draw pages based on imposition type
    drawPages(ctx, selectedTemplate, selectedJob);
    
    // Draw marks
    if (selectedTemplate.marks?.cropMarks) {
      drawCropMarks(ctx, 50, 50, sheetWidth, sheetHeight);
    }
    
    if (selectedTemplate.marks?.registrationMarks) {
      drawRegistrationMarks(ctx, 50, 50, sheetWidth, sheetHeight);
    }
    
    ctx.restore();
  };

  const drawGrid = (ctx, x, y, width, height) => {
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 0.5;
    
    const gridSize = 20; // 1 inch grid
    
    // Vertical lines
    for (let i = 0; i <= width; i += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x + i, y);
      ctx.lineTo(x + i, y + height);
      ctx.stroke();
    }
    
    // Horizontal lines
    for (let i = 0; i <= height; i += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, y + i);
      ctx.lineTo(x + width, y + i);
      ctx.stroke();
    }
  };

  const drawPages = (ctx, template, job) => {
    if (!template.pages) return;
    
    const colors = ['#e3f2fd', '#f3e5f5', '#e8f5e8', '#fff3e0', '#fce4ec'];
    
    template.pages.forEach((page, index) => {
      const pageX = 50 + page.x * 20;
      const pageY = 50 + page.y * 20;
      const pageWidth = page.width * 20;
      const pageHeight = page.height * 20;
      
      // Draw page background
      ctx.fillStyle = colors[index % colors.length];
      ctx.fillRect(pageX, pageY, pageWidth, pageHeight);
      
      // Draw page border
      ctx.strokeStyle = '#1976d2';
      ctx.lineWidth = 1;
      ctx.strokeRect(pageX, pageY, pageWidth, pageHeight);
      
      // Draw page number
      ctx.fillStyle = '#1976d2';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(
        `P${index + 1}`, 
        pageX + pageWidth / 2, 
        pageY + pageHeight / 2 + 4
      );
      
      // Show rotation indicator if rotated
      if (page.rotation !== 0) {
        ctx.save();
        ctx.translate(pageX + pageWidth - 10, pageY + 10);
        ctx.rotate((page.rotation * Math.PI) / 180);
        ctx.fillStyle = '#f44336';
        ctx.fillText('↻', 0, 0);
        ctx.restore();
      }
    });
  };

  const drawCropMarks = (ctx, x, y, width, height) => {
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 0.5;
    
    const markLength = 10;
    const offset = 5;
    
    // Top-left
    ctx.beginPath();
    ctx.moveTo(x - offset, y - offset - markLength);
    ctx.lineTo(x - offset, y - offset);
    ctx.lineTo(x - offset - markLength, y - offset);
    ctx.stroke();
    
    // Top-right
    ctx.beginPath();
    ctx.moveTo(x + width + offset, y - offset - markLength);
    ctx.lineTo(x + width + offset, y - offset);
    ctx.lineTo(x + width + offset + markLength, y - offset);
    ctx.stroke();
    
    // Bottom-left
    ctx.beginPath();
    ctx.moveTo(x - offset, y + height + offset + markLength);
    ctx.lineTo(x - offset, y + height + offset);
    ctx.lineTo(x - offset - markLength, y + height + offset);
    ctx.stroke();
    
    // Bottom-right
    ctx.beginPath();
    ctx.moveTo(x + width + offset, y + height + offset + markLength);
    ctx.lineTo(x + width + offset, y + height + offset);
    ctx.lineTo(x + width + offset + markLength, y + height + offset);
    ctx.stroke();
  };

  const drawRegistrationMarks = (ctx, x, y, width, height) => {
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 0.5;
    
    const markSize = 8;
    const positions = [
      { x: x + width / 2, y: y - 20 }, // Top center
      { x: x + width / 2, y: y + height + 20 }, // Bottom center
      { x: x - 20, y: y + height / 2 }, // Left center
      { x: x + width + 20, y: y + height / 2 } // Right center
    ];
    
    positions.forEach(pos => {
      // Outer circle
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, markSize, 0, 2 * Math.PI);
      ctx.stroke();
      
      // Cross lines
      ctx.beginPath();
      ctx.moveTo(pos.x - markSize, pos.y);
      ctx.lineTo(pos.x + markSize, pos.y);
      ctx.moveTo(pos.x, pos.y - markSize);
      ctx.lineTo(pos.x, pos.y + markSize);
      ctx.stroke();
      
      // Inner circle
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, markSize / 3, 0, 2 * Math.PI);
      ctx.stroke();
    });
  };

  const handleMouseMove = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <div className="h-full bg-gray-100 flex flex-col">
      {/* Preview Header */}
      <div className="bg-white border-b border-gray-200 p-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Preview: {selectedTemplate?.name || 'No template selected'}</span>
          <span className="text-xs text-gray-500">
            {selectedTemplate?.sheetSize} | {selectedTemplate?.impositionType}
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span>Mouse: {Math.round(mousePosition.x)}, {Math.round(mousePosition.y)}</span>
          <span>|</span>
          <span>Zoom: {zoomLevel}%</span>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 overflow-auto p-4">
        <div className="flex justify-center">
          <canvas
            ref={canvasRef}
            width={800}
            height={600}
            className="border border-gray-300 bg-white shadow-lg cursor-crosshair"
            onMouseMove={handleMouseMove}
            style={{
              cursor: tool === 'select' ? 'default' : 
                     tool === 'move' ? 'move' : 
                     tool === 'rotate' ? 'crosshair' : 'default'
            }}
          />
        </div>
      </div>

      {/* Imposition Info */}
      {selectedTemplate && (
        <div className="bg-white border-t border-gray-200 p-3">
          <div className="grid grid-cols-3 gap-4 text-xs">
            <div>
              <span className="font-medium text-gray-600">Sheet Size:</span>
              <div className="text-gray-800">{selectedTemplate.sheetSize}</div>
            </div>
            <div>
              <span className="font-medium text-gray-600">Pages:</span>
              <div className="text-gray-800">{selectedTemplate.pages?.length || 0}</div>
            </div>
            <div>
              <span className="font-medium text-gray-600">Type:</span>
              <div className="text-gray-800">{selectedTemplate.impositionType}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PreviewArea;