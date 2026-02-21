const healthCalculators = [
    {
        name: "BMI Calculator",
        slug: "bmi-calculator",
        category: "health",
        seo_title: "BMI Calculator - Calculate Your Body Mass Index",
        description: "Calculate your Body Mass Index (BMI) to assess if your weight is in a healthy range.",
        content: "<h2>What is BMI?</h2><p>Body Mass Index (BMI) is a simple measure of body fat based on height and weight. It's widely used as a screening tool for weight categories: Underweight (<18.5), Normal (18.5-24.9), Overweight (25-29.9), and Obese (30+). While BMI doesn't directly measure body fat, it correlates well with more direct measures of body fat and is an easy starting point for health assessment.</p><h2>Worked Example</h2><p>Weight: 70 kg, Height: 1.75 m → BMI = 70 / (1.75×1.75) = 22.86 (Normal weight).</p>",
        formula: "BMI = Weight (kg) / Height (m)²",
        variables: [
            { id: "weight", label: "Weight (kg)", type: "number", default: 70 },
            { id: "height", label: "Height (cm)", type: "number", default: 175 }
        ],
        faqs: [
            { q: "Is BMI accurate for athletes?", a: "BMI may overestimate body fat in muscular individuals. Consider body fat percentage for a more accurate assessment." },
            { q: "What is a healthy BMI range?", a: "A BMI of 18.5 to 24.9 is generally considered healthy." }
        ]
    },
    {
        name: "BMR Calculator",
        slug: "bmr-calculator",
        category: "health",
        seo_title: "BMR Calculator - Find Your Basal Metabolic Rate",
        description: "Calculate your Basal Metabolic Rate (BMR) — the calories your body burns at rest.",
        content: "<h2>Understanding Basal Metabolic Rate</h2><p>BMR is the number of calories your body needs to maintain basic life-sustaining functions like breathing, circulation, and cell production while at complete rest. Knowing your BMR helps you understand your minimum caloric needs and is the foundation for any diet or fitness plan. This calculator uses the Mifflin-St Jeor equation, which is considered the most accurate formula for estimating BMR.</p><h2>Worked Example</h2><p>Male, 30 years, 80 kg, 180 cm: BMR = (10 × 80) + (6.25 × 180) – (5 × 30) + 5 = 1,780 calories/day.</p>",
        formula: "BMR = (10 × weight) + (6.25 × height) – (5 × age) + s",
        variables: [
            { id: "weight", label: "Weight (kg)", type: "number", default: 80 },
            { id: "height", label: "Height (cm)", type: "number", default: 180 },
            { id: "age", label: "Age (years)", type: "number", default: 30 },
            { id: "gender", label: "Gender (1=Male, 2=Female)", type: "number", default: 1 }
        ],
        faqs: [
            { q: "What's the difference between BMR and TDEE?", a: "BMR is calories burned at rest. TDEE (Total Daily Energy Expenditure) includes BMR plus calories burned through activity." }
        ]
    },
    {
        name: "Calorie Calculator",
        slug: "calorie-calculator",
        category: "health",
        seo_title: "Calorie Calculator - Daily Calorie Needs Estimator",
        description: "Estimate your daily calorie needs based on your activity level and fitness goals.",
        content: "<h2>How Many Calories Do You Need?</h2><p>Your daily calorie needs depend on your BMR and activity level. This calculator uses the Mifflin-St Jeor equation for BMR, then multiplies by an activity factor: Sedentary (×1.2), Lightly active (×1.375), Moderately active (×1.55), Very active (×1.725), Extra active (×1.9). For weight loss, subtract 500 calories per day to lose about 1 pound per week.</p><h2>Worked Example</h2><p>Male, 25, 75 kg, 178 cm, moderately active: BMR ≈ 1,749; TDEE = 1,749 × 1.55 ≈ 2,711 calories/day.</p>",
        formula: "TDEE = BMR × Activity Multiplier",
        variables: [
            { id: "weight", label: "Weight (kg)", type: "number", default: 75 },
            { id: "height", label: "Height (cm)", type: "number", default: 178 },
            { id: "age", label: "Age (years)", type: "number", default: 25 },
            { id: "gender", label: "Gender (1=Male, 2=Female)", type: "number", default: 1 },
            { id: "activity", label: "Activity Level (1.2-1.9)", type: "number", default: 1.55 }
        ],
        faqs: [
            { q: "How many calories to lose weight?", a: "A deficit of 500 calories per day typically results in losing about 1 pound per week." }
        ]
    }
];

module.exports = healthCalculators;
