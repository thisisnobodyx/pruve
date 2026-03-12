'use client';

import OrgChartHero from './OrgChartHero';
import EmployeeChatDemo from './EmployeeChatDemo';
import EmployeeTierSelector from './EmployeeTierSelector';
import EmployeeProblemSection from './EmployeeProblemSection';
import CostComparison from './CostComparison';

export default function AIEmployeesPage() {
  return (
    <>
      {/* Section 1: Hero */}
      <OrgChartHero />
      {/* Section 2: How It Works */}
      <EmployeeChatDemo />
      {/* Section 3: The Three Roles */}
      <EmployeeTierSelector />
      {/* Section 4: Not a Chatbot */}
      <EmployeeProblemSection />
      {/* Section 5: Technology + Section 6: CTA */}
      <CostComparison />
    </>
  );
}
