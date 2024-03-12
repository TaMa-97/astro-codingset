/**!
 * @class Accordion
 * @description アコーディオン処理
# astro
  <button type="button" aria-expanded="false" aria-controls="target" data-acc="btn">ボタン</button>
  <div id="target" class="myAcc" aria-hidden="true" data-acc="contents">
  テキストが入ります。
  </div>

  <script>
    import Accordion from '../scripts/components/Accordion';
    new Accordion('[data-acc="btn"]');
  </script>

  [data-acc="btn"]：ボタンの指定
  [aria-controls]にアコーディオンの中身のidを指定する

# scss
  [data-acc="contents"] {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease-in-out;
  }
 */

class Accordion {
  /**
   * @constructor
   * @param {string} toggleSelector - クリックする要素のセレクタ
   */
  constructor(private toggleSelector: string) {
    this.toggleElements = document.querySelectorAll<HTMLElement>(
      this.toggleSelector,
    );
    this.bindEvents();
  }

  /**
   * @property {NodeListOf<HTMLElement>} toggleElements - アコーディオンのトグル要素のリスト
   */
  private toggleElements: NodeListOf<HTMLElement>;

  /**
   * @method bindEvents
   * @description イベントをトグル要素にバインド
   */
  private bindEvents(): void {
    this.toggleElements.forEach((toggle) => {
      toggle.addEventListener("click", (event) => this.onToggleClick(event));
    });
  }

  /**
   * @method onToggleClick
   * @description トグル要素がクリックされたときの処理
   * @param {Event} event - クリックイベントオブジェクト
   */
  private onToggleClick(event: Event): void {
    const toggle = event.currentTarget as HTMLElement;
    const content = document.querySelector<HTMLElement>(
      `#${toggle.getAttribute("aria-controls")}`,
    );

    if (content) {
      if (content.style.maxHeight) {
        content.style.maxHeight = null;
        toggle.setAttribute("aria-expanded", "false");
        content.setAttribute("aria-hidden", "true");
      } else {
        content.style.maxHeight = `${content.scrollHeight}px`;
        toggle.setAttribute("aria-expanded", "true");
        content.setAttribute("aria-hidden", "false");
      }
    }
  }
}

export default Accordion;
