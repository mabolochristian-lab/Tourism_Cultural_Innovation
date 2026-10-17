"use strict";

const spots = [
  {
    id: "boac-cathedral",
    title: "Boac Cathedral",
    municipality: "Boac",
    category: "Architectural Heritage",
    description: "A hilltop stone church dedicated to the Immaculate Conception, with roots reaching back to the Spanish colonial era."
  },
  {
    id: "boac-heritage-district",
    title: "Boac Heritage District",
    municipality: "Boac",
    category: "Historic Townscape",
    description: "Explore the old town center, where the cathedral, plaza, and streets preserve layers of local history."
  },
  {
    id: "boac-moriones",
    title: "Boac Moryonan",
    municipality: "Boac",
    category: "Living Tradition",
    description: "Experience the town's Holy Week observances and the community traditions associated with the Moriones."
  },
  {
    id: "mogpog-church",
    title: "Our Lady of the Candles Parish",
    municipality: "Mogpog",
    category: "Architectural Heritage",
    description: "Visit Mogpog's historic parish church, a local landmark at the heart of town life and devotion."
  },
  {
    id: "mogpog-moryonan",
    title: "Mogpog Moryonan",
    municipality: "Mogpog",
    category: "Living Tradition",
    description: "Discover the town closely associated with the Moriones tradition and its distinctive handcrafted masks."
  },
  {
    id: "mogpog-town-center",
    title: "Mogpog Town Center",
    municipality: "Mogpog",
    category: "Historic Townscape",
    description: "Take a thoughtful walk around the parish and town center to see everyday community life and heritage together."
  },
  {
    id: "gasan-church",
    title: "St. Joseph the Worker Parish",
    municipality: "Gasan",
    category: "Architectural Heritage",
    description: "A parish landmark in Gasan, reflecting the enduring role of faith and community in island life."
  },
  {
    id: "gasan-heritage-walk",
    title: "Gasan Heritage Walk",
    municipality: "Gasan",
    category: "Historic Townscape",
    description: "Wander through Gasan's town center and discover local stories, familiar landmarks, and island architecture."
  },
  {
    id: "gasan-moryonan",
    title: "Gasan Moryonan",
    municipality: "Gasan",
    category: "Living Tradition",
    description: "Learn how Gasan's community marks Holy Week and keeps Marinduque's living Moriones heritage close."
  },
  {
    id: "boac-casa-real",
    title: "Casa Real de Boac",
    municipality: "Boac",
    category: "Architectural Heritage",
    description: "A historic civic landmark in Boac, reflecting the town's role as Marinduque's provincial center through the colonial period."
  },
  {
    id: "mogpog-luzon-datum",
    title: "Luzon Datum of 1911",
    municipality: "Mogpog",
    category: "Historic Landmark",
    description: "Visit the Balanacan geodetic reference marker established in 1911, an important landmark in the history of Philippine surveying."
  },
  {
    id: "gasan-kalutang",
    title: "Kalutang Music Tradition",
    municipality: "Gasan",
    category: "Living Tradition",
    description: "Discover Gasan's distinctive musical tradition of paired hardwood bars, played together as a community percussion instrument."
  },
  {
    id: "mogpog-moriones-mask-workshop",
    title: "Moriones Mask Workshop",
    municipality: "Mogpog",
    category: "Living Tradition",
    description: "Learn about the craft of shaping and decorating Moriones masks, traditionally carved from dapdap wood by local artisans."
  }
];

const storageKey = "marinduque-heritage-itinerary-v1";
const municipalityFilter = document.querySelector("#municipality-filter");
const spotGrid = document.querySelector("#spot-grid");
const resultCount = document.querySelector("#results-count");
const itineraryList = document.querySelector("#itinerary-list");
const itinerarySummary = document.querySelector("#itinerary-summary");
const emptyState = document.querySelector("#empty-state");
const clearButton = document.querySelector("#clear-itinerary");
const saveStatus = document.querySelector("#save-status");
const navToggle = document.querySelector(".nav-toggle");
const primaryNavigation = document.querySelector("#primary-navigation");

let itinerary = loadItinerary();

function loadItinerary() {
  try {
    const saved = window.localStorage.getItem(storageKey);
    if (!saved) return [];
    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed)) throw new TypeError("Saved itinerary is not a list.");

    const validIds = new Set(spots.map((spot) => spot.id));
    return parsed.filter((item) =>
      item && typeof item.id === "string" && validIds.has(item.id) && typeof item.visited === "boolean"
    ).map(({ id, visited }) => ({ id, visited }));
  } catch (error) {
    console.error("Could not load the saved heritage itinerary.", error);
    saveStatus.textContent = "Saved tour could not be loaded from this device.";
    return [];
  }
}

