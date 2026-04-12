import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, PasswordInput, Stack, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useAuth } from '../context/AuthContext.jsx';
import { inputSurfaceStyles } from '../theme.js';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [submitting, setSubmitting] = useState(false);

  const from = location.state?.from || '/dashboard';

  const form = useForm({
    initialValues: { email: '', password: '' },
    validate: {
      email: (v) => (/^\S+@\S+\.\S+$/.test(v) ? null : 'Valid email required'),
      password: (v) => (v.length ? null : 'Password required'),
    },
  });

  const onSubmit = form.onSubmit(async (values) => {
    setSubmitting(true);
    try {
      await login(values.email, values.password);
      notifications.show({ title: 'Welcome back', message: 'You are signed in.', color: 'grape' });
      navigate(from, { replace: true });
    } catch (e) {
      notifications.show({
        title: 'Sign-in failed',
        message: e.message || 'Please check your credentials.',
        color: 'red',
      });
    } finally {
      setSubmitting(false);
    }
  });

  return (
    <section className="contact-section">
      <div className="container" style={{ maxWidth: 520 }}>
        <Title order={1} mb="sm" c="var(--color-text)" ff="var(--font-heading)" fw={400}>
          Sign in
        </Title>
        <p className="contact-intro">Use a seeded account or register a new attendee account.</p>

        <form className="contact-form" onSubmit={onSubmit} noValidate>
          <Stack gap="md">
            <TextInput label="Email" type="email" autoComplete="email" styles={inputSurfaceStyles} {...form.getInputProps('email')} />
            <PasswordInput label="Password" autoComplete="current-password" styles={inputSurfaceStyles} {...form.getInputProps('password')} />
            <Button type="submit" loading={submitting} variant="gradient">
              Continue
            </Button>
            <p style={{ color: 'var(--color-text)', opacity: 0.85 }}>
              No account? <Link to="/register">Create one</Link>
            </p>
          </Stack>
        </form>
      </div>
    </section>
  );
}
