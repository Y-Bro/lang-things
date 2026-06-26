import { describe, it, expect } from 'vitest'
import { calculatorAssistantAgent } from '../../src/agents/calculator-assistant/agent'

describe('Calculator Assistant Agent', () => {
  it('should be a valid compiled graph', () => {
    expect(calculatorAssistantAgent).toBeDefined()
    expect(typeof calculatorAssistantAgent.invoke).toBe('function')
  })

  it('should have graph structure with expected nodes', () => {
    // Verify the graph has the expected nodes compiled
    const graphNodes = Object.keys(calculatorAssistantAgent.nodes || {})
    expect(graphNodes.length).toBeGreaterThan(0)
  })
})
