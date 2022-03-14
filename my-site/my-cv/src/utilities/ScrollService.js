import { TOTAL_SCREENS } from "./commonUtils";
import { Subject } from "rxjs";

export default class ScrollService {
  static scrollHandler = new ScrollService();

  static currentScreenBroudCaster = new Subject();
  static currentScreenFadeIn = new Subject();

  constructor() {
    window.addEventListener("scroll", this.checkCurrentScreenUnderViewport);
  }

  scrollToHireMe = () => {
    let ccontactMeScreen = document.getElementById("Contact Me");
    if (!ccontactMeScreen) return;
    ccontactMeScreen.scrollIntoView({ behavior: "smooth" });
  };
  scrollToHome = () => {
    let homeScreen = document.getElementById("Home");
    if (!homeScreen) return;
    homeScreen.scrollIntoView({ behavior: "smooth" });
  };
  isElementInView = (elem, type) => {
    let rec = elem.getBoundingClientRect();
    let elementTop = rec.top;
    let elementButton = rec.Button;

    let partiallyVisible =
      elementTop < window.innerHeight && elementButton >= 0;
    let completelyVisible =
      elementTop >= 0 && elementButton <= window.innerHeight;

    switch (type) {
      case "partial":
        return partiallyVisible;
      case "complete":
        return completelyVisible;
      default:
        return false;
    }
  };
  checkCurrentScreenUnderViewport = (event) => {
    if (!event || Object.keys(event).length < 1) {
      return;
    }
    for (let screen of TOTAL_SCREENS) {
      let screenFromDOM = document.getElementById(screen.screen_name);
      if (!screenFromDOM) continue;

      let fullyVisible = this.isElementInView(screenFromDOM, "complete");

      let partialVisible = this.isElementInView(screenFromDOM, "partial");
      if (fullyVisible || partialVisible) {
        if (partialVisible && !screen.alreadyRendered) {
          ScrollService.currentScreenFadeIn.next({
            fadeInScreen: screen.screen_name,
          });
          screen["alreadyRendered"] = true;
          break;
        }
        if (fullyVisible) {
          ScrollService.currentScreenBroudCaster.next({
            screenInView: screen.screen_name,
          });
          break;
        }
      }
    }
  };
}
