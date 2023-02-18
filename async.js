const redux = require("redux")
const createStore = redux.createStore
const applyMiddlewere = redux.applyMiddleware
const thunkMiddlewere = require("redux-thunk").default
const axios = require("axios")


//initial state
const initialState={
    loading:false,
    users:[],
    error:'',
}

const FETCH_USER_REQUESTED   ="FETCH_USER_REQUESTED"
const FETCH_USER_SUCCED   ="FETCH_USER_SUCCED"
const FETCH_USER_FAILED   ="FETCH_USER_FAILED"


//actions
const fetchUserRequested=()=>{
    return{
        type:FETCH_USER_REQUESTED
    }
}

const fetchUserSuccess=(users)=>{
    return{
        type:FETCH_USER_SUCCED,
        payload:users
    }
}


const fetchUserFail=(error)=>{
    return{
        type:FETCH_USER_FAILED,
        payload:error
    }
}

//reducers

const reducer=(state=initialState,actions)=>{
    switch(actions.type){
        case FETCH_USER_REQUESTED:
            return{
                ...state,
                loading:true,
            }
        case FETCH_USER_SUCCED:
            return{
                loading:false,
                users:actions.payload,
                error:""
            }
        case FETCH_USER_FAILED:
            return{
                loading:false,
                users:[],
                error:actions.payload
            }
        default:
            return state        
    }
}

const fetchUser =()=>{
    return function(dispatch){
        dispatch(fetchUserRequested())
        axios.get('https://jsonplaceholder.typicode.com/users').then((response)=>{
            const users=response.data.map((user)=>user.id)
            dispatch(fetchUserSuccess(users))
        }).catch((error)=>{
            dispatch(fetchUserFail(error.message))
        })
    }
}


const store = createStore(reducer,applyMiddlewere(thunkMiddlewere))

store.subscribe(()=>{console.log(store.getState())})
store.dispatch(fetchUser())