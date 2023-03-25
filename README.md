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
      after_install_command: |
        yarn lint
        yarn typecheck
    secrets:
      gpg_private_key: ${{ secrets.GPG_PRIVATE_KEY }}
      gpg_passphrase: ${{ secrets.GPG_PASSPHRASE }}

  deploy:
    name: Deploy
    uses: DiogoAbu/workflows/.github/workflows/reusable_beanstalk.yml@main
    with:
      files_to_zip: dist package.json
      should_deploy_prod: true
      should_deploy_staging: true
    secrets:
      access_key_id: ${{ secrets.AWS_DEPLOY_ACCESS_KEY_ID }}
      secret_access_key: ${{ secrets.AWS_DEPLOY_SECRET_ACCESS_KEY }}
      region: ${{ secrets.AWS_DEPLOY_REGION }}
      existing_bucket_name: ${{ secrets.AWS_DEPLOY_EXISTING_BUCKET_NAME }}
      application_name: ${{ secrets.AWS_DEPLOY_APPLICATION_NAME }}
      environment_name_prod: ${{ secrets.AWS_DEPLOY_ENVIRONMENT_NAME_PROD }}
      environment_name_staging: ${{ secrets.AWS_DEPLOY_ENVIRONMENT_NAME_STAGING }}
```
