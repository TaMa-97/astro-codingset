/**
 * @class Tab
 * @description タブの処理
# astro
<div data-tab>
<button type="button" role="tab" aria-expanded="true" aria-controls="target">タブ1</button>
<button type="button" role="tab" aria-expanded="false" aria-controls="target2">タブ2</button>
<div id="target" role="tabpanel" aria-hidden="false">
タブ1コンテンツが入ります。
</div>
<div id="target2" role="tabpanel" aria-hidden="true">
タブ2コンテンツが入ります。
</div>
</div>

親要素に[data-tab]を付与
ボタンに[role="tab"]をつけて、開きたい要素に[role="tabpanel"]をつけます。

## ネスト構造の場合
<div data-tab>
<button type="button" role="tab" aria-expanded="true" aria-controls="target">タブ1</button>
<button type="button" role="tab" aria-expanded="false" aria-controls="target2">タブ2</button>
<div id="target" role="tabpanel" aria-hidden="false">
タブ1コンテンツが入ります。
<div data-tab>
<button type="button" role="tab" aria-expanded="true" aria-controls="target1_1">タブ1_1</button>
<button type="button" role="tab" aria-expanded="false" aria-controls="target1_2">タブ1_2</button>
<div id="target1_1" role="tabpanel" aria-hidden="false">
タブ1_1コンテンツが入ります。
</div>
<div id="target1_2" role="tabpanel" aria-hidden="true">
タブ1_2コンテンツが入ります。
</div>
</div>
</div>
<div id="target2" role="tabpanel" aria-hidden="true">
タブ2コンテンツが入ります。<br>（ネスト無し）
</div>
</div>

<script>
  import Tab from './module/Tab';
  new Tab();
</script>

new Tab({locationChange:true});
locationChangeをtrueにするとタブをクリックしたタイミングでURLも変更する（「https://xxxx.xx.xx/xxxxx/#target」になる）

 */
class Tab {
  private option: { locationChange: boolean };
  private selector: NodeListOf<Element>;
  private tab: Element[];
  private panel: Element[];

  /**
   * @constructor
   * @param {Object} option - オプションオブジェクト
   * @param {boolean} option.locationChange - アドレスバーを操作するかどうか
   */
  constructor(option = { locationChange: false }) {
    this.option = option;
    this.selector = document.querySelectorAll("[data-tab]");
    if (this.selector.length > 0) {
      for (let i = 0; i < this.selector.length; i++) {
        // イベント登録する（ネスト構造にも対応）
        const tempTab = [],
          tempPanel = [];
        const tabs = this.selector[i].querySelectorAll("[role='tab']");
        const panels = this.selector[i].querySelectorAll("[role='tabpanel']");
        for (let j = 0; j < tabs.length; j++) {
          if (this.selector[i] === tabs[j].closest("[data-tab]")) {
            tempTab.push(tabs[j]);
          }
        }
        for (let j = 0; j < panels.length; j++) {
          if (this.selector[i] === panels[j].closest("[data-tab]")) {
            tempPanel.push(panels[j]);
          }
        }
        this.tab = tempTab;
        this.panel = tempPanel;
        this.addEventHandlers(this.tab, this.panel);
      }
    }
  }

  /**
   * @method addEventHandlers
   * @description イベントハンドラを設定する
   * @param {Element[]} tab - タブ要素の配列
   * @param {Element[]} panel - パネル要素の配列
   */
  private addEventHandlers(tab: Element[], panel: Element[]): void {
    this.loadEvents();
    window.addEventListener("hashchange", () => this.loadEvents());
    for (let i = 0; i < tab.length; i++)
      tab[i].addEventListener("click", (ev) =>
        this.clickEvents(ev, tab, panel),
      );
  }

  /**
   * @method loadEvents
   * @description 対象がどのタブグループに存在するかチェックが必要
   */
  private loadEvents(): void {
    const hash = location.hash;
    const events = () => {
      const hashValue = hash.split("#")[1];

      if (this.selector.length > 0) {
        //タブグループが存在していたら
        const target = document.querySelectorAll(
          `[id="${hashValue}"][role="tabpanel"]`,
        );
        const targetBtn = document.querySelectorAll(
          `[aria-controls="${hashValue}"][role="tab"]`,
        );
        const targetAll = document.querySelectorAll(
          '[role="tabpanel"][aria-hidden="false"]',
        );
        const targetAllBtn = document.querySelectorAll(
          '[role="tab"][aria-expanded="true"]',
        );
        //すべてのタブ属性変更
        targetAll.forEach((elem) => {
          elem.setAttribute("aria-hidden", "true");
        });
        targetAllBtn.forEach((elem) => {
          elem.setAttribute("aria-expanded", "false");
        });
        //対象のタブ属性変更
        target.forEach((elem) => {
          elem.setAttribute("aria-hidden", "false");
        });
        targetBtn.forEach((elem) => {
          elem.setAttribute("aria-expanded", "true");
        });
      }
    };
    if (hash.length && document.querySelector(`[role="tabpanel"]${hash}`))
      events();
  }

  /**
   * @method clickEvents
   * @description タブがクリックされたときの処理
   * @param {Event} ev - イベントオブジェクト
   * @param {Element[]} tab - タブ要素の配列
   * @param {Element[]} panel - パネル要素の配列
   */
  private clickEvents(ev: Event, tab: Element[], panel: Element[]): void {
    ev.preventDefault();

    const currentTarget = ev.currentTarget as HTMLElement;
    const hash = currentTarget.getAttribute("aria-controls");
    const target = document.querySelector(`#${hash}`);

    for (let i = 0; i < tab.length; i++) {
      const el = tab[i];
      el.setAttribute("aria-expanded", "false");
    }
    for (let j = 0; j < panel.length; j++) {
      const el = panel[j];
      el.setAttribute("aria-hidden", "true");
    }
    currentTarget.setAttribute("aria-expanded", "true");
    target?.setAttribute("aria-hidden", "false");
    this.changeHash(hash);
  }

  /**
   * @method changeHash
   * @description ハッシュを変更する
   * @param {string} hash - 変更するハッシュ値
   */
  private changeHash(hash: string): void {
    this.option.locationChange &&
      window.history.pushState(null, null, `${location.pathname}#${hash}`);
  }
}

export default Tab;
