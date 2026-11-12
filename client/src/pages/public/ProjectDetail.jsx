import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import publicApi from '../../services/publicApi';
import FullScreenLoader from '../../components/common/FullScreenLoader';
import MarkdownContent from '../../components/common/MarkdownContent';
import Badge from '../../components/common/Badge';

const designItems = [
  ['Architecture', 'architectureImage'],
  ['Workflow', 'workflowImage'],
  ['Deployment', 'deploymentImage'],
  ['Database Schema', 'dbSchemaImage'],
];

export default function ProjectDetail() {
  const { slug } = useParams();
  const { data: project, loading } = useFetch(() => publicApi.projectBySlug(slug), [slug]);

  if (loading) return <FullScreenLoader label="Loading case study…" />;
  if (!project) {
    return (
      <div className="container-x py-24 text-center">
        <h1 className="section-title">Project not found</h1>
        <Link to="/#projects" className="btn btn-primary mt-6">Back to projects</Link>
      </div>
    );
  }

  const design = project.systemDesign || {};
  const hasDesign = designItems.some(([, key]) => design[key]);

  return (
    <article className="container-x py-12 sm:py-16">
      <Link to="/#projects" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-muted hover:text-text">
        <ArrowLeft size={16} /> Back to projects
      </Link>

      <header className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <Badge color="muted">{project.category}</Badge>
          <h1 className="mt-4 text-3xl font-extrabold sm:text-5xl">{project.title}</h1>
          <MarkdownContent className="mt-5 text-base leading-7 text-muted">{project.description}</MarkdownContent>
          <div className="mt-6 flex flex-wrap gap-3">
            {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost"><Github size={16} /> Code</a>}
            {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary"><ExternalLink size={16} /> Go live</a>}
          </div>
        </div>
        {project.image && <img src={project.image} alt={project.title} className="w-full rounded-card border border-line object-cover shadow-soft" />}
      </header>

      <div className="mt-14 grid gap-6 lg:grid-cols-2">
        {[
          ['The Problem', project.problem],
          ['The Solution', project.solution],
          ['Key Challenges', project.keyChallenges],
          ['Case Study', project.caseStudy],
        ].map(([heading, content]) => content && (
          <section key={heading} className="card glass rounded-card p-6">
            <h2 className="text-xl font-bold">{heading}</h2>
            <MarkdownContent className="mt-4 text-sm leading-7 text-muted">{content}</MarkdownContent>
          </section>
        ))}
      </div>

      {hasDesign && (
        <section className="mt-14">
          <h2 className="section-title text-center">System Design</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {designItems.map(([label, key]) => design[key] && (
              <figure key={key} className="card glass overflow-hidden rounded-card">
                <img src={design[key]} alt={`${project.title} ${label} diagram`} className="w-full object-contain" loading="lazy" />
                <figcaption className="border-t border-line p-4 text-center text-sm font-semibold">{label}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      {project.technologies?.length > 0 && (
        <section className="mt-14">
          <h2 className="section-title text-center">Tech Stack</h2>
          <div className="mx-auto mt-8 flex max-w-4xl flex-wrap justify-center gap-3">
            {project.technologies.map((technology) => <span key={technology} className="chip px-4 py-2 text-sm">{technology}</span>)}
          </div>
        </section>
      )}
    </article>
  );
}
