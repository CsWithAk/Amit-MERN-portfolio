/**
 * Content migration checklist — genuine data extracted from the original
 * portfolio/index.html. Nothing here is invented; links/descriptions are
 * preserved exactly as they appeared (including imperfect links) and remain
 * editable through the admin CMS.
 */

const PROFILE = {
  key: 'profile',
  name: 'Amit Kumar',
  logoText: 'CsWithAk',
  designation: 'B.Tech CSE (Final Year) Student',
  roles: [
    'Youtuber',
    'Video Editor',
    'Graphic Designer',
    'Frontend Developer',
    'Backend Developer',
    'Java Developer',
    'Python Programmer',
  ],
  tagline: 'I create digital experiences that are functional, beautiful, and user-friendly.',
  heroIntro:
    'I create digital experiences that are functional, beautiful, and user-friendly.',
  image: 'https://uploads.onecompiler.io/437pmbpya/1784997619776/Amit_Img%5B1%5D.jpg',
  resumeUrl: 'https://drive.google.com/uc?export=download&id=1mNN0qh7ZaXYeLF_YMohWAxaJRBqrphkD',
  companyUrl: 'https://stackamit.netlify.app',
  companyLabel: 'My Company',
  email: 'amitkumarmjl22@gmail.com',
  phone: '+91 9031580441',
  location: 'Jaipur Rajasthan, India',
  availability: 'Open to learning, collaboration, and new opportunities',
};

const ABOUT = {
  key: 'about',
  heading: 'About Me',
  subtitle: '',
  biography: [
    "I'm Amit Kumar, a B.Tech CSE (final year) student at Jagannath University, Jaipur, passionate about building real-world tech solutions. I work with Python, Web Development, Data Analysis, and Networking, and believe in learning through hands-on projects. Curiosity, consistency, and problem-solving drive my growth in the tech field.",
    "Currently, I'm deepening my skills in Data Science, AI-based applications, and Full Stack Development. I enjoy collaborating on meaningful projects and simplifying complex concepts for better understanding. Always open to learning, collaboration, and new opportunities in the tech ecosystem.",
  ],
  interests: ['Software Development', 'Data Science', 'Artificial Intelligence', 'Web Development', 'Networking'],
  statistics: [
    { label: 'Years Experience', value: 0, suffix: '+' },
    { label: 'Projects Completed', value: 40, suffix: '+' },
    { label: 'Happy Clients', value: 5, suffix: '+' },
    { label: 'Awards Won', value: 2, suffix: '' },
  ],
  images: ['https://uploads.onecompiler.io/437pmbpya/1784997619776/Amit_Img%5B1%5D.jpg'],
};

