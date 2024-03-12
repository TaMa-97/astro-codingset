import $ from "jquery";
import "jquery.easing";

/**
 * @class Link
 * @description アンカーをクリックした時の処理
 * （ヘッダー固定の場合は追記 new Link(true);）
 */
class Link {
  /**
   * @constructor
   * @param {boolean} headerFixedF - ヘッダーが固定されているかどうかを示すフラグ
   */
  constructor(private headerFixedF: boolean) {
    this.eventHandler(this.headerFixedF);
  }

  /**
   * @method eventHandler
   * @description イベントハンドラ
   * @param {boolean} headerFixedF - ヘッダーが固定されているかどうかを示すフラグ
   */
  eventHandler(headerFixedF: boolean): void {
    // ヘッダー固定の場合、ヘッダーの高さ分アンカーリンクでの移動位置をずらす
    const headerH = headerFixedF ? $("#header").innerHeight() : 0;

    // アンカーリンクをクリック
    $('[href^="#"][href!="#"]').on("click", (ev: $.Event) => {
      ev.preventDefault();
      const $this = $(ev.currentTarget);
      this.scrollFunc(ev, false, headerH, `${$this.attr("href")}`);
    });

    // ページトップをクリック
    $("[data-pagetop]").on("click", (ev: $.Event) =>
      this.scrollFunc(ev, true, headerH, ""),
    );
    window.addEventListener(
      "load",
      () => {
        this.blankAddEvents();
        this.pageTopScrollEvents();
        this.hashEvents(headerH);
      },
      { passive: true },
    );
    window.addEventListener("scroll", () => this.pageTopScrollEvents(), {
      passive: true,
    });
  }

  /**
   * @method scrollFunc
   * @description 指定位置にスクロールする
   * @param {$.Event} ev - イベントオブジェクト
   * @param {boolean} top - ページトップにスクロールするかどうかを示すフラグ
   * @param {number} headH - ヘッダーの高さ
   * @param {string} href - アンカーリンクのhref属性値
   */
  scrollFunc(ev: $.Event, top: boolean, headH: number, href: string): void {
    if (top) {
      // ページトップの場合
      $("html,body")
        .scrollTop(800)
        .stop()
        .animate({ scrollTop: 0 }, "slow", "easeOutQuart");
    } else {
      // アンカーリンクの場合
      const target = $(`${href}`);
      if (target.length) {
        $("html,body").animate(
          {
            scrollTop: target.offset().top - headH,
          },
          "slow",
          "easeOutQuart",
        );
      }
    }
  }

  /**
   * @method hashEvents
   * @description ハッシュ付きURLで読み込まれた時の処理
   * @param {number} headerH - ヘッダーの高さ
   */
  hashEvents(headerH: number): void {
    const myHash = location.hash;
    this.scrollFunc(new $.Event("hash"), false, headerH, myHash);
  }

  /**
   * @method blankAddEvents
   * @description target="_blank"が付与されたリンクに「rel="noopener"」を追加する
   */
  blankAddEvents(): void {
    const $el = document.querySelectorAll('[href^="http"][target="_blank"]');
    if ($el.length > 0) {
      for (let i = 0; i < $el.length; i++) {
        $el[i].setAttribute("rel", "noopener");
      }
    }
  }

  /**
   * @method pageTopScrollEvents
   * @description 100px以上スクロールするとdata-pagetopを表示（aria-hiddenをfalseに）する処理
   * （表示・非表示はcssで対応）
   */
  pageTopScrollEvents(): void {
    const $el = document.querySelector("[data-pagetop]");
    const $flag = window.pageYOffset > 100;
    if ($el !== null) {
      $el.setAttribute("aria-hidden", `${!$flag}`);
    }
  }
}

export default Link;
