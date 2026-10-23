import { Metadata } from 'next';
import css from './StructurePage.module.css';
import StructurePageClient from '@/components/pages/StructurePageClient/StructurePage.Client';

export const metadata: Metadata = {
  title: 'StructurePage',
};

export default function StructurePage() {
  return (
    <div className={css.page}>
      <main className={css.main}>
        <StructurePageClient />
      </main>
    </div>
  );
}
