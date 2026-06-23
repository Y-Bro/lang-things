import { END, START, StateGraph } from '@langchain/langgraph'
import { CalculatorAssistantState } from './state.js'
import { classifyRequestNode, llmCallNode } from './nodes.js'

const calculatorAssistantAgent = new StateGraph(CalculatorAssistantState)
  // .addNode('llmCallNode', llmCallNode)
  .addNode('classifier', classifyRequestNode)
  .addEdge(START, 'classifier')
  .addEdge('classifier', END)
  .compile()

export { calculatorAssistantAgent }
