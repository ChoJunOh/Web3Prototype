import React from 'react';
import { Navigation } from './Navigation';
interface LayoutProps {
  children: React.ReactNode;
  showNav?: boolean;
}
export function Layout({
  children,
  showNav = true
}: LayoutProps) {
  return <div className="min-h-screen bg-gradient-to-br from-gray-50 to-teal-50">
      <main className={`max-w-lg mx-auto ${showNav ? 'pb-24' : ''}`}>
        {children}
      </main>
      {showNav && <Navigation />}
    </div>;
}