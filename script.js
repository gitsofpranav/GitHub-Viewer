function fetchProfile() {
    const username = document.getElementById('username').value.trim();
    if (!username) {
        alert('Enter your username');
        return;
    }

    fetch(`https://api.github.com/users/${username}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response is not ok');
            }
            return response.json(); // FIXED: Call the function properly
        })
        .then(data => {
            displayProfile(data);
        })
        .catch(error => {
            console.error("There was an error in fetching the profile", error);
            document.getElementById('profile').innerHTML = `<p style="color: red;">User not found.</p>`;
        });
}

function displayProfile(profileData) {
    const profileElement = document.getElementById('profile');
    profileElement.innerHTML = `
        <h2>${profileData.login}</h2>
        <img src="${profileData.avatar_url}" style="width:100px; height:100px; border-radius:50%;" />
        <p><strong>Followers:</strong> ${profileData.followers}</p>
        <p><strong>Following:</strong> ${profileData.following}</p>
        <p><strong>Public Repos:</strong> ${profileData.public_repos}</p>
        <a href="${profileData.html_url}" target="_blank">View Profile</a>
    `;
}
