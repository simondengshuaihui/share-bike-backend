// 定义type

const SWITCH_MENU = "SWITCH_MENU";
const initState = { menuName: "首页" };
// 定义reducer
export function reducer(state = initState, action) {
  switch (action.type) {
    case SWITCH_MENU:
      console.log(action);
      return {
        ...state,
        menuTitle: action.payload
      };
    default:
      return state;
  }
}

// 定义action
export function changeMenuTitle(data) {
  return {
    type: "SWITCH_MENU",
    payload: data
  };
}

// //dispatch定义的action
// export function changeTitle(data) {}
