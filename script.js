const searchBtn = document.getElementById("search-btn");


searchBtn.addEventListener('click', function () {
    username = document.getElementById("searchText").value;
    console.log('search text', username);

    fetchUserInfo(username);
    fetchUserRepos(username);
});


function fetchUserInfo(username) {

    console.log('useRepos', userInfoJson);

    // fetch('https://api.github.com/users/' + username).then(res => res.json())
    //     .catch(error => console.error('Error:', error))
    //     .then((response) => {
    //        console.log('userinfo', response);
    //     });
}

function fetchUserRepos() {
    console.log('useRepos', reposJson);

    // fetch('https://api.github.com/users/' + username + '/repos?sort=updated').then(res => res.json())
    //     .catch(error => console.error('Error:', error))
    //     .then((response) => {
    //         console.log('useRepos', response);
    //     });
}