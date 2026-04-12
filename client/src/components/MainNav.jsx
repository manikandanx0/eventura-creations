import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const primaryLinks = [
  { to: '/', label: 'Home', end: true },
  { to: '/services', label: 'Services' },
  { to: '/projects', label: 'Projects' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

function linkClass({ isActive }) {
  return `nav-link${isActive ? ' active' : ''}`;
}

export default function MainNav() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef(null);

  useEffect(() => {
    setOpen(false);
    const navLinks = document.getElementById('nav-links');
    navLinks?.classList.remove('active');
    toggleRef.current?.setAttribute('aria-expanded', 'false');
  }, [pathname]);

  useEffect(() => {
    const onDocClick = (e) => {
      if (!toggleRef.current) return;
      const navLinks = document.getElementById('nav-links');
      if (
        navLinks?.classList.contains('active') &&
        !toggleRef.current.contains(e.target) &&
        !navLinks.contains(e.target)
      ) {
        navLinks.classList.remove('active');
        toggleRef.current.setAttribute('aria-expanded', 'false');
        setOpen(false);
      }
    };
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      const navLinks = document.getElementById('nav-links');
      if (navLinks?.classList.contains('active')) {
        navLinks.classList.remove('active');
        toggleRef.current?.setAttribute('aria-expanded', 'false');
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('click', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('click', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  const onToggle = () => {
    const navLinks = document.getElementById('nav-links');
    if (!navLinks || !toggleRef.current) return;
    const next = navLinks.classList.toggle('active');
    toggleRef.current.setAttribute('aria-expanded', String(next));
    setOpen(next);
    if (next) {
      const first = navLinks.querySelector('.nav-link');
      first?.focus();
    }
  };

  const onLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header>
      <nav className="main-nav" aria-label="Main navigation">
        <div className="nav-container">
          <NavLink to="/" className="logo" aria-label="Eventura Creations home">
            <img
              src="/assets/logo/svg/logo-ghostwhite.svg"
              alt="Eventura Creations"
              className="logo-img"
            />
          </NavLink>
          <button
            ref={toggleRef}
            type="button"
            className="nav-toggle"
            aria-expanded={open}
            aria-controls="nav-links"
            aria-label="Toggle navigation"
            onClick={onToggle}
          >
            ☰
          </button>
          <ul className="nav-links" id="nav-links">
            {primaryLinks.map(({ to, label, end }) => (
              <li key={to + label}>
                <NavLink to={to} end={end} className={linkClass}>
                  {label}
                </NavLink>
              </li>
            ))}
            <li>
              <Link className="nav-link" to={{ pathname: '/', hash: 'events' }}>
                Events
              </Link>
            </li>
            {isAuthenticated ? (
              <>
                <li>
                  <NavLink to="/dashboard" className={linkClass}>
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <button type="button" className="nav-link" onClick={onLogout}>
                    Log out
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/login" className={linkClass}>
                    Sign in
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/register" className={linkClass}>
                    Register
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
}
