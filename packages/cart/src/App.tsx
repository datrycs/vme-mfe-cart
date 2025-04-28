import { Helmet, HelmetProvider } from "react-helmet-async"
import { Router, Route, Switch } from "wouter"

import CartPage from "./pages/CartPage"
import ErrorPage from "./pages/ErrorPage"

import { EmbeddedCapabilities } from "#components/EmbeddedCapabilities"

function App(): JSX.Element {
  const basePath =
    import.meta.env.PUBLIC_PROJECT_PATH != null
      ? `/${import.meta.env.PUBLIC_PROJECT_PATH}`
      : undefined

  return (
    <HelmetProvider>
      <Helmet>
        {/* GTM Head script */}
        <script>
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${process.env.PUBLIC_GTM_ID}');
          `}
        </script>
      </Helmet>

      {/* GTM noscript fallback */}
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${process.env.PUBLIC_GTM_ID}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        ></iframe>
      </noscript>

      <EmbeddedCapabilities.IframeResizerInit />
      <Router base={basePath}>
        <Switch>
          <Route path={"/404"}>
            <ErrorPage />
          </Route>
          <Route path={"/:orderId"}>
            <CartPage />
          </Route>
          <Route>
            <ErrorPage />
          </Route>
        </Switch>
      </Router>
    </HelmetProvider>
  )
}

export default App
