const searchBtn = document.getElementById("search-btn");


searchBtn.addEventListener('click', function () {
    username = document.getElementById("searchText").value;
    console.log('search text', username);

    fetchUserInfo(username);
    fetchUserRepos(username);
});

/*
    User basic info
*/
// fetch userinfo from github api
function fetchUserInfo(username) {

    console.log('useRepos', userInfoJson);

    renderUserInfoTemplate(userInfoJson);

    // fetch('https://api.github.com/users/' + username).then(res => res.json())
    //     .catch(error => console.error('Error:', error))
    //     .then((response) => {
    //        console.log('userinfo', response);
    //     });
}

// display user information with profile picture
function renderUserInfoTemplate(user) {
    let userInfo = document.getElementById("userInfo");

    userInfo.setAttribute("class", "row user-info");
    userInfo.innerHTML = `
        <div class="col-lg-4">
            <img src="${user.avatar_url}" alt="avatar">
            <h4>${user.login}</h4>
        </div>

        <div class="col-lg-8">
            ${user.name? `
                <h2>${user.name}</h2>
                <p>
                    <a href="${user.html_url}?tab=followers">
                        Followers: ${user.followers}
                    </a>
                    /
                    <a href="${user.html_url}?tab=following">
                        Following: ${user.following}
                    </a>
                </p>

                ${user.location? `<p class="location">Location: ${user.location}</p>` : ''}
                ` : ''}
            <p>
                <a class="btn btn-default btn-outline-secondary" href="${user.html_url}" role="button">View details</a>
            </p>
        </div>
    `;
}

/*
 User repo listing 
*/

// fetch repos from github api
function fetchUserRepos() {
    console.log('useRepos', reposJson);

    // fetch('https://api.github.com/users/' + username + '/repos?sort=updated').then(res => res.json())
    //     .catch(error => console.error('Error:', error))
    //     .then((response) => {
    //         console.log('useRepos', response);
    //     });
}


