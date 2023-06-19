//On click function, when the generate roles (go) button is clicked
document.getElementById('generateroles').onclick = function start() {
  //taking the value of the names text field and adding to newPlayers
  newPlayers = document.getElementById('names').value;
  //creating a new variable called split players and splitting new players at each line break
  const splitPlayers = newPlayers.split('\n');
  //Printing the split players list to the Div 'names list' (available names)
  document.getElementById('nameslist').innerHTML =
    splitPlayers + '<br>' + 'Number of People: ' + splitPlayers.length;
  //using the same method to take the player list and split it into an array
  newRoles = document.getElementById('roles').value;
  const splitRoles = newRoles.split('\n');
  document.getElementById('roleslist').innerHTML =
    splitRoles + '<br>' + 'Number of roles: ' + splitRoles.length;
  //function to choose a random item from an array
  function getRandomItem(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    const item = arr[randomIndex];
    return item;
  }

  //creating list of roles
  let rolesList = '<ul>';
  //for loop with counter based on the length of the roles array
  for (let i = 0; i < splitRoles.length; i++)
    //print role at i counter along with a random item from the player list
    rolesList += '<li>' + splitRoles[i] + '⭐ ' + getRandomItem(splitPlayers);
  +'</li>';
  //posting results to the roles list div
  document.getElementById('results').innerHTML = rolesList;
  return false;
};

//refreshing the page on click of the refresh button (start again)
document.getElementById('startagain').onclick = function refresh() {
  location.reload();
};
