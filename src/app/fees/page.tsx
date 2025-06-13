import { useState } from 'react';

interface FeesPageProps {
    onBackToDashboard: () => void;
    onGoToNotifications: () => void;
    onGoToHome: () => void;
    onGoToId: () => void;
    onGoToWallet: () => void;
    onGoToProfile: () => void;
    showModal: (title: string, message: string, callback?: (() => void) | null) => void;
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

const FeesPage: React.FC<FeesPageProps> = ({ 
    onBackToDashboard, 
    onGoToNotifications, 
    onGoToHome, 
    onGoToId, 
    onGoToWallet, 
    onGoToProfile,
    showModal 
}) => {
    const [activeTab, setActiveTab] = useState('pending'); // 'pending' or 'paid'
    const [showContent, setShowContent] = useState(false);

    const pendingFees = [
        { id: 1, description: 'Tuition Fee - Semester 4', amount: 50000, dueDate: '2025-07-15' },
        { id: 2, description: 'Examination Fee', amount: 2000, dueDate: '2025-07-20' },
        { id: 3, description: 'Library Fee', amount: 1000, dueDate: '2025-07-25' },
    ];

    const paidFees = [
        { id: 4, description: 'Tuition Fee - Semester 3', amount: 50000, paidDate: '2025-01-15' },
        { id: 5, description: 'Hostel Fee', amount: 30000, paidDate: '2025-01-10' },
    ];

    const handlePayNow = (fee: typeof pendingFees[0]) => {
        showModal('Pay Fee', `You are about to pay ₹${fee.amount} for ${fee.description}. Proceed?`, () => {
            console.log(`Processing payment for ${fee.description}`);
            // In a real app, you would integrate with a payment gateway here
        });
    };

    return (
        <div className="min-h-screen bg-[#283452] flex flex-col">
            {/* Header */}
            <div 
                onClick={() => setShowContent(true)}
                className="bg-[#202A40] text-white p-4 flex items-center justify-between rounded-b-xl shadow-lg cursor-pointer"
            >
                <button onClick={onBackToDashboard} className="text-white text-2xl">
                    &#8592; {/* Left arrow */}
                </button>
                <h2 className="text-xl font-bold">Fees</h2>
                <div className="w-8"></div> {/* Placeholder for alignment */}
            </div>

            {showContent && (
                <>
                    {/* Tabs */}
                    <div className="flex bg-[#202A40] p-2 mx-4 mt-4 rounded-lg shadow-md">
                        <button
                            className={`flex-1 py-2 px-4 rounded-md text-center font-semibold ${activeTab === 'pending' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-blue-700 hover:bg-opacity-50'}`}
                            onClick={() => setActiveTab('pending')}
                        >
                            Pending
                        </button>
                        <button
                            className={`flex-1 py-2 px-4 rounded-md text-center font-semibold ${activeTab === 'paid' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-blue-700 hover:bg-opacity-50'}`}
                            onClick={() => setActiveTab('paid')}
                        >
                            Paid
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-4 bg-[#283452] text-white">
                        {activeTab === 'pending' && (
                            <div>
                                <h3 className="text-xl font-bold mb-4">Pending Fees</h3>
                                {pendingFees.length > 0 ? (
                                    <ul className="space-y-3">
                                        {pendingFees.map(fee => (
                                            <li key={fee.id} className="bg-[#202A40] p-4 rounded-lg shadow-md">
                                                <div className="flex justify-between items-center">
                                                    <div>
                                                        <p className="font-semibold text-lg">{fee.description}</p>
                                                        <p className="text-sm text-gray-400">Due Date: {fee.dueDate}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-xl font-bold">₹{fee.amount}</p>
                                                        <button
                                                            onClick={() => handlePayNow(fee)}
                                                            className="mt-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200"
                                                        >
                                                            Pay Now
                                                        </button>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-gray-400 text-center mt-8">No pending fees.</p>
                                )}
                            </div>
                        )}

                        {activeTab === 'paid' && (
                            <div>
                                <h3 className="text-xl font-bold mb-4">Paid Fees</h3>
                                {paidFees.length > 0 ? (
                                    <ul className="space-y-3">
                                        {paidFees.map(fee => (
                                            <li key={fee.id} className="bg-[#202A40] p-4 rounded-lg shadow-md">
                                                <div className="flex justify-between items-center">
                                                    <div>
                                                        <p className="font-semibold text-lg">{fee.description}</p>
                                                        <p className="text-sm text-gray-400">Paid on: {fee.paidDate}</p>
                                                    </div>
                                                    <p className="text-xl font-bold text-green-400">₹{fee.amount}</p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-gray-400 text-center mt-8">No payment history available.</p>
                                )}
                            </div>
                        )}
                    </div>
                </>
            )}

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
};

export default FeesPage; 