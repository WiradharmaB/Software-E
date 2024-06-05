document.addEventListener("DOMContentLoaded", () => {
    const addCourseForm = document.getElementById('addCourseForm');

    addCourseForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const courseName = document.getElementById('courseName').value;
        const deadline = document.getElementById('deadline').value;

        if (!courseName || !deadline) {
            alert('Please fill in both fields.');
            return;
        }

        const course = {
            name: courseName,
            deadline: deadline,
            progress: 0 // Initialize progress to 0
        };

        console.log('Course to be added:', course); // Debug log

        addCourseToStorage(course);
        displayCourse(course);

        addCourseForm.reset();
        hideAddCoursePopup();
    });

    loadCoursesFromStorage();
    checkDeadlines();
});

function addCourseToStorage(course) {
    let courses = JSON.parse(localStorage.getItem('courses')) || [];
    courses.push(course);
    localStorage.setItem('courses', JSON.stringify(courses));
}

function loadCoursesFromStorage() {
    const courseList = document.getElementById('courseList');
    courseList.innerHTML = ''; // Clear the list before reloading
    const courses = JSON.parse(localStorage.getItem('courses')) || [];
    courses.forEach(course => {
        console.log('Loading course:', course); // Debug log
        displayCourse(course)
    });
}

function displayCourse(course) {
    const courseList = document.getElementById('courseList');
    const courseItem = document.createElement('div');
    courseItem.className = 'course-item';
    courseItem.innerHTML = `
        <h3>${course.name}</h3>
        <p>Deadline: ${course.deadline}</p>
        <p>Progress: ${course.progress}%</p>
        <button onclick="removeCourse('${course.name}')">Remove</button>
    `;
    courseList.appendChild(courseItem);
}

function removeCourse(courseName) {
    let courses = JSON.parse(localStorage.getItem('courses')) || [];
    courses = courses.filter(course => course.name !== courseName);
    localStorage.setItem('courses', JSON.stringify(courses));
    loadCoursesFromStorage(); // Reload the course list to reflect changes
}

function checkDeadlines() {
    const now = new Date();
    const courses = JSON.parse(localStorage.getItem('courses')) || [];
    courses.forEach(course => {
        const deadline = new Date(course.deadline);
        const timeDiff = deadline - now;
        const daysDiff = timeDiff / (1000 * 3600 * 24);
        if (daysDiff <= 1 && daysDiff > 0) {
            alert(`Reminder: The deadline for ${course.name} is approaching!`);
        }
    });
}

function showAddCoursePopup() {
    document.getElementById('coursePopup').style.display = 'block';
}

function hideAddCoursePopup() {
    document.getElementById('coursePopup').style.display = 'none';
}
