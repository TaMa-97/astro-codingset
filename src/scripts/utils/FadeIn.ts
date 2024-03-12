import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * @class FadeIn
 * @description フェードイン処理
 */
class FadeIn {
  constructor() {
    gsap.registerPlugin(ScrollTrigger);
    this.addEventHandlers();
  }

  /**
   * @method addEventHandlers
   * @description イベントハンドラ
   */
  private addEventHandlers(): void {
    document.addEventListener("DOMContentLoaded", () => {
      const elements = document.querySelectorAll("[data-fadein]");
      elements.forEach((element) => {
        element.style.visibility = "hidden";
        this.fadeIn(element);
      });
    });
  }

  /**
   * @method fadeIn
   * @description 要素をフェードインさせる処理
   * @param {Element} element - フェードインさせる要素
   */
  private fadeIn(element: Element): void {
    gsap.from(element, {
      autoAlpha: 0,
      y: 35,
      duration: 0.5,
      ease: "power1.out",
      scrollTrigger: {
        trigger: element,
        start: "top center+=18%",
        // アニメーション開始時
        onEnter: () => (element.style.visibility = "visible"),
      },
    });
  }
}

export default FadeIn;
