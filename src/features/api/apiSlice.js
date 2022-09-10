import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://simple-lws-todo-server.herokuapp.com",
  }),
  tagTypes: ["InCompletedTodos"],
  endpoints: (builder) => ({
    getInCompletedTodos: builder.query({
      query: () => "/todos?completed_like=false",
      keepUnusedDataFor: 600,
      providesTags: ["InCompletedTodos"],
    }),
    getCompletedTodos: builder.query({
      query: () => "/todos?completed_like=true",
    }),
    addTodo: builder.mutation({
      query: (data) => ({
        url: "/todos",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["InCompletedTodos"],
    }),
    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `/todos/${id}`,
        method: "DELETE",
      }),
      providesTags: (result, error, id) => [{ type: "DeleteTodo", id }],
      invalidatesTags: ["InCompletedTodos"],
    }),
    updateTodoColor: builder.mutation({
      query: ({ id, color }) => ({
        url: `/todos/${id}`,
        method: "PATCH",
        body: { color },
      }),
      invalidatesTags: ["InCompletedTodos"],
    }),
    makeCompleted: builder.mutation({
      query: (id) => ({
        url: `/todos/${id}`,
        method: "PATCH",
        body: { completed: true },
      }),
      invalidatesTags: ["InCompletedTodos"],
    }),
    // filterByStatus: builder.mutation({
    //     query: () =>
    // })
  }),
});

export const {
  useGetInCompletedTodosQuery,
  useGetCompletedTodosQuery,
  useAddTodoMutation,
  useDeleteTodoMutation,
  useUpdateTodoColorMutation,
} = apiSlice;
