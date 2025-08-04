const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@/components': path.resolve(__dirname, 'src', 'shared', 'UI'),
      '@/entities': path.resolve(__dirname, 'src', 'entities'),
      '@/features': path.resolve(__dirname, 'src', 'features'),
      '@/shared': path.resolve(__dirname, 'src', 'shared'),
      '@/api': path.resolve(__dirname, 'src', 'shared', 'api'),
      '@/config': path.resolve(__dirname, 'src', 'shared', 'config'),
      '@/constants': path.resolve(__dirname, 'src', 'shared', 'constants'),
      '@/store': path.resolve(__dirname, 'src', 'store.ts'),
      '@/utils': path.resolve(__dirname, 'src', 'utils'),
      '@/helpers': path.resolve(__dirname, 'src', 'helpers'),
      '@/themes': path.resolve(__dirname, 'src', 'themes'),
      '@/styles': path.resolve(__dirname, 'src', 'styles.ts')
    }
  }
};
