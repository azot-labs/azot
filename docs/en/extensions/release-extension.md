# Release your extension with GitHub Actions

Manually releasing your extension can be time-consuming and error-prone. In this guide, you'll configure your extension to use GitHub Actions to automatically create a release when you create a new tag.

::: info
GitHub template repository `azot-extension-example` already includes a [GitHub Actions workflow](https://github.com/azot-labs/azot-extension-example/blob/main/.github/workflows/release.yml).
:::

1. In the root directory of your extension, create a file called `release.yml` under `.github/workflows` with the following content:

```yml
name: Release Azot extension

permissions:
  contents: write

on:
  push:
    tags:
      - 'v*'

jobs:
  release:
    name: Create Release
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 'lts/*'
          cache: 'npm'

      - run: npm ci

      - name: Get package version
        id: package_version
        run: echo "version=$(node -p "require('./package.json').version")" >> "$GITHUB_OUTPUT"

      - name: Build and Pack
        id: pack_artifact
        run: |
          npm run build
          npm pack
          ARTIFACT_FILE=$(ls -1 *.tgz | head -n 1)
          echo "artifact_path=$ARTIFACT_FILE" >> "$GITHUB_OUTPUT"
          echo "Created artifact: $ARTIFACT_FILE"

      - name: Create GitHub Release
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: |
          PRERELEASE_FLAG=""
          if [[ "${{ github.ref_name }}" == *-* ]]; then
            PRERELEASE_FLAG="--prerelease"
          fi

          gh release create ${{ github.ref_name }} \
            --title "v${{ steps.package_version.outputs.version }}" \
            --generate-notes \
            $PRERELEASE_FLAG \
            "${{ steps.pack_artifact.outputs.artifact_path }}" \
            "package.json"
```

2. In your terminal, commit the workflow.

```sh
git add .github/workflows/release.yml
git commit -m "Add release workflow"
git push origin main
```

3. Browse to your repository on GitHub and select the **Settings** tab. Expand the **Actions** menu in the left sidebar, navigate to the **General** menu, scroll to the **Workflow permissions** section, select the **Read and write permissions** option, and save.

4. Create a tag that matches the version in the `package.json` file.

```sh
git tag -a 1.0.1 -m "1.0.1"
git push origin 1.0.1
```

- `-a` creates an annotated tag.
- `-m` specifies the name of your release. For Azot extensions, this must be the same as the version.

5. Browse to your repository on GitHub and select the **Actions** tab. Your workflow might still be running, or it might have finished already.

6. When the workflow finishes, go back to the main page for your repository and select **Releases** in the sidebar on the right side. The workflow has created a draft GitHub release and uploaded the required assets as binary attachments.

7. Select **Edit** (pencil icon) on the right side of the release name.

8. Add release notes to let users know what happened in this release, and then select **Publish release**.

You've successfully set up your extension to automatically create a GitHub release whenever you create a new tag.

- If this is the first release for this extension, you're now ready to Submit your extension.
- If this is an update to an already published extension, your users can now update to the latest version.
