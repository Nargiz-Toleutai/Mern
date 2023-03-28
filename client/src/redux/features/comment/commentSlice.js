import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../utils/axios'

const initialState = {
    comments: [],
    loading: false,
}

export const createComment = createAsyncThunk(
    'comment/createComment',
    async ({ postId, comment }) => {
        try {
            const { data } = await axios.post(`/comments/${postId}`, {
                postId,
                comment,
            })
            return data
        } catch (error) {
            console.log(error)
        }
    },
)

export const getPostComments = createAsyncThunk(
    'comment/getPostComments',
    async (postId) => {
        try {
            const { data } = await axios.get(`/posts/comments/${postId}`)
            return data
        } catch (error) {
            console.log(error)
        }
    },
);

export const removeComment = createAsyncThunk(
    'comment/removeComment', 
    async(id) => {
        try {
            console.log({id})
            const { data } = await axios.delete(`/posts/comments/${id}`, id);
            
            return data;
        } catch (error) {
            console.log(error)
        }
})

export const updateComment = createAsyncThunk(
    'comment/updateComment', 
    async(updateComment) => {
        try {
            const { data } = await axios.put(`/posts/comments/${updateComment.id}`, updateComment);
            return data;
        } catch (error) {
            console.log(error)
        }
})

export const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {},
    extraReducers: {
        // Создание поста
        [createComment.pending]: (state) => {
            state.loading = true
        },
        [createComment.fulfilled]: (state, action) => {
            state.loading = false
            state.comments.push(action.payload)
        },
        [createComment.rejected]: (state) => {
            state.loading = false
        },
        // Получение комментов
        [getPostComments.pending]: (state) => {
            state.loading = true
        },
        [getPostComments.fulfilled]: (state, action) => {
            state.loading = false
            state.comments = action.payload
        },
        [getPostComments.rejected]: (state) => {
            state.loading = false
        },
        // Remove comment
        [removeComment.pending]: (state) => {
            state.loading = true
        },
        [removeComment.fulfilled]: (state, action) => {
            console.log({id: action.payload._id})
            state.loading = false
            state.comments = state.comments.filter((comment) => comment._id !== action.payload._id)
        },
        [removeComment.rejected]: (state) => {
            state.loading = false
        },
        // Update comment
        // [updateComment.pending]: (state) => {
        //     state.loading = true
        // },
        // [updateComment.fulfilled]: (state, action) => {
        //     state.loading = false
        //     const index = state.comments.findIndex((comment) => comment._id === action.payload._id );
        //     state.comments[index] = action.payload;
        // },
        // [updateComment.rejected]: (state) => {
        //     state.loading = false
        // },
    },
})

export default commentSlice.reducer