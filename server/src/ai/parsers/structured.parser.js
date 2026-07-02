import { StructuredOutputParser } from "@langchain/core/output_parsers";

export const createStructuredOutputParser = (schema) =>
  StructuredOutputParser.fromZodSchema(schema);
