module.exports = {
  plugins: [
    require('postcss-import')(),
    require('postcss-nesting')(),
    require('postcss-normalize')(),
    require('postcss-preset-env')({ stage: 4, browsers: ['last 2 versions', '> 5%'] }),
  ],
};