const EDUCATION = [
  {
    category: 'education',
    title: 'Bachelor of Computer Science & Engineering',
    institution: 'Jagannath University, Jaipur',
    dateDisplay: '2023 - 2027',
    description:
      'Computer Science and Engineering (CSE), covering programming, data structures, web technologies, and data analysis.',
    certificateUrl: 'https://drive.google.com/',
    order: 1,
  },
  {
    category: 'education',
    title: 'Senior Secondary (ISc)',
    institution: 'R. L. S. Y. College, Bettiah',
    dateDisplay: '2021 - 2023',
    description:
      'In my Sr. Secondary education, I pursued ISC (Physics, Chemistry, Mathematics, English, and Hindi), developing a solid base in science and mathematics.',
    certificateUrl: 'https://drive.google.com/',
    order: 2,
  },
  {
    category: 'education',
    title: 'Secondary',
    institution: 'Kamal Prasad H.S. Inarwa Bazar, Mainatan',
    dateDisplay: '2020 - 2021',
    description:
      'In my 10th grade, I completed my secondary education under the Bihar School Examination Board (BSEB), achieving a strong foundation across all core subjects.',
    certificateUrl: 'https://drive.google.com/',
    order: 3,
  },
  { category: 'course', title: 'Data Analysis course', institution: 'Google', dateDisplay: '2025', description: 'Currently working on it.', certificateUrl: 'https://drive.google.com/', order: 10 },
  { category: 'course', title: 'Python Programming', institution: 'GeeksForGeeks', dateDisplay: '2025', description: 'Learn Python programming fundamentals with basic to advance levels and solved basic or easy problems.', certificateUrl: 'https://drive.google.com/', order: 11 },
  { category: 'course', title: 'Microsoft Excel', institution: 'Analytics Vidhya', dateDisplay: '2025', description: 'Learn Microsoft excel fundamentals, formulas and some advanced features.', certificateUrl: 'https://drive.google.com/', order: 12 },
  { category: 'course', title: 'Python Programming', institution: 'Data Flair', dateDisplay: '2025', description: 'Learn Python programming fundamentals with basic to advance levels.', certificateUrl: 'https://drive.google.com/', order: 13 },
  { category: 'course', title: 'Data Analytics Job Simulation', institution: 'Deloitte', dateDisplay: '2025', description: 'Learn data analytics concepts and tools used in the industry.', certificateUrl: 'https://drive.google.com/', order: 14 },
  { category: 'course', title: 'Technology Job Simulation', institution: 'Deloitte', dateDisplay: '2025', description: 'Learn about new technologies which currently used in tech industries.', certificateUrl: 'https://drive.google.com/', order: 15 },
  { category: 'course', title: 'Indian Knoledge System', institution: 'NPTEL', dateDisplay: '2024', description: 'Learn about ancient Indian knowledge systems.', certificateUrl: 'https://drive.google.com/', order: 16 },
  { category: 'course', title: 'Diploma/Certificate in Computer', institution: 'N-IT Computer Education Center, Gurgaon', dateDisplay: '2023', description: 'Learn about Microsoft office Advance tools, Typing practice and softwares.', certificateUrl: 'https://drive.google.com/', order: 17 },
  { category: 'course', title: 'Kushal Yuva Program', institution: 'BSDM Majhaulia', dateDisplay: '2022', description: 'Learn about Microsoft office basics tools and softwares.', certificateUrl: 'https://drive.google.com/', order: 18 },
  { category: 'course', title: 'Computer Hardware course', institution: 'Learnvern', dateDisplay: '2022', description: 'Learn about computer hardware.', certificateUrl: 'https://drive.google.com/', order: 19 },
  { category: 'course', title: 'Spoken English course', institution: 'Learnvern', dateDisplay: '2022', description: 'Learn English grammar and worked to speak in English.', certificateUrl: 'https://drive.google.com/', order: 20 },
];

const EXPERIENCE = [
  { position: 'Web Development Intern', organization: 'SAM AI Technologies', employmentType: 'internship', dateDisplay: 'June 2026', description: 'During this internship i worked on 3 web developement projects. Here i created a portfolio project, a To-Do List app, and a music player application. Also gained hands-on experience in web developemtn fields.', certificateUrl: 'https://drive.google.com/', order: 1 },
  { position: 'Python Programming Intern', organization: 'Infosys Springboard', employmentType: 'internship', dateDisplay: 'Nov/2025 - Jan/2026', description: 'Worked on Python programming projects. Created a real word project named "CrowdCound Prople Detection" using video analysis project. And gained hands-on experience.', certificateUrl: 'https://drive.google.com/', order: 2 },
  { position: 'Introduction to Cyber Security', organization: 'Cisco Networking Academy', employmentType: 'internship', dateDisplay: 'Summer 2025', description: 'Learn basics of computer security. and gained hands-on experience.', certificateUrl: 'https://drive.google.com/', order: 3 },
  { position: 'Networking Intern', organization: 'Cisco Networking Academy', employmentType: 'internship', dateDisplay: 'Summer 2025', description: 'Worked on Computer networks. Developed a "University Network Management Project". and gained hands-on experience.', certificateUrl: 'https://drive.google.com/', order: 4 },
  { position: 'Foundation of AI', organization: 'Edunet Foundation', employmentType: 'internship', dateDisplay: 'Summer 2025', description: 'Learn about Arificial Intelligence basics.', certificateUrl: 'https://drive.google.com/', order: 5 },
  { position: 'Data Analysis using AI-LLMS', organization: 'Connecting Dreams Foundation', employmentType: 'internship', dateDisplay: 'winter 2024', description: 'Learn about core of data analysis and created some projects using Python libraries Pandas, numpy, matplotlib, seaborn.', certificateUrl: 'https://drive.google.com/', order: 6 },
  { position: 'AI with Data Analysis', organization: 'Edunet Foundation', employmentType: 'internship', dateDisplay: 'winter 2024', description: 'Learn about core of data analysis and created some projects using Python libraries Pandas, numpy, matplotlib, seaborn.', certificateUrl: 'https://drive.google.com/', order: 7 },
  { position: 'Web development', organization: 'Edunet Foundation', employmentType: 'internship', dateDisplay: 'Summer 2024', description: 'Learn web development fundamentals. Created a major project named "Flipkart Clone" using HTML, CSS, and JavaScript. And gained hands-on experience.', certificateUrl: 'https://drive.google.com/', order: 8 },
  { position: 'Python Essantials', organization: 'Cisco Networking Academy', employmentType: 'internship', dateDisplay: 'Summer 2024', description: 'Learn about core of Python programming. Created a some projects and gained hands-on experience.', certificateUrl: 'https://drive.google.com/', order: 9 },
];

