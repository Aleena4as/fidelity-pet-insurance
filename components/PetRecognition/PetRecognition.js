import React from 'react';
import PetDetectionForm from '@/components/PetDetectionForm/PetDetectionForm';
const PetRecognition = ({
   displayImageSrc,
   getRecognitionInput,
   getUserUpdatedBreed,
   getUserUpdatedType,
   option,
   localFileUpload
}) => {
   return (
      <div>
         <PetDetectionForm
            displayImageSrc={displayImageSrc}
            getRecognitionInput={getRecognitionInput}
            getUserUpdatedBreed={getUserUpdatedBreed}
            getUserUpdatedType={getUserUpdatedType}
            option={option}
            localFileUpload={localFileUpload}
         />
      </div>
   );
};

export default PetRecognition;
