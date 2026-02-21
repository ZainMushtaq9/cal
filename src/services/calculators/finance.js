const financeCalculators = [
    {
        name: "EMI Calculator",
        slug: "emi-calculator",
        category: "finance",
        seo_title: "Free EMI Calculator - Calculate Your Monthly Loan Equated Installments",
        description: "Calculate your Equated Monthly Installment (EMI) for home, car, or personal loans instantly.",
        content: "<h2>How the EMI Calculator Works</h2><p>An Equated Monthly Installment (EMI) is a fixed payment amount made by a borrower to a lender at a specified date each calendar month. EMIs are used to pay off both interest and principal each month so that over a specified number of years, the loan is paid off in full. The EMI depends on three key factors: the principal loan amount, the interest rate, and the loan tenure. Higher principal or interest rates result in higher EMIs, while longer tenures reduce the monthly payment but increase total interest paid. This calculator uses the standard reducing balance method to compute your EMI accurately.</p><h2>Step-by-Step Formula Explanation</h2><p>The EMI is calculated using the formula: <strong>EMI = P × r × (1+r)^n / ((1+r)^n – 1)</strong>, where P is the principal, r is the monthly interest rate (annual rate divided by 12 and then by 100), and n is the number of monthly installments. For example, a loan of $100,000 at 10% annual interest for 5 years (60 months) gives a monthly rate of 0.00833. Plugging in: EMI = 100000 × 0.00833 × (1.00833)^60 / ((1.00833)^60 – 1) ≈ $2,124.70 per month.</p>",
        formula: "EMI = P × r × (1+r)^n / ((1+r)^n – 1)",
        variables: [
            { id: "principal", label: "Principal Amount ($)", type: "number", default: 100000 },
            { id: "rate", label: "Annual Interest Rate (%)", type: "number", default: 10 },
            { id: "tenure", label: "Loan Tenure (Years)", type: "number", default: 5 }
        ],
        faqs: [
            { q: "What is an EMI?", a: "EMI stands for Equated Monthly Installment. It is the fixed amount you pay each month towards repaying a loan, covering both principal and interest." },
            { q: "Does a longer tenure reduce EMI?", a: "Yes, extending the loan tenure reduces your monthly EMI, but you end up paying more total interest over the life of the loan." },
            { q: "Can I prepay my loan to reduce EMI?", a: "Most lenders allow prepayment. You can either reduce your EMI amount or shorten your loan tenure by making prepayments." }
        ]
    },
    {
        name: "Loan Interest Calculator",
        slug: "loan-interest-calculator",
        category: "finance",
        seo_title: "Loan Interest Calculator - Find Total Interest on Any Loan",
        description: "Calculate the total interest you will pay over the life of any loan based on principal, rate, and term.",
        content: "<h2>Understanding Loan Interest</h2><p>When you borrow money, the lender charges you interest as the cost of lending. The total interest paid over the life of a loan depends on the principal amount, the interest rate, and the duration of the loan. This calculator computes the monthly payment, total amount paid, and total interest charged. Understanding your total interest helps you compare loan offers and make smarter financial decisions.</p><h2>Worked Example</h2><p>For a $50,000 loan at 7% annual interest over 10 years: Monthly payment ≈ $580.54; Total paid = $69,665; Total Interest = $19,665.</p>",
        formula: "Total Interest = (Monthly Payment × n) – P",
        variables: [
            { id: "principal", label: "Loan Amount ($)", type: "number", default: 50000 },
            { id: "rate", label: "Annual Interest Rate (%)", type: "number", default: 7 },
            { id: "tenure", label: "Loan Term (Years)", type: "number", default: 10 }
        ],
        faqs: [
            { q: "What factors affect total loan interest?", a: "The principal amount, interest rate, and loan term all affect the total interest paid." },
            { q: "Is a lower interest rate always better?", a: "Generally yes, but also consider fees, prepayment penalties, and loan flexibility." }
        ]
    },
    {
        name: "Mortgage Calculator",
        slug: "mortgage-calculator",
        category: "finance",
        seo_title: "Mortgage Calculator - Estimate Monthly Home Loan Payments",
        description: "Easily estimate your monthly mortgage payments including principal and interest.",
        content: "<h2>How to Calculate Your Mortgage</h2><p>A mortgage calculator helps you estimate the monthly payments for a home loan. Enter your home price, down payment, loan term, and interest rate. The calculator subtracts your down payment from the home price to determine the loan principal, then applies the amortization formula to compute your monthly payment. This does not include property taxes, insurance, or PMI, which you should budget separately.</p><h2>Worked Example</h2><p>For a $300,000 home with $60,000 down at 4.5% for 30 years: Loan = $240,000; Monthly payment ≈ $1,216.04.</p>",
        formula: "M = P × [r(1+r)^n] / [(1+r)^n – 1]",
        variables: [
            { id: "homePrice", label: "Home Price ($)", type: "number", default: 300000 },
            { id: "downPayment", label: "Down Payment ($)", type: "number", default: 60000 },
            { id: "term", label: "Loan Term (Years)", type: "number", default: 30 },
            { id: "rate", label: "Interest Rate (%)", type: "number", default: 4.5 }
        ],
        faqs: [
            { q: "Does this include taxes and insurance?", a: "No. This calculates principal and interest only. Add property tax and insurance costs separately." },
            { q: "What is a good down payment?", a: "20% is traditional and avoids PMI, but many loans allow 3-5% down." }
        ]
    },
    {
        name: "Compound Interest Calculator",
        slug: "compound-interest-calculator",
        category: "finance",
        seo_title: "Compound Interest Calculator - See Your Investments Grow",
        description: "Calculate how much your investments can grow with the power of compound interest over time.",
        content: "<h2>Understanding Compound Interest</h2><p>Compound interest is the addition of interest to the principal sum, so that interest is earned on the previously accumulated interest as well. This is what makes investments grow exponentially over time. The frequency of compounding (annually, monthly, daily) significantly impacts the final amount. Albert Einstein reportedly called compound interest the eighth wonder of the world.</p><h2>Worked Example</h2><p>$10,000 invested at 5% compounded annually for 10 years: A = 10000 × (1.05)^10 ≈ $16,288.95.</p>",
        formula: "A = P × (1 + r/n)^(n×t)",
        variables: [
            { id: "principal", label: "Initial Investment ($)", type: "number", default: 10000 },
            { id: "rate", label: "Annual Interest Rate (%)", type: "number", default: 5 },
            { id: "years", label: "Years to Grow", type: "number", default: 10 },
            { id: "frequency", label: "Compound Frequency (per year)", type: "number", default: 12 }
        ],
        faqs: [
            { q: "What is compound interest?", a: "It's interest calculated on both the initial principal and previously accumulated interest." },
            { q: "How often should interest compound?", a: "More frequent compounding (monthly, daily) yields slightly higher returns than annual compounding." }
        ]
    },
    {
        name: "Simple Interest Calculator",
        slug: "simple-interest-calculator",
        category: "finance",
        seo_title: "Simple Interest Calculator - Quick Interest Computation",
        description: "Calculate simple interest on any principal amount with a given rate and time period.",
        content: "<h2>What is Simple Interest?</h2><p>Simple interest is a method of calculating interest where the interest charge is always based on the original principal amount. Unlike compound interest, simple interest does not compound — meaning you don't earn interest on previously earned interest. It is commonly used for short-term loans and some bonds.</p><h2>Worked Example</h2><p>$5,000 at 6% for 3 years: Interest = 5000 × 0.06 × 3 = $900. Total Amount = $5,900.</p>",
        formula: "SI = P × R × T / 100",
        variables: [
            { id: "principal", label: "Principal Amount ($)", type: "number", default: 5000 },
            { id: "rate", label: "Annual Interest Rate (%)", type: "number", default: 6 },
            { id: "time", label: "Time Period (Years)", type: "number", default: 3 }
        ],
        faqs: [
            { q: "Where is simple interest used?", a: "Car loans, short-term personal loans, and some certificates of deposit use simple interest." }
        ]
    },
    {
        name: "SIP Calculator",
        slug: "sip-calculator",
        category: "finance",
        seo_title: "SIP Calculator - Systematic Investment Plan Returns",
        description: "Calculate the future value of your Systematic Investment Plan (SIP) contributions.",
        content: "<h2>Understanding SIP Investments</h2><p>A Systematic Investment Plan allows you to invest a fixed amount regularly (usually monthly) in mutual funds. SIP harnesses the power of compounding and rupee cost averaging, making it a popular strategy for long-term wealth creation. The future value depends on your monthly contribution, expected return rate, and investment duration.</p><h2>Worked Example</h2><p>$500/month for 10 years at 12% annual return: Future Value ≈ $115,019.</p>",
        formula: "FV = P × [((1+r)^n – 1) / r] × (1+r)",
        variables: [
            { id: "monthly", label: "Monthly Investment ($)", type: "number", default: 500 },
            { id: "rate", label: "Expected Annual Return (%)", type: "number", default: 12 },
            { id: "years", label: "Investment Period (Years)", type: "number", default: 10 }
        ],
        faqs: [
            { q: "What is a SIP?", a: "A Systematic Investment Plan is a method of investing a fixed sum regularly in mutual funds." }
        ]
    },
    {
        name: "Investment Return Calculator",
        slug: "investment-return-calculator",
        category: "finance",
        seo_title: "Investment Return Calculator - Track Your Portfolio Growth",
        description: "Calculate the total return and annualized return on any investment.",
        content: "<h2>Measuring Investment Returns</h2><p>This calculator helps you determine the total return and annualized return of an investment given the initial and final values. Understanding your returns is crucial for comparing different investment opportunities and tracking portfolio performance over time.</p><h2>Worked Example</h2><p>Invested $10,000, now worth $18,000 after 5 years: Total Return = 80%; Annualized Return ≈ 12.47%.</p>",
        formula: "Annualized Return = ((FV/PV)^(1/t) – 1) × 100",
        variables: [
            { id: "initialValue", label: "Initial Investment ($)", type: "number", default: 10000 },
            { id: "finalValue", label: "Current Value ($)", type: "number", default: 18000 },
            { id: "years", label: "Holding Period (Years)", type: "number", default: 5 }
        ],
        faqs: [
            { q: "What is annualized return?", a: "It is the geometric average amount of money earned by an investment each year over a given time period." }
        ]
    },
    {
        name: "Savings Goal Calculator",
        slug: "savings-goal-calculator",
        category: "finance",
        seo_title: "Savings Goal Calculator - Plan Your Financial Future",
        description: "Determine how much you need to save each month to reach your financial goal.",
        content: "<h2>Planning Your Savings Goal</h2><p>Whether you're saving for a vacation, emergency fund, or a major purchase, this calculator tells you exactly how much to set aside each month. Enter your target amount, current savings, expected interest rate, and timeline to get your monthly savings requirement.</p><h2>Worked Example</h2><p>Goal: $20,000 in 3 years, currently have $2,000, earning 4% annually: Monthly savings needed ≈ $466.</p>",
        formula: "Monthly Savings = (Goal – PV×(1+r)^n) / (((1+r)^n–1)/r)",
        variables: [
            { id: "goal", label: "Savings Goal ($)", type: "number", default: 20000 },
            { id: "current", label: "Current Savings ($)", type: "number", default: 2000 },
            { id: "rate", label: "Annual Interest Rate (%)", type: "number", default: 4 },
            { id: "years", label: "Time to Goal (Years)", type: "number", default: 3 }
        ],
        faqs: [
            { q: "Should I include interest in my savings plan?", a: "Yes, if your savings earn interest (e.g., in a high-yield savings account), include it for a more accurate plan." }
        ]
    },
    {
        name: "Credit Card Payoff Calculator",
        slug: "credit-card-payoff-calculator",
        category: "finance",
        seo_title: "Credit Card Payoff Calculator - Eliminate Debt Faster",
        description: "Find out how long it will take to pay off your credit card balance and how much interest you'll pay.",
        content: "<h2>Paying Off Credit Card Debt</h2><p>Credit card interest rates are among the highest in consumer lending, often 15-25% APR. This calculator shows how long it will take to pay off your balance with a given monthly payment, and the total interest you'll pay. Increasing your monthly payment even slightly can save you thousands in interest and years of debt.</p><h2>Worked Example</h2><p>$5,000 balance at 20% APR with $200/month payments: Takes ~32 months, total interest ≈ $1,314.</p>",
        formula: "Months = -log(1 – (B×r/P)) / log(1+r)",
        variables: [
            { id: "balance", label: "Current Balance ($)", type: "number", default: 5000 },
            { id: "rate", label: "Annual Interest Rate (%)", type: "number", default: 20 },
            { id: "payment", label: "Monthly Payment ($)", type: "number", default: 200 }
        ],
        faqs: [
            { q: "Should I pay more than the minimum?", a: "Absolutely. Paying only the minimum can take decades and cost thousands in interest." }
        ]
    },
    {
        name: "Debt Snowball Calculator",
        slug: "debt-snowball-calculator",
        category: "finance",
        seo_title: "Debt Snowball Calculator - Fastest Way to Become Debt Free",
        description: "Use the debt snowball method to plan the fastest route to becoming debt-free.",
        content: "<h2>The Debt Snowball Strategy</h2><p>The debt snowball method involves paying off debts from smallest to largest balance, regardless of interest rate. As each smaller debt is paid off, the freed-up payment is rolled into the next debt. This method provides psychological wins that keep you motivated. Enter your total debt, average rate, and monthly budget for debt repayment to see your payoff timeline.</p><h2>Worked Example</h2><p>$15,000 total debt at 15% average rate with $500/month: Payoff in ~39 months.</p>",
        formula: "Payoff Months ≈ -log(1 – B×r/P) / log(1+r)",
        variables: [
            { id: "totalDebt", label: "Total Debt ($)", type: "number", default: 15000 },
            { id: "rate", label: "Average Interest Rate (%)", type: "number", default: 15 },
            { id: "payment", label: "Monthly Payment Budget ($)", type: "number", default: 500 }
        ],
        faqs: [
            { q: "Snowball vs Avalanche: which is better?", a: "Avalanche saves more on interest (highest rate first), but Snowball provides quicker wins (smallest balance first). Choose what keeps you motivated." }
        ]
    }
];

module.exports = financeCalculators;
