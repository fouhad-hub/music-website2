async function searchMusic() {
  const query = document.getElementById("searchBar").value;
  const resultsContainer = document.getElementById("results");
  const audioPlayer = document.getElementById("audioPlayer");
  resultsContainer.innerHTML = "";
  audioPlayer.src = ""; // Reset audio source

  if (query) {
    const response = await fetch(
      `https://itunes.apple.com/search?term=${encodeURIComponent(
        query
      )}&limit=10`
    );
    const data = await response.json();
    const results = data.results;

    if (results.length > 0) {
      results.forEach((song) => {
        const songElement = document.createElement("div");
        songElement.innerHTML = `
                    <p><strong>${song.trackName}</strong> by ${song.artistName}</p>
                    <button onclick="playSong('${song.previewUrl}')">Play</button>
                `;
        resultsContainer.appendChild(songElement);
      });
    } else {
      resultsContainer.innerHTML = "<p>No results found.</p>";
    }
  } else {
    resultsContainer.innerHTML = "<p>Please enter a search query.</p>";
  }
}

function playSong(previewUrl) {
  const audioPlayer = document.getElementById("audioPlayer");
  audioPlayer.src = previewUrl;
  audioPlayer.play();
}
