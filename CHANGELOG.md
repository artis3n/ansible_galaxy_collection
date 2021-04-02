# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

- Any unreleased changes will be included here.

## [2.2.4] - 2021-04-01

### Changed

- NPM dependency updates

## [2.2.3] - 2021-02-03

### Changed

- NPM dependency updates

## [2.2.2] - 2020-12-31

### Changed

- NPM dependency updates
- Dockerfile now builds from `node:14-slim`

## [2.2.1] - 2020-04-010

### Fixed

- [#54](https://github.com/artis3n/ansible_galaxy_collection/issues/54) revealed that, as of at least `2.2.0`, GitHub Actions fails to build the image on master. There appeared to be 2 issues.
  - `COPY package*.json` did not appear to copy both `package.json` and `package-lock.json` as expected, so the `COPY` was reverted to a `COPY . .` and a `.dockerignore` is used to keep out all files we don't need.
  - The Actions runner fails to locate the entrypoint script. I believe this is a bug with GitHub Actions as the Actions runners sets a default `WORKDIR` but does not appear to be following Docker's documentation on applying the `WORKDIR` to `COPY` and `RUN` commands.
    - I have filed a bug about this, but it was marked as spam :). Trying to get it unflagged. It is submitted [here](https://github.community/t5/GitHub-Actions/GITHUB-WORKSPACE-not-setting-WORKDIR-correctly/m-p/53525#M8863).
    - [update 2020-12-31]: This is resolved, action workflows now support the 'uses: ./' syntax.

### Changed

- Moved the Docker image from `node:13-slim` to `node:12-slim` to keep the project on the LTS version of node.

## [2.2.0] - 2020-04-05

### Added

- Added the `galaxy_version` input parameter to allow you to pass in a semver-compatible string, which will be used for publishing the collection. Resolves [#49](https://github.com/artis3n/ansible_galaxy_collection/issues/49).

## [2.1.1] - 2020-04-05

### Fixed

- Fixed the syntax that was breaking releasing the Docker image to Docker Hub and GitHub Package Registry

## [2.1.0] - 2020-04-05

### Deprecated

- Deprecated the `galaxy_config_file` input parameter. There is no legitimate reason to need this parameter. Ansible Galaxy requires the `galaxy.yml` file to be in the Collection's root, and the Collection's location can now be customized with `collection_dir`. It will be removed in a future major release.

### Added

- Added a `collection_dir` input parameter to the action.
- Added Jest tests

### Changed

- Slimmed down the Docker container slightly with Dockerfile optimizations
- Typescript refactor for ease of refactor-ability and testing
- Switched to the new `use: ./` syntax to test the current version of the Action in the `main.yml` workflow file

## [2.0.1] - 2020-02-18

### Fixed

- Fixed an issue with the new Docker-based action where the ansible-galaxy command failed to run in the container.

## [2.0.0] - 2020-02-17

### Changed

- Action is now Docker-based. This removes all of the dependency steps users would have to set in their workflow files.
- Usage is now simplified and updated on the README.

## [1.0.10] - 2019-11-02

### Fixed

- Missed correcting outdated variables in a debug message in 1.0.9. Fixed.

### Changed

- The AnsibleCollection class caused some kind of issue with the Actions workflow. Too much of a headache to be worth it, removing.

## [1.0.9] - 2019-11-02

### Fixed

- Missing `api_key` input parameter now properly fails the action.

### Added

- Helpful debug message on successful completion.
- GitHub Action to automatically update latest release tags.
- Error checking if `galaxy.yml` values are missing.

### Changed

- `console.log` messages now use `core.debug` for better action logging.

## [1.0.8] - 2019-11-01

### Changed

- Changed the default value of `galaxy_config_file` to match Ansible's expectation. `galaxy.yaml` -> `galaxy.yml`.

## [1.0.7] - 2019-10-22

### Fixed

- Fixed the declaration of the publish command to match the generated file from the build command.

## [1.0.6] - 2019-10-22 [YANKED]

This version used incorrect syntax for the `ansible-galaxy collection publish` command.

### Fixed

- Fixing error in entrypoint for JS action

## [1.0.5] - 2019-10-22 [YANKED]

This version used incorrect syntax for the `ansible-galaxy collection publish` command.

### Added

- Adding new built `dist/index.js` that I forgot to include in the previous release

## [1.0.4] - 2019-10-22 [YANKED]

This version used incorrect syntax for the `ansible-galaxy collection publish` command.

### Added

- Adding default value for non-required input variable

## [1.0.3] - 2019-10-22 [YANKED]

This version used incorrect syntax for the `ansible-galaxy collection publish` command.

### Changed

- Updated README while continuing to test the Action

## [1.0.2] - 2019-10-22 [YANKED]

This version used incorrect syntax for the `ansible-galaxy collection publish` command.

### Changed

- Fixing documentation while testing the Action

## [1.0.1] - 2019-10-22 [YANKED]

This version used incorrect syntax for the `ansible-galaxy collection publish` command.
 
### Changed

- Worked on README documentation while testing the Action

## [1.0.0] - 2019-10-22 [YANKED]

This version used incorrect syntax for the `ansible-galaxy collection publish` command.

### Added

- First pass at writing this Github Action
- Added README
- Use [zeit/ncc](https://github.com/zeit/ncc) to package dependencies with Github Action instead of adding node_modules to the repo
- Set example on README to semver
