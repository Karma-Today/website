/* eslint-disable react/prop-types */
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, image, url, type }) => {
  return (
    <Helmet>
      {/* Standard Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />
      <meta charset="utf-8" />
      {/* Canonical Link */}
      <link rel="canonical" href={url} />
      {/* Favicon */}
      <link rel="icon" type="image/png" href="/assets/favicon.png" />
      {/* Open Graph Tags (Facebook, LinkedIn, etc.) */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type || 'website'} />
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      {/* Additional Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Helmet>
  );
};

export default SEO