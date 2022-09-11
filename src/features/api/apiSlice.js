import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://simple-lws-todo-server.herokuapp.com",
  }),
  tagTypes: ["Todos"],
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: ({ status, colors }) => {
        let url = "";

        if (colors?.length > 0) {
          url += colors.map((color) => `color_like=${color}`).join("&");
        }

        if (status === "Completed") {
          url += `${url.length > 0 ? "&" : ""}completed=true`;
        } else if (status === "InCompleted") {
          url += `${url.length > 0 ? "&" : ""}completed=false`;
        } else {
          url += "";
        }

        url = `/todos?${url}`;
        return {
          url,
          method: "GET",
        };
      },
      keepUnusedDataFor: 100,
      providesTags: (result, error, arg) => [{ type: "Todos", status: arg }],
    }),
    // getCompletedTodos: builder.query({
    //   query: () => "/todos?completed_like=true",
    //   providesTags: ["CompletedTodos"],
    // }),
    // getInCompletedTodos: builder.query({
    //   query: () => "/todos?completed_like=false",
    //   providesTags: ["InCompletedTodos"],
    // }),
    addTodo: builder.mutation({
      query: (data) => ({
        url: "/todos",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Todos"],
    }),
    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `/todos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Todos"],
    }),
    updateTodoColor: builder.mutation({
      query: ({ id, color, status }) => ({
        url: `/todos/${id}`,
        method: "PATCH",
        body: { color },
      }),
      invalidatesTags: ["Todos"],
    }),
    makeCompleted: builder.mutation({
      query: (id) => ({
        url: `/todos/${id}`,
        method: "PATCH",
        body: { completed: true },
      }),
      invalidatesTags: ["Todos"],
    }),
    removeCompleted: builder.mutation({
      query: (id) => ({
        url: `/todos/${id}`,
        method: "PATCH",
        body: { completed: false },
      }),
      invalidatesTags: ["Todos"],
    }),
    editTodo: builder.mutation({
      query: ({ id, text }) => ({
        url: `/todos/${id}`,
        method: "PATCH",
        body: { text },
      }),
      invalidatesTags: ["Todos"],
    }),
    clearCompleted: builder.mutation({
      query: (todoId) => ({
        url: `/todos/${todoId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Todos"],
    }),
    completeAllTodos: builder.mutation({
      query: (todoId) => ({
        url: `/todos/${todoId}`,
        method: "PATCH",
        body: {completed: true}
      }),
      invalidatesTags: ["Todos"],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useDeleteTodoMutation,
  useUpdateTodoColorMutation,
  useMakeCompletedMutation,
  useRemoveCompletedMutation,
  useEditTodoMutation,
  useClearCompletedMutation,
  useCompleteAllTodosMutation,
} = apiSlice;
