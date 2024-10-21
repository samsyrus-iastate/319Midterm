
// Function to fetch and generate game cards
async function fetchAndGenerateGameCards() {
    try {
        const response = await fetch('data.json'); // Fetch the data.json file
        const games = await response.json(); // Parse the JSON response

        const gamesContainer = document.getElementById('games-container');
        gamesContainer.innerHTML = '';
        games.forEach(game => {
            const card = `
                      <div class="col">
                          <div class="card shadow-sm">
                              <img src="${game.image}" alt="${game.title}" class="card-img-top">
                              <div class="card-body">
                                  <h5>${game.title}</h5>
                                  <p class="card-text">${game.description}</p>
                                  <p><strong>Platform:</strong> ${game.platform}</p>
                                  <p><strong>Genre:</strong> ${game.genre}</p>
                                  <p><strong>Release Year:</strong> ${game.release_year}</p>
                                  <div class="d-flex justify-content-between align-items-center">
                                  </div>
                              </div>
                          </div>
                      </div>`;
            gamesContainer.innerHTML += card;
        });
    } catch (error) {
        console.error('Error fetching the games data:', error);
    }
}

async function filterGames(platformName) {
    try {
        const response = await fetch('data.json'); // Fetch the data.json file
        const games = await response.json(); // Parse the JSON response

        const gamesContainer = document.getElementById('games-container');
        gamesContainer.innerHTML = '';
        if (platformName == 'all') {
            fetchAndGenerateGameCards();
            return;
        }
        games.forEach(game => {
            if (Array.isArray(game.platform)) {
                if (game.platform.includes(platformName)) {
                    const card = `
                      <div class="col">
                          <div class="card shadow-sm">
                              <img src="${game.image}" alt="${game.title}" class="card-img-top">
                              <div class="card-body">
                                  <h5>${game.title}</h5>
                                  <p class="card-text">${game.description}</p>
                                  <p><strong>Platform:</strong> ${game.platform.join(', ')}</p>
                                  <p><strong>Genre:</strong> ${game.genre.join(', ')}</p>
                                  <p><strong>Release Year:</strong> ${game.release_year}</p>
                                  <div class="d-flex justify-content-between align-items-center">
                                  </div>
                              </div>
                          </div>
                      </div>`;
                    gamesContainer.innerHTML += card;
                }
            } else if (game.platform === platformName) {
                const card = `
                  <div class="col">
                      <div class="card shadow-sm">
                          <img src="${game.image}" alt="${game.title}" class="card-img-top">
                          <div class="card-body">
                              <h5>${game.title}</h5>
                              <p class="card-text">${game.description}</p>
                              <p><strong>Platform:</strong> ${game.platform}</p>
                              <p><strong>Genre:</strong> ${game.genre.join(', ')}</p>
                              <p><strong>Release Year:</strong> ${game.release_year}</p>
                              <div class="d-flex justify-content-between align-items-center">
                              </div>
                          </div>
                      </div>
                  </div>`;
                gamesContainer.innerHTML += card;
            }
        });
    } catch (error) {
        console.error('Error fetching the games data:', error);
    }
}

// Function to search games by name
async function searchGamesByName(searchQuery) {
    // if (searchQuery === ''){
    //   fetchAndGenerateGameCards();
    // }
    try {
        const response = await fetch('data.json');
        const games = await response.json();

        const gamesContainer = document.getElementById('games-container');
        gamesContainer.innerHTML = '';

        const filteredGames = games.filter(game => {
            return game.title.toLowerCase().includes(searchQuery.toLowerCase());
        });

        filteredGames.forEach(game => {
            const card = `
          <div class="col">
            <div class="card shadow-sm">
              <img src="${game.image}" alt="${game.title}" class="card-img-top">
              <div class="card-body">
                <h5>${game.title}</h5>
                <p class="card-text">${game.description}</p>
                <p><strong>Platform:</strong> ${game.platform.join(', ')}</p>
                <p><strong>Genre:</strong> ${game.genre.join(', ')}</p>
                <p><strong>Release Year:</strong> ${game.release_year}</p>
                <div class="d-flex justify-content-between align-items-center">
                </div>
              </div>
            </div>
          </div>
        `;
            gamesContainer.innerHTML += card;
        });
    } catch (error) {
        console.error('Error fetching the games data:', error);
    }
}

// Add event listener to search button
document.getElementById('search-button').addEventListener('click', () => {
    const searchQuery = document.getElementById('search-input').value.trim();
    if (searchQuery) {
        searchGamesByName(searchQuery);
    } else {
        fetchAndGenerateGameCards(); // Reset to show all games
    }
});

document.getElementById('search-input').addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        const searchQuery = document.getElementById('search-input').value.trim();
        if (searchQuery) {
            searchGamesByName(searchQuery);
        } else {
            fetchAndGenerateGameCards(); // Reset to show all games
        }
    }
});

// Call the function to fetch and generate game cards
fetchAndGenerateGameCards();
