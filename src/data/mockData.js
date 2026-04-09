import inst1 from '../assets/Images/inst1.jpg';
import inst2 from '../assets/Images/inst2.jpg';
import inst3 from '../assets/Images/inst3.jpg';
import inst4 from '../assets/Images/inst4.jpg';
import inst5 from '../assets/Images/inst5.jpg';
import inst6 from '../assets/Images/inst6.jpg';
import inst7 from '../assets/Images/inst7.jpg';


// ─── Sri Lanka Subjects ───────────────────────────────────────────────
export const SL_SUBJECTS = {
  ol_and_lower: [
    "Mathematics", "Science", "English", "ICT"
  ],
  al_stream_science: [
    "Combine Mathematics", "Physics", "Chemistry", "Biology"
  ],
  al_stream_technology: [
    "Science for Technology", "Engineering Technology", "Bio Systems Technology", "Information Communication Technology (ICT)"
  ],
  al_stream_commerce: [
    "Economics", "Business Studies", "Accounting", "Business Statistics"
  ]
};

export const ALL_SUBJECTS = [
  "Mathematics", "Science", "English", "ICT",
  "Combine Mathematics", "Physics", "Chemistry", "Biology",
  "Science for Technology", "Engineering Technology", "Bio Systems Technology", "Information Communication Technology (ICT)",
  "Economics", "Business Studies", "Accounting", "Business Statistics"
];

export const SESSION_TYPES = [
  { id: "paper", label: "Paper Discussion", icon: "📄", desc: "Go through past papers & MCQs together" },
  { id: "theory", label: "Theory Class", icon: "📖", desc: "In-depth explanation of concepts & topics" },
  { id: "mixed", label: "Mixed Session", icon: "🔄", desc: "Theory followed by practice questions" },
];

export const DURATIONS = [
  { label: "30 minutes", value: 30, price_factor: 0.5 },
  { label: "1 hour", value: 60, price_factor: 1 },
  { label: "2 hours", value: 120, price_factor: 2 },
];

export const GRADE_CATEGORIES = [
  {
    id: "grade6-9",
    label: "Grade 6 – 9",
    description: "Middle school level",
    color: "from-violet-500 to-purple-600",
    matchedInstructorLevels: ["al-student"],
  },
  {
    id: "grade10-11",
    label: "Grade 10 – 11 (O/L)",
    description: "GCE Ordinary Level",
    color: "from-blue-500 to-cyan-500",
    matchedInstructorLevels: ["al-student"],
  },
  {
    id: "grade12-13",
    label: "Grade 12 – 13 (A/L)",
    description: "GCE Advanced Level",
    color: "from-emerald-500 to-teal-500",
    matchedInstructorLevels: ["undergraduate"],
  },
];

export const INSTRUCTOR_LEVELS = [
  {
    id: "al-student",
    label: "GCE A/L Student",
    description: "High-performing A/L student who can guide O/L & Grade 6–9 students",
    color: "from-amber-500 to-orange-500",
  },
  {
    id: "undergraduate",
    label: "Undergraduate",
    description: "University student who excelled in A/L — guides A/L students",
    color: "from-rose-500 to-pink-500",
  },
];

