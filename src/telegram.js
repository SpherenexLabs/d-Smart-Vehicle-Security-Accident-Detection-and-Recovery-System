// ⚠️ NOTE: Bot token is embedded in client-side code — keep this project private / non-public.
const BOT_TOKEN = "8653510761:AAGXRmxSkr7ePumtzA4tcakWhXfFrkqsclc";

// Chat IDs — add more real chat IDs below when ready
export const CHAT_IDS = [
  "6333513741",   // Your chat ID
  // "ADD_CHAT_ID_2_HERE",
  // "ADD_CHAT_ID_3_HERE",
  // "ADD_CHAT_ID_4_HERE",
];

/**
 * Send a Telegram HTML text message to all chat IDs.
 */
export async function sendTelegramAlert(text) {
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
  await Promise.all(
    CHAT_IDS.map((chat_id) =>
      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id, text, parse_mode: "HTML" }),
      }).catch((err) => console.error(`Telegram text failed for ${chat_id}:`, err))
    )
  );
}

/**
 * Send a native Telegram location pin (shows map directly in chat).
 * Only called when lat/lng are available.
 */
export async function sendTelegramLocation(lat, lng) {
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendLocation`;
  await Promise.all(
    CHAT_IDS.map((chat_id) =>
      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id, latitude: lat, longitude: lng }),
      }).catch((err) => console.error(`Telegram location failed for ${chat_id}:`, err))
    )
  );
}

/**
 * Build a clickable Google Maps HTML link for Telegram (HTML parse_mode).
 */
export function buildMapLink(location) {
  if (!location) return "📍 Location not available yet";
  const url = `https://www.google.com/maps?q=${location.lat},${location.lng}`;
  return `<a href="${url}">📍 Open in Google Maps</a>`;
}
