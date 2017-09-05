import * as ts from 'typescript'

import {
  FunctionType,
  SyntaxType,
} from '@creditkarma/thrift-parser'

export function createVoidType(): ts.TypeNode {
  return ts.createKeywordTypeNode(ts.SyntaxKind.VoidKeyword)
}

export function createStringType(): ts.KeywordTypeNode {
  return ts.createKeywordTypeNode(ts.SyntaxKind.StringKeyword)
}

export function createNumberType(): ts.KeywordTypeNode {
  return ts.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword)
}

export function createBooleanType(): ts.KeywordTypeNode {
  return ts.createKeywordTypeNode(ts.SyntaxKind.BooleanKeyword)
}

export function createTypeProperty(name: string, type: ts.TypeNode): ts.PropertySignature {
  return ts.createPropertySignature(
    undefined, // modifiers
    name, // name of property
    undefined, // question token if optional
    type, // type of property
    undefined, // initializer value
  )
}

/**
 * Creates type annotations for Thrift types
 *
 * EXAMPLE
 *
 * // thrift
 * const bool FALSE_CONST = false
 *
 * // typescript
 * const FALSE_CONST: boolean = false
 *
 * This function provides the ': boolean' bit.
 *
 * Container types:
 *
 * SetType | MapType | ListType
 *
 * Base types:
 *
 * SyntaxType.StringKeyword | SyntaxType.DoubleKeyword | SyntaxType.BoolKeyword |
 * SyntaxType.I8Keyword | SyntaxType.I16Keyword | SyntaxType.I32Keyword |
 * SyntaxType.I64Keyword | SyntaxType.BinaryKeyword | SyntaxType.ByteKeyword;
 *
 * Function types:
 *
 * SyntaxType.VoidKeyword
 */
export function typeNodeForFieldType(fieldType: FunctionType): ts.TypeNode {
  switch (fieldType.type) {
    case SyntaxType.Identifier:
      return ts.createTypeReferenceNode(fieldType.value, undefined)

    case SyntaxType.SetType:
      return ts.createTypeReferenceNode(
        'Set',
        [ typeNodeForFieldType(fieldType.valueType) ],
      )

    case SyntaxType.MapType:
      return ts.createTypeReferenceNode(
        'Map',
        [ typeNodeForFieldType(fieldType.keyType), typeNodeForFieldType(fieldType.valueType) ],
      )

    case SyntaxType.ListType:
      return ts.createTypeReferenceNode(
        'Array',
        [ typeNodeForFieldType(fieldType.valueType) ],
      )

    case SyntaxType.StringKeyword:
      return createStringType()

    case SyntaxType.BoolKeyword:
      return createBooleanType()

    case SyntaxType.DoubleKeyword:
    case SyntaxType.I8Keyword:
    case SyntaxType.I16Keyword:
    case SyntaxType.I32Keyword:
    case SyntaxType.I64Keyword:
    case SyntaxType.BinaryKeyword:
    case SyntaxType.ByteKeyword:
      return createNumberType()

    case SyntaxType.VoidKeyword:
      return createVoidType()

    default:
      const msg: never = fieldType
      throw new Error(`Non-exhaustive match for: ${msg}`)
  }
}

export function constructorNameForFieldType(fieldType: FunctionType): ts.Identifier {
  switch (fieldType.type) {
    case SyntaxType.Identifier:
      return ts.createIdentifier(fieldType.value)

    case SyntaxType.SetType:
      return ts.createIdentifier('Set')

    case SyntaxType.MapType:
      return ts.createIdentifier('Map')

    case SyntaxType.ListType:
      return ts.createIdentifier('Array')

    case SyntaxType.StringKeyword:
      return ts.createIdentifier('String')

    case SyntaxType.BoolKeyword:
      return ts.createIdentifier('Boolean')

    case SyntaxType.DoubleKeyword:
    case SyntaxType.I8Keyword:
    case SyntaxType.I16Keyword:
    case SyntaxType.I32Keyword:
    case SyntaxType.I64Keyword:
    case SyntaxType.BinaryKeyword:
    case SyntaxType.ByteKeyword:
      return ts.createIdentifier('Number')

    case SyntaxType.VoidKeyword:
      return ts.createIdentifier('void')

    default:
      const msg: never = fieldType
      throw new Error(`Non-exhaustive match for: ${msg}`)
  }
}

