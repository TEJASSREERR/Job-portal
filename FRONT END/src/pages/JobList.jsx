import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { 
  Search, 
  Filter, 
  MapPin, 
  Briefcase, 
  ChevronDown,
  X,
  Building2,
  DollarSign,
  Clock,
  Bookmark,
  BookmarkCheck,
  Globe,
  Home,
  Monitor
} from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

// ALL 50 JOBS - Worldwide (matches Home.jsx exactly)
const ALL_JOBS = [
  // INDIA - Tamil Nadu
  {
    id: 1,
    title: "Senior React Developer",
    company_name: "Zoho Corporation",
    location: "Chennai, Tamil Nadu, India",
    is_remote: true,
    is_hybrid: false,
    is_onsite: false,
    job_type: "full_time",
    experience_level: "senior",
    category: "Technology",
    salary_min: 1200000,
    salary_max: 1800000,
    salary_currency: "INR",
    status: "published",
    views_count: 245,
    applications_count: 18,
    skills: [{ id: 1, name: "React" }, { id: 2, name: "TypeScript" }, { id: 3, name: "Node.js" }, { id: 4, name: "GraphQL" }],
    is_saved: false,
    created_at: "2026-06-08T10:00:00Z",
    expires_at: "2026-07-08T10:00:00Z"
  },
  {
    id: 2,
    title: "Full Stack Engineer",
    company_name: "Freshworks",
    location: "Chennai, Tamil Nadu, India",
    is_remote: false,
    is_hybrid: true,
    is_onsite: false,
    job_type: "full_time",
    experience_level: "mid",
    category: "Technology",
    salary_min: 900000,
    salary_max: 1400000,
    salary_currency: "INR",
    status: "published",
    views_count: 189,
    applications_count: 12,
    skills: [{ id: 5, name: "Python" }, { id: 6, name: "Django" }, { id: 7, name: "React" }, { id: 8, name: "PostgreSQL" }],
    is_saved: false,
    created_at: "2026-06-07T14:30:00Z",
    expires_at: "2026-07-07T14:30:00Z"
  },
  {
    id: 3,
    title: "UI/UX Designer",
    company_name: "DesignStudio Pro",
    location: "Coimbatore, Tamil Nadu, India",
    is_remote: true,
    is_hybrid: false,
    is_onsite: false,
    job_type: "full_time",
    experience_level: "mid",
    category: "Design",
    salary_min: 450000,
    salary_max: 800000,
    salary_currency: "INR",
    status: "published",
    views_count: 203,
    applications_count: 25,
    skills: [{ id: 13, name: "Figma" }, { id: 14, name: "Adobe XD" }, { id: 15, name: "CSS" }, { id: 16, name: "Prototyping" }],
    is_saved: false,
    created_at: "2026-06-05T16:00:00Z",
    expires_at: "2026-07-05T16:00:00Z"
  },
  {
    id: 4,
    title: "Graphic Designer",
    company_name: "Creative Agency",
    location: "Salem, Tamil Nadu, India",
    is_remote: true,
    is_hybrid: false,
    is_onsite: false,
    job_type: "freelance",
    experience_level: "mid",
    category: "Design",
    salary_min: 250000,
    salary_max: 500000,
    salary_currency: "INR",
    status: "published",
    views_count: 267,
    applications_count: 34,
    skills: [{ id: 57, name: "Photoshop" }, { id: 58, name: "Illustrator" }, { id: 59, name: "InDesign" }, { id: 60, name: "Branding" }],
    is_saved: false,
    created_at: "2026-06-06T14:00:00Z",
    expires_at: "2026-07-06T14:00:00Z"
  },
  {
    id: 5,
    title: "Nurse Practitioner",
    company_name: "Apollo Hospitals",
    location: "Madurai, Tamil Nadu, India",
    is_remote: false,
    is_hybrid: false,
    is_onsite: true,
    job_type: "full_time",
    experience_level: "senior",
    category: "Healthcare",
    salary_min: 400000,
    salary_max: 700000,
    salary_currency: "INR",
    status: "published",
    views_count: 123,
    applications_count: 15,
    skills: [{ id: 61, name: "Patient Care" }, { id: 62, name: "Diagnosis" }, { id: 63, name: "Prescription" }, { id: 64, name: "EMR" }],
    is_saved: false,
    created_at: "2026-06-05T08:00:00Z",
    expires_at: "2026-07-05T08:00:00Z"
  },
  {
    id: 6,
    title: "Teacher - Mathematics",
    company_name: "PSBB School",
    location: "Tiruchirappalli, Tamil Nadu, India",
    is_remote: false,
    is_hybrid: false,
    is_onsite: true,
    job_type: "part_time",
    experience_level: "entry",
    category: "Education",
    salary_min: 200000,
    salary_max: 350000,
    salary_currency: "INR",
    status: "published",
    views_count: 89,
    applications_count: 22,
    skills: [{ id: 65, name: "Teaching" }, { id: 66, name: "Curriculum" }, { id: 67, name: "Classroom" }, { id: 68, name: "Assessment" }],
    is_saved: false,
    created_at: "2026-06-04T10:00:00Z",
    expires_at: "2026-07-04T10:00:00Z"
  },
  // INDIA - Karnataka
  {
    id: 7,
    title: "Data Scientist",
    company_name: "Flipkart",
    location: "Bangalore, Karnataka, India",
    is_remote: false,
    is_hybrid: true,
    is_onsite: false,
    job_type: "full_time",
    experience_level: "senior",
    category: "Technology",
    salary_min: 2500000,
    salary_max: 4000000,
    salary_currency: "INR",
    status: "published",
    views_count: 178,
    applications_count: 15,
    skills: [{ id: 17, name: "Python" }, { id: 18, name: "Machine Learning" }, { id: 19, name: "SQL" }, { id: 20, name: "TensorFlow" }],
    is_saved: false,
    created_at: "2026-06-04T11:00:00Z",
    expires_at: "2026-07-04T11:00:00Z"
  },
  {
    id: 8,
    title: "Security Engineer",
    company_name: "Wipro",
    location: "Bangalore, Karnataka, India",
    is_remote: true,
    is_hybrid: false,
    is_onsite: false,
    job_type: "full_time",
    experience_level: "senior",
    category: "Technology",
    salary_min: 1800000,
    salary_max: 2800000,
    salary_currency: "INR",
    status: "published",
    views_count: 145,
    applications_count: 7,
    skills: [{ id: 37, name: "Penetration Testing" }, { id: 38, name: "SIEM" }, { id: 39, name: "Python" }, { id: 40, name: "Cloud Security" }],
    is_saved: false,
    created_at: "2026-05-30T09:00:00Z",
    expires_at: "2026-06-30T09:00:00Z"
  },
  {
    id: 9,
    title: "HR Coordinator",
    company_name: "Infosys",
    location: "Mysore, Karnataka, India",
    is_remote: false,
    is_hybrid: true,
    is_onsite: false,
    job_type: "internship",
    experience_level: "entry",
    category: "Human Resources",
    salary_min: 150000,
    salary_max: 250000,
    salary_currency: "INR",
    status: "published",
    views_count: 145,
    applications_count: 38,
    skills: [{ id: 73, name: "Recruiting" }, { id: 74, name: "Onboarding" }, { id: 75, name: "HRIS" }, { id: 76, name: "Compliance" }],
    is_saved: false,
    created_at: "2026-06-02T09:00:00Z",
    expires_at: "2026-07-02T09:00:00Z"
  },
  // INDIA - Maharashtra
  {
    id: 10,
    title: "Product Manager",
    company_name: "Jio Platforms",
    location: "Mumbai, Maharashtra, India",
    is_remote: true,
    is_hybrid: false,
    is_onsite: false,
    job_type: "full_time",
    experience_level: "senior",
    category: "Technology",
    salary_min: 2500000,
    salary_max: 4000000,
    salary_currency: "INR",
    status: "published",
    views_count: 198,
    applications_count: 22,
    skills: [{ id: 25, name: "Agile" }, { id: 26, name: "Product Strategy" }, { id: 27, name: "Analytics" }, { id: 28, name: "User Research" }],
    is_saved: false,
    created_at: "2026-06-02T10:00:00Z",
    expires_at: "2026-07-02T10:00:00Z"
  },
  {
    id: 11,
    title: "Backend Engineer (Go)",
    company_name: "Razorpay",
    location: "Pune, Maharashtra, India",
    is_remote: true,
    is_hybrid: false,
    is_onsite: false,
    job_type: "full_time",
    experience_level: "mid",
    category: "Technology",
    salary_min: 1200000,
    salary_max: 2000000,
    salary_currency: "INR",
    status: "published",
    views_count: 167,
    applications_count: 9,
    skills: [{ id: 29, name: "Go" }, { id: 30, name: "gRPC" }, { id: 31, name: "PostgreSQL" }, { id: 32, name: "Redis" }],
    is_saved: false,
    created_at: "2026-06-01T15:00:00Z",
    expires_at: "2026-07-01T15:00:00Z"
  },
  {
    id: 12,
    title: "Financial Analyst",
    company_name: "HDFC Bank",
    location: "Mumbai, Maharashtra, India",
    is_remote: false,
    is_hybrid: true,
    is_onsite: false,
    job_type: "full_time",
    experience_level: "entry",
    category: "Finance",
    salary_min: 600000,
    salary_max: 900000,
    salary_currency: "INR",
    status: "published",
    views_count: 198,
    applications_count: 32,
    skills: [{ id: 49, name: "Excel" }, { id: 50, name: "Financial Modeling" }, { id: 51, name: "SQL" }, { id: 52, name: "Python" }],
    is_saved: false,
    created_at: "2026-06-08T09:00:00Z",
    expires_at: "2026-07-08T09:00:00Z"
  },
  {
    id: 13,
    title: "Investment Banker",
    company_name: "ICICI Securities",
    location: "Mumbai, Maharashtra, India",
    is_remote: false,
    is_hybrid: false,
    is_onsite: true,
    job_type: "full_time",
    experience_level: "senior",
    category: "Finance",
    salary_min: 2500000,
    salary_max: 5000000,
    salary_currency: "INR",
    status: "published",
    views_count: 156,
    applications_count: 8,
    skills: [{ id: 53, name: "M&A" }, { id: 54, name: "Valuation" }, { id: 55, name: "Due Diligence" }, { id: 56, name: "Pitch Books" }],
    is_saved: false,
    created_at: "2026-06-07T11:00:00Z",
    expires_at: "2026-07-07T11:00:00Z"
  },
  // INDIA - Telangana
  {
    id: 14,
    title: "DevOps Engineer",
    company_name: "Microsoft India",
    location: "Hyderabad, Telangana, India",
    is_remote: true,
    is_hybrid: false,
    is_onsite: false,
    job_type: "contract",
    experience_level: "senior",
    category: "Technology",
    salary_min: 1800000,
    salary_max: 2800000,
    salary_currency: "INR",
    status: "published",
    views_count: 156,
    applications_count: 8,
    skills: [{ id: 9, name: "AWS" }, { id: 10, name: "Docker" }, { id: 11, name: "Kubernetes" }, { id: 12, name: "Terraform" }],
    is_saved: false,
    created_at: "2026-06-06T09:00:00Z",
    expires_at: "2026-07-06T09:00:00Z"
  },
  {
    id: 15,
    title: "Machine Learning Engineer",
    company_name: "Amazon India",
    location: "Hyderabad, Telangana, India",
    is_remote: true,
    is_hybrid: false,
    is_onsite: false,
    job_type: "full_time",
    experience_level: "senior",
    category: "Technology",
    salary_min: 2500000,
    salary_max: 4500000,
    salary_currency: "INR",
    status: "published",
    views_count: 189,
    applications_count: 11,
    skills: [{ id: 41, name: "PyTorch" }, { id: 42, name: "TensorFlow" }, { id: 43, name: "MLOps" }, { id: 44, name: "Python" }],
    is_saved: false,
    created_at: "2026-05-29T14:00:00Z",
    expires_at: "2026-06-29T14:00:00Z"
  },
  // INDIA - Kerala
  {
    id: 16,
    title: "Technical Writer",
    company_name: "Tata Consultancy Services",
    location: "Kochi, Kerala, India",
    is_remote: true,
    is_hybrid: false,
    is_onsite: false,
    job_type: "contract",
    experience_level: "mid",
    category: "Technology",
    salary_min: 500000,
    salary_max: 800000,
    salary_currency: "INR",
    status: "published",
    views_count: 112,
    applications_count: 19,
    skills: [{ id: 45, name: "Technical Writing" }, { id: 46, name: "Markdown" }, { id: 47, name: "API Documentation" }, { id: 48, name: "Git" }],
    is_saved: false,
    created_at: "2026-05-28T10:00:00Z",
    expires_at: "2026-06-28T10:00:00Z"
  },
  {
    id: 17,
    title: "Mobile Developer (React Native)",
    company_name: "UST Global",
    location: "Thiruvananthapuram, Kerala, India",
    is_remote: true,
    is_hybrid: false,
    is_onsite: false,
    job_type: "full_time",
    experience_level: "mid",
    category: "Technology",
    salary_min: 800000,
    salary_max: 1400000,
    salary_currency: "INR",
    status: "published",
    views_count: 134,
    applications_count: 10,
    skills: [{ id: 21, name: "React Native" }, { id: 22, name: "iOS" }, { id: 23, name: "Android" }, { id: 24, name: "Firebase" }],
    is_saved: false,
    created_at: "2026-06-03T13:00:00Z",
    expires_at: "2026-07-03T13:00:00Z"
  },
  // INDIA - Delhi
  {
    id: 18,
    title: "Marketing Specialist",
    company_name: "Paytm",
    location: "New Delhi, Delhi, India",
    is_remote: false,
    is_hybrid: false,
    is_onsite: true,
    job_type: "full_time",
    experience_level: "entry",
    category: "Marketing",
    salary_min: 400000,
    salary_max: 700000,
    salary_currency: "INR",
    status: "published",
    views_count: 234,
    applications_count: 45,
    skills: [{ id: 33, name: "SEO" }, { id: 34, name: "Content Marketing" }, { id: 35, name: "Google Analytics" }, { id: 36, name: "Social Media" }],
    is_saved: false,
    created_at: "2026-05-31T11:00:00Z",
    expires_at: "2026-06-30T11:00:00Z"
  },
  // INDIA - Haryana
  {
    id: 19,
    title: "Content Marketing Manager",
    company_name: "Ola",
    location: "Gurugram, Haryana, India",
    is_remote: true,
    is_hybrid: false,
    is_onsite: false,
    job_type: "full_time",
    experience_level: "mid",
    category: "Marketing",
    salary_min: 900000,
    salary_max: 1500000,
    salary_currency: "INR",
    status: "published",
    views_count: 178,
    applications_count: 19,
    skills: [{ id: 69, name: "Content Strategy" }, { id: 70, name: "SEO" }, { id: 71, name: "Analytics" }, { id: 72, name: "Copywriting" }],
    is_saved: false,
    created_at: "2026-06-03T13:00:00Z",
    expires_at: "2026-07-03T13:00:00Z"
  },
  // INDIA - West Bengal
  {
    id: 20,
    title: "Research Scientist",
    company_name: "BioTech Labs",
    location: "Kolkata, West Bengal, India",
    is_remote: false,
    is_hybrid: false,
    is_onsite: true,
    job_type: "full_time",
    experience_level: "senior",
    category: "Healthcare",
    salary_min: 800000,
    salary_max: 1400000,
    salary_currency: "INR",
    status: "published",
    views_count: 134,
    applications_count: 12,
    skills: [{ id: 77, name: "Research" }, { id: 78, name: "Lab" }, { id: 79, name: "Publications" }, { id: 80, name: "Grants" }],
    is_saved: false,
    created_at: "2026-06-01T11:00:00Z",
    expires_at: "2026-07-01T11:00:00Z"
  },
  // INDIA - Gujarat
  {
    id: 21,
    title: "Civil Engineer",
    company_name: "Larsen & Toubro",
    location: "Ahmedabad, Gujarat, India",
    is_remote: false,
    is_hybrid: false,
    is_onsite: true,
    job_type: "full_time",
    experience_level: "mid",
    category: "Engineering",
    salary_min: 600000,
    salary_max: 1000000,
    salary_currency: "INR",
    status: "published",
    views_count: 145,
    applications_count: 15,
    skills: [{ id: 81, name: "AutoCAD" }, { id: 82, name: "Structural" }, { id: 83, name: "Project Mgmt" }, { id: 84, name: "STAAD" }],
    is_saved: false,
    created_at: "2026-06-05T09:00:00Z",
    expires_at: "2026-07-05T09:00:00Z"
  },
  // INDIA - Rajasthan
  {
    id: 22,
    title: "Hotel Manager",
    company_name: "Oberoi Hotels",
    location: "Jaipur, Rajasthan, India",
    is_remote: false,
    is_hybrid: false,
    is_onsite: true,
    job_type: "full_time",
    experience_level: "senior",
    category: "Hospitality",
    salary_min: 800000,
    salary_max: 1500000,
    salary_currency: "INR",
    status: "published",
    views_count: 112,
    applications_count: 8,
    skills: [{ id: 85, name: "Operations" }, { id: 86, name: "Guest Relations" }, { id: 87, name: "Revenue Mgmt" }, { id: 88, name: "Team Leadership" }],
    is_saved: false,
    created_at: "2026-06-04T10:00:00Z",
    expires_at: "2026-07-04T10:00:00Z"
  },
  // INDIA - Punjab
  {
    id: 23,
    title: "Agricultural Scientist",
    company_name: "Punjab Agricultural University",
    location: "Ludhiana, Punjab, India",
    is_remote: false,
    is_hybrid: false,
    is_onsite: true,
    job_type: "full_time",
    experience_level: "senior",
    category: "Agriculture",
    salary_min: 700000,
    salary_max: 1200000,
    salary_currency: "INR",
    status: "published",
    views_count: 89,
    applications_count: 5,
    skills: [{ id: 89, name: "Crop Science" }, { id: 90, name: "Soil Analysis" }, { id: 91, name: "Research" }, { id: 92, name: "Data Analysis" }],
    is_saved: false,
    created_at: "2026-06-03T11:00:00Z",
    expires_at: "2026-07-03T11:00:00Z"
  },
  // INDIA - Odisha
  {
    id: 24,
    title: "Mining Engineer",
    company_name: "Coal India",
    location: "Bhubaneswar, Odisha, India",
    is_remote: false,
    is_hybrid: false,
    is_onsite: true,
    job_type: "full_time",
    experience_level: "mid",
    category: "Engineering",
    salary_min: 900000,
    salary_max: 1600000,
    salary_currency: "INR",
    status: "published",
    views_count: 123,
    applications_count: 9,
    skills: [{ id: 93, name: "Mine Planning" }, { id: 94, name: "Safety" }, { id: 95, name: "Geology" }, { id: 96, name: "Equipment" }],
    is_saved: false,
    created_at: "2026-06-02T09:00:00Z",
    expires_at: "2026-07-02T09:00:00Z"
  },
  // USA
  {
    id: 25,
    title: "Senior Software Architect",
    company_name: "Google",
    location: "Mountain View, California, USA",
    is_remote: true,
    is_hybrid: true,
    is_onsite: false,
    job_type: "full_time",
    experience_level: "senior",
    category: "Technology",
    salary_min: 180000,
    salary_max: 280000,
    salary_currency: "USD",
    status: "published",
    views_count: 245,
    applications_count: 18,
    skills: [{ id: 97, name: "System Design" }, { id: 98, name: "Cloud" }, { id: 99, name: "Leadership" }, { id: 100, name: "Go" }],
    is_saved: false,
    created_at: "2026-06-08T10:00:00Z",
    expires_at: "2026-07-08T10:00:00Z"
  },
  {
    id: 26,
    title: "AI Research Scientist",
    company_name: "OpenAI",
    location: "San Francisco, California, USA",
    is_remote: true,
    is_hybrid: false,
    is_onsite: false,
    job_type: "full_time",
    experience_level: "senior",
    category: "Technology",
    salary_min: 250000,
    salary_max: 450000,
    salary_currency: "USD",
    status: "published",
    views_count: 189,
    applications_count: 12,
    skills: [{ id: 101, name: "Deep Learning" }, { id: 102, name: "PyTorch" }, { id: 103, name: "NLP" }, { id: 104, name: "Python" }],
    is_saved: false,
    created_at: "2026-06-07T14:30:00Z",
    expires_at: "2026-07-07T14:30:00Z"
  },
  {
    id: 27,
    title: "Investment Analyst",
    company_name: "Goldman Sachs",
    location: "New York, New York, USA",
    is_remote: false,
    is_hybrid: true,
    is_onsite: false,
    job_type: "full_time",
    experience_level: "mid",
    category: "Finance",
    salary_min: 120000,
    salary_max: 200000,
    salary_currency: "USD",
    status: "published",
    views_count: 198,
    applications_count: 32,
    skills: [{ id: 105, name: "Financial Modeling" }, { id: 106, name: "Excel" }, { id: 107, name: "Python" }, { id: 108, name: "SQL" }],
    is_saved: false,
    created_at: "2026-06-06T11:00:00Z",
    expires_at: "2026-07-06T11:00:00Z"
  },
  {
    id: 28,
    title: "Nurse Practitioner",
    company_name: "Mayo Clinic",
    location: "Rochester, Minnesota, USA",
    is_remote: false,
    is_hybrid: false,
    is_onsite: true,
    job_type: "full_time",
    experience_level: "senior",
    category: "Healthcare",
    salary_min: 110000,
    salary_max: 150000,
    salary_currency: "USD",
    status: "published",
    views_count: 123,
    applications_count: 15,
    skills: [{ id: 109, name: "Patient Care" }, { id: 110, name: "Diagnosis" }, { id: 111, name: "EMR" }, { id: 112, name: "Prescription" }],
    is_saved: false,
    created_at: "2026-06-05T08:00:00Z",
    expires_at: "2026-07-05T08:00:00Z"
  },
  // UK
  {
    id: 29,
    title: "Software Engineer",
    company_name: "BBC",
    location: "London, England, UK",
    is_remote: true,
    is_hybrid: true,
    is_onsite: false,
    job_type: "full_time",
    experience_level: "mid",
    category: "Technology",
    salary_min: 60000,
    salary_max: 90000,
    salary_currency: "GBP",
    status: "published",
    views_count: 167,
    applications_count: 9,
    skills: [{ id: 113, name: "React" }, { id: 114, name: "Node.js" }, { id: 115, name: "AWS" }, { id: 116, name: "TypeScript" }],
    is_saved: false,
    created_at: "2026-06-04T10:00:00Z",
    expires_at: "2026-07-04T10:00:00Z"
  },
  {
    id: 30,
    title: "Data Analyst",
    company_name: "HSBC",
    location: "Manchester, England, UK",
    is_remote: false,
    is_hybrid: true,
    is_onsite: false,
    job_type: "full_time",
    experience_level: "entry",
    category: "Finance",
    salary_min: 35000,
    salary_max: 50000,
    salary_currency: "GBP",
    status: "published",
    views_count: 145,
    applications_count: 38,
    skills: [{ id: 117, name: "SQL" }, { id: 118, name: "Python" }, { id: 119, name: "Tableau" }, { id: 120, name: "Excel" }],
    is_saved: false,
    created_at: "2026-06-03T13:00:00Z",
    expires_at: "2026-07-03T13:00:00Z"
  },
  // Germany
  {
    id: 31,
    title: "Automotive Engineer",
    company_name: "BMW",
    location: "Munich, Bavaria, Germany",
    is_remote: false,
    is_hybrid: true,
    is_onsite: false,
    job_type: "full_time",
    experience_level: "senior",
    category: "Engineering",
    salary_min: 70000,
    salary_max: 110000,
    salary_currency: "EUR",
    status: "published",
    views_count: 156,
    applications_count: 8,
    skills: [{ id: 121, name: "CAD" }, { id: 122, name: "Simulation" }, { id: 123, name: "EV Tech" }, { id: 124, name: "German" }],
    is_saved: false,
    created_at: "2026-06-02T10:00:00Z",
    expires_at: "2026-07-02T10:00:00Z"
  },
  {
    id: 32,
    title: "DevOps Engineer",
    company_name: "SAP",
    location: "Berlin, Germany",
    is_remote: true,
    is_hybrid: false,
    is_onsite: false,
    job_type: "full_time",
    experience_level: "mid",
    category: "Technology",
    salary_min: 55000,
    salary_max: 85000,
    salary_currency: "EUR",
    status: "published",
    views_count: 134,
    applications_count: 10,
    skills: [{ id: 125, name: "Kubernetes" }, { id: 126, name: "Terraform" }, { id: 127, name: "Azure" }, { id: 128, name: "Go" }],
    is_saved: false,
    created_at: "2026-06-01T15:00:00Z",
    expires_at: "2026-07-01T15:00:00Z"
  },
  // UAE
  {
    id: 33,
    title: "Construction Manager",
    company_name: "Emaar Properties",
    location: "Dubai, UAE",
    is_remote: false,
    is_hybrid: false,
    is_onsite: true,
    job_type: "full_time",
    experience_level: "senior",
    category: "Construction",
    salary_min: 250000,
    salary_max: 400000,
    salary_currency: "AED",
    status: "published",
    views_count: 198,
    applications_count: 22,
    skills: [{ id: 129, name: "Project Mgmt" }, { id: 130, name: "AutoCAD" }, { id: 131, name: "Budgeting" }, { id: 132, name: "Leadership" }],
    is_saved: false,
    created_at: "2026-06-08T09:00:00Z",
    expires_at: "2026-07-08T09:00:00Z"
  },
  {
    id: 34,
    title: "Finance Manager",
    company_name: "Emirates NBD",
    location: "Dubai, UAE",
    is_remote: false,
    is_hybrid: true,
    is_onsite: false,
    job_type: "full_time",
    experience_level: "senior",
    category: "Finance",
    salary_min: 180000,
    salary_max: 300000,
    salary_currency: "AED",
    status: "published",
    views_count: 156,
    applications_count: 8,
    skills: [{ id: 133, name: "Accounting" }, { id: 134, name: "Risk Mgmt" }, { id: 135, name: "SAP" }, { id: 136, name: "Analysis" }],
    is_saved: false,
    created_at: "2026-06-07T11:00:00Z",
    expires_at: "2026-07-07T11:00:00Z"
  },
  // Singapore
  {
    id: 35,
    title: "Quantitative Analyst",
    company_name: "DBS Bank",
    location: "Singapore, Singapore",
    is_remote: false,
    is_hybrid: true,
    is_onsite: false,
    job_type: "full_time",
    experience_level: "senior",
    category: "Finance",
    salary_min: 120000,
    salary_max: 200000,
    salary_currency: "SGD",
    status: "published",
    views_count: 178,
    applications_count: 15,
    skills: [{ id: 137, name: "Python" }, { id: 138, name: "R" }, { id: 139, name: "Statistics" }, { id: 140, name: "SQL" }],
    is_saved: false,
    created_at: "2026-06-06T14:00:00Z",
    expires_at: "2026-07-06T14:00:00Z"
  },
  {
    id: 36,
    title: "Biotech Researcher",
    company_name: "A*STAR",
    location: "Singapore, Singapore",
    is_remote: false,
    is_hybrid: false,
    is_onsite: true,
    job_type: "full_time",
    experience_level: "mid",
    category: "Healthcare",
    salary_min: 80000,
    salary_max: 130000,
    salary_currency: "SGD",
    status: "published",
    views_count: 123,
    applications_count: 12,
    skills: [{ id: 141, name: "Genomics" }, { id: 142, name: "CRISPR" }, { id: 143, name: "Lab Tech" }, { id: 144, name: "Python" }],
    is_saved: false,
    created_at: "2026-06-05T08:00:00Z",
    expires_at: "2026-07-05T08:00:00Z"
  },
  // Australia
  {
    id: 37,
    title: "Mining Engineer",
    company_name: "BHP",
    location: "Perth, Western Australia, Australia",
    is_remote: false,
    is_hybrid: false,
    is_onsite: true,
    job_type: "full_time",
    experience_level: "mid",
    category: "Engineering",
    salary_min: 120000,
    salary_max: 180000,
    salary_currency: "AUD",
    status: "published",
    views_count: 145,
    applications_count: 9,
    skills: [{ id: 145, name: "Geology" }, { id: 146, name: "Safety" }, { id: 147, name: "Equipment" }, { id: 148, name: "AutoCAD" }],
    is_saved: false,
    created_at: "2026-06-04T10:00:00Z",
    expires_at: "2026-07-04T10:00:00Z"
  },
  {
    id: 38,
    title: "Software Developer",
    company_name: "Atlassian",
    location: "Sydney, New South Wales, Australia",
    is_remote: true,
    is_hybrid: true,
    is_onsite: false,
    job_type: "full_time",
    experience_level: "mid",
    category: "Technology",
    salary_min: 100000,
    salary_max: 160000,
    salary_currency: "AUD",
    status: "published",
    views_count: 178,
    applications_count: 19,
    skills: [{ id: 149, name: "React" }, { id: 150, name: "Node.js" }, { id: 151, name: "AWS" }, { id: 152, name: "TypeScript" }],
    is_saved: false,
    created_at: "2026-06-03T13:00:00Z",
    expires_at: "2026-07-03T13:00:00Z"
  },
  // Canada
  {
    id: 39,
    title: "AI Engineer",
    company_name: "Shopify",
    location: "Toronto, Ontario, Canada",
    is_remote: true,
    is_hybrid: false,
    is_onsite: false,
    job_type: "full_time",
    experience_level: "senior",
    category: "Technology",
    salary_min: 130000,
    salary_max: 200000,
    salary_currency: "CAD",
    status: "published",
    views_count: 198,
    applications_count: 22,
    skills: [{ id: 153, name: "PyTorch" }, { id: 154, name: "Python" }, { id: 155, name: "MLOps" }, { id: 156, name: "GCP" }],
    is_saved: false,
    created_at: "2026-06-02T09:00:00Z",
    expires_at: "2026-07-02T09:00:00Z"
  },
  {
    id: 40,
    title: "Civil Engineer",
    company_name: "SNC-Lavalin",
    location: "Vancouver, British Columbia, Canada",
    is_remote: false,
    is_hybrid: true,
    is_onsite: false,
    job_type: "full_time",
    experience_level: "mid",
    category: "Engineering",
    salary_min: 80000,
    salary_max: 120000,
    salary_currency: "CAD",
    status: "published",
    views_count: 134,
    applications_count: 10,
    skills: [{ id: 157, name: "AutoCAD" }, { id: 158, name: "Civil 3D" }, { id: 159, name: "Project Mgmt" }, { id: 160, name: "BIM" }],
    is_saved: false,
    created_at: "2026-06-01T11:00:00Z",
    expires_at: "2026-07-01T11:00:00Z"
  },
  // Japan
  {
    id: 41,
    title: "Robotics Engineer",
    company_name: "Sony",
    location: "Tokyo, Japan",
    is_remote: false,
    is_hybrid: true,
    is_onsite: false,
    job_type: "full_time",
    experience_level: "senior",
    category: "Engineering",
    salary_min: 8000000,
    salary_max: 14000000,
    salary_currency: "JPY",
    status: "published",
    views_count: 245,
    applications_count: 18,
    skills: [{ id: 161, name: "ROS" }, { id: 162, name: "C++" }, { id: 163, name: "Computer Vision" }, { id: 164, name: "Japanese" }],
    is_saved: false,
    created_at: "2026-06-08T10:00:00Z",
    expires_at: "2026-07-08T10:00:00Z"
  },
  {
    id: 42,
    title: "Game Developer",
    company_name: "Nintendo",
    location: "Kyoto, Japan",
    is_remote: false,
    is_hybrid: false,
    is_onsite: true,
    job_type: "full_time",
    experience_level: "mid",
    category: "Technology",
    salary_min: 5000000,
    salary_max: 9000000,
    salary_currency: "JPY",
    status: "published",
    views_count: 189,
    applications_count: 12,
    skills: [{ id: 165, name: "Unity" }, { id: 166, name: "C#" }, { id: 167, name: "3D Modeling" }, { id: 168, name: "Japanese" }],
    is_saved: false,
    created_at: "2026-06-07T14:30:00Z",
    expires_at: "2026-07-07T14:30:00Z"
  },
  // Brazil
  {
    id: 43,
    title: "Agricultural Engineer",
    company_name: "JBS",
    location: "São Paulo, Brazil",
    is_remote: false,
    is_hybrid: false,
    is_onsite: true,
    job_type: "full_time",
    experience_level: "mid",
    category: "Agriculture",
    salary_min: 80000,
    salary_max: 140000,
    salary_currency: "BRL",
    status: "published",
    views_count: 112,
    applications_count: 8,
    skills: [{ id: 169, name: "Agronomy" }, { id: 170, name: "Sustainability" }, { id: 171, name: "Data Analysis" }, { id: 172, name: "Portuguese" }],
    is_saved: false,
    created_at: "2026-06-06T11:00:00Z",
    expires_at: "2026-07-06T11:00:00Z"
  },
  {
    id: 44,
    title: "Fintech Developer",
    company_name: "Nubank",
    location: "São Paulo, Brazil",
    is_remote: true,
    is_hybrid: true,
    is_onsite: false,
    job_type: "full_time",
    experience_level: "senior",
    category: "Technology",
    salary_min: 180000,
    salary_max: 300000,
    salary_currency: "BRL",
    status: "published",
    views_count: 178,
    applications_count: 15,
    skills: [{ id: 173, name: "Kotlin" }, { id: 174, name: "AWS" }, { id: 175, name: "Microservices" }, { id: 176, name: "Portuguese" }],
    is_saved: false,
    created_at: "2026-06-05T08:00:00Z",
    expires_at: "2026-07-05T08:00:00Z"
  },
  // South Africa
  {
    id: 45,
    title: "Mining Supervisor",
    company_name: "Anglo American",
    location: "Johannesburg, Gauteng, South Africa",
    is_remote: false,
    is_hybrid: false,
    is_onsite: true,
    job_type: "full_time",
    experience_level: "senior",
    category: "Engineering",
    salary_min: 500000,
    salary_max: 900000,
    salary_currency: "ZAR",
    status: "published",
    views_count: 123,
    applications_count: 9,
    skills: [{ id: 177, name: "Safety" }, { id: 178, name: "Leadership" }, { id: 179, name: "Geology" }, { id: 180, name: "Equipment" }],
    is_saved: false,
    created_at: "2026-06-04T10:00:00Z",
    expires_at: "2026-07-04T10:00:00Z"
  },
  {
    id: 46,
    title: "Web Developer",
    company_name: "Takealot",
    location: "Cape Town, Western Cape, South Africa",
    is_remote: true,
    is_hybrid: false,
    is_onsite: false,
    job_type: "full_time",
    experience_level: "mid",
    category: "Technology",
    salary_min: 350000,
    salary_max: 600000,
    salary_currency: "ZAR",
    status: "published",
    views_count: 145,
    applications_count: 19,
    skills: [{ id: 181, name: "React" }, { id: 182, name: "Node.js" }, { id: 183, name: "AWS" }, { id: 184, name: "TypeScript" }],
    is_saved: false,
    created_at: "2026-06-03T13:00:00Z",
    expires_at: "2026-07-03T13:00:00Z"
  },
  // Saudi Arabia
  {
    id: 47,
    title: "Petroleum Engineer",
    company_name: "Saudi Aramco",
    location: "Dhahran, Eastern Province, Saudi Arabia",
    is_remote: false,
    is_hybrid: false,
    is_onsite: true,
    job_type: "full_time",
    experience_level: "senior",
    category: "Engineering",
    salary_min: 200000,
    salary_max: 350000,
    salary_currency: "SAR",
    status: "published",
    views_count: 198,
    applications_count: 22,
    skills: [{ id: 185, name: "Reservoir" }, { id: 186, name: "Drilling" }, { id: 187, name: "Simulation" }, { id: 188, name: "Arabic" }],
    is_saved: false,
    created_at: "2026-06-02T09:00:00Z",
    expires_at: "2026-07-02T09:00:00Z"
  },
  {
    id: 48,
    title: "IT Project Manager",
    company_name: "STC",
    location: "Riyadh, Saudi Arabia",
    is_remote: false,
    is_hybrid: true,
    is_onsite: false,
    job_type: "full_time",
    experience_level: "senior",
    category: "Technology",
    salary_min: 180000,
    salary_max: 280000,
    salary_currency: "SAR",
    status: "published",
    views_count: 156,
    applications_count: 8,
    skills: [{ id: 189, name: "Agile" }, { id: 190, name: "PMP" }, { id: 191, name: "Cloud" }, { id: 192, name: "Arabic" }],
    is_saved: false,
    created_at: "2026-06-01T11:00:00Z",
    expires_at: "2026-07-01T11:00:00Z"
  },
  // New Zealand
  {
    id: 49,
    title: "Dairy Farm Manager",
    company_name: "Fonterra",
    location: "Hamilton, Waikato, New Zealand",
    is_remote: false,
    is_hybrid: false,
    is_onsite: true,
    job_type: "full_time",
    experience_level: "mid",
    category: "Agriculture",
    salary_min: 70000,
    salary_max: 110000,
    salary_currency: "NZD",
    status: "published",
    views_count: 89,
    applications_count: 5,
    skills: [{ id: 193, name: "Dairy" }, { id: 194, name: "Herd Mgmt" }, { id: 195, name: "Sustainability" }, { id: 196, name: "Leadership" }],
    is_saved: false,
    created_at: "2026-06-08T10:00:00Z",
    expires_at: "2026-07-08T10:00:00Z"
  },
  {
    id: 50,
    title: "Software Architect",
    company_name: "Xero",
    location: "Wellington, New Zealand",
    is_remote: true,
    is_hybrid: true,
    is_onsite: false,
    job_type: "full_time",
    experience_level: "senior",
    category: "Technology",
    salary_min: 130000,
    salary_max: 200000,
    salary_currency: "NZD",
    status: "published",
    views_count: 167,
    applications_count: 9,
    skills: [{ id: 197, name: "System Design" }, { id: 198, name: "AWS" }, { id: 199, name: "Microservices" }, { id: 200, name: "Go" }],
    is_saved: false,
    created_at: "2026-06-07T14:30:00Z",
    expires_at: "2026-07-07T14:30:00Z"
  }
]

