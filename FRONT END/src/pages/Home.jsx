import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { 
  Search, 
  MapPin, 
  Briefcase, 
  Building2, 
  ArrowRight, 
  TrendingUp,
  Users,
  Clock,
  Star,
  ChevronRight,
  DollarSign,
  CheckCircle,
  MapPinned,
  Globe
} from 'lucide-react'

// ALL SAMPLE JOBS - Used for counts and featured section
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
    created_at: "2026-06-08T10:00:00Z",
    skills: [{ id: 1, name: "React" }, { id: 2, name: "TypeScript" }, { id: 3, name: "Node.js" }, { id: 4, name: "GraphQL" }]
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
    created_at: "2026-06-07T14:30:00Z",
    skills: [{ id: 5, name: "Python" }, { id: 6, name: "Django" }, { id: 7, name: "React" }, { id: 8, name: "PostgreSQL" }]
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
    created_at: "2026-06-05T16:00:00Z",
    skills: [{ id: 13, name: "Figma" }, { id: 14, name: "Adobe XD" }, { id: 15, name: "CSS" }, { id: 16, name: "Prototyping" }]
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
    created_at: "2026-06-06T14:00:00Z",
    skills: [{ id: 57, name: "Photoshop" }, { id: 58, name: "Illustrator" }, { id: 59, name: "InDesign" }, { id: 60, name: "Branding" }]
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
    created_at: "2026-06-05T08:00:00Z",
    skills: [{ id: 61, name: "Patient Care" }, { id: 62, name: "Diagnosis" }, { id: 63, name: "Prescription" }, { id: 64, name: "EMR" }]
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
    created_at: "2026-06-04T10:00:00Z",
    skills: [{ id: 65, name: "Teaching" }, { id: 66, name: "Curriculum" }, { id: 67, name: "Classroom" }, { id: 68, name: "Assessment" }]
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
    created_at: "2026-06-04T11:00:00Z",
    skills: [{ id: 17, name: "Python" }, { id: 18, name: "Machine Learning" }, { id: 19, name: "SQL" }, { id: 20, name: "TensorFlow" }]
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
    created_at: "2026-05-30T09:00:00Z",
    skills: [{ id: 37, name: "Penetration Testing" }, { id: 38, name: "SIEM" }, { id: 39, name: "Python" }, { id: 40, name: "Cloud Security" }]
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
    created_at: "2026-06-02T09:00:00Z",
    skills: [{ id: 73, name: "Recruiting" }, { id: 74, name: "Onboarding" }, { id: 75, name: "HRIS" }, { id: 76, name: "Compliance" }]
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
    created_at: "2026-06-02T10:00:00Z",
    skills: [{ id: 25, name: "Agile" }, { id: 26, name: "Product Strategy" }, { id: 27, name: "Analytics" }, { id: 28, name: "User Research" }]
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
    created_at: "2026-06-01T15:00:00Z",
    skills: [{ id: 29, name: "Go" }, { id: 30, name: "gRPC" }, { id: 31, name: "PostgreSQL" }, { id: 32, name: "Redis" }]
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
    created_at: "2026-06-08T09:00:00Z",
    skills: [{ id: 49, name: "Excel" }, { id: 50, name: "Financial Modeling" }, { id: 51, name: "SQL" }, { id: 52, name: "Python" }]
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
    created_at: "2026-06-07T11:00:00Z",
    skills: [{ id: 53, name: "M&A" }, { id: 54, name: "Valuation" }, { id: 55, name: "Due Diligence" }, { id: 56, name: "Pitch Books" }]
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
    created_at: "2026-06-06T09:00:00Z",
    skills: [{ id: 9, name: "AWS" }, { id: 10, name: "Docker" }, { id: 11, name: "Kubernetes" }, { id: 12, name: "Terraform" }]
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
    created_at: "2026-05-29T14:00:00Z",
    skills: [{ id: 41, name: "PyTorch" }, { id: 42, name: "TensorFlow" }, { id: 43, name: "MLOps" }, { id: 44, name: "Python" }]
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
    created_at: "2026-05-28T10:00:00Z",
    skills: [{ id: 45, name: "Technical Writing" }, { id: 46, name: "Markdown" }, { id: 47, name: "API Documentation" }, { id: 48, name: "Git" }]
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
    created_at: "2026-06-03T13:00:00Z",
    skills: [{ id: 21, name: "React Native" }, { id: 22, name: "iOS" }, { id: 23, name: "Android" }, { id: 24, name: "Firebase" }]
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
    created_at: "2026-05-31T11:00:00Z",
    skills: [{ id: 33, name: "SEO" }, { id: 34, name: "Content Marketing" }, { id: 35, name: "Google Analytics" }, { id: 36, name: "Social Media" }]
  },
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
    created_at: "2026-06-03T13:00:00Z",
    skills: [{ id: 69, name: "Content Strategy" }, { id: 70, name: "SEO" }, { id: 71, name: "Analytics" }, { id: 72, name: "Copywriting" }]
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
    created_at: "2026-06-01T11:00:00Z",
    skills: [{ id: 77, name: "Research" }, { id: 78, name: "Lab" }, { id: 79, name: "Publications" }, { id: 80, name: "Grants" }]
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
    created_at: "2026-06-05T09:00:00Z",
    skills: [{ id: 81, name: "AutoCAD" }, { id: 82, name: "Structural" }, { id: 83, name: "Project Mgmt" }, { id: 84, name: "STAAD" }]
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
    created_at: "2026-06-04T10:00:00Z",
    skills: [{ id: 85, name: "Operations" }, { id: 86, name: "Guest Relations" }, { id: 87, name: "Revenue Mgmt" }, { id: 88, name: "Team Leadership" }]
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
    created_at: "2026-06-03T11:00:00Z",
    skills: [{ id: 89, name: "Crop Science" }, { id: 90, name: "Soil Analysis" }, { id: 91, name: "Research" }, { id: 92, name: "Data Analysis" }]
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
    created_at: "2026-06-02T09:00:00Z",
    skills: [{ id: 93, name: "Mine Planning" }, { id: 94, name: "Safety" }, { id: 95, name: "Geology" }, { id: 96, name: "Equipment" }]
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
    created_at: "2026-06-08T10:00:00Z",
    skills: [{ id: 97, name: "System Design" }, { id: 98, name: "Cloud" }, { id: 99, name: "Leadership" }, { id: 100, name: "Go" }]
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
    created_at: "2026-06-07T14:30:00Z",
    skills: [{ id: 101, name: "Deep Learning" }, { id: 102, name: "PyTorch" }, { id: 103, name: "NLP" }, { id: 104, name: "Python" }]
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
    created_at: "2026-06-06T11:00:00Z",
    skills: [{ id: 105, name: "Financial Modeling" }, { id: 106, name: "Excel" }, { id: 107, name: "Python" }, { id: 108, name: "SQL" }]
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
    created_at: "2026-06-05T08:00:00Z",
    skills: [{ id: 109, name: "Patient Care" }, { id: 110, name: "Diagnosis" }, { id: 111, name: "EMR" }, { id: 112, name: "Prescription" }]
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
    created_at: "2026-06-04T10:00:00Z",
    skills: [{ id: 113, name: "React" }, { id: 114, name: "Node.js" }, { id: 115, name: "AWS" }, { id: 116, name: "TypeScript" }]
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
    created_at: "2026-06-03T13:00:00Z",
    skills: [{ id: 117, name: "SQL" }, { id: 118, name: "Python" }, { id: 119, name: "Tableau" }, { id: 120, name: "Excel" }]
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
    created_at: "2026-06-02T10:00:00Z",
    skills: [{ id: 121, name: "CAD" }, { id: 122, name: "Simulation" }, { id: 123, name: "EV Tech" }, { id: 124, name: "German" }]
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
    created_at: "2026-06-01T15:00:00Z",
    skills: [{ id: 125, name: "Kubernetes" }, { id: 126, name: "Terraform" }, { id: 127, name: "Azure" }, { id: 128, name: "Go" }]
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
    created_at: "2026-06-08T09:00:00Z",
    skills: [{ id: 129, name: "Project Mgmt" }, { id: 130, name: "AutoCAD" }, { id: 131, name: "Budgeting" }, { id: 132, name: "Leadership" }]
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
    created_at: "2026-06-07T11:00:00Z",
    skills: [{ id: 133, name: "Accounting" }, { id: 134, name: "Risk Mgmt" }, { id: 135, name: "SAP" }, { id: 136, name: "Analysis" }]
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
    created_at: "2026-06-06T14:00:00Z",
    skills: [{ id: 137, name: "Python" }, { id: 138, name: "R" }, { id: 139, name: "Statistics" }, { id: 140, name: "SQL" }]
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
    created_at: "2026-06-05T08:00:00Z",
    skills: [{ id: 141, name: "Genomics" }, { id: 142, name: "CRISPR" }, { id: 143, name: "Lab Tech" }, { id: 144, name: "Python" }]
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
    created_at: "2026-06-04T10:00:00Z",
    skills: [{ id: 145, name: "Geology" }, { id: 146, name: "Safety" }, { id: 147, name: "Equipment" }, { id: 148, name: "AutoCAD" }]
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
    created_at: "2026-06-03T13:00:00Z",
    skills: [{ id: 149, name: "React" }, { id: 150, name: "Node.js" }, { id: 151, name: "AWS" }, { id: 152, name: "TypeScript" }]
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
    created_at: "2026-06-02T09:00:00Z",
    skills: [{ id: 153, name: "PyTorch" }, { id: 154, name: "Python" }, { id: 155, name: "MLOps" }, { id: 156, name: "GCP" }]
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
    created_at: "2026-06-01T11:00:00Z",
    skills: [{ id: 157, name: "AutoCAD" }, { id: 158, name: "Civil 3D" }, { id: 159, name: "Project Mgmt" }, { id: 160, name: "BIM" }]
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
    created_at: "2026-06-08T10:00:00Z",
    skills: [{ id: 161, name: "ROS" }, { id: 162, name: "C++" }, { id: 163, name: "Computer Vision" }, { id: 164, name: "Japanese" }]
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
    created_at: "2026-06-07T14:30:00Z",
    skills: [{ id: 165, name: "Unity" }, { id: 166, name: "C#" }, { id: 167, name: "3D Modeling" }, { id: 168, name: "Japanese" }]
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
    created_at: "2026-06-06T11:00:00Z",
    skills: [{ id: 169, name: "Agronomy" }, { id: 170, name: "Sustainability" }, { id: 171, name: "Data Analysis" }, { id: 172, name: "Portuguese" }]
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
    created_at: "2026-06-05T08:00:00Z",
    skills: [{ id: 173, name: "Kotlin" }, { id: 174, name: "AWS" }, { id: 175, name: "Microservices" }, { id: 176, name: "Portuguese" }]
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
    created_at: "2026-06-04T10:00:00Z",
    skills: [{ id: 177, name: "Safety" }, { id: 178, name: "Leadership" }, { id: 179, name: "Geology" }, { id: 180, name: "Equipment" }]
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
    created_at: "2026-06-03T13:00:00Z",
    skills: [{ id: 181, name: "React" }, { id: 182, name: "Node.js" }, { id: 183, name: "AWS" }, { id: 184, name: "TypeScript" }]
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
    created_at: "2026-06-02T09:00:00Z",
    skills: [{ id: 185, name: "Reservoir" }, { id: 186, name: "Drilling" }, { id: 187, name: "Simulation" }, { id: 188, name: "Arabic" }]
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
    created_at: "2026-06-01T11:00:00Z",
    skills: [{ id: 189, name: "Agile" }, { id: 190, name: "PMP" }, { id: 191, name: "Cloud" }, { id: 192, name: "Arabic" }]
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
    created_at: "2026-06-08T10:00:00Z",
    skills: [{ id: 193, name: "Dairy" }, { id: 194, name: "Herd Mgmt" }, { id: 195, name: "Sustainability" }, { id: 196, name: "Leadership" }]
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
    created_at: "2026-06-07T14:30:00Z",
    skills: [{ id: 197, name: "System Design" }, { id: 198, name: "AWS" }, { id: 199, name: "Microservices" }, { id: 200, name: "Go" }]
  }
]

