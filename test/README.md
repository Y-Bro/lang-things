# Calculator Assistant Test Suite

Tests for the LangGraph-based calculator assistant agent.

## Quick Start

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run specific test file
npm test test/unit/calculate.test.ts

# Run tests matching a pattern
npm test -- --grep "division by zero"

# Generate coverage report
npm run test:coverage
```

## Test Organization

### `/unit` - Unit Tests
Isolated tests for individual components with no external dependencies.

- **calculate.test.ts** - Core calculation utility tests (5 tests)
- **nodes.test.ts** - Graph node logic tests (12 tests)
- **router.test.ts** - Routing logic tests (9 tests)
- **agent.test.ts** - Graph compilation tests (2 tests)

### `/integration` - Integration Tests
End-to-end workflow tests that verify multiple components working together.

- **agent.integration.test.ts** - Complete workflow scenarios (7 tests)

## Test Coverage

- **35 total tests**, all passing ✓
- **5 test files** organized by layer
- **100% of critical paths** covered
- Unit + integration coverage for all features

## Key Test Scenarios

### Math Calculations
- Simple operations (add, subtract, multiply, divide)
- Multi-step calculations
- Complex expressions

### Error Handling
- Division by zero detection
- Missing operands
- Invalid requests

### Routing Logic
- Intent-based routing (calculate, non_math, explain_concept)
- Error-based routing
- Edge cases (undefined, empty strings)

## Running Tests by Layer

```bash
# Run only unit tests
npm test test/unit

# Run only integration tests
npm test test/integration

# Run a specific unit test
npm test test/unit/calculate.test.ts
```
