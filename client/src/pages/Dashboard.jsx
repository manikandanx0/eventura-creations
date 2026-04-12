import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Alert,
  Button,
  Divider,
  Group,
  NumberInput,
  Stack,
  Table,
  Text,
  TextInput,
  Textarea,
  Title,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { apiDelete, apiGet, apiPost, apiPut } from '../api/http.js';
import { useAuth } from '../context/AuthContext.jsx';
import { inputSurfaceStyles } from '../theme.js';

function toDatetimeLocalValue(iso) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

/**
 * Role-aware dashboard:
 * - Everyone: personal bookings
 * - Organizers: CRUD for events they own
 * - Admins: manage all events + can assign `organizerId` when creating
 */
export default function Dashboard() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState(0);
  const [organizerId, setOrganizerId] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);

  const canManageEvents = user?.role === 'organizer' || user?.role === 'admin';

  const managedEvents = useMemo(() => {
    if (!canManageEvents) return [];
    if (user.role === 'admin') return events;
    return events.filter((e) => String(e.organizer?._id || e.organizer) === String(user.id));
  }, [canManageEvents, events, user]);

  const refreshAll = useCallback(async () => {
    setLoading(true);
    try {
      const b = await apiGet('/api/bookings/me', { auth: true });
      setBookings(Array.isArray(b) ? b : []);
      if (canManageEvents) {
        const ev = await apiGet('/api/events');
        setEvents(Array.isArray(ev) ? ev : []);
      } else {
        setEvents([]);
      }
    } catch (e) {
      notifications.show({ title: 'Could not load dashboard', message: e.message, color: 'red' });
    } finally {
      setLoading(false);
    }
  }, [canManageEvents]);

  useEffect(() => {
    refreshAll();
  }, [refreshAll]);

  const resetForm = () => {
    setEditingId(null);
    setTitle('');
    setDescription('');
    setDate('');
    setLocation('');
    setPrice(0);
    setOrganizerId('');
  };

  const startEdit = (ev) => {
    setEditingId(ev._id);
    setTitle(ev.title);
    setDescription(ev.description);
    setDate(toDatetimeLocalValue(ev.date));
    setLocation(ev.location);
    setPrice(ev.price);
    setOrganizerId('');
  };

  const onSaveEvent = async () => {
    if (!title.trim() || !description.trim() || !location.trim() || !date) {
      notifications.show({ title: 'Missing fields', message: 'Fill title, description, location, and date.', color: 'red' });
      return;
    }
    if (user.role === 'admin' && !editingId && !organizerId.trim()) {
      notifications.show({
        title: 'Organizer required',
        message: 'Admins must set Organizer user id when creating a new event.',
        color: 'red',
      });
      return;
    }
    const payload = {
      title: title.trim(),
      description: description.trim(),
      location: location.trim(),
      date: new Date(date).toISOString(),
      price: Number(price),
    };
    if (user.role === 'admin' && organizerId.trim()) {
      payload.organizerId = organizerId.trim();
    }

    setSaving(true);
    try {
      if (editingId) {
        await apiPut(`/api/events/${editingId}`, payload, { auth: true });
        notifications.show({ title: 'Saved', message: 'Event updated.', color: 'grape' });
      } else {
        await apiPost('/api/events', payload, { auth: true });
        notifications.show({ title: 'Created', message: 'Event published.', color: 'grape' });
      }
      resetForm();
      await refreshAll();
    } catch (e) {
      notifications.show({ title: 'Save failed', message: e.message, color: 'red' });
    } finally {
      setSaving(false);
    }
  };

  const onDeleteEvent = async (id) => {
    // eslint-disable-next-line no-alert
    const ok = window.confirm('Delete this event and its bookings?');
    if (!ok) return;
    try {
      await apiDelete(`/api/events/${id}`, { auth: true });
      notifications.show({ title: 'Deleted', message: 'Event removed.', color: 'grape' });
      if (editingId === id) resetForm();
      await refreshAll();
    } catch (e) {
      notifications.show({ title: 'Delete failed', message: e.message, color: 'red' });
    }
  };

  return (
    <section className="projects-section">
      <div className="container">
        <Title order={1} c="var(--color-text)" ff="var(--font-heading)" fw={400}>
          Dashboard
        </Title>
        <Text c="dimmed" mt="xs">
          Signed in as <strong>{user?.email}</strong> ({user?.role})
        </Text>

        {loading ? (
          <Text mt="lg" c="dimmed">
            Loading…
          </Text>
        ) : null}

        <Divider my="xl" />

        <Title order={2} c="var(--color-text)" ff="var(--font-heading)" fw={400}>
          My bookings
        </Title>
        {bookings.length === 0 ? (
          <Text mt="sm" c="dimmed">
            No bookings yet. Browse events on the home page.
          </Text>
        ) : (
          <Table mt="md" striped highlightOnHover withTableBorder>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Event</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>When booked</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {bookings.map((b) => (
                <Table.Tr key={b._id}>
                  <Table.Td>
                    {b.event?.title ? (
                      <Link to={`/events/${b.event._id}`}>{b.event.title}</Link>
                    ) : (
                      '—'
                    )}
                  </Table.Td>
                  <Table.Td>{b.status}</Table.Td>
                  <Table.Td>{b.createdAt ? new Date(b.createdAt).toLocaleString() : '—'}</Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        )}

        {canManageEvents ? (
          <>
            <Divider my="xl" />
            <Title order={2} c="var(--color-text)" ff="var(--font-heading)" fw={400}>
              Event management
            </Title>
            {user.role === 'admin' ? (
              <Alert mt="md" color="grape" variant="light" title="Admin mode">
                You can create events for any organizer by setting Organizer MongoDB id (required on create). Seeded
                organizer id is available in MongoDB after <code>pnpm seed</code>.
              </Alert>
            ) : null}

            <Stack mt="lg" gap="md" maw={720}>
              <TextInput label="Title" styles={inputSurfaceStyles} value={title} onChange={(e) => setTitle(e.currentTarget.value)} />
              <Textarea
                label="Description"
                minRows={4}
                styles={inputSurfaceStyles}
                value={description}
                onChange={(e) => setDescription(e.currentTarget.value)}
              />
              <TextInput
                label="Location"
                styles={inputSurfaceStyles}
                value={location}
                onChange={(e) => setLocation(e.currentTarget.value)}
              />
              <TextInput
                label="Date"
                description="Local time; stored as ISO in the database."
                type="datetime-local"
                styles={inputSurfaceStyles}
                value={date}
                onChange={(e) => setDate(e.currentTarget.value)}
              />
              <NumberInput
                label="Price (INR)"
                min={0}
                value={price}
                onChange={(v) => setPrice(typeof v === 'number' ? v : Number(v) || 0)}
              />
              {user.role === 'admin' ? (
                <TextInput
                  label="Organizer user id (admins only)"
                  description="Required when creating a new event as admin."
                  styles={inputSurfaceStyles}
                  value={organizerId}
                  onChange={(e) => setOrganizerId(e.currentTarget.value)}
                />
              ) : null}

              <Group>
                <Button onClick={onSaveEvent} loading={saving} variant="gradient">
                  {editingId ? 'Update event' : 'Create event'}
                </Button>
                {editingId ? (
                  <Button variant="default" onClick={resetForm}>
                    Cancel edit
                  </Button>
                ) : null}
              </Group>
            </Stack>

            <Title order={3} mt="xl" c="var(--color-text)" ff="var(--font-heading)" fw={400}>
              {user.role === 'admin' ? 'All events' : 'Your events'}
            </Title>
            {managedEvents.length === 0 ? (
              <Text mt="sm" c="dimmed">
                No events yet.
              </Text>
            ) : (
              <Table mt="md" striped highlightOnHover withTableBorder>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Title</Table.Th>
                    <Table.Th>Date</Table.Th>
                    <Table.Th>Location</Table.Th>
                    <Table.Th>Actions</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {managedEvents.map((ev) => (
                    <Table.Tr key={ev._id}>
                      <Table.Td>
                        <Link to={`/events/${ev._id}`}>{ev.title}</Link>
                      </Table.Td>
                      <Table.Td>{ev.date ? new Date(ev.date).toLocaleString() : '—'}</Table.Td>
                      <Table.Td>{ev.location}</Table.Td>
                      <Table.Td>
                        <Group gap="xs">
                          <Button size="xs" variant="light" onClick={() => startEdit(ev)}>
                            Edit
                          </Button>
                          <Button size="xs" color="red" variant="light" onClick={() => onDeleteEvent(ev._id)}>
                            Delete
                          </Button>
                        </Group>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            )}
          </>
        ) : null}
      </div>
    </section>
  );
}
