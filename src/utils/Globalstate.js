import React,{useReducer,useContext,createContext} from 'react';

const TodoContext = createContext({});

const {Provider}=TodoContext;

function reducer(state,action){
switch(action.type){
case "add":
    return [
        ...state,
        {id:state.length * Math.random(),name:action.name},
    ];

case "remove":
    return state.filter((_,index)=>{
       return index !== action.index;
    });   
   
case "prioritize":
  // eslint-disable-next-line 
    return state.map((item,index)=>{
    if(index === action.index){
        return {...item, priority:!item.priority};
      }
    })

    default:
    return state;
  }
}

function TodoProvider({...props}){
const [state,dispatch]=useReducer(reducer,[]);
return <Provider value={[state,dispatch]}{...props}/>;
}

function useTodoContext(){
 return useContext(TodoContext)
}

export {TodoProvider,useTodoContext};