// Courses and internship credentials belong in Certifications, not Journey.
// Keep this derived from the original content so the migration stays complete.
const CERTIFICATIONS = [
  ...EDUCATION.filter((item) => item.category === 'course').map((item, index) => ({
    title: item.title,
    issuer: item.institution,
    dateDisplay: item.dateDisplay,
    description: item.description,
    certificateUrl: item.certificateUrl,
    order: index + 1,
  })),
  ...EXPERIENCE.filter((item) => item.employmentType === 'internship').map((item, index) => ({
    title: item.position,
    issuer: item.organization,
    dateDisplay: item.dateDisplay,
    description: item.description,
    certificateUrl: item.certificateUrl,
    order: index + EDUCATION.filter((entry) => entry.category === 'course').length + 1,
  })),
];

const SKILLS = [
  // Programming
  { category: 'Programming', name: 'Python', icon: 'python', order: 1 },
  { category: 'Programming', name: 'Java', icon: 'java', order: 2 },
  { category: 'Programming', name: 'C', icon: 'c', order: 3 },
  { category: 'Programming', name: 'C++', icon: 'cpp', order: 4 },
  { category: 'Programming', name: 'SQL', icon: 'sql', order: 5 },
  // Frontend Development (chip order matches the reference: React, Tailwind, HTML, CSS, JS)
  { category: 'Frontend Development', name: 'React', icon: 'react', order: 1 },
  { category: 'Frontend Development', name: 'Tailwind CSS', icon: 'tailwind', order: 2 },
  { category: 'Frontend Development', name: 'HTML', icon: 'html5', order: 3 },
  { category: 'Frontend Development', name: 'CSS', icon: 'css3', order: 4 },
  { category: 'Frontend Development', name: 'JavaScript', icon: 'javascript', order: 5 },
  // Backend Development
  { category: 'Backend Development', name: 'Node.js', icon: 'nodejs', order: 1 },
  { category: 'Backend Development', name: 'Express.js', icon: 'express', order: 2 },
  { category: 'Backend Development', name: 'REST APIs', icon: 'rest', order: 3 },
  // Databases
  { category: 'Databases', name: 'MongoDB', icon: 'mongodb', order: 1 },
  { category: 'Databases', name: 'MySQL', icon: 'mysql', order: 2 },
  { category: 'Databases', name: 'Firebase', icon: 'firebase', order: 3 },
  // AI & Data Analytics
  { category: 'AI & Data Analytics', name: 'Power BI', icon: 'powerbi', order: 1 },
  { category: 'AI & Data Analytics', name: 'YOLO', icon: 'yolo', order: 2 },
  { category: 'AI & Data Analytics', name: 'OpenCV', icon: 'opencv', order: 3 },
  { category: 'AI & Data Analytics', name: 'LLM APIs', icon: 'llm', order: 4 },
  // Tools & Platforms (chip order matches the reference: Git, GitHub, VS Code, Figma, Linux, Canva)
  { category: 'Tools & Platforms', name: 'Git', icon: 'git', order: 1 },
  { category: 'Tools & Platforms', name: 'GitHub', icon: 'github', order: 2 },
  { category: 'Tools & Platforms', name: 'VS Code', icon: 'vscode', order: 3 },
  { category: 'Tools & Platforms', name: 'Figma', icon: 'figma', order: 4 },
  { category: 'Tools & Platforms', name: 'Linux', icon: 'linux', order: 5 },
  { category: 'Tools & Platforms', name: 'Canva', icon: 'canva', order: 6 },
];

