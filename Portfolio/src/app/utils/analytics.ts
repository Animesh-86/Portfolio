export type EventName = 
  | 'resume_download_click'
  | 'project_view'
  | 'contact_form_submit'
  | 'social_link_click'
  | 'section_view';

export function trackEvent(eventName: EventName, properties?: Record<string, any>) {
  // In production, you would replace this with your actual analytics provider
  // (e.g., Vercel Analytics, Google Analytics, Mixpanel)
  
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Analytics] Event: ${eventName}`, properties);
  }

  // Example for Vercel Analytics (if you decide to use it)
  // if (typeof window !== 'undefined' && (window as any).va) {
  //   (window as any).va.track(eventName, properties);
  // }
}
