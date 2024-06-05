document.addEventListener("DOMContentLoaded", function() {
    const courseList = document.getElementById("courseList");
    const progressList = document.getElementById("progressList");

    const courses = JSON.parse(localStorage.getItem("courses")) || [];

    courses.forEach(function(course) {
        // Displaying Courses
        const courseElement = document.createElement("div");
        courseElement.classList.add("course-item");
        courseElement.innerHTML = `<h3>${course.name}</h3><p>Deadline: ${course.deadline}</p>`;
        courseList.appendChild(courseElement);

        // Displaying Progress
        const progressElement = document.createElement("div");
        progressElement.classList.add("progress-item");
        progressElement.innerHTML = `<h3>${course.name}</h3><p>Progress: ${course.progress}%</p>`;
        progressList.appendChild(progressElement);
    });
});
