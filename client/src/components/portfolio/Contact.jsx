import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Mail, Phone, MapPin, Send, Github, Loader2 } from 'lucide-react';
import SectionTitle from '../common/SectionTitle';
import { Reveal } from '../animations/Reveal';
import publicApi from '../../services/publicApi';

export default function Contact({ profile }) {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (values) => {
    setSubmitting(true);
    try {
      const res = await publicApi.submitContact(values);
      if (res?.success) {
        toast.success('Message sent — thank you!');
        navigate('/thank-you');
      } else {
        toast.error(res?.message || 'Could not send message');
      }
    } catch (e) {
      toast.error(e.friendlyMessage || 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  const info = [
    { icon: Mail, label: 'Email', value: profile?.email, href: profile?.email ? `mailto:${profile.email}` : null },
    { icon: Phone, label: 'Phone', value: profile?.phone, href: profile?.phone ? `tel:${profile.phone}` : null },
    { icon: MapPin, label: 'Location', value: profile?.location, href: null },
    { icon: Github, label: 'GitHub', value: 'CsWithAk', href: 'https://github.com/CsWithAk' },
  ].filter((x) => x.value);

  return (
    <section id="contact" data-cursor-section="contact" className="container-x py-20">
      <SectionTitle
        eyebrow="Get in touch"
        title="Contact"
        subtitle="Have a project, opportunity or question? Send a message and I'll respond soon."
      />

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        {/* info */}
        <Reveal>
          <div className="card glass flex h-full flex-col justify-between rounded-card p-7" data-cursor-anchor="card">
            <div>
              <h3 className="text-lg font-bold">Let's build something</h3>
              <p className="mt-2 text-sm text-muted">{profile?.availability || 'Open to collaboration and new opportunities.'}</p>

              <div className="mt-6 space-y-4">
                {info.map((x) => {
                  const Icon = x.icon;
                  const content = (
                    <div className="flex items-center gap-3">
                      <span className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-bg-2/60 text-primary">
                        <Icon size={17} />
                      </span>
                      <div>
                        <div className="text-xs uppercase tracking-wide text-muted">{x.label}</div>
                        <div className="text-sm font-medium">{x.value}</div>
                      </div>
                    </div>
                  );
                  return x.href ? (
                    <a key={x.label} href={x.href} target="_blank" rel="noopener noreferrer" className="block transition hover:opacity-80">
                      {content}
                    </a>
                  ) : (
                    <div key={x.label}>{content}</div>
                  );
                })}
              </div>
            </div>

            {profile?.resumeUrl && (
              <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost mt-8">
                <Mail size={16} /> Download Resume
              </a>
            )}
          </div>
        </Reveal>

        {/* form */}
        <Reveal delay={0.05}>
          <form onSubmit={handleSubmit(onSubmit)} className="card glass rounded-card p-7" data-cursor-anchor="form">
            {/* Honeypot anti-spam field: invisible to humans, filled by bots and rejected server-side. */}
            <input
              type="text"
              name="company_website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              {...register('company_website')}
              style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0 }}
            />
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="label" htmlFor="name">Name</label>
                <input id="name" className="field" placeholder="Your name" {...register('name', { required: 'Name is required' })} />
                {errors.name && <p className="mt-1 text-xs text-rose-400">{errors.name.message}</p>}
              </div>
              <div>
                <label className="label" htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  className="field"
                  placeholder="you@example.com"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' },
                  })}
                />
                {errors.email && <p className="mt-1 text-xs text-rose-400">{errors.email.message}</p>}
              </div>
            </div>

            <div className="mt-5">
              <label className="label" htmlFor="subject">Subject</label>
              <input id="subject" className="field" placeholder="What is this about?" {...register('subject')} />
            </div>

            <div className="mt-5">
              <label className="label" htmlFor="message">Message</label>
              <textarea
                id="message"
                rows={5}
                className="field resize-none"
                placeholder="Tell me about your idea…"
                {...register('message', { required: 'Message is required', minLength: { value: 5, message: 'A little more detail please' } })}
              />
              {errors.message && <p className="mt-1 text-xs text-rose-400">{errors.message.message}</p>}
            </div>

            <button type="submit" className="btn btn-primary mt-6 w-full sm:w-auto" disabled={submitting}>
              {submitting ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
              {submitting ? 'Sending…' : 'Send message'}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
