export enum ExitCodes {
  Ok,
  DeployFailed,
  ValidationFailed,
  BuildFailed,
  PublishFailed,
}

export enum PublishCommand {
  Executable,
  Collection,
  Command,
  Archive,
  ApiKeyFlag,
}

export enum BuildCommand {
  Executable,
  Collection,
  Command,
  Archive,
}
