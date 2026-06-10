import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { 
  MapPin, 
  Briefcase, 
  DollarSign, 
  Clock, 
  Building2,
  Globe,
  Home,
  Monitor,
  ArrowLeft,
  Bookmark,
  BookmarkCheck,
  Share2,
  Calendar,
  CheckCircle,
  Users,
  X,
  FileText,
  Mail,
  Phone,
  User,
  Edit3,
  Upload,
  Award,
} from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { useAuth } from '../context/AuthContext'

const CURRENCY_SYMBOLS = {
  INR: '₹', USD: '$', GBP: '£', EUR: '€', AED: 'AED',
  SGD: 'S$', AUD: 'A$', CAD: 'C$', JPY: '¥', BRL: 'R$',
  ZAR: 'R', SAR: 'SR', NZD: 'NZ$'
}

const ALL_JOBS = [
  { id: 1, title: "Senior React Developer", company_name: "Zoho Corporation", location: "Chennai, Tamil Nadu, India", is_remote: true, is_hybrid: false, is_onsite: false, job_type: "full_time", experience_level: "senior", category: "Technology", salary_min: 1200000, salary_max: 1800000, salary_currency: "INR", status: "published", views_count: 245, applications_count: 18, skills: [{id:1,name:"React"},{id:2,name:"TypeScript"},{id:3,name:"Node.js"},{id:4,name:"GraphQL"}], is_saved: false, created_at: "2026-06-08T10:00:00Z", expires_at: "2026-07-08T10:00:00Z", description: "We are looking for a Senior React Developer to join our team. You will be responsible for building scalable web applications using React, TypeScript, and Node.js.", requirements: ["5+ years of experience with React", "Strong TypeScript skills", "Experience with GraphQL and Node.js", "Bachelor's degree in Computer Science or related field"], responsibilities: ["Develop and maintain web applications", "Collaborate with cross-functional teams", "Write clean, maintainable code", "Mentor junior developers"] },
  { id: 2, title: "Full Stack Engineer", company_name: "Freshworks", location: "Chennai, Tamil Nadu, India", is_remote: false, is_hybrid: true, is_onsite: false, job_type: "full_time", experience_level: "mid", category: "Technology", salary_min: 900000, salary_max: 1400000, salary_currency: "INR", status: "published", views_count: 189, applications_count: 12, skills: [{id:5,name:"Python"},{id:6,name:"Django"},{id:7,name:"React"},{id:8,name:"PostgreSQL"}], is_saved: false, created_at: "2026-06-07T14:30:00Z", expires_at: "2026-07-07T14:30:00Z", description: "Join Freshworks as a Full Stack Engineer. Work on cutting-edge products used by millions worldwide.", requirements: ["3+ years of full stack development", "Proficiency in Python and Django", "Experience with React and PostgreSQL"], responsibilities: ["Build end-to-end features", "Optimize application performance", "Participate in code reviews"] },
  { id: 3, title: "UI/UX Designer", company_name: "DesignStudio Pro", location: "Coimbatore, Tamil Nadu, India", is_remote: true, is_hybrid: false, is_onsite: false, job_type: "full_time", experience_level: "mid", category: "Design", salary_min: 450000, salary_max: 800000, salary_currency: "INR", status: "published", views_count: 203, applications_count: 25, skills: [{id:13,name:"Figma"},{id:14,name:"Adobe XD"},{id:15,name:"CSS"},{id:16,name:"Prototyping"}], is_saved: false, created_at: "2026-06-05T16:00:00Z", expires_at: "2026-07-05T16:00:00Z", description: "DesignStudio Pro is seeking a creative UI/UX Designer to craft beautiful user experiences.", requirements: ["3+ years of UI/UX design experience", "Proficiency in Figma and Adobe XD", "Strong portfolio demonstrating design skills"], responsibilities: ["Create wireframes and prototypes", "Conduct user research", "Collaborate with developers"] },
  { id: 4, title: "Graphic Designer", company_name: "Creative Agency", location: "Salem, Tamil Nadu, India", is_remote: true, is_hybrid: false, is_onsite: false, job_type: "freelance", experience_level: "mid", category: "Design", salary_min: 250000, salary_max: 500000, salary_currency: "INR", status: "published", views_count: 267, applications_count: 34, skills: [{id:57,name:"Photoshop"},{id:58,name:"Illustrator"},{id:59,name:"InDesign"},{id:60,name:"Branding"}], is_saved: false, created_at: "2026-06-06T14:00:00Z", expires_at: "2026-07-06T14:00:00Z", description: "Looking for a talented Graphic Designer for freelance projects. Create stunning visuals for our clients.", requirements: ["Proficiency in Adobe Creative Suite", "Strong portfolio", "Ability to meet deadlines"], responsibilities: ["Design marketing materials", "Create brand identities", "Collaborate with clients"] },
  { id: 5, title: "Nurse Practitioner", company_name: "Apollo Hospitals", location: "Madurai, Tamil Nadu, India", is_remote: false, is_hybrid: false, is_onsite: true, job_type: "full_time", experience_level: "senior", category: "Healthcare", salary_min: 400000, salary_max: 700000, salary_currency: "INR", status: "published", views_count: 123, applications_count: 15, skills: [{id:61,name:"Patient Care"},{id:62,name:"Diagnosis"},{id:63,name:"Prescription"},{id:64,name:"EMR"}], is_saved: false, created_at: "2026-06-05T08:00:00Z", expires_at: "2026-07-05T08:00:00Z", description: "Apollo Hospitals seeks an experienced Nurse Practitioner to provide high-quality patient care.", requirements: ["Master's degree in Nursing", "Valid nursing license", "5+ years of clinical experience"], responsibilities: ["Assess and diagnose patients", "Develop treatment plans", "Prescribe medications"] },
  { id: 6, title: "Teacher - Mathematics", company_name: "PSBB School", location: "Tiruchirappalli, Tamil Nadu, India", is_remote: false, is_hybrid: false, is_onsite: true, job_type: "part_time", experience_level: "entry", category: "Education", salary_min: 200000, salary_max: 350000, salary_currency: "INR", status: "published", views_count: 89, applications_count: 22, skills: [{id:65,name:"Teaching"},{id:66,name:"Curriculum"},{id:67,name:"Classroom"},{id:68,name:"Assessment"}], is_saved: false, created_at: "2026-06-04T10:00:00Z", expires_at: "2026-07-04T10:00:00Z", description: "PSBB School is hiring a part-time Mathematics Teacher for high school students.", requirements: ["Bachelor's degree in Mathematics", "Teaching certification", "Passion for education"], responsibilities: ["Prepare lesson plans", "Conduct classes", "Assess student performance"] },
  { id: 7, title: "Data Scientist", company_name: "Flipkart", location: "Bangalore, Karnataka, India", is_remote: false, is_hybrid: true, is_onsite: false, job_type: "full_time", experience_level: "senior", category: "Technology", salary_min: 2500000, salary_max: 4000000, salary_currency: "INR", status: "published", views_count: 178, applications_count: 15, skills: [{id:17,name:"Python"},{id:18,name:"Machine Learning"},{id:19,name:"SQL"},{id:20,name:"TensorFlow"}], is_saved: false, created_at: "2026-06-04T11:00:00Z", expires_at: "2026-07-04T11:00:00Z", description: "Flipkart is looking for a Data Scientist to drive data-driven decision making.", requirements: ["5+ years in data science", "Expertise in Python and ML", "Experience with TensorFlow"], responsibilities: ["Build predictive models", "Analyze large datasets", "Present insights to stakeholders"] },
  { id: 8, title: "Security Engineer", company_name: "Wipro", location: "Bangalore, Karnataka, India", is_remote: true, is_hybrid: false, is_onsite: false, job_type: "full_time", experience_level: "senior", category: "Technology", salary_min: 1800000, salary_max: 2800000, salary_currency: "INR", status: "published", views_count: 145, applications_count: 7, skills: [{id:37,name:"Penetration Testing"},{id:38,name:"SIEM"},{id:39,name:"Python"},{id:40,name:"Cloud Security"}], is_saved: false, created_at: "2026-05-30T09:00:00Z", expires_at: "2026-06-30T09:00:00Z", description: "Wipro needs a Security Engineer to protect our systems and data.", requirements: ["5+ years in cybersecurity", "Experience with SIEM tools", "Penetration testing skills"], responsibilities: ["Monitor security systems", "Conduct vulnerability assessments", "Respond to incidents"] },
  { id: 9, title: "HR Coordinator", company_name: "Infosys", location: "Mysore, Karnataka, India", is_remote: false, is_hybrid: true, is_onsite: false, job_type: "internship", experience_level: "entry", category: "Human Resources", salary_min: 150000, salary_max: 250000, salary_currency: "INR", status: "published", views_count: 145, applications_count: 38, skills: [{id:73,name:"Recruiting"},{id:74,name:"Onboarding"},{id:75,name:"HRIS"},{id:76,name:"Compliance"}], is_saved: false, created_at: "2026-06-02T09:00:00Z", expires_at: "2026-07-02T09:00:00Z", description: "Infosys offers an HR internship for fresh graduates interested in human resources.", requirements: ["Bachelor's degree in HR or related", "Strong communication skills", "Attention to detail"], responsibilities: ["Assist in recruitment", "Manage onboarding", "Maintain HR records"] },
  { id: 10, title: "Product Manager", company_name: "Jio Platforms", location: "Mumbai, Maharashtra, India", is_remote: true, is_hybrid: false, is_onsite: false, job_type: "full_time", experience_level: "senior", category: "Technology", salary_min: 2500000, salary_max: 4000000, salary_currency: "INR", status: "published", views_count: 198, applications_count: 22, skills: [{id:25,name:"Agile"},{id:26,name:"Product Strategy"},{id:27,name:"Analytics"},{id:28,name:"User Research"}], is_saved: false, created_at: "2026-06-02T10:00:00Z", expires_at: "2026-07-02T10:00:00Z", description: "Jio Platforms seeks a Product Manager to lead product development.", requirements: ["7+ years in product management", "Experience with Agile", "Strong analytical skills"], responsibilities: ["Define product roadmap", "Work with engineering teams", "Analyze market trends"] },
  { id: 11, title: "Backend Engineer (Go)", company_name: "Razorpay", location: "Pune, Maharashtra, India", is_remote: true, is_hybrid: false, is_onsite: false, job_type: "full_time", experience_level: "mid", category: "Technology", salary_min: 1200000, salary_max: 2000000, salary_currency: "INR", status: "published", views_count: 167, applications_count: 9, skills: [{id:29,name:"Go"},{id:30,name:"gRPC"},{id:31,name:"PostgreSQL"},{id:32,name:"Redis"}], is_saved: false, created_at: "2026-06-01T15:00:00Z", expires_at: "2026-07-01T15:00:00Z", description: "Razorpay is hiring a Backend Engineer proficient in Go.", requirements: ["3+ years with Go", "Experience with gRPC", "Database optimization skills"], responsibilities: ["Build microservices", "Optimize APIs", "Ensure system reliability"] },
  { id: 12, title: "Financial Analyst", company_name: "HDFC Bank", location: "Mumbai, Maharashtra, India", is_remote: false, is_hybrid: true, is_onsite: false, job_type: "full_time", experience_level: "entry", category: "Finance", salary_min: 600000, salary_max: 900000, salary_currency: "INR", status: "published", views_count: 198, applications_count: 32, skills: [{id:49,name:"Excel"},{id:50,name:"Financial Modeling"},{id:51,name:"SQL"},{id:52,name:"Python"}], is_saved: false, created_at: "2026-06-08T09:00:00Z", expires_at: "2026-07-08T09:00:00Z", description: "HDFC Bank needs a Financial Analyst for data-driven financial insights.", requirements: ["Bachelor's in Finance/Economics", "Proficiency in Excel", "Basic SQL knowledge"], responsibilities: ["Analyze financial data", "Create financial models", "Prepare reports"] },
  { id: 13, title: "Investment Banker", company_name: "ICICI Securities", location: "Mumbai, Maharashtra, India", is_remote: false, is_hybrid: false, is_onsite: true, job_type: "full_time", experience_level: "senior", category: "Finance", salary_min: 2500000, salary_max: 5000000, salary_currency: "INR", status: "published", views_count: 156, applications_count: 8, skills: [{id:53,name:"M&A"},{id:54,name:"Valuation"},{id:55,name:"Due Diligence"},{id:56,name:"Pitch Books"}], is_saved: false, created_at: "2026-06-07T11:00:00Z", expires_at: "2026-07-07T11:00:00Z", description: "ICICI Securities seeks an Investment Banker for M&A deals.", requirements: ["MBA in Finance", "5+ years in investment banking", "Strong financial modeling skills"], responsibilities: ["Lead M&A transactions", "Conduct valuations", "Prepare pitch books"] },
  { id: 14, title: "DevOps Engineer", company_name: "Microsoft India", location: "Hyderabad, Telangana, India", is_remote: true, is_hybrid: false, is_onsite: false, job_type: "contract", experience_level: "senior", category: "Technology", salary_min: 1800000, salary_max: 2800000, salary_currency: "INR", status: "published", views_count: 156, applications_count: 8, skills: [{id:9,name:"AWS"},{id:10,name:"Docker"},{id:11,name:"Kubernetes"},{id:12,name:"Terraform"}], is_saved: false, created_at: "2026-06-06T09:00:00Z", expires_at: "2026-07-06T09:00:00Z", description: "Microsoft India needs a DevOps Engineer for cloud infrastructure.", requirements: ["5+ years in DevOps", "AWS certification preferred", "Kubernetes expertise"], responsibilities: ["Manage CI/CD pipelines", "Optimize cloud infrastructure", "Ensure system uptime"] },
  { id: 15, title: "Machine Learning Engineer", company_name: "Amazon India", location: "Hyderabad, Telangana, India", is_remote: true, is_hybrid: false, is_onsite: false, job_type: "full_time", experience_level: "senior", category: "Technology", salary_min: 2500000, salary_max: 4500000, salary_currency: "INR", status: "published", views_count: 189, applications_count: 11, skills: [{id:41,name:"PyTorch"},{id:42,name:"TensorFlow"},{id:43,name:"MLOps"},{id:44,name:"Python"}], is_saved: false, created_at: "2026-05-29T14:00:00Z", expires_at: "2026-06-29T14:00:00Z", description: "Amazon India is hiring a Machine Learning Engineer to build intelligent systems.", requirements: ["5+ years in ML engineering", "Expertise in PyTorch and TensorFlow", "MLOps experience"], responsibilities: ["Build ML models", "Deploy to production", "Optimize model performance"] },
  { id: 16, title: "Technical Writer", company_name: "Tata Consultancy Services", location: "Kochi, Kerala, India", is_remote: true, is_hybrid: false, is_onsite: false, job_type: "contract", experience_level: "mid", category: "Technology", salary_min: 500000, salary_max: 800000, salary_currency: "INR", status: "published", views_count: 112, applications_count: 19, skills: [{id:45,name:"Technical Writing"},{id:46,name:"Markdown"},{id:47,name:"API Documentation"},{id:48,name:"Git"}], is_saved: false, created_at: "2026-05-28T10:00:00Z", expires_at: "2026-06-28T10:00:00Z", description: "TCS needs a Technical Writer to create clear documentation.", requirements: ["3+ years technical writing", "API documentation experience", "Git knowledge"], responsibilities: ["Write API docs", "Create user guides", "Maintain documentation"] },
  { id: 17, title: "Mobile Developer (React Native)", company_name: "UST Global", location: "Thiruvananthapuram, Kerala, India", is_remote: true, is_hybrid: false, is_onsite: false, job_type: "full_time", experience_level: "mid", category: "Technology", salary_min: 800000, salary_max: 1400000, salary_currency: "INR", status: "published", views_count: 134, applications_count: 10, skills: [{id:21,name:"React Native"},{id:22,name:"iOS"},{id:23,name:"Android"},{id:24,name:"Firebase"}], is_saved: false, created_at: "2026-06-03T13:00:00Z", expires_at: "2026-07-03T13:00:00Z", description: "UST Global is hiring a React Native developer for mobile apps.", requirements: ["3+ years React Native", "iOS and Android experience", "Firebase knowledge"], responsibilities: ["Build mobile apps", "Optimize performance", "Deploy to app stores"] },
  { id: 18, title: "Marketing Specialist", company_name: "Paytm", location: "New Delhi, Delhi, India", is_remote: false, is_hybrid: false, is_onsite: true, job_type: "full_time", experience_level: "entry", category: "Marketing", salary_min: 400000, salary_max: 700000, salary_currency: "INR", status: "published", views_count: 234, applications_count: 45, skills: [{id:33,name:"SEO"},{id:34,name:"Content Marketing"},{id:35,name:"Google Analytics"},{id:36,name:"Social Media"}], is_saved: false, created_at: "2026-05-31T11:00:00Z", expires_at: "2026-06-30T11:00:00Z", description: "Paytm needs a Marketing Specialist to drive growth.", requirements: ["Bachelor's in Marketing", "SEO knowledge", "Social media skills"], responsibilities: ["Run marketing campaigns", "Analyze metrics", "Manage social media"] },
  { id: 19, title: "Content Marketing Manager", company_name: "Ola", location: "Gurugram, Haryana, India", is_remote: true, is_hybrid: false, is_onsite: false, job_type: "full_time", experience_level: "mid", category: "Marketing", salary_min: 900000, salary_max: 1500000, salary_currency: "INR", status: "published", views_count: 178, applications_count: 19, skills: [{id:69,name:"Content Strategy"},{id:70,name:"SEO"},{id:71,name:"Analytics"},{id:72,name:"Copywriting"}], is_saved: false, created_at: "2026-06-03T13:00:00Z", expires_at: "2026-07-03T13:00:00Z", description: "Ola seeks a Content Marketing Manager to lead content strategy.", requirements: ["5+ years in content marketing", "SEO expertise", "Analytics skills"], responsibilities: ["Develop content strategy", "Manage content team", "Track performance"] },
  { id: 20, title: "Research Scientist", company_name: "BioTech Labs", location: "Kolkata, West Bengal, India", is_remote: false, is_hybrid: false, is_onsite: true, job_type: "full_time", experience_level: "senior", category: "Healthcare", salary_min: 800000, salary_max: 1400000, salary_currency: "INR", status: "published", views_count: 134, applications_count: 12, skills: [{id:77,name:"Research"},{id:78,name:"Lab"},{id:79,name:"Publications"},{id:80,name:"Grants"}], is_saved: false, created_at: "2026-06-01T11:00:00Z", expires_at: "2026-07-01T11:00:00Z", description: "BioTech Labs needs a Research Scientist for cutting-edge research.", requirements: ["PhD in Biology/Chemistry", "Publication record", "Grant writing experience"], responsibilities: ["Conduct research", "Publish findings", "Secure funding"] },
  { id: 21, title: "Civil Engineer", company_name: "Larsen & Toubro", location: "Ahmedabad, Gujarat, India", is_remote: false, is_hybrid: false, is_onsite: true, job_type: "full_time", experience_level: "mid", category: "Engineering", salary_min: 600000, salary_max: 1000000, salary_currency: "INR", status: "published", views_count: 145, applications_count: 15, skills: [{id:81,name:"AutoCAD"},{id:82,name:"Structural"},{id:83,name:"Project Mgmt"},{id:84,name:"STAAD"}], is_saved: false, created_at: "2026-06-05T09:00:00Z", expires_at: "2026-07-05T09:00:00Z", description: "L&T is hiring a Civil Engineer for infrastructure projects.", requirements: ["Bachelor's in Civil Engineering", "AutoCAD proficiency", "Project management skills"], responsibilities: ["Design structures", "Oversee construction", "Ensure safety compliance"] },
  { id: 22, title: "Hotel Manager", company_name: "Oberoi Hotels", location: "Jaipur, Rajasthan, India", is_remote: false, is_hybrid: false, is_onsite: true, job_type: "full_time", experience_level: "senior", category: "Hospitality", salary_min: 800000, salary_max: 1500000, salary_currency: "INR", status: "published", views_count: 112, applications_count: 8, skills: [{id:85,name:"Operations"},{id:86,name:"Guest Relations"},{id:87,name:"Revenue Mgmt"},{id:88,name:"Team Leadership"}], is_saved: false, created_at: "2026-06-04T10:00:00Z", expires_at: "2026-07-04T10:00:00Z", description: "Oberoi Hotels seeks an experienced Hotel Manager.", requirements: ["10+ years in hospitality", "Operations management", "Revenue management"], responsibilities: ["Oversee hotel operations", "Manage staff", "Ensure guest satisfaction"] },
  { id: 23, title: "Agricultural Scientist", company_name: "Punjab Agricultural University", location: "Ludhiana, Punjab, India", is_remote: false, is_hybrid: false, is_onsite: true, job_type: "full_time", experience_level: "senior", category: "Agriculture", salary_min: 700000, salary_max: 1200000, salary_currency: "INR", status: "published", views_count: 89, applications_count: 5, skills: [{id:89,name:"Crop Science"},{id:90,name:"Soil Analysis"},{id:91,name:"Research"},{id:92,name:"Data Analysis"}], is_saved: false, created_at: "2026-06-03T11:00:00Z", expires_at: "2026-07-03T11:00:00Z", description: "PAU needs an Agricultural Scientist for crop research.", requirements: ["PhD in Agriculture", "Crop science expertise", "Research experience"], responsibilities: ["Conduct crop research", "Analyze soil data", "Publish findings"] },
  { id: 24, title: "Mining Engineer", company_name: "Coal India", location: "Bhubaneswar, Odisha, India", is_remote: false, is_hybrid: false, is_onsite: true, job_type: "full_time", experience_level: "mid", category: "Engineering", salary_min: 900000, salary_max: 1600000, salary_currency: "INR", status: "published", views_count: 123, applications_count: 9, skills: [{id:93,name:"Mine Planning"},{id:94,name:"Safety"},{id:95,name:"Geology"},{id:96,name:"Equipment"}], is_saved: false, created_at: "2026-06-02T09:00:00Z", expires_at: "2026-07-02T09:00:00Z", description: "Coal India is hiring a Mining Engineer for operations.", requirements: ["Bachelor's in Mining Engineering", "Safety certifications", "Geology knowledge"], responsibilities: ["Plan mining operations", "Ensure safety", "Manage equipment"] },
  { id: 25, title: "Senior Software Architect", company_name: "Google", location: "Mountain View, California, USA", is_remote: true, is_hybrid: true, is_onsite: false, job_type: "full_time", experience_level: "senior", category: "Technology", salary_min: 180000, salary_max: 280000, salary_currency: "USD", status: "published", views_count: 245, applications_count: 18, skills: [{id:97,name:"System Design"},{id:98,name:"Cloud"},{id:99,name:"Leadership"},{id:100,name:"Go"}], is_saved: false, created_at: "2026-06-08T10:00:00Z", expires_at: "2026-07-08T10:00:00Z", description: "Google needs a Senior Software Architect for core systems.", requirements: ["10+ years in software engineering", "System design expertise", "Leadership experience"], responsibilities: ["Design system architecture", "Lead technical decisions", "Mentor engineers"] },
  { id: 26, title: "AI Research Scientist", company_name: "OpenAI", location: "San Francisco, California, USA", is_remote: true, is_hybrid: false, is_onsite: false, job_type: "full_time", experience_level: "senior", category: "Technology", salary_min: 250000, salary_max: 450000, salary_currency: "USD", status: "published", views_count: 189, applications_count: 12, skills: [{id:101,name:"Deep Learning"},{id:102,name:"PyTorch"},{id:103,name:"NLP"},{id:104,name:"Python"}], is_saved: false, created_at: "2026-06-07T14:30:00Z", expires_at: "2026-07-07T14:30:00Z", description: "OpenAI seeks an AI Research Scientist for cutting-edge research.", requirements: ["PhD in AI/ML", "Deep learning expertise", "Publication record"], responsibilities: ["Conduct AI research", "Publish papers", "Build prototypes"] },
  { id: 27, title: "Investment Analyst", company_name: "Goldman Sachs", location: "New York, New York, USA", is_remote: false, is_hybrid: true, is_onsite: false, job_type: "full_time", experience_level: "mid", category: "Finance", salary_min: 120000, salary_max: 200000, salary_currency: "USD", status: "published", views_count: 198, applications_count: 32, skills: [{id:105,name:"Financial Modeling"},{id:106,name:"Excel"},{id:107,name:"Python"},{id:108,name:"SQL"}], is_saved: false, created_at: "2026-06-06T11:00:00Z", expires_at: "2026-07-06T11:00:00Z", description: "Goldman Sachs needs an Investment Analyst.", requirements: ["Bachelor's in Finance", "Financial modeling skills", "Python knowledge"], responsibilities: ["Analyze investments", "Build models", "Prepare reports"] },
  { id: 28, title: "Nurse Practitioner", company_name: "Mayo Clinic", location: "Rochester, Minnesota, USA", is_remote: false, is_hybrid: false, is_onsite: true, job_type: "full_time", experience_level: "senior", category: "Healthcare", salary_min: 110000, salary_max: 150000, salary_currency: "USD", status: "published", views_count: 123, applications_count: 15, skills: [{id:109,name:"Patient Care"},{id:110,name:"Diagnosis"},{id:111,name:"EMR"},{id:112,name:"Prescription"}], is_saved: false, created_at: "2026-06-05T08:00:00Z", expires_at: "2026-07-05T08:00:00Z", description: "Mayo Clinic seeks a Nurse Practitioner.", requirements: ["Master's in Nursing", "NP certification", "5+ years experience"], responsibilities: ["Provide patient care", "Diagnose conditions", "Prescribe treatment"] },
  { id: 29, title: "Software Engineer", company_name: "BBC", location: "London, England, UK", is_remote: true, is_hybrid: true, is_onsite: false, job_type: "full_time", experience_level: "mid", category: "Technology", salary_min: 60000, salary_max: 90000, salary_currency: "GBP", status: "published", views_count: 167, applications_count: 9, skills: [{id:113,name:"React"},{id:114,name:"Node.js"},{id:115,name:"AWS"},{id:116,name:"TypeScript"}], is_saved: false, created_at: "2026-06-04T10:00:00Z", expires_at: "2026-07-04T10:00:00Z", description: "BBC is hiring a Software Engineer for digital platforms.", requirements: ["3+ years full stack", "React and Node.js", "AWS experience"], responsibilities: ["Build digital products", "Maintain platforms", "Collaborate with teams"] },
  { id: 30, title: "Data Analyst", company_name: "HSBC", location: "Manchester, England, UK", is_remote: false, is_hybrid: true, is_onsite: false, job_type: "full_time", experience_level: "entry", category: "Finance", salary_min: 35000, salary_max: 50000, salary_currency: "GBP", status: "published", views_count: 145, applications_count: 38, skills: [{id:117,name:"SQL"},{id:118,name:"Python"},{id:119,name:"Tableau"},{id:120,name:"Excel"}], is_saved: false, created_at: "2026-06-03T13:00:00Z", expires_at: "2026-07-03T13:00:00Z", description: "HSBC needs a Data Analyst for business intelligence.", requirements: ["Bachelor's in related field", "SQL proficiency", "Python basics"], responsibilities: ["Analyze data", "Create dashboards", "Support decisions"] },
  { id: 31, title: "Automotive Engineer", company_name: "BMW", location: "Munich, Bavaria, Germany", is_remote: false, is_hybrid: true, is_onsite: false, job_type: "full_time", experience_level: "senior", category: "Engineering", salary_min: 70000, salary_max: 110000, salary_currency: "EUR", status: "published", views_count: 156, applications_count: 8, skills: [{id:121,name:"CAD"},{id:122,name:"Simulation"},{id:123,name:"EV Tech"},{id:124,name:"German"}], is_saved: false, created_at: "2026-06-02T10:00:00Z", expires_at: "2026-07-02T10:00:00Z", description: "BMW seeks an Automotive Engineer for EV development.", requirements: ["5+ years automotive", "CAD expertise", "EV technology knowledge"], responsibilities: ["Design vehicle systems", "Run simulations", "Develop EV tech"] },
  { id: 32, title: "DevOps Engineer", company_name: "SAP", location: "Berlin, Germany", is_remote: true, is_hybrid: false, is_onsite: false, job_type: "full_time", experience_level: "mid", category: "Technology", salary_min: 55000, salary_max: 85000, salary_currency: "EUR", status: "published", views_count: 134, applications_count: 10, skills: [{id:125,name:"Kubernetes"},{id:126,name:"Terraform"},{id:127,name:"Azure"},{id:128,name:"Go"}], is_saved: false, created_at: "2026-06-01T15:00:00Z", expires_at: "2026-07-01T15:00:00Z", description: "SAP needs a DevOps Engineer for cloud platforms.", requirements: ["3+ years DevOps", "Kubernetes expertise", "Azure knowledge"], responsibilities: ["Manage infrastructure", "Automate deployments", "Optimize performance"] },
  { id: 33, title: "Construction Manager", company_name: "Emaar Properties", location: "Dubai, UAE", is_remote: false, is_hybrid: false, is_onsite: true, job_type: "full_time", experience_level: "senior", category: "Construction", salary_min: 250000, salary_max: 400000, salary_currency: "AED", status: "published", views_count: 198, applications_count: 22, skills: [{id:129,name:"Project Mgmt"},{id:130,name:"AutoCAD"},{id:131,name:"Budgeting"},{id:132,name:"Leadership"}], is_saved: false, created_at: "2026-06-08T09:00:00Z", expires_at: "2026-07-08T09:00:00Z", description: "Emaar seeks a Construction Manager for major projects.", requirements: ["10+ years construction", "Project management", "Budgeting skills"], responsibilities: ["Oversee projects", "Manage budgets", "Lead teams"] },
  { id: 34, title: "Finance Manager", company_name: "Emirates NBD", location: "Dubai, UAE", is_remote: false, is_hybrid: true, is_onsite: false, job_type: "full_time", experience_level: "senior", category: "Finance", salary_min: 180000, salary_max: 300000, salary_currency: "AED", status: "published", views_count: 156, applications_count: 8, skills: [{id:133,name:"Accounting"},{id:134,name:"Risk Mgmt"},{id:135,name:"SAP"},{id:136,name:"Analysis"}], is_saved: false, created_at: "2026-06-07T11:00:00Z", expires_at: "2026-07-07T11:00:00Z", description: "Emirates NBD needs a Finance Manager.", requirements: ["MBA in Finance", "7+ years experience", "SAP knowledge"], responsibilities: ["Manage finances", "Assess risk", "Lead finance team"] },
  { id: 35, title: "Quantitative Analyst", company_name: "DBS Bank", location: "Singapore, Singapore", is_remote: false, is_hybrid: true, is_onsite: false, job_type: "full_time", experience_level: "senior", category: "Finance", salary_min: 120000, salary_max: 200000, salary_currency: "SGD", status: "published", views_count: 178, applications_count: 15, skills: [{id:137,name:"Python"},{id:138,name:"R"},{id:139,name:"Statistics"},{id:140,name:"SQL"}], is_saved: false, created_at: "2026-06-06T14:00:00Z", expires_at: "2026-07-06T14:00:00Z", description: "DBS Bank seeks a Quantitative Analyst for trading strategies.", requirements: ["PhD in Statistics/Math", "Python and R", "Quantitative modeling"], responsibilities: ["Build trading models", "Analyze markets", "Optimize strategies"] },
  { id: 36, title: "Biotech Researcher", company_name: "A*STAR", location: "Singapore, Singapore", is_remote: false, is_hybrid: false, is_onsite: true, job_type: "full_time", experience_level: "mid", category: "Healthcare", salary_min: 80000, salary_max: 130000, salary_currency: "SGD", status: "published", views_count: 123, applications_count: 12, skills: [{id:141,name:"Genomics"},{id:142,name:"CRISPR"},{id:143,name:"Lab Tech"},{id:144,name:"Python"}], is_saved: false, created_at: "2026-06-05T08:00:00Z", expires_at: "2026-07-05T08:00:00Z", description: "A*STAR needs a Biotech Researcher for genomics research.", requirements: ["PhD in Biology", "Genomics expertise", "CRISPR experience"], responsibilities: ["Conduct research", "Analyze genomic data", "Publish findings"] },
  { id: 37, title: "Mining Engineer", company_name: "BHP", location: "Perth, Western Australia, Australia", is_remote: false, is_hybrid: false, is_onsite: true, job_type: "full_time", experience_level: "mid", category: "Engineering", salary_min: 120000, salary_max: 180000, salary_currency: "AUD", status: "published", views_count: 145, applications_count: 9, skills: [{id:145,name:"Geology"},{id:146,name:"Safety"},{id:147,name:"Equipment"},{id:148,name:"AutoCAD"}], is_saved: false, created_at: "2026-06-04T10:00:00Z", expires_at: "2026-07-04T10:00:00Z", description: "BHP seeks a Mining Engineer for operations.", requirements: ["Bachelor's in Mining", "Safety certifications", "Geology knowledge"], responsibilities: ["Plan operations", "Ensure safety", "Manage equipment"] },
  { id: 38, title: "Software Developer", company_name: "Atlassian", location: "Sydney, New South Wales, Australia", is_remote: true, is_hybrid: true, is_onsite: false, job_type: "full_time", experience_level: "mid", category: "Technology", salary_min: 100000, salary_max: 160000, salary_currency: "AUD", status: "published", views_count: 178, applications_count: 19, skills: [{id:149,name:"React"},{id:150,name:"Node.js"},{id:151,name:"AWS"},{id:152,name:"TypeScript"}], is_saved: false, created_at: "2026-06-03T13:00:00Z", expires_at: "2026-07-03T13:00:00Z", description: "Atlassian is hiring a Software Developer.", requirements: ["3+ years experience", "React and Node.js", "AWS knowledge"], responsibilities: ["Build features", "Write tests", "Deploy code"] },
  { id: 39, title: "AI Engineer", company_name: "Shopify", location: "Toronto, Ontario, Canada", is_remote: true, is_hybrid: false, is_onsite: false, job_type: "full_time", experience_level: "senior", category: "Technology", salary_min: 130000, salary_max: 200000, salary_currency: "CAD", status: "published", views_count: 198, applications_count: 22, skills: [{id:153,name:"PyTorch"},{id:154,name:"Python"},{id:155,name:"MLOps"},{id:156,name:"GCP"}], is_saved: false, created_at: "2026-06-02T09:00:00Z", expires_at: "2026-07-02T09:00:00Z", description: "Shopify needs an AI Engineer for recommendation systems.", requirements: ["5+ years ML", "PyTorch expertise", "MLOps experience"], responsibilities: ["Build ML systems", "Deploy models", "Optimize performance"] },
  { id: 40, title: "Civil Engineer", company_name: "SNC-Lavalin", location: "Vancouver, British Columbia, Canada", is_remote: false, is_hybrid: true, is_onsite: false, job_type: "full_time", experience_level: "mid", category: "Engineering", salary_min: 80000, salary_max: 120000, salary_currency: "CAD", status: "published", views_count: 134, applications_count: 10, skills: [{id:157,name:"AutoCAD"},{id:158,name:"Civil 3D"},{id:159,name:"Project Mgmt"},{id:160,name:"BIM"}], is_saved: false, created_at: "2026-06-01T11:00:00Z", expires_at: "2026-07-01T11:00:00Z", description: "SNC-Lavalin seeks a Civil Engineer for infrastructure.", requirements: ["Bachelor's in Civil Eng", "AutoCAD and Civil 3D", "Project management"], responsibilities: ["Design infrastructure", "Manage projects", "Ensure compliance"] },
  { id: 41, title: "Robotics Engineer", company_name: "Sony", location: "Tokyo, Japan", is_remote: false, is_hybrid: true, is_onsite: false, job_type: "full_time", experience_level: "senior", category: "Engineering", salary_min: 8000000, salary_max: 14000000, salary_currency: "JPY", status: "published", views_count: 245, applications_count: 18, skills: [{id:161,name:"ROS"},{id:162,name:"C++"},{id:163,name:"Computer Vision"},{id:164,name:"Japanese"}], is_saved: false, created_at: "2026-06-08T10:00:00Z", expires_at: "2026-07-08T10:00:00Z", description: "Sony needs a Robotics Engineer for consumer robots.", requirements: ["5+ years robotics", "ROS expertise", "C++ mastery"], responsibilities: ["Design robots", "Build prototypes", "Test systems"] },
  { id: 42, title: "Game Developer", company_name: "Nintendo", location: "Kyoto, Japan", is_remote: false, is_hybrid: false, is_onsite: true, job_type: "full_time", experience_level: "mid", category: "Technology", salary_min: 5000000, salary_max: 9000000, salary_currency: "JPY", status: "published", views_count: 189, applications_count: 12, skills: [{id:165,name:"Unity"},{id:166,name:"C#"},{id:167,name:"3D Modeling"},{id:168,name:"Japanese"}], is_saved: false, created_at: "2026-06-07T14:30:00Z", expires_at: "2026-07-07T14:30:00Z", description: "Nintendo is hiring a Game Developer.", requirements: ["3+ years game dev", "Unity and C#", "3D modeling skills"], responsibilities: ["Develop games", "Optimize performance", "Collaborate with artists"] },
  { id: 43, title: "Agricultural Engineer", company_name: "JBS", location: "São Paulo, Brazil", is_remote: false, is_hybrid: false, is_onsite: true, job_type: "full_time", experience_level: "mid", category: "Agriculture", salary_min: 80000, salary_max: 140000, salary_currency: "BRL", status: "published", views_count: 112, applications_count: 8, skills: [{id:169,name:"Agronomy"},{id:170,name:"Sustainability"},{id:171,name:"Data Analysis"},{id:172,name:"Portuguese"}], is_saved: false, created_at: "2026-06-06T11:00:00Z", expires_at: "2026-07-06T11:00:00Z", description: "JBS needs an Agricultural Engineer for sustainable farming.", requirements: ["Bachelor's in Agriculture", "Sustainability knowledge", "Data analysis skills"], responsibilities: ["Design farming systems", "Analyze data", "Improve sustainability"] },
  { id: 44, title: "Fintech Developer", company_name: "Nubank", location: "São Paulo, Brazil", is_remote: true, is_hybrid: true, is_onsite: false, job_type: "full_time", experience_level: "senior", category: "Technology", salary_min: 180000, salary_max: 300000, salary_currency: "BRL", status: "published", views_count: 178, applications_count: 15, skills: [{id:173,name:"Kotlin"},{id:174,name:"AWS"},{id:175,name:"Microservices"},{id:176,name:"Portuguese"}], is_saved: false, created_at: "2026-06-05T08:00:00Z", expires_at: "2026-07-05T08:00:00Z", description: "Nubank seeks a Fintech Developer for banking apps.", requirements: ["5+ years fintech", "Kotlin expertise", "Microservices experience"], responsibilities: ["Build banking features", "Ensure security", "Optimize performance"] },
  { id: 45, title: "Mining Supervisor", company_name: "Anglo American", location: "Johannesburg, Gauteng, South Africa", is_remote: false, is_hybrid: false, is_onsite: true, job_type: "full_time", experience_level: "senior", category: "Engineering", salary_min: 500000, salary_max: 900000, salary_currency: "ZAR", status: "published", views_count: 123, applications_count: 9, skills: [{id:177,name:"Safety"},{id:178,name:"Leadership"},{id:179,name:"Geology"},{id:180,name:"Equipment"}], is_saved: false, created_at: "2026-06-04T10:00:00Z", expires_at: "2026-07-04T10:00:00Z", description: "Anglo American needs a Mining Supervisor.", requirements: ["10+ years mining", "Leadership experience", "Safety certifications"], responsibilities: ["Supervise operations", "Ensure safety", "Manage teams"] },
  { id: 46, title: "Web Developer", company_name: "Takealot", location: "Cape Town, Western Cape, South Africa", is_remote: true, is_hybrid: false, is_onsite: false, job_type: "full_time", experience_level: "mid", category: "Technology", salary_min: 350000, salary_max: 600000, salary_currency: "ZAR", status: "published", views_count: 145, applications_count: 19, skills: [{id:181,name:"React"},{id:182,name:"Node.js"},{id:183,name:"AWS"},{id:184,name:"TypeScript"}], is_saved: false, created_at: "2026-06-03T13:00:00Z", expires_at: "2026-07-03T13:00:00Z", description: "Takealot is hiring a Web Developer for e-commerce.", requirements: ["3+ years web dev", "React and Node.js", "AWS experience"], responsibilities: ["Build web apps", "Optimize performance", "Deploy features"] },
  { id: 47, title: "Petroleum Engineer", company_name: "Saudi Aramco", location: "Dhahran, Eastern Province, Saudi Arabia", is_remote: false, is_hybrid: false, is_onsite: true, job_type: "full_time", experience_level: "senior", category: "Engineering", salary_min: 200000, salary_max: 350000, salary_currency: "SAR", status: "published", views_count: 198, applications_count: 22, skills: [{id:185,name:"Reservoir"},{id:186,name:"Drilling"},{id:187,name:"Simulation"},{id:188,name:"Arabic"}], is_saved: false, created_at: "2026-06-02T09:00:00Z", expires_at: "2026-07-02T09:00:00Z", description: "Saudi Aramco seeks a Petroleum Engineer.", requirements: ["Bachelor's in Petroleum Eng", "Reservoir engineering", "Drilling experience"], responsibilities: ["Design drilling plans", "Optimize production", "Run simulations"] },
  { id: 48, title: "IT Project Manager", company_name: "STC", location: "Riyadh, Saudi Arabia", is_remote: false, is_hybrid: true, is_onsite: false, job_type: "full_time", experience_level: "senior", category: "Technology", salary_min: 180000, salary_max: 280000, salary_currency: "SAR", status: "published", views_count: 156, applications_count: 8, skills: [{id:189,name:"Agile"},{id:190,name:"PMP"},{id:191,name:"Cloud"},{id:192,name:"Arabic"}], is_saved: false, created_at: "2026-06-01T11:00:00Z", expires_at: "2026-07-01T11:00:00Z", description: "STC needs an IT Project Manager for digital transformation.", requirements: ["PMP certification", "Agile experience", "Cloud knowledge"], responsibilities: ["Manage projects", "Lead teams", "Deliver on time"] },
  { id: 49, title: "Dairy Farm Manager", company_name: "Fonterra", location: "Hamilton, Waikato, New Zealand", is_remote: false, is_hybrid: false, is_onsite: true, job_type: "full_time", experience_level: "mid", category: "Agriculture", salary_min: 70000, salary_max: 110000, salary_currency: "NZD", status: "published", views_count: 89, applications_count: 5, skills: [{id:193,name:"Dairy"},{id:194,name:"Herd Mgmt"},{id:195,name:"Sustainability"},{id:196,name:"Leadership"}], is_saved: false, created_at: "2026-06-08T10:00:00Z", expires_at: "2026-07-08T10:00:00Z", description: "Fonterra seeks a Dairy Farm Manager.", requirements: ["5+ years dairy farming", "Herd management", "Sustainability knowledge"], responsibilities: ["Manage farm operations", "Oversee herd", "Ensure quality"] },
  { id: 50, title: "Software Architect", company_name: "Xero", location: "Wellington, New Zealand", is_remote: true, is_hybrid: true, is_onsite: false, job_type: "full_time", experience_level: "senior", category: "Technology", salary_min: 130000, salary_max: 200000, salary_currency: "NZD", status: "published", views_count: 167, applications_count: 9, skills: [{id:197,name:"System Design"},{id:198,name:"AWS"},{id:199,name:"Microservices"},{id:200,name:"Go"}], is_saved: false, created_at: "2026-06-07T14:30:00Z", expires_at: "2026-07-07T14:30:00Z", description: "Xero needs a Software Architect for accounting platforms.", requirements: ["10+ years experience", "System design expertise", "AWS knowledge"], responsibilities: ["Design architecture", "Lead technical decisions", "Mentor team"] }
]

