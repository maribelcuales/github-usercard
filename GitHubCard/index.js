/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

axios.get('https://api.github.com/users/maribelcuales')
  .then(response => {
    // console.log(response);
    console.log('data: ', response);
    const myInfo = response.data;
    console.log('UserInfo: ', myInfo);
    // console.log(myInfo.login);

    // Step 4
    const cardDetails = createCard(response);
    cards.appendChild(cardDetails); 
})
  .catch(error => {
    console.log('the data was not returned', error); 
})

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

const cards = document.querySelector('.cards');

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const followersArray = [
  'tetondan',
  'dustinmyers',
  'justsml',
  'luishrd',
  'bigknell'
];

followersArray.forEach(user => {
  axios
  .get(`https://api.github.com/users/${user}`)
  .then(response => {
    console.log(response.data);
    cards.appendChild(createCard(response));
  })
  .catch(error => {
    console.log('there was an error getting data', error);
  })
})

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

function createCard(object) {
  const newCard = document.createElement('div'),
  cardImage = document.createElement('img'),
  cardInfo = document.createElement('div'),
  cardName = document.createElement('h3'),
  username = document.createElement('p'),
  location = document.createElement('p'),
  profile = document.createElement('p'),
  githubUrl = document.createElement('a'), 
  followers = document.createElement('p'),
  following = document.createElement('p'),
  bio = document.createElement('p');

  newCard.appendChild(cardImage);
  newCard.appendChild(cardInfo);
  cardInfo.appendChild(cardName);
  cardInfo.appendChild(username);
  cardInfo.appendChild(location);
  cardInfo.appendChild(profile);
  profile.appendChild(githubUrl);
  cardInfo.appendChild(followers);
  cardInfo.appendChild(following);
  cardInfo.appendChild(bio); 

  newCard.classList.add('card');
  cardInfo.classList.add('card-info');
  cardName.classList.add('name');
  username.classList.add('username');

  cardImage.src = object.data.avatar_url;
  cardName.textContent = object.data.name;
  username.textContent = object.data.login;
  location.textContent = `Location: ${object.data.location}`;
  profile.textContent = 'Profile: ';
  githubUrl.textContent = object.data.html_url;
  githubUrl.href = object.data.html_url; 
  followers.textContent = `Followers: ${object.data.followers}`;
  following.textContent = `Following: ${object.data.following}`; 
  bio.textContent = `Bio: ${object.data.bio}`;

  return newCard; 
}


/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
