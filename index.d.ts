import type { Socket as TCPSocket } from 'react-native-tcp';
import type { Socket as UDPSocket } from 'react-native-udp';

export enum Commands {
    CONNECT = 1000,
    EXIT = 1001,
    ENABLE_DEVICE = 1002,
    DISABLE_DEVICE = 1003,
    RESTART = 1004,
    POWEROFF = 1005,
    SLEEP = 1006, // Ensure the machine to be at the idle state
    RESUME = 1007, // Awakens the sleep machine (temporarily not to support)
    CAPTUREFINGER = 1009, // Captures fingerprints picture
    TEST_TEMP = 1011, // Test some fingerprint exist or does not
    CAPTUREIMAGE = 1012, // Capture the entire image
    REFRESHDATA = 1013, // Refresh the machine interior data
    REFRESHOPTION = 1014, // Refresh the configuration parameter
    TESTVOICE = 1017, // Play voice
    VERSION = 1100, // Obtain the firmware edition
    CHANGE_SPEED = 1101, // Change transmission speed
    AUTH = 1102, // Connection authorizations
    ACK_OK = 2000,
    ACK_ERROR = 2001,
    ACK_DATA = 2002,
    ACK_OK_2 = 2005,
    PREPARE_DATA = 1500,
    DATA = 1501,
    FREE_DATA = 1502, // Clear machine opened buffer
    USER_WRQ = 8,
    USERTEMP_RRQ = 9,
    ATTLOG_RRQ = 13,
    CLEAR_DATA = 14,
    CLEAR_ATTLOG = 15,
    DELETE_USER = 18,
    WRITE_LCD = 66,
    GET_TIME = 201,
    SET_TIME = 202,
    DEVICE = 11,
    CLEAR_ADMIN = 20,
    START_ENROLL = 61,
    GET_FREE_SIZES = 50,
    TZ_RRQ = 27,
    TZ_WRQ = 28,
    UNLOCK = 31,
    REG_EVENT = 500, // Register the Event
}

export enum Levels {
    USER = 0,
    ADMIN = 14,
}

export enum States {
    FIRST_PACKET = 1,
    PACKET = 2,
    FINISHED = 3,
}

export const USHRT_MAX = 65535;

export type CallbackError = (error?: Error) => void;
export type DefaultCallback = <T>(error: Error | null, data: T) => void;
export type Message = string | Uint8Array | Buffer;

export class ZKLib {

    constructor(options: {
        ip: string;
        port?: number;
        inport: number;
        timeout: number;
        attendanceParser?: (data: any) => any;
        connectionType?: 'tcp' | 'udp';
    });

    validateOptions(): void;
    executeCmd(command: Commands, data: Message, cb: () => void): void;
    createSocket(cb?: CallbackError): void;
    createUdpSocket(port: number, cb?: CallbackError): UDPSocket;
    createTcpSocket(cb?: CallbackError): TCPSocket;
    writeUdpSocket(socket: UDPSocket, msg: Message, offset: number, length: number, cb?: CallbackError): void;
    writeTcpSocket(socket: TCPSocket, msg: Message, offset: number, length: number, cb?: CallbackError): void
    closeSocket(): void;
    closeUdpSocket(): void;
    closeTcpSocket(): void;


    /**
     * START OF ZKCONNECT
     */
    connect(cb?: CallbackError): void;
    disconnect(cb?: CallbackError): void;

    /**
     * START OF ZKSERIAL
     */
    serialNumber(cb: DefaultCallback<string>): void;

    /**
     * START OF ZKVERSION
     */
    version(cb: DefaultCallback<string>): void;

    /**
     * START OF ZKTIME
     */
    getTime(cb: DefaultCallback<Date>): void;
    setTime(time: Date, cb: CallbackError): void;

    /**
     * START OF ZKATTENDANCE
     */
    decodeAttendanceData(data: any): any;
    getAttendance(cb: DefaultCallback<any>): void;
    clearAttendanceLog(cb: CallbackError): void;

    /**
     * START OF ZKUSER
     */
    decodeUserData(userdata): any;
    delUser(uid: number, cb?: CallbackError): void;
    setUser(uid: number, password = '', name = '', user_id: number, cb?: CallbackError): void;
    enrollUser(uid: number, cb?: CallbackError): void;
    getUser(cb: DefaultCallback<any[]>): void;

    /**
     * START OF ZKMON
     */
    decodeAttLog(buf: any): any;
    startMon(options: object): void; // Untested

    /**
     * START OF ZKDEVICE
     */
    enableDevice(cb?: CallbackError): void;
    disableDevice(cb?: CallbackError): void;
    getFreeSizes(cb?: DefaultCallback<{
        users: number,
        logs: number,
        capacity: number
    }>): void;
}

export default ZKLib;