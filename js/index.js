import { initializeWebApp } from './webApp.js';
import initializeLoadingPageContent from './initializeLoadingPageContent.js';
import { responseMock } from './api.js';
import { setViewportForMobile } from './userAgent.js';

initializeLoadingPageContent(responseMock);
initializeWebApp();
setViewportForMobile();