function saveItinerary() {
  try {
    window.localStorage.setItem(storageKey, JSON.stringify(itinerary));
    saveStatus.textContent = "Your tour is saved on this device.";
  } catch (error) {
    console.error("Could not save the heritage itinerary.", error);
    saveStatus.textContent = "Your changes are shown, but could not be saved on this device.";
  }
}

function makeElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

function renderSpots() {
  const municipality = municipalityFilter.value;
  const visibleSpots = municipality === "all"
    ? spots
    : spots.filter((spot) => spot.municipality === municipality);

  spotGrid.replaceChildren();
  resultCount.textContent = `${visibleSpots.length} ${visibleSpots.length === 1 ? "spot" : "spots"}`;

  if (visibleSpots.length === 0) {
    spotGrid.append(makeElement("p", "no-results", "No heritage spots found in this municipality."));
    return;
  }

  const itineraryIds = new Set(itinerary.map((item) => item.id));
  visibleSpots.forEach((spot, index) => {
    const card = makeElement("article", "spot-card");
    const topline = makeElement("div", "spot-topline");
    topline.append(
      makeElement("span", "spot-type", spot.category),
      makeElement("span", "spot-number", String(index + 1).padStart(2, "0"))
    );
    const title = makeElement("h3", "", spot.title);
    const place = makeElement("p", "spot-municipality", spot.municipality);
    const description = makeElement("p", "spot-description", spot.description);
    const added = itineraryIds.has(spot.id);
    const addButton = makeElement("button", "add-button");
    addButton.type = "button";
    addButton.disabled = added;
    addButton.setAttribute("aria-label", added ? `${spot.title} is already in your tour` : `Add ${spot.title} to your tour`);
    addButton.append(
      makeElement("span", "plus", added ? "✓" : "+"),
      document.createTextNode(added ? "Added to tour" : "Add to my tour")
    );
    addButton.addEventListener("click", () => addSpot(spot.id));
    card.append(topline, title, place, description, addButton);
    spotGrid.append(card);
  });
}

function renderItinerary() {
  itineraryList.replaceChildren();
  const hasStops = itinerary.length > 0;
  emptyState.hidden = hasStops;
  clearButton.disabled = !hasStops;
  const visitedCount = itinerary.filter((item) => item.visited).length;
  itinerarySummary.textContent = hasStops
    ? `${itinerary.length} ${itinerary.length === 1 ? "stop" : "stops"} · ${visitedCount} visited`
    : "No stops added yet";

  itinerary.forEach((item) => {
    const spot = spots.find((candidate) => candidate.id === item.id);
    if (!spot) return;

    const row = makeElement("li", `itinerary-item${item.visited ? " is-visited" : ""}`);
    const checkbox = makeElement("input", "itinerary-check");
    checkbox.type = "checkbox";
    checkbox.checked = item.visited;
    checkbox.id = `visit-${spot.id}`;
    checkbox.setAttribute("aria-label", `Mark ${spot.title} as visited`);
    checkbox.addEventListener("change", () => setVisited(spot.id, checkbox.checked));

    const label = makeElement("label");
    label.htmlFor = checkbox.id;
    label.append(
      makeElement("span", "", spot.title),
      makeElement("small", "", spot.municipality)
    );

    const removeButton = makeElement("button", "remove-button", "×");
    removeButton.type = "button";
    removeButton.setAttribute("aria-label", `Remove ${spot.title} from your tour`);
    removeButton.addEventListener("click", () => removeSpot(spot.id));

    row.append(checkbox, label, removeButton);
    itineraryList.append(row);
  });
}

function refresh() {
  renderSpots();
  renderItinerary();
}

function addSpot(id) {
  if (itinerary.some((item) => item.id === id)) return;
  itinerary.push({ id, visited: false });
  saveItinerary();
  refresh();
  const addedSpot = spots.find((spot) => spot.id === id);
  if (addedSpot) saveStatus.textContent = `${addedSpot.title} added to your tour and saved on this device.`;
}

function removeSpot(id) {
  itinerary = itinerary.filter((item) => item.id !== id);
  saveItinerary();
  refresh();
}

function setVisited(id, visited) {
  itinerary = itinerary.map((item) => item.id === id ? { ...item, visited } : item);
  saveItinerary();
  refresh();
}

municipalityFilter.addEventListener("change", renderSpots);
clearButton.addEventListener("click", () => {
  if (itinerary.length === 0) return;
  itinerary = [];
  saveItinerary();
  refresh();
  saveStatus.textContent = "Your tour has been cleared and saved.";
});

navToggle.addEventListener("click", () => {
  const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", String(!isExpanded));
  primaryNavigation.classList.toggle("is-open", !isExpanded);
});

primaryNavigation.addEventListener("click", (event) => {
  if (event.target.closest("a") && window.matchMedia("(max-width: 620px)").matches) {
    primaryNavigation.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && primaryNavigation.classList.contains("is-open")) {
    primaryNavigation.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.focus();
  }
});

refresh();
