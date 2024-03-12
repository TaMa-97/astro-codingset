module.exports = {
  plugins: [
    require("postcss-preset-env"),
    require("autoprefixer"), // プレフィックス付与
    require("postcss-sort-media-queries"), // メディアクエリをまとめる
  ],
};
