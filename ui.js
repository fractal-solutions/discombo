// Define a color palette for the cards with brighter colors and higher transparency
const colorPalette = [
    //'rgba(100, 100, 100, 0.8)', // Light gray
    'rgba(150, 150, 150, 0.8)', // Lighter gray
    'rgba(200, 200, 200, 0.8)', // Very light gray
    'rgba(150, 150, 150, 0.8)', // Lighter gray
    'rgba(200, 200, 200, 0.8)', // Very light gray
    'rgba(100, 200, 100, 0.8)', // Light green-gray
    'rgba(100, 100, 150, 0.8)', // Light navy
    //'rgba(150, 100, 100, 0.8)', // Light maroon
];

// Function to create a card
function createCard(title, shortDescription, body, footer) {
    const cardContainer = document.getElementById('card-container');

    // Create card element
    const card = document.createElement('div');
    card.className = 'card';

    // Assign a random color from the palette
    const randomColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
    card.style.backgroundColor = randomColor; // Set the card's background color

    // Create card header
    const cardHeader = document.createElement('div');
    cardHeader.className = 'card-header';
    cardHeader.innerText = title;

    // Create horizontal rule
    const cardHr = document.createElement('hr');
    cardHr.className = 'card-hr'; // Apply styling for horizontal rule

    // Create card body
    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    cardBody.innerText = shortDescription;

    // Create card footer
    const cardFooter = document.createElement('div');
    cardFooter.className = 'card-footer';
    cardFooter.innerText = footer;

    // Append elements to card
    card.appendChild(cardHeader);
    card.appendChild(cardHr); // Add the horizontal rule
    card.appendChild(cardBody);
    card.appendChild(cardFooter);
    cardContainer.appendChild(card);

    // Add click event to open modal
    card.onclick = function() {
        openModal(title, body);
    };
}

// Function to open modal
function openModal(title, body) {
    const modal = document.getElementById('myModal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');

    modalTitle.innerText = title;
    modalBody.innerHTML = body;
    modal.style.display = "block"; // Show the modal
}

// Function to close modal
function closeModal() {
    const modal = document.getElementById('myModal');
    modal.style.display = "none"; // Hide the modal
}

// Event listener for closing the modal
document.querySelector('.close').onclick = closeModal;

// Event listener for clicking outside the modal to close it
window.onclick = function(event) {
    const modal = document.getElementById('myModal');
    if (event.target == modal) {
        closeModal();
    }
};

//import { PAEDFramework } from "./blogs";

// Example usage: Adding cards
const titles = [
    "Price Action Energy Dynamics (PAED) Framework",
    "Crazy How",
    "Another Card Title" // Add more titles if needed
];
const shortDescriptions = [
    "The PAED framework is a first-principles method for efficient trading based on price action, inspired by the Hopfield neural network’s energy-minimization dynamics. This framework views price behavior as a system governed by energy functions, with stable market patterns as attractor states.", // Short description for the first card
    "This card provides insights into another topic.",
    "This card provides insights into another topic."  // Short description for the second card
];
const bodies = [
    PAEDFramework,
    "Slim Through S",
    `<h1>Another Card Body</h1><p>This is the body of another card.</p>` // Add more bodies if needed
];
const footers = [
    "Fractal Dev",
    "Footer", // First footer
    "Another Footer" // Add more footers if needed
];

// Create cards for each entry
for (let i = 0; i < titles.length; i++) {
    createCard(titles[i],shortDescriptions[i], bodies[i], footers[i]);
}


