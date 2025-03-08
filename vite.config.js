import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
// import htmlMinify from 'vite-plugin-html-minify';
// import htmlInject from 'vite-plugin-html-inject';
import { createHtmlPlugin } from 'vite-plugin-html';
import { readFileSync } from 'fs';

export default defineConfig({
	build: {
		outDir: 'dist',
		emptyOutDir: true,
		cssCodeSplit: false,
	},
	// Добавьте эти настройки для сервера
	server: {
		host: '0.0.0.0', // Позволяет подключаться с любого IP
		port: 5173      // Порт (можно оставить по умолчанию)
	},
	css: {
		preprocessorOptions: {
			scss: {
				// настройки SCSS
			}
		}
	},
	plugins: [

		// Минификация HTML
    // htmlMinify({
		// 	minify: true,
    //   removeComments: false,
    //   collapseWhitespace: true,
    //   removeRedundantAttributes: true,
    //   removeScriptTypeAttributes: true,
    //   removeStyleLinkTypeAttributes: true,
    //   sortClassName: true,
    //   useShortDoctype: true,
    //   minifyCSS: true,
    //   keepClosingSlash: true
		// }),
		
		createHtmlPlugin({
      minify: false,
      inject: {
        data: {
          header: readFileSync('src/components/header/header.html', 'utf8')
        }
      }
    }),
    // Копирование статических файлов
    viteStaticCopy({
      targets: [
        {
					// src: 'src/**/*.html',
					src: 'src/*.html', // Теперь копируем только HTML файлы из корня src
          dest: './'
        },
        {
          src: 'src/fonts/**/*',
          dest: './fonts/'
        },
        {
          // Просто копирование изображений без оптимизации
          src: 'src/images/**/*.{jpg,png,svg,gif,ico,webp,avif}',
          dest: './images/'
        },
        {
          // Копирование видео файлов
          src: 'src/videos/**/*.{mp4,webm,ogg}',
          dest: './videos/'
        }
      ],
      // Добавим эту опцию для игнорирования ошибок
      silent: true
    })
  ],
  publicDir: 'public',
});