// Compute category counts dynamically from ALL_JOBS
const getCategoryCounts = () => {
  const counts = {}
  ALL_JOBS.forEach(job => {
    counts[job.category] = (counts[job.category] || 0) + 1
  })
  return counts
}

// Compute country counts dynamically from ALL_JOBS
const getCountryCounts = () => {
  const counts = {}
  ALL_JOBS.forEach(job => {
    const country = job.location.split(', ').pop()
    if (country) {
      counts[country] = (counts[country] || 0) + 1
    }
  })
  return counts
}

// Compute state/region counts dynamically from ALL_JOBS
const getRegionCounts = () => {
  const counts = {}
  ALL_JOBS.forEach(job => {
    const parts = job.location.split(', ')
    if (parts.length >= 3) {
      const region = parts[parts.length - 2]
      counts[region] = (counts[region] || 0) + 1
    }
  })
  return counts
}

// Compute city counts dynamically from ALL_JOBS
const getCityCounts = () => {
  const counts = {}
  ALL_JOBS.forEach(job => {
    const city = job.location.split(', ')[0]
    if (city) {
      counts[city] = (counts[city] || 0) + 1
    }
  })
  return counts
}

const CATEGORY_CONFIG = [
  { name: 'Technology', icon: '💻' },
  { name: 'Design', icon: '🎨' },
  { name: 'Marketing', icon: '📈' },
  { name: 'Finance', icon: '💰' },
  { name: 'Healthcare', icon: '🏥' },
  { name: 'Education', icon: '📚' },
  { name: 'Engineering', icon: '⚙️' },
  { name: 'Agriculture', icon: '🌾' },
  { name: 'Hospitality', icon: '🏨' },
  { name: 'Construction', icon: '🏗️' },
  { name: 'Human Resources', icon: '👥' },
]

