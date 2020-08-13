import { ZKLib } from "./index";
import Bluebird from "bluebird";

export default class ZK {
    zklib: ZKLib;

    isConnected: boolean;

    createSocket: () => Bluebird<void>;
    closeSocket: () => Bluebird<void>;

    connect: () => Bluebird<void>;
    disconnect: () => Bluebird<void>;

    serialNumber: () => Bluebird<string>;

    version: () => Bluebird<string>;

    getTime: () => Bluebird<Date>;
    setTime: (date: Date) => Bluebird<void>;

    getAttendance: () => Bluebird<any[]>;
    clearAttendanceLog: () => Bluebird<void[]>;

    delUser: (uid: string) => Bluebird<void>;
    setUser: () => Bluebird<void>; // @todo
    enrollUser: () => Bluebird<void>; // @todo
    getUser: () => Bluebird<any>; // @todo

    enableDevice: () => Bluebird<void>;
    disableDevice: () => Bluebird<void>;
    getFreeSizes: () => Bluebird<{
        users: number,
        logs: number,
        capacity: number
    }>;

    constructor(options: {
        ip: string;
        port?: number;
        inport: number;
        timeout: number;
        attendanceParser?: (data: any) => any;
        connectionType?: 'tcp' | 'udp';
    }) {
        this.zklib = new ZKLib(options);

        this.createSocket = this._createPromisify('createSocket');
        this.closeSocket = this._createPromisify('closeSocket');

        // connect
        this.connect = this._createPromisify('connect');
        this.disconnect = this._createPromisify('disconnect');

        // serial
        this.serialNumber = this._createPromisify('serialNumber');

        // version
        this.version = this._createPromisify('version');

        // time
        this.getTime = this._createPromisify('getTime');
        this.setTime = this._createPromisify('setTime');

        // attendance
        this.getAttendance = this._createPromisify('getAttendance');
        this.clearAttendanceLog = this._createPromisify('clearAttendanceLog');

        // user
        this.delUser = this._createPromisify('delUser');
        this.setUser = this._createPromisify('setUser');
        this.enrollUser = this._createPromisify('enrollUser');
        this.getUser = this._createPromisify('getUser');

        // device
        this.enableDevice = this._createPromisify('enableDevice');
        this.disableDevice = this._createPromisify('disableDevice');
        this.getFreeSizes = this._createPromisify('getFreeSizes');

        this.monitorConnection();
    }

    _createPromisify = <T>(method: keyof ZKLib): () => Bluebird<T> => {
        return Bluebird.promisify(this.zklib[method].bind(this.zklib));
    }

    monitorConnection = () => {
        // const onConnect = () => {
        //   this.isConnected = true
        // };
        // const onDisconnect = () => {
        //   this.isConnected = false;
        // };
        //
        // this.zklib.socket.on('connect', onConnect);
        // this.zklib.socket.on('close',onDisconnect)
        // return () => {
        //   this.zklib.socket.removeListener('connect', onConnect);
        //   this.zklib.socket.removeListener('connect', onDisconnect);
        // }
    }
}