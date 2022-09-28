import Document, { Html, Head, Main, NextScript } from 'next/document';

class DefaultDocument extends Document {
   render() {
      return (
         <Html lang="en">
            <Head>
               <link rel="stylesheet" href="fonts/Gloria_Hallelujah/stylesheet.css" />
               <link rel="stylesheet" href="fonts/Glory-Fonts/stylesheet.css" />
               <link rel="stylesheet" type="text/css" charset="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
               <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
            </Head>
            <body>
               <Main />
               <NextScript />
            </body>
         </Html>
      );
   }
}

export default DefaultDocument;
