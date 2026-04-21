import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import useReveal from '../components/useReveal';
import { useToast } from '../components/Toast';
import './Contact.css';


const SERVICE_ID  = 'service_me850xd';
const TEMPLATE_ID = 'template_1bmn83q';
const PUBLIC_KEY  = 'MeWoXiLKjJa1QYVSu';

// ─── Validation Rules ────────────────────────────────────────────────────────
const validate = (name, value) => {
  switch (name) {
    case 'fname':
      if (!value.trim()) return 'Full name is required.';
      if (value.trim().length < 3) return 'Name must be at least 3 characters.';
      if (!/^[a-zA-Z\s]+$/.test(value)) return 'Name can only contain letters.';
      return '';

    case 'email':
      if (!value.trim()) return 'Email address is required.';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Enter a valid email (e.g. name@gmail.com).';
      return '';

    case 'phone':
      if (!value.trim()) return 'Phone number is required.';
      if (!/^0[0-9]{10}$/.test(value)) return 'Enter a valid 11-digit phone starting with 0 (e.g. 03001234567).';
      return '';

    case 'topic':
      if (!value.trim()) return 'Subject is required.';
      if (value.trim().length < 3) return 'Subject must be at least 3 characters.';
      return '';

    case 'msg':
      if (!value.trim()) return 'Message is required.';
      if (value.trim().length < 10) return 'Message must be at least 10 characters.';
      return '';

    default:
      return '';
  }
};

export default function Contact() {
  const [form, setForm]     = useState({ fname: '', email: '', phone: '', topic: '', msg: '' });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [sending, setSending] = useState(false);
  const showToast = useToast();
  useReveal();

  // ─── Handlers ──────────────────────────────────────────────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Live validation once field has been touched
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validate(name, value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validate(name, value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields on submit
    const allTouched = { fname: true, email: true, phone: true, topic: true, msg: true };
    setTouched(allTouched);

    const newErrors = {};
    Object.keys(form).forEach((key) => {
      newErrors[key] = validate(key, form[key]);
    });
    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((err) => err !== '');
    if (hasErrors) {
      showToast({
        title: 'Please fix the errors!',
        message: 'Fill all fields correctly before sending.',
        type: 'error',
      });
      return;
    }

    // Send via EmailJS
    setSending(true);
    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, form, PUBLIC_KEY);
      showToast({
        title: 'Message Sent! 🎉',
        message: `Thanks <b>${form.fname}</b>! I'll reply to <b>${form.email}</b> soon.`,
        type: 'success',
      });
      setForm({ fname: '', email: '', phone: '', topic: '', msg: '' });
      setErrors({});
      setTouched({});
    } catch (err) {
      showToast({
        title: 'Failed to Send!',
        message: 'Something went wrong. Please try again later.',
        type: 'error',
      });
    } finally {
      setSending(false);
    }
  };

  // ─── Field Config ───────────────────────────────────────────────────────────
  const fields = [
    { name: 'fname',  type: 'text',  placeholder: 'Full Name',      half: true  },
    { name: 'email',  type: 'email', placeholder: 'Email Address',  half: true  },
    { name: 'phone',  type: 'tel',   placeholder: 'Phone Number',   half: true  },
    { name: 'topic',  type: 'text',  placeholder: 'Subject',        half: true  },
  ];

  return (
    <section className="contact-section">
       <div className="contact-bg" aria-hidden="true">
    <div className="blob blob-1"></div>
    <div className="blob blob-2"></div>
    <div className="blob blob-3"></div>
    <div className="blob blob-4"></div>
    <div className="grid-overlay"></div>
  </div>
      <h2 className="section-title reveal">
        Get In <span>Touch</span>
      </h2>

      <div className="contact-grid">
        {/* ── Info Side ── */}
        <div className="contact-info reveal">
          <h2>
            Let&apos;s <span>Work Together</span>
          </h2>
          <p>
            I&apos;m open to freelance projects, collaborations, and full-time
            opportunities. Drop a message and let&apos;s create something amazing
            together!
          </p>

          {[
            { icon: 'fa-solid fa-phone-volume', label: 'Phone',    value: '031 2345 6789'      },
            { icon: 'fa-solid fa-envelope',     label: 'Email',    value: 'unsha@example.com'  },
            { icon: 'fa-solid fa-location-dot', label: 'Location', value: 'Karachi, Pakistan'  },
          ].map((item) => (
            <div key={item.label} className="contact-item">
              <div className="contact-item-icon">
                <i className={item.icon}></i>
              </div>
              <div className="contact-item-text">
                <p>{item.label}</p>
                <p>{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Form Side ── */}
        <div className="contact-form-box reveal">
          <h3>
            Send Me a <span>Message</span>
          </h3>

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              {/* Text / Email / Tel / Subject inputs */}
              {fields.map(({ name, type, placeholder, half }) => (
                <div key={name} className={`form-group${half ? '' : ' full'}`}>
                  <input
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    value={form[name]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors[name] && touched[name] ? 'input-error' : ''}
                  />
                  {errors[name] && touched[name] && (
                    <span className="field-error">
                      <i className="fa-solid fa-circle-exclamation"></i> {errors[name]}
                    </span>
                  )}
                </div>
              ))}

              {/* Textarea */}
              <div className="form-group full">
                <textarea
                  name="msg"
                  placeholder="Your message..."
                  value={form.msg}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.msg && touched.msg ? 'input-error' : ''}
                ></textarea>
                {errors.msg && touched.msg && (
                  <span className="field-error">
                    <i className="fa-solid fa-circle-exclamation"></i> {errors.msg}
                  </span>
                )}
              </div>
            </div>

            <button type="submit" className="submit-btn" disabled={sending}>
              {sending ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin"></i> Sending...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-paper-plane"></i> Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}