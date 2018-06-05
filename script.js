let username = '';
let show_count = 0;
let total_count = 0;

const searchBtn = document.getElementById("search-btn");
searchBtn.addEventListener('click', function () {
    username = document.getElementById("searchText").value;

    resetPreviousResult();

    fetchAndDisplayUserInfo();
    fetchAndDisplayUserRepos();
});

/*
    User basic info
*/
// fetch userinfo from github api
function fetchAndDisplayUserInfo() {
    total_count = userInfoJson.public_repos;
    renderUserInfoTemplate(userInfoJson);

    // fetch('https://api.github.com/users/' + username).then(res => res.json())
    //     .catch(error => console.error('Error:', error))
    //     .then((response) => {
    // total_count = response.public_repos;
    //         renderUserInfoTemplate(response);
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
function fetchAndDisplayUserRepos() {

    show_count += reposJson.length;
    renderResultFoundTemplate();
    renderRepoListTemplate(reposJson);

    // fetch('https://api.github.com/users/' + username + '/repos?sort=updated').then(res => res.json())
    //     .catch(error => console.error('Error:', error))
    //     .then((response) => {
    // show_count += response.length;
    //         renderRepoListTemplate(response);
    //     });
}

function renderRepoListTemplate(repoList) {
    let repoElement = document.getElementById("repos");
    for (const repo of repoList) {
        const repoThumb = getRepoThumbnailTemplate(repo);
        repoElement.insertAdjacentHTML('beforeend', repoThumb);
    }
}

function getRepoThumbnailTemplate(repo) {
    return `
        <div class="thumbnail">
            <div class="caption">
                <h3>
                    <a href="${repo.html_url}">${repo.name}</a>
                    <span class="badge">${repo.stargazers_count} Stars</span>
                    <span class="badge">${repo.forks} Forks</span>
                </h3>
                ${repo.language? `<p class="language">Main language: ${repo.language}</p>` : ''}
                ${repo.description? `<p> ${repo.description}</p>` : ''}
            </div>
        </div>
        `;
}

/* Status message*/
function renderResultFoundTemplate() {
    let statusMessage = document.getElementById("statusMessage");
    statusMessage.innerHTML = `<h2>Showing ${show_count} of ${total_count} public repositories</h2>`;
}

/* reset result*/

function resetPreviousResult() {
    total_count = 0;
    show_count = 0;
    document.getElementById("searchText").value = '';
    document.getElementById("userInfo").innerHTML = '';
    document.getElementById("repos").innerHTML = '';
}

/* on scroll event*/
$(window).scroll(function () {
    if ($(window).scrollTop() == $(document).height() - $(window).height() && isScrollable) {
        fetchAndDisplayUserRepos();
    }
});

/* isSscrollable */
const isScrollable = () => total_count % show_count != 0;