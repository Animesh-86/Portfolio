/**
 * Simple analytics utility to track user interactions for recruitment conversion.
 * In a production environment, this would send data to Mixpanel, Google Analytics, or a custom backend.
 */

export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  const timestamp = new Date().toISOString();
  console.log(`[Analytics] Tracked: "${eventName}"`, {
    ...properties,
    timestamp,
    userAgent: navigator.userAgent,
    url: window.location.href
  });

  // Mocking an API call to a tracking server
  // fetch('/api/track', { method: 'POST', body: JSON.stringify({ eventName, properties, timestamp }) });
};
