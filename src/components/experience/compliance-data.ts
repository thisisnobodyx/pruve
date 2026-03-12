/* ================================================================
   AI COMPLIANCE LIBRARY
   Industry-specific regulations, software, and AI operation models.
   Keyed by industry ID from the experience page.
   ================================================================ */

export interface ComplianceInfo {
  regulations: string[];
  regulatoryBodies: string[];
  compliantSoftware: { name: string; logo?: string }[];
  aiOperationModel: string;
  aiExamples: string[];
  restrictedTopics: string[];
  aiResponseRule: string;
}

/** Master compliance map — keyed by industry id */
export const complianceMap: Record<string, ComplianceInfo> = {

  /* ── Psychotherapy / Mental Health ── */
  psychotherapy: {
    regulations: ['HIPAA', 'PHIPA', 'PIPEDA'],
    regulatoryBodies: ['College of Registered Psychotherapists of Ontario'],
    compliantSoftware: [
      { name: 'Jane App' },
      { name: 'SimplePractice' },
      { name: 'TherapyNotes' },
      { name: 'TheraNest' },
      { name: 'Owl Practice' },
      { name: 'IntakeQ' },
      { name: 'Practice Better' },
      { name: 'Kareo' },
      { name: 'Luminello' },
      { name: 'TherapyAppointment' },
    ],
    aiOperationModel: 'AI performs operational tasks by logging into the clinic\'s HIPAA-compliant software.',
    aiExamples: ['Appointment scheduling', 'Intake reminders', 'Billing reminders', 'Waitlist management'],
    restrictedTopics: ['Diagnosis', 'Therapy notes', 'Treatment plans', 'Mental health evaluations'],
    aiResponseRule: 'Your therapist will review that information with you directly.',
  },

  /* ── Medical Clinics / Healthcare ── */
  medical: {
    regulations: ['HIPAA', 'PHIPA', 'PIPEDA'],
    regulatoryBodies: ['College of Physicians and Surgeons of Ontario'],
    compliantSoftware: [
      { name: 'Epic' },
      { name: 'Cerner' },
      { name: 'Athenahealth' },
      { name: 'Jane App' },
      { name: 'DrChrono' },
      { name: 'Kareo' },
      { name: 'AdvancedMD' },
      { name: 'eClinicalWorks' },
      { name: 'NextGen Healthcare' },
      { name: 'Practice Fusion' },
    ],
    aiOperationModel: 'AI logs into EMR systems to perform operational tasks. Patient records remain inside the EMR.',
    aiExamples: ['Appointment booking', 'Visit reminders', 'Patient intake coordination', 'Prescription refill reminders'],
    restrictedTopics: ['Diagnosis', 'Lab results', 'Medical records', 'Treatment decisions'],
    aiResponseRule: 'Your healthcare provider will discuss that with you during your visit.',
  },

  /* ── Dental Clinics ── */
  dental: {
    regulations: ['PHIPA', 'PIPEDA'],
    regulatoryBodies: ['Royal College of Dental Surgeons of Ontario'],
    compliantSoftware: [
      { name: 'Dentrix' },
      { name: 'Open Dental' },
      { name: 'Jane App' },
      { name: 'Curve Dental' },
      { name: 'Eaglesoft' },
      { name: 'Dentally' },
      { name: 'tab32' },
      { name: 'Denticon' },
      { name: 'ACE Dental' },
      { name: 'Dovetail' },
    ],
    aiOperationModel: 'AI schedules appointments and sends reminders. Patient dental records remain inside dental software.',
    aiExamples: ['Appointment scheduling', 'Recall reminders', 'Insurance verification follow-up', 'New patient intake'],
    restrictedTopics: ['Diagnosis', 'Treatment plans', 'X-ray results'],
    aiResponseRule: 'Your dentist will review that with you.',
  },

  /* ── Physiotherapy / Physical Therapy ── */
  physicaltherapy: {
    regulations: ['PHIPA', 'PIPEDA'],
    regulatoryBodies: ['College of Physiotherapists of Ontario'],
    compliantSoftware: [
      { name: 'Jane App' },
      { name: 'ClinicMaster' },
      { name: 'PhysiTec' },
      { name: 'Cliniko' },
      { name: 'Practice Perfect' },
      { name: 'ClinicSense' },
      { name: 'PT Everywhere' },
      { name: 'WebPT' },
      { name: 'BetterPT' },
      { name: 'Heno' },
    ],
    aiOperationModel: 'AI schedules therapy sessions and manages reminders. Medical data remains inside clinic systems.',
    aiExamples: ['Session booking', 'Exercise reminders', 'Follow-up scheduling', 'Insurance claim notifications'],
    restrictedTopics: ['Treatment recommendations', 'Diagnosis', 'Therapy notes'],
    aiResponseRule: 'Your physiotherapist will review that during your session.',
  },

  /* ── Chiropractor ── */
  chiropractor: {
    regulations: ['PHIPA', 'PIPEDA'],
    regulatoryBodies: ['College of Chiropractors of Ontario'],
    compliantSoftware: [
      { name: 'Jane App' },
      { name: 'ChiroTouch' },
      { name: 'ECLIPSE' },
      { name: 'Platinum System' },
      { name: 'Genesis Chiropractic' },
      { name: 'ChiroFusion' },
      { name: 'Cliniko' },
      { name: 'ClinicSense' },
      { name: 'DrChrono' },
      { name: 'Noterro' },
    ],
    aiOperationModel: 'AI handles scheduling and patient communication. Clinical records remain in practice software.',
    aiExamples: ['Appointment scheduling', 'Visit reminders', 'New patient onboarding', 'Billing follow-up'],
    restrictedTopics: ['Diagnosis', 'Treatment plans', 'X-ray interpretation'],
    aiResponseRule: 'Your chiropractor will review that with you at your appointment.',
  },

  /* ── Dermatologist ── */
  dermatologist: {
    regulations: ['HIPAA', 'PHIPA', 'PIPEDA'],
    regulatoryBodies: ['College of Physicians and Surgeons of Ontario'],
    compliantSoftware: [
      { name: 'ModMed' },
      { name: 'EMA by Modernizing Medicine' },
      { name: 'DrChrono' },
      { name: 'Nextech' },
      { name: 'Athenahealth' },
      { name: 'Jane App' },
      { name: 'DermEngine' },
      { name: 'PatientNow' },
      { name: 'Kareo' },
      { name: 'AdvancedMD' },
    ],
    aiOperationModel: 'AI manages appointments and reminders. Patient records and images remain in EMR.',
    aiExamples: ['Appointment booking', 'Follow-up reminders', 'Intake coordination', 'Waitlist management'],
    restrictedTopics: ['Diagnosis', 'Biopsy results', 'Treatment prescriptions'],
    aiResponseRule: 'Your dermatologist will discuss that with you during your visit.',
  },

  /* ── Optometrist ── */
  optometrist: {
    regulations: ['PHIPA', 'PIPEDA'],
    regulatoryBodies: ['College of Optometrists of Ontario'],
    compliantSoftware: [
      { name: 'Crystal PM' },
      { name: 'RevolutionEHR' },
      { name: 'My Vision Express' },
      { name: 'Compulink' },
      { name: 'MaximEyes' },
      { name: 'DrChrono' },
      { name: 'Jane App' },
      { name: 'OfficeMate' },
      { name: 'Eyefinity' },
      { name: 'Optify' },
    ],
    aiOperationModel: 'AI handles bookings and reminders. Patient vision records remain in practice management systems.',
    aiExamples: ['Eye exam scheduling', 'Annual recall reminders', 'Contact lens reorder reminders', 'Insurance follow-up'],
    restrictedTopics: ['Diagnosis', 'Prescription details', 'Treatment recommendations'],
    aiResponseRule: 'Your optometrist will review that with you.',
  },

  /* ── Pharmacy ── */
  pharmacy: {
    regulations: ['PHIPA', 'PIPEDA', 'Drug and Pharmacies Regulation Act'],
    regulatoryBodies: ['Ontario College of Pharmacists'],
    compliantSoftware: [
      { name: 'Kroll' },
      { name: 'McKesson Pharmaclick' },
      { name: 'PioneerRx' },
      { name: 'QS/1' },
      { name: 'BestRx' },
      { name: 'Liberty Software' },
      { name: 'Rx30' },
      { name: 'Computer-Rx' },
      { name: 'VoiceTech' },
      { name: 'Cerner Etreby' },
    ],
    aiOperationModel: 'AI handles reminders and customer communication. Prescription data remains in pharmacy systems.',
    aiExamples: ['Refill reminders', 'Pickup notifications', 'Flu shot booking', 'General inquiries'],
    restrictedTopics: ['Drug interactions', 'Dosage advice', 'Medical recommendations'],
    aiResponseRule: 'Your pharmacist will review that information with you.',
  },

  /* ── Veterinary ── */
  vet: {
    regulations: ['Veterinarians Act', 'PIPEDA'],
    regulatoryBodies: ['College of Veterinarians of Ontario'],
    compliantSoftware: [
      { name: 'IDEXX Neo' },
      { name: 'Cornerstone' },
      { name: 'Shepherd' },
      { name: 'eVetPractice' },
      { name: 'Digitail' },
      { name: 'Instinct' },
      { name: 'Covetrus Pulse' },
      { name: 'VetBadger' },
      { name: 'Provet Cloud' },
      { name: 'AVImark' },
    ],
    aiOperationModel: 'AI handles scheduling and reminders. Pet medical records remain in veterinary software.',
    aiExamples: ['Appointment scheduling', 'Vaccination reminders', 'Follow-up notifications', 'New client intake'],
    restrictedTopics: ['Diagnosis', 'Treatment plans', 'Test results'],
    aiResponseRule: 'Your veterinarian will review that with you.',
  },

  /* ── Law Firms ── */
  lawfirm: {
    regulations: ['Solicitor-client privilege', 'Legal confidentiality obligations'],
    regulatoryBodies: ['Law Society of Ontario'],
    compliantSoftware: [
      { name: 'Clio' },
      { name: 'MyCase' },
      { name: 'PracticePanther' },
      { name: 'Smokeball' },
      { name: 'Filevine' },
      { name: 'CosmoLex' },
      { name: 'Rocket Matter' },
      { name: 'Litify' },
      { name: 'Actionstep' },
      { name: 'AbacusLaw' },
    ],
    aiOperationModel: 'AI supports administrative tasks. Legal documents remain inside practice management systems.',
    aiExamples: ['Consultation scheduling', 'Document reminders', 'Client intake', 'Follow-up communication'],
    restrictedTopics: ['Legal advice', 'Case details', 'Litigation strategy'],
    aiResponseRule: 'A lawyer from our firm will review that with you.',
  },

  /* ── Accounting Firms ── */
  accounting: {
    regulations: ['Income Tax Act', 'CPA professional standards'],
    regulatoryBodies: ['CPA Ontario', 'CPA Canada'],
    compliantSoftware: [
      { name: 'QuickBooks' },
      { name: 'Xero' },
      { name: 'Sage' },
      { name: 'TaxCycle' },
      { name: 'FreshBooks' },
      { name: 'Wave' },
      { name: 'Caseware' },
      { name: 'TaxPrep' },
      { name: 'Karbon' },
      { name: 'Canopy' },
    ],
    aiOperationModel: 'AI supports document collection and client communication. Financial data remains inside accounting software.',
    aiExamples: ['Document collection reminders', 'Appointment scheduling', 'Tax deadline notifications', 'Client onboarding'],
    restrictedTopics: ['Tax strategy', 'Financial advice', 'Audit conclusions'],
    aiResponseRule: 'Your accountant will review that information with you.',
  },

  /* ── Financial Advisors ── */
  financial: {
    regulations: ['Securities regulations', 'KYC requirements', 'AML regulations'],
    regulatoryBodies: ['Ontario Securities Commission', 'Financial Services Regulatory Authority of Ontario'],
    compliantSoftware: [
      { name: 'Wealthbox' },
      { name: 'Redtail' },
      { name: 'AdvisorEngine' },
      { name: 'Salesforce Financial Cloud' },
      { name: 'Orion' },
      { name: 'Morningstar' },
      { name: 'RightCapital' },
      { name: 'MoneyGuidePro' },
      { name: 'eMoney Advisor' },
      { name: 'Riskalyze' },
    ],
    aiOperationModel: 'AI manages CRM activities. Investment data remains inside the financial CRM.',
    aiExamples: ['Meeting scheduling', 'Document reminders', 'Client communication', 'Review appointment follow-up'],
    restrictedTopics: ['Investment advice', 'Portfolio analysis', 'Financial predictions'],
    aiResponseRule: 'Your advisor will review that during your meeting.',
  },

  /* ── Real Estate ── */
  realestate: {
    regulations: ['Real Estate and Business Brokers Act'],
    regulatoryBodies: ['Real Estate Council of Ontario'],
    compliantSoftware: [
      { name: 'Lone Wolf' },
      { name: 'Follow Up Boss' },
      { name: 'BoomTown' },
      { name: 'kvCORE' },
      { name: 'LionDesk' },
      { name: 'Real Geeks' },
      { name: 'Chime' },
      { name: 'Sierra Interactive' },
      { name: 'Wise Agent' },
      { name: 'Top Producer' },
    ],
    aiOperationModel: 'AI manages lead follow-up and appointment scheduling. Transaction records remain inside brokerage software.',
    aiExamples: ['Lead follow-up', 'Showing scheduling', 'Open house promotion', 'Client nurturing'],
    restrictedTopics: ['Property pricing advice', 'Contract interpretation', 'Legal real estate advice'],
    aiResponseRule: 'A licensed real estate agent will review that with you.',
  },

  /* ── Insurance Brokers ── */
  insurance: {
    regulations: ['Insurance Act'],
    regulatoryBodies: ['Financial Services Regulatory Authority of Ontario'],
    compliantSoftware: [
      { name: 'Applied Epic' },
      { name: 'Vertafore' },
      { name: 'BrokerEdge' },
      { name: 'HawkSoft' },
      { name: 'NowCerts' },
      { name: 'AgencyBloc' },
      { name: 'EZLynx' },
      { name: 'QQCatalyst' },
      { name: 'AMS360' },
      { name: 'Jenesis' },
    ],
    aiOperationModel: 'AI assists with policy renewal reminders and client communication. Insurance policy data remains inside management software.',
    aiExamples: ['Policy renewal reminders', 'Client follow-up', 'Quote request intake', 'Claims status notifications'],
    restrictedTopics: ['Coverage recommendations', 'Claim advice', 'Policy interpretation'],
    aiResponseRule: 'Your insurance broker will review the details with you.',
  },

  /* ── Spa / Wellness ── */
  spa: {
    regulations: ['Consumer Protection Act', 'PIPEDA'],
    regulatoryBodies: ['Ontario Ministry of Government and Consumer Services'],
    compliantSoftware: [
      { name: 'Mindbody' },
      { name: 'Vagaro' },
      { name: 'Booker' },
      { name: 'Zenoti' },
      { name: 'Fresha' },
      { name: 'Mangomint' },
      { name: 'GlossGenius' },
      { name: 'Boulevard' },
      { name: 'Phorest' },
      { name: 'Square Appointments' },
    ],
    aiOperationModel: 'AI manages booking and client communication. Client preferences and records stay in spa software.',
    aiExamples: ['Appointment booking', 'Membership reminders', 'Promotion announcements', 'Rebooking follow-up'],
    restrictedTopics: ['Medical advice', 'Skin condition diagnosis'],
    aiResponseRule: 'Your esthetician will discuss your treatment plan with you.',
  },

  /* ── Hair Salon ── */
  hairsalon: {
    regulations: ['Consumer Protection Act', 'PIPEDA'],
    regulatoryBodies: ['Ontario Ministry of Government and Consumer Services'],
    compliantSoftware: [
      { name: 'Vagaro' },
      { name: 'Fresha' },
      { name: 'Square Appointments' },
      { name: 'GlossGenius' },
      { name: 'Boulevard' },
      { name: 'Mangomint' },
      { name: 'Phorest' },
      { name: 'Schedulicity' },
      { name: 'Booksy' },
      { name: 'Salon Iris' },
    ],
    aiOperationModel: 'AI handles scheduling and reminders. Client history stays in salon software.',
    aiExamples: ['Appointment booking', 'Rebooking reminders', 'Promotion messages', 'New client intake'],
    restrictedTopics: [],
    aiResponseRule: 'Your stylist will discuss that with you at your appointment.',
  },

  /* ── Nail Salon ── */
  nailsalon: {
    regulations: ['Consumer Protection Act', 'PIPEDA'],
    regulatoryBodies: ['Ontario Ministry of Government and Consumer Services'],
    compliantSoftware: [
      { name: 'Vagaro' },
      { name: 'Fresha' },
      { name: 'Square Appointments' },
      { name: 'GlossGenius' },
      { name: 'Booksy' },
      { name: 'Schedulicity' },
      { name: 'Mangomint' },
      { name: 'Acuity Scheduling' },
      { name: 'Salon Iris' },
      { name: 'DaySmart Salon' },
    ],
    aiOperationModel: 'AI handles booking and reminders. Client records stay in salon software.',
    aiExamples: ['Appointment booking', 'Rebooking reminders', 'Walk-in waitlist', 'Promotion messages'],
    restrictedTopics: [],
    aiResponseRule: 'Your nail technician will discuss that at your appointment.',
  },

  /* ── Gym / Fitness ── */
  gym: {
    regulations: ['Consumer Protection Act', 'PIPEDA'],
    regulatoryBodies: ['Ontario Ministry of Government and Consumer Services'],
    compliantSoftware: [
      { name: 'Mindbody' },
      { name: 'Wodify' },
      { name: 'Zen Planner' },
      { name: 'GymMaster' },
      { name: 'Glofox' },
      { name: 'PushPress' },
      { name: 'ClubReady' },
      { name: 'ABC Fitness' },
      { name: 'TeamUp' },
      { name: 'Exercise.com' },
    ],
    aiOperationModel: 'AI manages class bookings and member communication. Membership data stays in gym software.',
    aiExamples: ['Class booking', 'Membership renewal reminders', 'New member onboarding', 'Promo announcements'],
    restrictedTopics: ['Medical fitness advice', 'Injury diagnosis'],
    aiResponseRule: 'A certified trainer will discuss your fitness plan with you.',
  },

  /* ── Daycare / Childcare ── */
  daycare: {
    regulations: ['Child Care and Early Years Act', 'PIPEDA'],
    regulatoryBodies: ['Ontario Ministry of Education'],
    compliantSoftware: [
      { name: 'HiMama' },
      { name: 'Brightwheel' },
      { name: 'Procare' },
      { name: 'Kangarootime' },
      { name: 'Lillio' },
      { name: 'Famly' },
      { name: 'Sandbox Childcare' },
      { name: 'ChildPilot' },
      { name: 'EZChildTrack' },
      { name: 'myKidzDay' },
    ],
    aiOperationModel: 'AI handles parent communication and scheduling. Child records remain in childcare management software.',
    aiExamples: ['Enrollment inquiries', 'Schedule reminders', 'Payment reminders', 'Waitlist updates'],
    restrictedTopics: ['Child assessments', 'Developmental evaluations', 'Health records'],
    aiResponseRule: 'Your child\'s caregiver will discuss that with you directly.',
  },
};

/* ── Universal rule (shown for all industries) ── */
export const universalRule = {
  title: 'Universal AI Compliance',
  rules: [
    'AI never stores regulated information',
    'AI operates through your compliant system',
    'Your system remains the system of record',
    'Professional decisions remain with licensed professionals',
  ],
  operationalTasks: [
    'Scheduling',
    'Reminders',
    'Intake coordination',
    'Marketing',
    'Communication',
  ],
};
