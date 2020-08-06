const { Commands } = require('./constants');

module.exports = class {
    /**
     * Enable the device
     * @param {(err: Error) => void} cb
     */
    enableDevice(cb) {
        this.executeCmd(Commands.ENABLE_DEVICE, '', cb);
    }

    /**
     * Disable the device
     * @param {(err: Error) => void} cb
     */
    disableDevice(cb) {
        const buffer = Buffer.from([0, 0, 0, 0]);

        this.executeCmd(Commands.DISABLE_DEVICE, buffer, cb);
    }

    getFreeSizes(cb) {
        this.executeCmd(Commands.GET_FREE_SIZES, '', (error, data) => {
            if (error) {
                return cb(error, null);
            }

            const decodedData = {
                users: data.readUIntLE(24, 4),
                logs: data.readUIntLE(40, 4),
                capacity: data.readUIntLE(72, 4),
            }
            return cb(null, decodedData);
        });
    }
};
