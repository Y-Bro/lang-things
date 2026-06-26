import dotenv from 'dotenv'
import { testDummyGraph } from './dummy.js'
import { runCalculatorWorkflow } from './workflows/calculator.workflow.js'
import { runCalculatorAssistantWorfklow } from './workflows/calculator-assistant.js'
dotenv.config()

// const dummyresult = await testDummyGraph('Oh the misery')

// console.log(dummyresult)

const calculatorWorkflow = async () => {
  try {
    await runCalculatorAssistantWorfklow('explain markov chains')
  } catch (error: any) {
    console.log(error.data.error.details[0].fieldViolations)
  }
}
calculatorWorkflow()
