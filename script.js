const apiUrl = "https://api.artic.edu/api/v1/artworks";

 async function fetchArtworks() {

    document.getElementById('loadButton').style.display = 'none';
    
   try {
     const response = await fetch(`${apiUrl}?limit=10&fields=id,title,image_id,artist_display`);
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
   } catch (error) {
     console.error("Error fetching artworks:", error);
   }
 }