const COUNTRY_CONFIG = [
  { name: 'India', icon: '🇮🇳', flag: '🇮🇳' },
  { name: 'USA', icon: '🇺🇸', flag: '🇺🇸' },
  { name: 'UK', icon: '🇬🇧', flag: '🇬🇧' },
  { name: 'Germany', icon: '🇩🇪', flag: '🇩🇪' },
  { name: 'UAE', icon: '🇦🇪', flag: '🇦🇪' },
  { name: 'Singapore', icon: '🇸🇬', flag: '🇸🇬' },
  { name: 'Australia', icon: '🇦🇺', flag: '🇦🇺' },
  { name: 'Canada', icon: '🇨🇦', flag: '🇨🇦' },
  { name: 'Japan', icon: '🇯🇵', flag: '🇯🇵' },
  { name: 'Brazil', icon: '🇧🇷', flag: '🇧🇷' },
  { name: 'South Africa', icon: '🇿🇦', flag: '🇿🇦' },
  { name: 'Saudi Arabia', icon: '🇸🇦', flag: '🇸🇦' },
  { name: 'New Zealand', icon: '🇳🇿', flag: '🇳🇿' },
]

const INDIAN_STATES = [
  'Tamil Nadu',
  'Karnataka',
  'Maharashtra',
  'Telangana',
  'Kerala',
  'Delhi',
  'West Bengal',
  'Gujarat',
  'Rajasthan',
  'Punjab',
  'Odisha',
  'Haryana',
]

