## 👀 Astro + View Transitions Demo

![View Transitions](/public/assets/demo.gif)

## 環境情報

- **言語** : `TypeScript`
- **フレームワーク** : `Astro v3`
- **スタイリング** : `Sass`
- **リンター** : `ESLint`, `Stylelint`
- **フォーマッター** : `Prettier`
- **ポストプロセッサー** : `PostCSS`

## ディレクトリ構造

```
astro-codingset/
├─public                               # 静的ファイル(favicon,OGPなど)
└─src
├── components                         # コンポーネント群
│ ├── elements
│ ├── layouts
│ └── pages
│ ├── under
│ │ ├── under                          # 下層第二階層
│ │ └── index                          # 下層第一階層
│ └── top                              # TOP
├── layouts                            # プロジェクト共通レイアウト群
│ ├── common
│ │ ├── AnalyticsBody.astro
│ │ ├── AnalyticsHead.astro
│ │ ├── DesignToken.astro
│ │ └── Variables.astro
│ └── BaseLayout.astro
├── pages                              # ルーティング
│ ├── under
│ │ ├── under
│ │ │ └── index.astro                  # 下層第二階層
│ │ └── index.astro                    # 下層第一階層
│ └── index.astro                      # TOP
├── scripts                            # スクリプトファイル群
│ ├── global                           # 共通スクリプト
│ └── utils                            # 汎用スクリプト
└── styles                             # スタイルシート群
  ├── foundation                       # 初期設定
  │ ├── base.scss                      # スタイルベース
  │ └── reset.scss                     # スタイルリセット
  └── global                           # 共通関数/変数
    ├── easing.scss                    # easing変数
    ├── mixin.scss                     # mixin定義
    └── variables.scss                 # 共通変数
```

## コマンド一覧

| Command                          | Action                                                                                         |
| :------------------------------- | :--------------------------------------------------------------------------------------------- |
| `npm install`                    | 依存関係インストール                                                                           |
| `npm run dev` or `npm run start` | ローカル開発サーバー起動                                                                       |
| `npm run build`                  | 本番用にビルド                                                                                 |
| `npm run preview`                | ビルド後プレビュー                                                                             |
| `npm run lint:prettier`          | **[Prettier]** : `src`ディレクトリ内の全てのファイルが適切にフォーマットされているかをチェック |
| `npm run fix:prettier`           | **[Prettier]** : `src`ディレクトリ内の全てのファイルをフォーマット                             |
| `npm run lint:stylelint`         | **[Stylelint]** : `.astro`、`.css`、`.scss`の拡張子を持つスタイルの問題検出                    |
| `npm run fix:stylelint`          | **[Stylelint]** : `.astro`、`.css`、`.scss`の拡張子を持つスタイルの問題検出及び自動修正        |
| `npm run lint:eslint`            | **[ESLint]** : `.astro`、`.ts`、`.js`の拡張子を持つスクリプトの問題検出                        |
| `npm run fix:eslint`             | **[ESLint]** : `.astro`、`.ts`、`.js`の拡張子を持つスクリプトの問題検出及び自動修正            |
