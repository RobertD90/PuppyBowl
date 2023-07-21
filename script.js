// Use the API_URL variable to make fetch requests to the API.
const playerContainer = document.querySelector(`#player-container`)
const newDogs = document.querySelector(`#new-player-form`)
const cohortName = "2306-FSA-ET-WEB-FT-SF";
const API_URL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/players`;
// const API_URL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}`;
// const API_URL_SINGLE = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/players/13265`

/**
 * Fetches all players from the API.
 * @returns {Object[]} the array of player objects
 */
const fetchAllPlayers = async () => {
  try {
    const response = await fetch(API_URL)
    // const response = await fetch(`${API_URL}/players`)

    // console.log(response)
    const data = await response.json()
    // console.log(data.data.players)
    return data.data.players
  } catch (err) {
    console.error("Uh oh, trouble fetching players!", err);
  }
};

/**
 * Fetches a single player from the API.
 * @param {number} playerId
 * @returns {Object} the player object
 */
const fetchSinglePlayer = async (playerId) => {
  try {
    const response1 = await fetch(`${API_URL}/players/${playerId}`)
    const data1 = await response1.json()
    console.log(data1)
    return data1
  } catch (err) {
    console.error(`Oh no, trouble fetching player #${playerId}!`, err);
  }
};

/**
 * Adds a new player to the roster via the API.
 * @param {Object} playerObj the player to add
 * @returns {Object} the player returned by the API
 */
const addNewPlayer = async (playerObj) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(playerObj),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json()
    console.log(`Player has been added` + data.playerId)
    console.log(data);
    return data
  } catch (err) {
    console.error("Oops, something went wrong with adding that player!", err);

  }
};

/**
 * Removes a player from the roster via the API.
 * @param {number} playerId the ID of the player to remove
 */
const removePlayer = async (playerId) => {
  try {
    const response = await fetch(`${API_URL}/players/${playerId}`, {
      method: `Delete`,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(),
    })
    const deleteDogs = response.json();

    renderAllPlayers(await fetchAllPlayers());
    return deleteDogs;
  } catch (err) {
    console.error(
      `Whoops, trouble removing player #${playerId} from the roster!`,
      err
    );
  }
};

/**
 * Updates `<main>` to display a list of all players.
 *
 * If there are no players, a corresponding message is displayed instead.
 *
 * Each player is displayed in a card with the following information:
 * - name
 * - id
 * - image (with alt text of the player's name)
 *
 * Additionally, each card has two buttons:
 * - "See details" button that, when clicked, calls `renderSinglePlayer` to
 *    display more information about the player
 * - "Remove from roster" button that, when clicked, will call `removePlayer` to
 *    remove that specific player and then re-render all players
 *
 * Note: this function should replace the current contents of `<main>`, not append to it.
 * @param {Object[]} playerList - an array of player objects
 */
const renderAllPlayers = (playerList) => {
  console.log(playerList)
  playerList.forEach((player) => {
    console.log(playerList)
    console.log(typeof playerList)

    const main = document.querySelector('main');
    const div = document.querySelector(`div`);
    // for (let i = 0; i < playerList.length; i++) {
    //   const player = playerList[i];
    //   const div = document.createElement('div');
    main.appendChild(div);

    div.innerHTML += `
      <h3>${player.name}</h3>
      <h3>ID: ${player.id}</h3>
      <img src=${player.imageUrl}  width=150px>
    `;

    const detailsButton = document.createElement(`button`)
    detailsButton.innerHTML = `Puppy Details`
    div.appendChild(detailsButton)
    detailsButton.setAttribute(`data-id`, `${player.id}`)
    detailsButton.addEventListener(`click`, (event) => {
      main.innerHTML = `Details`
      const form = document.querySelector(`#new-player-form`)
      form.innerHTML = ``
      const playerId = event.target.dataset.id
      renderSinglePlayer(playerId)
    })

    const deleteButton = document.createElement(`button`)
    deleteButton.innerHTML = `Delete`
    div.appendChild(deleteButton)
    deleteButton.setAttribute(`data-id`, `${player.id}`)
    deleteButton.addEventListener(`click`, (event) => {
      event.preventDefault()
      main.innerHTML = `Delete`
    })
  })
}

/**
 * Updates `<main>` to display a single player.
 * The player is displayed in a card with the following information:
 * - name
 * - id
 * - breed
 * - image (with alt text of the player's name)
 * - team name, if the player has one, or "Unassigned"
 *
 * The card also contains a "Back to all players" button that, when clicked,
 * will call `renderAllPlayers` to re-render the full list of players.
 * @param {Object} player an object representing a single player
 */
const renderSinglePlayer = async (playerId) => {
  try {

    const playerDog = await fetchSinglePlayer(playerId)
    // console.log(playerDog)
    const singlePlayerDetails = document.createElement(`div`)
    singlePlayerDetails.classList.add(`player-details`);
    singlePlayerDetails.innerHTML = `
    <h2>${player.name}</h2>
    <h2>ID: ${player.id}</h2>
    <h4>Breed${player.breed}</h4>
    <h4>Team Name${player.team.name}</h4>
    
    `
  } catch (error) {
    console.log(`There is an error in the renderSinglePlayer part of the code`)
  }
};



/**
 * Fills in `<form id="new-player-form">` with the appropriate inputs and a submit button.
 * When the form is submitted, it should call `addNewPlayer`, fetch all players,
 * and then render all players to the DOM.
 */
// const renderNewPlayerForm = () => {
//   try {
//     const form = document.querySelector('#new-player-form');
//     form.innerHTML = `
//       <label for="name">Name:</label>
//       <input type="text" id="name" name="name" required>
//       <label for="imageUrl">Image URL:</label>
//       <input type="text" id="imageUrl" name="imageUrl" required>
//       <button type="submit">Add New Player</button>
//     `;

//     form.addEventListener('submit', async (event) => {
//       event.preventDefault();

//       const name = event.target.name.value;
//       const imageUrl = event.target.imageUrl.value;

//       const newPlayer = {
//         name,
//         imageUrl,
//       };

//       const addedPlayer = await addNewPlayer(newPlayer);

//       // Clear the form and render all players again with the updated list
//       form.reset();
//       renderAllPlayers(await fetchAllPlayers());
//     });
//   } catch (err) {
//     console.error("Uh oh, trouble rendering the new player form!", err);
//   }
// };

const renderNewPlayerForm = () => {
  try {
    const formDiv = document.querySelector('#new-player-form');
    formDiv.innerHTML = `
          <label for="name">Name:</label>
          <input type="text" id="name" name="name" required>
          <label for="imageUrl">Image URL:</label>
          <input type="text" id="imageUrl" name="imageUrl" required>
          <button type="submit">Add New Player</button>
        `;
  } catch (error) {
    console.error("Uh oh, trouble rendering the new player form!", error);
  }
};




/**
 * Initializes the app by fetching all players and rendering them to the DOM.
 */
const init = async () => {
  const players = await fetchAllPlayers();
  // const player = await fetchSinglePlayer(playerIdForFetching)
  console.log(players)

  renderAllPlayers(players);
  renderNewPlayerForm();
};

init();

