import { combineReducers } from 'redux'
import counter from './counter';
import todos from './todos';

const rootReducer = combineReducers({
    counter,
    todos
});

// 루트 리듀서를 내보내자.
export default rootReducer;

// 루트 리듀서의 반환값을 유추하자.
// 추후 이 타입을 컨테이너 컴포넌트에서 불러와서 사용해야 하므로 내보내 주자.
export type RootState = ReturnType<typeof rootReducer>;
