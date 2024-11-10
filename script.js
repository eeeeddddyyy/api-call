const apiUrl = "https://api.artic.edu/api/v1/artworks";
  let currentPage = 1;  

  async function fetchArtworks(page = 1) {
    document.getElementById('loadButton').style.display = 'none';

    try {
      const response = await fetch(`${apiUrl}?limit=10&page=${page}&fields=id,title,image_id,artist_display`);
      const data = await response.json();
      const artworks = data.data;

      const artworksDiv = document.getElementById('artworks');
      artworksDiv.innerHTML = "";

      artworks.forEach(artwork => {
        const column = document.createElement('div');
        column.className = "column artwork";

        const imageUrl = `https://www.artic.edu/iiif/2/${artwork.image_id}/full/300,/0/default.jpg`;

        column.innerHTML = `
          <img src="${imageUrl}" alt="${artwork.title}" class="art-image">
          <h2>${artwork.title}</h2>
          <p><strong>Artist:</strong> ${artwork.artist_display || "Unknown"}</p>
        `;

        artworksDiv.appendChild(column);
      });

      // Adjust button visibility based on page
      document.getElementById('prevButton').style.display = page > 1 ? 'inline-block' : 'none';
      document.getElementById('nextButton').style.display = artworks.length === 10 ? 'inline-block' : 'none';

    } catch (error) {
      console.error("Error fetching artworks:", error);
    }
  }

  function navigate(direction) {
    currentPage += direction;
    fetchArtworks(currentPage);
}

  fetchArtworks(currentPage);