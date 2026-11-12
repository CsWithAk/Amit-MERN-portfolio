import { Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navigation from '../components/layout/Navigation';
import Footer from '../components/layout/Footer';
import BackToTop from '../components/layout/BackToTop';
import { useSettings } from '../context/SettingsContext';
import useFetch from '../hooks/useFetch';
import publicApi from '../services/publicApi';

// Shared chrome for all public pages. Loads profile, navigation and social
// links once and passes them to the header/footer, plus live SEO metadata.
export default function PublicLayout() {
  const { settings, seo } = useSettings();
  const { data: profile } = useFetch(publicApi.profile, []);
  const { data: navigation } = useFetch(publicApi.navigation, []);
  const { data: socialLinks } = useFetch(publicApi.socialLinks, []);

  const title = seo?.pageTitle || settings?.portfolioName || 'Portfolio';

  return (
    <>
      <Helmet>
        <html lang="en" className="dark" />
        <title>{title}</title>
        {seo?.metaDescription && <meta name="description" content={seo.metaDescription} />}
        {seo?.keywords && <meta name="keywords" content={seo.keywords} />}
        {seo?.author && <meta name="author" content={seo.author} />}
        {settings?.favicon && <link rel="icon" href={settings.favicon} />}
        {seo?.ogImage && <meta property="og:image" content={seo.ogImage} />}
        <meta property="og:title" content={seo?.ogTitle || title} />
        {(seo?.ogDescription || seo?.metaDescription) && (
          <meta property="og:description" content={seo.ogDescription || seo.metaDescription} />
        )}
        <meta property="og:type" content="website" />
        {seo?.twitterCard && <meta name="twitter:card" content={seo.twitterCard} />}
        {seo?.canonicalUrl && <link rel="canonical" href={seo.canonicalUrl} />}
        {seo?.robots && <meta name="robots" content={seo.robots} />}
      </Helmet>

      <Navigation profile={profile} navigation={navigation || []} />

      <main className="pt-24">
        <Outlet context={{ profile, navigation: navigation || [], socialLinks: socialLinks || [] }} />
      </main>

      <Footer
        profile={profile}
        navigation={navigation || []}
        socialLinks={socialLinks || []}
        settings={settings}
      />
      <BackToTop />
    </>
  );
}
