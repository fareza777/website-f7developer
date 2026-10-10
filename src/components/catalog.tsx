"use client";

import { Suspense, useEffect, useState, useSyncExternalStore } from "react";
import { useSearchParams } from "next/navigation";
import { MagnifyingGlassIcon, XIcon, GameControllerIcon } from "./icons";
import { GameCard, AppCard, WebProjects, UpdateCard } from "./ui";
import { products, updates, webProjects } from "@/lib/data";
import { filterCatalog } from "@/lib/catalog.mjs";

function subscribeCategory(callback: () => void) {
  window.addEventListener("popstate", callback);
  window.addEventListener("f7:categorychange", callback);
  return () => {
    window.removeEventListener("popstate", callback);
    window.removeEventListener("f7:categorychange", callback);
  };
}

const categorySnapshot = () =>
  new URLSearchParams(window.location.search).get("category") || "All";
const serverCategorySnapshot = () => "All";

function CategoryRouteSync() {
  const searchParams = useSearchParams();
  useEffect(() => {
    window.dispatchEvent(new Event("f7:categorychange"));
  }, [searchParams]);
  return null;
}

export function Catalog({ mode }: { mode: "games" | "products" | "updates" }) {
  // Pre-render the full catalogue. URL filtering hydrates without hiding product HTML.
  const selected = useSyncExternalStore(
    subscribeCategory,
    categorySnapshot,
    serverCategorySnapshot,
  );
  const [query, setQuery] = useState("");
  const categories =
    mode === "games"
      ? ["All", "Roguelike RPG", "Card strategy", "Puzzle RPG", "Action RPG"]
      : mode === "updates"
        ? ["All", "Game updates", "App updates"]
        : ["All", "Games", "Apps", "Web"];
  const filter = categories.includes(selected) ? selected : "All";
  const setFilter = (category: string) => {
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}${category === "All" ? "" : `?category=${encodeURIComponent(category)}`}`,
    );
    window.dispatchEvent(new Event("f7:categorychange"));
  };
  const base =
    mode === "games"
      ? products.filter((p) => p.category === "Games")
      : products;
  const visibleProducts = filterCatalog(
    base,
    filter === "Web" ? "Web" : filter,
    query,
  );
  const visibleWeb =
    mode === "products" && (filter === "All" || filter === "Web")
      ? webProjects.filter((p) =>
          `${p.name} ${p.description}`
            .toLowerCase()
            .includes(query.trim().toLowerCase()),
        )
      : [];
  const visibleUpdates = updates.filter(
    (u) =>
      (filter === "All" || u.category === filter) &&
      `${u.title} ${u.summary} ${u.productSlug}`
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
  );
  const count =
    mode === "updates"
      ? visibleUpdates.length
      : visibleProducts.length + visibleWeb.length;
  const gameEntries = visibleProducts.filter((p) => p.category === "Games");
  const appEntries = visibleProducts.filter((p) => p.category === "Apps");

  return (
    <div className="container catalog">
      <Suspense fallback={null}>
        <CategoryRouteSync />
      </Suspense>
      <div className="catalog-toolbar">
        <div className="filter-list" aria-label="Filter catalogue">
          {categories.map((category) => (
            <button
              className={`filter-button${filter === category ? " selected" : ""}`}
              key={category}
              aria-pressed={filter === category}
              onClick={() => setFilter(category)}
            >
              {category === "All"
                ? mode === "games"
                  ? "All games"
                  : mode === "updates"
                    ? "All updates"
                    : "All products"
                : category}
            </button>
          ))}
        </div>
        <div className="search-field">
          <MagnifyingGlassIcon size={19} />
          <label className="sr-only" htmlFor="catalog-search">
            Search {mode}
          </label>
          <input
            id="catalog-search"
            type="search"
            placeholder={`Search ${mode}...`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button onClick={() => setQuery("")} aria-label="Clear search">
              <XIcon size={16} />
            </button>
          )}
        </div>
      </div>
      <p className="result-count" role="status" aria-live="polite">
        {count}{" "}
        {mode === "updates"
          ? count === 1
            ? "update"
            : "updates"
          : count === 1
            ? "product"
            : "products"}
        {query && <> matching “{query}”</>}
      </p>
      {count === 0 ? (
        <div className="empty-state">
          <GameControllerIcon size={48} weight="light" />
          <h2>No matches this time.</h2>
          <p>Try another search or explore the full catalogue.</p>
          <button
            className="button button-primary"
            onClick={() => {
              setQuery("");
              setFilter("All");
            }}
          >
            Clear filters
          </button>
        </div>
      ) : mode === "updates" ? (
        <div className="updates-grid">
          {visibleUpdates.map((update) => (
            <UpdateCard key={update.slug} update={update} />
          ))}
        </div>
      ) : (
        <>
          {gameEntries.length > 0 && (
            <div className="catalog-group">
              {mode === "products" && filter === "All" && <h2>Games</h2>}
              <div className="games-grid">
                {gameEntries.map((product) => (
                  <GameCard key={product.slug} product={product} />
                ))}
              </div>
            </div>
          )}
          {appEntries.length > 0 && (
            <div className="catalog-group">
              {filter === "All" && <h2>Apps & Tools</h2>}
              <div className="apps-grid">
                {appEntries.map((product) => (
                  <AppCard key={product.slug} product={product} />
                ))}
              </div>
            </div>
          )}
          {visibleWeb.length > 0 && (
            <div className="catalog-group">
              {filter === "All" && <h2>Web Projects</h2>}
              {visibleWeb.length === webProjects.length ? (
                <WebProjects />
              ) : (
                <div className="web-search-results">
                  {visibleWeb.map((project) => (
                    <a
                      key={project.slug}
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <h3>{project.name}</h3>
                      <p>{project.description}</p>
                      <span className="text-link">Visit website ↗</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export function CatalogLoading() {
  return (
    <div
      className="container catalog-skeleton"
      aria-label="Loading catalogue"
      role="status"
    >
      <div />
      <div />
      <div />
    </div>
  );
}
