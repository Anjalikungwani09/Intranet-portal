const userAvatar = document.getElementById('userAvatar');
const userProfile = document.getElementById('userProfile');

userAvatar.addEventListener('click', (e) => {
    // Prevent event from bubbling up if you have other click listeners
    e.stopPropagation();
    userProfile.classList.toggle('show');
});

// Close the user info if the user clicks anywhere else on the screen
document.addEventListener('click', () => {
    if (userProfile.classList.contains('show')) {
        userProfile.classList.remove('show');
    }
});

const menuToggle = document.getElementById('menuToggle');
const sidebar = document.querySelector('.sidebar');
const overlay = document.getElementById('sidebarOverlay');

function toggleMenu() {
    sidebar.classList.toggle('active');
    overlay.classList.toggle('show');
}

// Open/Close on hamburger click
menuToggle.addEventListener('click', toggleMenu);

// Close when clicking the overlay (tapping outside the menu)
overlay.addEventListener('click', toggleMenu);

// Close when clicking a link (optional, for SPA behavior)
const navLinks = document.querySelectorAll('.sidebar-item a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth < 992) toggleMenu();
    });
});

$(document).ready(function () {
    $("#tagSearch").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#galleryContainer .gallery-item").filter(function () {
            $(this).toggle($(this).attr('data-tags').toLowerCase().indexOf(value) > -1);
        });
    });
});

document.querySelectorAll('.btn-news-tab').forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class from all buttons in this group
        this.parentElement.querySelectorAll('.btn-news-tab').forEach(b => b.classList.remove('active'));
        // Add active to clicked
        this.classList.add('active');
        
        // Add logic here to filter or change content if needed
    });
});



document.addEventListener("DOMContentLoaded", function () {
    let currentViewDate = new Date(2026, 0, 1); // January 2026

    function renderCalendar() {
        const container = document.getElementById('calendarDaysBody');
        const monthDisplay = document.getElementById('monthDisplay');
        if (!container || !monthDisplay) return;

        const year = currentViewDate.getFullYear();
        const month = currentViewDate.getMonth();
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        monthDisplay.innerText = `${monthNames[month]} ${year}`;
        container.innerHTML = "";

        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const startOffset = firstDay === 0 ? 6 : firstDay - 1; // Adjust for Monday start

        let date = 1;
        let weekNum = 31 + (month * 4);
        let nextMonthDate = 1;

        // Loop to create rows
        for (let i = 0; i < 6; i++) {
            if (date > daysInMonth && i > 0) break; // Stop if month is done

            let row = document.createElement('div');
            row.className = 'day-row';

            // Add Week Num
            let weekSpan = document.createElement('span');
            weekSpan.className = 'week-num';
            weekSpan.innerText = weekNum++;
            row.appendChild(weekSpan);

            for (let j = 0; j < 7; j++) {
                let cell = document.createElement('span');

                if (i === 0 && j < startOffset) {
                    cell.innerText = ""; // Empty space for previous month
                } else if (date <= daysInMonth) {
                    // Current Month
                    if (date === 15 && month === 0 && year === 2026) {
                        cell.innerHTML = `
                            <div class="active-date-wrapper">
                                <span class="day active">${date}</span>
                                <div class="event-popup">
                                    <strong>Agile & Scrum Fundamentals...</strong>
                                    <p>January 15 2026 - 10:00 - 12:00 PM</p>
                                </div>
                            </div>`;
                    } else {
                        cell.innerText = date;
                    }
                    date++;
                } else {
                    // Next Month Padding
                    cell.className = "text-muted";
                    cell.innerText = nextMonthDate < 10 ? `0${nextMonthDate}` : nextMonthDate;
                    nextMonthDate++;
                }
                row.appendChild(cell);
            }
            container.appendChild(row);
        }
    }

    // Listeners
    document.getElementById('prevMonth')?.addEventListener('click', () => {
        currentViewDate.setMonth(currentViewDate.getMonth() - 1);
        renderCalendar();
    });

    document.getElementById('nextMonth')?.addEventListener('click', () => {
        currentViewDate.setMonth(currentViewDate.getMonth() + 1);
        renderCalendar();
    });

    renderCalendar();
});



document.addEventListener("DOMContentLoaded", function () {
    const navButtons = document.querySelectorAll('#deptNav .nav-btn');
    const deptContainers = document.querySelectorAll('.dept-content');

    navButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            // Remove active state from all buttons
            navButtons.forEach(b => b.classList.remove('active'));
            // Add active state to clicked button
            this.classList.add('active');

            // Hide all document containers
            deptContainers.forEach(container => container.classList.add('d-none'));

            // Show the specific container for the clicked department
            const targetId = this.getAttribute('data-target') + '-docs';
            const targetContainer = document.getElementById(targetId);
            if (targetContainer) {
                targetContainer.classList.remove('d-none');
            }
        });
    });
});



// Get the button
const backToTopBtn = document.getElementById("backToTop");

// Show button when user scrolls down 100px from the top
window.onscroll = function() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        backToTopBtn.style.display = "flex";
    } else {
        backToTopBtn.style.display = "none";
    }
};

// When the user clicks on the button, scroll to the top
backToTopBtn.addEventListener("click", function() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});