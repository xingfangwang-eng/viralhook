import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const [canonicalUrl, setCanonicalUrl] = useState('');

  useEffect(() => {
    const baseUrl = 'https://viralhook.com';
    setCanonicalUrl(`${baseUrl}${location.pathname}`);
  }, [location.pathname]);

  return (
    <div>
      {canonicalUrl && (
        <link rel="canonical" href={canonicalUrl} />
      )}
      {children}
    </div>
  );
};

export default Layout;