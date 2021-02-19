//Redux 불러오기
//createStore : store만들어주는 Redux함수
import {createStore} from 'redux'; 

//redux에서 관리할 상태 초기화
const initialState = {
    counter : 0,
    text : '',
    list : []
};

//action type 정의
const INCREASE = 'INCREASE';
const DECREASE = 'DECREASE';
const CHANGE_TEXT = 'CHANGE_TEXT';
const ADD_TO_LIST = 'ADD_TO_LIST';

//action 생성 함수 (화살표 함수) 정의
const increase = () => ({
    //action 객체 만들어서 반환
    //화살표 함수 사용하면 return 생략 가능
        type : INCREASE,
});

const decrease = () => ({
    type : DECREASE,
});

//changeText(text)로 받으면, 리턴 값 { type : 'CHANGE_TEXT', text (파라미터) }
const changeText = text => ({
    type : CHANGE_TEXT,
    text
    //파라미터로 가져온 text를 그대로 사용
});

//addToList(item)로 받으면, 리턴값 { type : 'ADD_TO_LIST', item (파라미터)  }
const addToList = item => ({
    type : ADD_TO_LIST,
    item
    //파라미터로 가져온 item을 그대로 사용
});

//리덕스에서 초기상태 만들 때, reducer 한번 호출!!
//state에 기본값 설정 (리덕스에서 초기상태 만들 때, reducer 한번 호출   이때 초기상태 없으면 state = undifined => undifined인 state를 리턴)
function reducer(state = initialState, action) {
    switch(action.type) {       //파라미터로 받은 action의 타입
        case INCREASE : 
            return {
                ...state,
                //파라미터로 받은 state     //기존의 state값은 유지시키고
                counter : state.counter + 1,
                //state.counter + 1의 값을 counter에 저장
            };
        case DECREASE :
            return {
                ...state,
                counter : state.counter - 1,
            };
        case CHANGE_TEXT :
            return{
                ...state,                       //파라미터로 받은 state를 그대로 유지
                text : action.text,         //파라미터로 받은 action.text를 text에 저장
                //store.dispatch( { type : 'CHANGE_TEXT',  text : 'test' } )로 보낸걸 여기서 받을 예정
            };
        case ADD_TO_LIST :
            return{
                ...state,
                list : state.list.concat(action.item),      //파라미터로 받은 action.item을 state.list에 붙여서 list에 저장
                //store.dispatch( {  type : 'ADD_TO_LIST', item : { id : 2, text : 'test'}  })로 보낸걸 여기서 받을 예정
            };
        default :
            return state;
            //case에서 처리하지 못한 경우 : state를 그대로 유지
    }
};

//reducer를 이용해서 store생성
const store = createStore(reducer);

//store의 현재 상태 출력
console.log(store.getState());

//store에 구독하기 위해 listener함수 생성
const listener = () => {
    const state = store.getState();     //store 조회
    console.log(state);
};

//listener함수를 store에 구독
const unsubscribe = store.subscribe(listener);      //listener함수를 store에 구독.

//구독 해지하는 방법
//unsubscribe();

//action들을 dispatch
//action들이 dispatch될때 마다 (state가 업데이트 될때 마다), listener함수 호출. (listener를 store에 구독해서)
store.dispatch(increase());
store.dispatch(decrease());
store.dispatch(changeText('changeText함수의 파라미터'));        //changeText함수는 파라미터(text)를 받아서, 리턴 {  type : 'CHANGE_TEXT', text(파라미터) }
store.dispatch(addToList({ id : 1, text : 'addToList함수의 item의 text'}));

//store를 콘솔창의 store로 저장.
window.store = store;
//이후 콘솔창에서 store입력하면 store상태 나타남
//콘솔창에서 store.dispatch({ type : 'INCREASE' }); 입력하면 95행 dispatch => reducer함수 호출 (store상태 업데이트) => 구독한 listener 호출

//구독해지하는 unsubscribe를 콘솔창의 unsubscribe로 저장
window.unsubscribe = unsubscribe;
//콘솔창에 unsubscribe(); 호출하면 구독해지 됨      
//... 이후 콘솔창에 store.dispatch({ type : 'INCREASE' }); 하면 state는 변화하지만, listener는 호출 안됨 (즉, 콘솔창에 출력 안됨)