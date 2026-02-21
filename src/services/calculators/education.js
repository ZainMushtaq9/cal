const educationCalculators = [
    {
        name: "GPA Calculator",
        slug: "gpa-calculator",
        category: "education",
        seo_title: "GPA Calculator - Calculate Your Grade Point Average",
        description: "Calculate your GPA based on course grades and credit hours.",
        content: "<h2>Understanding GPA</h2><p>GPA (Grade Point Average) is calculated by dividing the total grade points earned by the total credit hours attempted. Each letter grade corresponds to a point value: A=4.0, B=3.0, C=2.0, D=1.0, F=0.0. This calculator lets you enter your total grade points and total credits to get your GPA. For a detailed per-course calculation, enter cumulative values.</p><h2>Worked Example</h2><p>Total grade points: 45, Total credits: 15 → GPA = 45/15 = 3.0 (B average).</p>",
        formula: "GPA = Total Grade Points / Total Credit Hours",
        variables: [
            { id: "gradePoints", label: "Total Grade Points", type: "number", default: 45 },
            { id: "creditHours", label: "Total Credit Hours", type: "number", default: 15 }
        ],
        faqs: [
            { q: "What GPA is considered good?", a: "A GPA of 3.0 or above is generally considered good. 3.5+ is very good, and 3.8+ is excellent." }
        ]
    },
    {
        name: "CGPA Converter",
        slug: "cgpa-converter",
        category: "education",
        seo_title: "CGPA to Percentage Converter - Convert Your Grades",
        description: "Convert CGPA to percentage and vice versa using standard conversion formulas.",
        content: "<h2>CGPA to Percentage Conversion</h2><p>Many universities use CGPA (Cumulative Grade Point Average) on a 10-point scale. The common conversion formula is: Percentage = CGPA × 9.5. This is widely used in India and many other education systems. Note that different institutions may use slightly different multipliers.</p><h2>Worked Example</h2><p>CGPA 8.2 → Percentage = 8.2 × 9.5 = 77.9%.</p>",
        formula: "Percentage = CGPA × Multiplier",
        variables: [
            { id: "cgpa", label: "CGPA (out of 10)", type: "number", default: 8.2 },
            { id: "multiplier", label: "Multiplier (default 9.5)", type: "number", default: 9.5 }
        ],
        faqs: [
            { q: "Is the 9.5 multiplier universal?", a: "No, it's commonly used. Check with your specific institution for their conversion factor." }
        ]
    },
    {
        name: "Percentage to GPA Converter",
        slug: "percentage-to-gpa-converter",
        category: "education",
        seo_title: "Percentage to GPA Converter - US Scale Conversion",
        description: "Convert your percentage score to the US 4.0 GPA scale.",
        content: "<h2>Converting Percentage to GPA</h2><p>When applying to US universities, international students often need to convert their percentage scores to the 4.0 GPA scale. While there's no universally standard conversion, a common approach is: 90-100% = 4.0, 80-89% = 3.0-3.9, 70-79% = 2.0-2.9, 60-69% = 1.0-1.9, below 60% = 0.0.</p><h2>Worked Example</h2><p>85% → Approximate GPA = 3.5 on a 4.0 scale.</p>",
        formula: "GPA ≈ (Percentage / 100) × 4.0",
        variables: [
            { id: "percentage", label: "Percentage Score (%)", type: "number", default: 85 }
        ],
        faqs: [
            { q: "Is this conversion exact?", a: "No, this provides an approximation. Different universities may use different conversion scales." }
        ]
    }
];

module.exports = educationCalculators;
