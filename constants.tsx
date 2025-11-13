import React from 'react';

export interface Sport {
  key: string;
  name: string;
  // Fix: Changed JSX.Element to React.ReactNode to resolve "Cannot find namespace 'JSX'" error.
  icon: React.ReactNode;
}

export const SPORTS: Sport[] = [
  { 
    key: 'NFL', 
    name: 'Football', 
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.29 15.29l-4-4a1 1 0 011.41-1.41L12 12.59l4.29-4.3a1 1 0 011.41 1.41l-5 5a1 1 0 01-1.41 0z" /></svg> 
  },
  { 
    key: 'NBA', 
    name: 'Basketball', 
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm0 14c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z" /></svg>
  },
  { 
    key: 'MLB', 
    name: 'Baseball', 
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2.29-8.71L12 10.59l2.29-2.3a1 1 0 011.42 1.42L13.41 12l2.3 2.29a1 1 0 01-1.42 1.42L12 13.41l-2.29 2.3a1 1 0 01-1.42-1.42L10.59 12l-2.3-2.29a1 1 0 011.42-1.42z" /></svg>
  },
  { 
    key: 'NHL', 
    name: 'Hockey', 
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.14 5.86a2 2 0 00-2.83 0L12 10.17l-4.31-4.31a2 2 0 10-2.83 2.83L10.17 12l-4.31 4.31a2 2 0 102.83 2.83L12 13.83l4.31 4.31a2 2 0 102.83-2.83L13.83 12l4.31-4.31a2 2 0 000-2.83z" /></svg>
  },
  { 
    key: 'Premier League', 
    name: 'Soccer', 
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21.5,12a9.5,9.5,0,1,1-19,0,9.5,9.5,0,1,1,19,0Z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12,2a10,10,0,0,0,0,20" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2,12a10,10,0,0,0,20,0" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.5,12a6.5,6.5,0,0,1,13,0" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12,5.5a6.5,6.5,0,0,1,0,13" /></svg>
  },
  { 
    key: 'UFC', 
    name: 'MMA', 
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
  },
];
