import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Eventura Creations. All rights reserved.</p>
        <nav className="footer-nav" aria-label="Footer navigation">
          <Link to="/services">Services</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/contact">Contact</Link>
        </nav>
      </div>
    </footer>
  );
}
