import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Plus, FileText } from 'lucide-react';

const NewJobDialog = ({ onCreateJob }) => {
  const [open, setOpen] = useState(false);
  const [jobData, setJobData] = useState({
    name: '',
    bindingType: 'perfect',
    pageCount: 16,
    pageWidth: 8.5,
    pageHeight: 11,
    orientation: 'portrait'
  });

  const bindingTypes = [
    { value: 'perfect', label: 'Perfect Binding', description: 'For books, catalogs, manuals' },
    { value: 'saddle', label: 'Saddle Stitch', description: 'For booklets, magazines' },
    { value: 'step-repeat', label: 'Step and Repeat', description: 'For business cards, labels' }
  ];

  const pageSizes = [
    { name: 'Letter', width: 8.5, height: 11 },
    { name: 'Legal', width: 8.5, height: 14 },
    { name: 'A4', width: 8.27, height: 11.69 },
    { name: 'Business Card', width: 3.5, height: 2 },
    { name: '6 x 9', width: 6, height: 9 },
    { name: 'Custom', width: 0, height: 0 }
  ];

  const handleCreate = () => {
    const newJob = {
      id: Date.now(),
      name: jobData.name || `New Job ${Date.now()}`,
      status: 'Ready',
      created: new Date().toISOString().split('T')[0],
      bindingType: jobData.bindingType,
      pageSize: { 
        width: jobData.pageWidth, 
        height: jobData.pageHeight 
      },
      pages: Array.from({ length: jobData.pageCount }, (_, i) => ({
        number: i + 1,
        name: `Page ${i + 1}`,
        size: `${jobData.pageWidth} x ${jobData.pageHeight}`,
        orientation: jobData.orientation
      }))
    };

    onCreateJob(newJob);
    setOpen(false);
    setJobData({
      name: '',
      bindingType: 'perfect',
      pageCount: 16,
      pageWidth: 8.5,
      pageHeight: 11,
      orientation: 'portrait'
    });
  };

  const updateJobData = (field, value) => {
    setJobData(prev => ({ ...prev, [field]: value }));
  };

  const selectPageSize = (pageSize) => {
    if (pageSize.name !== 'Custom') {
      updateJobData('pageWidth', pageSize.width);
      updateJobData('pageHeight', pageSize.height);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="w-full justify-start">
          <Plus className="w-3 h-3 mr-2" />
          New Job
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Create New Job
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="job-name">Job Name</Label>
            <Input
              id="job-name"
              placeholder="Enter job name..."
              value={jobData.name}
              onChange={(e) => updateJobData('name', e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="binding-type">Binding Type</Label>
            <Select 
              value={jobData.bindingType} 
              onValueChange={(value) => updateJobData('bindingType', value)}
            >
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {bindingTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    <div>
                      <div className="font-medium">{type.label}</div>
                      <div className="text-xs text-gray-500">{type.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="page-size">Page Size</Label>
            <Select onValueChange={(value) => {
              const pageSize = pageSizes.find(p => p.name === value);
              if (pageSize) selectPageSize(pageSize);
            }}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select page size..." />
              </SelectTrigger>
              <SelectContent>
                {pageSizes.map((size) => (
                  <SelectItem key={size.name} value={size.name}>
                    {size.name} {size.name !== 'Custom' ? `(${size.width}" × ${size.height}")` : ''}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="page-width">Width (inches)</Label>
              <Input
                id="page-width"
                type="number"
                step="0.125"
                value={jobData.pageWidth}
                onChange={(e) => updateJobData('pageWidth', parseFloat(e.target.value))}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="page-height">Height (inches)</Label>
              <Input
                id="page-height"
                type="number"
                step="0.125"
                value={jobData.pageHeight}
                onChange={(e) => updateJobData('pageHeight', parseFloat(e.target.value))}
                className="mt-1"
              />
            </div>
          </div>

          {jobData.bindingType !== 'step-repeat' && (
            <div>
              <Label htmlFor="page-count">Page Count</Label>
              <Input
                id="page-count"
                type="number"
                min="1"
                max="500"
                value={jobData.pageCount}
                onChange={(e) => updateJobData('pageCount', parseInt(e.target.value))}
                className="mt-1"
              />
            </div>
          )}

          <Card className="bg-blue-50 border-blue-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-blue-800">Binding Type Info</CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-blue-700">
              {jobData.bindingType === 'perfect' && 
                'Perfect binding is ideal for books and catalogs. Pages are printed in signatures and bound at the spine.'
              }
              {jobData.bindingType === 'saddle' && 
                'Saddle stitch is perfect for booklets and magazines. Pages are folded and stapled through the spine.'
              }
              {jobData.bindingType === 'step-repeat' && 
                'Step and repeat is used for business cards, labels, and postcards. Multiple copies are arranged on a single sheet.'
              }
            </CardContent>
          </Card>

          <div className="flex gap-2 pt-2">
            <Button variant="outline" onClick={() => setOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleCreate} className="flex-1">
              Create Job
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewJobDialog;