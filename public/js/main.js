document.addEventListener('DOMContentLoaded', () => {

    // Global Elements
    const darkModeToggle = document.getElementById('darkModeToggle');
    const htmlElement = document.documentElement;

    // Check for saved theme
    if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        htmlElement.classList.add('dark');
        document.body.classList.add('bg-slate-900', 'text-slate-200');
        document.body.classList.remove('bg-brand-light', 'text-slate-800');
    }

    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            htmlElement.classList.toggle('dark');

            if (htmlElement.classList.contains('dark')) {
                localStorage.setItem('theme', 'dark');
                document.body.classList.add('bg-slate-900', 'text-slate-200');
                document.body.classList.remove('bg-brand-light', 'text-slate-800');
            } else {
                localStorage.setItem('theme', 'light');
                document.body.classList.remove('bg-slate-900', 'text-slate-200');
                document.body.classList.add('bg-brand-light', 'text-slate-800');
            }
        });
    }

});
