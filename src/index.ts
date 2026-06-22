import { testDummyGraph } from './dummy.js'
import { tools, toolsByName } from './tools/registry.js'

const dummyresult = await testDummyGraph('Oh the misery')
console.log(dummyresult)
