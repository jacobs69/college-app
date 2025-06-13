import { useState } from 'react';

interface Scholarship {
    title: string;
    provider: string;
    amount: string;
    description: string;
    deadline: string;
}

interface ScholarshipPageProps {
    onBackToDashboard: () => void;
    onGoToNotifications: () => void;
    onGoToHome: () => void;
    onGoToId: () => void;
    onGoToWallet: () => void;
    onGoToProfile: () => void;
    showModal: (title: string, message: string, callback?: () => void) => void;
}

interface ScholarshipCardProps {
    scholarship: Scholarship;
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

const ScholarshipPage: React.FC<ScholarshipPageProps> = ({ 
    onBackToDashboard, 
    onGoToNotifications, 
    onGoToHome, 
    onGoToId, 
    onGoToWallet, 
    onGoToProfile,
    showModal 
}) => {
    const scholarships: Scholarship[] = [
        {
            title: 'Merit-Based Scholarship',
            provider: 'College Education Trust',
            amount: '50% of Tuition Fees',
            description: 'Awarded to students with outstanding academic performance (above 85% in the previous semester).',
            deadline: '31st July 2025'
        },
        {
            title: 'Financial Aid Grant',
            provider: 'Government of Maharashtra',
            amount: '₹30,000 per year',
            description: 'For students from families with an annual income below ₹2,00,000. Requires income certificate.',
            deadline: '15th August 2025'
        },
        {
            title: 'Sports Excellence Scholarship',
            provider: 'National Sports Federation',
            amount: 'Full Tution Fee Waiver',
            description: 'For students who have represented the state or nation in any recognized sporting event.',
            deadline: '20th July 2025'
        },
        {
            title: 'Single Girl Child Scholarship',
            provider: 'UGC India',
            amount: '₹25,000 per year',
            description: 'Promoting education for single girl children in families. Must be the only child.',
            deadline: '30th August 2025'
        }
    ];

    const handleApply = (scholarship: Scholarship) => {
        showModal('Apply for Scholarship', `You are applying for the "${scholarship.title}". You will be redirected to the official application portal.`, () => {
            console.log(`Redirecting to apply for ${scholarship.title}`);
            // In a real app, you would redirect: window.open('https://scholarship-portal.com', '_blank');
        });
    };

    const ScholarshipCard: React.FC<ScholarshipCardProps> = ({ scholarship }) => (
        <div className="bg-white rounded-xl shadow-lg p-4 mb-4">
            <h3 className="text-xl font-bold text-blue-800 mb-1">{scholarship.title}</h3>
            <p className="text-sm font-semibold text-gray-600 mb-2">Provided by: {scholarship.provider}</p>
            <div className="bg-green-100 border-l-4 border-green-500 text-green-800 p-2 rounded mb-3">
                <p className="font-bold">Benefit: {scholarship.amount}</p>
            </div>
            <p className="text-gray-700 mb-3">{scholarship.description}</p>
            <div className="flex justify-between items-center">
                <p className="text-sm text-red-600 font-semibold">Deadline: {scholarship.deadline}</p>
                <button
                    onClick={() => handleApply(scholarship)}
                    className="bg-blue-700 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200"
                >
                    Apply Now
                </button>
            </div>
        </div>
    );

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
                <h1 className="text-xl font-semibold">Scholarships</h1>
            </div>

            {/* Content List - Vertically Scrollable */}
            <div className="p-4 flex-grow overflow-y-auto hide-scrollbar">
                {scholarships.map((scholarship, index) => (
                    <ScholarshipCard key={index} scholarship={scholarship} />
                ))}
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

export default ScholarshipPage;