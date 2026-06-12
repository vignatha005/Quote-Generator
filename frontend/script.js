const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const historyDiv = document.getElementById("history");
const generateBtn = document.getElementById("generateBtn");

const API = "http://localhost:5000/api/quotes";

generateBtn.addEventListener("click", async () => {
    const res = await fetch(`${API}/random`);
    const data = await res.json();

    console.log(data);

    quoteText.textContent = `"${data.content}"`;
    authorText.textContent = `- ${data.author}`;

    loadHistory();
});

async function loadHistory() {
    const res = await fetch(`${API}/history`);
    const quotes = await res.json();

    historyDiv.innerHTML = "";

    quotes.forEach(q => {
    historyDiv.innerHTML += `
        <div class="history-item">
            <p>"${q.content}"</p>
            <small>- ${q.author}</small>

            <div class="actions">
                <button onclick="copyQuote('${q.content}','${q.author}')">
                    📋 Copy
                </button>

                <button onclick="toggleFavorite('${q._id}')">
                    ${q.favorite ? '⭐ Favorited' : '☆ Favorite'}
                </button>

                <button onclick="deleteQuote('${q._id}')">
                    🗑 Delete
                </button>
            </div>
        </div>
    `;
});
}
function copyQuote(content, author) {
    navigator.clipboard.writeText(
        `"${content}" - ${author}`
    );

    alert("Quote copied!");
}
async function toggleFavorite(id) {
    await fetch(
        `${API}/favorite/${id}`,
        {
            method: "PUT"
        }
    );

    loadHistory();
}
async function deleteQuote(id) {

    const confirmDelete = confirm(
        "Delete this quote?"
    );

    if (!confirmDelete) return;

    await fetch(
        `${API}/${id}`,
        {
            method: "DELETE"
        }
    );

    loadHistory();
}
loadHistory();