var PAEDFramework = `
<p>The <strong>PAED</strong> framework is a first-principles method for efficient trading based on price action, inspired by the Hopfield neural network’s energy-minimization dynamics. This framework views price behavior as a system governed by energy functions, with stable market patterns as attractor states. Here's the concise yet complete documentation for reference.</p>

<hr>

<h2>1. Define the Problem</h2>
<p>Efficient trading involves recognizing patterns in price action data, predicting the next likely movement, and acting on it profitably. The PAED framework reduces this to <strong>pattern recognition</strong>, <strong>energy modeling</strong>, and <strong>decision-making</strong>.</p>

<h2>2. First Principles of Price Action</h2>
<ol>
    <li><strong>Price Movement</strong>: Driven by supply-demand imbalances, representing collective shifts in market perception.</li>
    <li><strong>Market Structure</strong>: Price action respects key zones (e.g., support/resistance) and trends due to herd psychology.</li>
    <li><strong>Efficiency vs. Inefficiency</strong>: Markets are inefficient in the short term (opportunity) but efficient in the long term (randomness).</li>
</ol>

<h2>3. Energy-Based Modeling of Price Behavior</h2>

<h3>Energy Function</h3>
<p>The price dynamics are described by the energy function:</p>
<code>E = Trend Energy + Volatility Energy - Liquidity Flow.</code>

<ol>
    <li><strong>Trend Energy</strong>: Captures directional movement (momentum):
        <code>Trend Energy = -α ∑<sub>t</sub> (P<sub>t</sub> - P<sub>t-1</sub>),</code>
        where <code>α</code> controls trend-following strength.
    </li>
    <li><strong>Volatility Energy</strong>: Models random fluctuations:
        <code>Volatility Energy = β ∑<sub>t</sub> (P<sub>t</sub> - μ)<sup>2</sup>,</code>
        where <code>μ</code> is the local average price, and <code>β</code> adjusts sensitivity.
    </li>
    <li><strong>Liquidity Flow</strong>: Captures the effect of large orders/news:
        <code>Liquidity Flow = -γ ∑<sub>t</sub> Volume<sub>t</sub> · ΔP<sub>t</sub>,</code>
        where <code>Volume<sub>t</sub></code> is trade volume, and <code>ΔP<sub>t</sub></code> is the price change.
    </li>
</ol>
<h3>State Updates</h3>
<p>Define price states <code>P<sub>t</sub></code> and update them to minimize energy:</p>
<code>P<sub>t+1</sub> = P<sub>t</sub> + η ∂E/∂P<sub>t</sub>,</code>
where <code>η</code> is the step size for adjustments.

<h2>4. Recognizing and Storing Market Patterns</h2>
<h3>Stable States as Patterns</h3>
<p>Repeatable price patterns (e.g., trends, reversals) are encoded as <strong>local energy minima</strong>. The weights of price levels are defined using a Hebbian-like learning rule:</p>
<code>w<sub>ij</sub> = (1/N) ∑<sub>μ</sub> (ΔP<sub>i</sub><sup>μ</sup> ΔP<sub>j</sub><sup>μ</sup>),</code>
reinforcing levels frequently co-active during specific patterns.

<h3>Attractor Dynamics</h3>
<p>When price approaches a stored pattern (e.g., double top), it converges to that attractor. Spurious states (random noise) are minimized through appropriate parameter tuning.</p>

<h2>5. Decision-Making and Risk Management</h2>
<h3>Actionable Trading Rules</h3>
<ol>
    <li><strong>Entry Signal</strong>: Enter when price approaches a stable state and Signal Strength exceeds a noise threshold:
        <code>Signal Strength = ∑<sub>i</sub> w<sub>ij</sub> ΔP<sub>i</sub> - Noise Threshold.</code>
    </li>
    <li><strong>Exit Signal</strong>: Exit at local energy minima or when noise dominates:
        <code>ΔE ≈ 0 or |Volatility Energy| > |Trend Energy|.</code>
    </li>
    <li><strong>Stop-Loss</strong>: Dynamically set using volatility:
        <code>Stop-Loss Level = P<sub>t</sub> ± √(Volatility Energy).</code>
    </li>
</ol>

<h2>6. Convergence Guarantees</h2>
<ol>
    <li>The energy function <code>E</code> is bounded and decreases with each price update, ensuring convergence to a stable pattern.</li>
    <li>The symmetric weight matrix <code>w<sub>ij</sub></code> prevents oscillations and ensures the system settles into attractors.</li>
</ol>

<h2>7. Practical Implementation</h2>
<h3>Steps to Build the PAED Framework</h3>
<ol>
    <li><strong>Data Preparation</strong>: Use historical price and volume data to compute <code>α, β, γ</code>.</li>
    <li><strong>Pattern Encoding</strong>: Train the system using a Hebbian-like rule to store market patterns as weights.</li>
    <li><strong>Energy Minimization</strong>: Use gradient descent to model price evolution and identify attractors.</li>
    <li><strong>Backtesting</strong>: Test the framework across datasets to validate profitability and refine thresholds.</li>
</ol>

<h2>Summary</h2>
<p>The PAED framework models price action as a system minimizing energy, with trends, volatility, and liquidity influencing dynamics. Patterns are encoded as attractor states, and actionable signals are derived by interpreting system behavior.</p>
`;