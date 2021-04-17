import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                  </Head>
            <body>
            <script dangerouslySetInnerHTML={{
              __html: `
              (function() {
                try {
                  document.body.dataset.theme = localStorage.getItem('theme');
                }catch(err) {}
              })();
            `,
            }}></script>
                
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;