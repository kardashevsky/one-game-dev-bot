import { apiRequest } from './api.js';

export function initializeWebApp() {
  if (window.Telegram?.WebApp) {
    const webApp = window.Telegram.WebApp;
    webApp.ready();
    const webAppData = getWebAppData();

    apiRequest('/user/createorget', 'POST', webAppData)
      .then(response => {
        console.log('Ответ от сервера:', response);
      })
      .catch(error => {
        console.error('Ошибка при отправке запроса:', error);
      });
  } else {
    console.warn("Telegram WebApp is not available.");
    alert("Telegram WebApp is not available.");
  }
}

function getWebAppData() {
  if (!window.Telegram?.WebApp) {
    return { error: "Telegram WebApp API is not available." };
  }

  const webApp = Telegram.WebApp;

  return {
    initData: webApp.initData || null,
  };
}
