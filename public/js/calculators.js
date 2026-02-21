document.addEventListener('DOMContentLoaded', () => {

    const calcForm = document.getElementById('calcForm');
    const resultOutput = document.getElementById('resultOutput');

    if (!calcForm) return;

    const slug = calcForm.getAttribute('data-slug');

    // ==================== ALL 30 CALCULATOR LOGIC ====================
    const calculatorsLogic = {

        // ---- FINANCE (10) ----
        'emi-calculator': (d) => {
            const P = +d.principal, r = +d.rate / 12 / 100, n = +d.tenure * 12;
            if (r === 0) return fmt(P / n);
            const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
            return fmt(emi) + '/month';
        },
        'loan-interest-calculator': (d) => {
            const P = +d.principal, r = +d.rate / 12 / 100, n = +d.tenure * 12;
            if (r === 0) return 'Total Interest: $0';
            const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
            const totalInterest = (emi * n) - P;
            return `Monthly: ${fmt(emi)}<br>Total Interest: ${fmt(totalInterest)}`;
        },
        'mortgage-calculator': (d) => {
            const P = +d.homePrice - +d.downPayment, r = +d.rate / 100 / 12, n = +d.term * 12;
            if (P <= 0) return '$0.00';
            if (r === 0) return fmt(P / n) + '/month';
            const M = P * ((r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
            return fmt(M) + '/month';
        },
        'compound-interest-calculator': (d) => {
            const P = +d.principal, r = +d.rate / 100, t = +d.years, n = +d.frequency;
            const A = P * Math.pow(1 + (r / n), n * t);
            return `Future Value: ${fmt(A)}<br>Interest Earned: ${fmt(A - P)}`;
        },
        'simple-interest-calculator': (d) => {
            const P = +d.principal, R = +d.rate, T = +d.time;
            const si = P * R * T / 100;
            return `Interest: ${fmt(si)}<br>Total: ${fmt(P + si)}`;
        },
        'sip-calculator': (d) => {
            const P = +d.monthly, r = +d.rate / 100 / 12, n = +d.years * 12;
            if (r === 0) return fmt(P * n);
            const FV = P * (((Math.pow(1 + r, n) - 1) / r) * (1 + r));
            const invested = P * n;
            return `Future Value: ${fmt(FV)}<br>Invested: ${fmt(invested)}<br>Returns: ${fmt(FV - invested)}`;
        },
        'investment-return-calculator': (d) => {
            const PV = +d.initialValue, FV = +d.finalValue, t = +d.years;
            const totalReturn = ((FV - PV) / PV) * 100;
            const annualized = (Math.pow(FV / PV, 1 / t) - 1) * 100;
            return `Total Return: ${totalReturn.toFixed(2)}%<br>Annualized: ${annualized.toFixed(2)}%`;
        },
        'savings-goal-calculator': (d) => {
            const goal = +d.goal, current = +d.current, r = +d.rate / 100 / 12, n = +d.years * 12;
            if (r === 0) { return `Save ${fmt((goal - current) / n)}/month`; }
            const fvCurrent = current * Math.pow(1 + r, n);
            const remaining = goal - fvCurrent;
            const monthly = remaining * r / (Math.pow(1 + r, n) - 1);
            return `Save ${fmt(Math.max(0, monthly))}/month`;
        },
        'credit-card-payoff-calculator': (d) => {
            const B = +d.balance, r = +d.rate / 100 / 12, P = +d.payment;
            if (P <= B * r) return '<span class="text-red-400">Payment too low to cover interest!</span>';
            const months = Math.ceil(-Math.log(1 - (B * r / P)) / Math.log(1 + r));
            const totalPaid = P * months;
            return `Payoff: ${months} months<br>Total Interest: ${fmt(totalPaid - B)}`;
        },
        'debt-snowball-calculator': (d) => {
            const B = +d.totalDebt, r = +d.rate / 100 / 12, P = +d.payment;
            if (P <= B * r) return '<span class="text-red-400">Payment too low!</span>';
            const months = Math.ceil(-Math.log(1 - (B * r / P)) / Math.log(1 + r));
            const totalPaid = P * months;
            return `Debt Free In: ${months} months (~${(months / 12).toFixed(1)} years)<br>Total Interest: ${fmt(totalPaid - B)}`;
        },

        // ---- TAX (4) ----
        'income-tax-calculator': (d) => {
            const income = +d.income, status = +d.filingStatus;
            const stdDeduction = status === 2 ? 29200 : 14600;
            const taxable = Math.max(0, income - stdDeduction);
            const brackets = status === 2
                ? [[23200, 0.10], [94300, 0.12], [201050, 0.22], [383900, 0.24], [487450, 0.32], [731200, 0.35], [Infinity, 0.37]]
                : [[11600, 0.10], [47150, 0.12], [100525, 0.22], [191950, 0.24], [243725, 0.32], [609350, 0.35], [Infinity, 0.37]];
            let tax = 0, prev = 0;
            for (const [limit, rate] of brackets) {
                if (taxable <= prev) break;
                const taxableInBracket = Math.min(taxable, limit) - prev;
                tax += taxableInBracket * rate;
                prev = limit;
            }
            const effective = income > 0 ? (tax / income * 100).toFixed(1) : 0;
            return `Federal Tax: ${fmt(tax)}<br>Effective Rate: ${effective}%<br>After Tax: ${fmt(income - tax)}`;
        },
        'capital-gains-tax-calculator': (d) => {
            const gain = +d.salePrice - +d.purchasePrice;
            if (gain <= 0) return 'No capital gain (loss of ' + fmt(Math.abs(gain)) + ')';
            const isLong = +d.holdingPeriod >= 2;
            const rate = isLong ? 0.15 : 0.22;
            const tax = gain * rate;
            return `Gain: ${fmt(gain)}<br>Tax (${isLong ? 'Long-term 15%' : 'Short-term ~22%'}): ${fmt(tax)}<br>Net: ${fmt(gain - tax)}`;
        },
        'sales-tax-calculator': (d) => {
            const price = +d.price, rate = +d.taxRate;
            const tax = price * rate / 100;
            return `Tax: ${fmt(tax)}<br>Total: ${fmt(price + tax)}`;
        },
        'vat-calculator': (d) => {
            const net = +d.netPrice, rate = +d.vatRate;
            const vat = net * rate / 100;
            return `VAT: ${fmt(vat)}<br>Gross Price: ${fmt(net + vat)}`;
        },

        // ---- SALARY (3) ----
        'salary-to-hourly-converter': (d) => {
            const salary = +d.salary, hours = +d.hoursPerWeek;
            const hourly = salary / (hours * 52);
            return `Hourly Rate: ${fmt(hourly)}<br>Weekly: ${fmt(salary / 52)}<br>Monthly: ${fmt(salary / 12)}`;
        },
        'overtime-pay-calculator': (d) => {
            const rate = +d.hourlyRate, hours = +d.overtimeHours, mult = +d.multiplier;
            const overtimePay = rate * mult * hours;
            return `Overtime Rate: ${fmt(rate * mult)}/hr<br>Total OT Pay: ${fmt(overtimePay)}`;
        },
        'freelance-rate-calculator': (d) => {
            const target = +d.targetIncome, expenses = +d.expenses, tax = +d.taxRate / 100, hours = +d.billableHours;
            const total = (target + expenses) * (1 + tax);
            const hourly = total / hours;
            return `Hourly Rate: ${fmt(hourly)}<br>Total Annual Need: ${fmt(total)}`;
        },

        // ---- EDUCATION (3) ----
        'gpa-calculator': (d) => {
            const points = +d.gradePoints, credits = +d.creditHours;
            if (credits === 0) return 'Enter credit hours';
            const gpa = points / credits;
            let letter = gpa >= 3.7 ? 'A/A+' : gpa >= 3.3 ? 'A-/B+' : gpa >= 3.0 ? 'B' : gpa >= 2.7 ? 'B-/C+' : gpa >= 2.0 ? 'C' : gpa >= 1.0 ? 'D' : 'F';
            return `GPA: ${gpa.toFixed(2)}<br>Grade: ${letter}`;
        },
        'cgpa-converter': (d) => {
            const cgpa = +d.cgpa, mult = +d.multiplier;
            const pct = cgpa * mult;
            return `Percentage: ${pct.toFixed(2)}%`;
        },
        'percentage-to-gpa-converter': (d) => {
            const pct = +d.percentage;
            let gpa;
            if (pct >= 90) gpa = 4.0;
            else if (pct >= 80) gpa = 3.0 + (pct - 80) / 10;
            else if (pct >= 70) gpa = 2.0 + (pct - 70) / 10;
            else if (pct >= 60) gpa = 1.0 + (pct - 60) / 10;
            else gpa = 0;
            return `Approximate GPA: ${gpa.toFixed(2)} / 4.0`;
        },

        // ---- HEALTH (3) ----
        'bmi-calculator': (d) => {
            const w = +d.weight, h = +d.height / 100;
            const bmi = w / (h * h);
            let cat = bmi < 18.5 ? 'Underweight' : bmi < 25 ? 'Normal weight' : bmi < 30 ? 'Overweight' : 'Obese';
            let color = bmi < 18.5 ? 'text-yellow-300' : bmi < 25 ? 'text-green-300' : bmi < 30 ? 'text-yellow-300' : 'text-red-300';
            return `BMI: ${bmi.toFixed(1)}<br><span class="${color}">${cat}</span>`;
        },
        'bmr-calculator': (d) => {
            const w = +d.weight, h = +d.height, age = +d.age, g = +d.gender;
            const bmr = (10 * w) + (6.25 * h) - (5 * age) + (g === 1 ? 5 : -161);
            return `BMR: ${Math.round(bmr)} cal/day`;
        },
        'calorie-calculator': (d) => {
            const w = +d.weight, h = +d.height, age = +d.age, g = +d.gender, act = +d.activity;
            const bmr = (10 * w) + (6.25 * h) - (5 * age) + (g === 1 ? 5 : -161);
            const tdee = bmr * act;
            return `BMR: ${Math.round(bmr)} cal<br>TDEE: ${Math.round(tdee)} cal/day<br>Lose weight: ~${Math.round(tdee - 500)} cal<br>Gain weight: ~${Math.round(tdee + 500)} cal`;
        },

        // ---- UTILITY (7) ----
        'age-calculator': (d) => {
            const birth = new Date(+d.birthYear, +d.birthMonth - 1, +d.birthDay);
            const now = new Date();
            let years = now.getFullYear() - birth.getFullYear();
            let months = now.getMonth() - birth.getMonth();
            let days = now.getDate() - birth.getDate();
            if (days < 0) { months--; days += 30; }
            if (months < 0) { years--; months += 12; }
            return `${years} years, ${months} months, ${days} days`;
        },
        'date-difference-calculator': (d) => {
            const start = new Date(+d.startYear, +d.startMonth - 1, +d.startDay);
            const end = new Date(+d.endYear, +d.endMonth - 1, +d.endDay);
            const diffMs = Math.abs(end - start);
            const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
            return `${diffDays} days<br>${Math.floor(diffDays / 7)} weeks<br>${(diffDays / 30.44).toFixed(1)} months`;
        },
        'percentage-calculator': (d) => {
            const pct = +d.percentage, total = +d.total;
            const result = (pct / 100) * total;
            return `${pct}% of ${total} = ${result.toFixed(2)}`;
        },
        'discount-calculator': (d) => {
            const price = +d.originalPrice, disc = +d.discount;
            const savings = price * disc / 100;
            const finalPrice = price - savings;
            return `You Save: ${fmt(savings)}<br>Final Price: ${fmt(finalPrice)}`;
        },
        'time-duration-calculator': (d) => {
            let startMin = +d.startHours * 60 + +d.startMinutes;
            let endMin = +d.endHours * 60 + +d.endMinutes;
            if (endMin < startMin) endMin += 24 * 60;
            const diff = endMin - startMin;
            const h = Math.floor(diff / 60), m = diff % 60;
            return `Duration: ${h}h ${m}m (${diff} minutes total)`;
        },
        'unit-converter': (d) => {
            const val = +d.value, type = +d.conversionType;
            if (type === 1) return `${val} km = ${(val / 1.60934).toFixed(4)} miles`;
            if (type === 2) return `${val} kg = ${(val * 2.20462).toFixed(4)} lbs`;
            if (type === 3) return `${val}°C = ${(val * 9 / 5 + 32).toFixed(2)}°F`;
            return 'Select type 1, 2, or 3';
        },
        'currency-converter': (d) => {
            const amount = +d.amount, rate = +d.exchangeRate;
            const result = amount * rate;
            return `${amount} × ${rate} = ${result.toFixed(2)}`;
        }
    };

    // Helper: format number as currency
    function fmt(n) { return '$' + Number(n).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }

    // Form submit handler
    calcForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(calcForm).entries());
        const fn = calculatorsLogic[slug];
        if (fn) {
            try {
                resultOutput.innerHTML = fn(data);
                resultOutput.classList.add('scale-105');
                setTimeout(() => resultOutput.classList.remove('scale-105'), 200);
            } catch (err) {
                resultOutput.innerHTML = '<span class="text-red-400">Calculation error. Check inputs.</span>';
            }
        } else {
            resultOutput.innerHTML = '<span class="text-yellow-400">Calculator logic not found.</span>';
        }
    });

    // Copy result button
    document.querySelectorAll('[data-action="copy"]').forEach(btn => {
        btn.addEventListener('click', () => {
            navigator.clipboard.writeText(resultOutput.innerText).then(() => {
                btn.textContent = 'Copied!';
                setTimeout(() => btn.textContent = 'Copy Result', 1500);
            });
        });
    });

    // Print button
    document.querySelectorAll('[data-action="print"]').forEach(btn => {
        btn.addEventListener('click', () => window.print());
    });

});
