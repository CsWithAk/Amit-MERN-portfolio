import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoute';
import FullScreenLoader from './components/common/FullScreenLoader';
import PublicLayout from './layouts/PublicLayout';

// Lazy route chunks for code-splitting (Phase 12).
const Home = lazy(() => import('./pages/public/Home'));
const ThankYou = lazy(() => import('./pages/public/ThankYou'));
const ProjectDetail = lazy(() => import('./pages/public/ProjectDetail'));
const Login = lazy(() => import('./pages/auth/Login'));
const AdminLayout = lazy(() => import('./layouts/AdminLayout'));
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const ProfileEditor = lazy(() => import('./pages/admin/ProfileEditor'));
const AboutEditor = lazy(() => import('./pages/admin/AboutEditor'));
const EducationManager = lazy(() => import('./pages/admin/EducationManager'));
const SkillsManager = lazy(() => import('./pages/admin/SkillsManager'));
const ProjectsManager = lazy(() => import('./pages/admin/ProjectsManager'));
const ExperienceManager = lazy(() => import('./pages/admin/ExperienceManager'));
const PublicationsManager = lazy(() => import('./pages/admin/PublicationsManager'));
const CertificationsManager = lazy(() => import('./pages/admin/CertificationsManager'));
const AchievementsManager = lazy(() => import('./pages/admin/AchievementsManager'));
const FAQsManager = lazy(() => import('./pages/admin/FAQsManager'));
const TeamManager = lazy(() => import('./pages/admin/TeamManager'));
const SocialLinksManager = lazy(() => import('./pages/admin/SocialLinksManager'));
const ContactMessages = lazy(() => import('./pages/admin/ContactMessages'));
const NavigationManager = lazy(() => import('./pages/admin/NavigationManager'));
const AppearanceEditor = lazy(() => import('./pages/admin/AppearanceEditor'));
const AnimationsEditor = lazy(() => import('./pages/admin/AnimationsEditor'));
const SeoEditor = lazy(() => import('./pages/admin/SeoEditor'));
const SettingsEditor = lazy(() => import('./pages/admin/SettingsEditor'));
const NotFound = lazy(() => import('./pages/public/NotFound'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<FullScreenLoader />}>
        <Routes>
          {/* Public */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
          </Route>

          {/* Auth (no registration anywhere) */}
          <Route path="/login" element={<Login />} />

          {/* Protected admin CMS */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="profile" element={<ProfileEditor />} />
            <Route path="about" element={<AboutEditor />} />
            <Route path="education" element={<EducationManager />} />
            <Route path="skills" element={<SkillsManager />} />
            <Route path="projects" element={<ProjectsManager />} />
            <Route path="experience" element={<ExperienceManager />} />
            <Route path="publications" element={<PublicationsManager />} />
            <Route path="certifications" element={<CertificationsManager />} />
            <Route path="achievements" element={<AchievementsManager />} />
            <Route path="faqs" element={<FAQsManager />} />
            <Route path="team" element={<TeamManager />} />
            <Route path="social-links" element={<SocialLinksManager />} />
            <Route path="contact-messages" element={<ContactMessages />} />
            <Route path="navigation" element={<NavigationManager />} />
            <Route path="appearance" element={<AppearanceEditor />} />
            <Route path="animations" element={<AnimationsEditor />} />
            <Route path="seo" element={<SeoEditor />} />
            <Route path="settings" element={<SettingsEditor />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}
