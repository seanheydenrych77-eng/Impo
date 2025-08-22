import React from 'react';

// Utility class for calculating imposition layouts
export class ImpositionCalculator {
  
  static calculateStepAndRepeat(pageSize, sheetSize, margins, gutters) {
    const { width: pageWidth, height: pageHeight } = pageSize;
    const { width: sheetWidth, height: sheetHeight } = sheetSize;
    const { top, bottom, left, right } = margins;
    const { x: gutterX, y: gutterY } = gutters;
    
    // Available area after margins
    const availableWidth = sheetWidth - left - right;
    const availableHeight = sheetHeight - top - bottom;
    
    // Calculate how many pages fit across and down
    const pagesAcross = Math.floor((availableWidth + gutterX) / (pageWidth + gutterX));
    const pagesDown = Math.floor((availableHeight + gutterY) / (pageHeight + gutterY));
    
    const totalPages = pagesAcross * pagesDown;
    
    // Calculate positions
    const pages = [];
    for (let row = 0; row < pagesDown; row++) {
      for (let col = 0; col < pagesAcross; col++) {
        const x = left + col * (pageWidth + gutterX);
        const y = top + row * (pageHeight + gutterY);
        
        pages.push({
          x,
          y,
          width: pageWidth,
          height: pageHeight,
          rotation: 0,
          pageNumber: 1 // Same page repeated
        });
      }
    }
    
    return {
      pagesAcross,
      pagesDown,
      totalPages,
      pages,
      efficiency: (totalPages * pageWidth * pageHeight) / (sheetWidth * sheetHeight)
    };
  }
  
  static calculateSaddleStitch(pageCount, pageSize, sheetSize, margins, gutters) {
    const { width: pageWidth, height: pageHeight } = pageSize;
    const signatures = Math.ceil(pageCount / 4) * 4; // Round up to nearest multiple of 4
    
    // For saddle stitch, pages are imposed as spreads
    // Each sheet contains 4 pages (2 spreads, front and back)
    const sheets = signatures / 4;
    const impositions = [];
    
    for (let sheet = 0; sheet < sheets; sheet++) {
      const startPage = sheet * 4;
      
      // Calculate page sequence for saddle stitch
      // Front of sheet: pages (n, 1, 2, n-1) where n = last page of signature
      // Back of sheet: pages (n-2, 3, 4, n-3)
      
      const frontPages = [
        signatures - startPage,     // Outside right back
        startPage + 1,              // Outside left front  
        startPage + 2,              // Inside left front
        signatures - startPage - 1  // Inside right back
      ];
      
      const pages = frontPages.map((pageNum, index) => ({
        x: (index % 2) * (pageWidth + gutters.x) + margins.left,
        y: Math.floor(index / 2) * (pageHeight + gutters.y) + margins.top,
        width: pageWidth,
        height: pageHeight,
        rotation: index >= 2 ? 180 : 0, // Bottom pages are rotated
        pageNumber: pageNum <= pageCount ? pageNum : null
      }));
      
      impositions.push({
        sheetNumber: sheet + 1,
        pages: pages.filter(p => p.pageNumber !== null)
      });
    }
    
    return {
      sheets,
      signatures,
      impositions
    };
  }
  
  static calculatePerfectBinding(pageCount, pageSize, sheetSize, margins, gutters, signatureSize = 16) {
    const { width: pageWidth, height: pageHeight } = pageSize;
    const signatures = Math.ceil(pageCount / signatureSize);
    const totalPages = signatures * signatureSize;
    
    const impositions = [];
    
    for (let sig = 0; sig < signatures; sig++) {
      const startPage = sig * signatureSize + 1;
      const endPage = Math.min(startPage + signatureSize - 1, pageCount);
      
      // Perfect binding page sequence for 16-page signature
      // Front: 16,1,2,15,14,3,4,13
      // Back:  12,5,6,11,10,7,8,9
      
      const sequence = this.generatePerfectBindingSequence(signatureSize);
      const pagesPerSide = signatureSize / 2;
      
      // Front of sheet
      const frontPages = sequence.slice(0, pagesPerSide).map((seqNum, index) => {
        const pageNum = startPage + seqNum - 1;
        return {
          x: (index % 4) * (pageWidth + gutters.x) + margins.left,
          y: Math.floor(index / 4) * (pageHeight + gutters.y) + margins.top,
          width: pageWidth,
          height: pageHeight,
          rotation: 0,
          pageNumber: pageNum <= endPage ? pageNum : null
        };
      });
      
      // Back of sheet  
      const backPages = sequence.slice(pagesPerSide).map((seqNum, index) => {
        const pageNum = startPage + seqNum - 1;
        return {
          x: (index % 4) * (pageWidth + gutters.x) + margins.left,
          y: Math.floor(index / 4) * (pageHeight + gutters.y) + margins.top,
          width: pageWidth,
          height: pageHeight,
          rotation: 180,
          pageNumber: pageNum <= endPage ? pageNum : null
        };
      });
      
      impositions.push({
        signatureNumber: sig + 1,
        frontPages: frontPages.filter(p => p.pageNumber !== null),
        backPages: backPages.filter(p => p.pageNumber !== null)
      });
    }
    
    return {
      signatures,
      totalPages,
      signatureSize,
      impositions
    };
  }
  
  static generatePerfectBindingSequence(signatureSize) {
    const sequence = [];
    let front = 1;
    let back = signatureSize;
    
    // Generate the sequence by alternating from outside to inside
    for (let i = 0; i < signatureSize / 2; i++) {
      if (i % 2 === 0) {
        sequence.push(back, front);
        back--;
        front++;
      } else {
        sequence.push(front, back);
        front++;
        back--;
      }
    }
    
    return sequence;
  }
}

export default ImpositionCalculator;