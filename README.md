# ansible_galaxy_collection

Deploy a Collection to Ansible Galaxy.

## Requirements

This action expects to be run from a repository with certain met conditions.

1. The repository is an Ansible Galaxy Collection, meaning it contains a `galaxy.yml` file at the project root.
1. This action is part of a Python workflow.
    1. This means your workflow should include a step for `uses: actions/setup-python@v1`.
    1. Before this action is called, ensure that `ansible` is installed (`pip install ansible`).

An example workflow using this action can be found [here](https://github.com/artis3n/github_version-ansible_plugin/blob/master/.github/workflows/ansiblegalaxy.yml).

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
  uses: artis3n/ansible_galaxy_collection@v1.0.7
  with:
    api_key: 'df328fawrfr32iuaw'
```
