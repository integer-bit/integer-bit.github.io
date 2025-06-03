import "./style.css";

const header = document.querySelector("header");
if (header) {
  const date = document.createElement("p");
  date.textContent = `Today is ${new Date().toLocaleDateString()}.`;
  header.appendChild(date);
}
