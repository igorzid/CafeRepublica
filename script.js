// Set an initial visible section on page load (optional)
document.addEventListener('DOMContentLoaded', function () {
    showSection('menu_cafe');  // Show cafe section initially
});

function showSection(sectionClass) {
    // Hide all sections within #menu
    document.querySelectorAll('#menu section').forEach(section => {
        section.style.display = 'none';  // Hide all sections
    });
    
    // Show the selected section
    document.querySelector(`.${sectionClass}`).style.display = 'block';
}

//active button
const btnElList = document.querySelectorAll('.menu_btn button');

btnElList.forEach(btnEl => {
    btnEl.addEventListener('click', () => {
    document.querySelector('.btn_active')?.classList.remove('btn_active')
    btnEl.classList.add('btn_active');
    })
});

document.querySelectorAll('.navbar-nav .nav-link').forEach(function (navLink) {
    navLink.addEventListener('click', function () {
        var navbarCollapse = document.querySelector('.navbar-collapse');
        var bsCollapse = new bootstrap.Collapse(navbarCollapse, {
            toggle: false
        });
        bsCollapse.hide(); // Close the hamburger menu
    });
});

const openingHours = {
    0: { day: "Ne", open: null, close: null },  // Sunday
    1: { day: "Po", open: "10:00", close: "18:00" },  // Monday
    2: { day: "Út", open: "10:00", close: "18:00" },  // Tuesday
    3: { day: "St", open: "10:00", close: "18:00" },  // Wednesday
    4: { day: "Čt", open: "10:00", close: "18:00" },  // Thursday
    5: { day: "Pá", open: "10:00", close: "18:00" },  // Friday
    6: { day: "So", open: null, close: null }   // Saturday
};

function getCurrentTime() {
    const now = new Date();
    const dayOfWeek = now.getDay();  // Get the current day (0-6, where 0 is Sunday)
    const currentTime = now.toTimeString().split(" ")[0].slice(0, 5);  // Current time in HH:MM format
    return { dayOfWeek, currentTime };
}

function checkCafeStatus() {
    const { dayOfWeek, currentTime } = getCurrentTime();
    let todayHours = openingHours[dayOfWeek];
    
    // If the cafe is open today, compare the time
    if (todayHours.open && currentTime >= todayHours.open && currentTime <= todayHours.close) {
        return { status: "open", message: `Otevřeno <br>${todayHours.open}-${todayHours.close}` };
    }

    // If the cafe is closed, find the next opening time
    return findNextOpening(dayOfWeek, currentTime);
}

function findNextOpening(currentDay) {
    let nextDay = currentDay;
    
    // Loop to find the next opening day and time
    for (let i = 0; i < 7; i++) {
        nextDay = (nextDay + 1) % 7;  // Cycle through days (0-6, where 0 is Sunday)
        let nextHours = openingHours[nextDay];
        
        if (nextHours.open) {
            return { status: "closed", message: `Otevíráme v <br>${nextHours.day} ${nextHours.open}-${nextHours.close}` };
        }
    }
    // If no opening found (shouldn't happen with correct setup)
    return { status: "closed", message: "" };
}

function displayOpeningStatus() {
    const openingStatusElement = document.getElementById("opening_status");
    const cafeStatus = checkCafeStatus();

    openingStatusElement.innerHTML = cafeStatus.message;
}

// Run the function to display opening hours status on page load
document.addEventListener('DOMContentLoaded', displayOpeningStatus);