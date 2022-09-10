import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://simple-lws-todo-server.herokuapp.com",
  }),
  tagTypes: ["Todos"],
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: ({status, color}) => {
        let url = ''

        if (status === 'All' && !color) {

          url = '/todos'
        } else if (status === 'All' && color) {
          if (typeof color === 'object') {
            const str = color.map(c => `color_like=${c}`).join('&');
            console.log(`/todos?${str}`);
            url = `/todos?${str}`
          } else {
            url = `/todos?color_like=${color}`
          }
        }
        else if (status === 'InCompleted') url = '/todos?completed_like=false';
        else if (status === 'Completed') url = '/todos?completed_like=true';
        else url = '/todos'
        
        console.log(url);
        return {
          url,
        }
      },
      providesTags: (result, error, arg) => [{type: "Todos", status: arg}],
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
        body: {text},
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
} = apiSlice;