// ─── Mock Instructors ─────────────────────────────────────────────────
export const mockInstructors = [
  // --- A/L Instructors (5) ---
  {
    id: 1,
    name: "Kavindi Perera",
    level: "undergraduate",
    institution: "University of Colombo — Faculty of Science",
    alResults: "3A's — Combine Mathematics, Physics, Chemistry",
    zScore: "2.1476",
    district: "Colombo",
    subjects: ["Combine Mathematics", "Physics", "Chemistry"],
    sessionTypes: ["paper", "theory", "mixed"],
    pricePerHour: 1500,
    rating: 4.9,
    reviewCount: 38,
    studentsHelped: 42,
    bio: "First-year student at University of Colombo. Scored island rank 12 in the 2023 A/L exam. Passionate about breaking down tough Combine Mathematics problems into simple steps.",
    availability: ["Mon", "Wed", "Fri", "Sat"],
    avatar: inst1,
    badge: "🏆 Island Rank 12",
  },
  {
    id: 2,
    name: "Tharindu Rajapaksha",
    level: "undergraduate",
    institution: "University of Peradeniya — Engineering",
    alResults: "3A's — Mathematics, Physics, Chemistry",
    zScore: "2.2104",
    district: "Kandy",
    subjects: ["Combine Mathematics", "Physics", "Engineering Technology"],
    sessionTypes: ["theory", "mixed"],
    pricePerHour: 1600,
    rating: 4.8,
    reviewCount: 45,
    studentsHelped: 50,
    bio: "Engineering undergraduate at UoP. Scored island rank 8 in 2023 A/L. My teaching style focuses on understanding the 'why' behind every formula.",
    availability: ["Tue", "Thu", "Sat", "Sun"],
    avatar: inst2,
    badge: "🏆 Island Rank 8",
  },
  {
    id: 3,
    name: "Sachini Fernando",
    level: "undergraduate",
    institution: "University of Sri Jayewardenepura — Management",
    alResults: "3A's — Economics, Business, Accounting",
    zScore: "2.0122",
    district: "Colombo",
    subjects: ["Economics", "Business Studies", "Accounting"],
    sessionTypes: ["paper", "mixed"],
    pricePerHour: 1450,
    rating: 4.9,
    reviewCount: 44,
    studentsHelped: 53,
    bio: "2nd year Management undergrad. I specialize in making Economics relatable to A/L students with real-world Sri Lankan examples.",
    availability: ["Mon", "Wed", "Fri"],
    avatar: inst3,
    badge: "🏆 Dist. Rank 3",
  },
  {
    id: 4,
    name: "Dinusha Wickramasinghe",
    level: "al-student",
    institution: "Royal College, Colombo",
    alResults: "9A's in GCE O/L",
    zScore: null,
    district: "Gampaha",
    subjects: ["Economics", "Business Studies", "Accounting", "Business Statistics"],
    sessionTypes: ["paper", "theory"],
    pricePerHour: 700,
    rating: 4.8,
    reviewCount: 29,
    studentsHelped: 35,
    bio: "A/L Commerce student with a passion for explaining financial concepts. Helped 35+ students with O/L commerce paper discussions.",
    availability: ["Wed", "Thu", "Sat", "Sun"],
    avatar: inst4,
    badge: "⭐ Commerce Scholar",
  },
  {
    id: 5,
    name: "Kavindu Bandara",
    level: "al-student",
    institution: "Nalanda College, Colombo",
    alResults: "8A's 1B in GCE O/L",
    zScore: null,
    district: "Colombo",
    subjects: ["Combine Mathematics", "Physics", "Chemistry", "Information Communication Technology (ICT)"],
    sessionTypes: ["theory", "paper"],
    pricePerHour: 750,
    rating: 4.9,
    reviewCount: 51,
    studentsHelped: 60,
    bio: "Physics enthusiast. I help students visualize complex mechanisms using real-world intuition rather than memorization.",
    availability: ["Tue", "Fri", "Sat", "Sun"],
    avatar: inst5,
    badge: "⭐ Top Physics Tutor",
  },
  // --- O/L Instructors (2) ---
  {
    id: 6,
    name: "Nethmi Amarasinghe",
    level: "al-student",
    institution: "Visakha Vidyalaya, Colombo",
    alResults: "9A's in GCE O/L",
    zScore: null,
    district: "Colombo",
    subjects: ["Science", "English"],
    sessionTypes: ["theory", "mixed"],
    pricePerHour: 650,
    rating: 4.7,
    reviewCount: 21,
    studentsHelped: 28,
    bio: "Specializing in O/L preparation. I enjoy helping Grade 6-11 students understand science and english in a fun, relatable way.",
    availability: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    avatar: inst6,
    badge: "⭐ Top Science Student",
  },
  {
    id: 7,
    name: "Janith Silva",
    level: "undergraduate",
    institution: "UCSC",
    alResults: "3A's — ICT, Physics, Combined Maths",
    zScore: "2.1102",
    district: "Gampaha",
    subjects: ["Mathematics", "ICT"],
    sessionTypes: ["paper", "theory"],
    pricePerHour: 1500,
    rating: 4.9,
    reviewCount: 15,
    studentsHelped: 40,
    bio: "Undergraduate IT student. I specialize in teaching O/L Mathematics and ICT, bringing tricky concepts to life with easy examples.",
    availability: ["Sat", "Sun"],
    avatar: inst7,
    badge: "🏆 Top Math Tutor",
  }
];

// ─── Mock Sessions (for dashboards) ──────────────────────────────────
export const mockStudentSessions = [
  {
    id: "s1",
    instructorId: 1,
    instructorName: "Kavindi Perera",
    subject: "Combine Mathematics",
    sessionType: "paper",
    date: "2026-04-12",
    time: "10:00 AM",
    duration: 60,
    status: "CONFIRMED",
    meetingChannel: "peerclass-s1-kavindi",
    priceTotal: 800,
  },
  {
    id: "s2",
    instructorId: 3,
    instructorName: "Nethmi Amarasinghe",
    subject: "Biology",
    sessionType: "theory",
    date: "2026-04-14",
    time: "3:00 PM",
    duration: 60,
    status: "PENDING",
    meetingChannel: "peerclass-s2-nethmi",
    priceTotal: 600,
  },
  {
    id: "s3",
    instructorId: 2,
    instructorName: "Tharindu Rajapaksha",
    subject: "Physics",
    sessionType: "mixed",
    date: "2026-04-10",
    time: "5:00 PM",
    duration: 120,
    status: "COMPLETED",
    meetingChannel: "peerclass-s3-tharindu",
    priceTotal: 1800,
  },
];

export const mockInstructorRequests = [
  {
    id: "r1",
    studentName: "Amaya Silva",
    studentGrade: "grade12-13",
    subject: "Combine Mathematics",
    sessionType: "paper",
    requestedDate: "2026-04-12",
    requestedTime: "10:00 AM",
    duration: 60,
    notes: "I need help with integration by parts — I keep getting stuck on the limits.",
    status: "PENDING",
  },
  {
    id: "r2",
    studentName: "Ruwini Jayawardena",
    studentGrade: "grade12-13",
    subject: "Physics",
    sessionType: "theory",
    requestedDate: "2026-04-13",
    requestedTime: "4:00 PM",
    duration: 60,
    notes: "Electromagnetism — specifically electromagnetic induction. Very confused.",
    status: "PENDING",
  },
  {
    id: "r3",
    studentName: "Hasara Bandara",
    studentGrade: "grade12-13",
    subject: "Chemistry",
    sessionType: "paper",
    requestedDate: "2026-04-15",
    requestedTime: "2:00 PM",
    duration: 90,
    notes: "2023 A/L Chemistry paper — section B questions only.",
    status: "CONFIRMED",
  },
];
