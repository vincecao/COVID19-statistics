import Head from 'next/head';

interface HtmlHeaderProps {}

export const HtmlHeader: React.FC<HtmlHeaderProps> = ({}) => {
  return (
    <Head>
      <title>COVID19 | Statistics</title>
      {/* <link rel="icon" href="/favicon.ico" /> */}
      <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
      <script defer src="https://use.fontawesome.com/releases/v5.3.1/js/all.js"></script>
    </Head>
  );
};
