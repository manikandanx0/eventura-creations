import { Link } from 'react-router-dom';
import HomeEventsSection from '../components/HomeEventsSection.jsx';

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Eventura Creations</h1>
          <p className="hero-tagline">Events built on clarity, coordination, and intent</p>
          <p className="intro-text">
            Eventura Creations is a full-service event management agency built on structured planning and flawless
            execution. From private celebrations to large-scale corporate events, we focus on delivering experiences that
            run seamlessly and leave a lasting impression.
          </p>
          <div className="hero-cta">
            <Link to={{ pathname: '/', hash: 'events' }} className="btn btn-primary">
              Browse events
            </Link>
            <Link to="/projects" className="btn btn-secondary">
              View Our Work
            </Link>
            <Link to="/services" className="btn btn-secondary">
              Explore Services
            </Link>
          </div>
        </div>
      </section>

      <HomeEventsSection />

      <section className="services-section">
        <div className="container">
          <h2>Our Services</h2>
          <div className="services-grid">
            <article className="service-card">
              <img
                src="/assets/images/corporate.jpg"
                alt="Corporate Events & Offsites"
                style={{ width: '100%', marginBottom: 'var(--space-md)', borderRadius: 4 }}
              />
              <h3 className="service-title">Corporate Events & Offsites</h3>
              <p className="service-description">
                End-to-end planning and execution of corporate events that balance brand presence, logistics, and
                attendee experience.
              </p>
              <p className="service-ideal">
                <strong>Ideal For:</strong> Annual meets, leadership offsites, internal conferences, and corporate
                celebrations.
              </p>
            </article>

            <article className="service-card">
              <img
                src="/assets/images/product.jpg"
                alt="Product Launches"
                style={{ width: '100%', marginBottom: 'var(--space-md)', borderRadius: 4 }}
              />
              <h3 className="service-title">Product Launches</h3>
              <p className="service-description">
                High-impact product launch events designed to generate buzz, media attention, and audience engagement.
              </p>
              <p className="service-ideal">
                <strong>Ideal For:</strong> Startups, tech brands, and consumer product companies.
              </p>
            </article>

            <article className="service-card">
              <img
                src="/assets/images/wedding.jpg"
                alt="Weddings & Private Celebrations"
                style={{ width: '100%', marginBottom: 'var(--space-md)', borderRadius: 4 }}
              />
              <h3 className="service-title">Weddings & Private Celebrations</h3>
              <p className="service-description">
                Personalized wedding and private event experiences with a strong focus on detail, aesthetics, and
                seamless execution.
              </p>
              <p className="service-ideal">
                <strong>Ideal For:</strong> Weddings, receptions, anniversaries, and milestone celebrations.
              </p>
            </article>

            <article className="service-card">
              <img
                src="/assets/images/brand.jpg"
                alt="Brand Activations & Experiential Marketing"
                style={{ width: '100%', marginBottom: 'var(--space-md)', borderRadius: 4 }}
              />
              <h3 className="service-title">Brand Activations & Experiential Marketing</h3>
              <p className="service-description">
                Immersive brand experiences that connect audiences with products through interaction and storytelling.
              </p>
              <p className="service-ideal">
                <strong>Ideal For:</strong> Retail brands, D2C companies, and marketing campaigns.
              </p>
            </article>

            <article className="service-card">
              <img
                src="/assets/images/conference.jpg"
                alt="Conferences & Trade Shows"
                style={{ width: '100%', marginBottom: 'var(--space-md)', borderRadius: 4 }}
              />
              <h3 className="service-title">Conferences & Trade Shows</h3>
              <p className="service-description">
                Large-scale event management for conferences and exhibitions, optimized for flow, clarity, and attendee
                comfort.
              </p>
              <p className="service-ideal">
                <strong>Ideal For:</strong> Industry conferences, expos, and trade fairs.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="metrics-section">
        <div className="container">
          <h3>Stats and Metrics</h3>
          <div className="metrics-grid">
            <div className="metric-item">
              <span className="metric-number">50+</span>
              <span className="metric-text">Events Delivered</span>
            </div>
            <div className="metric-item">
              <span className="metric-number">95%</span>
              <span className="metric-text">Client Satisfaction</span>
            </div>
            <div className="metric-item">
              <span className="metric-number">5</span>
              <span className="metric-text">Years Experience</span>
            </div>
          </div>
        </div>
      </section>

      <section className="projects-section">
        <div className="container">
          <h2>Featured Work</h2>
          <div className="projects-grid">
            <article className="project-card">
              <img
                src="/assets/images/projects/novatech.jpg"
                alt="NovaTech Annual Summit 2024"
                style={{ width: '100%', marginBottom: 'var(--space-md)', borderRadius: 4 }}
              />
              <div className="project-header">
                <h3 className="project-title">NovaTech Annual Summit 2024</h3>
                <span className="project-type">Corporate Conference</span>
              </div>
              <div className="project-meta">
                <span className="project-location">Bengaluru, India</span>
                <span className="project-year">2024</span>
              </div>
              <p className="project-description">
                A two-day corporate summit bringing together NovaTech&apos;s leadership team, partners, and employees
                for strategy alignment and networking.
              </p>
              <ul className="project-metrics">
                <li className="metric">
                  <span className="metric-value">500+</span>
                  <span className="metric-label">attendees</span>
                </li>
                <li className="metric">
                  <span className="metric-value">98%</span>
                  <span className="metric-label">satisfaction</span>
                </li>
                <li className="metric">
                  <span className="metric-value">0</span>
                  <span className="metric-label">schedule overruns</span>
                </li>
              </ul>
              <Link to="/projects/novatech-annual-summit-2024" className="project-link">
                View Case Study →
              </Link>
            </article>

            <article className="project-card">
              <img
                src="/assets/images/projects/lumen.png"
                alt="Lumen Smart Home Product Launch"
                style={{ width: '100%', marginBottom: 'var(--space-md)', borderRadius: 4 }}
              />
              <div className="project-header">
                <h3 className="project-title">Lumen Smart Home Product Launch</h3>
                <span className="project-type">Product Launch</span>
              </div>
              <div className="project-meta">
                <span className="project-location">Mumbai, India</span>
                <span className="project-year">2023</span>
              </div>
              <p className="project-description">
                A high-energy launch event for Lumen&apos;s smart home product line, designed to showcase features
                through live demos.
              </p>
              <ul className="project-metrics">
                <li className="metric">
                  <span className="metric-value">300</span>
                  <span className="metric-label">attendees</span>
                </li>
                <li className="metric">
                  <span className="metric-value">40+</span>
                  <span className="metric-label">media mentions</span>
                </li>
                <li className="metric">
                  <span className="metric-value">3×</span>
                  <span className="metric-label">website traffic increase</span>
                </li>
              </ul>
              <Link to="/projects/lumen-smart-home-product-launch" className="project-link">
                View Case Study →
              </Link>
            </article>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>See How We Deliver Results</h2>
          <p>Explore detailed case studies showcasing our approach and measurable outcomes.</p>
          <Link to="/projects" className="btn btn-primary">
            View Case Studies
          </Link>
        </div>
      </section>
    </>
  );
}
