import Raven from "raven-js";

function init() {
  Raven.config("https://1d4812670e2349daa2b176038f621b47@sentry.io/1326758", {
    release: "0-0-0",
    environment: "development-test"
  }).install();
}

function log(error) {
  Raven.captureException("Logging the error", error);
}

export default {
  init,
  log
};
