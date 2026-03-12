'use client';

import OrgChartHero from './OrgChartHero';
import EmployeeProblemSection from './EmployeeProblemSection';
import EmployeeTierSelector from './EmployeeTierSelector';
import EmployeeChatDemo from './EmployeeChatDemo';
import CostComparison from './CostComparison';

export default function AIEmployeesPage() {
  return (
    <>
      <OrgChartHero />
      <EmployeeProblemSection />
      <EmployeeTierSelector />
      <EmployeeChatDemo />
      <CostComparison />
    </>
  );
}
