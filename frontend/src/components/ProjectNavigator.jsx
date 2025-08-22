import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ScrollArea } from './ui/scroll-area';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { 
  FolderOpen, 
  File, 
  FileText, 
  Plus, 
  Search,
  ChevronRight,
  ChevronDown
} from 'lucide-react';

const ProjectNavigator = ({ 
  jobs, 
  templates, 
  selectedTemplate, 
  setSelectedTemplate, 
  selectedJob, 
  setSelectedJob 
}) => {
  const [expandedJobs, setExpandedJobs] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState('');

  const toggleJobExpansion = (jobId) => {
    const newExpanded = new Set(expandedJobs);
    if (newExpanded.has(jobId)) {
      newExpanded.delete(jobId);
    } else {
      newExpanded.add(jobId);
    }
    setExpandedJobs(newExpanded);
  };

  const filteredJobs = jobs.filter(job => 
    job.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredTemplates = templates.filter(template => 
    template.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-full bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-2 mb-3">
          <FolderOpen className="w-4 h-4 text-blue-600" />
          <span className="font-semibold">Project Navigator</span>
        </div>
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input 
            placeholder="Search..." 
            className="pl-9 h-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="jobs" className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-2 m-2">
          <TabsTrigger value="jobs">Jobs</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="jobs" className="flex-1 mt-0">
          <ScrollArea className="h-full">
            <div className="p-2">
              <div className="mb-2">
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  <Plus className="w-3 h-3 mr-2" />
                  New Job
                </Button>
              </div>
              
              {filteredJobs.map((job) => (
                <div key={job.id} className="mb-1">
                  <div 
                    className={`flex items-center justify-between p-2 rounded cursor-pointer hover:bg-gray-100 ${selectedJob?.id === job.id ? 'bg-blue-100' : ''}`}
                    onClick={() => setSelectedJob(job)}
                  >
                    <div className="flex items-center gap-2 flex-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-4 h-4 p-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleJobExpansion(job.id);
                        }}
                      >
                        {expandedJobs.has(job.id) ? 
                          <ChevronDown className="w-3 h-3" /> : 
                          <ChevronRight className="w-3 h-3" />
                        }
                      </Button>
                      <File className="w-4 h-4 text-blue-500" />
                      <span className="text-sm truncate">{job.name}</span>
                    </div>
                    <span className="text-xs text-gray-500">{job.pages?.length || 0}p</span>
                  </div>
                  
                  {expandedJobs.has(job.id) && job.pages && (
                    <div className="ml-6 mt-1">
                      {job.pages.map((page, index) => (
                        <div key={index} className="flex items-center gap-2 p-1 text-xs text-gray-600 hover:bg-gray-50 rounded">
                          <FileText className="w-3 h-3" />
                          <span>Page {page.number}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="templates" className="flex-1 mt-0">
          <ScrollArea className="h-full">
            <div className="p-2">
              <div className="mb-2">
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  <Plus className="w-3 h-3 mr-2" />
                  New Template
                </Button>
              </div>
              
              {filteredTemplates.map((template) => (
                <div 
                  key={template.id}
                  className={`flex items-center gap-2 p-2 rounded cursor-pointer hover:bg-gray-100 ${selectedTemplate?.id === template.id ? 'bg-blue-100' : ''}`}
                  onClick={() => setSelectedTemplate(template)}
                >
                  <FileText className="w-4 h-4 text-green-500" />
                  <div className="flex-1">
                    <div className="text-sm font-medium">{template.name}</div>
                    <div className="text-xs text-gray-500">{template.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectNavigator;