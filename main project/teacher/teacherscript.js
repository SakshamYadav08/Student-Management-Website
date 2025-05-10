

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // SIDEBAR TOGGLE
    const menuBar = document.querySelector('#content nav .bx.bx-menu');
    const sidebar = document.getElementById('sidebar');

    menuBar.addEventListener('click', function () {
        sidebar.classList.toggle('hide');
        // Store sidebar state in localStorage
        localStorage.setItem('sidebarHidden', sidebar.classList.contains('hide'));
    });

    // Restore sidebar state on page load
    if (localStorage.getItem('sidebarHidden') === 'true') {
        sidebar.classList.add('hide');
    }

    // DARK MODE TOGGLE
    const switchMode = document.getElementById('switch-mode');
    
    // Check for saved dark mode preference
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark');
        switchMode.checked = true;
    }

    switchMode.addEventListener('change', function () {
        if (this.checked) {
            document.body.classList.add('dark');
            localStorage.setItem('darkMode', 'true');
        } else {
            document.body.classList.remove('dark');
            localStorage.setItem('darkMode', 'false');
        }
    });

    // SEARCH FUNCTIONALITY
    const searchForm = document.querySelector('form');
    const searchInput = document.querySelector('.form-input input');

    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        if (searchTerm === '') return;

        // Search in tables
        const tables = document.querySelectorAll('table tbody tr');
        tables.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(searchTerm) ? '' : 'none';
        });

        // Search in todo list
        const todoItems = document.querySelectorAll('.todo-list li');
        todoItems.forEach(item => {
            const text = item.textContent.toLowerCase();
            item.style.display = text.includes(searchTerm) ? '' : 'none';
        });
    });

    // NOTIFICATIONS SYSTEM
    const notification = document.querySelector('.notification');
    const notificationCount = notification.querySelector('.num');
    
    let notifications = JSON.parse(localStorage.getItem('notifications')) || [];

    function updateNotificationCount() {
        notificationCount.textContent = notifications.length;
        if (notifications.length === 0) {
            notificationCount.style.display = 'none';
        } else {
            notificationCount.style.display = 'flex';
        }
    }

    notification.addEventListener('click', function(e) {
        e.preventDefault();
        if (notifications.length > 0) {
            // Create notification popup
            const popup = document.createElement('div');
            popup.className = 'notification-popup';
            popup.innerHTML = `
                <div class="notification-header">
                    <h3>Notifications</h3>
                    <button class="clear-all">Clear All</button>
                </div>
                <div class="notification-list">
                    ${notifications.map(note => `
                        <div class="notification-item">
                            <p>${note.message}</p>
                            <span class="notification-time">${note.time}</span>
                        </div>
                    `).join('')}
                </div>
            `;
            document.body.appendChild(popup);

            // Handle clear all
            popup.querySelector('.clear-all').addEventListener('click', function() {
                notifications = [];
                localStorage.setItem('notifications', JSON.stringify(notifications));
                updateNotificationCount();
                popup.remove();
            });
        }
    });

    // TABLE SORTING FUNCTIONALITY
    document.querySelectorAll('.table-data .head i.bx-filter').forEach(filter => {
        filter.addEventListener('click', function() {
            const table = this.closest('.table-data').querySelector('table');
            if (!table) return;
            
            const rows = Array.from(table.querySelectorAll('tbody tr'));
            const headerCells = table.querySelectorAll('th');
            const columnIndex = Array.from(headerCells).findIndex(cell => 
                cell.textContent === this.closest('.head').querySelector('h3').textContent
            );

            const isAscending = this.dataset.order !== 'asc';
            this.dataset.order = isAscending ? 'asc' : 'desc';

            rows.sort((a, b) => {
                const aValue = a.cells[columnIndex].textContent;
                const bValue = b.cells[columnIndex].textContent;
                return isAscending ? 
                    aValue.localeCompare(bValue) : 
                    bValue.localeCompare(aValue);
            });

            const tbody = table.querySelector('tbody');
            tbody.innerHTML = '';
            rows.forEach(row => tbody.appendChild(row));
        });
    });

    // TODO LIST / UPCOMING CLASSES FUNCTIONALITY
    const todoList = document.querySelector('.todo-list');
    const addTodoBtn = document.querySelector('.todo .head .bx-plus');

    // Load saved todos
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    savedTodos.forEach(todo => {
        const li = createTodoItem(todo.text, todo.completed);
        todoList.appendChild(li);
    });

    function createTodoItem(text, completed = false) {
        const li = document.createElement('li');
        li.className = completed ? 'completed' : 'not-completed';
        li.innerHTML = `
            <p>${text}</p>
            <div class="actions">
                <i class='bx bx-check'></i>
                <i class='bx bx-trash'></i>
                <i class='bx bx-dots-vertical-rounded'></i>
            </div>
        `;

        // Add event listeners for todo actions
        li.querySelector('.bx-check').addEventListener('click', function() {
            li.classList.toggle('completed');
            li.classList.toggle('not-completed');
            saveTodos();
        });

        li.querySelector('.bx-trash').addEventListener('click', function() {
            li.remove();
            saveTodos();
        });

        return li;
    }

    function saveTodos() {
        const todos = Array.from(todoList.children).map(li => ({
            text: li.querySelector('p').textContent,
            completed: li.classList.contains('completed')
        }));
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    addTodoBtn.addEventListener('click', function() {
        const text = prompt('Enter new class details:');
        if (text) {
            const li = createTodoItem(text);
            todoList.appendChild(li);
            saveTodos();
        }
    });

    // RESPONSIVE BEHAVIOR
    function handleResize() {
        if (window.innerWidth < 768) {
            sidebar.classList.add('hide');
        } else {
            sidebar.classList.remove('hide');
        }
    }

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check

    // DOWNLOAD REPORTS
    const downloadBtn = document.querySelector('.btn-download');
    downloadBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Create report data
        const reportData = {
            totalStudents: document.querySelector('.box-info li:first-child h3').textContent,
            activeClasses: document.querySelector('.box-info li:nth-child(2) h3').textContent,
            pendingGrades: document.querySelector('.box-info li:last-child h3').textContent,
            recentSubmissions: Array.from(document.querySelectorAll('.order table tbody tr')).map(row => ({
                student: row.querySelector('p').textContent,
                assignment: row.querySelector('td:nth-child(2)').textContent,
                status: row.querySelector('.status').textContent
            })),
            upcomingClasses: Array.from(document.querySelectorAll('.todo-list li')).map(li => ({
                class: li.querySelector('p').textContent,
                status: li.classList.contains('completed') ? 'Scheduled' : 'Pending'
            }))
        };

        // Convert to JSON and download
        const dataStr = JSON.stringify(reportData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = window.URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `teacher-dashboard-report-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    });
});