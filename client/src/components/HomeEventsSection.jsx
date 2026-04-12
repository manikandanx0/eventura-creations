import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Loader, Stack, Text } from '@mantine/core';
import { apiGet } from '../api/http.js';
import { formatInr } from '../utils/formatInr.js';

/**
 * Public event directory for the MVP home page (backed by `GET /api/events`).
 */
export default function HomeEventsSection() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await apiGet('/api/events');
        if (!cancelled) setEvents(Array.isArray(data) ? data : []);
      } catch (e) {
        if (!cancelled) setError(e.message || 'Could not load events');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="projects-section" id="events">
      <div className="container">
        <h2>Upcoming events</h2>
        <p className="contact-intro" style={{ marginTop: 'var(--space-sm)' }}>
          Browse live experiences you can book as an attendee. Organizers publish events from the dashboard.
        </p>

        {loading ? (
          <Stack align="center" py="xl">
            <Loader color="grape" type="dots" />
            <Text c="dimmed">Loading events…</Text>
          </Stack>
        ) : null}

        {error ? (
          <Alert mt="md" color="red" variant="light" title="Events unavailable">
            {error}. Start MongoDB, set <code>MONGODB_URI</code>, then run <code>pnpm seed</code>.
          </Alert>
        ) : null}

        {!loading && !error ? (
          <div className="projects-grid" style={{ marginTop: 'var(--space-lg)' }}>
            {events.length === 0 ? (
              <Text c="dimmed">No events published yet.</Text>
            ) : (
              events.map((ev) => (
                <article key={ev._id} className="project-card">
                  <div className="project-header">
                    <h3 className="project-title">{ev.title}</h3>
                    <span className="project-type">{ev.location}</span>
                  </div>
                  <div className="project-meta">
                    <span className="project-location">{ev.date ? new Date(ev.date).toLocaleString() : '—'}</span>
                    <span className="project-year">{formatInr(ev.price)}</span>
                  </div>
                  <p className="project-description">{ev.description}</p>
                  <Link to={`/events/${ev._id}`} className="project-link">
                    View details →
                  </Link>
                </article>
              ))
            )}
          </div>
        ) : null}
      </div>
    </section>
  );
}
