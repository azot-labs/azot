# Релиз расширения с помощью GitHub Actions

Релиз расширения вручную может отнимать много времени и приводить к ошибкам. В этом руководстве вы настроите ваше расширение для использования GitHub Actions, чтобы автоматически создавать релиз при создании нового тега.

::: info
Шаблонный репозиторий GitHub `azot-extension-example` уже включает в себя [GitHub Actions workflow](https://github.com/azot-labs/azot-extension-example/blob/main/.github/workflows/release.yml).
:::

1.  В корневом каталоге вашего расширения создайте файл с именем `release.yml` в папке `.github/workflows` со следующим содержимым:

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

2.  В вашем терминале сделайте коммит созданного workflow.

```sh
git add .github/workflows/release.yml
git commit -m "Добавить GitHub Actions workflow"
git push origin main
```

3.  Перейдите в ваш репозиторий на GitHub и выберите вкладку **Settings** (Настройки). В левой боковой панели разверните меню **Actions**, перейдите в меню **General** (Общие), прокрутите до раздела **Workflow permissions** (Разрешения рабочего процесса), выберите опцию **Read and write permissions** (Права на чтение и запись) и сохраните.

4.  Создайте тег, который соответствует версии в файле `package.json`.

```sh
git tag -a 1.0.1 -m "1.0.1"
git push origin 1.0.1
```

- `-a` создает аннотированный тег.
- `-m` указывает название вашего релиза. Для расширений Azot оно должно совпадать с версией.

5.  Перейдите в ваш репозиторий на GitHub и выберите вкладку **Actions**. Ваш workflow может все еще выполняться или уже завершиться.

6.  Когда workflow завершится, вернитесь на главную страницу вашего репозитория и выберите **Releases** (Релизы) на боковой панели справа. Workflow создал релиз на GitHub и загрузил необходимые файлы и скрипты в виде бинарных вложений.

7.  Нажмите **Edit** (значок карандаша) справа от названия релиза.

8.  Добавьте примечания к релизу, чтобы сообщить пользователям, что изменилось в этом выпуске, а затем нажмите **Publish release** (Опубликовать релиз).

Вы успешно настроили ваше расширение для автоматического создания релиза на GitHub при каждом создании нового тега.

- Если это первый релиз для данного расширения, вы готовы отправить ваше расширение на публикацию.
- Если это обновление для уже опубликованного расширения, ваши пользователи теперь могут обновиться до последней версии.