const CURRENCY_SYMBOLS = {
  INR: '₹',
  USD: '$',
  GBP: '£',
  EUR: '€',
  AED: 'AED',
  SGD: 'S$',
  AUD: 'A$',
  CAD: 'C$',
  JPY: '¥',
  BRL: 'R$',
  ZAR: 'R',
  SAR: 'SR',
  NZD: 'NZ$',
}

function JobListCard({ job }) {
  const [isSaved, setIsSaved] = useState(job.is_saved || false)

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

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div className="flex gap-4">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <Building2 className="w-6 h-6 text-blue-600" />
          </div>
          
          <div className="min-w-0">
            <Link 
              to={`/jobs/${job.id}`}
              className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors block truncate"
            >
              {job.title}
            </Link>
            
            <p className="text-sm text-gray-600 mt-0.5">{job.company_name || 'Unknown Company'}</p>
            
            <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {job.location}
              </span>
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${workMode.color}`}>
                <WorkIcon className="w-3 h-3" />
                {workMode.label}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {formatJobType(job.job_type)}
              </span>
              {job.salary_min && (
                <span className="flex items-center gap-1">
                  <DollarSign className="w-3.5 h-3.5" />
                  {formatSalary()}
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-2 mt-3">
              {job.skills?.slice(0, 4).map((skill) => (
                <span key={skill.id} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                  {skill.name}
                </span>
              ))}
              {job.skills?.length > 4 && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                  +{job.skills.length - 4}
                </span>
              )}
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsSaved(!isSaved)}
          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex-shrink-0"
        >
          {isSaved ? (
            <BookmarkCheck className="w-5 h-5 text-blue-600" />
          ) : (
            <Bookmark className="w-5 h-5" />
          )}
        </button>
      </div>

      <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
        <span className="text-xs text-gray-500">
          Posted {job.created_at ? formatDistanceToNow(new Date(job.created_at)) : 'recently'} ago
        </span>
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <span>{job.views_count || 0} views</span>
          <span>{job.applications_count || 0} applications</span>
        </div>
      </div>
    </div>
  )
}

export default function JobList() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [filteredJobs, setFilteredJobs] = useState(ALL_JOBS)
  const [loading, setLoading] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    location: searchParams.get('location') || '',
    category: searchParams.get('category') || '',
    job_type: '',
    experience_level: '',
    work_mode: '',
    min_salary: '',
    max_salary: ''
  })

  useEffect(() => {
    const search = searchParams.get('search') || ''
    const location = searchParams.get('location') || ''
    const category = searchParams.get('category') || ''
    
    setFilters(prev => ({
      ...prev,
      search,
      location,
      category
    }))
  }, [searchParams])

  useEffect(() => {
    applyClientSideFilters()
  }, [filters])

  const applyClientSideFilters = () => {
    let result = [...ALL_JOBS]

    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      result = result.filter(job => 
        job.title.toLowerCase().includes(searchLower) ||
        job.company_name.toLowerCase().includes(searchLower) ||
        job.skills.some(s => s.name.toLowerCase().includes(searchLower))
      )
    }

    if (filters.location) {
      const locLower = filters.location.toLowerCase()
      result = result.filter(job => job.location.toLowerCase().includes(locLower))
    }

    if (filters.category) {
      result = result.filter(job => job.category === filters.category)
    }

    if (filters.job_type) {
      result = result.filter(job => job.job_type === filters.job_type)
    }

    if (filters.experience_level) {
      result = result.filter(job => job.experience_level === filters.experience_level)
    }

    if (filters.work_mode) {
      if (filters.work_mode === 'remote') result = result.filter(job => job.is_remote)
      else if (filters.work_mode === 'hybrid') result = result.filter(job => job.is_hybrid)
      else if (filters.work_mode === 'onsite') result = result.filter(job => job.is_onsite)
    }

    if (filters.min_salary) {
      result = result.filter(job => (job.salary_max || 0) >= parseInt(filters.min_salary))
    }
    if (filters.max_salary) {
      result = result.filter(job => (job.salary_min || 0) <= parseInt(filters.max_salary))
    }

    setFilteredJobs(result)
  }

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const applyFilters = () => {
    const params = new URLSearchParams()
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value)
    })
    setSearchParams(params)
  }

  const clearFilters = () => {
    setFilters({
      search: '',
      location: '',
      category: '',
      job_type: '',
      experience_level: '',
      work_mode: '',
      min_salary: '',
      max_salary: ''
    })
    setSearchParams({})
    setFilteredJobs(ALL_JOBS)
  }

  const categories = [
    { name: 'Technology', count: ALL_JOBS.filter(j => j.category === 'Technology').length },
    { name: 'Design', count: ALL_JOBS.filter(j => j.category === 'Design').length },
    { name: 'Marketing', count: ALL_JOBS.filter(j => j.category === 'Marketing').length },
    { name: 'Finance', count: ALL_JOBS.filter(j => j.category === 'Finance').length },
    { name: 'Healthcare', count: ALL_JOBS.filter(j => j.category === 'Healthcare').length },
    { name: 'Education', count: ALL_JOBS.filter(j => j.category === 'Education').length },
    { name: 'Engineering', count: ALL_JOBS.filter(j => j.category === 'Engineering').length },
    { name: 'Agriculture', count: ALL_JOBS.filter(j => j.category === 'Agriculture').length },
    { name: 'Hospitality', count: ALL_JOBS.filter(j => j.category === 'Hospitality').length },
    { name: 'Construction', count: ALL_JOBS.filter(j => j.category === 'Construction').length },
    { name: 'Human Resources', count: ALL_JOBS.filter(j => j.category === 'Human Resources').length },
  ]

  const jobTypes = [
    { value: 'full_time', label: 'Full Time' },
    { value: 'part_time', label: 'Part Time' },
    { value: 'contract', label: 'Contract' },
    { value: 'freelance', label: 'Freelance' },
    { value: 'internship', label: 'Internship' },
  ]

  const experienceLevels = [
    { value: 'entry', label: 'Entry Level' },
    { value: 'mid', label: 'Mid Level' },
    { value: 'senior', label: 'Senior Level' },
    { value: 'lead', label: 'Lead/Manager' },
    { value: 'executive', label: 'Executive' },
  ]

  const workModes = [
    { value: 'remote', label: 'Remote' },
    { value: 'hybrid', label: 'Hybrid' },
    { value: 'onsite', label: 'Onsite' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900">Find Your Next Job</h1>
          <p className="mt-2 text-gray-600">Discover opportunities from top companies worldwide</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 flex items-center gap-2">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search jobs, companies, or keywords..."
                className="flex-1 outline-none text-gray-800"
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && applyFilters()}
              />
            </div>
            <div className="flex items-center gap-2 lg:w-64">
              <MapPin className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Location"
                className="flex-1 outline-none text-gray-800"
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && applyFilters()}
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                showFilters ? 'bg-blue-50 border-blue-200 text-blue-600' : 'border-gray-200 text-gray-600'
              }`}
            >
              <Filter className="w-4 h-4" />
              Filters
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
            <button
              onClick={applyFilters}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Search
            </button>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Categories ({ALL_JOBS.length})</option>
                  {categories.map((cat) => (
                    <option key={cat.name} value={cat.name}>{cat.name} ({cat.count})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
                <select
                  value={filters.job_type}
                  onChange={(e) => handleFilterChange('job_type', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Types</option>
                  {jobTypes.map((type) => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
                <select
                  value={filters.experience_level}
                  onChange={(e) => handleFilterChange('experience_level', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Levels</option>
                  {experienceLevels.map((level) => (
                    <option key={level.value} value={level.value}>{level.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Work Mode</label>
                <select
                  value={filters.work_mode}
                  onChange={(e) => handleFilterChange('work_mode', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Modes</option>
                  {workModes.map((mode) => (
                    <option key={mode.value} value={mode.value}>{mode.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Min Salary</label>
                <input
                  type="number"
                  value={filters.min_salary}
                  onChange={(e) => handleFilterChange('min_salary', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Max Salary</label>
                <input
                  type="number"
                  value={filters.max_salary}
                  onChange={(e) => handleFilterChange('max_salary', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="500000"
                />
              </div>

              <div className="flex items-end">
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-2 text-red-600 hover:text-red-700 text-sm font-medium"
                >
                  <X className="w-4 h-4" />
                  Clear All Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Active Filters Display */}
        {(filters.search || filters.location || filters.category || filters.job_type || filters.experience_level || filters.work_mode) && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-sm text-gray-600">Active filters:</span>
            {filters.search && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full">
                Search: {filters.search}
                <button onClick={() => handleFilterChange('search', '')} className="hover:text-blue-900"><X className="w-3 h-3" /></button>
              </span>
            )}
            {filters.location && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 text-sm rounded-full">
                Location: {filters.location}
                <button onClick={() => handleFilterChange('location', '')} className="hover:text-green-900"><X className="w-3 h-3" /></button>
              </span>
            )}
            {filters.category && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-50 text-purple-700 text-sm rounded-full">
                Category: {filters.category}
                <button onClick={() => handleFilterChange('category', '')} className="hover:text-purple-900"><X className="w-3 h-3" /></button>
              </span>
            )}
            {(filters.job_type || filters.experience_level || filters.work_mode) && (
              <button
                onClick={clearFilters}
                className="text-sm text-red-600 hover:text-red-700 font-medium ml-2"
              >
                Clear all
              </button>
            )}
          </div>
        )}

        {/* Results */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            {filteredJobs.length} jobs found
          </p>
          <span className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
            Demo Mode - {ALL_JOBS.length} total jobs available
          </span>
        </div>

        {filteredJobs.length === 0 ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search criteria or filters</p>
            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <JobListCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}