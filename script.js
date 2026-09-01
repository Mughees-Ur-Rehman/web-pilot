// ===============================
// WEBPILOT - JAVASCRIPT
// ===============================


// ===============================
// THEME TOGGLE
// ===============================

const themeBtn = document.getElementById("themeBtn");

if (themeBtn) {
    themeBtn.addEventListener("click", function () {
        document.body.classList.toggle("dark");

        if (document.body.classList.contains("dark")) {
            themeBtn.textContent = "☀";
            localStorage.setItem("theme", "dark");
        } else {
            themeBtn.textContent = "☾";
            localStorage.setItem("theme", "light");
        }
    });
}


// Load saved theme
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");

    if (themeBtn) {
        themeBtn.textContent = "☀";
    }
}


// ===============================
// SEARCH
// ===============================

const heroSearch = document.getElementById("heroSearch");
const searchBtn = document.getElementById("searchBtn");

function searchTools() {

    if (!heroSearch) return;

    const query = heroSearch.value.trim().toLowerCase();

    const toolCards = document.querySelectorAll(".tool-card");
    const noResults = document.getElementById("noResults");

    let found = 0;

    toolCards.forEach(function (card) {

        const name =
            (card.dataset.name || card.textContent).toLowerCase();

        if (query === "" || name.includes(query)) {

            card.classList.remove("hide");

            found++;

        } else {

            card.classList.add("hide");

        }

    });

    if (noResults) {
        noResults.style.display =
            found === 0 ? "block" : "none";
    }

    const toolsSection = document.getElementById("tools");

    if (toolsSection) {
        toolsSection.scrollIntoView({
            behavior: "smooth"
        });
    }
}


if (searchBtn) {
    searchBtn.addEventListener("click", searchTools);
}


if (heroSearch) {

    heroSearch.addEventListener("keydown", function (event) {

        if (event.key === "Enter") {
            searchTools();
        }

    });

}


// ===============================
// FILTERS
// ===============================

const filters = document.querySelectorAll(".filter");

filters.forEach(function (filter) {

    filter.addEventListener("click", function () {

        filters.forEach(function (button) {
            button.classList.remove("active");
        });

        filter.classList.add("active");

        const selected =
            filter.dataset.filter || "all";

        const cards =
            document.querySelectorAll(".tool-card");

        const noResults =
            document.getElementById("noResults");

        let visible = 0;

        cards.forEach(function (card) {

            const category =
                card.dataset.category || "";

            if (
                selected === "all" ||
                category === selected
            ) {

                card.classList.remove("hide");

                visible++;

            } else {

                card.classList.add("hide");

            }

        });

        if (noResults) {
            noResults.style.display =
                visible === 0 ? "block" : "none";
        }

    });

});


// ===============================
// QUICK SEARCH BUTTONS
// ===============================

const quickButtons =
    document.querySelectorAll(".quick-links button");

quickButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        if (!heroSearch) return;

        heroSearch.value =
            button.dataset.search ||
            button.textContent.trim();

        searchTools();

    });

});


// ===============================
// MODAL
// ===============================

const modal =
    document.getElementById("toolModal");

const closeModal =
    document.getElementById("closeModal");

const toolInterface =
    document.getElementById("toolInterface");


function showModal() {

    if (modal) {
        modal.classList.add("active");
    }

}


function hideModal() {

    if (modal) {
        modal.classList.remove("active");
    }

}


if (closeModal) {

    closeModal.addEventListener("click", function () {
        hideModal();
    });

}


if (modal) {

    modal.addEventListener("click", function (event) {

        if (event.target === modal) {
            hideModal();
        }

    });

}


// Close with Escape
document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {
        hideModal();
    }

});


// ===============================
// OPEN TOOLS
// ===============================

const openToolButtons =
    document.querySelectorAll(".open-tool");

openToolButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const tool =
            button.dataset.tool;

        openTool(tool);

    });

});


