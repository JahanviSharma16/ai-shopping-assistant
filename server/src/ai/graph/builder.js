import { END, START, StateGraph } from "@langchain/langgraph";
import { graphState } from "./state.js";
import { routeFromRouter } from "./edges.js";
import { routerNode } from "./nodes/router.node.js";
import { toolExecutorNode } from "./nodes/toolExecutor.node.js";
import { reasoningNode } from "./nodes/reasoning.node.js";
import { formatterNode } from "./nodes/formatter.node.js";

export const buildAiGraph = () =>
  new StateGraph(graphState)
    .addNode("router", routerNode)
    .addNode("toolExecutor", toolExecutorNode)
    .addNode("reasoning", reasoningNode)
    .addNode("formatter", formatterNode)
    .addEdge(START, "router")
    .addConditionalEdges("router", routeFromRouter, [
      "toolExecutor",
      "reasoning",
    ])
    .addEdge("toolExecutor", "reasoning")
    .addEdge("reasoning", "formatter")
    .addEdge("formatter", END)
    .compile();
