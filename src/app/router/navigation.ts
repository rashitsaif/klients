export const APP_NAVIGATION_EVENT = 'app:navigation';

export function navigateToPath(path: string) {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new Event(APP_NAVIGATION_EVENT));
}
