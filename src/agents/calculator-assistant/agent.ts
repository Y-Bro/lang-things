import { END, START, StateGraph } from '@langchain/langgraph'
import { CalculatorAssistantState } from './state.js'
import {
  buildResponseNode,
  classifyRequestNode,
  executeCalculationNode,
  llmCallNode,
  parseCalculationNode,
} from './nodes.js'
import { routeAfterClassification } from './router.js'

const calculatorAssistantAgent = new StateGraph(CalculatorAssistantState)
  // .addNode('llmCallNode', llmCallNode)
  .addNode('classifier', classifyRequestNode)
  .addNode('parse', parseCalculationNode)
  .addNode('calculate', executeCalculationNode)
  .addNode('finalResult', buildResponseNode)
  .addEdge(START, 'classifier')
  .addConditionalEdges('classifier', routeAfterClassification, ['parse'])
  .addEdge('parse', 'calculate')
  .addEdge('calculate', 'finalResult')
  .addEdge('finalResult', END)
  .compile()

export { calculatorAssistantAgent }
