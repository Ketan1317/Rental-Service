import { useState } from "react";

const App = () => {
  const [status, setStatus] = useState("");

  const subscribeToPush = async () => {
    try {
      if (!("serviceWorker" in navigator)) {
        setStatus("Service workers not supported");
        return;
      }

      // Register service worker
      const registration = await navigator.serviceWorker.register("/sw.js");

      // Subscribe
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: import.meta.env.VITE_VAPID_PUBLIC_KEY,
      });

      // Send subscription to backend
      await fetch("http://localhost:5000/api/push/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: "Bearer YOUR_JWT"  // add if protected
        },
        body: JSON.stringify(subscription),
      });

      setStatus("✅ Push subscribed successfully");
      console.log("Subscription:", subscription);
    } catch (err) {
      console.error(err);
      setStatus("❌ Push subscription failed");
    }
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>Push Notification Test</h2>

      <button onClick={subscribeToPush}>
        Enable Push Notifications
      </button>

      <p>{status}</p>
    </div>
  );
};

export default App;
