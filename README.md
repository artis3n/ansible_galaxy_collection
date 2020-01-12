# ansible_galaxy_collection

[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/artis3n/ansible_galaxy_collection/Testing the Action)](https://github.com/artis3n/ansible_galaxy_collection/actions)
![GitHub](https://img.shields.io/github/license/artis3n/ansible_galaxy_collection)
[![GitHub release (latest SemVer)](https://img.shields.io/github/v/release/artis3n/ansible_galaxy_collection)](https://github.com/artis3n/ansible_galaxy_collection/releases)
![GitHub followers](https://img.shields.io/github/followers/artis3n?style=social)
![Twitter Follow](https://img.shields.io/twitter/follow/artis3n?style=social)

Deploy a Collection to Ansible Galaxy.

v1 of this action is a JavaScript-based action. The upcoming v2 will be a Docker-based action. This will remove the Python dependency requirements in the example usage section, as all dependencies will be incorporated inside the Docker container.

## Requirements

This action expects to be run from a repository with certain met conditions.

1. The repository is an Ansible Galaxy Collection, meaning it contains a `galaxy.yml` file at the project root.
1. This action is part of a Python workflow.
    1. This means your workflow should include a step for `uses: actions/setup-python@v1`.
    1. Before this action is called, ensure that `ansible` is installed (`pip install ansible`).

An example workflow using this action can be found [here](https://github.com/artis3n/ansible-collection-github/blob/master/.github/workflows/deploy.yml).

## Inputs

### api_key

**Required** Ansible Galaxy API key.

This should be stored in a Secret on GitHub. See [Creating and Using Secrets Encrypted Variables](https://help.github.com/en/github/automating-your-workflow-with-github-actions/virtual-environments-for-github-actions#creating-and-using-secrets-encrypted-variables).

### galaxy_config_file

**Default**: `galaxy.yml`

A collection must have a galaxy.yml file that contains the necessary information to build a collection artifact. Defaults to `galaxy.yml` in the project root.

## Example Usage

```yaml
- name: Set up Python 3
  uses: actions/setup-python@v1
  with:
    python-version: 3.6

- name: Install dependencies
  run: |
    python -m pip install --upgrade pip
    pip install ansible  # Must be at least 2.9.0

- name: Build and Deploy Collection
  uses: artis3n/ansible_galaxy_collection@v1
  with:
    api_key: 'df328fawrfr32iuaw'
```
