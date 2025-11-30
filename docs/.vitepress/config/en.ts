import { createRequire } from 'module';
import { defineConfig, type DefaultTheme } from 'vitepress';

const require = createRequire(import.meta.url);
const pkg = require('azot/package.json');

export const en = defineConfig({
  lang: 'en-US',

  themeConfig: {
    nav: nav(),

    sidebar: {
      '/': { base: '/', items: sidebarHome() },
    },

    editLink: {
      pattern: 'https://github.com/azot-labs/extensions/edit/main/docs/:path',
      text: 'Edit this page on GitHub',
    },

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2025-present Azot',
    },
  },
});

function nav(): DefaultTheme.NavItem[] {
  return [
    {
      text: 'Extensions',
      link: '/extensions/build-extension',
      activeMatch: '/extensions/',
    },
  ];
}

function sidebarHome(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Extensions',
      collapsed: false,
      items: sidebarExtensions(),
    },
  ];
}

function sidebarExtensions(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Getting Started',
      collapsed: false,
      items: [{ text: 'Build an extension', link: 'extensions/build-extension' }],
    },
    {
      text: 'Releasing',
      collapsed: false,
      items: [{ text: 'Release your extension with GitHub Actions', link: 'extensions/release-extension' }],
    },
  ];
}
