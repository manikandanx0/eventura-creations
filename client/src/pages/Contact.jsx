import { useState } from 'react';
import { Button, Stack, Textarea, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { apiPost } from '../api/http.js';
import { inputSurfaceStyles } from '../theme.js';

export default function Contact() {
  const [submitting, setSubmitting] = useState(false);

  const form = useForm({
    initialValues: { name: '', email: '', message: '' },
    validate: {
      name: (v) => (v.trim().length ? null : 'Name is required'),
      email: (v) => (/^\S+@\S+\.\S+$/.test(v) ? null : 'A valid email is required'),
      message: (v) => (v.trim().length ? null : 'Message is required'),
    },
  });

  const onSubmit = form.onSubmit(async (values) => {
    setSubmitting(true);
    try {
      await apiPost('/api/contact', {
        name: values.name.trim(),
        email: values.email.trim(),
        message: values.message.trim(),
      });
      notifications.show({
        title: 'Message sent',
        message: 'Thank you — we will get back to you shortly.',
        color: 'grape',
      });
      form.reset();
    } catch (e) {
      notifications.show({
        title: 'Could not send',
        message: e.message || 'Please try again in a moment.',
        color: 'red',
      });
    } finally {
      setSubmitting(false);
    }
  });

  return (
    <section className="contact-section">
      <div className="container">
        <h1>Get in Touch</h1>
        <p className="contact-intro">Ready to create something exceptional? Let&apos;s talk about your next event.</p>

        <form className="contact-form" onSubmit={onSubmit} noValidate>
          <Stack gap="md">
            <TextInput
              label="Name"
              name="name"
              autoComplete="name"
              styles={inputSurfaceStyles}
              {...form.getInputProps('name')}
            />
            <TextInput
              label="Email"
              name="email"
              type="email"
              autoComplete="email"
              styles={inputSurfaceStyles}
              {...form.getInputProps('email')}
            />
            <Textarea
              label="Message"
              name="message"
              rows={6}
              autosize
              minRows={6}
              styles={inputSurfaceStyles}
              {...form.getInputProps('message')}
            />
            <Button type="submit" loading={submitting} variant="gradient" size="md" maw={220}>
              Send Message
            </Button>
          </Stack>
        </form>
      </div>
    </section>
  );
}
