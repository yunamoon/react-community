import { createSlice} from "@reduxjs/toolkit";


// 초기 상태 정의
const initialState = {
  posts: [], // 게시글 목록을 저장하는 배열
  status: 'idle', // 데이터 로딩 상태를 표시하는 문자열 ('idle', 'loading', 'succeeded', 'failed')
  error: null, // 에러 메시지를 저장하는 변수
};

// Redux 슬라이스 생성
export const postSlice = createSlice({
  name: "posts", // 슬라이스 이름
  initialState, // 초기 상태
  reducers: {
    // 게시글 생성 액션
    createPost: (state, action) => {
      state.posts.unshift(action.payload); // 게시글을 배열의 맨 앞에 추가
    },
    // 게시글 목록 설정 액션
    setPosts: (state, action) => {
      state.posts = action.payload; // 게시글 목록을 설정
    },
    // 게시글 삭제 액션
    deletePost: (state, action) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload); // 특정 ID를 가진 게시글을 배열에서 제거
    },
    // 댓글 추가 액션
    addComment: (state, action) => {
      const { postId, comment } = action.payload; // 액션 페이로드에서 게시글 ID와 댓글 가져오기
      const post = state.posts.find((post) => post.id === postId); // 해당 ID를 가진 게시글 찾기
      if (post) {
        post.comments.push(comment); // 게시글의 댓글 배열에 새로운 댓글 추가
      }
    },
  }
});

// 액션 생성자를 내보냄
export const { createPost, deletePost, addComment , setPosts} = postSlice.actions;

// 리듀서를 내보냄
export default postSlice.reducer;
