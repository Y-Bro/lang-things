import { END, START, StateGraph } from '@langchain/langgraph'
import { CalculatorAssistantState } from './state.js'
import { classifyRequestNode, executeCalculationNode, llmCallNode, parseCalculationNode } from './nodes.js'

const calculatorAssistantAgent = new StateGraph(CalculatorAssistantState)
  // .addNode('llmCallNode', llmCallNode)
  .addNode('classifier', classifyRequestNode)
  .addNode('parse', parseCalculationNode)
  .addNode('calculate', executeCalculationNode)
  .addEdge(START, 'classifier')
  .addEdge('classifier', 'parse')
  .addEdge('parse', 'calculate')
  .addEdge('calculate', END)
  .compile()

export { calculatorAssistantAgent }
