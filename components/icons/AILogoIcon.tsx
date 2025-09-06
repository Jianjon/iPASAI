import React from 'react';

const AILogoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="128" height="128" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <linearGradient id="ai-logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="var(--color-accent-indigo)" />
        <stop offset="100%" stopColor="var(--color-accent-teal)" />
      </linearGradient>
    </defs>
    <path d="M16 8.35c.427-1.741-1.039-3.35-2.818-3.35-1.13 0-2.127.61-2.617 1.51M8 8.35c-.427-1.741 1.039-3.35 2.818-3.35 1.13 0 2.127.61 2.617 1.51M16 8.35a4.23 4.23 0 01-1.127 3.127C14.015 12.232 13.004 13 12 13s-2.015-.768-2.873-1.523A4.23 4.23 0 018 8.35M17.5 12.5a5.495 5.495 0 01-2.434 4.545c-1.353.94-3.13.94-4.586 0A5.495 5.495 0 016.5 12.5" stroke="url(#ai-logo-gradient)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 13v3.5" stroke="url(#ai-logo-gradient)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 18.5v.5a2 2 0 01-2 2h-1a2 2 0 01-2-2v-1a2 2 0 012-2h1m4-1v-1a2 2 0 00-2-2h-1m-4 1h1a2 2 0 002-2v-1m4 4h1a2 2 0 002-2v-1a2 2 0 00-2-2h-1" stroke="url(#ai-logo-gradient)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="17.5" r="1" fill="url(#ai-logo-gradient)" fillOpacity="0.5" />
    <circle cx="8.5" cy="19" r="1" fill="url(#ai-logo-gradient)" fillOpacity="0.5" />
    <circle cx="15.5" cy="19" r="1" fill="url(#ai-logo-gradient)" fillOpacity="0.5" />
    <circle cx="10.5" cy="15" r="1" fill="url(#ai-logo-gradient)" fillOpacity="0.5" />
    <circle cx="13.5" cy="15" r="1" fill="url(#ai-logo-gradient)" fillOpacity="0.5" />
  </svg>
);

export default AILogoIcon;
