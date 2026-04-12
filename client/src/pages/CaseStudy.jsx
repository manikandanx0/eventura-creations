import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Alert, Loader, Stack, Text } from '@mantine/core';
import { apiGet } from '../api/http.js';

function SectionBlock({ section }) {
  const isResults = Boolean(section.results?.length);

  return (
    <section className={`case-study-section${isResults ? ' case-study-results' : ''}`}>
      <div className="container-narrow">
        <h2>{section.title}</h2>

        {section.content?.length ? (
          section.content.map((block, i) => {
            if (block.type === 'paragraph') {
              return <p key={i}>{block.text}</p>;
            }
            if (block.type === 'image') {
              return (
                <img
                  key={i}
                  src={block.src}
                  alt=""
                  style={{ width: '100%', marginBottom: 'var(--space-md)', borderRadius: 8 }}
                />
              );
            }
            if (block.type === 'list') {
              return (
                <ul key={i}>
                  {block.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              );
            }
            return null;
          })
        ) : (
          <>
            {section.paragraphs?.map((para, i) => (
              <p key={`${section.title}-p-${i}`}>{para}</p>
            ))}
            {section.image ? (
              <img
                src={section.image}
                alt=""
                style={{ width: '100%', marginBottom: 'var(--space-md)', borderRadius: 8 }}
              />
            ) : null}
            {section.listItems?.length ? (
              <ul>
                {section.listItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
          </>
        )}

        {section.results?.length ? (
          <div className="results-grid">
            {section.results.map((r) => (
              <div key={r.label} className="result-item">
                <span className="result-value">{r.value}</span>
                <span className="result-label">{r.label}</span>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

export default function CaseStudy() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await apiGet(`/api/projects/${encodeURIComponent(slug)}`);
        if (!cancelled) setProject(data);
      } catch (e) {
        if (!cancelled) {
          setError(e.message || 'Not found');
          setProject(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (loading) {
    return (
      <section className="projects-section">
        <div className="container">
          <Stack align="center" py="xl">
            <Loader color="grape" type="dots" />
            <Text c="dimmed">Loading project…</Text>
          </Stack>
        </div>
      </section>
    );
  }

  if (error || !project) {
    return (
      <section className="projects-section">
        <div className="container">
          <Alert color="red" variant="light" title="Project unavailable">
            {error || 'This project could not be loaded.'}
          </Alert>
          <Stack mt="md">
            <Link to="/projects" className="btn btn-secondary">
              ← Back to Projects
            </Link>
          </Stack>
        </div>
      </section>
    );
  }

  const cs = project.caseStudy;

  if (!cs) {
    return (
      <>
        <section className="page-header">
          <div className="container">
            <h1>{project.title}</h1>
          </div>
        </section>
        <section className="projects-section">
          <div className="container content-narrow">
            <article className="project-card" style={{ maxWidth: 720, margin: '0 auto' }}>
              <img
                src={project.image}
                alt=""
                style={{ width: '100%', marginBottom: 'var(--space-md)', borderRadius: 8 }}
              />
              <div className="project-meta">
                <span className="project-location">{project.location}</span>
                <span className="project-year">{project.year}</span>
              </div>
              <p className="project-description">{project.description}</p>
              <ul className="project-metrics">
                {project.metrics?.map((m) => (
                  <li key={m.label} className="metric">
                    <span className="metric-value">{m.value}</span>
                    <span className="metric-label">{m.label}</span>
                  </li>
                ))}
              </ul>
            </article>
            <nav className="case-study-nav">
              <div className="container-narrow">
                <Link to="/projects" className="btn btn-secondary">
                  ← Back to Projects
                </Link>
              </div>
            </nav>
          </div>
        </section>
      </>
    );
  }

  return (
    <article className="case-study">
      <header className="case-study-header">
        <div className="container-narrow">
          <img
            src={project.image}
            alt=""
            style={{ width: '80%', marginBottom: 'var(--space-lg)', borderRadius: 8 }}
          />
          <h1>{project.title}</h1>
          <p className="case-study-client">{cs.client}</p>
          <div className="case-study-meta">
            <span className="meta-item">
              <strong>Event Type:</strong> {project.projectType}
            </span>
            <span className="meta-item">
              <strong>Location:</strong> {project.location}
            </span>
            <span className="meta-item">
              <strong>Duration:</strong> {cs.duration}
            </span>
          </div>
        </div>
      </header>

      {cs.sections?.map((section) => (
        <SectionBlock key={section.title} section={section} />
      ))}

      <nav className="case-study-nav">
        <div className="container-narrow">
          <Link to="/projects" className="btn btn-secondary">
            ← Back to Projects
          </Link>
          {cs.nextSlug ? (
            <Link to={`/projects/${cs.nextSlug}`} className="btn btn-primary">
              Next case study →
            </Link>
          ) : null}
        </div>
      </nav>
    </article>
  );
}
