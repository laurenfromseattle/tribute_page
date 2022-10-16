/* * * * * * * *
 * LAZY LOAD VIDEOS
 * Courtesy of Chris Ferdinandi of gomakethings.com
 * * * * * * * */

// Get all YouTube video anchor tags
let videos = document.querySelectorAll("[data-youtube]");

// Enhance video links into clickable thumbnails
for (let video of videos) {
    // Get video ID
    let id = new URL(video.href).searchParams.get("v");
    // Add ID to data-youtube attribute
    video.setAttribute("data-youtube", id);
    // Add a role of button
    video.setAttribute("role", "button");
    // Add a thumbnail
    video.innerHTML = `<img alt=""
        src="https://img.youtube.com/vi/${id}/maxresdefault.jpg">
        <span>${video.textContent.replace("Watch on YouTube:", "")}</span>`;
}

// Detect clicks on thumbnails
document.addEventListener("click", clickHandler);

function clickHandler(event) {
    // Get the video link
    let link = event.target.closest("[data-youtube]");
    if (!link) return;
    // Prevent URL from redirecting
    event.preventDefault();
    // Get the video ID
    let id = link.getAttribute("data-youtube");
    // Create the iframe player
    let player = document.createElement("figure");
    player.classList.add("video__container");
    player.innerHTML = `<iframe
    class="video__iframe"
    src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1"
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media;
    gyroscope; picture-in-picture"
    allowfullscreen
    ></iframe><figcaption class="video__caption">${link.textContent}</figcaption>`;
    // Inject the player
    link.replaceWith(player);
}

/* * * * * * * *
 * CURRENT YEAR
 * Courtesy of David Gray, @yesdavidgray
 * * * * * * * */

const year = document.getElementById("year");
const thisYear = new Date().getFullYear();
year.setAttribute("datetime", thisYear);
year.textContent = thisYear;
