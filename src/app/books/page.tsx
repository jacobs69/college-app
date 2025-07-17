"use client";

import React from 'react';
import { useState } from 'react';

interface LibraryPageProps {
  onBackToDashboard: () => void;
  onGoToNotifications: () => void;
  onGoToHome: () => void;
  onGoToId: () => void;
  onGoToWallet: () => void;
  onGoToProfile: () => void;
}

interface NavItemProps {
  icon: string;
  label: string;
  action: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, action }) => (
  <button onClick={action} className="flex flex-col items-center">
    <span className="text-2xl">{icon}</span>
    <span className="text-xs mt-1">{label}</span>
  </button>
);

export default function BooksPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-3xl font-bold">Books Page</h1>
      <p className="mt-4 text-lg">Welcome to the Books page!</p>
    </div>
  );
}