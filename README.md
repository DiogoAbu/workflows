<h1 align="center">Workflows</h1><br>

<p align="center">
  Collection of reusable workflows
</p>

<!-- [BEGIN] Don't edit this section, instead run Markdown AIO: Update Table of Contents -->
## 🚩 Table of Contents

- [🚩 Table of Contents](#-table-of-contents)
- [📖 Usage](#-usage)
<!-- [END] Don't edit this section, instead run Markdown AIO: Update Table of Contents -->

## 📖 Usage

Check the [github docs](https://docs.github.com/en/actions/using-workflows/reusing-workflows#calling-a-reusable-workflow) for the latest instruction, or follow below:

```yml
name: Release and Deploy

run-name: Release and Deploy

on:
  push:
    branches:
      - main
      - beta

jobs:
  release:
    name: Release
    uses: DiogoAbu/workflows/.github/workflows/reusable_release.yml@main
    permissions:
      contents: write
    with:
      after-install-command: |
        yarn lint
        yarn typecheck
    secrets: 
      release-token: ${{ secrets.PERSONAL_TOKEN }}
      gpg-private-key: ${{ secrets.GPG_PRIVATE_KEY }}
      gpg-passphrase: ${{ secrets.GPG_PASSPHRASE }}

  deploy:
    name: Deploy
    runs-on: ubuntu-latest
    needs: release
    if: needs.release.outputs.should-release == 'true'
    steps:
      - run: |
          echo "should-release: ${{ fromJson(needs.release.outputs.should-release) }}"
          echo "prev-version: ${{ needs.release.outputs.prev-version }}"
          echo "version: ${{ needs.release.outputs.version }}"
```
