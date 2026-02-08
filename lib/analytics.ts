"use client";

import { v4 as uuidv4 } from "uuid";

/**
 * Get the persistent session identifier, creating and storing a new UUID under "sessionId" if none exists.
 *
 * @returns The session identifier string stored under "sessionId", or an empty string when not running in a browser.
 */
function getOrCreateSessionId(): string {
  if (typeof window === "undefined") return "";
  const storedId = localStorage.getItem("sessionId");
  if (storedId) return storedId;

  const newId = uuidv4();
  localStorage.setItem("sessionId", newId);
  return newId;
}

/**
 * Record a page view for the given path and associate it with a persistent session identifier.
 *
 * Sends the path and the session identifier to the tracking service.
 *
 * @param path - The application route or URL path to record as the page view
 */
export async function trackPageView(path: string) {
  try {
    const sessionId = getOrCreateSessionId();
    const response = await fetch("/api/pageviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ path, sessionId }),
    });

    if (!response.ok) {
      console.error(
        `Failed to track page view: ${response.status} ${response.statusText}`,
      );
    }
  } catch (error) {
    console.error("Failed to track page view:", error);
  }
}
