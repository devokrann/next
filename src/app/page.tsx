import React from 'react';

import LayoutBody from '@/components/layout/body';
import NavbarMain from '@/components/layout/navbars/main';
import FooterMain from '@/components/layout/footers/main';
import LayoutSection from '@/components/layout/section';
import CardCtaNewsletter from '@/components/common/cards/cta/newsletter';
import LayoutBarMain from '@/components/layout/bars/main';

import AffixTop from '@/components/common/affixi/top';
import AffixNavbar from '@/components/common/affixi/navbar';

export default function Home() {
  return (
    <LayoutBody
      bar={<LayoutBarMain />}
      nav={<NavbarMain />}
      footer={<FooterMain />}
    >
      <main>
        <LayoutSection id={'page-home'} margined>
          Home page
        </LayoutSection>

        <LayoutSection id={'page-home-newsletter'} margined>
          <CardCtaNewsletter />
        </LayoutSection>
      </main>

      <AffixTop />
      <AffixNavbar />
    </LayoutBody>
  );
}
