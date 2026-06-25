const logNode =
  <TArgs extends unknown[], TReturn>(nodeName: string, nodeFn: (...args: TArgs) => TReturn) =>
  async (...args: TArgs) => {
    if (!process.env.DEBUG_GRAPH) {
      return await nodeFn(...args)
    }

    const [state] = args
    console.dir({ node: nodeName, phase: 'input', state }, { depth: null })
    const output = await nodeFn(...args)
    console.dir({ node: nodeName, phase: 'output', output }, { depth: null })

    return output
  }

export { logNode }
