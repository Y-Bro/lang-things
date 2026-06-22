import { StateSchema, MessagesValue, type GraphNode, StateGraph, START, END } from '@langchain/langgraph'

const State = new StateSchema({
  message: MessagesValue,
})

const mockLlm: GraphNode<typeof State> = state => {
  return { message: [{ role: 'ai', content: 'Hellow world' }] }
}

const graph = new StateGraph(State)
  .addNode('mock_llm', mockLlm)
  .addEdge(START, 'mock_llm')
  .addEdge('mock_llm', END)
  .compile()

const testDummyGraph = async (text: string): Promise<{ message: (typeof MessagesValue)['ValueType'] }> => {
  const test = await graph.invoke({
    message: [{ role: 'ai', content: text }],
  })

  return test
}

export { testDummyGraph }
