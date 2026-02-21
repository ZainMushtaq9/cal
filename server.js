const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Setup Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressLayouts);

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));
app.set('layout', 'layout');

// Initialize Database connection
const db = require('./src/models/db');

const adminRoutes = require('./src/routes/admin');
const { formulaRegistry } = require('./src/services/formulaRegistry');
const { initializeCalculators } = require('./src/services/calculators/index');
const { initCronJobs } = require('./src/services/cronJobs');

// Load calculator modules
initializeCalculators();

// Initialize the automated mathematical validation jobs
initCronJobs();

app.use('/admin', adminRoutes);

// ===================== HOMEPAGE =====================
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Free Financial & Utility Calculators',
        description: 'High-performance multi-tool calculators for finance, tax, health, and everyday utilities. Fast, accurate, and free.',
        calculators: Object.values(formulaRegistry)
    });
});

// ===================== CATEGORY PAGES =====================
const categories = {
    'finance-calculators': { cat: 'finance', title: 'Finance & Investment Calculators', desc: 'Calculate EMI, mortgage, compound interest, SIP, credit payoff, and more.' },
    'investment-calculators': { cat: 'finance', title: 'Investment Calculators', desc: 'Tools for SIP, compound interest, and investment returns.' },
    'tax-calculators': { cat: 'tax', title: 'Tax Calculators', desc: 'Estimate income tax, capital gains, sales tax, and VAT.' },
    'salary-calculators': { cat: 'salary', title: 'Salary & Work Calculators', desc: 'Convert salaries, calculate overtime, and set freelance rates.' },
    'education-calculators': { cat: 'education', title: 'Education Calculators', desc: 'Calculate GPA, convert CGPA, and translate percentage scores.' },
    'health-calculators': { cat: 'health', title: 'Health & Fitness Calculators', desc: 'Calculate BMI, BMR, and daily calorie needs.' },
    'utility-calculators': { cat: 'utility', title: 'Everyday Utility Calculators', desc: 'Age calculator, percentage, discount, unit converter, and more.' }
};

Object.entries(categories).forEach(([slug, meta]) => {
    app.get('/' + slug, (req, res) => {
        const calcs = Object.values(formulaRegistry).filter(c => c.category === meta.cat);
        res.render('category', {
            title: meta.title,
            description: meta.desc,
            categoryTitle: meta.title,
            categoryDescription: meta.desc,
            calculators: calcs
        });
    });
});

// ===================== LEGAL PAGES =====================
const legalPages = {
    'privacy-policy': {
        title: 'Privacy Policy',
        content: `<p><strong>Last updated: February 2026</strong></p>
        <p>CalcMaster ("we", "us", or "our") operates this website. This page informs you of our policies regarding the collection, use, and disclosure of personal information when you use our Service.</p>
        <h2>Information Collection</h2><p>We collect standard web analytics data through Google Analytics, including IP address, browser type, pages visited, and time spent. We do not collect personally identifiable information unless you voluntarily provide it.</p>
        <h2>Cookies</h2><p>We use cookies for analytics, ad personalization (via Google AdSense), and to remember your preferences (such as dark mode). You may disable cookies in your browser settings.</p>
        <h2>Third-Party Services</h2><p>We use Google Analytics and Google AdSense, which may collect data according to their own privacy policies. We recommend reviewing Google's privacy policy.</p>
        <h2>Data Security</h2><p>We take reasonable measures to protect information, but no method of transmission over the Internet is 100% secure.</p>
        <h2>Contact</h2><p>For privacy questions, contact us through our website.</p>`
    },
    'terms-of-service': {
        title: 'Terms of Service',
        content: `<p><strong>Last updated: February 2026</strong></p>
        <h2>Acceptance of Terms</h2><p>By accessing and using CalcMaster, you agree to be bound by these Terms of Service.</p>
        <h2>Use of Calculators</h2><p>Our calculators are provided for informational and educational purposes only. Results are estimates and should not be the sole basis for financial, tax, health, or legal decisions. Always consult a qualified professional.</p>
        <h2>Accuracy</h2><p>While we strive for mathematical accuracy and use AI-assisted validation, we make no warranties about the completeness or reliability of results. Formulas and tax rules may change over time.</p>
        <h2>Intellectual Property</h2><p>All content, design, and code are owned by CalcMaster. You may not reproduce, distribute, or create derivative works without permission.</p>
        <h2>Limitation of Liability</h2><p>CalcMaster shall not be liable for any damages arising from the use of our tools or reliance on calculation results.</p>
        <h2>Changes</h2><p>We reserve the right to modify these terms at any time. Continued use constitutes acceptance of updated terms.</p>`
    },
    'disclaimer': {
        title: 'Disclaimer',
        content: `<p><strong>Financial Advice Disclaimer</strong></p>
        <h2>Not Professional Advice</h2><p>The calculators and content on CalcMaster are for informational and educational purposes only. They are <strong>not</strong> financial, tax, investment, legal, or medical advice.</p>
        <h2>No Guarantee of Accuracy</h2><p>While we use AI-powered validation (Groq) to verify our formulas and keep tax brackets current, we cannot guarantee 100% accuracy at all times. Tax laws, regulations, and financial rules change frequently.</p>
        <h2>Consult a Professional</h2><p>Before making any financial, tax, investment, or health decisions, you should consult with a qualified professional who can consider your specific circumstances.</p>
        <h2>Use at Your Own Risk</h2><p>You use these tools at your own risk. CalcMaster and its team assume no responsibility for errors in calculations or for decisions made based on calculator outputs.</p>`
    },
    'cookie-policy': {
        title: 'Cookie Policy',
        content: `<p><strong>Last updated: February 2026</strong></p>
        <h2>What Are Cookies?</h2><p>Cookies are small text files placed on your device by websites you visit. They are widely used to make websites work efficiently and to provide reporting information.</p>
        <h2>How We Use Cookies</h2>
        <ul><li><strong>Essential Cookies:</strong> Store your dark mode preference.</li>
        <li><strong>Analytics Cookies:</strong> Google Analytics uses cookies to measure visits, page views, and user behavior to help us improve the site.</li>
        <li><strong>Advertising Cookies:</strong> Google AdSense may use cookies to show personalized ads based on your browsing history.</li></ul>
        <h2>Managing Cookies</h2><p>Most browsers allow you to block or delete cookies via settings. Note that disabling cookies may affect site functionality.</p>
        <h2>More Information</h2><p>For more about how Google uses cookies, visit <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noopener">Google's cookie policy</a>.</p>`
    }
};

