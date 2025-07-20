"use client";
import { useState } from 'react';

interface Transaction {
    id: number;
    type: 'Credit' | 'Debit';
    description: string;
    amount: number;
    date: string;
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

export default function WalletPage() {
    const [addAmount, setAddAmount] = useState('');
    const [walletBalance, setWalletBalance] = useState(4550); // Initial balance
    const [transactions, setTransactions] = useState<Transaction[]>([
        { id: 1, type: 'Credit', description: 'Initial Top-up', amount: 5000, date: '2025-05-01' },
        { id: 2, type: 'Debit', description: 'Canteen Purchase', amount: 150, date: '2025-06-10' },
        { id: 3, type: 'Debit', description: 'Bookstore Purchase', amount: 300, date: '2025-06-12' },
    ]);

    // Define local functions for navigation and modal actions
    function onBackToDashboard() { /* implement navigation or leave as placeholder */ }
    function onGoToHome() { /* implement navigation or leave as placeholder */ }
    function onGoToId() { /* implement navigation or leave as placeholder */ }
    function onGoToNotifications() { /* implement navigation or leave as placeholder */ }
    function onGoToProfile() { /* implement navigation or leave as placeholder */ }
    
    function showModal(title: string, message: string, callback?: () => void) {
        // Simple alert implementation - you can replace this with a proper modal component
        alert(`${title}: ${message}`);
        if (callback) {
            callback();
        }
    }

    const handleAddFunds = () => {
        const amount = parseFloat(addAmount);
        if (isNaN(amount) || amount <= 0) {
            showModal('Invalid Amount', 'Please enter a valid positive amount.');
            return;
        }
        setWalletBalance((prevBalance: number) => prevBalance + amount);
        setTransactions(prevTransactions => [
            { id: prevTransactions.length + 1, type: 'Credit', description: 'Wallet Top-up', amount: amount, date: new Date().toISOString().slice(0, 10) },
            ...prevTransactions,
        ]);
        setAddAmount('');
        showModal('Funds Added', `Successfully added ₹${amount.toFixed(2)} to your wallet.`);
    };

    const handleScanAndPay = () => {
        showModal('Scan & Pay', 'Feature under development. Imagine scanning a QR code here!');
    };

    return (
        <div className="min-h-screen bg-[#283452] flex flex-col">
            {/* Header */}
            <div className="bg-[#202A40] text-white p-4 flex items-center justify-between rounded-b-xl shadow-lg">
                <button onClick={onBackToDashboard} className="text-white text-2xl">
                    &#8592; {/* Left arrow */}
                </button>
                <h2 className="text-xl font-bold">My Wallet</h2>
                <div className="w-8"></div> {/* Placeholder for alignment */}
            </div>

            {/* Wallet Balance */}
            <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white p-6 m-4 rounded-xl shadow-lg flex flex-col items-center">
                <p className="text-lg opacity-80">Current Balance</p>
                <p className="text-5xl font-bold mt-2">₹{walletBalance.toFixed(2)}</p>
            </div>

            {/* Add Funds Section */}
            <div className="bg-[#202A40] text-white p-4 m-4 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold mb-3">Add Funds</h3>
                <div className="flex space-x-2">
                    <input
                        type="number"
                        placeholder="Amount"
                        className="flex-1 p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={addAmount}
                        onChange={(e) => setAddAmount(e.target.value)}
                    />
                    <button
                        onClick={handleAddFunds}
                        className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200"
                    >
                        Add
                    </button>
                </div>
            </div>

            {/* Quick Actions for Wallet */}
            <div className="bg-[#202A40] text-white p-4 m-4 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold mb-3">Quick Actions</h3>
                <div className="flex justify-around items-center">
                    <button
                        onClick={handleScanAndPay}
                        className="flex flex-col items-center p-3 bg-blue-600 rounded-lg shadow-md text-white text-center hover:bg-blue-700 transition-colors duration-200"
                    >
                        <span className="text-3xl mb-1">&#9889;</span> {/* Lightning bolt for quick pay */}
                        <span className="text-xs">Scan & Pay</span>
                    </button>
                    {/* Add more wallet-specific quick actions here if desired */}
                </div>
            </div>

            {/* Transaction History */}
            <div className="bg-[#202A40] text-white p-4 m-4 rounded-xl shadow-lg flex-1">
                <h3 className="text-xl font-semibold mb-4">Transaction History</h3>
                {transactions.length > 0 ? (
                    <ul className="space-y-3">
                        {transactions.map(transaction => (
                            <li key={transaction.id} className="bg-gray-700 p-3 rounded-lg flex justify-between items-center">
                                <div>
                                    <p className="font-semibold">{transaction.description}</p>
                                    <p className="text-sm text-gray-400">{transaction.date}</p>
                                </div>
                                <span className={`${transaction.type === 'Credit' ? 'text-green-400' : 'text-red-400'} font-bold`}>
                                    {transaction.type === 'Credit' ? '+' : '-'} ₹{transaction.amount.toFixed(2)}
                                </span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-400 text-center">No transactions yet.</p>
                )}
            </div>

            {/* Bottom Navigation Bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-3 flex justify-around items-center border-t border-gray-200 z-50">
                <NavItem icon="🏠" label="Home" action={onGoToHome} />
                <NavItem icon="🔔" label="Notifications" action={onGoToNotifications} />
                <NavItem icon="🆔" label="ID" action={onGoToId} />
                <NavItem icon="💳" label="Wallet" action={() => {}} /> {/* Active state for wallet */}
                <NavItem icon="👤" label="Profile" action={onGoToProfile} />
            </div>
        </div>
    );
} 