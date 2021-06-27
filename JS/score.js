function printHighscores() {
  // gets scores from local storage or sets to an empty array
  var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

  // sorts the highscore by score property in descending order
  highscores.sort(function(a, b) {
    return b.score - a.score;
  });

  highscores.forEach(function(score) {
    // creates li tag for each high score
    var liTag = document.createElement("li");
    liTag.textContent = score.initials + " - " + score.score;

    // displays on page
    var olEl = document.getElementById("highscores");
    olEl.appendChild(liTag);
  });
}

function clearHighscores() {
  window.localStorage.removeItem("highscores");
  window.location.reload();
}

document.getElementById("clear").onclick = clearHighscores;

// runs function when page loads
printHighscores();
