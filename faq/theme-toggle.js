document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const sunIcon = themeToggle.querySelector('.sun-icon');
    const moonIcon = themeToggle.querySelector('.moon-icon');

    // Load saved theme from localStorage, default to dark
    let savedTheme = localStorage.getItem('theme');
    if (!savedTheme) {
        savedTheme = 'dark'; // Luôn đặt dark làm mặc định nếu không có theme lưu
    }
    body.setAttribute('data-bs-theme', savedTheme);
    updateIcons(savedTheme);

    // Toggle theme on button click
    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-bs-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        body.setAttribute('data-bs-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateIcons(newTheme);
    });

    // Update icon visibility based on theme
    function updateIcons(theme) {
        if (theme === 'light') {
            sunIcon.classList.add('d-none');
            moonIcon.classList.remove('d-none');
        } else {
            sunIcon.classList.remove('d-none');
            moonIcon.classList.add('d-none');
        }
    }
});