import React, { useRef, useState } from 'react';
import '../assets/styles/Contact.scss';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';

import emailjs from '@emailjs/browser';

function Contact() {
  const form = useRef<HTMLFormElement | null>(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [messageError, setMessageError] = useState(false);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validateEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const resetErrors = () => {
    setNameError(false);
    setEmailError(false);
    setMessageError(false);
  };

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    resetErrors();
    setSuccess(false);

    let hasError = false;

    if (!name.trim()) {
      setNameError(true);
      hasError = true;
    }

    if (!email.trim() || !validateEmail(email)) {
      setEmailError(true);
      hasError = true;
    }

    if (!message.trim()) {
      setMessageError(true);
      hasError = true;
    }

    if (hasError) return;

    try {
      setLoading(true);

      await emailjs.send(
        'service_6uk51ch',
        'template_45wei9l',
        { name, email, message },
        'GJD7pIhFsXAEGwQpV'
      );

      setSuccess(true);
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      console.error('FAILED...', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="contact">
      <div className="items-container">
        <div className="contact_wrapper">
          <h1>Contact Me</h1>

          <p>
            Got a project waiting to be realized? Let&apos;s collaborate and make it happen!
          </p>

          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Message sent successfully!
            </Alert>
          )}

          <Box
            ref={form}
            component="form"
            noValidate
            autoComplete="off"
            className="contact-form"
            onSubmit={sendEmail}
          >
            <div className="form-flex">
              <TextField
                fullWidth
                label="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={nameError}
                helperText={nameError ? "Please enter your name" : ""}
                InputLabelProps={{ shrink: true }}
              />

              <TextField
                fullWidth
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={emailError}
                helperText={emailError ? "Enter a valid email" : ""}
                InputLabelProps={{ shrink: true }}
              />
            </div>

            <TextField
              fullWidth
              label="Message"
              multiline
              rows={8}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              error={messageError}
              helperText={messageError ? "Please enter your message" : ""}
              InputLabelProps={{ shrink: true }}
            />

            <Button
              type="submit"
              variant="contained"
              endIcon={<SendIcon />}
              disabled={loading}
              sx={{ mt: 2, float: "right" }}
            >
              {loading ? "Sending..." : "Send Message"}
            </Button>
          </Box>
        </div>
      </div>
    </div>
  );
}

export default Contact;