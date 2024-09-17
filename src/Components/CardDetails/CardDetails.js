import React from 'react';
import { Helmet } from 'react-helmet';

const CardDetails = ({ propertyDetails }) => {
  const imageUrl = propertyDetails.property.images?.length > 0 
    ? propertyDetails.property.images[0].image 
    : propertyDetails.property.primary_picture;

  return (
    <>
      <Helmet>
        <meta property="og:image" content={imageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </Helmet>
      {/* باقي محتوى الصفحة */}
    </>
  );
};

export default CardDetails;
