"use client";
import React, { useState } from 'react';

interface Scholarship {
  title: string;
  provider: string;
  amount: string;
  description: string;
  deadline: string;
}

export default function ScholarshipPage() {
  const [scholarships] = useState<Scholarship[]>([
    // ... existing scholarships ...
  ]);

  // New: Scholarship Exams Data
  const scholarshipExams = [
    {
      name: 'National Scholarship Exam (NSE)',
      description: 'A national-level exam to identify and reward talented students with scholarships for higher education.',
      benefits: 'Cash prizes, certificates, and eligibility for various merit-based scholarships.'
    },
    {
      name: 'INSPIRE Scholarship Test',
      description: 'For students interested in science and research, conducted by the Department of Science & Technology, Govt. of India.',
      benefits: 'Annual scholarship of ₹80,000 for pursuing science courses at the undergraduate and postgraduate level.'
    },
    {
      name: 'Kishore Vaigyanik Protsahan Yojana (KVPY)',
      description: 'A national program to encourage students to take up research careers in science.',
      benefits: 'Monthly fellowship and annual contingency grant for selected students.'
    },
    {
      name: 'NTSE (National Talent Search Exam)',
      description: 'A prestigious exam for school students to identify and nurture talent.',
      benefits: 'Monthly scholarship for higher studies in science, social science, engineering, and medicine.'
    },
    {
      name: 'AICTE Pragati & Saksham Scholarship',
      description: 'For girls and differently-abled students pursuing technical education.',
      benefits: 'Tuition fee waiver and annual scholarship amount.'
    },
  ];

  return (
    <div className="min-h-screen bg-[#283452] flex flex-col pb-20">
      {/* Top Bar */}
      <div className="bg-[#202A40] text-white p-4 flex items-center shadow-md">
        <button onClick={() => {}} className="text-white text-2xl px-2 mr-4">&#8592;</button>
        <h1 className="text-xl font-semibold">Scholarship</h1>
      </div>
      {/* Content */}
      <div className="flex-grow flex flex-col items-center justify-center text-white">
        <h2 className="text-2xl font-bold mb-4">Scholarship Information</h2>
        <button
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
          onClick={() => {}}
        >
          Show Scholarship Modal
        </button>
      </div>
      {/* Scholarships List */}
      <div className="p-4 flex-grow overflow-y-auto hide-scrollbar">
        {scholarships.map((scholarship, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg p-4 mb-4">
            {/* ... existing scholarship card ... */}
          </div>
        ))}

        {/* --- Scholarship Exams Section --- */}
        <h2 className="text-xl font-bold text-yellow-400 mt-8 mb-4">Scholarship Exams for Students</h2>
        {scholarshipExams.map((exam, idx) => (
          <div key={idx} className="bg-blue-50 border-l-4 border-blue-400 rounded-xl shadow p-4 mb-4">
            <h3 className="text-lg font-bold text-blue-800 mb-1">{exam.name}</h3>
            <p className="text-gray-700 mb-2">{exam.description}</p>
            <div className="bg-green-100 border-l-4 border-green-500 text-green-800 p-2 rounded">
              <span className="font-semibold">Benefits: </span>{exam.benefits}
            </div>
          </div>
        ))}
      </div>
      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-3 flex justify-around items-center border-t border-gray-200 z-50">
        <button onClick={() => {}} className="flex flex-col items-center">
          <span className="text-2xl">🏠</span>
          <span className="text-xs mt-1">Home</span>
        </button>
        <button onClick={() => {}} className="flex flex-col items-center">
          <span className="text-2xl">🔔</span>
          <span className="text-xs mt-1">Notifications</span>
        </button>
        <button onClick={() => {}} className="flex flex-col items-center">
          <span className="text-2xl">🆔</span>
          <span className="text-xs mt-1">ID</span>
        </button>
        <button onClick={() => {}} className="flex flex-col items-center">
          <span className="text-2xl">💳</span>
          <span className="text-xs mt-1">Wallet</span>
        </button>
        <button onClick={() => {}} className="flex flex-col items-center">
          <span className="text-2xl">👤</span>
          <span className="text-xs mt-1">Profile</span>
        </button>
      </div>
    </div>
  );
} 