"use client";

import { v4 as uuidv4 } from 'uuid';

function getOrCreateSessionId(): string {
  let sessionId = localStorage.getItem('sessionId');
  if (!sessionId) {
    sessionId = uuidv4();
    localStorage.setItem('sessionId', sessionId);
  }
  return sessionId;
}

export async function trackPageView(path: string) {
  try {
    const sessionId = getOrCreateSessionId();
    const response = await fetch("/api/track", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ path, sessionId }),
    });

    if (!response.ok) {
      console.error(`Failed to track page view: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.error("Failed to track page view:", error);
  }
}