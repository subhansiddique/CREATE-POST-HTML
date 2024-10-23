let cardData = JSON.parse(localStorage.getItem("cardData")) || [];

// Function to generate the cards dynamically
function cardGenerate() {
    const cardContainer = document.getElementById("card-container");
    if (cardContainer) {
        cardContainer.innerHTML = cardData
            .map(
                (data) =>
                    `<div class="card">
                        <img src="${data.image}" alt="${data.title}" style="max-width: 100%;"/>
                        <h3>${data.title}</h3>
                        <p>${data.description}</p>
                        <a href="https://api.whatsapp.com/send?phone=+923122020626&text=Hello Is This Available?" class="card-button"> <button> contact</button></a>
                    </div>`
            )
            .join(""); // Joining the generated array of HTML into a single string
    } else {
        console.error("Card container not found");
    }
}

// Initial call to display the pre-existing cards
cardGenerate();


 

document.addEventListener("DOMContentLoaded", function() {
    const imageInput = document.getElementById("image");
    const imagePreview = document.getElementById("imagePreview");

    // Set up the event listener for the image input
    imageInput.addEventListener("change", function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                imagePreview.src = e.target.result;
                imagePreview.style.display = "block";
            };
            reader.readAsDataURL(file);
        } else {
            imagePreview.style.display = "none"; // Hide preview if no file
        }
    });
});

function dataSubmit() {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;

    if (!title || !description) {
        alert("Please fill in both the title and description.");
        return;
    }

    const imageInput = document.getElementById("image");
    const file = imageInput.files[0];

    // Load existing card data or initialize an empty array
    const cardData = JSON.parse(localStorage.getItem("cardData")) || [];

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imageUrl = e.target.result; // Get the image URL (base64)

            // Push the new card data to the cardData array
            cardData.push({ title, description, image: imageUrl });

            // Save the updated cardData array to local storage
            localStorage.setItem("cardData", JSON.stringify(cardData));

            // Redirect to the card list after saving
            window.location.href = 'index.html';
        };
        reader.readAsDataURL(file); // Read the image file as a Data URL
    } else {
        // If no image is selected, push the data without an image
        cardData.push({
            title,
            description,
            image: "https://via.placeholder.com/150", // Default placeholder image
        });
        localStorage.setItem("cardData", JSON.stringify(cardData));

        // Redirect to the card list after saving
        window.location.href = 'index.html';
    }
}