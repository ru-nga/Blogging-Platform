document.addEventListener('DOMContentLoaded', () => {
  const userIdInput = document.getElementById('userId');
  const fetchDataBtn = document.getElementById('fetchDataBtn');
  const postsContainer = document.getElementById('posts-container');
  const todosContainer = document.getElementById('todos-container');

  fetchDataBtn.addEventListener('click', () => {
    const userId = userIdInput.value.trim();
    if (!userId) {
      alert('Please enter a valid User ID.');
      return;
    }

    // Clear previous data
    postsContainer.innerHTML = '';
    todosContainer.innerHTML = '';

    // Fetch and Display Posts for the specified User ID
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
      .then(response => response.json())
      .then(posts => {
        if (posts.length === 0) {
          displayError(postsContainer, 'No posts found for this user.');
          return;
        }

        posts.forEach(post => {
          const postCard = createPostCard(post);
          postsContainer.appendChild(postCard);
        });
      })
      .catch(error => {
        displayError(postsContainer, 'Failed to fetch posts.');
        console.error('Error fetching posts:', error);
      });

    // Fetch and Display Todos for the specified User ID
    fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`)
      .then(response => response.json())
      .then(todos => {
        if (todos.length === 0) {
          displayError(todosContainer, 'No todos found for this user.');
          return;
        }

        todos.forEach(todo => {
          const todoItem = createTodoItem(todo);
          todosContainer.appendChild(todoItem);
        });
      })
      .catch(error => {
        displayError(todosContainer, 'Failed to fetch todos.');
        console.error('Error fetching todos:', error);
      });
  });

  // Utility functions
  const createPostCard = post => {
    const card = document.createElement('div');
    card.classList.add('card');

    const title = document.createElement('h3');
    title.textContent = post.title;

    const body = document.createElement('p');
    body.textContent = post.body;

    card.appendChild(title);
    card.appendChild(body);

    return card;
  };

  const createTodoItem = todo => {
    const item = document.createElement('div');
    item.classList.add('todo-item');

    const title = document.createElement('h3');
    title.textContent = todo.title;

    const completed = document.createElement('span');
    completed.textContent = todo.completed ? 'Completed' : 'Not Completed';

    item.appendChild(title);
    item.appendChild(completed);

    return item;
  };

  const displayError = (targetElement, message) => {
    const errorMessage = document.createElement('p');
    errorMessage.classList.add('error-message');
    errorMessage.textContent = message;
    targetElement.appendChild(errorMessage);
  };
});
