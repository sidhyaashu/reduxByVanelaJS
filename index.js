const redux = require("redux")
const createStore = redux.createStore
const bindActionCreators= redux.bindActionCreators
const reduxlogger = require("redux-logger")
const logger = reduxlogger.createLogger()
const applyMiddlewere = redux.applyMiddleware

//actions
const CAKE_ORDERED = "CAKE_ORDERED"
const CAKE_RESTOK = "CAKE_RESTOCK"
const ICE_ORDER= "ICE_ORDER"
const ICE_RESTOCK= "ICE_RESTOCK"

const orderCake=()=>{
    return{
        type:CAKE_ORDERED,
        payload:1,
    }
}

const restockCake=(qty=1)=>{
    return{
        type:CAKE_RESTOK,
        payload:qty
    }
}
const orderIce=(qty=1)=>{
    return{
        type:ICE_ORDER,
        payload:qty
    }
}

const restockIce=(qty=1)=>{
    return{
        type:ICE_RESTOCK,
        payload:qty
    }
}


//reducers

const initialState={
    numOfCake:10,
    numOfIce:20,
}

const reducer =(state=initialState,action)=>{
    switch (action.type) {
        case CAKE_ORDERED:
            return {
                ...state,
                numOfCake:state.numOfCake-1
            }
        case CAKE_RESTOK:
            return{
                ...state,
                numOfCake:state.numOfCake + action.payload
            }
        case ICE_ORDER:
            return {
                ...state,
                numOfIce:state.numOfIce-1
            }
        case ICE_RESTOCK:
            return{
                ...state,
                numOfIce:state.numOfIce + action.payload
            }   
        default:
            return state
    }
}


//store
const store= createStore(reducer,applyMiddlewere(logger))
console.log("Initialstore", store.getState())

const unsubscribr = store.subscribe(()=>{})

// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(restockCake(5))

const actions = bindActionCreators({orderCake,restockCake,orderIce,restockIce},store.dispatch)

actions.orderCake()
actions.orderCake()
actions.orderCake()
actions.restockCake(8)

actions.orderIce(1)
actions.orderIce(1)
actions.orderIce(1)
actions.restockIce(10)


unsubscribr()