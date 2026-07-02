import { JsonOutputParser } from "@langchain/core/output_parsers";

export const createJsonOutputParser = () => new JsonOutputParser();
