"use client";
import { useState } from 'react';

interface PreviousPaper {
    subject: string;
    year: number;
    semester: string;
}

interface ExamMaterial {
    subject: string;
    title: string;
}

type Material = PreviousPaper | ExamMaterial;

interface MaterialItemProps {
    item: Material;
    type: 'previous' | 'exam';
    onDownload: (material: Material) => void;
}

interface StudyMaterialPageProps {
    onBackToDashboard: () => void;
    onGoToNotifications: () => void;
    onGoToHome: () => void;
    onGoToId: () => void;
    onGoToWallet: () => void;
    onGoToProfile: () => void;
    showModal: (title: string, message: string) => void;
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

const MaterialItem: React.FC<MaterialItemProps> = ({ item, type, onDownload }) => (
    <div className="bg-white rounded-xl shadow-lg p-4 mb-4 flex justify-between items-center">
        <div>
            <h3 className="text-lg font-bold text-gray-800 mb-1">
                {type === 'previous' ? `${item.subject} - ${(item as PreviousPaper).year}` : item.subject}
            </h3>
            <p className="text-gray-700">
                {type === 'previous' ? `Semester ${(item as PreviousPaper).semester}` : (item as ExamMaterial).title}
            </p>
        </div>
        <button
            onClick={(e) => {
                e.stopPropagation();
                onDownload(item);
            }}
            className="bg-blue-700 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200"
        >
            Download
        </button>
    </div>
);

const StudyMaterialPage: React.FC<StudyMaterialPageProps> = ({ 
    onBackToDashboard, 
    onGoToNotifications, 
    onGoToHome, 
    onGoToId, 
    onGoToWallet, 
    onGoToProfile,
    showModal 
}) => {
    const [activeTab, setActiveTab] = useState<'previous' | 'exam'>('previous');

    const previousPapers: PreviousPaper[] = [
        { subject: 'Mathematics', year: 2023, semester: 'IV' },
        { subject: 'Computer Science', year: 2023, semester: 'IV' },
        { subject: 'English', year: 2022, semester: 'IV' },
        { subject: 'History', year: 2022, semester: 'IV' },
        { subject: 'Science', year: 2021, semester: 'IV' },
    ];

    const examMaterials: ExamMaterial[] = [
        { subject: 'Mathematics', title: 'Algebra Formulas Sheet' },
        { subject: 'Science', title: 'Chapter 5: Atoms - Notes' },
        { subject: 'Computer Science', title: 'Networking Basics PDF' },
        { subject: 'English', title: 'Grammar Rules Summary' },
    ];

    const handleDownload = (material: Material) => {
        const materialName = 'title' in material ? material.title : `Previous Paper ${material.subject} ${(material as PreviousPaper).year}`;
        showModal('Download', `Downloading "${materialName}"... (Feature under development)`);
    };

    return (
        <div className="min-h-screen bg-[#283452] flex flex-col pb-20"> {/* Dark blue background */}
            {/* Embedded CSS for hiding scrollbar */}
            <style>{`
              .hide-scrollbar::-webkit-scrollbar { display: none; }
              .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>

            {/* Top Bar */}
            <div className="bg-[#202A40] text-white p-4 flex items-center shadow-md">
                <button onClick={onBackToDashboard} className="text-white text-2xl px-2 mr-4">&#8592;</button> {/* Back arrow */}
                <h1 className="text-xl font-semibold">Study Material</h1>
            </div>

            {/* Toggle Bar */}
            <div className="flex bg-[#4A5D8A] rounded-full p-1 mx-4 mt-4 justify-center">
                <button
                    onClick={() => setActiveTab('previous')}
                    className={`flex-1 px-6 py-2 rounded-full font-semibold transition-colors duration-300 ${activeTab === 'previous' ? 'bg-blue-600 text-white' : 'text-white bg-transparent'}`}
                >
                    Previous Year Paper
                </button>
                <button
                    onClick={() => setActiveTab('exam')}
                    className={`flex-1 px-6 py-2 rounded-full font-semibold transition-colors duration-300 ${activeTab === 'exam' ? 'bg-blue-600 text-white' : 'text-white bg-transparent'}`}
                >
                    Exam Study Material
                </button>
            </div>

            {/* Content List - Vertically Scrollable */}
            <div className="p-4 flex-grow overflow-y-auto hide-scrollbar">
                {activeTab === 'previous' && (
                    <div>
                        {previousPapers.map((paper, index) => (
                            <MaterialItem 
                                key={index} 
                                item={paper} 
                                type="previous" 
                                onDownload={handleDownload}
                            />
                        ))}
                    </div>
                )}
                {activeTab === 'exam' && (
                    <div>
                        {examMaterials.map((material, index) => (
                            <MaterialItem 
                                key={index} 
                                item={material} 
                                type="exam" 
                                onDownload={handleDownload}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Bottom Navigation Bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-3 flex justify-around items-center border-t border-gray-200 z-50">
                <NavItem icon="🏠" label="Home" action={onGoToHome} />
                <NavItem icon="🔔" label="Notifications" action={onGoToNotifications} />
                <NavItem icon="🆔" label="ID" action={onGoToId} />
                <NavItem icon="💳" label="Wallet" action={onGoToWallet} />
                <NavItem icon="👤" label="Profile" action={onGoToProfile} />
            </div>
        </div>
    );
}

export default StudyMaterialPage; 