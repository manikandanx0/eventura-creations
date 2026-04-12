import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, PasswordInput, Stack, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useAuth } from '../context/AuthContext.jsx';
import { inputSurfaceStyles } from '../theme.js';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const form = useForm({
    initialValues: { name: '', email: '', password: '' },
    validate: {
      name: (v) => (v.trim().length ? null : 'Name is required'),
      email: (v) => (/^\S+@\S+\.\S+$/.test(v) ? null : 'Valid email required'),
      password: (v) => (v.length >= 8 ? null : 'At least 8 characters'),
    },
  });

  const onSubmit = form.onSubmit(async (values) => {
    setSubmitting(true);
    try {
      await register(values.name, values.email, values.password);
      notifications.show({ title: 'Account created', message: 'You are signed in.', color: 'grape' });
      navigate('/dashboard', { replace: true });
    } catch (e) {
      notifications.show({
        title: 'Registration failed',
        message: e.message || 'Please try a different email.',
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
          Create account
        </Title>
        <p className="contact-intro">New accounts are created with the attendee role by default.</p>

        <form className="contact-form" onSubmit={onSubmit} noValidate>
          <Stack gap="md">
            <TextInput label="Name" autoComplete="name" styles={inputSurfaceStyles} {...form.getInputProps('name')} />
            <TextInput label="Email" type="email" autoComplete="email" styles={inputSurfaceStyles} {...form.getInputProps('email')} />
            <PasswordInput label="Password" autoComplete="new-password" styles={inputSurfaceStyles} {...form.getInputProps('password')} />
            <Button type="submit" loading={submitting} variant="gradient">
              Register
            </Button>
            <p style={{ color: 'var(--color-text)', opacity: 0.85 }}>
              Already have an account? <Link to="/login">Sign in</Link>
            </p>
          </Stack>
        </form>
      </div>
    </section>
  );
}
