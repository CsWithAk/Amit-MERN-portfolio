import { useOutletContext } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import publicApi from '../../services/publicApi';
import Skeleton from '../../components/common/Skeleton';

import Hero from '../../components/portfolio/Hero';
import About from '../../components/portfolio/About';
import Journey from '../../components/portfolio/Journey';
import Skills from '../../components/portfolio/Skills';
import Projects from '../../components/portfolio/Projects';
import Experience from '../../components/portfolio/Experience';
import Certifications from '../../components/portfolio/Certifications';
import Publications from '../../components/portfolio/Publications';
import FAQs from '../../components/portfolio/FAQs';
import Contact from '../../components/portfolio/Contact';

function SectionFallback() {
  return (
    <div className="container-x py-20">
      <Skeleton className="mb-6 h-8 w-52" />
      <div className="grid gap-6 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-40" />
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  // profile + socialLinks come from the shared layout chrome (already fetched).
  const { profile, socialLinks } = useOutletContext();

  const about = useFetch(publicApi.about, []);
  const journey = useFetch(publicApi.journey, []);
  const skills = useFetch(publicApi.skills, []);
  const projects = useFetch(publicApi.projects, []);
  const experience = useFetch(publicApi.experience, []);
  const certifications = useFetch(publicApi.certifications, []);
  const achievements = useFetch(publicApi.achievements, []);
  const publications = useFetch(publicApi.publications, []);
  const faqs = useFetch(publicApi.faqs, []);

  return (
    <>
      <Hero profile={profile} socialLinks={socialLinks} />

      {about.loading ? <SectionFallback /> : <About about={about.data} profile={profile} />}
      {journey.loading ? <SectionFallback /> : <Journey items={journey.data || []} />}
      {skills.loading ? <SectionFallback /> : <Skills skills={skills.data} />}
      {projects.loading ? <SectionFallback /> : <Projects data={projects.data} />}
      {experience.loading ? (
        <SectionFallback />
      ) : (
        <Experience items={experience.data || []} achievements={achievements.data || []} />
      )}
      {certifications.loading ? <SectionFallback /> : <Certifications items={certifications.data || []} />}
      {publications.loading ? <SectionFallback /> : <Publications items={publications.data || []} />}
      {!faqs.loading && <FAQs items={faqs.data || []} />}
      <Contact profile={profile} />
    </>
  );
}
