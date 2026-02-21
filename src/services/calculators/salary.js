const salaryCalculators = [
    {
        name: "Salary to Hourly Converter",
        slug: "salary-to-hourly-converter",
        category: "salary",
        seo_title: "Salary to Hourly Converter - Know Your Hourly Rate",
        description: "Convert your annual salary to an equivalent hourly wage based on work hours.",
        content: "<h2>Converting Salary to Hourly Rate</h2><p>Whether you're comparing job offers or budgeting your time, knowing your hourly rate is essential. This calculator takes your annual salary and breaks it down based on your weekly work hours. The standard assumption is 52 working weeks per year and 40 hours per week (2,080 hours total), but you can customize these values.</p><h2>Worked Example</h2><p>$60,000 salary ÷ 2,080 hours = $28.85/hour.</p>",
        formula: "Hourly Rate = Annual Salary / (Hours per Week × 52)",
        variables: [
            { id: "salary", label: "Annual Salary ($)", type: "number", default: 60000 },
            { id: "hoursPerWeek", label: "Hours per Week", type: "number", default: 40 }
        ],
        faqs: [
            { q: "Is this before or after taxes?", a: "This converts gross (before-tax) salary to gross hourly rate." }
        ]
    },
    {
        name: "Overtime Pay Calculator",
        slug: "overtime-pay-calculator",
        category: "salary",
        seo_title: "Overtime Pay Calculator - Calculate Your Extra Earnings",
        description: "Calculate how much overtime pay you'll earn for extra hours worked.",
        content: "<h2>Understanding Overtime Pay</h2><p>Under the Fair Labor Standards Act (FLSA), non-exempt employees must receive overtime pay of at least 1.5× their regular rate for hours worked beyond 40 in a workweek. Some states and employers offer double-time for holidays or excessive hours. This calculator helps you estimate your total overtime earnings.</p><h2>Worked Example</h2><p>Regular rate $25/hour, 10 overtime hours at 1.5×: Overtime pay = 10 × $37.50 = $375.</p>",
        formula: "Overtime Pay = Overtime Hours × Hourly Rate × Multiplier",
        variables: [
            { id: "hourlyRate", label: "Regular Hourly Rate ($)", type: "number", default: 25 },
            { id: "overtimeHours", label: "Overtime Hours Worked", type: "number", default: 10 },
            { id: "multiplier", label: "Overtime Multiplier (e.g., 1.5)", type: "number", default: 1.5 }
        ],
        faqs: [
            { q: "What is the standard overtime rate?", a: "Federal law requires 1.5× pay for hours over 40 per week." }
        ]
    },
    {
        name: "Freelance Rate Calculator",
        slug: "freelance-rate-calculator",
        category: "salary",
        seo_title: "Freelance Rate Calculator - Set Your Consulting Rate",
        description: "Calculate a competitive freelance hourly rate based on your target income and expenses.",
        content: "<h2>Setting Your Freelance Rate</h2><p>Freelancers need to account for self-employment taxes, health insurance, business expenses, vacation, and non-billable hours when setting rates. This calculator takes your desired annual income, adds estimated expenses and taxes, then divides by your realistic billable hours to compute a sustainable hourly rate.</p><h2>Worked Example</h2><p>Target income $80,000 + $15,000 expenses + 30% taxes, 1,500 billable hours/year: Rate ≈ $82.33/hour.</p>",
        formula: "Hourly Rate = (Target Income + Expenses) × (1 + Tax%) / Billable Hours",
        variables: [
            { id: "targetIncome", label: "Target Annual Income ($)", type: "number", default: 80000 },
            { id: "expenses", label: "Annual Business Expenses ($)", type: "number", default: 15000 },
            { id: "taxRate", label: "Estimated Tax Rate (%)", type: "number", default: 30 },
            { id: "billableHours", label: "Billable Hours per Year", type: "number", default: 1500 }
        ],
        faqs: [
            { q: "How many hours are billable?", a: "Most freelancers bill about 60-70% of their working hours. Administration, marketing, and learning take the rest." }
        ]
    }
];

module.exports = salaryCalculators;
