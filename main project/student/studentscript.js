const menuBar = document.querySelector('#content nav .bx.bx-menu');
const sidebar = document.getElementById('sidebar');
const searchButton = document.querySelector('#content nav form .form-input button');
const searchButtonIcon = document.querySelector('#content nav form .form-input button .bx');
const searchForm = document.querySelector('#content nav form');
const switchMode = document.getElementById('switch-mode');
const todoItems = document.querySelectorAll('.todo-list li');
const notificationBell = document.querySelector('.notification');
const boxInfoItems = document.querySelectorAll('.box-info li');

// Sidebar Toggle
menuBar.addEventListener('click', function () {
    sidebar.classList.toggle('hide');
    // Store sidebar state in localStorage
    localStorage.setItem('sidebarHidden', sidebar.classList.contains('hide'));
});

// Search Functionality
searchButton.addEventListener('click', function (e) {
    if (window.innerWidth < 576) {
        e.preventDefault();
        searchForm.classList.toggle('show');
        if (searchForm.classList.contains('show')) {
            searchButtonIcon.classList.replace('bx-search', 'bx-x');
        } else {
            searchButtonIcon.classList.replace('bx-x', 'bx-search');
        }
    }
});

// Dark Mode Toggle
switchMode.addEventListener('change', function () {
    document.body.classList.toggle('dark');
    // Store theme preference
    localStorage.setItem('darkMode', this.checked);
});

// Initialize dark mode from stored preference
document.addEventListener('DOMContentLoaded', function() {
    const darkModeEnabled = localStorage.getItem('darkMode') === 'true';
    if (darkModeEnabled) {
        document.body.classList.add('dark');
        switchMode.checked = true;
    }
    
    // Restore sidebar state
    const sidebarHidden = localStorage.getItem('sidebarHidden') === 'true';
    if (sidebarHidden) {
        sidebar.classList.add('hide');
    }
});

// Responsive Search Form
window.addEventListener('resize', function () {
    if (this.innerWidth > 576) {
        searchButtonIcon.classList.replace('bx-x', 'bx-search');
        searchForm.classList.remove('show');
    }
});

// Todo List Item Toggle
todoItems.forEach(item => {
    item.addEventListener('click', function() {
        this.classList.toggle('completed');
        this.classList.toggle('not-completed');
        
        // Store todo item state
        const todoStates = Array.from(todoItems).map(item => ({
            text: item.querySelector('p').textContent,
            completed: item.classList.contains('completed')
        }));
        localStorage.setItem('todoStates', JSON.stringify(todoStates));
    });
});

// Notification Handler
notificationBell.addEventListener('click', function(e) {
    e.preventDefault();
    const numElement = this.querySelector('.num');
    if (numElement) {
        numElement.style.display = 'none';
        // Clear notification count in storage
        localStorage.setItem('notificationCount', '0');
    }
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Table Row Hover Effects
const tableRows = document.querySelectorAll('.table-data .order table tbody tr');
tableRows.forEach(row => {
    row.addEventListener('mouseover', function() {
        this.style.backgroundColor = 'var(--grey)';
    });
    row.addEventListener('mouseout', function() {
        this.style.backgroundColor = 'transparent';
    });
});

// Box Info Items Click Animation
boxInfoItems.forEach(item => {
    item.addEventListener('click', function() {
        // Add click animation
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
    });
});

// Update Dashboard Data
function updateDashboardData() {
    // Update current date in breadcrumb
    const currentDate = new Date();
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('en-US', dateOptions);
    
    // Update due dates to show relative time
    const dueDates = document.querySelectorAll('.table-data .order table tbody td:nth-child(2)');
    dueDates.forEach(dateCell => {
        const dueDate = new Date(dateCell.textContent);
        const timeDiff = dueDate - currentDate;
        const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
        
        if (daysRemaining > 0) {
            dateCell.setAttribute('title', dateCell.textContent);
            dateCell.textContent = `${daysRemaining} day${daysRemaining !== 1 ? 's' : ''} remaining`;
        }
    });
}

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    updateDashboardData();
    
    // Restore todo states from storage
    const savedTodoStates = JSON.parse(localStorage.getItem('todoStates'));
    if (savedTodoStates) {
        todoItems.forEach((item, index) => {
            if (savedTodoStates[index] && savedTodoStates[index].completed) {
                item.classList.add('completed');
                item.classList.remove('not-completed');
            }
        });
    }
    
    // Update dashboard data periodically
    setInterval(updateDashboardData, 60000); // Update every minute
});


