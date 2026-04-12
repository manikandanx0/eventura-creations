import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Loader, Stack, Text } from '@mantine/core';
import { apiGet } from '../api/http.js';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await apiGet('/api/projects');
        if (!cancelled) setProjects(data);
      } catch (e) {
        if (!cancelled) setError(e.message || 'Could not load projects');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <section className="page-header">
        <div className="container">
          <h1>Our Work</h1>
        </div>
      </section>

      <section className="projects-section">
        <div className="container">
          {loading && (
            <Stack align="center" py="xl">
              <Loader color="grape" type="dots" />
              <Text c="dimmed">Loading portfolio…</Text>
            </Stack>
          )}

          {error && (
            <Alert variant="light" color="red" title="Something went wrong">
              {error}. Ensure MongoDB is running and you have executed{' '}
              <Text span fw={600} component="span">
                pnpm seed
              </Text>{' '}
              from the repo root.
            </Alert>
          )}

          {!loading && !error && (
            <div className="projects-grid">
              {projects.map((p) => (
                <article key={p.slug} className="project-card">
                  <img
                    src={p.image}
                    alt={p.title}
                    style={{ width: '100%', margin: '0 auto', marginBottom: 'var(--space-md)', borderRadius: 4 }}
                  />
                  <div className="project-header">
                    <h2 className="project-title">{p.title}</h2>
                    <span className="project-type">{p.projectType}</span>
                  </div>
                  <div className="project-meta">
                    <span className="project-location">{p.location}</span>
                    <span className="project-year">{p.year}</span>
                  </div>
                  <p className="project-description">{p.description}</p>
                  <ul className="project-metrics">
                    {p.metrics?.map((m) => (
                      <li key={m.label} className="metric">
                        <span className="metric-value">{m.value}</span>
                        <span className="metric-label">{m.label}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to={`/projects/${p.slug}`} className="project-link">
                    {p.hasCaseStudy ? 'View Case Study →' : 'View project →'}
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
