/**
 * @class Form
 * @description フォームをサブミットした時の処理
 */
class Form {
  private formElements: NodeListOf<HTMLFormElement>;
  private loaderElement: HTMLElement | null;

  constructor() {
    this.formElements = document.querySelectorAll("form");
    this.loaderElement = document.querySelector(".modLoading");
    this.addEventHandlers();
  }

  /**
   * @method addEventHandlers
   * @description イベントハンドラ
   */
  private addEventHandlers(): void {
    if (this.formElements.length > 0) {
      for (let i = 0; i < this.formElements.length; i++) {
        this.formElements[i].addEventListener("submit", () =>
          this.showLoadingScreen(),
        );
      }
    }
    this.handlePageCache();
  }

  /**
   * @method showLoadingScreen
   * @description ローディング画面表示
   */
  private showLoadingScreen(): void {
    if (this.loaderElement !== null) {
      this.loaderElement.remove();
    }

    const loadingElement = document.createElement("div");
    const bodyElement = document.querySelector("body");
    loadingElement.className = "modLoading";
    loadingElement.innerHTML = '<div class="modLoading__inner"></div';

    if (bodyElement !== null) {
      bodyElement.appendChild(loadingElement);
    }
  }

  /**
   * @method handlePageCache
   * @description Back Forward Cache 対策
   */
  private handlePageCache(): void {
    window.onpageshow = (ev) => {
      if (ev.persisted) {
        this.loaderElement = document.querySelector(".modLoading");
        if (this.loaderElement !== null) {
          window.location.reload();
        }
      }
    };
  }
}

export default Form;