function openTool(tool) {

    if (!toolInterface) return;

    showModal();


    // -------------------------------
    // WORD COUNTER
    // -------------------------------

    if (tool === "counter") {

        toolInterface.innerHTML = `

            <div class="tool-interface">

                <h2>Word Counter</h2>

                <p>
                    Count words, characters and sentences.
                </p>

                <textarea
                    id="counterText"
                    placeholder="Type or paste your text here..."
                ></textarea>

                <button
                    class="tool-button"
                    onclick="countWords()">
                    Count Words
                </button>

                <div
                    class="result"
                    id="counterResult">
                    Your result will appear here.
                </div>

            </div>

        `;

    }


    // -------------------------------
    // PASSWORD GENERATOR
    // -------------------------------

    else if (tool === "password") {

        toolInterface.innerHTML = `

            <div class="tool-interface">

                <h2>Password Generator</h2>

                <p>
                    Generate a strong random password.
                </p>

                <input
                    id="passwordLength"
                    type="number"
                    value="16"
                    min="6"
                    max="50"
                >

                <button
                    class="tool-button"
                    onclick="generatePassword()">
                    Generate Password
                </button>

                <div
                    class="result"
                    id="passwordResult">
                    Your password will appear here.
                </div>

            </div>

        `;

    }


    // -------------------------------
    // JSON FORMATTER
    // -------------------------------

    else if (tool === "json") {

        toolInterface.innerHTML = `

            <div class="tool-interface">

                <h2>JSON Formatter</h2>

                <p>
                    Format and validate JSON data.
                </p>

                <textarea
                    id="jsonInput"
                    placeholder='{"name":"WebPilot"}'
                ></textarea>

                <button
                    class="tool-button"
                    onclick="formatJSON()">
                    Format JSON
                </button>

                <div class="result">

                    <pre id="jsonResult">
                    Result will appear here.
                    </pre>

                </div>

            </div>

        `;

    }


    // -------------------------------
    // BASE64
    // -------------------------------

    else if (tool === "base64") {

        toolInterface.innerHTML = `

            <div class="tool-interface">

                <h2>Base64 Encoder / Decoder</h2>

                <p>
                    Encode or decode Base64 text.
                </p>

                <textarea
                    id="base64Input"
                    placeholder="Enter your text..."
                ></textarea>

                <button
                    class="tool-button"
                    onclick="encodeBase64()">
                    Encode
                </button>

                <button
                    class="tool-button"
                    onclick="decodeBase64()">
                    Decode
                </button>

                <div
                    class="result"
                    id="base64Result">
                    Result will appear here.
                </div>

            </div>

        `;

    }


    // -------------------------------
    // CASE CONVERTER
    // -------------------------------

    else if (tool === "case") {

        toolInterface.innerHTML = `

            <div class="tool-interface">

                <h2>Case Converter</h2>

                <p>
                    Convert text to uppercase or lowercase.
                </p>

                <textarea
                    id="caseInput"
                    placeholder="Enter your text..."
                ></textarea>

                <button
                    class="tool-button"
                    onclick="upperCase()">
                    UPPERCASE
                </button>

                <button
                    class="tool-button"
                    onclick="lowerCase()">
                    lowercase
                </button>

                <div
                    class="result"
                    id="caseResult">
                    Result will appear here.
                </div>

            </div>

        `;

    }


    // -------------------------------
    // META TAG GENERATOR
    // -------------------------------

    else if (tool === "meta") {

        toolInterface.innerHTML = `

            <div class="tool-interface">

                <h2>Meta Tag Generator</h2>

                <p>
                    Generate SEO meta tags for your website.
                </p>

                <input
                    id="metaTitle"
                    placeholder="Website title"
                >

                <textarea
                    id="metaDescription"
                    placeholder="Website description"
                ></textarea>

                <button
                    class="tool-button"
                    onclick="generateMeta()">
                    Generate Meta Tags
                </button>

                <div class="result">

                    <pre id="metaResult">
                    Result will appear here.
                    </pre>

                </div>

            </div>

        `;

    }

}


// ===============================
// WORD COUNTER FUNCTION
// ===============================

function countWords() {

    const textElement =
        document.getElementById("counterText");

    const resultElement =
        document.getElementById("counterResult");

    if (!textElement || !resultElement) return;

    const text =
        textElement.value.trim();

    const words =
        text === ""
            ? 0
            : text.split(/\s+/).length;

    const characters =
        textElement.value.length;

    const charactersNoSpaces =
        textElement.value
            .replace(/\s/g, "")
            .length;

    const sentences =
        text === ""
            ? 0
            : text
                .split(/[.!?]+/)
                .filter(function (sentence) {
                    return sentence.trim() !== "";
                }).length;

    resultElement.innerHTML = `

        <strong>Words:</strong> ${words}<br>

        <strong>Characters:</strong> ${characters}<br>

        <strong>Characters without spaces:</strong>
        ${charactersNoSpaces}<br>

        <strong>Sentences:</strong> ${sentences}

    `;

}


