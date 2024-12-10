import fit from './fit.js';

const buildUrl = "Build";
const loaderUrl = buildUrl + "/Avatar_Demo_Ver6.loader.js";

const config = {
  dataUrl: buildUrl + "/Avatar_Demo_Ver6.data.unityweb",
  frameworkUrl: buildUrl + "/Avatar_Demo_Ver6.framework.js.unityweb",
  codeUrl: buildUrl + "/Avatar_Demo_Ver6.wasm.unityweb",
  streamingAssetsUrl: "StreamingAssets",
  companyName: "NeuraGames",
  productName: "Avatar",
  productVersion: "1.0",
};

const container = document.querySelector("#unity-container");
const canvas = document.querySelector("#unity-canvas");
const progressBarFill = document.querySelector("#progress-bar-fill");
const canvasOverlay = document.querySelector("#canvas-overlay");
const progressPercentage = document.querySelector("#progress-percentage");
const productVersionElement = document.querySelector("#product-version");

let myGameInstance = null;
let scaleToFit;

try {
  scaleToFit = !!JSON.parse("true");
} catch (e) {
  scaleToFit = false;
}

let fitGameScreen = () => {
  if (scaleToFit == true)
    fit(container, 820, 2340, 1080, 1080);
};

window.addEventListener('resize', fitGameScreen);

const script = document.createElement("script");
script.src = loaderUrl;
script.onload = () => {

  if (productVersionElement) {
    productVersionElement.textContent = `v ${config.productVersion}`;
  }

  createUnityInstance(canvas, config, (progress) => {
    const percentage = Math.round(100 * progress);
    progressBarFill.style.width = `${percentage}%`;
    progressPercentage.textContent = `${percentage}%`;

    if (scaleToFit == true)
      fitGameScreen();
  }).then((unityInstance) => {
    myGameInstance = unityInstance;
    progressBarFill.style.width = '100%';
    progressPercentage.textContent = '100%';
    canvasOverlay.style.display = "none";
    document.documentElement.style.background = "#000";
    document.body.style.background = "#000";
  }).catch((message) => {
    alert(message);
  });
};
document.body.appendChild(script);
