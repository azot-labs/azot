# Build an extension

Extension let you extend Azot with your own features to create a custom downloading experience.

In this tutorial, you'll compile an extension example from source code and load it into Azot.

## What you'll learn

After you've completed this tutorial, you'll be able to:

- Configure an environment for developing Azot extensions.
- Compile an extension from source code.
- Reload an extension after making changes to it.

## Prerequisites

To complete this tutorial, you'll need:

- [Git](https://git-scm.com/) installed on your local machine.
- A local development environment for [Node.js](https://nodejs.org/en/download).
- A code editor, such as [Visual Studio Code](https://code.visualstudio.com/).

::: info
It is assumed that you are already familiar with [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) and [TypeScript](https://www.typescriptlang.org). Don't worry, you don't need to be an expert. If you need some help with the basics, check out TypeScript's [Handbook](https://www.typescriptlang.org/docs/handbook/intro.html) and Mozilla's [JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide).
:::

## Step 1: Download the extension example

In this step, you'll download an extension example and install it to Azot.

The extension example you'll use in this tutorial is available in a GitHub repository.

1. Open a terminal window and change the project directory to the working directory.

```sh
cd path/to/projects
```

2. Clone the extension example using Git.

```sh
git clone https://github.com/azot-labs/azot-extension-example.git
```

::: info GitHub template repository
The repository for the extension example is a GitHub template repository, which means you can create your own repository from the extension example. To learn how, refer to [Creating a repository from a template](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template#creating-a-repository-from-a-template).

Remember to use the URL of your own repository when cloning the extension example.
:::

## Step 2: Build the extension

In this step, you'll compile the extension example so that Azot can load it.

1. Navigate to the extension directory.

```sh
cd azot-extension-example
```

2. Install dependencies.

```sh
npm install
```

3. Compile the source code. The following command keeps running in the terminal and rebuilds the extension when you modify the source code.

```ts
npm run dev
```

Notice that the extension directory now has a `dist/main.js` file that contains a compiled version of the extension.

## Step 3: Enable the extension

To load a extension in Azot, you first need to install it.

In Azot CLI, run the following command to install the extension.

```sh
azot install /path/to/azot-extension-example
```

::: info
If you're using Azot CLI v4 or older, you should call `streamyx` instead of `azot`.
:::

You're now ready to use the extension in Azot. Next, we'll make some changes to the extension.

## Step 4: Update the extension info

In this step, you'll rename the extension by updating the extension info, `package.json`. The `package.json` contains information about your extension, such as its name and description.

1. Open `package.json` in your code editor.
2. Change `name` to a unique identifier, such as "hello-world".
3. Change `config.title` to a human-friendly name, such as "Hello world".
4. Change `config.icon` to your extension's icon URL.
5. Also fill in `author` and `funding` fields with your information.
6. Rename the extension folder to match the extension's name.
7. Reinstall extension to load the new changes to the extension folder.

```sh
azot uninstall /path/to/azot-extension-example
azot install /path/to/hello-world
```

Display installed extensions and notice that the name of the extension has been updated to reflect the changes you made.

```sh
azot extensions
```

## Step 5: Update the source code

To let the user interact with your extension, add a prompt for desired stream format when user trying to download video.

1. Open `main.ts` in your code editor.

2. Use `Azot` from the global context provided by the Azot API, add the following code.

```ts
export default defineExtension({
  // ...

  async fetchContentMetadata(url, options) {
    const { streamFormat } = await Azot.prompt({
      fields: { streamFormat: { label: 'Введите желаемый формат потока (MPD/M3U8)' } },
    });
    // ...
  },
});
```

In the Azot CLI, run the command with URL that extension can handle.

```sh
azot https://bitmovin.com/demos/stream-test
```

You can now see download progress after metadata fetching.

## Conclusion

In this tutorial, you've built your first Azot extension using the TypeScript API. You've modified the extension and reloaded it to reflect the changes inside Azot.
