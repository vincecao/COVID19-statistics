import 'bulma/css/bulma.css';
import { HtmlHeader } from '../components/basic/htmlHeader';
import { MyFooter } from '../components/footer/myFooter';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <HtmlHeader />
      <Component {...pageProps} />
      <MyFooter />
    </>
  );
}
