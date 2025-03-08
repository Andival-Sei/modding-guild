export default {
  plugins: {
    'autoprefixer': {},
    'postcss-combine-media-query': {},
    'cssnano': {
      preset: [
        'default',
        {
          discardComments: {
            removeAll: true,
          },
        }
      ]
    }
  }
}