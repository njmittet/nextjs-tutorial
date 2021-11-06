// This App component is a top-level component which will be common across all the different pages.
// Among other things, it can be used to to keep state when navigating between pages.

// Global CSS can only be imported from this file since the global CSS affects all elements on the page.
import '../styles/global.css';

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
