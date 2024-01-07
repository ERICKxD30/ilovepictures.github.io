const loggedOutLinks = document.querySelectorAll(".logged-out");
const loggedInLinks = document.querySelectorAll(".logged-in");
const initialMessage = document.querySelector(".welcome-message");
const logginMessage = document.querySelector(".login-message");


export const loginCheck = (user) => {
  if (user) {
    loggedInLinks.forEach((link) => (link.style.display = "block"));
    loggedOutLinks.forEach((link) => (link.style.display = "none"));
    
    initialMessage.style.display = "block";
    logginMessage.style.display = "none";
  } else {
    loggedInLinks.forEach((link) => (link.style.display = "none"));
    loggedOutLinks.forEach((link) => (link.style.display = "block"));

    initialMessage.style.display = "none";
    logginMessage.style.display = "block";
  }
};

export const rolCheck = (data) => {
  const options = document.querySelectorAll(".options-buttons");
  if (data) {
    options.forEach((link) => (link.style.display = "block"));
  } else {
    options.forEach((link) => (link.style.display = "none"));
  }
}
