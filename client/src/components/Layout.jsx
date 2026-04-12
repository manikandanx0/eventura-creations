import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MainNav from './MainNav.jsx';
import Footer from './Footer.jsx';

export default function Layout({ children }) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
  }, [pathname]);

  useEffect(() => {
    const nav = document.querySelector('.main-nav');
    if (!nav) return undefined;

    const threshold = 40;
    const onScroll = () => {
      if (window.scrollY > threshold) nav.classList.add('is-scrolled');
      else nav.classList.remove('is-scrolled');
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  return (
    <>
      <MainNav />
      <main>{children}</main>
      <Footer />
    </>
  );
}
