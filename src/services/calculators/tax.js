const taxCalculators = [
    {
        name: "Income Tax Calculator",
        slug: "income-tax-calculator",
        category: "tax",
        seo_title: "Income Tax Calculator (US) - Estimate Your Federal Tax",
        description: "Estimate your US federal income tax based on filing status and annual income.",
        content: "<h2>How US Federal Income Tax Works</h2><p>The US federal income tax system uses a progressive tax bracket structure. This means different portions of your income are taxed at different rates. Your effective tax rate is always lower than your marginal (highest) bracket. This calculator uses the standard deduction for your filing status to compute your taxable income, then applies the 2024 tax brackets to estimate your total federal tax liability.</p><h2>Worked Example</h2><p>Single filer earning $75,000: Standard deduction = $14,600; Taxable income = $60,400; Estimated Tax ≈ $8,660.</p>",
        formula: "Tax = Σ (Bracket Rate × Income in Bracket)",
        variables: [
            { id: "income", label: "Annual Gross Income ($)", type: "number", default: 75000 },
            { id: "filingStatus", label: "Filing Status (1=Single, 2=Married)", type: "number", default: 1 }
        ],
        faqs: [
            { q: "What is the standard deduction for 2024?", a: "$14,600 for single filers, $29,200 for married filing jointly." },
            { q: "Does this include state tax?", a: "No, this calculates federal income tax only." }
        ]
    },
    {
        name: "Capital Gains Tax Calculator",
        slug: "capital-gains-tax-calculator",
        category: "tax",
        seo_title: "Capital Gains Tax Calculator - Estimate Tax on Investments",
        description: "Calculate the tax owed on your investment gains from stocks, real estate, or other assets.",
        content: "<h2>Understanding Capital Gains Tax</h2><p>When you sell an asset for more than you paid, the profit is a capital gain and is subject to tax. Short-term gains (assets held less than a year) are taxed as ordinary income. Long-term gains (held over a year) are taxed at preferential rates of 0%, 15%, or 20% depending on your income level. This calculator helps estimate your capital gains tax liability.</p><h2>Worked Example</h2><p>Bought stock for $10,000, sold for $15,000 after 2 years with $50,000 income: Long-term gain = $5,000; Tax at 15% = $750.</p>",
        formula: "Capital Gains Tax = Gain × Tax Rate",
        variables: [
            { id: "purchasePrice", label: "Purchase Price ($)", type: "number", default: 10000 },
            { id: "salePrice", label: "Sale Price ($)", type: "number", default: 15000 },
            { id: "holdingPeriod", label: "Holding Period (1=Short-term, 2=Long-term)", type: "number", default: 2 },
            { id: "income", label: "Annual Income ($)", type: "number", default: 50000 }
        ],
        faqs: [
            { q: "What is the difference between short-term and long-term gains?", a: "Short-term gains are on assets held for 1 year or less and taxed as ordinary income. Long-term gains are on assets held over 1 year and taxed at lower rates." }
        ]
    },
    {
        name: "Sales Tax Calculator",
        slug: "sales-tax-calculator",
        category: "tax",
        seo_title: "Sales Tax Calculator - Calculate Tax on Purchases",
        description: "Quickly calculate the sales tax amount and total price for any purchase.",
        content: "<h2>How Sales Tax Works</h2><p>Sales tax is a consumption tax imposed by the government on the sale of goods and services. The rate varies by state and locality. This simple calculator takes the price of an item and the applicable tax rate to compute the tax amount and total cost. Useful for budgeting and understanding the true cost of purchases.</p><h2>Worked Example</h2><p>Item price $49.99 at 8.25% tax: Tax = $4.12; Total = $54.11.</p>",
        formula: "Tax Amount = Price × (Rate / 100)",
        variables: [
            { id: "price", label: "Item Price ($)", type: "number", default: 49.99 },
            { id: "taxRate", label: "Sales Tax Rate (%)", type: "number", default: 8.25 }
        ],
        faqs: [
            { q: "Which states have no sales tax?", a: "Alaska, Delaware, Montana, New Hampshire, and Oregon have no state sales tax." }
        ]
    },
    {
        name: "VAT Calculator",
        slug: "vat-calculator",
        category: "tax",
        seo_title: "VAT Calculator - Add or Remove Value Added Tax",
        description: "Calculate VAT-inclusive or VAT-exclusive prices for any product or service.",
        content: "<h2>Understanding Value Added Tax</h2><p>VAT (Value Added Tax) is a consumption tax placed on a product at each stage of production where value is added. It is common in Europe and many other countries. This calculator helps you add VAT to a net price or extract VAT from a gross price. Standard VAT rates vary by country (e.g., 20% in the UK, 19% in Germany).</p><h2>Worked Example</h2><p>Net price £100 at 20% VAT: VAT = £20; Gross price = £120.</p>",
        formula: "VAT Amount = Net Price × (VAT Rate / 100)",
        variables: [
            { id: "netPrice", label: "Net Price", type: "number", default: 100 },
            { id: "vatRate", label: "VAT Rate (%)", type: "number", default: 20 }
        ],
        faqs: [
            { q: "What is the difference between VAT and sales tax?", a: "VAT is collected at every stage of production, while sales tax is collected only at the final point of sale." }
        ]
    }
];

module.exports = taxCalculators;
