# CalcMaster - Multi-Tool Calculator Website

A high-performance, SEO-optimized, scalable multi-tool calculator website featuring 30 free tools with AI-driven formula validation.

## Features
- **30 Calculators** across Finance, Tax, Salary, Education, Health & Utility
- **AI Formula Validation** using Groq API (llama-3.1-8b-instant)
- **SEO Optimized** with dynamic meta tags, JSON-LD Schema, sitemap.xml, robots.txt
- **Dark Mode** support
- **Admin Dashboard** for managing calculators and viewing AI validation logs
- **Legal Pages**: Privacy Policy, Terms of Service, Disclaimer, Cookie Policy

## Tech Stack
- **Backend**: Node.js, Express.js, EJS templating
- **Database**: SQLite3
- **Styling**: TailwindCSS, Google Fonts (Inter)
- **AI**: Groq API for automated mathematical formula validation
- **Scheduling**: node-cron for periodic validation jobs

## Getting Started

```bash
# Install dependencies
npm install

# Build Tailwind CSS
npm run build:css

# Start development server
npm run dev

# Or start production server
npm start
```

## Environment Variables
Create a `.env` file in root:
```
PORT=3000
GROQ_API_KEY=your_groq_api_key_here
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin
```

## Calculator Categories
| Category | Count | Examples |
|----------|-------|---------|
| Finance | 10 | EMI, Mortgage, SIP, Compound Interest |
| Tax | 4 | Income Tax, Capital Gains, Sales Tax, VAT |
| Salary | 3 | Salary-to-Hourly, Overtime, Freelance Rate |
| Education | 3 | GPA, CGPA Converter, Percentage-to-GPA |
| Health | 3 | BMI, BMR, Calorie Calculator |
| Utility | 7 | Age, Date Diff, Percentage, Discount, Unit/Currency Converter |

## License
MIT
