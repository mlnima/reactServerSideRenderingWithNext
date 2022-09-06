"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var smtp_server_1 = tslib_1.__importDefault(require("smtp-server"));
var mailparser_1 = tslib_1.__importDefault(require("mailparser"));
var server = new smtp_server_1.default({
    onData: function (stream, session, callback) {
        (0, mailparser_1.default)(stream, {}, function (err, parsed) {
            if (err)
                console.log("Error:", err);
            console.log(parsed);
            stream.on("end", callback);
        });
    },
    disabledCommands: ['AUTH']
});
if (process.env.MAIL_SERVER === 'true') {
    server.listen(process.env.MAIL_SERVER_PORT || 465, function () {
        console.log('mail expressServer started');
    });
}
//# sourceMappingURL=mailServer.js.map