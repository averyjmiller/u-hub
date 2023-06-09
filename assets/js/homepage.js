
document.addEventListener('DOMContentLoaded', function() {
    const taskDateElement = document.getElementById('task-date');
    const date = new Date();
    const dateString = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    taskDateElement.textContent = dateString;

    const tasksContainer = document.getElementById('tasks');
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.sort((a, b) => b.priority - a.priority);

    tasks.forEach((task, index) => {
        let taskCard = document.createElement('div');
        taskCard.className = "card mb-3";
        taskCard.style.color = "black";

        if(task.priority && !task.completed) {
            taskCard.style.backgroundColor = "red";
        } else if(task.completed) {
            taskCard.style.backgroundColor = "green";
        } else {
            taskCard.style.backgroundColor = "yellow";
        }

        taskCard.innerHTML = `
            <div class="card-body d-flex justify-content-between align-items-center">
                <i id="trash${index}" class="fas fa-trash"></i>
                ${task.text}
                <input id="check${index}" type="checkbox" ${task.completed ? "checked" : ""}>
            </div>
        `;

        tasksContainer.appendChild(taskCard);

        document.getElementById(`trash${index}`).addEventListener('click', function() {
            tasks.splice(index, 1);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            location.reload(); 
        });

        document.getElementById(`check${index}`).addEventListener('change', function() {
            tasks[index].completed = this.checked;
            localStorage.setItem('tasks', JSON.stringify(tasks));
            location.reload();
        });
    });

	// Key for mediastack API
	var mediaKey = "877242f5effa43a7d5b13f42c4c74257";

	// Fetch request function
	function fetchFeaturedNews() {
		var mediaUrl = "http://api.mediastack.com/v1/news?access_key=" + mediaKey + "&countries=us&languages=en&sort=popularity&limit=2";

		fetch(mediaUrl)
			.then(function (response) {
				if (response.ok) {
					response.json().then(function (data) {
						renderFeaturedNews(data.data)
					});
				} else {
					alert('Error: ' + response.statusText);
				}
			})
			.catch(function (error) {
				alert('Unable to connect to API');
			});
	}

	function renderFeaturedNews(news) {

	}

	// fetchFeaturedNews();
		
});