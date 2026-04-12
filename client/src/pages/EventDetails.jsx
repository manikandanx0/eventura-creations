import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Alert, Button, Group, Loader, Stack, Text, Title } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { apiGet, apiPost } from '../api/http.js';
import { useAuth } from '../context/AuthContext.jsx';
import { formatInr } from '../utils/formatInr.js';

export default function EventDetails() {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [booking, setBooking] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await apiGet(`/api/events/${encodeURIComponent(id)}`);
        if (!cancelled) setEvent(data);
      } catch (e) {
        if (!cancelled) setError(e.message || 'Could not load event');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id]);

  const when = useMemo(() => {
    if (!event?.date) return '';
    return new Date(event.date).toLocaleString();
  }, [event]);

  const onBook = async () => {
    setBooking(true);
    try {
      await apiPost('/api/bookings', { eventId: id }, { auth: true });
      notifications.show({ title: 'Booked', message: 'Your seat is reserved.', color: 'grape' });
    } catch (e) {
      notifications.show({ title: 'Booking failed', message: e.message, color: 'red' });
    } finally {
      setBooking(false);
    }
  };

  if (loading) {
    return (
      <section className="projects-section">
        <div className="container">
          <Stack align="center" py="xl">
            <Loader color="grape" type="dots" />
            <Text c="dimmed">Loading event…</Text>
          </Stack>
        </div>
      </section>
    );
  }

  if (error || !event) {
    return (
      <section className="projects-section">
        <div className="container">
          <Alert color="red" variant="light" title="Event unavailable">
            {error || 'Not found'}
          </Alert>
          <Group mt="md">
            <Button component={Link} to="/" variant="light">
              Back home
            </Button>
          </Group>
        </div>
      </section>
    );
  }

  return (
    <section className="projects-section">
      <div className="container content-narrow">
        <Title order={1} c="var(--color-text)" ff="var(--font-heading)" fw={400}>
          {event.title}
        </Title>
        <Text c="dimmed" mt="xs">
          {when} · {event.location}
        </Text>
        <Text mt="md" style={{ color: 'var(--color-text)', lineHeight: 1.7 }}>
          {event.description}
        </Text>
        <Text mt="md" fw={600} c="var(--color-accent)">
          {formatInr(event.price)}
        </Text>
        {event.organizer?.name ? (
          <Text mt="sm" c="dimmed">
            Organizer: {event.organizer.name}
          </Text>
        ) : null}

        <Group mt="xl">
          {isAuthenticated ? (
            <Button onClick={onBook} loading={booking} variant="gradient">
              Book this event
            </Button>
          ) : (
            <Button component={Link} to="/login" state={{ from: `/events/${id}` }} variant="gradient">
              Sign in to book
            </Button>
          )}
          <Button component={Link} to="/#events" variant="default">
            Browse more events
          </Button>
        </Group>
      </div>
    </section>
  );
}
