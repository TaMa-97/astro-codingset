![View Transitions](/public/assets/img/demo.gif)

## 環境情報

- **言語** : `TypeScript`
- **UIライブラリ** : `Astro v3.2.3`
- **スタイリング** : `Sass v1.69.0`
- **リンター** : `ESLint v8.50.0`
- **フォーマッター** : `Prettier v3.0.3`

## ディレクトリ構造

```
astro-codingset/
│ .browserslistrc # 対応ブラウザの設定
│ .editorconfig # エディタの設定
│ .eslintignore # ESLintが無視するファイル・ディレクトリ
│ .eslintrc.cjs # ESLintの設定ファイル
│ .gitignore # Gitが無視するファイル・ディレクトリ
│ .prettierignore # Prettierが無視するファイル・ディレクトリ
│ .prettierrc.json # Prettierの設定ファイル
│ astro.config.mjs # Astroの設定ファイル
│ package-lock.json # パッケージのバージョン情報
│ package.json # プロジェクトの依存関係とスクリプトの定義
│ postcss.config.cjs # PostCSSの設定ファイル
│ README.md # このファイル
│ stylelint.config.cjs # Stylelintの設定ファイル
│ tsconfig.json # TypeScriptのコンパイラ設定ファイル
│
├─.vscode # VSCodeの設定ファイル群
│ extensions.json # 推奨拡張機能リスト
│ launch.json # デバッグ設定
│ settings.json # VSCodeのワークスペース設定
│
├─public # 静的ファイル(favicon,OGPなど)
│
└─src
├── components # コンポーネント群
│ ├── elements
│ ├── layouts
│ └── pages
│ ├── under
│ │ ├── under02 # 下層第二階層
│ │ └── index # 下層第一階層
│ └── top # TOP
├── layouts # プロジェクト共通レイアウト群
│ ├── common
│ │ ├── AnalyticsBody.astro
│ │ ├── AnalyticsHead.astro
│ │ ├── DesignToken.astro
│ │ └── Variables.astro
│ └── BaseLayout.astro
├── pages # ルーティング制御
│ ├── under
│ │ ├── under02
│ │ │ └── index.astro # 下層第二階層
│ │ └── index.astro # 下層第一階層
│ └── index.astro # TOP
├── scripts # スクリプトファイル群
│ ├── global # プロジェクト共通スクリプト
│ └── utils # プロジェクト汎用スクリプト
└─styles # スタイルシート群
├─foundation # 初期設定
│ base.scss # プロジェクト共通スタイル
│ reset.scss # スタイルリセット
└─global # プロジェクト共通関数/変数
├── easing.scss # easing変数
├── mixin.scss # mixin定義
└── variables.scss # プロジェクト共通変数
```

## コマンド

| Command                          | Action                   |
| :------------------------------- | :----------------------- |
| `npm install`                    | 依存関係インストール     |
| `npm run dev` or `npm run start` | ローカル開発サーバー起動 |
| `npm run build`                  | 本番用にビルド           |
| `npm run preview`                | ビルド後プレビュー       |

## フォーマッター

- **[Prettier]** : `src`ディレクトリ内の全てのファイルが適切にフォーマットされているかをチェック

  - `npm run lint:prettier`

- **[Prettier]** : `src`ディレクトリ内の全てのファイルをフォーマット
  - `npm run fix:prettier`

## リンター

- **[Stylelint]** : `.astro`、`.css`、`.scss`の拡張子を持つスタイルの問題検出

  - `npm run lint:stylelint`

- **[Stylelint]** : `.astro`、`.css`、`.scss`の拡張子を持つスタイルの問題検出及び自動修正

  - `npm run fix:stylelint`

- **[ESLint]** : `.astro`、`.ts`、`.js`の拡張子を持つスクリプトの問題検出

  - `npm run lint:eslint`

- **[ESLint]** : `.astro`、`.ts`、`.js`の拡張子を持つスクリプトの問題検出及び自動修正
  - `npm run fix:eslint`

## 利用するメリット

- モジュールバンドラとしてViteを利用しているのでホットリロードが高速
- ビルド時に不要なJSを剥がすのでパフォーマンス向上
- ファイル保存時の自動フォーマット
- View Transitionsによるページ遷移アニメーションが容易に実装できる
- コンポーネントベースの開発（UIを再利用可能なコンポーネントに分割して管理できる）
- ライブラリの互換性（React、Vue、Svelte等のコンポーネントを再利用できる）

など
