# ansible_galaxy_collection

[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/artis3n/ansible_galaxy_collection/Testing%20the%20Action)](https://github.com/artis3n/ansible_galaxy_collection/actions)
[![GitHub release (latest SemVer)](https://img.shields.io/github/v/release/artis3n/ansible_galaxy_collection)](https://github.com/artis3n/ansible_galaxy_collection/releases)
![GitHub last commit](https://img.shields.io/github/last-commit/artis3n/kali-artis3n)
![GitHub](https://img.shields.io/github/license/artis3n/ansible_galaxy_collection)
[![GitHub followers](https://img.shields.io/github/followers/artis3n?style=social)](https://github.com/artis3n/)
[![Twitter Follow](https://img.shields.io/twitter/follow/artis3n?style=social)](https://twitter.com/Artis3n)

Deploy a Collection to Ansible Galaxy.

## Requirements

This action expects to be run from a repository with certain met conditions.

1. The repository is an Ansible Galaxy Collection, meaning it contains a `galaxy.yml` file.

An example workflow using this action can be found [here](https://github.com/artis3n/ansible-collection-github/blob/master/.github/workflows/deploy.yml).

## Inputs

### api_key

**Required** Ansible Galaxy API key.

This should be stored in a Secret on GitHub. See [Creating and Using Secrets Encrypted Variables](https://help.github.com/en/github/automating-your-workflow-with-github-actions/virtual-environments-for-github-actions#creating-and-using-secrets-encrypted-variables).

### collection_dir

**Default**: `./`

The directory in which the Ansible Collection is stored. This defaults to the project root.

### galaxy_version

Semver-compatible string: `1`, `1.1`, `1.1.1`

Dynamically inject a semver-compatible version into your `galaxy_config_file`.

### galaxy_version_commit

Values: `true`/`false`

The Action will write the `galaxy_version` value into your `galaxy.yml` and commit it.

### galaxy_config_file

**Default**: `galaxy.yml`

A collection must have a galaxy.yml file that contains the necessary information to build a collection artifact. Defaults to "galaxy.yml" in the `collection_dir`.

## Example Usage

```yaml
- name: Build and Deploy Collection
  uses: artis3n/ansible_galaxy_collection@v2
  with:
    api_key: '${{ secrets.GALAXY_API_KEY }}'
```

```yaml
- name: Get the version from the tag
  run: echo ::set-env name=VERSION::${GITHUB_REF/refs\/tags\//}

- name: Injecting a dynamic Collection version
  uses: artis3n/ansible_galaxy_collection@v2
  with:
    api_key: '${{ secrets.GALAXY_API_KEY }}'
    galaxy_version: '$VERSION'
```

```yaml
- name: When the Collection is not in the project root
  uses: artis3n/ansible_galaxy_collection@v2
  with:
    api_key: '${{ secrets.GALAXY_API_KEY }}'
    collection_dir: 'src/my_collection/'
```

## Exit Codes

- `0`: `Ok`
- `1`: `DeployFailed`
    - The Action attempted to deploy to Ansible Galaxy, but failed.
- `2`: `MissingSemver`
    - The Collection version, from either the `galaxy_config_file` file or the `galaxy_version`, is not valid semver.
