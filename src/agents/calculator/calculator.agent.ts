import { END, START, StateGraph } from '@langchain/langgraph'
import { CalculatorState } from './calculator.state.js'
import { llmCallNode, toolNode } from './calculator.nodes.js'
import { shouldContinue } from './calculator.router.js'

const calculatorAgent = new StateGraph(CalculatorState)
  .addNode('llmCallNode', llmCallNode)
  .addNode('toolNode', toolNode)
  .addEdge(START, 'llmCallNode')
  .addConditionalEdges('llmCallNode', shouldContinue, ['toolNode', END])
  .addEdge('toolNode', 'llmCallNode')
  .compile()

export { calculatorAgent }
