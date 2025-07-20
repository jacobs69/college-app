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

 