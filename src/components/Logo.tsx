import React from 'react';

export function Logo({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <img 
      src="https://i.ibb.co.com/pjbz5RTt/image.png" 
      alt="Randhanshala Logo" 
      className={className}
      referrerPolicy="no-referrer"
    />
  );
}
