self.addEventListener("push", (event) => {
  if (!event.data) return;

  const data = event.data.json();

  event.waitUntil(
    self.registration.showNotification(data.title || "Test Notification", {
      body: data.body || "Push received successfully",
      icon: "/icon.png",
    })
  );
});
