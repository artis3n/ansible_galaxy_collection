# ansible_galaxy_collection

Deploy a Collection to Ansible Galaxy.

## Requirements

This action expects to be run from a repository with certain met conditions.

1. The repository is an Ansible Galaxy Collection, meaning it contains a `galaxy.yaml` file at the project root. If you have a setup that moves the `galaxy.yaml` file, use the `galaxy_config_file` variable described below to inform this action.
1. This action is part of a Python workflow.
    1. This means your workflow should include a step for `uses: actions/setup-python@v1`.
    1. Before this action is called, ensure that `ansible` is installed (`pip install ansible`).

An example workflow using this action can be found [here](https://github.com/artis3n/github_version-ansible_plugin/blob/master/.github/workflows/ansiblegalaxy.yml).

## Inputs

### api_key

**Required** Ansible Galaxy API key.

This should be stored in a Secret on GitHub. See [Creating and Using Secrets Encrypted Variables](https://help.github.com/en/github/automating-your-workflow-with-github-actions/virtual-environments-for-github-actions#creating-and-using-secrets-encrypted-variables).

### galaxy_config_file

**Default**: `galaxy.yaml`

A collection must have a galaxy.yaml file that contains the necessary information to build a collection artifact. Defaults to `galaxy.yaml` in the project root.

*Note*: Ansible accepts either `galaxy.yaml` or `galaxy.yml` as a default Galaxy config. If you are using `galaxy.yml`, specify it explicitly for this action:

```yaml
- name: Build and Deploy Collection
  uses: artis3n/ansible_galaxy_collection@v1.0.7
  with:
    api_key: 'df328fawrfr32iuaw'
    galaxy_config_file: 'galaxy.yml'
```

## Example Usage

```yaml
- name: Set up Python 3
  uses: actions/setup-python@v1
  with:
    python-version: 3.6

- name: Install dependencies
  run: |
    python -m pip install --upgrade pip
    # We need the pre-release version of Ansible to use the 'collection' action in ansible-galaxy.
    # Remove '--pre' once Ansible 2.9 is released.
    pip install --pre ansible

- name: Build and Deploy Collection
  uses: artis3n/ansible_galaxy_collection@v1.0.7
  with:
    api_key: 'df328fawrfr32iuaw'
```
