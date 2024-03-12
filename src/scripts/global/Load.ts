/**
 * @class Load
 * @description ページ読み込み時の処理
 */
class Load {
  constructor() {
    this.addEventHandlers();
  }

  /**
   * @method addEventHandlers
   * @description イベントハンドラ
   */
  private addEventHandlers(): void {
    window.addEventListener("load", () => this.handleLoadEvent(), {
      passive: true,
    });
  }

  /**
   * @method handleLoadEvent
   * @description ページが完全に読み込まれたときの処理
   */
  private handleLoadEvent(): void {
    document.body.classList.add("loadEvent");
  }
}

export default Load;
