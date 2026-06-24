import { END, START, StateGraph } from '@langchain/langgraph'
import { CalculatorAssistantState } from './state.js'
import {
  buildResponseNode,
  classifyRequestNode,
  executeCalculationNode,
  explainConceptNode,
  llmCallNode,
  parseCalculationNode,
  rejectNonMathNode,
} from './nodes.js'
import { routeAfterClassification } from './router.js'

const calculatorAssistantAgent = new StateGraph(CalculatorAssistantState)
  // .addNode('llmCallNode', llmCallNode)
  .addNode('classifier', classifyRequestNode)
  .addNode('parse', parseCalculationNode)
  .addNode('calculate', executeCalculationNode)
  .addNode('finalResult', buildResponseNode)
  .addNode('reject', rejectNonMathNode)
  .addNode('explain', explainConceptNode)
  .addEdge(START, 'classifier')
  .addConditionalEdges('classifier', routeAfterClassification, ['parse', 'reject', 'explain'])
  .addEdge('parse', 'calculate')
  .addEdge('calculate', 'finalResult')
  .addEdge('reject', 'finalResult')
  .addEdge('explain', 'finalResult')
  .addEdge('finalResult', END)
  .compile()

export { calculatorAssistantAgent }
