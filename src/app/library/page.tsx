"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

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

export default function LibraryPage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('search'); // 'search' or 'myBooks'
    const [searchTerm, setSearchTerm] = useState('');

    const allBooks = [
        { id: 1, title: 'Introduction to Algorithms', author: 'Cormen et al.', status: 'Available' },
        { id: 2, title: 'Operating System Concepts', author: 'Silberschatz et al.', status: 'Checked Out', dueDate: '2025-07-15' },
        { id: 3, title: 'Database Systems', author: 'Elmasri & Navathe', status: 'Available' },
        { id: 4, title: 'Artificial Intelligence: A Modern Approach', author: 'Russell & Norvig', status: 'Available' },
        { id: 5, title: 'Computer Networks', author: 'Tanenbaum & Wetherall', status: 'Checked Out', dueDate: '2025-07-20' },
        { id: 6, title: 'The Pragmatic Programmer', author: 'Hunt & Thomas', status: 'Available' },
    ];

    const filteredBooks = allBooks.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const myBorrowedBooks = allBooks.filter(book => book.status === 'Checked Out');

    // Define local functions for navigation and modal actions
    function onBackToDashboard() {
        router.push('/'); // Navigate to home/dashboard
    }
    function onGoToNotifications() {
        router.push('/notifications'); // Navigate to notifications page
    }
    function onGoToWallet() {
        router.push('/wallet'); // Navigate to wallet page
    }
    function onGoToProfile() {
        router.push('/profile'); // Navigate to profile page
    }
    function onGoToHome() {
        router.push('/'); // Navigate to home/dashboard
    }
    function onGoToId() {
        router.push('/id'); // Navigate to ID page
    }

    return (
        <div className="min-h-screen bg-[#283452] flex flex-col">
            {/* Header */}
            <div className="bg-[#202A40] text-white p-4 flex items-center justify-between rounded-b-xl shadow-lg">
                <button onClick={onBackToDashboard} className="text-white text-2xl">
                    &#8592; {/* Left arrow */}
                </button>
                <h2 className="text-xl font-bold">Library</h2>
                <div className="w-8"></div> {/* Placeholder for alignment */}
            </div>

            {/* Tabs */}
            <div className="flex bg-[#202A40] p-2 mx-4 mt-4 rounded-lg shadow-md">
                <button
                    className={`flex-1 py-2 px-4 rounded-md text-center font-semibold ${activeTab === 'search' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-blue-700 hover:bg-opacity-50'}`}
                    onClick={() => setActiveTab('search')}
                >
                    Search Books
                </button>
                <button
                    className={`flex-1 py-2 px-4 rounded-md text-center font-semibold ${activeTab === 'myBooks' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-blue-700 hover:bg-opacity-50'}`}
                    onClick={() => setActiveTab('myBooks')}
                >
                    My Books
                </button>
            </div>

            {activeTab === 'search' && (
                <div className="flex-1 p-4 bg-[#283452] text-white">
                    <button
                        className="mb-4 px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
                        onClick={() => { /* showModal */ }}
                    >
                        Show Library Modal
                    </button>
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Search by title or author..."
                            className="w-full p-3 rounded-lg bg-[#202A40] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <h3 className="text-xl font-bold mb-4">Available Books</h3>
                    {filteredBooks.length > 0 ? (
                        <ul className="space-y-3">
                            {filteredBooks.map(book => (
                                <li key={book.id} className="bg-[#202A40] p-4 rounded-lg shadow-md flex justify-between items-center">
                                    <div>
                                        <p className="font-semibold text-lg">{book.title}</p>
                                        <p className="text-sm text-gray-300">by {book.author}</p>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${book.status === 'Available' ? 'bg-green-500' : 'bg-red-500'}`}>
                                        {book.status}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-400 text-center mt-8">No books found matching your search.</p>
                    )}
                </div>
            )}

            {activeTab === 'myBooks' && (
                <div className="flex-1 p-4 bg-[#283452] text-white">
                    <h3 className="text-xl font-bold mb-4">My Borrowed Books</h3>
                    {myBorrowedBooks.length > 0 ? (
                        <ul className="space-y-3">
                            {myBorrowedBooks.map(book => (
                                <li key={book.id} className="bg-[#202A40] p-4 rounded-lg shadow-md">
                                    <p className="font-semibold text-lg">{book.title}</p>
                                    <p className="text-sm text-gray-300">by {book.author}</p>
                                    <p className="text-sm text-yellow-400 mt-2">Due Date: {book.dueDate}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-400 text-center mt-8">You currently have no books checked out.</p>
                    )}
                </div>
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
} 