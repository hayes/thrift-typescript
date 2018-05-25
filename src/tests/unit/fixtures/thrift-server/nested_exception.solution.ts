export interface ICode {
    status?: thrift.Int64;
    data?: Buffer;
}
export interface ICode_Loose {
    status?: number | thrift.Int64;
    data?: string | Buffer;
}
export const CodeCodec: thrift.IStructCodec<ICode_Loose, ICode> = {
    encode(args: ICode_Loose, output: thrift.TProtocol): void {
        const obj = {
            status: (args.status != null ? (typeof args.status === "number" ? new thrift.Int64(args.status) : args.status) : thrift.Int64.fromDecimalString("200")),
            data: (args.data != null ? (typeof args.data === "string" ? Buffer.from(args.data) : args.data) : Buffer.from("data"))
        };
        output.writeStructBegin("Code");
        if (obj.status != null) {
            output.writeFieldBegin("status", thrift.TType.I64, 1);
            output.writeI64(obj.status);
            output.writeFieldEnd();
        }
        if (obj.data != null) {
            output.writeFieldBegin("data", thrift.TType.STRING, 2);
            output.writeBinary(obj.data);
            output.writeFieldEnd();
        }
        output.writeFieldStop();
        output.writeStructEnd();
        return;
    },
    decode(input: thrift.TProtocol): ICode {
        let _args: any = {};
        input.readStructBegin();
        while (true) {
            const ret: thrift.IThriftField = input.readFieldBegin();
            const fieldType: thrift.TType = ret.fieldType;
            const fieldId: number = ret.fieldId;
            if (fieldType === thrift.TType.STOP) {
                break;
            }
            switch (fieldId) {
                case 1:
                    if (fieldType === thrift.TType.I64) {
                        const value_1: thrift.Int64 = input.readI64();
                        _args.status = value_1;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 2:
                    if (fieldType === thrift.TType.STRING) {
                        const value_2: Buffer = input.readBinary();
                        _args.data = value_2;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                default: {
                    input.skip(fieldType);
                }
            }
            input.readFieldEnd();
        }
        input.readStructEnd();
        return {
            status: (_args.status != null ? _args.status : thrift.Int64.fromDecimalString("200")),
            data: (_args.data != null ? _args.data : Buffer.from("data"))
        };
    }
};
export class Code extends thrift.StructLike  implements ICode {
    public status?: thrift.Int64 = thrift.Int64.fromDecimalString("200");
    public data?: Buffer = Buffer.from("data");
    constructor(args: ICode_Loose = {}) {
        super();
        if (args.status != null) {
            const value_3: thrift.Int64 = (typeof args.status === "number" ? new thrift.Int64(args.status) : args.status);
            this.status = value_3;
        }
        if (args.data != null) {
            const value_4: Buffer = (typeof args.data === "string" ? Buffer.from(args.data) : args.data);
            this.data = value_4;
        }
    }
    public static read(input: thrift.TProtocol): Code {
        return new Code(CodeCodec.decode(input));
    }
    public write(output: thrift.TProtocol): void {
        return CodeCodec.encode(this, output);
    }
}
export interface IMyException {
    description: string;
    code?: ICode;
}
export interface IMyException_Loose {
    description: string;
    code?: ICode_Loose;
}
export const MyExceptionCodec: thrift.IStructCodec<IMyException_Loose, IMyException> = {
    encode(args: IMyException_Loose, output: thrift.TProtocol): void {
        const obj = {
            description: args.description,
            code: args.code
        };
        output.writeStructBegin("MyException");
        if (obj.description != null) {
            output.writeFieldBegin("description", thrift.TType.STRING, 1);
            output.writeString(obj.description);
            output.writeFieldEnd();
        }
        else {
            throw new thrift.TProtocolException(thrift.TProtocolExceptionType.UNKNOWN, "Required field[description] is unset!");
        }
        if (obj.code != null) {
            output.writeFieldBegin("code", thrift.TType.STRUCT, 3);
            CodeCodec.encode(obj.code, output);
            output.writeFieldEnd();
        }
        output.writeFieldStop();
        output.writeStructEnd();
        return;
    },
    decode(input: thrift.TProtocol): IMyException {
        let _args: any = {};
        input.readStructBegin();
        while (true) {
            const ret: thrift.IThriftField = input.readFieldBegin();
            const fieldType: thrift.TType = ret.fieldType;
            const fieldId: number = ret.fieldId;
            if (fieldType === thrift.TType.STOP) {
                break;
            }
            switch (fieldId) {
                case 1:
                    if (fieldType === thrift.TType.STRING) {
                        const value_5: string = input.readString();
                        _args.description = value_5;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 3:
                    if (fieldType === thrift.TType.STRUCT) {
                        const value_6: ICode = CodeCodec.decode(input);
                        _args.code = value_6;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                default: {
                    input.skip(fieldType);
                }
            }
            input.readFieldEnd();
        }
        input.readStructEnd();
        if (_args.description !== undefined) {
            return {
                description: _args.description,
                code: _args.code
            };
        }
        else {
            throw new thrift.TProtocolException(thrift.TProtocolExceptionType.UNKNOWN, "Unable to read MyException from input");
        }
    }
};
export class MyException extends thrift.StructLike  implements IMyException {
    public description: string;
    public code?: ICode;
    constructor(args: IMyException_Loose) {
        super();
        if (args.description != null) {
            const value_7: string = args.description;
            this.description = value_7;
        }
        else {
            throw new thrift.TProtocolException(thrift.TProtocolExceptionType.UNKNOWN, "Required field[description] is unset!");
        }
        if (args.code != null) {
            const value_8: ICode = new Code(args.code);
            this.code = value_8;
        }
    }
    public static read(input: thrift.TProtocol): MyException {
        return new MyException(MyExceptionCodec.decode(input));
    }
    public write(output: thrift.TProtocol): void {
        return MyExceptionCodec.encode(this, output);
    }
}