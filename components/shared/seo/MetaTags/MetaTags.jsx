import Head from 'next/head';

const MetaTags = ({ 
  title = 'My Dev Platform',
  description = 'This is a clone of the Dev blog platform built for a school project',
  image = 'https://d2fltix0v2e0sb.cloudfront.net/dev-ecosystem.svg',
}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@ThePracticalDev" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
    </Head>
  );
}
 
export default MetaTags;