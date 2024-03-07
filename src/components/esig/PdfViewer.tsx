import { useEffect, useState } from 'react';
import pdfjs from 'pdfjs-dist';

const PdfViewer = ({ url }) => {
    console.log(pdfjs)

  const [pdfDoc, setPdfDoc] = useState(null);

  useEffect(() => {
    const loadingTask = pdfjs.getDocument(url);
    loadingTask.promise.then(
      (pdf) => {
        setPdfDoc(pdf);
      },
      (reason) => {
        console.error(`Error during PDF loading: ${reason}`);
      }
    );
  }, [url]);
console.log(pdfDoc)
  return (
    <div>
      {pdfDoc ? (
        <p>PDF Loaded: {pdfDoc.numPages} pages</p>
      ) : (
        <p>Loading PDF...</p>
      )}
    </div>
  );
};

export default PdfViewer;