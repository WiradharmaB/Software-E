document.addEventListener("DOMContentLoaded", function() {
    const profileInfo = document.querySelector(".profile-info");

    // Example profile data
    const profileData = {
        name: "John Doe",
        email: "john.doe@example.com",
        institution: "University of Example"
    };

    profileInfo.innerHTML = `
        <p><strong>Name:</strong> ${profileData.name}</p>
        <p><strong>Email:</strong> ${profileData.email}</p>
        <p><strong>Institution:</strong> ${profileData.institution}</p>
    `;
});
