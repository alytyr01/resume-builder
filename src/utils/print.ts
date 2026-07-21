import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export async function printResume() {
  const element = document.getElementById('resume-preview-print');
  if (!element) {
    window.print();
    return;
  }

  try {
    // Clone the resume element and remove any scaling transforms
    const clone = element.cloneNode(true) as HTMLElement;
    clone.style.transform = 'none';
    clone.style.transformOrigin = 'unset';
    clone.style.width = '210mm';
    clone.style.position = 'static';
    clone.style.left = 'auto';
    clone.style.top = 'auto';
    clone.style.padding = '0';
    clone.style.margin = '0 auto';
    clone.style.display = 'block';
    clone.style.visibility = 'visible';
    clone.style.minHeight = '297mm';

    // Append clone to body temporarily
    document.body.appendChild(clone);

    const canvas = await html2canvas(clone, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
      width: 210 * 3.78, // 210mm in pixels
      windowWidth: 210 * 3.78,
    });

    // Remove clone
    document.body.removeChild(clone);

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = 210;
    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    pdf.save('resume.pdf');
  } catch (error) {
    console.error('Failed to generate PDF:', error);
    window.print();
  }
}