import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, ClipboardListIcon, TrophyIcon, UserIcon, ShieldCheckIcon } from 'lucide-react';
export function Navigation() {
  const location = useLocation();
  const navItems = [{
    path: '/home',
    icon: HomeIcon,
    label: '홈'
  }, {
    path: '/tasks',
    icon: ClipboardListIcon,
    label: '퀘스트'
  }, {
    path: '/rewards',
    icon: TrophyIcon,
    label: '보상'
  }, {
    path: '/did',
    icon: UserIcon,
    label: 'My DID'
  }, {
    path: '/validator',
    icon: ShieldCheckIcon,
    label: '검증'
  }];
  return <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 z-50">
      <div className="max-w-lg mx-auto flex justify-around items-center">
        {navItems.map(({
        path,
        icon: Icon,
        label
      }) => {
        const isActive = location.pathname === path;
        return <Link key={path} to={path} className={`flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-teal-600' : 'text-gray-400 hover:text-gray-600'}`}>
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-xs font-medium">{label}</span>
            </Link>;
      })}
      </div>
    </nav>;
}