// ===============================
// PASSWORD GENERATOR
// ===============================

function generatePassword() {

    const lengthInput =
        document.getElementById("passwordLength");

    const result =
        document.getElementById("passwordResult");

    if (!lengthInput || !result) return;

    let length =
        parseInt(lengthInput.value);

    if (isNaN(length)) {
        length = 16;
    }

    if (length < 6) {
        length = 6;
    }

    if (length > 50) {
        length = 50;
    }

    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
        "abcdefghijklmnopqrstuvwxyz" +
        "0123456789" +
        "!@#$%^&*()_+-=[]{}";

    let password = "";

    for (let i = 0; i < length; i++) {

        const randomIndex =
            Math.floor(
                Math.random() * characters.length
            );

        password +=
            characters[randomIndex];

    }

    result.textContent = password;

}


// ===============================
// JSON FORMATTER
// ===============================

function formatJSON() {

    const input =
        document.getElementById("jsonInput");

    const result =
        document.getElementById("jsonResult");

    if (!input || !result) return;

    try {

        const object =
            JSON.parse(input.value);

        const formatted =
            JSON.stringify(
                object,
                null,
                4
            );

        result.textContent =
            formatted;

    } catch (error) {

        result.textContent =
            "Invalid JSON. Please check your JSON syntax.";

    }

}


// ===============================
// BASE64 ENCODE
// ===============================

function encodeBase64() {

    const input =
        document.getElementById("base64Input");

    const result =
        document.getElementById("base64Result");

    if (!input || !result) return;

    try {

        const encoded =
            btoa(
                unescape(
                    encodeURIComponent(
                        input.value
                    )
                )
            );

        result.textContent =
            encoded;

    } catch (error) {

        result.textContent =
            "Unable to encode this text.";

    }

}


// ===============================
// BASE64 DECODE
// ===============================

function decodeBase64() {

    const input =
        document.getElementById("base64Input");

    const result =
        document.getElementById("base64Result");

    if (!input || !result) return;

    try {

        const decoded =
            decodeURIComponent(
                escape(
                    atob(
                        input.value
                    )
                )
            );

        result.textContent =
            decoded;

    } catch (error) {

        result.textContent =
            "Invalid Base64 text.";

    }

}


// ===============================
// CASE CONVERTER
// ===============================

function upperCase() {

    const input =
        document.getElementById("caseInput");

    const result =
        document.getElementById("caseResult");

    if (!input || !result) return;

    result.textContent =
        input.value.toUpperCase();

}


function lowerCase() {

    const input =
        document.getElementById("caseInput");

    const result =
        document.getElementById("caseResult");

    if (!input || !result) return;

    result.textContent =
        input.value.toLowerCase();

}


// ===============================
// META TAG GENERATOR
// ===============================

function generateMeta() {

    const titleInput =
        document.getElementById("metaTitle");

    const descriptionInput =
        document.getElementById("metaDescription");

    const result =
        document.getElementById("metaResult");

    if (
        !titleInput ||
        !descriptionInput ||
        !result
    ) return;

    const title =
        titleInput.value.trim();

    const description =
        descriptionInput.value.trim();

    const metaTags = `
<title>${escapeHTML(title)}</title>

<meta name="description"
content="${escapeHTML(description)}">

<meta property="og:title"
content="${escapeHTML(title)}">

<meta property="og:description"
content="${escapeHTML(description)}">
`.trim();

    result.textContent =
        metaTags;

}


// ===============================
// COPY RESULT
// ===============================

function copyText(text) {

    if (!text) return;

    navigator.clipboard.writeText(text)
        .then(function () {

            alert("Copied to clipboard!");

        })
        .catch(function () {

            alert("Unable to copy.");

        });

}


// ===============================
// HTML ESCAPE
// ===============================

function escapeHTML(text) {

    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}