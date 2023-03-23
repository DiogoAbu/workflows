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
name: Generate Release

on:
  push:
    branches:
      - main
      - beta

jobs:
  release:
    name: Generate Release
    if: contains(github.event.head_commit.message, '[skip ci]') == false
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
```
