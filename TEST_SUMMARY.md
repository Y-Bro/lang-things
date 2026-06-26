# Calculator Assistant Test Suite

## Overview
Comprehensive test suite for the calculator assistant agent built with LangGraph. Tests cover the full workflow from request classification through calculation execution and response building.

## Test Files Created

### Directory Structure
```
test/
├── unit/
│   ├── calculate.test.ts        (5 tests)
│   ├── nodes.test.ts            (12 tests)
│   ├── router.test.ts           (9 tests)
│   └── agent.test.ts            (2 tests)
└── integration/
    └── agent.integration.test.ts (7 tests)
```

### 1. **test/unit/calculate.test.ts** (5 tests)
Unit tests for the core calculation utility function.

#### Tests:
- ✓ Basic calculation: (3 + 26) / 16 = 1.8125
- ✓ Division by zero error handling
- ✓ Missing operand error handling
- ✓ Non-math rejection (empty requests)
- ✓ Concept explanation path (empty steps)

### 2. **test/unit/nodes.test.ts** (12 tests)
Unit tests for individual graph nodes that don't depend on external API calls.

#### Tests:
**executeCalculationNode**
- ✓ Simple addition (3 + 26 = 29)
- ✓ Multi-step calculations ((3 + 26) / 16 = 1.8125)
- ✓ Division by zero detection
- ✓ Missing calculation request handling
- ✓ Multiplication (7 * 8 = 56)
- ✓ Subtraction (50 - 25 = 25)

**buildResponseNode**
- ✓ Calculation result formatting
- ✓ Concept explanation formatting
- ✓ Non-math rejection response
- ✓ Error message handling
- ✓ Error priority over results

**rejectNonMathNode**
- ✓ Non-math rejection response generation

**explainConceptNode**
- ✓ Concept explanation generation

### 3. **test/unit/router.test.ts** (9 tests)
Tests for conditional routing logic between graph nodes.

#### Tests:
**routeAfterClassification**
- ✓ Route to 'parse' for calculate intent
- ✓ Route to 'reject' for non_math intent
- ✓ Route to 'explain' for explain_concept intent
- ✓ Route to END for unknown intent

**routeAfterParse**
- ✓ Route to 'finalResult' when error exists
- ✓ Route to 'calculate' when no error
- ✓ Handle undefined errors
- ✓ Handle empty string errors
- ✓ Route on specific error messages (division by zero)

### 4. **test/unit/agent.test.ts** (2 tests)
Graph structure validation tests.

#### Tests:
- ✓ Agent is properly compiled
- ✓ Graph contains expected nodes

### 5. **test/integration/agent.integration.test.ts** (7 tests)
Integration tests that simulate complete workflow paths.

#### Tests:
**Happy Path: Math Calculation**
- ✓ Complete flow: classify → parse → execute → respond

**Error Path: Division by Zero**
- ✓ Error detection and propagation through workflow

**Non-Math Path**
- ✓ Proper rejection of non-math queries

**Concept Explanation Path**
- ✓ Concept explanation generation and response

**Complex Calculations**
- ✓ (5 * 4 + 10) / 2 = 15
- ✓ 100 - 25 * 2 = 150

## Test Coverage Summary

| Component | Tests | Status |
|-----------|-------|--------|
| Calculation Utility | 5 | ✓ All Pass |
| Execution Node | 6 | ✓ All Pass |
| Response Building | 5 | ✓ All Pass |
| Router Logic | 9 | ✓ All Pass |
| Graph Structure | 2 | ✓ All Pass |
| Integration Flows | 7 | ✓ All Pass |
| **Total** | **35** | **✓ All Pass** |

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with UI
npm run test:ui

# Generate coverage report
npm run test:coverage
```

## Key Test Scenarios Covered

### Happy Paths
- ✓ Simple calculations (add, subtract, multiply, divide)
- ✓ Multi-step calculations with previous value usage
- ✓ Concept explanations
- ✓ Non-math query rejection

### Error Handling
- ✓ Division by zero detection
- ✓ Missing operands
- ✓ Missing calculation requests
- ✓ Parser errors

### Router Logic
- ✓ Intent-based routing (calculate, non_math, explain_concept)
- ✓ Error-based routing (parse errors route to final result)
- ✓ Proper edge case handling (undefined, empty strings)

### Complex Calculations
- ✓ Multi-operation sequences
- ✓ Using 'previous' value across operations
- ✓ Order of operations simulation
