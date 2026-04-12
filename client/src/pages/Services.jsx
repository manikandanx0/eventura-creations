import { Link } from 'react-router-dom';
import { Button, Stack, Title } from '@mantine/core';
import { services } from '../data/services.js';

export default function Services() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <h1>Our Services</h1>
        </div>
      </section>

      <section className="services-section">
        <div className="container">
          <div className="services-grid">
            {services.map((s) => (
              <article key={s.title} className="service-card">
                <img
                  src={s.image}
                  alt={s.title}
                  style={{ width: '100%', marginBottom: 'var(--space-md)', borderRadius: 4 }}
                />
                <h3 className="service-title">{s.title}</h3>
                <p className="service-description">{s.description}</p>
                <p className="service-ideal">
                  <strong>Ideal For:</strong> {s.idealFor}
                </p>
                <ul className="service-capabilities">
                  {s.capabilities.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container" style={{ marginTop: '10vh' }}>
          <Stack gap="md" align="center">
            <Title order={2} ta="center" c="var(--color-text)" ff="var(--font-heading)" fw={400}>
              Ready to bring your event to life?
            </Title>
            <p className="contact-intro" style={{ textAlign: 'center', margin: 0 }}>
              Let&apos;s discuss how we can help you create a memorable experience.
            </p>
            <Button component={Link} to="/contact" size="md" variant="gradient">
              Get in Touch
            </Button>
          </Stack>
        </div>
      </section>
    </>
  );
}