const PROJECTS = [
  {
    title: 'ObjectIQ An AI powered Human and Weapon Detection System',
    slug: 'objectiq-ai-powered-human-and-weapon-detection-system',
    description:
      'An AI-powered Human and Weapon Detection system with Hardware and software configuration. It able to track and detect multiple people and weapon with supessious activity also send email notification with alert on admin email.',
    image: 'https://uploads.onecompiler.io/437pmbpya/1781844380429/OBJECTIQ%20Dashboard.png',
    technologies: ['HTML:5', 'CSS', 'Java Script', 'Python', 'MongoDB Atlas', 'YOLO model', 'Deep SORT algorithm', 'Weapon Detection Model'],
    category: 'AI / Computer Vision',
    githubUrl: 'https://github.com/CsWithAk/Object_IQ.git',
    liveUrl: '',
    featured: true,
    order: 1,
  },
  {
    title: 'CrowdCount People Counting Project',
    slug: 'crowdcount-people-counting-project',
    description:
      'Developed during the Infosys Springboard Internship 6.0, this project is an AI-powered intelligent surveillance system designed for real-time crowd monitoring and public safety. It leverages YOLOv8n for accurate human detection, DeepSORT for multi-object tracking, OpenCV for video processing, and a Flask-based web application built with HTML, CSS, and JavaScript for interactive visualization. The system provides features such as real-time people counting, multi-zone occupancy analysis, dynamic heatmap visualization, threshold-based crowd alerts, secure role-based authentication (Admin and Public User), live analytics, and CSV/PDF report generation.',
    image: 'https://uploads.onecompiler.io/437pmbpya/1785085252425/crowdcount%20dashboard.png',
    technologies: ['HTML:5', 'CSS', 'Java Script'],
    category: 'AI / Computer Vision',
    githubUrl: 'https://github.com/CsWithAk/Flipkart-clone.git',
    liveUrl: 'https://cswithak.github.io/Flipkart-clone/',
    featured: false,
    order: 2,
  },
  {
    title: 'Flipkart Clone project',
    slug: 'flipkart-clone-project',
    description:
      'This project named Flipkart clone created using HTML, CSS, JS in frontend development internship at Edunet Foundation.',
    image: 'https://uploads.onecompiler.io/449h3d4jy/449h3e2mj/Flipkart_clone_project.jpg',
    technologies: ['HTML:5', 'CSS', 'Java Script'],
    category: 'Web Development',
    githubUrl: 'https://github.com/CsWithAk/Flipkart-clone.git',
    liveUrl: 'https://cswithak.github.io/Flipkart-clone/',
    featured: false,
    order: 3,
  },
  {
    title: 'CRUD Application',
    slug: 'crud-application',
    description:
      'CRUD application using Django-Python and HTML, css. The project used MySQL workbench for database. Fully functional with user registration, Login and dahboard page. This project is working in all type of devices.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    technologies: ['Python', 'Django', 'HTML:5', 'CSS'],
    category: 'Web Development',
    githubUrl: 'https://github.com/CsWithAk/CRUD_Application.git',
    liveUrl: '',
    featured: false,
    order: 4,
  },
];

const PUBLICATIONS = [
  {
    type: 'Review Paper',
    yearDisplay: 'May-2026',
    title: "Study on Language Barrier in Healthcare: A Literature-based Study for Improving Patients' Communication",
    authors: 'Amit Kumar, Dr. Renu Bagoria',
    publication: 'Presented at 4th ICESSM-2026 and sent for Publications.',
    abstract:
      "This review paper investigates how language barriers affect communication between patients and healthcare providers, particularly among migrant and multilingual populations. Through an extensive analysis of existing literature, the study identifies key challenges such as misdiagnosis, delayed treatment, medication errors, and reduced patient satisfaction caused by ineffective communication. It also evaluates current solutions, including medical interpreter services and translation technologies, while highlighting their limitations. Furthermore, the paper explores the potential of Artificial Intelligence, machine translation, multilingual healthcare applications, and automated communication systems to enhance healthcare accessibility.",
    doi: '',
    pdfUrl: '',
    order: 1,
  },
  {
    type: 'Research Paper',
    yearDisplay: 'Jun-2026',
    title: 'ObjectIQ: AI-Powered Smart Surveillance System for Human and Weapon Detection',
    authors: 'Amit Kumar, Dr. Renu Bagoria',
    publication: 'Published at International Journal of Scientific Research & Management (IJSREM)',
    abstract:
      'Published a research paper on OBJECTIQ, an AI-powered intelligent surveillance system that integrates YOLOv8, Computer Vision, Flask, MongoDB Atlas, and IoT technologies to enhance real-time security monitoring. The system supports crowd counting, weapon detection, suspicious activity detection, and multi-source video input (Webcam, Video, RTMP). It features automated email alerts with captured images, role-based dashboards, PDF/CSV report generation, and Arduino-based hardware alerts, demonstrating a scalable and practical solution for smart surveillance applications.',
    doi: 'https://www.doi.org/10.55041/IJSREM65287',
    pdfUrl: 'https://ijsrem.com/download/ai-powered-smart-surveillance-system-for-human-and-weapon-detection-system',
    order: 2,
  },
  {
    type: 'Research Paper',
    yearDisplay: 'July-2026',
    title: 'Real-Time Intelligent Crowd Monitoring and Multi-Zone People Counting System Using YOLOv8n and DeepSORT',
    authors: 'Amit Kumar, Dr. Renu Bagoria',
    publication: 'Under Review in Springer Nature.',
    abstract:
      'This research presents an AI-powered intelligent surveillance framework designed to improve public safety through real-time crowd monitoring and occupancy analysis. The proposed system integrates YOLOv8n for human detection, DeepSORT for multi-object tracking, OpenCV for video processing, and a Flask-based web dashboard for live analytics. It provides features such as multi-zone people counting, heatmap visualization, threshold-based crowd alerts, secure role-based authentication, and automated CSV/PDF report generation.',
    doi: '',
    pdfUrl: '',
    order: 3,
  },
];

