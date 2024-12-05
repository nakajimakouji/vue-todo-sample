import { createRouter, createWebHistory } from 'vue-router';
import TodoList from '@/components/TodoList.vue'; // リスト表示画面
import EditTodo from '@/components/EditTodo.vue'; // 編集画面

const routes = [
  {
    path: '/',
    name: 'TodoList',
    component: TodoList,
  },
  {
    path: '/edit/:id',
    name: 'EditTodo',
    component: EditTodo,
    props: true, // パラメータをコンポーネントに渡す
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
