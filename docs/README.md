## About this repo

This repo is used for hosting public releases of Azot.

Azot is not open source software and this repo _DOES NOT_ contain the source code of Azot. However, if you wish to contribute to Azot, you can easily do so with our extensive extension system. A extension guide can be found here: [docs.azot.so](https://docs.azot.so)

If you have questions or issues with extensions, please go to their own repo to file them. If you have questions or issues about core Azot itself, please post them to issues of this repo.

## Community Extension

### Community Extension format

To add your extension to the list, make a pull request to the `extensions.json` file. Please add your extension to the end of the list. Specify the repository identifier, in the form of `github:user-name/repo-name`, if your GitHub repo is located at `https://github.com/user-name/repo-name`.

### How community extensions are pulled

- Azot will read the list of extensions in `extensions.json`.
- The `name` and `author` fields from repo string are used for searching.
- When the user opens the detail page of your extension, Azot will pull the `package.json` and `README.md` from your GitHub repo).
- The `package.json` in your repo will only be used to figure out the latest version. Actual files are fetched from your GitHub releases.
- If your `package.json` requires a version of Azot that's higher than the running app, your `package.json` from releases will be consulted to find the latest version of your extension that is compatible.
- When the user chooses to install your extension, Azot will look for your GitHub releases tagged identically to the version inside `package.json`.
- Azot will download `package.json`, `main.js` (and other JavaScript files), and store them in the proper location.

### Announcing the First Public Release of your Extension

- Once admitted to the extension browser, you can announce the public availability of your extension:
  - [in the Telegram channel discussion](https://t.me/AzotApp) as a showcase, and
  - [on the Discord Server](https://discord.gg/fHMgAgc7gU) in the channel `#extensions`.
- You can also announce the first working version of your extension as a public beta before "officially" submitting it to the extension browser. That way, you can acquire some beta testers for feedback.
