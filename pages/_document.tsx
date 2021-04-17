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
              (function () {
                var currentTheme;
              
                function changeTheme(inputTheme) {
                  document.body.dataset.theme = inputTheme;
                  if (inputTheme === '"dark"') {
                    const theme = themeConfig.dark;
                    for (let key in theme) {
                      setCSSVar(key, theme[key]);
                    }
                    localStorage.setItem("theme", inputTheme);
                  } else {
                    const theme = themeConfig.light;
                    for (let key in theme) {
                      setCSSVar(key, theme[key]);
                    }
                    localStorage.setItem("theme", inputTheme);
                  }
                }
              
                function setCSSVar(property, color) {
                  document.documentElement.style.setProperty(property, color);
                }
                try {
                  currentTheme = localStorage.getItem("theme") || "light";
                  var themeConfig = {
                    light: {
                      "--bg-color": "#fff",
                    },
                    dark: {
                      "--bg-color": "#161625",
                    },
                  };
            
                  changeTheme(currentTheme);
                } catch (err) {
                  console.log(new Error("accessing theme has been denied"));
                }
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