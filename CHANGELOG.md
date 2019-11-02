# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

- Any unreleased changes will be included here.

## [1.0.9] - 2019-11-02

### Fixed

- Missing `api_key` input parameter now properly fails the action.

### Added

- Helpful debug message on successful completion.
- GitHub Action to automatically update latest release tags.

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
