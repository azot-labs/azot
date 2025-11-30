<p align="center">
  <h1 align="center">Azot</h1>
</p>

<p align="center">
  <a aria-label="Join Discord community" href="https://discord.gg/fHMgAgc7gU">
    <img alt="" src="https://img.shields.io/badge/Discord-server-black?style=flat&logo=Discord&logoColor=white">
  </a>
  <a aria-label="Join Telegram community" href="https://t.me/AzotApp">
    <img alt="" src="https://img.shields.io/badge/Telegram-channel-black?style=flat&logo=Telegram&logoColor=white">
  </a>
  <img alt="" src="https://img.shields.io/github/downloads/azot-labs/azot/latest/total?style=flat&color=black">
  <img alt="" src="https://img.shields.io/github/downloads/azot-labs/azot/total?style=flat&color=black">
</p>

Azot (formerly known as Streamyx) makes it simple, fast and delightful to download videos, so you can watch it offline later.

English • [Pусский](https://github.com/azot-labs/azot/tree/main/README.ru.md)

You can create your own extension. Examples are available at [azot-labs/extensions](https://github.com/azot-labs/extensions) and [here](https://github.com/azot-labs/extensions/blob/main/extensions.json) you can find a list of public extensions available for installation.

## Install

Azot supports Windows (x64), macOS (x64 & Apple Silicon) and Linux (x64).

> Install scripts and examples below are for CLI v4.x.x. Starting from v5.x.x CLI is included in the desktop app and can be installed from settings as command `azot`.

#### Windows

```shell
powershell -c "irm azot.so/install.ps1 | iex"
```

#### Linux & macOS

```shell
curl -fsSL https://azot.so/install.sh | bash
```

## Getting Started

> Use `streamyx` command if you have v4.x.x or older version installed. For v5.x.x use `azot` command.

```shell
streamyx <command> [...options]
```

Use `--help` flag to see all available options.

To upgrade to the latest version of Azot, run:

```shell
streamyx upgrade
```

### Install an extension

> In the example below, RUTUBE extension is used to download videos from RUTUBE.

```shell
streamyx install rutube
```

### Download a video

```shell
streamyx https://rutube.ru/video/961e6b75ea096a57dde2f957ba1cc48c/
20:32:40.667 INFO : Fetching content metadata...
20:32:40.926 INFO : Fetching metadata finished
20:32:40.928 INFO : The Best and Worst Web Browsers Ever—Which One Do You Use?
20:32:41.094 INFO : Content Matched: HTTP Live Streaming
20:32:41.094 INFO : Parsing streams...
20:32:41.348 INFO : Extracted, there are 16 streams, 16 video streams
✔ :32:41.354 INFO : The.Best.and.Worst.Web.Browsers.Ever—Which.One.Do.You.Use.2160p.WEB-DL.x264 ∙ VIDEO ∙ 3171 KiB/s
✔ :32:55.731 INFO : Muxed
```

Output: `C:\Users\Admin\Downloads\The.Best.and.Worst.Web.Browsers.Ever—Which.One.Do.You.Use.2160p.WEB-DL.x264.mkv`

## Features

- **Multiple media formats** support: progressive, MPEG-DASH, HLS
- **Concurrency**: multiple simultaneous connections for faster downloads
- **Retry** in case of request failure during download
- **HTTP2** support
- **Templates** for movie and episode filenames
- **Decryption** of MPEG-DASH stream with specified content key
