"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuildCommand = exports.PublishCommand = exports.ExitCodes = void 0;
var ExitCodes;
(function (ExitCodes) {
    ExitCodes[ExitCodes["Ok"] = 0] = "Ok";
    ExitCodes[ExitCodes["DeployFailed"] = 1] = "DeployFailed";
    ExitCodes[ExitCodes["ValidationFailed"] = 2] = "ValidationFailed";
    ExitCodes[ExitCodes["BuildFailed"] = 3] = "BuildFailed";
    ExitCodes[ExitCodes["PublishFailed"] = 4] = "PublishFailed";
})(ExitCodes = exports.ExitCodes || (exports.ExitCodes = {}));
var PublishCommand;
(function (PublishCommand) {
    PublishCommand[PublishCommand["Executable"] = 0] = "Executable";
    PublishCommand[PublishCommand["Collection"] = 1] = "Collection";
    PublishCommand[PublishCommand["Command"] = 2] = "Command";
    PublishCommand[PublishCommand["Archive"] = 3] = "Archive";
    PublishCommand[PublishCommand["ApiKeyFlag"] = 4] = "ApiKeyFlag";
})(PublishCommand = exports.PublishCommand || (exports.PublishCommand = {}));
var BuildCommand;
(function (BuildCommand) {
    BuildCommand[BuildCommand["Executable"] = 0] = "Executable";
    BuildCommand[BuildCommand["Collection"] = 1] = "Collection";
    BuildCommand[BuildCommand["Command"] = 2] = "Command";
    BuildCommand[BuildCommand["Archive"] = 3] = "Archive";
})(BuildCommand = exports.BuildCommand || (exports.BuildCommand = {}));
