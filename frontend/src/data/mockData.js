export const mockData = {
  jobs: [
    {
      id: 1,
      name: "Business Cards - ABC Corp",
      status: "Ready",
      created: "2024-01-15",
      bindingType: "step-repeat",
      pageSize: { width: 3.5, height: 2 },
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
      bindingType: "saddle",
      pageSize: { width: 8.5, height: 11 },
      pages: [
        { number: 1, name: "Cover", size: "8.5 x 11", orientation: "portrait" },
        { number: 2, name: "Inside Left", size: "8.5 x 11", orientation: "portrait" },
        { number: 3, name: "Inside Right", size: "8.5 x 11", orientation: "portrait" },
        { number: 4, name: "Back", size: "8.5 x 11", orientation: "portrait" }
      ]
    },
    {
      id: 3,
      name: "Book - Technical Manual",
      status: "Complete", 
      created: "2024-01-10",
      bindingType: "perfect",
      pageSize: { width: 6, height: 9 },
      pages: Array.from({ length: 32 }, (_, i) => ({
        number: i + 1,
        name: `Page ${i + 1}`,
        size: "6 x 9",
        orientation: "portrait"
      }))
    }
  ],
  
  templates: [
    {
      id: 1,
      name: "Step & Repeat - Business Cards",
      description: "10-up business card layout",
      type: "Business Card",
      bindingType: "step-repeat",
      sheetSize: "12 x 18",
      impositionType: "Step and Repeat",
      orientation: "Portrait",
      pagesAcross: 5,
      pagesDown: 2,
      gutters: { x: 0.125, y: 0.125 },
      margins: { top: 1, bottom: 1, left: 1, right: 1 },
      marks: {
        cropMarks: true,
        registrationMarks: true,
        colorBars: false,
        foldingMarks: false,
        jobInfo: true
      },
      pages: Array.from({ length: 10 }, (_, i) => ({
        x: (i % 5) * 3.75 + 1,
        y: Math.floor(i / 5) * 2.25 + 1,
        width: 3.5,
        height: 2,
        rotation: 0
      }))
    },
    {
      id: 2,
      name: "Saddle Stitch - 8 Pages",
      description: "Saddle stitched booklet imposition",
      type: "Booklet",
      bindingType: "saddle",
      sheetSize: "25 x 38",
      impositionType: "Saddle Stitch",
      orientation: "Landscape",
      pagesAcross: 2,
      pagesDown: 2,
      gutters: { x: 0.25, y: 0.25 },
      margins: { top: 1, bottom: 1, left: 1, right: 1 },
      marks: {
        cropMarks: true,
        registrationMarks: true,
        colorBars: true,
        foldingMarks: true,
        jobInfo: true
      },
      pages: [
        // Front of sheet - pages 8,1,2,7
        { x: 1, y: 1, width: 8.5, height: 11, rotation: 0, pageNumber: 8 },
        { x: 10, y: 1, width: 8.5, height: 11, rotation: 0, pageNumber: 1 },
        { x: 1, y: 13, width: 8.5, height: 11, rotation: 180, pageNumber: 2 },
        { x: 10, y: 13, width: 8.5, height: 11, rotation: 180, pageNumber: 7 }
      ]
    },
    {
      id: 3,
      name: "Perfect Binding - 16 Page Signature",
      description: "Perfect bound signature for books",
      type: "Signature",
      bindingType: "perfect",
      sheetSize: "25 x 38",
      impositionType: "Perfect Binding",
      orientation: "Landscape",
      pagesAcross: 4,
      pagesDown: 2,
      gutters: { x: 0.125, y: 0.125 },
      margins: { top: 0.75, bottom: 0.75, left: 0.75, right: 0.75 },
      marks: {
        cropMarks: true,
        registrationMarks: true,
        colorBars: true,
        foldingMarks: false,
        jobInfo: true
      },
      pages: Array.from({ length: 16 }, (_, i) => {
        // Perfect binding page sequence: 16,1,2,15,14,3,4,13,12,5,6,11,10,7,8,9
        const sequence = [16,1,2,15,14,3,4,13,12,5,6,11,10,7,8,9];
        return {
          x: (i % 4) * 6 + 1,
          y: Math.floor(i / 4) * 12 + 1,
          width: 5.5,
          height: 8.5,
          rotation: i >= 8 ? 180 : 0,
          pageNumber: sequence[i]
        };
      })
    }
  ],

  sheetSizes: [
    { name: "Letter", width: 8.5, height: 11 },
    { name: "Legal", width: 8.5, height: 14 },
    { name: "Tabloid", width: 11, height: 17 },
    { name: "12 x 18", width: 12, height: 18 },
    { name: "13 x 19", width: 13, height: 19 },
    { name: "25 x 38", width: 25, height: 38 },
    { name: "26 x 40", width: 26, height: 40 },
    { name: "Custom", width: 0, height: 0 }
  ],

  bindingTypes: [
    {
      id: "perfect",
      name: "Perfect Binding",
      description: "Pages are printed in signatures and bound at the spine",
      typical_uses: ["Books", "Catalogs", "Manuals"],
      signature_sizes: [4, 8, 16, 32],
      requires_folding: true
    },
    {
      id: "saddle",
      name: "Saddle Stitch",  
      description: "Pages are folded and stapled through the spine",
      typical_uses: ["Booklets", "Magazines", "Newsletters"],
      page_counts: [4, 8, 12, 16, 20, 24, 28, 32],
      requires_folding: true
    },
    {
      id: "step-repeat",
      name: "Step and Repeat",
      description: "Multiple copies of the same page repeated on a sheet",
      typical_uses: ["Business Cards", "Labels", "Post Cards", "Flyers"],
      requires_folding: false,
      cutting_required: true
    }
  ]
};