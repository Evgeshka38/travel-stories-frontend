'use client';
import { useQuery } from '@tanstack/react-query';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { getUsers } from '@/lib/api/clientApi';
import css from './HomePageClient.module.css';
import About from './About/About';
import Hero from './Hero/Hero';
import PopularStoriesSection from './PopularStoriesSection/PopularStoriesSection';
import OurTravellers from './OurTravellers/OurTravellers';
import Join from './Join/Join';

export default function HomePageClient() {
  const { data: user, isLoading } = useCurrentUser();

  const { data: travellers = [] } = useQuery({
    queryKey: ['travellers', 'home', 1, 4],
    queryFn: () => getUsers(1, 4),
  });

  return (
    <div className={css.container}>
      <h1 className={css.homePageHeading} style={{ color: 'red' }}>
        HomePageClient
      </h1>
      <Hero />
      <About />
      <PopularStoriesSection />
      <OurTravellers travellers={travellers} />
      
      {!isLoading && !user && <Join />}
    </div>
  );
}
