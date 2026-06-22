import { testDummyGraph } from './dummy.js'
import { tools, toolsByName } from './tools/registry.js'
import { runCalculatorWorkflow } from './workflows/calculator.workflow.js'

const dummyresult = await testDummyGraph('Oh the misery')

console.log(dummyresult)

const calculatorWorkflow = async () => {
  await runCalculatorWorkflow('Add 3 and 26')
}
calculatorWorkflow()
