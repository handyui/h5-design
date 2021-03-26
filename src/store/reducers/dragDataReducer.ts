import { Reducer } from 'redux'
import { IAction } from '../types'
import { getStorage } from '@/utils'
import componetList from '@/components/componentConfig/config'

// Actions
const DATA_LIST = 'DATA_LIST';
const SELECT_ITEM = 'SELECT_ITEM';
const SELECT_REACT_NODE_CONFIG = 'SELECT_REACT_NODE_CONFIG';
const CONFIG = 'CONFIG';

export interface layoutState {
    dragDataList: any // 选项卡内容存储
    selectItem: any
    selectReactNodeConfig: any
    config: any
    [key:string]: any
}

const dragData = getStorage('dragData')
// Initial Data
const initialState = {
    dragDataList: dragData.length>0? dragData: [
        componetList[3], componetList[5], componetList[4]
    ],
    selectItem: null,
    selectReactNodeConfig: null,
    config: null
};

// Reducer
const reducer: Reducer<layoutState, IAction<any>> = ( state = initialState, action: IAction<any>) => {
    switch (action.type) {
        case DATA_LIST:
            return {
                ...state,
                dragDataList: action.payload
            }
        case SELECT_ITEM:
            return {
                ...state,
                selectItem: action.payload
            }
        case SELECT_REACT_NODE_CONFIG:
            return {
                ...state,
                selectConfig: action.payload
            }
        case CONFIG:
            return {
                ...state,
                config: action.payload
            }
        default:
            return state
    }
}

// Action Creators
export const setDragDatas = (data:any) => ({type: DATA_LIST, payload: data})
export const setSelectItem = (data:any) => ({type: SELECT_ITEM, payload: data});
export const selectReactNodeConfig = (data:any) => ({type: SELECT_REACT_NODE_CONFIG, payload: data});
export const setConfig = (data:any) => ({type: CONFIG, payload: data});



// // 新增选项卡操作
// export const addTab=(data:any)=>{
//     return async (dispatch:any) => {
//         dispatch(setPanes(data))
//     }
// }

// Thunks
// export const initializeApp = () => (dispatch) => {
//     const promiseArray = [];
//     if (isLogged()) promiseArray.push(dispatch(getProfile(getRole())));
  
//     dispatch(toggleIsDataFetching(true));
  
//     Promise.all(promiseArray)
//       .then(() => {
//         dispatch(toggleIsDataFetching(false));
//         dispatch(initializedSuccess());
//       })
//       .catch((error) => serverErrorHelper(dispatch, error));
//   };

export default reducer;