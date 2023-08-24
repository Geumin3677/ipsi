/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};


self.addEventListener("push", event => {
  const title = event.data.text();
  event.waitUntill(self.ServiceWorkerRegistration.showNotification(title));
});
/******/ })()
;