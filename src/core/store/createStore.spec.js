import {CreateStore} from './createStore'

const initialState = {
  count: 0
}

const reducer = (action, state = initialState) => {
  if (action.type === 'ADD') {
    return {...state, count: state.count + 1}
  }
  return state
}

describe('CreateStore:', () => {
  let store
  beforeEach(() => {
    store = new CreateStore(reducer, initialState)
  })
  test('should store to be defined', () => {
    expect(store).toBeDefined()
    expect(store).toBeInstanceOf(Object)
  })
  test('should store return 3 methods', () => {
    expect(store.dispatch).toBeDefined()
    expect(store.subscribe).toBeDefined()
    expect(store.getState).not.toBeUndefined()
  })
  test('should change state if action exist', () => {
    store.dispatch({type: 'ADD'})
    expect(store.getState().count).toBe(1)
  })
  test('should NOT change state if action NOT exist', () =>{
    store.dispatch({type: 'WRONG_ACTION'})
    expect(store.getState()).toEqual(initialState)
  })
  test('should be called subscriber', () => {
    const mockFn = jest.fn(() => {})
    store.subscribe(mockFn)
    store.dispatch({type: 'ADD'})
    expect(mockFn).toBeCalled()
    expect(mockFn).toBeCalledWith(store.getState())
  })
  test('should NOT be called subscriber', () => {
    const mockFn = jest.fn()
    const sub = store.subscribe(mockFn)
    sub.unsubscribe.apply(store)
    store.dispatch({type: 'ADD'})
    expect(mockFn).not.toBeCalled()
  })
  test('should be called with async way', () => {
    return new Promise(resolve => {
      setTimeout(() => {
        store.dispatch({type: 'ADD'})
      }, 500)
      setTimeout(() => {
        expect(store.getState().count).toBe(1)
      }, 700)
      resolve()
    })
  })
})
