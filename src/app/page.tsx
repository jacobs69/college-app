'use client';
import { useState, useEffect } from 'react';
import FeesPage from '@/app/fees/page';
import StudyMaterialPage from '@/app/study/page';
import BonafideCertificatePage from '@/app/bonafide/page';
import ScholarshipPage from '@/app/scholar/page';
import WalletPage from '@/app/wallet/page';
import LibraryPage from '@/app/library/page';

type Assignment = {
  subject: string;
  title: string;
  assignDate: string;
  submissionDate: string;
  submitted: boolean;
};

function App() {
  // 'landing', 'login', 'forgotPassword', 'register', 'dashboard', 'attendance', 'assignment', 'result', 'timetable', 'collegeGallery', 'aboutCollege', 'event', 'eventDetail', 'notifications', 'notificationDetail', 'id', 'wallet', 'profile', 'fees', 'studyMaterial', 'bonafide', 'scholarship', 'wallet', 'library'
  const [currentPage, setCurrentPage] = useState('landing');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null); // State to hold selected event details
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null); // State to hold selected notification details

  // State for the custom modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [modalOnConfirm, setModalOnConfirm] = useState<(() => void) | undefined>(undefined);

  const [walletBalance, setWalletBalance] = useState(5000); // Initial wallet balance
  const [assignments] = useState([
    {
      subject: 'Mathematics',
      title: 'Surface Areas and Volumes',
      assignDate: '10 Nov 20',
      submissionDate: '10 Dec 20',
      submitted: false,
    },
    {
      subject: 'Science',
      title: 'Structure of Atoms',
      assignDate: '10 Oct 20',
      submissionDate: '30 Oct 20',
      submitted: false,
    },
    {
      subject: 'English',
      title: 'My Bestfriend Essay',
      assignDate: '10 Sep 20',
      submissionDate: '30 Sep 20',
      submitted: true,
    },
  ]);

  // Function to show the custom modal
  const showModal = (title: string, message: string, onConfirm?: (() => void) | null) => {
    setModalTitle(title);
    setModalMessage(message);
    setModalOnConfirm(onConfirm || undefined);
    setIsModalOpen(true);
  }

  // Function to close the custom modal
  const closeModal = () => {
    setIsModalOpen(false);
    setModalTitle('');
    setModalMessage('');
    setModalOnConfirm(undefined);
  };

  // Function to navigate to the login page

  // Function to navigate to the forgot password page
  const handleGoToForgotPassword = () => {
    setCurrentPage('forgotPassword');
  };

  // Function to navigate to the register page
  const handleGoToRegister = () => {
    setCurrentPage('register');
  };

  // Function to navigate back to the login page (used by ForgotPassword and Register)
  const handleBackToLogin = () => {
    setCurrentPage('login');
  };

  // Function to handle successful login (now redirects to dashboard)
  const handleLoginSuccess = () => {
    console.log('Login Successful! Redirecting to Dashboard...');
    setCurrentPage('dashboard'); // Change page to 'dashboard'
  };

  // Function to navigate to the attendance page
  const handleGoToAttendance = () => {
    setCurrentPage('attendance');
  };

  // Function to navigate to the result page
  const handleGoToResult = () => {
    setCurrentPage('result');
  };

  // Function to navigate to the timetable page
  const handleGoToTimetable = () => {
    setCurrentPage('timetable');
  };

  // Function to navigate to the college gallery page
  const handleGoToCollegeGallery = () => {
    setCurrentPage('collegeGallery');
  };

  // Function to navigate to the about college page
  const handleGoToAboutCollege = () => {
    setCurrentPage('aboutCollege');
  };

  // Function to navigate to the event page
  const handleGoToEvent = () => {
    setCurrentPage('event');
  };

  // Function to handle selecting an event to view its details
  const handleSelectEvent = (event: Event) => {
    setSelectedEvent(event);
    setCurrentPage('eventDetail');
  };

  // Function to navigate back to the events list
  const handleBackToEvents = () => {
    setCurrentPage('event');
    setSelectedEvent(null); // Clear selected event
  };

  // Function to navigate to the notifications page
  const handleGoToNotifications = () => {
    setCurrentPage('notifications');
  };

  // Function to handle selecting a notification to view its details
  const handleSelectNotification = (notification: Notification) => {
    setSelectedNotification(notification);
    setCurrentPage('notificationDetail');
  };

  // Function to navigate back to the notifications list
  const handleBackToNotifications = () => {
    setCurrentPage('notifications');
    setSelectedNotification(null); // Clear selected notification
  };

  // Function to navigate to the home page (which is the dashboard)
  const handleGoToHome = () => {
    setCurrentPage('dashboard');
  };

  // Function to navigate to the ID page
  const handleGoToId = () => {
    setCurrentPage('id');
  };

  // Function to navigate to the Wallet page
  const handleGoToWallet = () => {
    setCurrentPage('wallet');
  };

  // Function to navigate to the Profile page
  const handleGoToProfile = () => {
    setCurrentPage('profile');
  };

  // Function to handle logout from Dashboard
  const handleLogout = () => {
    console.log('Logging out...');
    setCurrentPage('login'); // Redirect to login page
  };

  // Function to navigate to the Fees page
  const handleGoToFees = () => {
    setCurrentPage('fees');
  };

  // Function to navigate to the Study Material page
  const handleGoToStudyMaterial = () => {
    setCurrentPage('studyMaterial');
  };

  // Function to navigate to the Bonafide Certificate page
  const handleGoToBonafide = () => {
    setCurrentPage('bonafide');
  };

  // Function to navigate to the Scholarship page
  const handleGoToScholarship = () => {
    setCurrentPage('scholarship');
  };

  // Function to navigate back to the dashboard
  const handleBackToDashboard = () => {
    setCurrentPage('dashboard');
  };

  // Function to navigate to the Library page
  const handleGoToLibrary = () => {
    setCurrentPage('library');
  };

  // --- Custom Modal Component ---
  interface ModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onClose: () => void;
  onConfirm?: () => void; // optional because you're checking "if (onConfirm)"
}
  function Modal({ isOpen, title, message, onClose, onConfirm }:ModalProps) {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full mx-auto">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">{title}</h3>
          <p className="text-gray-700 mb-6">{message}</p>
          <div className="flex justify-end space-x-4">
            {onConfirm && (
              <button
                onClick={() => { onConfirm(); onClose(); }}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
              >
                Confirm
              </button>
            )}
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors duration-200"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- LandingPage Component (internal to App) ---
  type LandingPageProps = object;

  function LandingPage({}: LandingPageProps) {
    // Add fade-in and logo animation using Tailwind and a keyframes style
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#19255A] relative overflow-hidden animate-fadein" style={{background: 'linear-gradient(to bottom, #19255A 100%, #19255A 100%)'}}>
        {/* Background decorative icons (same as login) */}
        <div className="absolute top-8 left-8 text-white text-opacity-10 text-5xl md:text-7xl transform -rotate-12 select-none pointer-events-none">&#9776;</div>
        <div className="absolute top-1/4 right-1/4 text-white text-opacity-10 text-6xl md:text-8xl transform -rotate-12 select-none pointer-events-none">&#9998;</div>
        <div className="absolute bottom-1/4 left-1/4 text-white text-opacity-10 text-7xl md:text-9xl transform rotate-0 select-none pointer-events-none">&#128214;</div>
        <div className="absolute bottom-8 right-8 text-white text-opacity-10 text-6xl md:text-8xl transform rotate-0 select-none pointer-events-none">&#128269;</div>

        {/* Logo - Outlined Hexagon with yellow dot */}
        <div className="mb-6 flex flex-col items-center">
          <svg className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 mx-auto animate-logo-bounce" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon points="40,10 70,27 70,53 40,70 10,53 10,27" stroke="#FFD600" strokeWidth="6" fill="none" />
            <circle cx="40" cy="30" r="7" fill="#FFD600" />
          </svg>
        </div>
        {/* App Name */}
        <h1 className="text-6xl font-extrabold text-yellow-400 text-center drop-shadow-lg animate-fadein-delay">Collegegram</h1>
        {/* Loading message */}
        <p className="mt-8 text-2xl text-gray-300 text-center animate-fadein-delay2">Loading your experience...</p>
        {/* Add fade-in and logo animation keyframes */}
        <style>{`
          @keyframes fadein { from { opacity: 0; } to { opacity: 1; } }
          .animate-fadein { animation: fadein 1s ease; }
          @keyframes logoBounce { 0% { transform: scale(0.7); opacity: 0; } 60% { transform: scale(1.1); opacity: 1; } 100% { transform: scale(1); opacity: 1; } }
          .animate-logo-bounce { animation: logoBounce 1s cubic-bezier(0.68,-0.55,0.27,1.55); }
          .animate-fadein-delay { animation: fadein 1s 0.7s ease both; }
          .animate-fadein-delay2 { animation: fadein 1s 1.2s ease both; }
        `}</style>
      </div>
    );
  }

  // --- LoginPage Component (internal to App) ---
  interface LoginPageProps {
  onLoginSuccess: () => void;
  onGoToForgotPassword: () => void;
  onGoToRegister: () => void;
}
  function LoginPage({ onLoginSuccess, onGoToForgotPassword, onGoToRegister }:LoginPageProps) {
    const [rollNo, setRollNo] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e: { preventDefault: () => void; }) => {
      e.preventDefault();
      onLoginSuccess();
    };

    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#19255A] relative overflow-hidden animate-fadein" style={{background: 'linear-gradient(to bottom, #19255A 100%, #19255A 100%)'}}>
        {/* Background decorative icons (same as landing) */}
        <div className="absolute top-8 left-8 text-white text-opacity-10 text-5xl md:text-7xl transform -rotate-12 select-none pointer-events-none">&#9776;</div>
        <div className="absolute top-1/4 right-1/4 text-white text-opacity-10 text-6xl md:text-8xl transform -rotate-12 select-none pointer-events-none">&#9998;</div>
        <div className="absolute bottom-1/4 left-1/4 text-white text-opacity-10 text-7xl md:text-9xl transform rotate-0 select-none pointer-events-none">&#128214;</div>
        <div className="absolute bottom-8 right-8 text-white text-opacity-10 text-6xl md:text-8xl transform rotate-0 select-none pointer-events-none">&#128269;</div>
        {/* Login Card - Centered and Responsive */}
        <div className="relative w-full max-w-md bg-antiflashwhite rounded-2xl shadow-2xl px-8 py-10 flex flex-col items-center mx-auto border border-mountainmeadow z-10">
          {/* Logo - Outlined Hexagon with teal dot (smaller, top of card) */}
          <div className="flex flex-col items-center mb-2 mt-0">
            <svg className="w-12 h-12 mx-auto" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <polygon points="40,10 70,27 70,53 40,70 10,53 10,27" stroke="#2CC5A9" strokeWidth="6" fill="none" />
              <circle cx="40" cy="30" r="7" fill="#2CC5A9" />
            </svg>
            {/* App Name under Logo */}
            <h1 className="text-3xl font-extrabold text-mountainmeadow mb-6 text-center drop-shadow-lg mt-2">Collegegram</h1>
          </div>
          {/* Login Form - Centered */}
          <form onSubmit={handleLogin} className="flex flex-col items-center w-full">
            <input
              type="text"
              id="rollNo"
              placeholder="Roll No (e.g., B20232637)"
              className="w-full mb-4 px-4 py-3 rounded-lg bg-antiflashwhite text-bangladeshgreen text-base placeholder-bangladeshgreen focus:outline-none focus:ring-2 focus:ring-mountainmeadow shadow"
              value={rollNo}
              onChange={(e) => setRollNo(e.target.value)}
              required
            />
            <input
              type="password"
              id="password"
              placeholder="Password:-"
              className="w-full mb-4 px-4 py-3 rounded-lg bg-antiflashwhite text-bangladeshgreen text-base placeholder-bangladeshgreen focus:outline-none focus:ring-2 focus:ring-mountainmeadow shadow"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-mountainmeadow to-caribbeangreen text-richblack font-bold text-lg py-2 rounded-lg shadow-md hover:from-bangladeshgreen hover:to-mint hover:scale-105 transition-all mb-3 mt-2"
            >
              Login
            </button>
          </form>
          {/* Links - Centered */}
          <button
            type="button"
            onClick={onGoToForgotPassword}
            className="text-mountainmeadow hover:underline text-sm mb-1 bg-transparent border-none p-0 cursor-pointer"
          >
            Forget Password?
          </button>
          <span className="text-mountainmeadow text-sm text-center block">
            Don&apos;t have an account?{' '}
            <button
              type="button"
              onClick={onGoToRegister}
              className="text-mountainmeadow hover:underline bg-transparent border-none p-0 cursor-pointer"
            >
              Register
            </button>
          </span>
        </div>
        {/* Add fade-in and logo animation keyframes if not already present */}
        <style>{`
          @keyframes fadein { from { opacity: 0; } to { opacity: 1; } }
          .animate-fadein { animation: fadein 1s ease; }
          @keyframes logoBounce { 0% { transform: scale(0.7); opacity: 0; } 60% { transform: scale(1.1); opacity: 1; } 100% { transform: scale(1); opacity: 1; } }
          .animate-logo-bounce { animation: logoBounce 1s cubic-bezier(0.68,-0.55,0.27,1.55); }
          .animate-fadein-delay { animation: fadein 1s 0.7s ease both; }
          .animate-fadein-delay2 { animation: fadein 1s 1.2s ease both; }
        `}</style>
      </div>
    );
  }

  // --- ForgotPasswordPage Component (internal to App) ---
  interface ForgotPasswordPageProps {
  onBackToLogin: () => void;
  showModal:(title: string, message: string) => void;
}

  function ForgotPasswordPage({ onBackToLogin, showModal }:ForgotPasswordPageProps) {
    const [email, setEmail] = useState('');

    const handleSendResetEmail = (e: { preventDefault: () => void; }) => {
      e.preventDefault();
      console.log('Sending reset email to:', email);
      showModal('Password Reset', `Password reset email sent to ${email} (if account exists).`);
      setEmail('');
      if (typeof onBackToLogin === 'function') {
        onBackToLogin();
      } else {
        console.error("onBackToLogin is not a function. Cannot navigate back to login.");
      }
    };

    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#19255A] relative overflow-hidden animate-fadein" style={{background: 'linear-gradient(to bottom, #19255A 100%, #19255A 100%)'}}>
        {/* Background decorative icons (same as landing) */}
        <div className="absolute top-8 left-8 text-white text-opacity-10 text-5xl md:text-7xl transform -rotate-12 select-none pointer-events-none">&#9776;</div>
        <div className="absolute top-1/4 right-1/4 text-white text-opacity-10 text-6xl md:text-8xl transform -rotate-12 select-none pointer-events-none">&#9998;</div>
        <div className="absolute bottom-1/4 left-1/4 text-white text-opacity-10 text-7xl md:text-9xl transform rotate-0 select-none pointer-events-none">&#128214;</div>
        <div className="absolute bottom-8 right-8 text-white text-opacity-10 text-6xl md:text-8xl transform rotate-0 select-none pointer-events-none">&#128269;</div>
        {/* Card with logo and form */}
        <div className="relative w-full max-w-md bg-antiflashwhite rounded-2xl shadow-2xl px-8 py-10 flex flex-col items-center mx-auto border border-mountainmeadow z-10">
          {/* Logo - Outlined Hexagon with teal dot (small, top of card) */}
          <div className="flex flex-col items-center mb-2 mt-0">
            <svg className="w-12 h-12 mx-auto" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <polygon points="40,10 70,27 70,53 40,70 10,53 10,27" stroke="#2CC5A9" strokeWidth="6" fill="none" />
              <circle cx="40" cy="30" r="7" fill="#2CC5A9" />
            </svg>
            {/* App Name under Logo */}
            <h1 className="text-3xl font-extrabold text-mountainmeadow mb-6 text-center drop-shadow-lg mt-2">Collegegram</h1>
          </div>
          {/* Forgot Password Form Container */}
          <form onSubmit={handleSendResetEmail} className="bg-transparent p-0 rounded-xl w-full max-w-md">
            {/* Email Input */}
            <div className="mb-6">
              <label htmlFor="reset-email" className="sr-only">Enter your Email ID</label>
              <input
                type="email"
                id="reset-email"
                placeholder="Enter your Email ID :-"
                className="w-full p-4 rounded-lg bg-antiflashwhite text-bangladeshgreen placeholder-bangladeshgreen focus:outline-none focus:ring-2 focus:ring-mountainmeadow"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            {/* Send Reset Email Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-mountainmeadow to-caribbeangreen text-richblack font-bold py-3 px-6 rounded-lg shadow-lg hover:from-bangladeshgreen hover:to-mint hover:scale-105 transition-all focus:outline-none focus:ring-4 focus:ring-mountainmeadow"
            >
              Send Reset Email
            </button>
            {/* Back to Login Link */}
            <div className="text-center mt-6">
              <button
                type="button"
                onClick={onBackToLogin}
                className="text-mountainmeadow hover:underline text-sm bg-transparent border-none p-0 cursor-pointer"
              >
                Back to Login
              </button>
            </div>
          </form>
        </div>
        {/* Add fade-in and logo animation keyframes if not already present */}
        <style>{`
          @keyframes fadein { from { opacity: 0; } to { opacity: 1; } }
          .animate-fadein { animation: fadein 1s ease; }
          @keyframes logoBounce { 0% { transform: scale(0.7); opacity: 0; } 60% { transform: scale(1.1); opacity: 1; } 100% { transform: scale(1); opacity: 1; } }
          .animate-logo-bounce { animation: logoBounce 1s cubic-bezier(0.68,-0.55,0.27,1.55); }
          .animate-fadein-delay { animation: fadein 1s 0.7s ease both; }
          .animate-fadein-delay2 { animation: fadein 1s 1.2s ease both; }
        `}</style>
      </div>
    );
  }

  // --- RegisterPage Component (internal to App) ---
 interface RegisterPageProps {
  onBackToLogin: () => void;
  showModal: (title: string, message: string) => void;
}
  function RegisterPage({ onBackToLogin, showModal }:RegisterPageProps) {
    const [rollNo, setRollNo] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = (e: { preventDefault: () => void; }) => {
      e.preventDefault();
      if (password !== confirmPassword) {
        showModal('Registration Error', "Passwords do not match!");
        return;
      }
      console.log('Registering user with:', rollNo, password);
      // In a real application, you would make an API call here
      // to register the new user.
      showModal('Registration Success', `User ${rollNo} registered successfully!`); // For demonstration
      setRollNo('');
      setPassword('');
      setConfirmPassword('');
      onBackToLogin(); // Go back to login page after successful registration
    };

    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#19255A] relative overflow-hidden animate-fadein" style={{background: 'linear-gradient(to bottom, #19255A 100%, #19255A 100%)'}}>
        {/* Background decorative icons (same as landing) */}
        <div className="absolute top-8 left-8 text-white text-opacity-10 text-5xl md:text-7xl transform -rotate-12 select-none pointer-events-none">&#9776;</div>
        <div className="absolute top-1/4 right-1/4 text-white text-opacity-10 text-6xl md:text-8xl transform -rotate-12 select-none pointer-events-none">&#9998;</div>
        <div className="absolute bottom-1/4 left-1/4 text-white text-opacity-10 text-7xl md:text-9xl transform rotate-0 select-none pointer-events-none">&#128214;</div>
        <div className="absolute bottom-8 right-8 text-white text-opacity-10 text-6xl md:text-8xl transform rotate-0 select-none pointer-events-none">&#128269;</div>
        {/* Card with logo and form */}
        <div className="relative w-full max-w-md bg-antiflashwhite rounded-2xl shadow-2xl px-8 py-10 flex flex-col items-center mx-auto border border-mountainmeadow z-10">
          {/* Logo - Outlined Hexagon with teal dot (small, top of card) */}
          <div className="flex flex-col items-center mb-2 mt-0">
            <svg className="w-12 h-12 mx-auto" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <polygon points="40,10 70,27 70,53 40,70 10,53 10,27" stroke="#2CC5A9" strokeWidth="6" fill="none" />
              <circle cx="40" cy="30" r="7" fill="#2CC5A9" />
            </svg>
            {/* App Name under Logo */}
            <h1 className="text-3xl font-extrabold text-mountainmeadow mb-6 text-center drop-shadow-lg mt-2">Collegegram</h1>
          </div>
          {/* Register Form Container */}
          <form onSubmit={handleRegister} className="bg-transparent p-0 rounded-xl w-full max-w-md">
            {/* Roll No Input */}
            <div className="mb-6">
              <label htmlFor="register-rollno" className="sr-only">Roll No</label>
              <input
                type="text"
                id="register-rollno"
                placeholder="Roll No (e.g., B20232637)"
                className="w-full p-4 rounded-lg bg-antiflashwhite text-bangladeshgreen placeholder-bangladeshgreen focus:outline-none focus:ring-2 focus:ring-mountainmeadow"
                value={rollNo}
                onChange={(e) => setRollNo(e.target.value)}
                required
              />
            </div>
            {/* Password Input */}
            <div className="mb-6">
              <label htmlFor="register-password" className="sr-only">Password</label>
              <input
                type="password"
                id="register-password"
                placeholder="Password :-"
                className="w-full p-4 rounded-lg bg-antiflashwhite text-bangladeshgreen placeholder-bangladeshgreen focus:outline-none focus:ring-2 focus:ring-mountainmeadow"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {/* Confirm Password Input */}
            <div className="mb-8">
              <label htmlFor="confirm-password" className="sr-only">Confirm Password</label>
              <input
                type="password"
                id="confirm-password"
                placeholder="Confirm Password :-"
                className="w-full p-4 rounded-lg bg-antiflashwhite text-bangladeshgreen placeholder-bangladeshgreen focus:outline-none focus:ring-2 focus:ring-mountainmeadow"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            {/* Register Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-mountainmeadow to-caribbeangreen text-richblack font-bold py-3 px-6 rounded-lg shadow-lg hover:from-bangladeshgreen hover:to-mint hover:scale-105 transition-all focus:outline-none focus:ring-4 focus:ring-mountainmeadow"
            >
              Register
            </button>
            {/* Back to Login Link */}
            <div className="text-center mt-6">
              <button
                type="button"
                onClick={onBackToLogin}
                className="text-mountainmeadow hover:underline text-sm bg-transparent border-none p-0 cursor-pointer"
              >
                Back to Login
              </button>
            </div>
          </form>
        </div>
        {/* Add fade-in and logo animation keyframes if not already present */}
        <style>{`
          @keyframes fadein { from { opacity: 0; } to { opacity: 1; } }
          .animate-fadein { animation: fadein 1s ease; }
          @keyframes logoBounce { 0% { transform: scale(0.7); opacity: 0; } 60% { transform: scale(1.1); opacity: 1; } 100% { transform: scale(1); opacity: 1; } }
          .animate-logo-bounce { animation: logoBounce 1s cubic-bezier(0.68,-0.55,0.27,1.55); }
          .animate-fadein-delay { animation: fadein 1s 0.7s ease both; }
          .animate-fadein-delay2 { animation: fadein 1s 1.2s ease both; }
        `}</style>
      </div>
    );
  }

  // --- DashboardPage Component (Internal to App) ---
  interface DashboardPageProps {
    onGoToAttendance: () => void;
    onLogout: () => void;
    onGoToResult: () => void;
    onGoToTimetable: () => void;
    onGoToCollegeGallery: () => void;
    onGoToAboutCollege: () => void;
    onGoToEvent: () => void;
    onGoToNotifications: () => void;
    onGoToHome: () => void;
    onGoToId: () => void;
    onGoToWallet: () => void;
    onGoToProfile: () => void;
    onGoToLibrary: () => void;
    onGoToFees: () => void;
    onGoToStudyMaterial: () => void;
  }
 
  function DashboardPage({ onGoToAttendance, onLogout, onGoToResult, onGoToTimetable, onGoToCollegeGallery, onGoToAboutCollege, onGoToEvent, onGoToNotifications, onGoToHome, onGoToId, onGoToWallet, onGoToProfile, onGoToLibrary, onGoToFees, onGoToStudyMaterial }:DashboardPageProps) {
    const [showMenu, setShowMenu] = useState(false); // State for menu visibility

    // Placeholder data for classes
    const classes = [
      { teacher: 'Mrs. Sharma', subject: 'English', timing: 'Monday to Friday, 10:00 AM - 10:45 AM' },
      { teacher: 'Mrs. Iyer', subject: 'History', timing: 'Monday to Friday, 12:00 PM - 12:45 PM' },
      { teacher: 'Ms. Fernandes', subject: 'Science', timing: 'Monday to Friday, 11:00 AM - 11:45 AM' },
      { teacher: 'Miss Desai', subject: 'Computer Science', timing: 'Monday to Friday, 2:00 PM - 2:45 PM' },
      { teacher: 'Mr. Khan', subject: 'Mathematics', timing: 'Monday to Friday, 9:00 AM - 9:45 AM' },
    ];

    // Placeholder data for quick actions
    const quickActions = [
      { icon: '💰', label: 'FEES', action: onGoToFees },
      { icon: '📚', label: 'LIBRARY', action: onGoToLibrary },
      { icon: '📝', label: 'STUDY MATERIAL', action: onGoToStudyMaterial },
      { icon: '🖼️', label: 'CLG GALLERY', action: onGoToCollegeGallery },
      { icon: '✅', label: 'ATTENDANCE', action: onGoToAttendance },
      { icon: '📊', label: 'RESULT', action: onGoToResult },
      { icon: '📅', label: 'TIMETABLE', action: onGoToTimetable },
    ];

    // Placeholder data for more actions
    const moreActions = [
      { icon: '📝', label: 'BONAFIDE CERTIFICATE', action: handleGoToBonafide },
      { icon: '📝', label: 'ASSIGNMENTS', action: () => {} },
      { icon: '🏫', label: 'ABOUT COLLEGE', action: onGoToAboutCollege },
      { icon: '🎉', label: 'EVENTS', action: onGoToEvent },
      { icon: '🎓', label: 'SCHOLARSHIP', action: handleGoToScholarship }
    ];

    // Reusable ActionButton Component
    interface ActionButtonProps {
      icon: React.ReactNode;
      label: string;
      action: () => void;
    }
    const ActionButton = ({ icon, label, action }:ActionButtonProps) => (
      <button
        className="flex-none flex flex-col items-center justify-center p-2 w-24 h-24 bg-antiflashwhite/70 border-2 border-mountainmeadow rounded-3xl shadow-xl text-bangladeshgreen text-center text-xs backdrop-blur-lg transition-transform duration-200 hover:scale-110 hover:shadow-2xl hover:bg-mountainmeadow/80 hover:text-richblack group"
        onClick={action}
      >
        <span className="text-3xl mb-1 group-hover:animate-bounce">{icon}</span>
        <span className="font-semibold tracking-wide">{label}</span>
      </button>
    );

    return (
      <div className="min-h-screen flex flex-col pb-20 bg-[#19255A] relative overflow-hidden animate-fadein" style={{background: 'linear-gradient(to bottom, #19255A 100%, #19255A 100%)', fontFamily: 'Inter, Poppins, Montserrat, sans-serif'}}>
        {/* Background decorative icons (same as login/landing) */}
        <div className="absolute top-8 left-8 text-white text-opacity-10 text-5xl md:text-7xl transform -rotate-12 select-none pointer-events-none">&#9776;</div>
        <div className="absolute top-1/4 right-1/4 text-white text-opacity-10 text-6xl md:text-8xl transform -rotate-12 select-none pointer-events-none">&#9998;</div>
        <div className="absolute bottom-1/4 left-1/4 text-white text-opacity-10 text-7xl md:text-9xl transform rotate-0 select-none pointer-events-none">&#128214;</div>
        <div className="absolute bottom-8 right-8 text-white text-opacity-10 text-6xl md:text-8xl transform rotate-0 select-none pointer-events-none">&#128269;</div>
        {/* Top Section: User Info */}
        <div className="bg-darkgreen/80 backdrop-blur-lg text-antiflashwhite p-6 pb-4 md:p-8 flex flex-col items-center md:items-start rounded-b-3xl shadow-2xl relative">
          <div className="flex items-center w-full max-w-4xl mx-auto mb-6">
            <div className="bg-mountainmeadow rounded-full w-16 h-16 flex items-center justify-center text-3xl font-bold text-richblack mr-4 shadow-lg">
              U
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-mountainmeadow to-caribbeangreen bg-clip-text text-transparent drop-shadow-lg">JAI ARUN KANTHARIA</h2>
              <p className="text-base md:text-lg text-mint font-medium">B20232637 SEMESTER 4</p>
              <p className="text-base md:text-lg text-mint font-medium">COURSE:-BSCIT Year:-TY</p>
            </div>
          </div>

          {/* Menu Button */}
          <div className="absolute top-4 right-4">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="text-antiflashwhite text-3xl p-2 rounded-full hover:bg-mountainmeadow hover:text-richblack focus:outline-none focus:ring-2 focus:ring-mountainmeadow transition-all"
            >
              &#8943;
            </button>
            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-antiflashwhite rounded-2xl shadow-lg py-1 z-20">
                <button
                  onClick={onLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-richblack hover:bg-mountainmeadow hover:text-antiflashwhite rounded-xl"
                >
                  Log Out
                </button>
              </div>
            )}
          </div>

          <h3 className="text-2xl md:text-3xl font-extrabold mb-4 w-full max-w-4xl mx-auto bg-gradient-to-r from-mountainmeadow to-caribbeangreen bg-clip-text text-transparent drop-shadow-lg tracking-wide">Today&apos;s Classes</h3>
          <div className="flex flex-row flex-nowrap overflow-x-auto gap-4 w-full max-w-4xl mx-auto pb-4 hide-scrollbar">
            {classes.map((cls, index) => (
              <div key={index} className="flex-none w-72 bg-antiflashwhite/80 backdrop-blur-lg text-bangladeshgreen p-5 rounded-3xl shadow-xl border-2 border-mountainmeadow hover:scale-105 hover:shadow-2xl transition-transform duration-200">
                <div className="font-bold text-lg mb-2">Class Teacher: {cls.teacher}</div>
                <div className="mb-1">Subject: <span className="font-semibold">{cls.subject}</span></div>
                <div>Timing: <span className="font-semibold">{cls.timing}</span></div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl mx-auto mt-6">
            <div className="bg-mountainmeadow/90 backdrop-blur-lg text-richblack p-4 rounded-3xl shadow-xl flex items-center justify-center text-2xl font-bold hover:scale-105 hover:shadow-2xl transition-transform duration-200">
              <span className="mr-2">&#128100;</span> Attendance
            </div>
            <div className="bg-caribbeangreen/90 backdrop-blur-lg text-richblack p-4 rounded-3xl shadow-xl flex items-center justify-center text-2xl font-bold hover:scale-105 hover:shadow-2xl transition-transform duration-200">
              <span className="mr-2">&#128184;</span> Fees Due
            </div>
          </div>
        </div>

        {/* Quick Actions Section */}
        <div className="bg-darkgreen/80 backdrop-blur-lg text-antiflashwhite p-6 pt-0 md:p-8 md:pt-0 mt-6 rounded-3xl mx-auto w-full max-w-4xl shadow-2xl">
          <h3 className="text-2xl md:text-3xl font-extrabold mb-4 bg-gradient-to-r from-mountainmeadow to-caribbeangreen bg-clip-text text-transparent drop-shadow-lg tracking-wide">Quick Actions</h3>
          <div className="flex flex-row flex-nowrap overflow-x-auto hide-scrollbar gap-4 w-full pb-4">
            {quickActions.map((action, index) => (
              <ActionButton key={index} icon={action.icon} label={action.label} action={action.action??(()=>{})} />
            ))}
          </div>
        </div>

        {/* More Actions Section */}
        <div className="bg-darkgreen/80 backdrop-blur-lg text-antiflashwhite p-6 pt-0 md:p-8 md:pt-0 mt-6 rounded-3xl mx-auto w-full max-w-4xl shadow-2xl">
          <h3 className="text-2xl md:text-3xl font-extrabold mb-4 bg-gradient-to-r from-mountainmeadow to-caribbeangreen bg-clip-text text-transparent drop-shadow-lg tracking-wide">More Actions</h3>
          <div className="flex flex-row flex-nowrap overflow-x-auto hide-scrollbar gap-4 w-full pb-4">
            {moreActions.map((action, index) => (
              <ActionButton key={index} icon={action.icon} label={action.label} action={action.action??(()=>{})} />
            ))}
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-antiflashwhite/90 backdrop-blur-lg shadow-lg p-3 flex justify-around items-center border-t border-mountainmeadow z-50">
          <NavItem icon="🏠" label="Home" action={onGoToHome} />
          <NavItem icon="🔔" label="Notifications" action={onGoToNotifications} />
          <NavItem icon="🆔" label="ID" action={onGoToId} />
          <NavItem icon="💳" label="Wallet" action={onGoToWallet} />
          <NavItem icon="👤" label="Profile" action={onGoToProfile} />
        </div>
        {/* Add fade-in and logo animation keyframes if not already present */}
        <style>{`
          @keyframes fadein { from { opacity: 0; } to { opacity: 1; } }
          .animate-fadein { animation: fadein 1s ease; }
          @keyframes logoBounce { 0% { transform: scale(0.7); opacity: 0; } 60% { transform: scale(1.1); opacity: 1; } 100% { transform: scale(1); opacity: 1; } }
          .animate-logo-bounce { animation: logoBounce 1s cubic-bezier(0.68,-0.55,0.27,1.55); }
          .animate-fadein-delay { animation: fadein 1s 0.7s ease both; }
          .animate-fadein-delay2 { animation: fadein 1s 1.2s ease both; }
          /* Hide scrollbar for Chrome, Safari and Opera */
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          /* Hide scrollbar for IE, Edge and Firefox */
          .hide-scrollbar {
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;  /* Firefox */
          }
        `}</style>
      </div>
    );
  }

  // --- AttendancePage Component (Internal to App) ---
  interface AttendancePageProps {
  onBackToDashboard: () => void;
  onGoToNotifications: () => void;
  onGoToHome: () => void;
  onGoToId: () => void;
  onGoToWallet: () => void;
  onGoToProfile: () => void;
  }
  function AttendancePage({ onBackToDashboard, onGoToNotifications, onGoToHome, onGoToId, onGoToWallet, onGoToProfile}:AttendancePageProps) {
    const [activeTab, setActiveTab] = useState('attendance'); //'attendance' or 'holiday'
    const [currentDate, setCurrentDate] = useState(new Date(2020, 10, 1));  //Start at November 1, 2020
    
  
    const daysOfWeek = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];

    // Placeholder holiday data for November 2020
    const holidays = [
      { name: 'Diwali', date: '14th November', dayOfWeek: 'Saturday' },
      { name: 'Govardhan Puja', date: '15th November', dayOfWeek: 'Sunday' },
      { name: 'Bhaiya Dooj', date: '16th November', dayOfWeek: 'Monday' },
    ];

    const getDaysInMonth = (year: number, month: number) => {
      return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (year: number, month: number) => {
      // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
      // We want Monday to be the first day of our week view (index 0)
      const day = new Date(year, month, 1).getDay();
      return day === 0 ? 6 : day - 1; // Convert Sunday (0) to 6 (end of week)
    };

    interface CalendarDay {
      day: number;
      monthOffset: number;
      isAbsent?: boolean;
      isPresent?: boolean;
      isHoliday?: boolean;
    }

    const generateCalendarDays = (year: number, month: number): CalendarDay[] => {
      const numDays = getDaysInMonth(year, month);
      const firstDayIndex = getFirstDayOfMonth(year, month); // 0 for Monday, 1 for Tuesday, etc.

      const days: CalendarDay[] = [];

      // Add days from previous month to fill the leading empty cells
      const prevMonthNumDays = getDaysInMonth(year, month - 1);
      for (let i = 0; i < firstDayIndex; i++) {
        days.push({ day: prevMonthNumDays - (firstDayIndex - 1 - i), monthOffset: -1 });
      }

      // Add days for current month
      for (let i = 1; i <= numDays; i++) {
        let status: Partial<CalendarDay> = {};
        if (year === 2020 && month === 10) { // November 2020
          if (i === 1 || i === 8 || i === 23) status = { isAbsent: true };
          if (i === 4 || i === 11 || i === 18 || i === 25) status = { isPresent: true }; // Updated present days
          // Highlight holidays on the calendar
          if (i === 14 || i === 15 || i === 16) status = { isHoliday: true };
        }
        days.push({ day: i, monthOffset: 0, ...status });
      }

      // Add days from next month to fill the last row
      const totalCells = 6 * 7; // 6 rows * 7 days
      const remainingCells = totalCells - days.length;
      for (let i = 1; i <= remainingCells; i++) {
        days.push({ day: i, monthOffset: 1 });
      }

      return days;
    };

    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const calendarDays = generateCalendarDays(currentYear, currentMonth);

    const goToPreviousMonth = () => {
      setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1));
    };

    const goToNextMonth = () => {
      setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1));
    };

    return (
      <div className="min-h-screen bg-[#61C2A5] flex flex-col relative pb-20"> {/* Light green background */}
        {/* Top Bar */}
        <div className="bg-[#283452] text-white p-4 flex items-center justify-between shadow-md">
          <button onClick={onBackToDashboard} className="text-white text-2xl px-2">&#8592;</button> {/* Back arrow */}
          <div className="flex bg-[#4A5D8A] rounded-full p-1">
            <button
              onClick={() => setActiveTab('attendance')}
              className={`px-6 py-2 rounded-full font-semibold ${activeTab === 'attendance' ? 'bg-blue-600 text-white' : 'text-white bg-transparent'}`}
            >
              ATTENDANCE
            </button>
            <button
              onClick={() => setActiveTab('holiday')}
              className={`px-6 py-2 rounded-full font-semibold ${activeTab === 'holiday' ? 'bg-blue-600 text-white' : 'text-white bg-transparent'}`}
            >
              HOLIDAY
            </button>
          </div>
          <div className="w-8"></div> {/* Spacer for alignment */}
        </div>

        {/* Content based on activeTab */}
        {activeTab === 'attendance' && (
          <div className="p-4 flex-grow">
            <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
              {/* Month Navigation */}
              <div className="flex justify-between items-center text-gray-800 font-bold text-lg mb-4">
                <button onClick={goToPreviousMonth} className="text-xl px-2">&lt;</button>
                <span>{monthNames[currentMonth]} {currentYear}</span>
                <button onClick={goToNextMonth} className="text-xl px-2">&gt;</button>
              </div>

              {/* Days of Week */}
              <div className="grid grid-cols-7 text-center font-semibold text-gray-600 mb-2">
                {daysOfWeek.map((day, index) => (
                  <div key={index}>{day}</div>
                ))}
              </div>

              {/* Calendar Dates */}
              
              <div className="grid grid-cols-7 gap-2 text-center">
                {calendarDays.map((date, index) => {
                  let dayClass = 'p-2 rounded-full w-10 h-10 flex items-center justify-center mx-auto';
                  let textColor = 'text-gray-800';

                  if (date.monthOffset !== 0) { // Days from previous/next month
                    textColor = 'text-gray-400';
                  }

                  if (date.isAbsent) {
                    dayClass += ' bg-red-500 text-white';
                  } else if (date.isHoliday) {
                    dayClass += ' bg-purple-500 text-white'; // Holidays are purple on calendar as per legend
                  } else if (date.isPresent) {
                    dayClass += ' bg-green-500 text-white'; // Present days are green
                  } else if (date.monthOffset === 0) { // Current month days that are not marked
                    dayClass += ' bg-gray-200';
                  }

                  return (
                    <div key={index} className={`${dayClass} ${textColor}`}>
                      {date.day}
                    </div>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="mt-6 p-4 bg-gray-100 rounded-lg text-sm text-gray-700">
                <h4 className="font-bold mb-2">Legend:</h4>
                <div className="flex items-center mb-1">
                  <span className="w-4 h-4 bg-green-500 rounded-full mr-2"></span> Present
                </div>
                <div className="flex items-center mb-1">
                  <span className="w-4 h-4 bg-red-500 rounded-full mr-2"></span> Absent
                </div>
                <div className="flex items-center">
                  <span className="w-4 h-4 bg-purple-500 rounded-full mr-2"></span> Holiday
                </div>
              </div>
            </div>

            {/* Summary Bars */}
            <div className="bg-white rounded-xl shadow-lg p-4">
              <div className="flex items-center justify-between bg-red-100 border-l-4 border-red-500 p-3 rounded-lg mb-3">
                <span className="text-red-800 font-semibold">Absent</span>
                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm">02</span>
              </div>
              <div className="flex items-center justify-between bg-green-100 border-l-4 border-green-500 p-3 rounded-lg">
                <span className="text-green-800 font-semibold">Festival & Holidays</span>
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">03</span> {/* Changed to 03 for the 3 holidays */}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'holiday' && (
          <div className="p-4 flex-grow">
            <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
              {/* Month Navigation (retained for consistency with image) */}
              <div className="flex justify-between items-center text-gray-800 font-bold text-lg mb-4">
                <button onClick={goToPreviousMonth} className="text-xl px-2">&lt;</button>
                <span>{monthNames[currentMonth]} {currentYear}</span>
                <button onClick={goToNextMonth} className="text-xl px-2">&gt;</button>
              </div>

              {/* Days of Week (retained for consistency with image) */}
              <div className="grid grid-cols-7 text-center font-semibold text-gray-600 mb-2">
                {daysOfWeek.map((day, index) => (
                  <div key={index}>{day}</div>
                ))}
              </div>

              {/* Calendar Dates (retained for consistency with image, but not interactive) */}
              <div className="grid grid-cols-7 gap-2 text-center mb-6">
                {calendarDays.map((date, index) => {
                  let dayClass = 'p-2 rounded-full w-10 h-10 flex items-center justify-center mx-auto';
                  let textColor = 'text-gray-800';

                  if (date.monthOffset !== 0) { // Days from previous/next month
                    textColor = 'text-gray-400';
                  }

                  if (date.isAbsent) {
                    dayClass += ' bg-red-500 text-white';
                  } else if (date.isHoliday) {
                    dayClass += ' bg-purple-500 text-white'; // Holidays are purple on calendar
                  } else if (date.isPresent) {
                    dayClass += ' bg-green-500 text-white'; // Present days are green
                  } else if (date.monthOffset === 0) { // Current month days that are not marked
                    dayClass += ' bg-gray-200';
                  }

                  return (
                    <div key={index} className={`${dayClass} ${textColor}`}>
                      {date.day}
                    </div>
                  );
                })}
              </div>

              <h3 className="font-bold text-lg mb-4 text-gray-800">List of Holiday</h3>
              {holidays.map((holiday, index) => (
                <div key={index} className="bg-gray-100 rounded-lg shadow-sm p-4 mb-3 flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-gray-800">{holiday.name}</p>
                    <p className="text-sm text-gray-600">{holiday.date}</p>
                  </div>
                  <span className="text-gray-700 text-sm">{holiday.dayOfWeek}</span>
                </div>
              ))}
              {holidays.length === 0 && (
                <p className="text-gray-600 text-center">No holidays listed for this month.</p>
              )}
            </div>
          </div>
        )}

        {/* Bottom decorative doodles (simplified) */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-green-200 opacity-50"
            style={{
               backgroundImage: `url('https://placehold.co/600x100/61C2A5/FFFFFF?text=Doodles&font=lora')`, // Placeholder for doodles
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'bottom center',
             }}>
        </div>

        {/* Bottom Navigation Bar (consistent with Dashboard) */}
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

  // --- ProfilePage Component (Internal to App) ---
  interface ProfilePageProps {
  onBackToDashboard: () => void;
  onGoToNotifications: () => void;
  onGoToHome: () => void;
  onGoToId: () => void;
  onGoToWallet: () => void;
  onGoToProfile: () => void;
  showModal: (title: string, message: string, onConfirm?: (() => void) | null) => void;
}
  function ProfilePage({ onBackToDashboard, onGoToNotifications, onGoToHome, onGoToId, onGoToWallet, onGoToProfile, showModal }:ProfilePageProps) {
    const [showProfileOptions, setShowProfileOptions] = useState(false);

    const profileData = {
      name: 'Jai Kantharia',
      studentId: 'B20232637',
      adharNo: '1234 4325 4567 1234',
      academicYear: '2020-2021',
      admissionClass: 'TYBSCIT',
      oldAdmissionNo: 'T00221',
      dateOfAdmission: '4 JUNE 2023',
      dateOfBirth: '15/09/2005',
      parentMailId: 'parentboth84@gmail.com',
      motherName: 'Monica Larson',
      fatherName: 'Bernard Taylor',
      address: 'Karol Bagh, Delhi',
      emergencyContactMother: '960203456',
      emergencyContactFather: '9320330395',
    };

    interface ProfileDetailItemProps {
  label: string;
  value: string;
  locked?: boolean;
}

    const ProfileDetailItem = ({ label, value, locked = true }:ProfileDetailItemProps) => (
      <div className="flex items-center justify-between py-2 border-b border-gray-200 last:border-b-0">
        <div className="flex flex-col">
          <span className="text-xs text-gray-500">{label}</span>
          <span className="font-medium text-gray-800">{value}</span>
        </div>
        {locked && (
          <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v2H5a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2h-1V6a4 4 0 00-4-4zm-3 4a3 3 0 016 0v2H7V6z" clipRule="evenodd" />
          </svg>
        )}
      </div>
    );

    const handleProfileOptionClick = newFunction();

    return (
      <div className="min-h-screen bg-[#283452] flex flex-col relative pb-20">
        {/* Top Bar */}
        <div className="bg-[#202A40] text-white p-4 flex items-center shadow-md">
          <button onClick={onBackToDashboard} className="text-white text-2xl px-2 mr-4">&#8592;</button>
          <h1 className="text-xl font-semibold">Profile</h1>
        </div>

        {/* Profile Header Section */}
        <div className="bg-yellow-400 text-blue-900 p-6 flex flex-col items-center rounded-b-3xl shadow-lg relative z-10">
          <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-md mb-3">
            <img
              src="https://placehold.co/112x112/A7D9FF/283452?text=Profile" // Placeholder image
              alt="Profile"
              className="w-full h-full object-cover"
              onError={(e) => {  const target=e.target as HTMLImageElement; target.onerror = null;target.src = 'https://placehold.co/112x112/A7D9FF/283452?text=Error'; }}
            />
          </div>
          <button
            onClick={() => setShowProfileOptions(true)}
            className="text-sm font-semibold text-blue-900 bg-white bg-opacity-75 px-3 py-1 rounded-full mb-2 hover:bg-opacity-100 transition-colors"
          >
            Change profile picture
          </button>
          <h2 className="text-2xl font-bold">{profileData.name}</h2>
          <p className="text-sm">{profileData.studentId}</p>
        </div>

        {/* Profile Options Overlay */}
        {showProfileOptions && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-end justify-center z-40 p-4">
            <div className="bg-[#202A40] rounded-t-3xl shadow-lg w-full max-w-md p-6 animate-slide-up">
              <div className="w-16 h-1.5 bg-gray-600 rounded-full mx-auto mb-6"></div> {/* Grab handle */}
              <button
                onClick={() => handleProfileOptionClick('Choose from library')}
                className="flex items-center w-full p-4 mb-3 bg-gray-700 rounded-lg text-white text-lg hover:bg-gray-600 transition-colors"
              >
                <span className="text-3xl mr-4">&#128444;&#65039;</span> {/* Image icon */}
                Choose from library
              </button>
              <button
                onClick={() => handleProfileOptionClick('Take photo')}
                className="flex items-center w-full p-4 mb-3 bg-gray-700 rounded-lg text-white text-lg hover:bg-gray-600 transition-colors"
              >
                <span className="text-3xl mr-4">&#128247;</span> {/* Camera icon */}
                Take photo
              </button>
              <button
                onClick={() => handleProfileOptionClick('Delete')}
                className="flex items-center w-full p-4 bg-gray-700 rounded-lg text-red-500 text-lg hover:bg-gray-600 transition-colors"
              >
                <span className="text-3xl mr-4">&#128465;&#65039;</span> {/* Trash can icon */}
                Delete
              </button>
              {/* Close button for the overlay */}
              <button
                onClick={() => setShowProfileOptions(false)}
                className="mt-6 w-full bg-gray-600 text-white font-bold py-3 rounded-lg hover:bg-gray-500 transition-colors"
              >
                Cancel
              </button>
            </div>
            {/* Embedded CSS for slide-up animation */}
            <style>{`
              @keyframes slideUp {
                from { transform: translateY(100%); }
                to { transform: translateY(0); }
              }
              .animate-slide-up {
                animation: slideUp 0.3s ease-out forwards;
              }
            `}</style>
          </div>
        )}

        {/* Profile Details Section */}
        <div className="p-4 flex-grow">
          <div className="bg-white rounded-xl shadow-lg p-4 mb-4">
            <ProfileDetailItem label="Adhar No" value={profileData.adharNo} />
            <ProfileDetailItem label="Academic Year" value={profileData.academicYear} />
            <ProfileDetailItem label="Admission Class" value={profileData.admissionClass} />
            <ProfileDetailItem label="Old Admission No" value={profileData.oldAdmissionNo} />
            <ProfileDetailItem label="Date of Admission" value={profileData.dateOfAdmission} />
            <ProfileDetailItem label="Date of Birth" value={profileData.dateOfBirth} />
            <ProfileDetailItem label="Parent Mail ID" value={profileData.parentMailId} />
            <ProfileDetailItem label="Mother Name" value={profileData.motherName} />
            <ProfileDetailItem label="Father Name" value={profileData.fatherName} />
            <ProfileDetailItem label="Address" value={profileData.address} />
          </div>

          {/* Emergency Contact Section */}
          <div className="bg-[#202A40] text-white rounded-xl shadow-lg p-4">
            <h3 className="text-lg font-bold mb-3">EMERGENCY CONTACT</h3>
            <div className="mb-2">
              <p className="font-semibold">MONICA (MOTHER)</p>
              <p className="text-sm">{profileData.emergencyContactMother}</p>
            </div>
            <div>
              <p className="font-semibold">BERNARD (FATHER)</p>
              <p className="text-sm">{profileData.emergencyContactFather}</p>
            </div>
          </div>
        </div>

        {/* Bottom decorative doodles (simplified) */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-green-200 opacity-50"
             style={{
               backgroundImage: `url('https://placehold.co/600x100/61C2A5/FFFFFF?text=Doodles&font=lora')`, // Placeholder for doodles
               backgroundSize: 'cover',
               backgroundRepeat: 'no-repeat',
               backgroundPosition: 'bottom center',
             }}>
        </div>

        {/* Bottom Navigation Bar (consistent with Dashboard) */}
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-3 flex justify-around items-center border-t border-gray-200 z-50">
          <NavItem icon="🏠" label="Home" action={onGoToHome} />
          <NavItem icon="🔔" label="Notifications" action={onGoToNotifications} />
          <NavItem icon="🆔" label="ID" action={onGoToId} />
          <NavItem icon="💳" label="Wallet" action={onGoToWallet} />
          <NavItem icon="👤" label="Profile" action={onGoToProfile} />
        </div>
      </div>
    );

   
    function newFunction() {
      return (option: string) => {
        showModal('Profile Action', `You selected: ${option}`);
        setShowProfileOptions(false);
      };
    }
  }

  // --- IDPage Component (Internal to App) ---
  interface IDPageProps {
  onBackToDashboard: () => void;
  onGoToNotifications: () => void;
  onGoToHome: () => void;
  onGoToId: () => void;
  onGoToWallet: () => void;
  onGoToProfile: () => void;
}

  function IDPage({ onBackToDashboard, onGoToNotifications, onGoToHome, onGoToId, onGoToWallet, onGoToProfile }:IDPageProps) {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => {
      setIsFlipped(!isFlipped);
    };

    const idData = {
      name: 'Jai Kantharia',
      idNumber: 'B20232637',
      course: 'BSC-IT',
      year: 'THIRD YEAR',
      email: 'travisjaiscott@gmail.com',
      phone: '8591223421',
      address: 'jp road',
      profilePic: 'https://placehold.co/150x200/4A5D8A/FFFFFF?text=Student+Photo', // Placeholder for student photo
      qrCode: 'https://placehold.co/150x150/000000/FFFFFF?text=QR+Code', // Placeholder for QR code
    };

    return (
      <div className="min-h-screen bg-[#283452] flex flex-col items-center justify-center p-4 relative pb-20">
        {/* Top Bar */}
        <div className="bg-[#202A40] text-white p-4 flex items-center w-full max-w-sm rounded-t-xl shadow-md absolute top-0 left-0 right-0 z-10">
          <button onClick={onBackToDashboard} className="text-white text-2xl px-2 mr-4">&#8592;</button>
          <h1 className="text-xl font-semibold">Digital ID Card</h1>
        </div>

        {/* ID Card Container */}
        <div
          className={`relative w-full max-w-sm h-[400px] perspective-1000 cursor-pointer mt-16`}
          onClick={handleFlip}
        >
          <div
            className={`relative w-full h-full transform-style-preserve-3d transition-transform duration-700 ${isFlipped ? 'rotate-y-180' : ''}`}
          >
            {/* Front of the ID Card */}
            <div className="absolute w-full h-full backface-hidden bg-[#4A5D8A] rounded-xl shadow-lg flex flex-col items-center p-6">
              <h2 className="text-white text-4xl font-bold mt-8 mb-2">
                <span className="block text-left text-2xl">Jai</span>
                <span className="block text-left text-5xl">Kantharia</span>
              </h2>
              <p className="text-white text-lg mb-4">ID Number: {idData.idNumber}</p>
              <div className="w-32 h-32 rounded-lg overflow-hidden border-2 border-white mb-4">
                <img
                  src={idData.profilePic}
                  alt="Student Profile"
                  className="w-full h-full object-cover"
                  onError={(e) => { const target = e.currentTarget as HTMLImageElement;target.onerror = null; target.src = 'https://placehold.co/150x150/4A5D8A/FFFFFF?text=Error'; }}
                />
              </div>
              <div className="flex justify-between w-full px-4 text-white text-lg font-semibold absolute bottom-6">
                <span>{idData.course}</span>
                <span>{idData.year}</span>
              </div>
            </div>

            {/* Back of the ID Card */}
            <div className="absolute w-full h-full backface-hidden bg-black rounded-xl shadow-lg flex flex-col items-center justify-center p-6 rotate-y-180">
              <h3 className="text-white text-2xl font-bold mb-4">{idData.year}</h3>
              <div className="w-40 h-40 bg-white p-2 rounded-lg flex items-center justify-center mb-6">
                <img
                  src={idData.qrCode}
                  alt="QR Code"
                  className="w-full h-full object-contain"
                  onError={(e) => { const target = e.currentTarget as HTMLImageElement;target.onerror = null; target.src = 'https://placehold.co/150x150/000000/FFFFFF?text=Error'; }}
                />
              </div>
              <p className="text-white text-md mb-2">Email: {idData.email}</p>
              <p className="text-white text-md mb-2">Phone no: {idData.phone}</p>
              <p className="text-md text-white">Address: {idData.address}</p>
            </div>
          </div>
        </div>

        {/* Embedded CSS for 3D flip effect */}
        <style>{`
          .perspective-1000 {
            perspective: 1000px;
          }
          .transform-style-preserve-3d {
            transform-style: preserve-3d;
          }
          .backface-hidden {
            backface-visibility: hidden;
          }
          .rotate-y-180 {
            transform: rotateY(180deg);
          }
        `}</style>

        {/* Bottom Navigation Bar (consistent with Dashboard) */}
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

  // --- ResultPage Component (Internal to App) ---
  interface ResultPageProps {
    onBackToDashboard: () => void;
    onGoToNotifications: () => void;
    onGoToHome: () => void;
    onGoToId: () => void;
    onGoToWallet: () => void;
    onGoToProfile: () => void;
    showModal: (title: string, message: string, onConfirm?: (() => void) | null) => void;
  }
  function ResultPage({ onBackToDashboard, onGoToNotifications, onGoToHome, onGoToId, onGoToWallet, onGoToProfile, showModal }:ResultPageProps) {
    const studentName = "AKSHAY SYAL";
    const overallPercentage = 85;
    const overallGrade = "A";

    const subjects = [
      { name: 'English', total: 100, obtained: 74, grade: 'B' },
      { name: 'Hindi', total: 100, obtained: 87, grade: 'B' },
      { name: 'Science', total: 100, obtained: 74, grade: 'B' },
      { name: 'Math', total: 100, obtained: 87, grade: 'B' },
      { name: 'Social Study', total: 100, obtained: 89, grade: 'B' },
      { name: 'Drawing', total: 100, obtained: 78, grade: 'B' },
      { name: 'Computer', total: 100, obtained: 96, grade: 'A' },
    ];

    const handleDownloadPdf = () => {
      // IMPORTANT: Replace alert with a custom modal in a real application.
      showModal("Download PDF", "Downloading PDF... (Feature under development)");
      console.log("Attempting to download result PDF.");
      // In a real application, you would implement PDF generation logic here,
      // possibly using a library like jsPDF or by sending data to a backend
      // service that generates the PDF.
    };

    return (
      <div className="min-h-screen bg-[#ADD8E6] flex flex-col pb-20"> {/* Light blue background */}
        {/* Top Bar */}
        <div className="bg-[#283452] text-white p-4 flex items-center justify-between shadow-md">
          <button onClick={onBackToDashboard} className="text-white text-2xl px-2">&#8592;</button> {/* Back arrow */}
          <h1 className="text-xl font-semibold">Result</h1>
          <button className="text-white text-2xl px-2">&#128279;</button> {/* Share icon (placeholder) */}
        </div>

        {/* Result Summary Section */}
        <div className="flex flex-col items-center justify-center p-6 bg-[#ADD8E6] text-blue-900 relative">
          {/* Background clouds/doodles (placeholder) */}
          <div className="absolute inset-0 opacity-30"
               style={{
                 backgroundImage: `url('https://placehold.co/600x200/ADD8E6/FFFFFF?text=Clouds&font=lora')`,
                 backgroundSize: 'cover',
                 backgroundRepeat: 'no-repeat',
                 backgroundPosition: 'center',
               }}>
          </div>

          <div className="relative bg-white rounded-full w-40 h-40 flex flex-col items-center justify-center shadow-lg mb-6 z-10">
            <span className="text-4xl font-bold text-blue-800">{overallPercentage}%</span>
            <span className="text-xl font-semibold text-blue-600">GRADE {overallGrade}</span>
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 rounded-full p-2 shadow-md">
              <span className="text-2xl">&#11088;</span> {/* Star icon */}
            </div>
          </div>
          <h2 className="text-2xl font-bold text-blue-900 text-center mb-4 z-10">
            You are Excellent, <br /> {studentName} !!
          </h2>
        </div>

        {/* Subject Results */}
        <div className="p-4 flex-grow">
          <div className="bg-white rounded-xl shadow-lg p-4">
            {subjects.map((subject, index) => (
              <div key={index} className={`flex justify-between items-center py-3 ${index < subjects.length - 1 ? 'border-b border-gray-200' : ''}`}>
                <span className="text-gray-800 font-medium w-1/3">{subject.name}</span>
                <span className="text-gray-600 text-right w-1/3">{subject.total}</span>
                <span className="text-gray-800 font-semibold text-right w-1/3">{subject.obtained} - {subject.grade}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Download PDF Button */}
        <div className="p-4">
          <button
            onClick={handleDownloadPdf}
            className="w-full bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center"
          >
            DOWNLOAD PDF <span className="ml-2">&#128190;</span> {/* Download icon */}
          </button>
        </div>

        {/* Bottom Navigation Bar (consistent with Dashboard) */}
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

  // --- ClassTimetable Sub-component ---
  type ScheduleItem = {
    subject: string;
    time: string;
    teacher?: string;
    room?: string;
    isBreak?: boolean;
    period?: string;
  };

  type ClassTimetableProps = {
    classSchedule: { [key: string]: ScheduleItem[] };
    activeDay: string;
    setActiveDay: (day: string) => void;
  };

  function ClassTimetable({ classSchedule, activeDay, setActiveDay }: ClassTimetableProps) {
    const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

    return (
      <div className="p-4 flex-grow flex flex-col">
        {/* Day Selector */}
        <div className="flex bg-white rounded-full p-1 mb-4 overflow-x-auto hide-scrollbar">
          {days.map(day => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={`flex-none px-4 py-2 rounded-full font-semibold text-sm transition-colors duration-300 ${activeDay === day ? 'bg-blue-600 text-white' : 'text-gray-700 bg-transparent'}`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Class List - Vertically Scrollable */}
        <div className="flex-grow overflow-y-auto hide-scrollbar">
          {classSchedule[activeDay] && classSchedule[activeDay].length > 0 ? (
            classSchedule[activeDay].map((cls: ScheduleItem, index: number) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-4 mb-4">
                <h3 className="text-lg font-bold text-gray-800 mb-1">{cls.subject}</h3>
                <p className="text-gray-700 mb-1">{cls.time}</p>
                {!cls.isBreak && (
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <span>{cls.teacher}</span>
                    <span className="font-semibold">{cls.period}</span>
                  </div>
                )}
                {cls.isBreak && (
                  <div className="flex justify-end items-center text-sm text-gray-600">
                    <span className="text-3xl">&#129369;</span> {/* Sandwich emoji for lunch break */}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-white text-center text-lg mt-8">No classes scheduled for {activeDay}.</p>
          )}
        </div>
      </div>
    );
  }

  // --- ExamTimetable Sub-component ---
  type Exam = {
    subject: string;
    date: string;
    time: string;
    day: string;
    location?: string;
  };

  type ExamTimetableProps = {
    examSchedule: Exam[];
  };

  function ExamTimetable({examSchedule}: ExamTimetableProps) {
    return (
      <div className="p-4 flex-grow flex flex-col">
        {/* Exam List - Vertically Scrollable */}
        <div className="flex-grow overflow-y-auto hide-scrollbar">
          <h3 className="font-bold text-lg mb-4 text-white">Datesheet</h3>
          {examSchedule.length > 0 ? (
            examSchedule.map((exam: Exam, index: number) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-4 mb-4 flex items-center">
                <div className="flex flex-col items-center mr-4">
                  <span className="text-2xl font-bold text-gray-800">{exam.date.split(' ')[0]}</span>
                  <span className="text-sm text-gray-600">{exam.date.split(' ')[1]}</span>
                </div>
                <div className="flex-grow">
                  <p className="font-semibold text-gray-800">{exam.subject}</p>
                  <p className="text-sm text-gray-600">{exam.day}</p>
                </div>
                <div className="flex items-center text-gray-700">
                  <span className="mr-1">&#128337;</span> {/* Clock emoji */}
                  <span>{exam.time}</span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-white text-center text-lg mt-8">No exams scheduled.</p>
          )}
        </div>
      </div>
    );
  }

  // --- CollegeGalleryPage Component (New! Internal to App) ---
  interface CollegeGalleryPageProps {
    onBackToDashboard: () => void;
    onGoToNotifications: () => void;
    onGoToHome: () => void;
    onGoToId: () => void;
    onGoToWallet: () => void;
    onGoToProfile: () => void;
  }

  function CollegeGalleryPage({ onBackToDashboard, onGoToNotifications, onGoToHome, onGoToId, onGoToWallet, onGoToProfile }: CollegeGalleryPageProps) {
    // Placeholder image URLs for the gallery
    const images = [
      'https://placehold.co/300x400/A7D9FF/000000?text=Gallery+Image+1&font=lora',
      'https://placehold.co/400x300/63B3ED/000000?text=Gallery+Image+2&font=lora',
      'https://placehold.co/350x350/283452/FFFFFF?text=Gallery+Image+3&font=lora',
      'https://placehold.co/400x250/A7D9FF/000000?text=Gallery+Image+4&font=lora',
      'https://placehold.co/300x300/63B3ED/000000?text=Gallery+Image+5&font=lora',
      'https://placehold.co/250x350/283452/FFFFFF?text=Gallery+Image+6&font=lora',
      'https://placehold.co/350x200/A7D9FF/000000?text=Gallery+Image+7&font=lora',
      'https://placehold.co/200x300/63B3ED/000000?text=Gallery+Image+8&font=lora',
    ];

    return (
      <div className="min-h-screen bg-[#283452] flex flex-col pb-20"> {/* Dark blue background */}
        {/* Embedded CSS for hiding scrollbar */}
        <style>{`
          /* Hide scrollbar for Chrome, Safari and Opera */
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          /* Hide scrollbar for IE, Edge and Firefox */
          .hide-scrollbar {
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;  /* Firefox */
          }
        `}</style>

        {/* Top Bar */}
        <div className="bg-[#202A40] text-white p-4 flex items-center shadow-md">
          <button onClick={onBackToDashboard} className="text-white text-2xl px-2 mr-4">&#8592;</button> {/* Back arrow */}
          <h1 className="text-xl font-semibold">School Gallery</h1>
        </div>

        {/* Gallery Grid - Vertically Scrollable */}
        <div className="p-4 flex-grow overflow-y-auto hide-scrollbar">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((imageUrl, index) => (
              <div key={index} className="bg-gray-200 rounded-lg overflow-hidden shadow-md">
                <img
                  src={imageUrl}
                  alt={`Gallery Image ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                  onError={(e) => {const target = e.currentTarget as HTMLImageElement;target.onerror = null; target.src = "https://placehold.co/300x200/cccccc/000000?text=Image+Error&font=lora"; }} // Fallback
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Navigation Bar (consistent with Dashboard) */}
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

  // --- AboutCollegePage Component (New! Internal to App) ---
  interface AboutCollegePageProps {
    onBackToDashboard: () => void;
    onGoToNotifications: () => void;
    onGoToHome: () => void;
    onGoToId: () => void;
    onGoToWallet: () => void;
    onGoToProfile: () => void;
  }

  function AboutCollegePage({ onBackToDashboard, onGoToNotifications, onGoToHome, onGoToId, onGoToWallet, onGoToProfile }: AboutCollegePageProps) {
    return (
      <div className="min-h-screen bg-white flex flex-col pb-20"> {/* White background */}
        {/* Top Bar */}
        <div className="bg-[#202A40] text-white p-4 flex items-center shadow-md">
          <button onClick={onBackToDashboard} className="text-white text-2xl px-2 mr-4">&#8592;</button> {/* Back arrow */}
          <h1 className="text-xl font-semibold">About College</h1>
        </div>

        {/* About College Content - Vertically Scrollable */}
        <div className="p-4 flex-grow overflow-y-auto hide-scrollbar">
          <div className="flex flex-col items-center mb-6">
            {/* College Logo */}
            <div className="w-32 h-32 mb-4">
              <img
                src="https://placehold.co/128x128/A7D9FF/000000?text=LOGO&font=lora"
                alt="College Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 text-center">LOGO TEXT HERE</h2>
            <p className="text-md text-gray-600 text-center">SLOGAN HERE</p>
          </div>

          <div className="bg-gray-100 rounded-xl shadow-lg p-6">
            <p className="text-gray-800 text-lg leading-relaxed">
              Our college is a place of learning, growth, and opportunity. With experienced
              faculty, modern facilities, and a vibrant campus life, it offers
              students a strong foundation for their future. The college
              promotes academic excellence, skill development,
              and all-round personality growth.
            </p>
          </div>
        </div>

        {/* Bottom Navigation Bar (consistent with Dashboard) */}
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

  // --- EventPage Component (New! Internal to App) ---
  interface Event {
    id: string;
    title: string;
    imageUrl: string;
    detailImageUrl: string;
    description: string;
  }

  interface EventPageProps {
    onBackToDashboard: () => void;
    onSelectEvent: (event: Event) => void;
    onGoToNotifications: () => void;
    onGoToHome: () => void;
    onGoToId: () => void;
    onGoToWallet: () => void;
    onGoToProfile: () => void;
  }

  function EventPage({ onBackToDashboard, onSelectEvent, onGoToNotifications, onGoToHome, onGoToId, onGoToWallet, onGoToProfile }: EventPageProps) {
    const events: Event[] = [
      {
        id: 'prom',
        title: 'PROM',
        imageUrl: 'https://placehold.co/400x200/FFD700/000000?text=PROM&font=lora',
        detailImageUrl: 'https://placehold.co/600x400/FFD700/000000?text=PROM+DETAILS&font=lora',
        description: 'Refers to the setting, atmosphere, and social events surrounding a high school Prom. It encompasses the physical location of the prom.',
      },
      {
        id: 'sportsday',
        title: 'SPORTS DAY',
        imageUrl: 'https://placehold.co/400x200/A7D9FF/000000?text=SPORTS+DAY&font=lora',
        detailImageUrl: 'https://placehold.co/600x400/A7D9FF/000000?text=SPORTS+DAY+DETAILS&font=lora',
        description: 'Annual sports event featuring various athletic competitions and team games. A day of fun, fitness, and friendly rivalry among students and faculty.',
      },
      {
        id: 'freshers',
        title: 'FRESHERS PARTY',
        imageUrl: 'https://placehold.co/400x200/63B3ED/000000?text=FRESHERS&font=lora',
        detailImageUrl: 'https://placehold.co/600x400/63B3ED/000000?text=FRESHERS+DETAILS&font=lora',
        description: 'A welcoming party for new students to help them socialize and get acquainted with the college environment and their seniors.',
      },
      {
        id: 'farewell',
        title: 'FAREWELL PARTY',
        imageUrl: 'https://placehold.co/400x200/283452/FFFFFF?text=FAREWELL&font=lora',
        detailImageUrl: 'https://placehold.co/600x400/283452/FFFFFF?text=FAREWELL+DETAILS&font=lora',
        description: 'A memorable event organized to bid adieu to the graduating batch, celebrating their journey and achievements at the college.',
      },
    ];

    return (
      <div className="min-h-screen bg-[#283452] flex flex-col pb-20"> {/* Dark blue background */}
        {/* Top Bar */}
        <div className="bg-[#202A40] text-white p-4 flex items-center shadow-md">
          <button onClick={onBackToDashboard} className="text-white text-2xl px-2 mr-4">&#8592;</button> {/* Back arrow */}
          <h1 className="text-xl font-semibold">Events</h1>
        </div>

        {/* Event List - Vertically Scrollable */}
        <div className="p-4 flex-grow overflow-y-auto hide-scrollbar">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300"
                onClick={() => onSelectEvent(event)}
              >
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                  onError={(e) => { const target = e.currentTarget as HTMLImageElement;target.onerror = null;target.src = "https://placehold.co/400x200/cccccc/000000?text=Image+Error&font=lora"; }}
                />
                <div className="p-4">
                  <h3 className="text-xl font-bold text-gray-800 text-center">{event.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Navigation Bar (consistent with Dashboard) */}
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

  // --- EventDetailPage Component (New! Internal to App) ---
  interface EventDetailPageProps {
  event: Event;   
  onBackToEvents: () => void;
  onGoToNotifications: () => void;
  onGoToHome: () => void;
  onGoToId: () => void;
  onGoToWallet: () => void;
  onGoToProfile: () => void;
}
  function EventDetailPage({ event, onBackToEvents, onGoToNotifications, onGoToHome, onGoToId, onGoToWallet, onGoToProfile }:EventDetailPageProps) {
    if (!event) {
      return (
        <div className="min-h-screen bg-[#283452] flex flex-col items-center justify-center text-white">
          <p>No event selected.</p>
          <button onClick={onBackToEvents} className="mt-4 bg-blue-700 text-white py-2 px-4 rounded-lg">Back to Events</button>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-[#283452] flex flex-col pb-20"> {/* Dark blue background */}
        {/* Embedded CSS for hiding scrollbar */}
        <style>{`
          /* Hide scrollbar for Chrome, Safari and Opera */
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          /* Hide scrollbar for IE, Edge and Firefox */
          .hide-scrollbar {
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;  /* Firefox */
          }
        `}</style>

        {/* Top Bar */}
        <div className="bg-[#202A40] text-white p-4 flex items-center shadow-md">
          <button onClick={onBackToEvents} className="text-white text-2xl px-2 mr-4">&#8592;</button> {/* Back arrow */}
          <h1 className="text-xl font-semibold">{event.title}</h1>
        </div>

        {/* Event Details Content - Vertically Scrollable */}
        <div className="p-4 flex-grow overflow-y-auto hide-scrollbar">
          <div className="bg-white rounded-xl shadow-lg p-4 mb-4">
            <img
              src={event.detailImageUrl}
              alt={event.title}
              className="w-full h-auto object-cover rounded-lg mb-4"
              onError={(e) => { const target = e.currentTarget as HTMLImageElement;target.onerror = null;target.src = "https://placehold.co/600x400/cccccc/000000?text=Image+Error&font=lora"; }}
            />
            <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">{event.title}</h2>
            <p className="text-gray-700 text-lg leading-relaxed">{event.description}</p>
            {/* Add more event specific details here if needed */}
          </div>
        </div>

        {/* Bottom Navigation Bar (consistent with Dashboard) */}
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

  // --- NotificationsPage Component (New! Internal to App) ---
  interface NotificationsPageProps {
  onBackToDashboard: () => void;
  onSelectNotification: (notification: Notification) => void;
  onGoToNotifications: () => void;
  onGoToHome: () => void;
  onGoToId: () => void;
  onGoToWallet: () => void;
  onGoToProfile: () => void;
}

interface Notification {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  imageUrl?: string;
  isRead: boolean;
}
  function NotificationsPage({ onBackToDashboard, onSelectNotification, onGoToNotifications, onGoToHome, onGoToId, onGoToWallet, onGoToProfile }:NotificationsPageProps) {
    const notifications = [
      {
        id: '1',
        title: 'New Assignment Posted: Mathematics',
        description: 'A new assignment on "Algebraic Equations" has been posted. Due date: 25th May 2025.',
        date: '20 May 2025',
        time: '10:30 AM',
        isRead: false,
        imageUrl: 'https://placehold.co/600x200/A7D9FF/000000?text=Assignment+Notification',
      },
      {
        id: '2',
        title: 'Important: College Closed Tomorrow',
        description: 'Due to unforeseen circumstances, the college will remain closed on 21st May 2025. All classes and activities are cancelled.',
        date: '20 May 2025',
        time: '05:00 PM',
        isRead: false,
        imageUrl: 'https://placehold.co/600x200/FFD700/000000?text=College+Closed',
      },
      {
        id: '3',
        title: 'Reminder: Fee Payment Due',
        description: 'Your outstanding fee payment is due by 31st May 2025. Please make the payment to avoid late fines.',
        date: '18 May 2025',
        time: '09:00 AM',
        isRead: true,
        imageUrl: 'https://placehold.co/600x200/63B3ED/000000?text=Fee+Reminder',
      },
      {
        id: '4',
        title: 'Sports Day Registrations Open',
        description: 'Registrations for the Annual Sports Day are now open! Participate in your favorite sports. Last date for registration: 10th June 2025.',
        date: '15 May 2025',
        time: '02:00 PM',
        isRead: true,
        imageUrl: 'https://placehold.co/600x200/283452/FFFFFF?text=Sports+Day',
      },
    ];

    return (
      <div className="min-h-screen bg-[#283452] flex flex-col pb-20"> {/* Dark blue background */}
        {/* Embedded CSS for hiding scrollbar */}
        <style>{`
          /* Hide scrollbar for Chrome, Safari and Opera */
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          /* Hide scrollbar for IE, Edge and Firefox */
          .hide-scrollbar {
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;  /* Firefox */
          }
        `}</style>

        {/* Top Bar */}
        <div className="bg-[#202A40] text-white p-4 flex items-center shadow-md">
          <button onClick={onBackToDashboard} className="text-white text-2xl px-2 mr-4">&#8592;</button> {/* Back arrow */}
          <h1 className="text-xl font-semibold">Notifications</h1>
        </div>

        {/* Notification List - Vertically Scrollable */}
        <div className="p-4 flex-grow overflow-y-auto hide-scrollbar">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`bg-white rounded-xl shadow-lg p-4 mb-4 cursor-pointer ${notification.isRead ? 'opacity-75' : 'border-l-4 border-blue-500'}`}
                onClick={() => onSelectNotification(notification)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-gray-800">{notification.title}</h3>
                  {!notification.isRead && (
                    <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                  )}
                </div>
                <p className="text-gray-700 text-sm mb-2">{notification.description.substring(0, 100)}...</p>
                <p className="text-gray-600 text-xs flex items-center">
                  <span className="mr-1">&#128337;</span> {/* Clock icon */}
                  {notification.date}, {notification.time}
                </p>
              </div>
            ))
          ) : (
            <p className="text-white text-center text-lg mt-8">No new notifications.</p>
          )}
        </div>

        {/* Bottom Navigation Bar (consistent with Dashboard) */}
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

  // --- NotificationDetailPage Component (New! Internal to App) ---
  interface NotificationDetailPageProps {
  notification: Notification;
  onBackToNotifications: () => void;
  onGoToNotifications: () => void;
  onGoToHome: () => void;
  onGoToId: () => void;
  onGoToWallet: () => void;
  onGoToProfile: () => void;
}
  function NotificationDetailPage({ notification, onBackToNotifications, onGoToNotifications, onGoToHome, onGoToId, onGoToWallet, onGoToProfile }:NotificationDetailPageProps) {
    if (!notification) {
      return (
        <div className="min-h-screen bg-[#283452] flex flex-col items-center justify-center text-white">
          <p>No notification selected.</p>
          <button onClick={onBackToNotifications} className="mt-4 bg-blue-700 text-white py-2 px-4 rounded-lg">Back to Notifications</button>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-[#283452] flex flex-col pb-20"> {/* Dark blue background */}
        {/* Embedded CSS for hiding scrollbar */}
        <style>{`
          /* Hide scrollbar for Chrome, Safari and Opera */
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          /* Hide scrollbar for IE, Edge and Firefox */
          .hide-scrollbar {
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;  /* Firefox */
          }
        `}</style>

        {/* Top Bar */}
        <div className="bg-[#202A40] text-white p-4 flex items-center shadow-md">
          <button onClick={onBackToNotifications} className="text-white text-2xl px-2 mr-4">&#8592;</button> {/* Back arrow */}
          <h1 className="text-xl font-semibold">Details</h1> {/* Title from image */}
        </div>

        {/* Notification Details Content - Vertically Scrollable */}
        <div className="p-4 flex-grow overflow-y-auto hide-scrollbar">
          <div className="bg-white rounded-xl shadow-lg p-4 mb-4">
            {/* Image section (if applicable, based on image 2, it seems to be content above text) */}
            {/* For now, using a placeholder image if notification.imageUrl exists */}
            {notification.imageUrl && (
              <img
                src={notification.imageUrl}
                alt={notification.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
                onError={(e) => { const target = e.currentTarget as HTMLImageElement;target.onerror = null;target.src = "https://placehold.co/600x400/cccccc/000000?text=Image+Error"; }}
              />
            )}

            <p className="text-gray-600 text-sm mb-2 flex items-center">
              <span className="mr-1">&#128337;</span> {/* Clock icon */}
              {notification.date}, {notification.time}
            </p>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{notification.title}</h2>
            <p className="text-gray-700 text-lg leading-relaxed">{notification.description}</p>
          </div>
        </div>

        {/* Bottom Navigation Bar (consistent with Dashboard) */}
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

  // --- TimetablePage Component (Internal to App) ---
  interface TimetablePageProps {
  onBackToDashboard: () => void;
  onGoToNotifications: () => void;
  onGoToHome: () => void;
  onGoToId: () => void;
  onGoToWallet: () => void;
  onGoToProfile: () => void;
}
  function TimetablePage({ onBackToDashboard, onGoToNotifications, onGoToHome, onGoToId, onGoToWallet, onGoToProfile }:TimetablePageProps) {
    const [activeTab, setActiveTab] = useState('class'); // 'class' or 'exam'
    const [activeDay, setActiveDay] = useState('MON'); // For Class Timetable

    // Data for Class Timetable
    const classSchedule = {
      MON: [
        { subject: "Mathematics", time: "9:00 AM - 10:00 AM", teacher: "Dr. Smith", period: "1", isBreak: false },
        { subject: "Break", time: "10:00 AM - 10:15 AM", isBreak: true },
        { subject: "Physics", time: "10:15 AM - 11:15 AM", teacher: "Dr. Johnson", period: "2", isBreak: false },
        { subject: "Break", time: "11:15 AM - 11:30 AM", isBreak: true },
        { subject: "Chemistry", time: "11:30 AM - 12:30 PM", teacher: "Dr. Williams", period: "3", isBreak: false }
      ],
      TUE: [
        { subject: "Biology", time: "9:00 AM - 10:00 AM", teacher: "Dr. Brown", period: "1", isBreak: false },
        { subject: "Break", time: "10:00 AM - 10:15 AM", isBreak: true },
        { subject: "English", time: "10:15 AM - 11:15 AM", teacher: "Dr. Davis", period: "2", isBreak: false },
        { subject: "Break", time: "11:15 AM - 11:30 AM", isBreak: true },
        { subject: "History", time: "11:30 AM - 12:30 PM", teacher: "Dr. Miller", period: "3", isBreak: false }
      ],
      WED: [
        { subject: "Geography", time: "9:00 AM - 10:00 AM", teacher: "Dr. Wilson", period: "1", isBreak: false },
        { subject: "Break", time: "10:00 AM - 10:15 AM", isBreak: true },
        { subject: "Computer Science", time: "10:15 AM - 11:15 AM", teacher: "Dr. Moore", period: "2", isBreak: false },
        { subject: "Break", time: "11:15 AM - 11:30 AM", isBreak: true },
        { subject: "Economics", time: "11:30 AM - 12:30 PM", teacher: "Dr. Taylor", period: "3", isBreak: false }
      ]
    };

    // Data for Exam Timetable
    const examSchedule = [
      { date: '11 JAN', day: 'Monday', subject: 'Science', time: '09:00 AM' },
      { date: '13 JAN', day: 'Wednesday', subject: 'English', time: '09:00 AM' },
      { date: '15 JAN', day: 'Friday', subject: 'Hindi', time: '09:00 AM' },
      { date: '18 JAN', day: 'Monday', subject: 'Math', time: '09:00 AM' },
      { date: '20 JAN', day: 'Wednesday', subject: 'Social Study', time: '09:00 AM' },
      { date: '22 JAN', day: 'Friday', subject: 'Drawing', time: '09:00 AM' },
    ];

    return (
      <div className="min-h-screen bg-[#283452] flex flex-col pb-20"> {/* Dark blue background */}
        {/* Embedded CSS for hiding scrollbar */}
        <style>{`
          /* Hide scrollbar for Chrome, Safari and Opera */
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          /* Hide scrollbar for IE, Edge and Firefox */
          .hide-scrollbar {
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;  /* Firefox */
          }
        `}</style>

        {/* Top Bar */}
        <div className="bg-[#202A40] text-white p-4 flex items-center shadow-md">
          <button onClick={onBackToDashboard} className="text-white text-2xl px-2 mr-4">&#8592;</button> {/* Back arrow */}
          <h1 className="text-xl font-semibold">TIMETABLE</h1>
        </div>

        {/* Toggle Bar for Class/Exam Timetable */}
        <div className="flex bg-[#4A5D8A] rounded-full p-1 mx-4 mt-4 justify-center">
          <button
            onClick={() => setActiveTab('class')}
            className={`flex-1 px-6 py-2 rounded-full font-semibold transition-colors duration-300 ${activeTab === 'class' ? 'bg-blue-600 text-white' : 'text-white bg-transparent'}`}
          >
            CLASS TIMETABLE
          </button>
          <button
            onClick={() => setActiveTab('exam')}
            className={`flex-1 px-6 py-2 rounded-full font-semibold transition-colors duration-300 ${activeTab === 'exam' ? 'bg-blue-600 text-white' : 'text-white bg-transparent'}`}
          >
            EXAM TIMETABLE
          </button>
        </div>

        {/* Content based on activeTab */}
        {activeTab === 'class' && (
          <ClassTimetable classSchedule={classSchedule} activeDay={activeDay} setActiveDay={setActiveDay} />
        )}
        {activeTab === 'exam' && (
          <ExamTimetable examSchedule={examSchedule} />
        )}

        {/* Bottom Navigation Bar (consistent with Dashboard) */}
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

  // --- Main App Render Logic ---
  let content;
  switch (currentPage) {
    case 'landing':
      content = <LandingPage />;
      break;
    case 'login':
      content = <LoginPage
        onLoginSuccess={handleLoginSuccess}
        onGoToForgotPassword={handleGoToForgotPassword}
        onGoToRegister={handleGoToRegister}
      />;
      break;
    case 'forgotPassword':
      content = <ForgotPasswordPage onBackToLogin={handleBackToLogin} showModal={showModal} />;
      break;
    case 'register':
      content = <RegisterPage onBackToLogin={handleBackToLogin} showModal={showModal} />;
      break;
    case 'dashboard':
      content = <DashboardPage
        onGoToAttendance={handleGoToAttendance}
        onLogout={handleLogout}
        onGoToResult={handleGoToResult}
        onGoToTimetable={handleGoToTimetable}
        onGoToCollegeGallery={handleGoToCollegeGallery}
        onGoToAboutCollege={handleGoToAboutCollege}
        onGoToEvent={handleGoToEvent}
        onGoToNotifications={handleGoToNotifications}
        onGoToHome={handleGoToHome}
        onGoToId={handleGoToId}
        onGoToWallet={handleGoToWallet}
        onGoToProfile={handleGoToProfile}
        onGoToLibrary={handleGoToLibrary}
        onGoToFees={handleGoToFees}
        onGoToStudyMaterial={handleGoToStudyMaterial}
      />;
      break;
    case 'attendance':
      content = <AttendancePage
        onBackToDashboard={handleBackToDashboard}
        onGoToNotifications={handleGoToNotifications}
        onGoToHome={handleGoToHome}
        onGoToId={handleGoToId}
        onGoToWallet={handleGoToWallet}
        onGoToProfile={handleGoToProfile}
      />;
      break;
    case 'assignment':
      content = <AssignmentPage
        assignments={assignments}
        onBackToDashboard={handleBackToDashboard}
        onGoToNotifications={handleGoToNotifications}
        onGoToHome={handleGoToHome}
        onGoToId={handleGoToId}
        onGoToWallet={handleGoToWallet}
        onGoToProfile={handleGoToProfile}
      />;
      break;
    case 'profile':
      content = <ProfilePage
        onBackToDashboard={handleBackToDashboard}
        onGoToNotifications={handleGoToNotifications}
        onGoToHome={handleGoToHome}
        onGoToId={handleGoToId}
        onGoToWallet={handleGoToWallet}
        onGoToProfile={handleGoToProfile}
        showModal={showModal}
      />;
      break;
    case 'id':
      content = <IDPage
        onBackToDashboard={handleBackToDashboard}
        onGoToNotifications={handleGoToNotifications}
        onGoToHome={handleGoToHome}
        onGoToId={handleGoToId}
        onGoToWallet={handleGoToWallet}
        onGoToProfile={handleGoToProfile}
      />;
      break;
    case 'result':
      content = <ResultPage
        onBackToDashboard={handleBackToDashboard}
        onGoToNotifications={handleGoToNotifications}
        onGoToHome={handleGoToHome}
        onGoToId={handleGoToId}
        onGoToWallet={handleGoToWallet}
        onGoToProfile={handleGoToProfile}
        showModal={showModal}
      />;
      break;
    case 'timetable':
      content = <TimetablePage
        onBackToDashboard={handleBackToDashboard}
        onGoToNotifications={handleGoToNotifications}
        onGoToHome={handleGoToHome}
        onGoToId={handleGoToId}
        onGoToWallet={handleGoToWallet}
        onGoToProfile={handleGoToProfile}
      />;
      break;
    case 'collegeGallery':
      content = <CollegeGalleryPage
        onBackToDashboard={handleBackToDashboard}
        onGoToNotifications={handleGoToNotifications}
        onGoToHome={handleGoToHome}
        onGoToId={handleGoToId}
        onGoToWallet={handleGoToWallet}
        onGoToProfile={handleGoToProfile}
      />;
      break;
    case 'aboutCollege':
      content = <AboutCollegePage
        onBackToDashboard={handleBackToDashboard}
        onGoToNotifications={handleGoToNotifications}
        onGoToHome={handleGoToHome}
        onGoToId={handleGoToId}
        onGoToWallet={handleGoToWallet}
        onGoToProfile={handleGoToProfile}
      />;
      break;
    case 'event':
      content = <EventPage
        onBackToDashboard={handleBackToDashboard}
        onSelectEvent={handleSelectEvent}
        onGoToNotifications={handleGoToNotifications}
        onGoToHome={handleGoToHome}
        onGoToId={handleGoToId}
        onGoToWallet={handleGoToWallet}
        onGoToProfile={handleGoToProfile}
      />;
      break;
    case 'eventDetail':
      if (!selectedEvent) {
        content = <div className="min-h-screen bg-[#283452] flex items-center justify-center">
          <p className="text-white text-xl">No event selected</p>
        </div>;
      } else {
        content = <EventDetailPage
          event={selectedEvent}
          onBackToEvents={handleBackToEvents}
          onGoToNotifications={handleGoToNotifications}
          onGoToHome={handleGoToHome}
          onGoToId={handleGoToId}
          onGoToWallet={handleGoToWallet}
          onGoToProfile={handleGoToProfile}
        />;
      }
      break;
    case 'notifications':
      content = <NotificationsPage
        onBackToDashboard={handleBackToDashboard}
        onSelectNotification={handleSelectNotification}
        onGoToNotifications={handleGoToNotifications}
        onGoToHome={handleGoToHome}
        onGoToId={handleGoToId}
        onGoToWallet={handleGoToWallet}
        onGoToProfile={handleGoToProfile}
      />;
      break;
    case 'notificationDetail':
      if (!selectedNotification) {
        content = <div>No notification selected</div>;
      } else {
        content = <NotificationDetailPage
          notification={selectedNotification}
          onBackToNotifications={handleBackToNotifications}
          onGoToNotifications={handleGoToNotifications}
          onGoToHome={handleGoToHome}
          onGoToId={handleGoToId}
          onGoToWallet={handleGoToWallet}
          onGoToProfile={handleGoToProfile}
        />;
      }
      break;
    case 'wallet':
      content = <WalletPage
        onBackToDashboard={handleBackToDashboard}
        onGoToNotifications={handleGoToNotifications}
        onGoToHome={handleGoToHome}
        onGoToId={handleGoToId}
        onGoToProfile={handleGoToProfile}
        walletBalance={walletBalance}
        setWalletBalance={setWalletBalance}
        showModal={showModal}
      />;
      break;
    case 'bonafide':
      content = <BonafideCertificatePage
        onBackToDashboard={handleBackToDashboard}
        onGoToNotifications={handleGoToNotifications}
        onGoToHome={handleGoToHome}
        onGoToId={handleGoToId}
        onGoToWallet={handleGoToWallet}
        onGoToProfile={handleGoToProfile}
        showModal={showModal}
      />;
      break;
    case 'library':
      content = <LibraryPage
        onBackToDashboard={handleGoToHome}
        onGoToNotifications={handleGoToNotifications}
        onGoToHome={handleGoToHome}
        onGoToId={handleGoToId}
        onGoToWallet={handleGoToWallet}
        onGoToProfile={handleGoToProfile} showModal={() => { throw new Error('Function not implemented.'); }} />;
      break;
    case 'scholarship':
      content = <ScholarshipPage
        onBackToDashboard={handleBackToDashboard}
        onGoToNotifications={handleGoToNotifications}
        onGoToHome={handleGoToHome}
        onGoToId={handleGoToId}
        onGoToWallet={handleGoToWallet}
        onGoToProfile={handleGoToProfile}
        showModal={showModal}
      />;
      break;
    case 'studyMaterial':
      content = <StudyMaterialPage
        onBackToDashboard={handleBackToDashboard}
        onGoToNotifications={handleGoToNotifications}
        onGoToHome={handleGoToHome}
        onGoToId={handleGoToId}
        onGoToWallet={handleGoToWallet}
        onGoToProfile={handleGoToProfile}
        showModal={showModal}
      />;
      break;
    case 'fees':
      content = <FeesPage
        onBackToDashboard={handleBackToDashboard}
        onGoToNotifications={handleGoToNotifications}
        onGoToHome={handleGoToHome}
        onGoToId={handleGoToId}
        onGoToWallet={handleGoToWallet}
        onGoToProfile={handleGoToProfile}
        showModal={showModal}
      />;
      break;
    default:
      content = (
        <div className="min-h-screen flex flex-col items-center justify-center bg-red-800 text-white">
          <h1 className="text-4xl font-bold mb-4">Error: Page Not Found</h1>
          <p className="text-lg mb-8">The requested page does not exist.</p>
          <button
            onClick={handleGoToHome}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300"
          >
            Go to Dashboard
          </button>
        </div>
      );
  }

  // In App function, add useEffect to auto-redirect from landing to login
  useEffect(() => {
    if (currentPage === 'landing') {
      const timer = setTimeout(() => {
        setCurrentPage('login');
      }, 2500); // 2.5 seconds for slower transition
      return () => clearTimeout(timer);
    }
  }, [currentPage]);

  return (
    <div className="min-h-screen bg-gray-100">
      {content}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          title={modalTitle}
          message={modalMessage}
          onClose={closeModal}
          onConfirm={modalOnConfirm}
        />
      )}
    </div>
  );
}

export default App;

// NavItem Component for the bottom navigation bar
interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  action: () => void;
}
function NavItem({ icon, label, action }:NavItemProps) {
  return (
    <button
      className="flex flex-col items-center text-gray-700 hover:text-blue-600 focus:outline-none text-xs"
      onClick={action}
    >
      <span className="text-2xl mb-1">{icon}</span>
      <span>{label}</span>
    </button>
  );
}

// --- AssignmentPage Component (Internal to App) ---
interface AssignmentPageProps {
  assignments: Assignment[];
  onBackToDashboard: () => void;
  onGoToNotifications: () => void;
  onGoToHome: () => void;
  onGoToId: () => void;
  onGoToWallet: () => void;
  onGoToProfile: () => void;
}

function AssignmentPage({
  assignments,
  onBackToDashboard,
  onGoToNotifications,
  onGoToHome,
  onGoToId,
  onGoToWallet,
  onGoToProfile
}: AssignmentPageProps) {
  // Filter assignments to be done
  const assignmentsToBeDone = assignments.filter(a => !a.submitted);

  return (
    <div className="min-h-screen bg-[#283452] flex flex-col pb-20">
      {/* Top Bar */}
      <div className="bg-[#202A40] text-white p-4 flex items-center shadow-md">
        <button
          onClick={onBackToDashboard}
          className="text-white text-2xl px-2 mr-4"
        >
          &#8592;
        </button>
        <h1 className="text-xl font-semibold">Assignment</h1>
      </div>

      {/* Assignments To Be Done Section */}
      {assignmentsToBeDone.length > 0 && (
        <div className="p-4">
          <h2 className="text-lg font-bold text-yellow-400 mb-2">Assignments To Be Done</h2>
          {assignmentsToBeDone.map((assignment, idx) => (
            <div key={idx} className="bg-red-100 border-l-4 border-red-500 rounded-xl shadow p-4 mb-3">
              <h3 className="text-md font-bold text-red-800 mb-1">{assignment.subject}</h3>
              <p className="text-gray-700 mb-1">{assignment.title}</p>
              <span className="text-xs text-gray-600">Due: {assignment.submissionDate}</span>
            </div>
          ))}
        </div>
      )}

      {/* Assignment List */}
      <div className="p-4 flex-grow">
        {assignments.map((assignment, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg p-4 mb-4"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-800 mb-1">{assignment.subject}</h3>
              <span className="text-xs text-gray-500">
                Last Submission Date: {assignment.submissionDate}
              </span>
            </div>
            <p className="text-gray-700 mb-2">{assignment.title}</p>
            <div className="text-sm text-gray-600 mb-3">
              Assign Date: {assignment.assignDate}
            </div>
            {!assignment.submitted && (
              <button className="w-full bg-blue-700 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200">
                TO BE SUBMITTED
              </button>
            )}
            {assignment.submitted && (
              <button className="w-full bg-green-700 text-white font-bold py-2 px-4 rounded-lg" disabled>
                SUBMITTED
              </button>
            )}
          </div>
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
