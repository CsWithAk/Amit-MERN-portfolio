import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowLeft, Home as HomeIcon } from 'lucide-react';

export default function ThankYou() {
  return (
    <section className="container-x grid min-h-[70vh] place-items-center py-16">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="card glass w-full max-w-lg rounded-card p-10 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.15, type: 'spring', stiffness: 200, damping: 12 }}
          className="mx-auto grid h-20 w-20 place-items-center rounded-full"
              style={{ background: 'var(--primary)' }}
        >
          <CheckCircle2 size={40} className="text-white" />
        </motion.div>

        <h1 className="mt-6 text-3xl font-extrabold">Thank you!</h1>
        <p className="mt-3 text-muted">
          Your message has been received. I'll get back to you as soon as possible. Meanwhile, feel
          free to explore more of my work.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/" className="btn btn-primary">
            <HomeIcon size={16} /> Back to home
          </Link>
          <Link to="/#contact" className="btn btn-ghost">
            <ArrowLeft size={16} /> Send another
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
