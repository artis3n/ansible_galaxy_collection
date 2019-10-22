# ansible_galaxy_collection

Deploy a Collection to Ansible Galaxy.

## Inputs

### api_key

**Required** Ansible Galaxy API key.

This should be stored in a Secret on Github. See [Creating and Using Secrets Encrypted Variables](https://help.github.com/en/github/automating-your-workflow-with-github-actions/virtual-environments-for-github-actions#creating-and-using-secrets-encrypted-variables).

### galaxy_config_file

**Default**: `galaxy.yml`

A collection must have a galaxy.yml file that contains the necessary information to build a collection artifact. Defaults to `galaxy.yml` in the project root.

## Example Usage

```yaml
uses: artis3n/ansible_galaxy_collection@v1.0.0
with:
  api_key: 'df328fawrfr32iuaw'
```
