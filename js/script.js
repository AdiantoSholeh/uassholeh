document.addEventListener('DOMContentLoaded', getPosts);

function getPosts() {
    fetch('https://dummyjson.com/posts')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const postsArray = Array.isArray(data.posts) ? data.posts : [];
            displayPosts(postsArray);
        })
        .catch(error => console.error('Error fetching data:', error));
}

function displayPosts(posts) {
    const postsList = document.getElementById('postsList');
    postsList.innerHTML = '';

    if (!Array.isArray(posts) || posts.length === 0) {
        console.log('No posts found.');
        return;
    }

    // Create the table headers
    const tableHeaders = ['Title', 'Body', 'UserId', 'Tags'];
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');

    tableHeaders.forEach(headerText => {
        const headerCell = document.createElement('th');
        headerCell.textContent = headerText;
        headerRow.appendChild(headerCell);
    });

    thead.appendChild(headerRow);
    postsList.appendChild(thead);

    // Create table body
    const tbody = document.createElement('tbody');

    posts.forEach(post => {
        const row = document.createElement('tr');

        // Assuming these properties exist in your post object
        const attributes = ['title', 'body', 'userId', 'tags'];

        attributes.forEach(attr => {
            const cell = document.createElement('td');
            cell.textContent = post[attr];
            row.appendChild(cell);
        });

        tbody.appendChild(row);
    });

    postsList.appendChild(tbody);
}

function searchPosts() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.toLowerCase();

    fetch('https://dummyjson.com/posts')
        .then(response => response.json())
        .then(data => {
            const postsArray = Array.isArray(data.posts) ? data.posts : [];

            const filteredPosts = postsArray.filter(post => {
                return post.title.toLowerCase().includes(searchTerm);
            });

            displayPosts(filteredPosts);
        })
        .catch(error => console.error('Error fetching data:', error));
}
