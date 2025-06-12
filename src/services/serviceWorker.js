// src/services/serviceWorker.js
export const registerServiceWorker = async () => {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js");
      console.log("Service Worker registered successfully:", registration);

      // Check for updates
      registration.addEventListener("updatefound", () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener("statechange", () => {
            if (
              newWorker.state === "installed" &&
              navigator.serviceWorker.controller
            ) {
              console.log("New content is available; please refresh.");
            }
          });
        }
      });

      return registration;
    } catch (error) {
      console.error("Service Worker registration failed:", error);
    }
  }
};

export const unregisterServiceWorker = async () => {
  if ("serviceWorker" in navigator) {
    try {
      const registrations = await navigator.serviceWorker.getRegistrations();
      for (const registration of registrations) {
        await registration.unregister();
      }
      console.log("Service Workers unregistered");
    } catch (error) {
      console.error("Service Worker unregistration failed:", error);
    }
  }
};