const FAQS = [
  {
    question: 'What is your primary technical stack?',
    answer:
      'My primary stack is MongoDB, Express.js, React, and Node.js (MERN), supported by REST APIs, Git, responsive UI development, and modern deployment workflows.',
    order: 1,
  },
  {
    question: 'Are you available for internships or freelance roles?',
    answer:
      'Yes. I am open to suitable internships, freelance projects, and collaborative roles where I can contribute to web development, data-driven products, or intelligent systems.',
    order: 2,
  },
  {
    question: 'How do you ensure clean, maintainable code structures?',
    answer:
      'I break features into focused modules, use consistent naming and reusable components, validate inputs, keep business logic separated, and use Git-based iteration with testing and documentation where appropriate.',
    order: 3,
  },
  {
    question: 'Do you have experience working with cloud or intelligent systems?',
    answer:
      'Yes. I have worked with cloud-hosted databases and deployment workflows, along with intelligent systems involving computer vision, machine learning integrations, real-time monitoring, and automated alerts.',
    order: 4,
  },
];

const ACADEMIC_PROFILES = [
  { platform: 'ResearchGate', url: 'https://www.researchgate.net/profile/Amit-Kumar-1039', icon: 'researchgate', order: 1 },
  { platform: 'Google Scholar', url: 'https://scholar.google.com/citations?user=viy7zPkAAAAJ&hl=en', icon: 'google-scholar', order: 2 },
  { platform: 'ORCID', url: 'https://orcid.org/', icon: 'orcid', order: 3 },
  { platform: 'SSRN', url: 'https://hq.ssrn.com/', icon: 'ssrn', order: 4 },
];

const TEAM = [
  {
    name: 'Amit Kumar',
    designation: 'Full Stack Developer',
    image: 'https://uploads.onecompiler.io/449h3d4jy/449hbt85b/Amit_img.jpg',
    biography: '',
    social: [
      { platform: 'linkedin', url: 'https://linkedin.com/in/CsWithAk/' },
      { platform: 'github', url: 'https://github.com/CsWithAk' },
      { platform: 'youtube', url: 'https://www.youtube.com/@CsWithAk' },
      { platform: 'twitter', url: 'https://x.com/CsWithAk' },
    ],
    order: 1,
  },
  {
    name: 'Amit Kumar',
    designation: 'UI/UX Designer',
    image: 'https://uploads.onecompiler.io/437pmbpya/437pm67q8/Amit%201.jpg.jpg',
    biography: '',
    social: [
      { platform: 'linkedin', url: 'https://linkedin.com/in/CsWithAk/' },
      { platform: 'github', url: 'https://github.com/CsWithAk' },
      { platform: 'youtube', url: 'https://www.youtube.com/@CsWithAk' },
      { platform: 'twitter', url: 'https://x.com/CsWithAk' },
    ],
    order: 2,
  },
  {
    name: 'Amit Kumar',
    designation: 'Data Analyst',
    image: 'https://uploads.onecompiler.io/449h3d4jy/449hbt85b/Amit_img.jpg',
    biography: '',
    social: [
      { platform: 'linkedin', url: 'https://linkedin.com/in/CsWithAk/' },
      { platform: 'github', url: 'https://github.com/CsWithAk' },
      { platform: 'youtube', url: 'https://www.youtube.com/@CsWithAk' },
      { platform: 'twitter', url: 'https://x.com/CsWithAk' },
    ],
    order: 3,
  },
];

