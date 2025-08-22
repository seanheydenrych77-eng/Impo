export const mockData = {
  jobs: [
    {
      id: 1,
      name: "Business Cards - ABC Corp",
      status: "Ready",
      created: "2024-01-15",
      pages: [
        { number: 1, name: "Front", size: "3.5 x 2", orientation: "landscape" },
        { number: 2, name: "Back", size: "3.5 x 2", orientation: "landscape" }
      ]
    },
    {
      id: 2,
      name: "Brochure - Marketing Campaign",
      status: "In Progress",
      created: "2024-01-16",
      pages: [
        { number: 1, name: "Cover", size: "8.5 x 11", orientation: "portrait" },
        { number: 2, name: "Inside Left", size: "8.5 x 11", orientation: "portrait" },
        { number: 3, name: "Inside Right", size: "8.5 x 11", orientation: "portrait" },
        { number: 4, name: "Back", size: "8.5 x 11", orientation: "portrait" }
      ]
    },
    {
      id: 3,
      name: "Catalog - Product Showcase",
      status: "Complete",
      created: "2024-01-10",
      pages: Array.from({ length: 16 }, (_, i) => ({
        number: i + 1,
        name: `Page ${i + 1}`,
        size: "8.5 x 11",
        orientation: "portrait"
      }))
    }
  ],
  
  templates: [
    {
      id: 1,
      name: "2-Up Business Cards",
      description: "Standard business card imposition",
      type: "Business Card",
      sheetSize: "12 x 18",
      impositionType: "2-Up",
      orientation: "Portrait",
      gutters: { x: 0.125, y: 0.125 },
      margins: { top: 0.5, bottom: 0.5, left: 0.5, right: 0.5 },
      marks: {
        cropMarks: true,
        registrationMarks: true,
        colorBars: false
      },
      pages: [
        { x: 1, y: 1, width: 3.5, height: 2, rotation: 0 },
        { x: 4, y: 1, width: 3.5, height: 2, rotation: 0 }
      ]
    },
    {
      id: 2,
      name: "4-Up Saddle Stitch",
      description: "Standard saddle stitch booklet",
      type: "Booklet",
      sheetSize: "25 x 38",
      impositionType: "4-Up Saddle Stitch",
      orientation: "Landscape",
      gutters: { x: 0.25, y: 0.25 },
      margins: { top: 1, bottom: 1, left: 1, right: 1 },
      marks: {
        cropMarks: true,
        registrationMarks: true,
        colorBars: true
      },
      pages: [
        { x: 1, y: 1, width: 8.5, height: 11, rotation: 0 },
        { x: 10, y: 1, width: 8.5, height: 11, rotation: 0 },
        { x: 1, y: 13, width: 8.5, height: 11, rotation: 180 },
        { x: 10, y: 13, width: 8.5, height: 11, rotation: 180 }
      ]
    },
    {
      id: 3,
      name: "8-Page Signature",
      description: "Perfect bound signature",
      type: "Signature",
      sheetSize: "25 x 38",
      impositionType: "8-Page Signature",
      orientation: "Landscape",
      gutters: { x: 0.125, y: 0.125 },
      margins: { top: 0.75, bottom: 0.75, left: 0.75, right: 0.75 },
      marks: {
        cropMarks: true,
        registrationMarks: true,
        colorBars: true
      },
      pages: Array.from({ length: 8 }, (_, i) => ({
        x: (i % 4) * 6 + 1,
        y: Math.floor(i / 4) * 12 + 1,
        width: 5.5,
        height: 8.5,
        rotation: i >= 4 ? 180 : 0
      }))
    }
  ],

  sheetSizes: [
    { name: "Letter", width: 8.5, height: 11 },
    { name: "Legal", width: 8.5, height: 14 },
    { name: "Tabloid", width: 11, height: 17 },
    { name: "25x38", width: 25, height: 38 },
    { name: "26x40", width: 26, height: 40 },
    { name: "Custom", width: 0, height: 0 }
  ],

  marks: [
    { id: "crop", name: "Crop Marks", type: "corner", enabled: true },
    { id: "registration", name: "Registration Marks", type: "target", enabled: true },
    { id: "colorbar", name: "Color Bar", type: "strip", enabled: false },
    { id: "folding", name: "Folding Marks", type: "line", enabled: false },
    { id: "text", name: "Job Information", type: "text", enabled: true }
  ]
};