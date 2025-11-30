import { defineConfig } from 'vitepress';
import { search as ruSearch } from './ru';

export const TITLE = 'Azot API';
export const FAVICON = 'https://azot.so/favicon.svg';
export const DOMAIN = 'https://developers.azot.so/';
export const GITHUB = 'https://github.com/azot-labs/extensions';
export const NPM = 'https://www.npmjs.com/package/azot';
export const DESCRIPTION = 'Start building your perfect extensions with the Azot API';

export const shared = defineConfig({
  title: TITLE,

  rewrites: {
    'en/:rest*': ':rest*',
  },

  lastUpdated: true,
  cleanUrls: true,
  metaChunk: true,

  markdown: {
    codeTransformers: [
      // We use `[!!code` in demo to prevent transformation, here we revert it back.
      {
        postprocess(code) {
          return code.replace(/\[\!\!code/g, '[!code');
        },
      },
    ],
    config(md) {
      // TODO: remove when https://github.com/vuejs/vitepress/issues/4431 is fixed
      const fence = md.renderer.rules.fence!;
      md.renderer.rules.fence = function (tokens, idx, options, env, self) {
        const { localeIndex = 'root' } = env;
        const codeCopyButtonTitle = (() => {
          switch (localeIndex) {
            case 'ru':
              return 'Скопировать код';
            default:
              return 'Copy code';
          }
        })();
        return fence(tokens, idx, options, env, self).replace(
          '<button title="Copy Code" class="copy"></button>',
          `<button title="${codeCopyButtonTitle}" class="copy"></button>`
        );
      };
    },
  },

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: FAVICON }],
    ['meta', { name: 'theme-color', content: '#ff7e17' }],
    ['meta', { property: 'og:title', content: TITLE }],
    ['meta', { property: 'og:description', content: DESCRIPTION }],
    ['meta', { property: 'og:image', content: FAVICON }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:url', content: DOMAIN }],
    ['meta', { property: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { property: 'twitter:image', content: FAVICON }],
  ],

  titleTemplate: `:title | ${DESCRIPTION}`,

  themeConfig: {
    logo: { src: FAVICON, width: 24, height: 24 },

    socialLinks: [
      { icon: 'github', link: GITHUB },
      { icon: 'npm', link: NPM },
    ],

    search: {
      provider: 'local',
      options: {
        locales: {
          ...ruSearch,
        },
      },
    },
  },
});
