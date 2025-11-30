import { createRequire } from 'node:module';
import { defineConfig, type DefaultTheme } from 'vitepress';

const require = createRequire(import.meta.url);
const pkg = require('azot/package.json');

export const ru = defineConfig({
  lang: 'ru-RU',

  themeConfig: {
    nav: nav(),

    sidebar: {
      '/ru/': { base: '/ru/', items: sidebarHome() },
    },

    editLink: {
      pattern: 'https://github.com/azot-labs/extensions/edit/main/docs/:path',
      text: 'Редактировать страницу',
    },

    footer: {
      message: 'Опубликовано под лицензией MIT.',
      copyright: '© 2025 – настоящее время, Azot',
    },

    outline: { label: 'Содержание страницы' },

    docFooter: {
      prev: 'Предыдущая страница',
      next: 'Следующая страница',
    },

    lastUpdated: {
      text: 'Обновлено',
    },

    darkModeSwitchLabel: 'Оформление',
    lightModeSwitchTitle: 'Переключить на светлую тему',
    darkModeSwitchTitle: 'Переключить на тёмную тему',
    sidebarMenuLabel: 'Меню',
    returnToTopLabel: 'Вернуться к началу',
    langMenuLabel: 'Изменить язык',
    skipToContentLabel: 'Перейти к содержимому',
  },
});

function nav(): DefaultTheme.NavItem[] {
  return [
    {
      text: 'Расширения',
      link: '/ru/extensions/build-extension',
      activeMatch: '/ru/extensions/',
    },
  ];
}

function sidebarHome(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Расширения',
      collapsed: false,
      items: sidebarExtensions(),
    },
  ];
}

export function sidebarExtensions(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Введение',
      collapsed: false,
      items: [{ text: 'Создание расширения', link: 'extensions/build-extension' }],
    },
    {
      text: 'Релизы',
      collapsed: false,
      items: [{ text: 'Релиз расширения с помощью GitHub Actions', link: 'extensions/release-extension' }],
    },
  ];
}

export const search: DefaultTheme.AlgoliaSearchOptions['locales'] = {
  ru: {
    placeholder: 'Поиск в документации',
    translations: {
      button: {
        buttonText: 'Поиск',
        buttonAriaLabel: 'Поиск',
      },
      modal: {
        searchBox: {
          resetButtonTitle: 'Сбросить поиск',
          resetButtonAriaLabel: 'Сбросить поиск',
          cancelButtonText: 'Отменить поиск',
          cancelButtonAriaLabel: 'Отменить поиск',
        },
        startScreen: {
          recentSearchesTitle: 'История поиска',
          noRecentSearchesText: 'Нет истории поиска',
          saveRecentSearchButtonTitle: 'Сохранить в истории поиска',
          removeRecentSearchButtonTitle: 'Удалить из истории поиска',
          favoriteSearchesTitle: 'Избранное',
          removeFavoriteSearchButtonTitle: 'Удалить из избранного',
        },
        errorScreen: {
          titleText: 'Невозможно получить результаты',
          helpText: 'Вам может потребоваться проверить подключение к Интернету',
        },
        footer: {
          selectText: 'выбрать',
          navigateText: 'перейти',
          closeText: 'закрыть',
          searchByText: 'поставщик поиска',
        },
        noResultsScreen: {
          noResultsText: 'Нет результатов для',
          suggestedQueryText: 'Вы можете попытаться узнать',
          reportMissingResultsText: 'Считаете, что поиск даёт ложные результаты？',
          reportMissingResultsLinkText: 'Нажмите на кнопку «Обратная связь»',
        },
      },
    },
  },
};
