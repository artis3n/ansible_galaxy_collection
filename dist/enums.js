"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ExitCodes;
(function (ExitCodes) {
    ExitCodes[ExitCodes["Ok"] = 0] = "Ok";
    ExitCodes[ExitCodes["DeployFailed"] = 1] = "DeployFailed";
    ExitCodes[ExitCodes["ValidationFailed"] = 2] = "ValidationFailed";
})(ExitCodes = exports.ExitCodes || (exports.ExitCodes = {}));
var PublishCommand;
(function (PublishCommand) {
    PublishCommand[PublishCommand["Executable"] = 0] = "Executable";
    PublishCommand[PublishCommand["Collection"] = 1] = "Collection";
    PublishCommand[PublishCommand["Command"] = 2] = "Command";
    PublishCommand[PublishCommand["Archive"] = 3] = "Archive";
    PublishCommand[PublishCommand["ApiKeyFlag"] = 4] = "ApiKeyFlag";
})(PublishCommand = exports.PublishCommand || (exports.PublishCommand = {}));
