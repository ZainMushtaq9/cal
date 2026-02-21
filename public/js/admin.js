document.addEventListener('DOMContentLoaded', () => {

    const calculatorsTable = document.getElementById('calculators-table');
    const logsContainer = document.getElementById('logs-container');
    const statValid = document.getElementById('stat-valid');
    const statReview = document.getElementById('stat-review');

    // Fetch Calculators
    async function loadCalculators() {
        try {
            const res = await fetch('/admin/api/calculators');
            const data = await res.json();

            let validCount = 0;
            let reviewCount = 0;

            calculatorsTable.innerHTML = data.map(calc => {
                let statusBadge = '';
                if (calc.validation_status === 'valid') {
                    statusBadge = '<span class="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Valid</span>';
                    validCount++;
                } else if (calc.validation_status === 'error') {
                    statusBadge = '<span class="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">Error</span>';
                } else {
                    statusBadge = '<span class="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">Needs Review</span>';
                    reviewCount++;
                }

                return `
                <tr class="hover:bg-slate-50 transition">
                    <td class="px-6 py-4 border-b border-slate-100 font-medium text-slate-800">${calc.name}</td>
                    <td class="px-6 py-4 border-b border-slate-100"><span class="capitalize text-slate-600">${calc.category}</span></td>
                    <td class="px-6 py-4 border-b border-slate-100">${statusBadge}</td>
                    <td class="px-6 py-4 border-b border-slate-100">
                        <button class="text-brand-blue hover:underline text-sm font-medium mr-3">Edit</button>
                    </td>
                </tr>
                `;
            }).join('');

            statValid.innerText = validCount;
            statReview.innerText = reviewCount;

        } catch (e) {
            calculatorsTable.innerHTML = `<tr><td colspan="4" class="px-6 py-4 text-center text-red-500">Failed to load data.</td></tr>`;
        }
    }

    // Fetch Logs
    async function loadLogs() {
        try {
            const res = await fetch('/admin/api/logs');
            const data = await res.json();

            if (data.length === 0) {
                logsContainer.innerHTML = '<p class="text-sm text-slate-500">No logs found.</p>';
                return;
            }

            logsContainer.innerHTML = data.map(log => {
                const date = new Date(log.timestamp).toLocaleString();
                const statusColor = log.is_valid ? 'text-green-600 bg-green-50 border-green-200' : 'text-red-600 bg-red-50 border-red-200';

                let issuesHtml = '';
                try {
                    const issues = JSON.parse(log.issues_found);
                    if (issues && issues.length > 0) {
                        issuesHtml = `<ul class="list-disc ml-5 mt-2 text-sm text-slate-600">
                            ${issues.map(i => `<li>${i}</li>`).join('')}
                        </ul>`;
                    }
                } catch (e) { }

                return `
                <div class="mb-4 p-4 border rounded-lg shadow-sm ${statusColor}">
                    <div class="flex justify-between items-start mb-2">
                        <h4 class="font-bold text-sm">${log.name || 'Unknown Calculator'}</h4>
                        <span class="text-xs opacity-70 border px-2 py-0.5 rounded">${date}</span>
                    </div>
                    <p class="text-sm font-medium mb-1">Status: ${log.is_valid ? 'Passed' : 'Failed / Needs Review'}</p>
                    ${issuesHtml}
                </div>
                `;
            }).join('');
        } catch (e) {
            logsContainer.innerHTML = '<p class="text-sm text-red-500">Failed to load logs.</p>';
        }
    }

    loadCalculators();
    loadLogs();
});

// Global Function to trigger validation
window.triggerValidationAll = async function () {
    alert("Triggering Groq Validation logic... (Implementation coming)");
};