export type TProtocolException =
  'TProtocolExceptionType.UNKNOWN' | 'TProtocolExceptionType.INVALID_DATA' | 'TProtocolExceptionType.NEGATIVE_SIZE' |
  'TProtocolExceptionType.SIZE_LIMIT' | 'TProtocolExceptionType.BAD_VERSION' | 'TProtocolExceptionType.NOT_IMPLEMENTED' |
  'TProtocolExceptionType.DEPTH_LIMIT'

export type TApplicationException =
  'TApplicationExceptionType.UNKNOWN' | 'TApplicationExceptionType.UNKNOWN_METHOD' | 'TApplicationExceptionType.INVALID_MESSAGE_TYPE' |
  'TApplicationExceptionType.WRONG_METHOD_NAME' | 'TApplicationExceptionType.BAD_SEQUENCE_ID' | 'TApplicationExceptionType.MISSING_RESULT' |
  'TApplicationExceptionType.INTERNAL_ERROR' | 'TApplicationExceptionType.PROTOCOL_ERROR' | 'TApplicationExceptionType.INVALID_TRANSFORM' |
  'TApplicationExceptionType.INVALID_PROTOCOL' | 'TApplicationExceptionType.UNSUPPORTED_CLIENT_TYPE'

export type ThriftTypeAccess =
  'Type.STRUCT' | 'Type.SET' | 'Type.MAP' | 'Type.LIST' | 'Type.STRING' |
  'Type.BOOL' | 'Type.DOUBLE' | 'Type.BYTE' | 'Type.I16' | 'Type.I32' |
  'Type.I64' | 'Type.VOID'

/**
 * Gets the type access for the 'Thrift' object for a given FieldType.
 *
 * This could and should probably be a map of FieldType -> ThriftAccess.
 * However, using a switch statement gives us the safety of exhaustive matching
 * for FieldTypes.
 *
 * @todo Clean up so that we can use the strictNullChecks compiler flag which
 * would allow us to use a map and get the same safety as the switch.
 *
 * @param fieldType
 */
function thriftAccessForFieldType(fieldType: FunctionType): ThriftTypeAccess {
  switch (fieldType.type) {
    case SyntaxType.Identifier:
      return 'Type.STRUCT'

    case SyntaxType.SetType:
      return 'Type.SET'

    case SyntaxType.MapType:
      return 'Type.MAP'

    case SyntaxType.ListType:
      return 'Type.LIST'

    case SyntaxType.BinaryKeyword:
    case SyntaxType.StringKeyword:
      return 'Type.STRING'

    case SyntaxType.BoolKeyword:
      return 'Type.BOOL'

    case SyntaxType.DoubleKeyword:
      return 'Type.DOUBLE'

    case SyntaxType.I8Keyword:
    case SyntaxType.ByteKeyword:
      return 'Type.BYTE'

    case SyntaxType.I16Keyword:
      return 'Type.I16'

    case SyntaxType.I32Keyword:
      return 'Type.I32'

    case SyntaxType.I64Keyword:
      return 'Type.I64'

    case SyntaxType.VoidKeyword:
      return 'Type.VOID'

    default:
      const msg: never = fieldType
      throw new Error(`Non-exhaustive match for: ${msg}`)
  }
}

/**
 * For the given FieldType what is the corresponding enum defined in the Thrift library
 *
 * if (fieldType.type === SyntaxType.I16Keyword) {
 *   return 'Thrift.Type.I16'
 * }
 *
 * @param fieldType
 */
export function thriftPropertyAccessForFieldType(fieldType: FunctionType): ts.PropertyAccessExpression {
  return ts.createPropertyAccess(
    ts.createIdentifier('Thrift'),
    thriftAccessForFieldType(fieldType),
  )
}
