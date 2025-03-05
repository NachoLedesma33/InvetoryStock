import PropTypes from 'prop-types';
import { LayoutPropTypes } from '../../props/layoutProps';
import Header from './Header';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 ">
      <Header />
      <main className="container flex-grow px-4 py-8 mx-auto">
        {children}
      </main>
      <Footer />
    </div>
  );
}

Layout.propTypes = LayoutPropTypes;
