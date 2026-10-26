'use client';
import css from './HomePageClient.module.css';
import About from './About/About';
import Hero from './Hero/Hero';
import PopularStoriesSection from './PopularStoriesSection/PopularStoriesSection';
import OurTravellers from './OurTravellers/OurTravellers';
import Join from './Join/Join';

export default function HomePageClient() {
  return (
    <div className={css.container}>
      <h1 className={css.homePageHeading} style={{ color: 'red' }}>
        HomePageClient
      </h1>
      <Hero />
      <About />
      <PopularStoriesSection />
      <OurTravellers />
      <Join />
    </div>
  );
}
