import React, { useState, useEffect } from 'react';
import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';

import '@react-pdf-viewer/core/lib/styles/index.css';

const UploadDocs = ({ uploadInputId, boxWidth, labelWeb, labelMob, checkUploadedFile }) => {
   const [url, setUrl] = useState('');
   const [errUpload, setErrUpload] = useState('');
   const [fileType, setFileType] = useState({ image: false, doc: false, pdf: false });
   const [data, setData] = useState(false);

   // useEffect(() => {
   //    if (clearDocs) {
   //       console.log('clear doc', clearDocs, url);
   //       setUrl('');
   //       changeDocStatus(false);
   //    }
   // }, [clearDocs, url, changeDocStatus]);

   const UpdateFileType = e => {
      let url = '';
      //  clear errorlog on change itself
      setErrUpload('');
      const files = e.target.files;
      if (files[0].type.match('image/*')) {
         setFileType({ image: true, doc: false, pdf: false });
      } else if (files[0].type.match('.pdf')) {
         setFileType({ image: false, doc: false, pdf: true });
      } else if (files[0].type.match('.PDF')) {
         setFileType({ image: false, doc: false, pdf: true });
      } else {
         setErrUpload('Upload only image or pdf');
      }

      if (files.length > 0) {
         url = URL.createObjectURL(files[0]);
         // url = e.target.files[0];
         setUrl(url);
         return url;
      }

      return false;
   };

   // for drag and drop functions begins here
   const onDrop = e => {
      setUrl('');
      setErrUpload('');
      e.preventDefault();
      const {
         dataTransfer: { files },
      } = e;
      // console.log("Files: ", files);
      const { length } = files;
      const reader = new FileReader();
      if (length > 1) {
         setErrUpload('Please upload only one image'); //should drag only 1 file
         return false;
      }

      let fileDropStatus = validateFile(files[0]); //validate image file on drop
      if (!fileDropStatus) {
         return false;
      }

      const fileTypes = [
         'image/jpeg',
         'image/jpg',
         'image/png',
         'image/JPEG',
         'image/JPG',
         'image/PNG',
         'application/pdf',
      ];
      const { size, type } = files[0];
      if (type === 'application/pdf') {
         setFileType({ image: false, doc: false, pdf: true });
      } else if (type === 'image/jpeg' || 'image/jpg' || 'image/png' || 'image/JPEG' || 'image/JPG' || 'image/PNG') {
         setFileType({ image: true, doc: false, pdf: false });
      }
      setData(false);

      setErrUpload(false);

      reader.readAsDataURL(files[0]);
      reader.onload = loadEvt => {
         setData(loadEvt.target.result);
         setUrl(loadEvt.target.result);

         // for opening the modal after 2 docs are uploaded begins here
         const getURL = files[0];
         if (getURL) {
            checkUploadedFile(getURL);
         }
         //for opening the modal after 2 docs are uploaded ends here
      };
   };
   const onDragStart = e => {
      e.preventDefault();
   };
   const onDragOver = e => {
      e.preventDefault();
   };
   // for drag and drop functions ends here
   const validateFile = imageOrPdf => {
      if (!imageOrPdf) {
         setErrUpload("Couldn't find image file to proceed");
         return false;
      }
      if (!imageOrPdf.name.match(/\.(jpg|jpeg|png|pdf|JPG|JPEG|PNG|PDF)$/)) {
         setErrUpload('File type not supported. Please select png/jpeg/jpg/pdf files');
         return false;
      }
      const fileSize = imageOrPdf.size / 10240 / 10240; // in MB
      if (fileSize > 1) {
         setErrUpload('File size is too large to proceed. Please select an image less than 10 MB');
         return false;
      }

      return true;
   };

   const onChange = e => {
      setUrl('');
      setErrUpload('');
      const imageOrPdf = e.target.files[0];
      let hasfile = validateFile(imageOrPdf); //validate image file
      if (!hasfile) {
         return false;
         // checkUploadedFile(e.target.files[0]);
      }
      const hasURL = UpdateFileType(e);
      if (hasURL) {
         checkUploadedFile(e.target.files[0]);
      }
   };

   return (
      <>
         <div
            className="uploadImg-Wrap"
            style={{ height: `${boxWidth}` }}
            onDrop={e => onDrop(e)}
            onDragOver={e => onDragOver(e)}
         >
            <label htmlFor={uploadInputId} onClick={() => setUrl('')}>
               {url && fileType.image ? (
                  <>
                     <img className="uploadedFile" src={url} alt="" />
                     <div className="reUploadScreen">
                        <p> Click to Re-Upload</p>
                     </div>
                  </>
               ) : url && fileType.pdf ? (
                  <div
                     style={{
                        height: '100%',
                        width: '100%',
                     }}
                  >
                     <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
                        <Viewer fileUrl={url} />
                     </Worker>
                  </div>
               ) : (
                  <>
                     <img src="./images/version2/uploadDocsIcon.svg" alt="" />
                     <p className="text-center uploadDocPara d-none d-md-block">{labelWeb}</p>
                     <p className="text-center d-md-none">{labelMob ? labelMob : labelWeb}</p>
                  </>
               )}
            </label>
            <input
               type="file"
               id={uploadInputId}
               style={{ display: 'none' }}
               accept="image/*,.pdf"
               onChange={onChange}
            />
         </div>

         {errUpload && (
            <div className="errorPanel">
               <p className="errorMessage">{errUpload}</p>
            </div>
         )}
      </>
   );
};

export default UploadDocs;
