const utilityCalculators = [
    {
        name: "Age Calculator",
        slug: "age-calculator",
        category: "utility",
        seo_title: "Age Calculator - Find Your Exact Age in Years, Months, Days",
        description: "Calculate your exact age in years, months, and days from your date of birth.",
        content: "<h2>How Age is Calculated</h2><p>This calculator determines your exact age from your birth date to today (or any other date). It accounts for varying month lengths and leap years. Simply enter your birth year, month, and day to see your age broken down into years, months, and days.</p>",
        formula: "Age = Current Date – Birth Date",
        variables: [
            { id: "birthYear", label: "Birth Year", type: "number", default: 1995 },
            { id: "birthMonth", label: "Birth Month (1-12)", type: "number", default: 6 },
            { id: "birthDay", label: "Birth Day (1-31)", type: "number", default: 15 }
        ],
        faqs: [
            { q: "Does this account for leap years?", a: "Yes, the calculation automatically accounts for leap years." }
        ]
    },
    {
        name: "Date Difference Calculator",
        slug: "date-difference-calculator",
        category: "utility",
        seo_title: "Date Difference Calculator - Days Between Two Dates",
        description: "Calculate the number of days, weeks, and months between any two dates.",
        content: "<h2>Finding the Difference Between Dates</h2><p>Whether you're counting down to an event or tracking project timelines, this calculator gives you the exact number of days between two dates. Enter start year/month/day and end year/month/day to see the difference in total days.</p>",
        formula: "Difference = End Date – Start Date",
        variables: [
            { id: "startYear", label: "Start Year", type: "number", default: 2024 },
            { id: "startMonth", label: "Start Month (1-12)", type: "number", default: 1 },
            { id: "startDay", label: "Start Day (1-31)", type: "number", default: 1 },
            { id: "endYear", label: "End Year", type: "number", default: 2025 },
            { id: "endMonth", label: "End Month (1-12)", type: "number", default: 1 },
            { id: "endDay", label: "End Day (1-31)", type: "number", default: 1 }
        ],
        faqs: [
            { q: "Does this include the end date?", a: "The result counts the number of days from start date to end date, not including the end date itself." }
        ]
    },
    {
        name: "Percentage Calculator",
        slug: "percentage-calculator",
        category: "utility",
        seo_title: "Percentage Calculator - Quick Percentage Computations",
        description: "Calculate percentages quickly — what is X% of Y, or what percentage is X of Y.",
        content: "<h2>Working with Percentages</h2><p>This calculator answers the most common percentage question: 'What is X% of Y?' Enter the percentage value and the total number to get the result instantly. Useful for tips, discounts, tax calculations, and academic scores.</p>",
        formula: "Result = (Percentage / 100) × Total",
        variables: [
            { id: "percentage", label: "Percentage (%)", type: "number", default: 25 },
            { id: "total", label: "Total Value", type: "number", default: 200 }
        ],
        faqs: [
            { q: "How do I calculate what percentage X is of Y?", a: "Divide X by Y and multiply by 100. For example, 50 of 200 = (50/200)×100 = 25%." }
        ]
    },
    {
        name: "Discount Calculator",
        slug: "discount-calculator",
        category: "utility",
        seo_title: "Discount Calculator - Find Sale Price After Discount",
        description: "Calculate the final price after applying a discount percentage to any item.",
        content: "<h2>Calculating Discounts</h2><p>Shopping sales can be confusing. This calculator takes the original price and discount percentage to show you exactly how much you save and what the final price will be. Great for comparing deals and staying within budget during sales events.</p>",
        formula: "Final Price = Original Price × (1 – Discount% / 100)",
        variables: [
            { id: "originalPrice", label: "Original Price ($)", type: "number", default: 100 },
            { id: "discount", label: "Discount (%)", type: "number", default: 20 }
        ],
        faqs: [
            { q: "Can I stack multiple discounts?", a: "If applying two discounts sequentially, the second applies to the already-discounted price, not the original." }
        ]
    },
    {
        name: "Time Duration Calculator",
        slug: "time-duration-calculator",
        category: "utility",
        seo_title: "Time Duration Calculator - Add or Subtract Time",
        description: "Calculate the duration between two times or add hours, minutes, and seconds.",
        content: "<h2>Calculating Time Durations</h2><p>Need to know how long something takes? Enter start and end times in hours and minutes to find the total duration. Useful for tracking work hours, exercise periods, cooking times, and project management.</p>",
        formula: "Duration = End Time – Start Time",
        variables: [
            { id: "startHours", label: "Start Hours (0-23)", type: "number", default: 9 },
            { id: "startMinutes", label: "Start Minutes (0-59)", type: "number", default: 0 },
            { id: "endHours", label: "End Hours (0-23)", type: "number", default: 17 },
            { id: "endMinutes", label: "End Minutes (0-59)", type: "number", default: 30 }
        ],
        faqs: [
            { q: "Does this work across midnight?", a: "Yes, if the end time is smaller than the start time, it assumes the end is the next day." }
        ]
    },
    {
        name: "Unit Converter",
        slug: "unit-converter",
        category: "utility",
        seo_title: "Unit Converter - Convert Length, Weight, Temperature",
        description: "Convert between common units of length, weight, and temperature.",
        content: "<h2>Quick Unit Conversions</h2><p>This converter handles the most common unit conversions. Enter a value and select the conversion type: kilometers to miles (÷1.60934), kilograms to pounds (×2.20462), or Celsius to Fahrenheit (×9/5+32). Quick, accurate, and useful for travel, cooking, and science.</p>",
        formula: "km→mi: ÷1.609 | kg→lb: ×2.205 | °C→°F: ×9/5+32",
        variables: [
            { id: "value", label: "Value to Convert", type: "number", default: 100 },
            { id: "conversionType", label: "Type (1=km→mi, 2=kg→lb, 3=°C→°F)", type: "number", default: 1 }
        ],
        faqs: [
            { q: "How accurate is this?", a: "Conversions use standard SI conversion factors and are accurate to several decimal places." }
        ]
    },
    {
        name: "Currency Converter",
        slug: "currency-converter",
        category: "utility",
        seo_title: "Currency Converter - Convert Between World Currencies",
        description: "Convert amounts between major world currencies using approximate exchange rates.",
        content: "<h2>Currency Conversion</h2><p>This converter uses approximate exchange rates for quick currency conversions. Enter the amount and an exchange rate to get the converted value. Note: exchange rates fluctuate constantly. For live rates, check a financial data provider. This tool is useful for quick estimations during travel planning or international shopping.</p>",
        formula: "Converted Amount = Amount × Exchange Rate",
        variables: [
            { id: "amount", label: "Amount", type: "number", default: 1000 },
            { id: "exchangeRate", label: "Exchange Rate (e.g., USD to EUR: 0.92)", type: "number", default: 0.92 }
        ],
        faqs: [
            { q: "Are these live exchange rates?", a: "No, you need to enter the current exchange rate manually. Check Google or XE.com for live rates." }
        ]
    }
];

module.exports = utilityCalculators;
