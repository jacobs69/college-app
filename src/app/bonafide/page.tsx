"use client";
import { useRef } from 'react';

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

export default function BonafideCertificatePage() {
    const certificateRef = useRef<HTMLDivElement>(null); // Create a ref for the certificate content

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

    // Function to handle certificate download
    const handleDownloadCertificate = async () => {
        if (!certificateRef.current) {
            showModal('Download Error', 'Certificate content not found.');
            return;
        }

        // Add a null check before using certificateRef.current
        const certDiv = certificateRef.current;
        if (!certDiv) {
            showModal('Download Error', 'Certificate content not found.');
            return;
        }

        // Check if html2canvas and jsPDF are loaded
        if (typeof window.html2canvas !== 'function' || typeof window.jspdf === 'undefined') {
            showModal('Error', 'Required libraries (html2canvas, jspdf) are not loaded. Please ensure script tags are included in your HTML.');
            return;
        }

        showModal('Generating PDF', 'Please wait while your certificate is being generated...');

        try {
            const canvas = await (window.html2canvas as (element: HTMLElement, options?: Record<string, unknown>) => Promise<HTMLCanvasElement>)(certDiv, { scale: 2 }); // Increase scale for better resolution
            const imgData = canvas.toDataURL('image/png');
            const pdf = new window.jspdf.jsPDF('p', 'mm', 'a4'); // 'p' for portrait, 'mm' for millimeters, 'a4' for A4 size

            const imgWidth = 210; // A4 width in mm
            const pageHeight = 297; // A4 height in mm
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;
            let position = 0;

            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            pdf.save(`Bonafide_Certificate_${student.name.replace(/\s+/g, '_')}.pdf`);
            showModal('Success', 'Certificate downloaded successfully!', () => {});
        } catch (error) {
            console.error("Error generating PDF:", error);
            showModal('Download Error', 'Failed to generate PDF. Please try again.');
        }
    };

    // Define local functions for navigation and modal actions
    function onBackToDashboard() { /* implement navigation or leave as placeholder */ }
    function onGoToHome() {
        throw new Error('Function not implemented.');
    }

    function onGoToId() {
        throw new Error('Function not implemented.');
    }

    function onGoToNotifications() { /* implement navigation or leave as placeholder */ }
    function onGoToWallet() { /* implement navigation or leave as placeholder */ }
    function onGoToProfile() { /* implement navigation or leave as placeholder */ }

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

            {/* Certificate Content and Download Button */}
            <div className="flex-1 p-4 flex flex-col items-center justify-center">
                <button
                    className="mb-4 px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
                    onClick={() => showModal('Bonafide Info', 'This is a demo modal for bonafide certificate!')}
                >
                    Show Bonafide Modal
                </button>
                <div
                    ref={certificateRef} // Attach ref to the div you want to capture
                    className="bg-white text-gray-800 p-8 md:p-12 rounded-lg shadow-xl max-w-2xl w-full border-4 border-gray-300 relative overflow-hidden"
                >
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

                {/* Download Button */}
                <button
                    onClick={handleDownloadCertificate}
                    className="mt-6 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-lg hover:bg-green-700 transition-colors duration-300 flex items-center"
                >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 8.414V13a1 1 0 11-2 0V8.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                    </svg>
                    Download Certificate
                </button>
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
};

function showModal(_p0: string, p1: string, p0?: () => void) {
    throw new Error('Function not implemented.');
}