export default function JobDetail() {
  const { id } = useParams()
  const { user, isAuthenticated } = useAuth()
  const [isSaved, setIsSaved] = useState(false)
  const [showShare, setShowShare] = useState(false)
  const [showApplyModal, setShowApplyModal] = useState(false)
  const [applied, setApplied] = useState(false)

  const getUserProfile = () => {
    const stored = localStorage.getItem('user')
    if (stored) {
      try {
        return JSON.parse(stored)
      } catch (e) {
        return null
      }
    }
    return user
  }

  const profile = getUserProfile()

  const [editMode, setEditMode] = useState(false)
  const [firstName, setFirstName] = useState(profile?.firstName || profile?.name?.split(' ')[0] || '')
  const [lastName, setLastName] = useState(profile?.lastName || profile?.name?.split(' ')[1] || '')
  const [cv, setCv] = useState(profile?.cv || null)
  const [certificates, setCertificates] = useState(profile?.certificates || [])

  const job = ALL_JOBS.find(j => j.id === parseInt(id))

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Job Not Found</h1>
          <p className="text-gray-600 mb-4">The job you're looking for doesn't exist.</p>
          <Link to="/jobs" className="text-blue-600 hover:text-blue-700 font-medium">
            Browse All Jobs
          </Link>
        </div>
      </div>
    )
  }

  const formatSalary = () => {
    if (!job.salary_min && !job.salary_max) return null
    const symbol = CURRENCY_SYMBOLS[job.salary_currency] || job.salary_currency
    if (job.salary_currency === 'INR') {
      return `${symbol}${(job.salary_min / 100000).toFixed(1)}L - ${(job.salary_max / 100000).toFixed(1)}L`
    }
    if (job.salary_currency === 'JPY') {
      return `${symbol}${(job.salary_min / 10000).toFixed(0)}万 - ${(job.salary_max / 10000).toFixed(0)}万`
    }
    const min = job.salary_min?.toLocaleString() || '0'
    const max = job.salary_max?.toLocaleString() || '0'
    return `${symbol}${min} - ${max}`
  }

  const formatJobType = (type) => {
    return type?.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Full Time'
  }

  const getWorkMode = () => {
    if (job.is_remote) return { label: 'Remote', icon: Monitor, color: 'bg-green-100 text-green-700' }
    if (job.is_hybrid) return { label: 'Hybrid', icon: Home, color: 'bg-purple-100 text-purple-700' }
    return { label: 'Onsite', icon: Globe, color: 'bg-orange-100 text-orange-700' }
  }

  const workMode = getWorkMode()
  const WorkIcon = workMode.icon

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: job.title,
        text: `Check out this job: ${job.title} at ${job.company_name}`,
        url: window.location.href
      })
    } else {
      setShowShare(!showShare)
    }
  }

  const handleApplyClick = () => {
    if (!isAuthenticated) {
      alert('Please login to apply for this job')
      return
    }
    setShowApplyModal(true)
  }

  const handleConfirmApply = () => {
    // Save any pending profile changes
    const updatedProfile = {
      ...profile,
      firstName,
      lastName,
      name: `${firstName} ${lastName}`,
      cv,
      certificates
    }
    localStorage.setItem('user', JSON.stringify(updatedProfile))

    // Store application in localStorage
    const applications = JSON.parse(localStorage.getItem('myApplications') || '[]')
    const alreadyApplied = applications.some(app => app.jobId === job.id)
    
    if (alreadyApplied) {
      alert('You have already applied for this job!')
      setShowApplyModal(false)
      return
    }

    applications.push({
      jobId: job.id,
      title: job.title,
      company_name: job.company_name,
      location: job.location,
      appliedAt: new Date().toISOString(),
      status: 'pending'
    })
    localStorage.setItem('myApplications', JSON.stringify(applications))
    
    // Increment application count
    job.applications_count += 1
    
    setApplied(true)
    setShowApplyModal(false)
    alert('Application submitted successfully!')
  }

  const handleCvUpload = (e) => {
    const file = e.target.files[0]
    if (file) setCv({ name: file.name, type: file.type })
  }

  const handleCertUpload = (e) => {
    const file = e.target.files[0]
    if (file) setCertificates([...certificates, { name: file.name, id: Date.now() }])
  }

  const removeCert = (id) => {
    setCertificates(certificates.filter(c => c.id !== id))
  }

  const saveProfileChanges = () => {
    const updatedProfile = {
      ...profile,
      firstName,
      lastName,
      name: `${firstName} ${lastName}`,
      cv,
      certificates
    }
    localStorage.setItem('user', JSON.stringify(updatedProfile))
    setEditMode(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link to="/jobs" className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Jobs
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Job Header Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex justify-between items-start">
            <div className="flex gap-4">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Building2 className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
                <p className="text-lg text-gray-600 mt-1">{job.company_name}</p>
                <div className="flex flex-wrap items-center gap-3 mt-3 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {job.location}
                  </span>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${workMode.color}`}>
                    <WorkIcon className="w-3 h-3" />
                    {workMode.label}
                  </span>
                  <span className="flex items-center gap-1">
                    <Briefcase className="w-4 h-4" />
                    {formatJobType(job.job_type)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {job.experience_level}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleShare}
                className="p-2.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <Share2 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsSaved(!isSaved)}
                className="p-2.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                {isSaved ? <BookmarkCheck className="w-5 h-5 text-blue-600" /> : <Bookmark className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Salary & Meta */}
          <div className="flex flex-wrap items-center gap-6 mt-6 pt-6 border-t border-gray-100">
            {job.salary_min > 0 && (
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm text-gray-500">Salary</p>
                  <p className="font-semibold text-gray-900">{formatSalary()}</p>
                </div>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-500">Posted</p>
                <p className="font-semibold text-gray-900">
                  {job.created_at ? formatDistanceToNow(new Date(job.created_at)) + ' ago' : 'Recently'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-500">Applications</p>
                <p className="font-semibold text-gray-900">{job.applications_count || 0}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Job Description</h2>
              <p className="text-gray-600 leading-relaxed">{job.description}</p>
            </div>

            {/* Requirements */}
            {job.requirements && job.requirements.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Requirements</h2>
                <ul className="space-y-3">
                  {job.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Responsibilities */}
            {job.responsibilities && job.responsibilities.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Responsibilities</h2>
                <ul className="space-y-3">
                  {job.responsibilities.map((resp, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Skills */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Required Skills</h2>
              <div className="flex flex-wrap gap-2">
                {job.skills?.map((skill) => (
                  <span key={skill.id} className="px-3 py-1.5 bg-blue-50 text-blue-700 text-sm rounded-full font-medium">
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Apply Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              {applied ? (
                <div className="text-center py-4">
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                  <p className="font-semibold text-gray-900">Application Submitted!</p>
                  <p className="text-sm text-gray-500 mt-1">Good luck with your application</p>
                </div>
              ) : (
                <>
                  <button
                    onClick={handleApplyClick}
                    className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors mb-3"
                  >
                    Apply Now
                  </button>
                  <p className="text-xs text-gray-500 text-center">
                    {isAuthenticated ? 'Easy application via JobPortal' : 'Login required to apply'}
                  </p>
                </>
              )}
            </div>

            {/* Job Info */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Job Overview</h3>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Category</span>
                  <span className="font-medium text-gray-900">{job.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Experience</span>
                  <span className="font-medium text-gray-900 capitalize">{job.experience_level}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Job Type</span>
                  <span className="font-medium text-gray-900">{formatJobType(job.job_type)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Work Mode</span>
                  <span className="font-medium text-gray-900">{workMode.label}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Expires</span>
                  <span className="font-medium text-gray-900">
                    {job.expires_at ? formatDistanceToNow(new Date(job.expires_at)) + ' left' : 'Soon'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Application Review Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Review Your Application</h2>
              <button
                onClick={() => setShowApplyModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Job Summary */}
              <div className="bg-blue-50 rounded-xl p-4">
                <h3 className="text-sm font-semibold text-blue-800 mb-3 uppercase tracking-wide">Job Details</h3>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{job.title}</p>
                    <p className="text-sm text-gray-600">{job.company_name}</p>
                    <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {job.location}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full font-medium ${workMode.color}`}>
                        {workMode.label}
                      </span>
                    </div>
                    {job.salary_min > 0 && (
                      <p className="text-sm font-medium text-green-600 mt-1">{formatSalary()}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Applicant Profile */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Your Profile</h3>
                  <button
                    onClick={() => setEditMode(!editMode)}
                    className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-medium"
                  >
                    <Edit3 className="w-3 h-3" />
                    {editMode ? 'Done' : 'Edit'}
                  </button>
                </div>

                {editMode ? (
                  /* EDIT MODE */
                  <div className="bg-gray-50 rounded-xl p-4 space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">First Name</label>
                        <input
                                                  type="text"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Last Name</label>
                        <input
                          type="text"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    {/* CV Upload */}
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Resume / CV</label>
                      {cv && (
                        <div className="flex items-center gap-2 mb-2 text-sm">
                          <FileText className="w-4 h-4 text-blue-600" />
                          <span>{cv.name}</span>
                          <button onClick={() => setCv(null)} className="text-red-500 text-xs ml-auto">Remove</button>
                        </div>
                      )}
                      <label className="flex items-center gap-2 px-3 py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 cursor-pointer">
                        <Upload className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{cv ? 'Replace CV' : 'Upload CV'}</span>
                        <input type="file" accept=".pdf,.doc,.docx" onChange={handleCvUpload} className="hidden" />
                      </label>
                    </div>

                    {/* Certificates */}
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Certificates</label>
                      {certificates.length > 0 && (
                        <div className="space-y-1 mb-2">
                          {certificates.map(cert => (
                            <div key={cert.id} className="flex items-center gap-2 text-sm">
                              <Award className="w-3 h-3 text-green-600" />
                              <span>{cert.name}</span>
                              <button onClick={() => removeCert(cert.id)} className="text-red-500 text-xs ml-auto">Remove</button>
                            </div>
                          ))}
                        </div>
                      )}
                      <label className="flex items-center gap-2 px-3 py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 cursor-pointer">
                        <Upload className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">Add Certificate</span>
                        <input type="file" accept=".pdf,.jpg,.png" onChange={handleCertUpload} className="hidden" />
                      </label>
                    </div>

                    <button
                      onClick={saveProfileChanges}
                      className="w-full px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
                    >
                      Save Changes
                    </button>
                  </div>
                ) : (
                  /* VIEW MODE */
                  <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-gray-500" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{firstName} {lastName}</p>
                        <p className="text-sm text-gray-500">{profile?.email || 'No email on file'}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="w-4 h-4" />
                      {profile?.email || 'Not provided'}
                    </div>

                    <div className="pt-3 border-t border-gray-200">
                      <p className="text-xs text-gray-500 mb-2">Resume / CV</p>
                      <div className="flex items-center gap-2 text-sm">
                        <FileText className="w-4 h-4 text-blue-600" />
                        <span className="text-gray-700">{cv ? cv.name : 'No CV uploaded'}</span>
                      </div>
                    </div>

                    {certificates.length > 0 && (
                      <div className="pt-2 border-t border-gray-200">
                        <p className="text-xs text-gray-500 mb-1">Certificates ({certificates.length})</p>
                        <div className="space-y-1">
                          {certificates.map(cert => (
                            <div key={cert.id} className="flex items-center gap-2 text-sm">
                              <Award className="w-3 h-3 text-green-600" />
                              <span>{cert.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Confirmation Check */}
              <div className="flex items-start gap-3 bg-amber-50 rounded-xl p-4">
                <div className="w-5 h-5 rounded border-2 border-amber-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-3 h-3 text-amber-600" />
                </div>
                <p className="text-sm text-amber-800">
                  By submitting, you confirm that all information is accurate and you agree to share your profile with {job.company_name}.
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex gap-3 p-6 border-t border-gray-200">
              <button
                onClick={() => setShowApplyModal(false)}
                className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmApply}
                className="flex-1 px-4 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Confirm & Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}