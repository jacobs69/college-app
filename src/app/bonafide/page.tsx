import { NavItem } from '../../components/NavItem';
import { useState } from 'react';

interface BonafideCertificatePageProps {
  onBackToDashboard: () => void;
  onGoToNotifications: () => void;
  onGoToHome: () => void;
  onGoToId: () => void;
  onGoToWallet: () => void;
  onGoToProfile: () => void;
  showModal: (title: string, message: string, onConfirm?: (() => void) | null) => void;
}

const BonafideCertificatePage: React.FC<BonafideCertificatePageProps> = ({ 
  onBackToDashboard, 
  onGoToNotifications, 
  onGoToHome, 
  onGoToId, 
  onGoToWallet, 
  onGoToProfile,
  showModal 
}) => {
    const [showCertificate, setShowCertificate] = useState(false);

    // Dummy student data
    const student = {
      name: "JAI ARUN KANTHARIA",
      parentName: "ARUN KANTHARIA",
      rollNumber: "B20232637",
      year: "TY",
      courseName: "BSCIT",
      academicYear: "2023-2024",
      collegeName: "University/College/School Name Here",
      collegeAddress: "123 College Road, City, State, ZIP",
      registrarSignature: "A. Registrar", // Placeholder
      date: "13th June 2025"
    };

    return (
      <div className="min-h-screen bg-[#283452] flex flex-col">
        {/* Header */}
        <div className="bg-[#202A40] text-white p-4 flex items-center justify-between rounded-b-xl shadow-lg">
          <button onClick={onBackToDashboard} className="text-white text-2xl">
            &#8592; {/* Left arrow */}
          </button>
          <h2 className="text-xl font-bold">Bonafide Certificate</h2>
          <div className="w-8"></div> {/* Placeholder for alignment */}
        </div>

        {/* Certificate Content */}
        <div className="flex-1 p-4 flex items-center justify-center">
          {!showCertificate ? (
            <button 
              onClick={() => setShowCertificate(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              View Certificate
            </button>
          ) : (
            <div className="bg-white text-gray-800 p-8 md:p-12 rounded-lg shadow-xl max-w-2xl w-full border-4 border-gray-300 relative overflow-hidden">
              {/* Decorative border */}
              <div className="absolute inset-4 border-2 border-gray-200 rounded-lg"></div>

              <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-blue-900">BONAFIDE CERTIFICATE</h1>

              <p className="mb-4 text-lg">
                This is to certify that Mr./Ms. <span className="font-semibold underline">{student.name}</span>,
                S/O or D/O of Mr./Ms. <span className="font-semibold underline">{student.parentName}</span>,
                bearing roll number <span className="font-semibold underline">{student.rollNumber}</span> is a
                student of <span className="font-semibold underline">{student.year}</span>{' '}
                <span className="font-semibold underline">{student.courseName}</span> for the
                academic year <span className="font-semibold underline">{student.academicYear}</span>.
                He/She is a bonafide student of <span className="font-semibold underline">{student.collegeName}</span>.
              </p>

              {/* Placeholder for official seal / emblem */}
              <div className="flex justify-center my-8">
                <svg className="w-24 h-24 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                </svg>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-4 mt-8 text-sm">
                <div>
                  <p className="font-bold border-b border-gray-400 pb-1 inline-block">{student.registrarSignature}</p>
                  <p className="text-xs mt-1">SIGNATURE REGISTRAR / PRINCIPAL / DEAN</p>
                </div>
                <div className="text-right">
                  <p className="font-bold border-b border-gray-400 pb-1 inline-block">{student.date}</p>
                  <p className="text-xs mt-1">DATE</p>
                </div>
              </div>
              <div className="text-center mt-4 text-xs">
                <p className="font-bold">{student.collegeName.toUpperCase()}</p>
                <p>{student.collegeAddress}</p>
                <p>(OFFICIAL SEAL)</p>
              </div>
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

export default BonafideCertificatePage;