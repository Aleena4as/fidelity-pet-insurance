import React, { useState } from 'react';
const UploadImage = ({ petDetectionStatus }) => {
   const [uploadImg, setUploadImg] = useState({ preview: '', raw: '' });

   // for drag and drop functions begins here
   const [data, setData] = useState(false);
   const [err, setErr] = useState(false);

   const validateImgfile = image => {
      if (!image) {
         setErr("Couldn't find image file to proceed");
         return false;
      }
      if (!image.name.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
         setErr('File type not supported. Please select png/jpeg/jpg files');
         return false;
      }
      const fileSize = image.size / 10240 / 10240; // in MB
      if (fileSize > 1) {
         setErr('File size is too large to proceed. Please select an image less than 10 MB');
         return false;
      }

      return true;
   };

   const onDrop = e => {
      e.preventDefault();
      const {
         dataTransfer: { files },
      } = e;
      // console.log('Files droppppppppppppped: ', files);
      const { length } = files;
      const reader = new FileReader();
      if (length > 1) {
         setErr('Please upload only one image'); //should drag only 1 file
         return false;
      }

      setErr('');
      let fileDropStatus = validateImgfile(files[0]); //validate image file on drop
      if (!fileDropStatus) {
         return false;
      }

      reader.readAsDataURL(files[0]);
      reader.onload = loadEvt => {
         setData(loadEvt.target.result);
         setUploadImg({
            preview: loadEvt.target.result,
            raw: loadEvt.target.result,
         });

         // for catching the image url and sending back to parent begins here
         const getURL = files[0];
         if (getURL) {
            petDetectionStatus(getURL);
         }
         // for catching the image url and sending back to parent ends here
      };
   };
   const onDragStart = e => {
      e.preventDefault();
   };
   const onDragOver = e => {
      e.preventDefault();
   };
   // for drag and drop functions ends here

   const HandleImage = e => {
      setErr('');
      const image = e.target.files[0];
      let fileStatus = validateImgfile(image); //validate image file
      if (fileStatus) {
         if (e.target.files.length) {
            setUploadImg({
               preview: URL.createObjectURL(e.target.files[0]),
               raw: e.target.files[0],
            });
            // for catching the image url and sending back to parent begins here

            const passURL = e.target.files[0];
            if (passURL) {
               petDetectionStatus(passURL);
            }
            // for catching the image url and sending back to parent ends here
         }
      }
   };

   // const handleUploadImage = async e => {
   //    e.preventDefault();
   //    const formData = new FormData();
   //    formData.append('uploadImg', uploadImg.raw);

   //    await fetch('YOUR_URL', {
   //       method: 'POST',
   //       headers: {
   //          'Content-Type': 'multipart/form-data',
   //       },
   //       body: formData,
   //    });
   // };

   return (
      <>
         <div className="uploadImg-Wrap" onDrop={e => onDrop(e)} onDragOver={e => onDragOver(e)}>
            <label htmlFor="uploadImg-upload-button">
               {uploadImg.preview ? (
                  <img className="uploadedFile" src={uploadImg.preview} alt="" />
               ) : (
                  <>
                     <img src="./images/version2/uploadImgIcon.svg" alt="" />
                     <p className="text-center">
                        Upload an image <br />
                        <span> or </span>
                        <br />
                     </p>
                     <p className="text-center d-none d-md-block" style={{ marginTop: '0' }}>
                        Drag & Drop
                     </p>
                     <p className="text-center d-md-none" style={{ marginTop: '0' }}>
                        Take a picture
                     </p>
                  </>
               )}
            </label>
            <input
               type="file"
               id="uploadImg-upload-button"
               accept="image/png, image/PNG, image/jpg, image/JPG, image/jpeg, image/JPEG"
               style={{ display: 'none' }}
               onChange={HandleImage}
            />
            <br />

            {/* <button onClick={handleUploadImage}>Upload</button> */}
         </div>
         {err && (
            <p className="errorMessage" style={{ marginTop: '-15px' }}>
               {err}
            </p>
         )}
      </>
   );
};
export default UploadImage;
