<p align="center">
  <h1 align="center">Азот</h1>
</p>

<p align="center">
  <a aria-label="Дискорд" href="https://discord.gg/fHMgAgc7gU">
    <img alt="" src="https://img.shields.io/badge/Дискорд-сервер-black?style=flat&logo=Discord&logoColor=white">
  </a>
  <a aria-label="Телеграм" href="https://t.me/AzotApp">
    <img alt="" src="https://img.shields.io/badge/Телеграм-канал-black?style=flat&logo=Telegram&logoColor=white">
  </a>
  <img alt="" src="https://img.shields.io/github/downloads/azot-labs/azot/latest/total?style=flat&color=black">
  <img alt="" src="https://img.shields.io/github/downloads/azot-labs/azot/total?style=flat&color=black">
</p>

Азот (ранее — Стримикс) позволяет легко и быстро скачивать видео для последующего оффлайн просмотра.

[English](https://github.com/azot-labs/azot/main/README.md) • Pусский

Вы можете создать собственное расширение. Примеры доступны в [azot-labs/extensions](https://github.com/azot-labs/extensions) и там же можно найти [список публичных расширений](https://github.com/azot-labs/extensions/blob/main/extensions.json), доступных для установки.

## Установка

Азот поддерживает Windows (x64), macOS (x64 & Apple Silicon) и Linux (x64).

> Приведенные ниже скрипты установки предназначены для CLI v4.x.x. Начиная с v5.x.x консольная утилита находится в составе десктопного приложения и может быть установлена из настроек.

#### Windows

```shell
powershell -c "irm azot.so/install.ps1 | iex"
```

#### Linux & macOS

```shell
curl -fsSL https://azot.so/install.sh | bash
```

### Обновление

Чтобы обновить Азот до последней версии, выполните следующую команду:

```shell
azot upgrade
```

## Запуск

> Используйте команду `streamyx` если у вас установлена версия v4.x.x или более старая.

```shell
azot <command> [...options]
```

Используйте вызов с аргументом `-h`, чтобы получить справку по всем доступным опциям.

### Установка расширения

> В примере ниже используется расширение для скачивания видео с RUTUBE.

```shell
azot install rutube
```

### Скачивание видео

```shell
azot https://rutube.ru/video/961e6b75ea096a57dde2f957ba1cc48c/
20:32:40.667 INFO : Fetching content metadata...
20:32:40.926 INFO : Fetching metadata finished
20:32:40.928 INFO : The Best and Worst Web Browsers Ever—Which One Do You Use?
20:32:41.094 INFO : Content Matched: HTTP Live Streaming
20:32:41.094 INFO : Parsing streams...
20:32:41.348 INFO : Extracted, there are 16 streams, 16 video streams
✔ :32:41.354 INFO : The.Best.and.Worst.Web.Browsers.Ever—Which.One.Do.You.Use.2160p.WEB-DL.x264 ∙ VIDEO ∙ 3171 KiB/s
✔ :32:55.731 INFO : Muxed
```

Результат: `C:\Users\Admin\Downloads\The.Best.and.Worst.Web.Browsers.Ever—Which.One.Do.You.Use.2160p.WEB-DL.x264.mkv`

## Особенности

- **Поддержка нескольких медиаформатов**: прогрессивный, MPEG-DASH, HLS
- **Параллелизм**: несколько одновременных соединений для более быстрой закачки
- **Повторное выполнение** запросов в случае неудачи во время скачивания
- Поддержка **HTTP2**
- **Шаблоны** названий файлов для фильмов и эпизодов
- **Дешифрование** MPEG-DASH потока с указанным ключом контента
