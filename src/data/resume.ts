// Single source of truth for site content. Edit here; components render from it.

export const profile = {
  name: 'Amanda Patricks',
  credential: 'PMP',
  headline: 'Senior Program & Portfolio Leader',
  tagline: 'I build the execution infrastructure that turns strategy into measurable outcomes.',
  location: 'Raleigh, NC',
  email: 'amanda.patricks@gmail.com',
  linkedin: 'https://www.linkedin.com/in/amandapatricks',
  github: 'https://github.com/Andy-PMP',
  resumePdf: '/Amanda-Patricks-Resume.pdf',
};

export const summary = [
  'Senior program and portfolio leader with 12+ years of experience building the execution infrastructure that turns strategy into measurable outcomes.',
  'At Apple, I progressed from Senior Program Manager to Manager — building PMO governance frameworks from scratch, delivering enterprise programs that saved tens of millions in annual OpEx, and operating at the executive level across engineering, finance, operations, and real estate at global scale. I’m equally effective as a strategic partner and a hands-on executor.',
  'I’m completing an M.S. in AI Engineering (August 2027), applying AI tools to program operations, reporting automation, and workflow design.',
];

export const stats = [
  { value: '12+', label: 'years leading programs' },
  { value: '25+', label: 'concurrent enterprise initiatives' },
  { value: '$50M', label: 'facilities transformation' },
  { value: '30+', label: 'facilities across 15+ global locations' },
  { value: '90%', label: 'fewer equipment shipping incidents' },
];

export const competencies = [
  'Enterprise Program & Portfolio Leadership',
  'PMO Governance & Framework Design',
  'Executive Reporting & Decision Support',
  'Cross-Functional Stakeholder Alignment',
  'Risk, Dependency & Escalation Management',
  'Budget & Financial Management',
  'Change Management & Adoption',
  'Vendor & Partner Management',
  'AI-Augmented Program Operations',
  'Team Leadership & PM Development',
];

export interface Role {
  title: string;
  dates: string;
  bullets: string[];
}

export interface Company {
  name: string;
  note?: string;
  roles: Role[];
}

export const experience: Company[] = [
  {
    name: 'Capital One',
    roles: [
      {
        title: 'Manager, Program Management',
        dates: 'May 2026 – Present',
        bullets: [
          'Lead cross-functional program management efforts supporting strategic transformation initiatives across Commercial Bank, Office of the President',
          'Built governance frameworks, operating rhythms, and KPI reporting infrastructure from scratch',
          'Develop executive reporting and dashboard communications for senior leadership',
          'Identified and socialized AI tool proposals spanning chat-based through agentic workflows to improve team capacity and operational effectiveness',
        ],
      },
    ],
  },
  {
    name: 'Apple',
    roles: [
      {
        title: 'Manager, Program Management',
        dates: 'October 2023 – May 2026',
        bullets: [
          'Led a team of program managers delivering 25+ concurrent, multi-million-dollar enterprise initiatives across global operations — maintaining full accountability for scope, schedule, budget, and delivery outcomes',
          'Built PMO governance framework from scratch — establishing planning artifacts, dependency tracking, risk management protocols, and executive reporting that scaled into a dedicated governance function',
          'Served as central delivery leader across a $50M facilities transformation — managing vendor accountability, integrated scheduling, and weekly executive status reporting from scope through closure',
          'Developed executive reporting program that transformed monthly updates into strategic engagements, delivering full portfolio visibility within executive time constraints and enabling informed decision-making',
          'Applied AI-driven automation to program operations — designing workflows that eliminated manual reporting overhead and accelerated executive reporting cycles',
          'Led, coached, and developed a team of program managers through hands-on mentorship and a structured rotation program now in its fifth year with one alumnus promoted to manager',
          'Founded and administered PM community of hundreds across the organization, running programming and a book club for four years',
        ],
      },
      {
        title: 'Senior Program Manager',
        dates: 'September 2019 – October 2023',
        bullets: [
          'Led multiyear enterprise program exiting and right-sizing 30+ facilities across 15+ global locations — coordinating cross-functional teams of 25–30 across engineering, finance, real estate, and operations, delivering tens of millions in annual OpEx savings',
          'Identified cross-program dependency between reactive infrastructure replacement and ML predictive maintenance initiative — facilitated data integration that produced a working predictive model and eliminated dedicated on-call support overhead',
          'Reduced heavy equipment shipping incidents by 90% through a cross-functional safety program combining engineering redesign and hands-on site training',
          'Eliminated overnight logistics shifts through pilot and implementation of automated equipment vending and locker systems — 80% of replacement parts now issued on demand',
          'Compressed a 90-day construction program to 30 days under active COVID-19 restrictions — doubling infrastructure build-out capacity and resolving a critical organizational bottleneck',
          'Built and scaled a structured PM rotation program — designing a rigorous three-month experience including formal training, hands-on delivery exposure, and a capstone project each participant owned independently',
        ],
      },
    ],
  },
  {
    name: 'CTG, Inc.',
    note: 'Lenovo Contractor',
    roles: [
      {
        title: 'Project Manager',
        dates: 'April 2018 – August 2019',
        bullets: [
          'Managed a $2M global programs portfolio coordinating across legal, finance, product, and field operations',
          'Built automated workflows to generate program metrics from raw data, eliminating manual reporting overhead and accelerating executive visibility into portfolio performance',
        ],
      },
    ],
  },
  {
    name: 'Qualys',
    roles: [
      {
        title: 'Technical Account Manager',
        dates: 'January 2017 – November 2017',
        bullets: [
          'Managed $2M+ renewal portfolio across 200 mid-market enterprise accounts, driving 20% upsell growth through strategic account planning and executive relationship management',
        ],
      },
    ],
  },
  {
    name: 'Cisco Systems',
    roles: [
      {
        title: 'Infrastructure Project Manager',
        dates: 'July 2015 – September 2016',
        bullets: [
          'Directed global deployment and decommission of cloud infrastructure across 7 sites in 4 countries, coordinating teams across multiple time zones',
          'Served as Scrum Master across distributed Agile teams, managing Kanban workflows, sprint ceremonies, and cross-team dependency resolution',
        ],
      },
      {
        title: 'Engagement Manager',
        dates: 'March 2012 – July 2015',
        bullets: [
          'Served as primary point of contact for 7 enterprise managed services accounts, managing stakeholder relationships, ensuring SLA compliance, and handling escalation and resolution',
          'Led organization-wide standardization of delivery templates, processes, and escalation workflows, creating a repeatable operating model that improved delivery consistency',
        ],
      },
    ],
  },
];

export const education = [
  {
    degree: 'M.S. in AI Engineering',
    school: 'Quantic School of Business and Technology',
    status: 'In progress · expected August 2027',
  },
  {
    degree: 'B.A. in Political Science',
    school: 'Mary Baldwin University',
  },
];

export const certifications = [
  { name: 'Project Management Professional (PMP)', issuer: 'Project Management Institute' },
  { name: 'Professional Scrum Master II (PSM II)', issuer: 'Scrum.org' },
  { name: 'Professional Scrum Product Owner I (PSPO I)', issuer: 'Scrum.org' },
  { name: 'SAFe Agilist', issuer: 'Scaled Agile' },
  { name: 'AWS Certified AI Practitioner', issuer: 'Amazon Web Services' },
];