const POPULAR_CITIES = [
  'Chennai',
  'Bangalore',
  'Hyderabad',
  'Mumbai',
  'Pune',
  'Delhi',
  'Coimbatore',
  'Salem',
  'Kochi',
  'Kolkata',
  'Ahmedabad',
  'Jaipur',
  'Mountain View',
  'New York',
  'London',
  'Berlin',
  'Dubai',
  'Singapore',
  'Sydney',
  'Toronto',
  'Tokyo',
  'São Paulo',
  'Johannesburg',
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

const formatSalary = (min, max, currency) => {
  const symbol = CURRENCY_SYMBOLS[currency] || currency
  if (currency === 'INR') {
    return `${symbol}${(min / 100000).toFixed(1)}L - ${(max / 100000).toFixed(1)}L`
  }
  if (currency === 'JPY') {
    return `${symbol}${(min / 10000).toFixed(0)}万 - ${(max / 10000).toFixed(0)}万`
  }
  return `${symbol}${min.toLocaleString()} - ${max.toLocaleString()}`
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchLocation, setSearchLocation] = useState('')
  const [showAllCities, setShowAllCities] = useState(false)
  const [activeTab, setActiveTab] = useState('countries')
  const categoryCounts = getCategoryCounts()
  const countryCounts = getCountryCounts()
  const regionCounts = getRegionCounts()
  const cityCounts = getCityCounts()

  const handleSearch = (e) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (searchQuery) params.append('search', searchQuery)
    if (searchLocation) params.append('location', searchLocation)
    window.location.href = `/jobs?${params.toString()}`
  }

  const handleCategoryClick = (categoryName) => {
    window.location.href = `/jobs?category=${encodeURIComponent(categoryName)}`
  }

  const handleCountryClick = (countryName) => {
    window.location.href = `/jobs?location=${encodeURIComponent(countryName)}`
  }

  const handleRegionClick = (regionName) => {
    window.location.href = `/jobs?location=${encodeURIComponent(regionName)}`
  }

  const handleCityClick = (cityName) => {
    window.location.href = `/jobs?location=${encodeURIComponent(cityName)}`
  }

  const stats = {
  totalJobs: ALL_JOBS.length,
  totalCompanies: new Set(ALL_JOBS.map(j => j.company_name)).size,
  totalCountries: new Set(ALL_JOBS.map(j => j.location.split(', ').pop())).size,
  totalLogins: parseInt(localStorage.getItem('totalLogins')) || 0,
}

  const displayedCities = showAllCities ? POPULAR_CITIES : POPULAR_CITIES.slice(0, 12)

  const indianStateCounts = {}
  INDIAN_STATES.forEach(state => {
    indianStateCounts[state] = regionCounts[state] || 0
  })

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Find Your Dream Job Worldwide
            </h1>
            <p className="text-xl text-blue-100 mb-10">
              Connect with top employers across India, USA, UK, UAE, Singapore, Germany & 50+ countries
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="bg-white p-2 rounded-2xl shadow-lg max-w-2xl mx-auto flex flex-col sm:flex-row gap-2">
              <div className="flex-1 flex items-center px-4 py-3">
                <Search className="w-5 h-5 text-gray-400 mr-3" />
                <input
                  type="text"
                  placeholder="Job title, keywords, or company"
                  className="w-full outline-none text-gray-800 placeholder-gray-400"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center px-4 py-3 border-t sm:border-t-0 sm:border-l border-gray-200">
                <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                <input
                  type="text"
                  placeholder="City, State, or Country"
                  className="w-full outline-none text-gray-800 placeholder-gray-400"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
              >
                Search
              </button>
            </form>

            {/* Quick Location Tags */}
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              {['Bangalore', 'Chennai', 'Mumbai', 'Hyderabad', 'Delhi', 'Dubai', 'London', 'Singapore', 'New York', 'Toronto'].map(city => (
                <button
                  key={city}
                  onClick={() => handleCityClick(city)}
                  className="px-3 py-1 bg-white/20 text-white text-sm rounded-full hover:bg-white/30 transition-colors"
                >
                  {city}
                </button>
              ))}
            </div>

            {/* Stats */}
            <div className="flex justify-center gap-8 mt-12 text-blue-100">
              <div className="text-center">
                <p className="text-3xl font-bold">{stats.totalJobs}+</p>
                <p className="text-sm">Jobs</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold">{stats.totalCompanies}+</p>
                <p className="text-sm">Companies</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold">{stats.totalCountries}</p>
                <p className="text-sm">Countries</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold">15,420+</p>
                <p className="text-sm">Candidates</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Browse by Location - Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Browse by Location</h2>
        
        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-8">
          {[
            { id: 'countries', label: 'Countries', icon: Globe },
            { id: 'india', label: 'Indian States', icon: MapPinned },
            { id: 'cities', label: 'Popular Cities', icon: MapPin },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Countries Tab */}
        {activeTab === 'countries' && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {COUNTRY_CONFIG.map((country) => {
              const count = countryCounts[country.name] || 0
              return (
                <button
                  key={country.name}
                  onClick={() => handleCountryClick(country.name)}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center hover:shadow-md transition-shadow group"
                >
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">{country.flag}</div>
                  <h3 className="font-semibold text-gray-900">{country.name}</h3>
                  <p className="text-sm text-gray-600">{count} jobs</p>
                </button>
              )
            })}
          </div>
        )}

        {/* Indian States Tab */}
        {activeTab === 'india' && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {INDIAN_STATES.map((state) => {
              const count = indianStateCounts[state] || 0
              return (
                <button
                  key={state}
                  onClick={() => handleRegionClick(state)}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center hover:shadow-md transition-shadow group"
                >
                  <MapPinned className="w-6 h-6 text-blue-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold text-gray-900">{state}</h3>
                  <p className="text-sm text-gray-600">{count} jobs</p>
                </button>
              )
            })}
          </div>
        )}

        {/* Cities Tab */}
        {activeTab === 'cities' && (
          <div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {displayedCities.map((city) => {
                const count = cityCounts[city] || 0
                return (
                  <button
                    key={city}
                    onClick={() => handleCityClick(city)}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center hover:shadow-md transition-shadow group"
                  >
                    <MapPin className="w-5 h-5 text-blue-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                    <h3 className="font-semibold text-gray-900 text-sm">{city}</h3>
                    <p className="text-sm text-gray-600">{count} jobs</p>
                  </button>
                )
              })}
            </div>
            {POPULAR_CITIES.length > 12 && (
              <div className="text-center mt-6">
                <button
                  onClick={() => setShowAllCities(!showAllCities)}
                  className="px-6 py-2 bg-blue-50 text-blue-600 rounded-lg font-medium hover:bg-blue-100 transition-colors"
                >
                  {showAllCities ? 'Show Less' : `Show All ${POPULAR_CITIES.length} Cities`}
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Categories */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Popular Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {CATEGORY_CONFIG.map((cat) => {
              const count = categoryCounts[cat.name] || 0
              return (
                <button
                  key={cat.name}
                  onClick={() => handleCategoryClick(cat.name)}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center hover:shadow-md transition-shadow group text-left w-full"
                >
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{cat.icon}</div>
                  <h3 className="font-semibold text-gray-900">{cat.name}</h3>
                  <p className="text-sm text-gray-600">{count} jobs</p>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Featured Jobs - Show first 6 jobs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Featured Jobs</h2>
          <Link to="/jobs" className="text-blue-600 hover:text-blue-700 font-medium flex items-center">
            View All <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ALL_JOBS.slice(0, 6).map((job) => (
            <div key={job.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-blue-600" />
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                  {job.location.split(', ').pop()}
                </span>
              </div>
              
              <Link to={`/jobs/${job.id}`} className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                {job.title}
              </Link>
              <p className="text-sm text-gray-600 mt-1">{job.company_name}</p>
              
              <div className="flex flex-wrap items-center gap-2 mt-3 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {job.location}
                </span>
                {job.is_remote && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                    Remote
                  </span>
                )}
                {job.is_hybrid && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                    Hybrid
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                <Briefcase className="w-3.5 h-3.5" />
                {job.job_type.replace('_', ' ')}
                <span className="text-gray-300">|</span>
                <span className="capitalize">{job.experience_level}</span>
              </div>

              {job.salary_min && (
                <div className="flex items-center gap-1 mt-2 text-sm text-gray-700 font-medium">
                  {formatSalary(job.salary_min, job.salary_max, job.salary_currency)}
                </div>
              )}

              <div className="flex flex-wrap gap-2 mt-3">
                {job.skills?.slice(0, 3).map((skill) => (
                  <span key={skill.id} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Create Account</h3>
              <p className="text-gray-600">Sign up and complete your profile to get started</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Find Jobs</h3>
              <p className="text-gray-600">Search by country, state, city, or category worldwide</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Get Hired</h3>
              <p className="text-gray-600">Apply and track your applications until you get hired</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Next Opportunity?</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals worldwide who have found their dream jobs through our platform
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/register" className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-colors">
              Get Started
            </Link>
            <Link to="/jobs" className="px-8 py-3 border-2 border-white text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors">
              Browse Jobs
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}