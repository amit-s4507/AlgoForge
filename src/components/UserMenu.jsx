import React, { useState } from 'react';
import { LogOut, User, Settings, ChevronDown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { classNames } from '../utils/helpers';

export function UserMenu() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  if (!user) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-sm text-gray-300 hover:border-white/20"
      >
        <img
          src={user.avatar}
          alt={user.name}
          className="h-6 w-6 rounded-full"
        />
        <span className="hidden md:block">{user.name}</span>
        <ChevronDown className={classNames("h-4 w-4 transition", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full z-20 mt-2 w-48 overflow-hidden rounded-xl border border-white/10 bg-[#0f1117] shadow-xl">
            <div className="border-b border-white/5 p-3">
              <div className="text-sm font-medium text-gray-100">{user.name}</div>
              <div className="text-xs text-gray-400">{user.email}</div>
            </div>
            <div className="p-1">
              <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-300 hover:bg-white/5">
                <User className="h-4 w-4"/>
                Profile
              </button>
              <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-300 hover:bg-white/5">
                <Settings className="h-4 w-4"/>
                Settings
              </button>
              <button
                onClick={logout}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-400 hover:bg-red-500/10"
              >
                <LogOut className="h-4 w-4"/>
                Sign out
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
