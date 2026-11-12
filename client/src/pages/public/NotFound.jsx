import { Link } from 'react-router-dom';
import { Compass, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <section className="container-x grid min-h-[70vh] place-items-center py-16 text-center">
      <div>
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl border border-line bg-bg-2/60 text-primary">
          <Compass size={30} />
        </div>
        <h1 className="mt-6 text-6xl font-extrabold text-gradient">404</h1>
        <p className="mt-3 text-muted">This page wandered off the roadmap.</p>
        <Link to="/" className="btn btn-primary mt-8">
          <ArrowLeft size={16} /> Back home
        </Link>
      </div>
    </section>
  );
}
