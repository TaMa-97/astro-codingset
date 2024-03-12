/**
 * @class Version
 * @description デバイス情報を判定する処理
 */
class Version {
  private $selecter: HTMLBodyElement | null;
  private $ua: string;
  private $brand: string;
  private $platform: string;
  private $os: string;
  private $browser: string;
  private $sPhone: boolean;

  constructor() {
    this.$selecter = document.querySelector("body");
    this.$ua = window.navigator.userAgent.toLowerCase();
    this.$brand = "";
    this.$platform = "";
    this.$os = "";
    this.$browser = "";
    this.$sPhone = false;
    this.handleSetting();
  }

  /**!
   * UA取得
   */
  private handleSetting() {
    if ("userAgentData" in window.navigator) {
      // userAgentData対応
      this.$ua = navigator.userAgentData;

      if (this.$ua.brands.length) {
        this.$brand = this.$ua.brands[0].brand;
        this.$sPhone = this.$ua.mobile;

        if (this.$brand.match(/Not A;Brand/))
          this.$brand = this.$ua.brands[1].brand; // 1番目にブラウザ名がない場合

        this.$ua
          .getHighEntropyValues([
            "architecture",
            "model",
            "platform",
            "platformVersion",
            "uaFullVersion",
          ])
          .then((highEntropyValues) => {
            this.$platform = highEntropyValues.platform;
            this.handleJudge();
          });
      } else {
        // Chromeの検証ツールでSP（iphone・ipadやAndroid系）だと値が取得できないので分岐
        // 実機だと問題ない
        this.$ua = window.navigator.userAgent.toLowerCase();

        this.$brand = this.$ua;
        this.$platform = this.$ua;

        if (this.$ua.match(/mobile/i)) this.$sPhone = true;

        this.handleJudge();
      }
    } else {
      // userAgentData未対応
      this.$brand = this.$ua;
      this.$platform = this.$ua;

      if (this.$ua.match(/mobile/i)) this.$sPhone = true;

      this.handleJudge();
    }
  }

  /**!
   * OS、端末判定
   */
  private handleJudge() {
    // OS判定
    this.$platform.match(/win(dows)/i)
      ? (this.$os = "win")
      : this.$platform.match(/mac|ppc/i) &&
        !this.$platform.match(/iphone|ipod|ipad/i)
      ? (this.$os = "mac")
      : false;

    this.$platform.match(/iphone/i)
      ? (this.$os = "iphone")
      : this.$platform.match(/ipad/i) ||
        (this.$platform.match(/macintosh/i) && "ontouchend" in document)
      ? (this.$os = "ipad")
      : this.$platform.match(/android/i)
      ? this.$sPhone
        ? (this.$os = "androidSp")
        : (this.$os = "androidTab")
      : false;

    // ブラウザ判定
    this.$brand.match(/msie/i) || this.$brand.match(/trident/i)
      ? (this.$browser = "IE")
      : this.$brand.match(/edge|edg/i)
      ? (this.$browser = "edge")
      : this.$brand.match(/chrom/i)
      ? (this.$browser = "chrome")
      : this.$brand.match(/safari/i)
      ? this.$brand.match(/crios/i)
        ? (this.$browser = "chrome")
        : this.$brand.match(/fxios/i)
        ? (this.$browser = "firefox")
        : (this.$browser = "safari")
      : this.$brand.match(/firefox/i)
      ? (this.$browser = "firefox")
      : this.$brand.match(/opera/i)
      ? (this.$browser = "opera")
      : false;

    if (this.$os == "ipad") this.$sPhone = false;

    this.handleAddClass();
  }

  /**!
   * bodyにclass追加
   */
  private handleAddClass() {
    const $array = [
      {
        if: this.$browser === "IE",
        className: this.$browser,
      },
      {
        if: this.$browser === "edge",
        className: this.$browser,
      },
      {
        if: this.$browser === "firefox",
        className: this.$browser,
      },
      {
        if: this.$browser === "safari",
        className: this.$browser,
      },
      {
        if: this.$sPhone,
        className: "sPhone",
      },
    ];

    if (this.$selecter !== null) {
      $array.forEach((val) =>
        val.if ? this.$selecter!.classList.add(val.className) : false,
      );
    }
  }
}

export default Version;
