document.addEventListener("DOMContentLoaded", () => {
    loadCoursesFromStorage();
});

function loadCoursesFromStorage() {
    const progressList = document.getElementById('progressList');
    progressList.innerHTML = ''; // Clear the list before reloading
    const courses = JSON.parse(localStorage.getItem('courses')) || [];
    courses.forEach(course => {
        console.log('Loading progress for course:', course); // Debug log
        displayProgress(course);
    });
}

function displayProgress(course) {
    const progressList = document.getElementById('progressList');
    const courseItem = document.createElement('div');
    courseItem.className = 'course-item';
    courseItem.innerHTML = `
        <h3>${course.name}</h3>
        <p>Deadline: ${course.deadline}</p>
        <label for="progress-${course.name}">Progress: </label>
        <input type="number" id="progress-${course.name}" value="${course.progress}" max="100" min="0" />
        <button onclick="updateProgress('${course.name}')">Update Progress</button>
        <button onclick="removeCourse('${course.name}', 'progress')">Remove</button>
    `;
    progressList.appendChild(courseItem);
}

function updateProgress(courseName) {
    const courses = JSON.parse(localStorage.getItem('courses')) || [];
    const progressInput = document.getElementById(`progress-${courseName}`);
    const newProgress = progressInput.value;

    console.log(`Updating progress for ${courseName} to ${newProgress}`); // Debug log

    const updatedCourses = courses.map(course => {
        if (course.name === courseName) {
            return { ...course, progress: newProgress };
        }
        return course;
    });

    localStorage.setItem('courses', JSON.stringify(updatedCourses));
    loadCoursesFromStorage(); // Reload courses to reflect the updated progress
}

function removeCourse(courseName, context = 'progress') {
    let courses = JSON.parse(localStorage.getItem('courses')) || [];
    courses = courses.filter(course => course.name !== courseName);
    localStorage.setItem('courses', JSON.stringify(courses));
    if (context === 'progress') {
        loadCoursesFromStorage(); // Reload the progress list
    } else {
        window.location.reload(); // Reload the page to reflect changes in the course list
    }
}
