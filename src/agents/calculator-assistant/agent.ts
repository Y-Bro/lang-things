import { END, START, StateGraph } from '@langchain/langgraph'
import { CalculatorAssistantState } from './state.js'
import {
  buildResponseNode,
  classifyRequestNode,
  executeCalculationNode,
  explainConceptNode,
  parseCalculationNode,
  rejectNonMathNode,
} from './nodes.js'
import { routeAfterClassification } from './router.js'
import { logNode } from '../../util/logging.js'

const calculatorAssistantAgent = new StateGraph(CalculatorAssistantState)
  // .addNode('llmCallNode', llmCallNode)
  .addNode('classifier', logNode('classifier', classifyRequestNode))
  .addNode('parse', logNode('parse', parseCalculationNode))
  .addNode('calculate', logNode('calculate', executeCalculationNode))
  .addNode('finalResult', logNode('finalResult', buildResponseNode))
  .addNode('reject', logNode('reject', rejectNonMathNode))
  .addNode('explain', logNode('explain', explainConceptNode))
  .addEdge(START, 'classifier')
  .addConditionalEdges('classifier', routeAfterClassification, ['parse', 'reject', 'explain'])
  .addEdge('parse', 'calculate')
  .addEdge('calculate', 'finalResult')
  .addEdge('reject', 'finalResult')
  .addEdge('explain', 'finalResult')
  .addEdge('finalResult', END)
  .compile()

export { calculatorAssistantAgent }
