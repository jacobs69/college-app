interface Window {
    html2canvas: unknown;
    jspdf: {
        jsPDF: new (orientation?: string, unit?: string, format?: string) => {
            addImage: (imageData: string, format: string, x: number, y: number, width: number, height: number) => void;
            addPage: () => void;
            save: (filename: string) => void;
        };
    };
}

// Add module declarations for study and scholar pages
declare module '@/app/study/page' {
    import { FC } from 'react';
    
    interface StudyMaterialPageProps {
        onBackToDashboard: () => void;
        onGoToNotifications: () => void;
        onGoToHome: () => void;
        onGoToId: () => void;
        onGoToWallet: () => void;
        onGoToProfile: () => void;
        showModal: (title: string, message: string, onConfirm?: (() => void) | null) => void;
    }
    
    const StudyMaterialPage: FC<StudyMaterialPageProps>;
    export default StudyMaterialPage;
}

declare module '@/app/scholar/page' {
    import { FC } from 'react';
    
    interface ScholarshipPageProps {
        onBackToDashboard: () => void;
        onGoToNotifications: () => void;
        onGoToHome: () => void;
        onGoToId: () => void;
        onGoToWallet: () => void;
        onGoToProfile: () => void;
        showModal: (title: string, message: string, onConfirm?: (() => void) | null) => void;
    }
    
    const ScholarshipPage: FC<ScholarshipPageProps>;
    export default ScholarshipPage;
} 