Object.entries(legalPages).forEach(([slug, page]) => {
    app.get('/' + slug, (req, res) => {
        res.render('static', {
            title: page.title,
            description: page.title + ' - CalcMaster',
            pageTitle: page.title,
            content: page.content
        });
    });
});

// ===================== XML SITEMAP =====================
app.get('/sitemap.xml', (req, res) => {
    const baseUrl = 'https://calcmaster.com';
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    xml += `  <url><loc>${baseUrl}/</loc><priority>1.0</priority><changefreq>weekly</changefreq></url>\n`;
    Object.keys(categories).forEach(slug => {
        xml += `  <url><loc>${baseUrl}/${slug}</loc><priority>0.8</priority><changefreq>weekly</changefreq></url>\n`;
    });
    Object.values(formulaRegistry).forEach(calc => {
        xml += `  <url><loc>${baseUrl}/${calc.slug}</loc><priority>0.9</priority><changefreq>monthly</changefreq></url>\n`;
    });
    Object.keys(legalPages).forEach(slug => {
        xml += `  <url><loc>${baseUrl}/${slug}</loc><priority>0.3</priority><changefreq>yearly</changefreq></url>\n`;
    });
    xml += '</urlset>';
    res.header('Content-Type', 'application/xml');
    res.send(xml);
});

// ===================== ROBOTS.TXT =====================
app.get('/robots.txt', (req, res) => {
    res.type('text/plain');
    res.send('User-agent: *\nAllow: /\nSitemap: https://calcmaster.com/sitemap.xml');
});

// ===================== DYNAMIC CALCULATOR ROUTE =====================
// IMPORTANT: This must be AFTER all specific routes since it catches /:slug
app.get('/:slug', (req, res, next) => {
    const calcDef = formulaRegistry[req.params.slug];
    if (!calcDef) {
        return next();
    }

    // Build FAQ schema
    const faqSchema = (calcDef.faqs && calcDef.faqs.length > 0) ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": calcDef.faqs.map(f => ({
            "@type": "Question",
            "name": f.q,
            "acceptedAnswer": { "@type": "Answer", "text": f.a }
        }))
    } : null;

    const schema = [
        {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": calcDef.name,
            "applicationCategory": "CalculatorApplication",
            "operatingSystem": "Any",
            "description": calcDef.description,
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
        }
    ];
    if (faqSchema) schema.push(faqSchema);

    res.render('calculator', {
        title: calcDef.seo_title || calcDef.name,
        description: calcDef.description,
        calcDef: calcDef,
        schema: schema
    });
});

// ===================== 404 HANDLER =====================
app.use((req, res) => {
    res.status(404).render('static', {
        title: 'Page Not Found',
        description: 'The page you requested could not be found.',
        pageTitle: '404 — Page Not Found',
        content: '<p>Sorry, the page you are looking for does not exist. <a href="/" class="text-brand-blue hover:underline">Go back to the homepage</a>.</p>'
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