const SOCIAL_LINKS = [
  { platform: 'GitHub', url: 'https://github.com/CsWithAk', icon: 'github', order: 1 },
  { platform: 'LinkedIn', url: 'https://linkedin.com/in/CsWithAk/', icon: 'linkedin', order: 2 },
  { platform: 'YouTube', url: 'https://www.youtube.com/@CsWithAk', icon: 'youtube', order: 3 },
  { platform: 'Twitter', url: 'https://x.com/CsWithAk', icon: 'twitter', order: 4 },
  { platform: 'Instagram', url: 'https://www.instagram.com/cswithak', icon: 'instagram', order: 5 },
  { platform: 'Facebook', url: 'https://facebook.com/cswithak', icon: 'facebook', order: 6 },
];

const NAVIGATION = [
  { label: 'Home', target: '#home', sectionKey: 'home', order: 1 },
  { label: 'About', target: '#about', sectionKey: 'about', order: 2 },
  { label: 'Journey', target: '#journey', sectionKey: 'journey', order: 3 },
  { label: 'Skills', target: '#skills', sectionKey: 'skills', order: 4 },
  { label: 'Projects', target: '#projects', sectionKey: 'projects', order: 5 },
  { label: 'Experience', target: '#experience', sectionKey: 'experience', order: 6 },
  { label: 'Certifications', target: '#certifications', sectionKey: 'certifications', order: 7 },
  { label: 'Publications', target: '#publications', sectionKey: 'publications', order: 8 },
  { label: 'FAQ', target: '#faq', sectionKey: 'faq', order: 9 },
  { label: 'Contact', target: '#contact', sectionKey: 'contact', order: 10 },
];

const SITE_SETTINGS = {
  key: 'settings',
  portfolioName: "Amit's Portfolio",
  logo: 'https://uploads.onecompiler.io/449h3d4jy/449hbt85b/Amit_img.jpg',
  favicon: 'https://uploads.onecompiler.io/449h3d4jy/449hbt85b/Amit_img.jpg',
  contactEmail: 'amitkumarmjl22@gmail.com',
  footerContent: "© 2026 Amit's Portfolio. All rights reserved. | Designed and developed with CsWithAk",
  copyrightText: "© 2026 Amit's Portfolio. All rights reserved.",
  appearance: {
    theme: 'dark',
    primaryColor: '#8B5CF6',
    secondaryColor: '#38BDF8',
    accentColor: '#A78BFA',
    background: '#080B14',
    secondaryBackground: '#101626',
    cardBackground: '#141D30',
    primaryText: '#F8FAFC',
    secondaryText: '#94A3B8',
    borderColor: 'rgba(148,163,184,0.15)',
    fontFamily: 'Poppins',
    borderRadius: 16,
    cardStyle: 'glass',
  },
  animation: {
    multiCursorEnabled: false,
    cursorActors: 3,
    intensity: 'medium',
    typingSpeed: 60,
    revealSpeed: 600,
    reducedMotion: false,
    sectionAnimations: true,
  },
  seo: {
    pageTitle: 'Amit Kumar | Portfolio',
    metaDescription:
      'Amit Kumar — B.Tech CSE student, developer and researcher. Portfolio showcasing skills, projects, internships, and publications.',
    keywords: 'Amit Kumar, CsWithAk, MERN Developer, Data Analysis, AI, Portfolio',
    ogImage: 'https://uploads.onecompiler.io/437pmbpya/1784997619776/Amit_Img%5B1%5D.jpg',
    author: 'Amit Kumar',
    ogTitle: 'Amit Kumar | Portfolio',
    ogDescription:
      'Amit Kumar — B.Tech CSE student, developer and researcher. Portfolio showcasing skills, projects, internships, and publications.',
    twitterCard: 'summary_large_image',
    canonicalUrl: '',
    robots: 'index, follow',
  },
};

module.exports = {
  PROFILE,
  ABOUT,
  EDUCATION,
  EXPERIENCE,
  CERTIFICATIONS,
  SKILLS,
  PROJECTS,
  PUBLICATIONS,
  FAQS,
  ACADEMIC_PROFILES,
  TEAM,
  SOCIAL_LINKS,
  NAVIGATION,
  SITE_SETTINGS,
};
