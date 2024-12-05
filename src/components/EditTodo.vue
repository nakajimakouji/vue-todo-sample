<template>
  <div class="edit-todo">
    <h2>タスクを編集</h2>
    <form @submit.prevent="updateTodo" class="edit-todo-form">
      <label class="edit-label">
        タイトル:
        <input type="text" v-model="todo.title" class="edit-title-input" />
      </label>
      <label class="edit-label">
        開始予定日:
        <input type="date" v-model="todo.startDate" class="edit-start-date-input" />
      </label>
      <label class="edit-label">
        期限:
        <input type="date" v-model="todo.dueDate" class="edit-due-date-input" />
      </label>
      <label class="edit-label">
        ステータス:
        <select v-model="todo.completed" class="edit-status-select">
          <option value="0">予定</option>
          <option value="1">実施中</option>
          <option value="2">完了</option>
        </select>
      </label>
      <div class="button-container">
        <button type="submit" class="update-btn">更新</button>
      </div>
    </form>
    <div class="button-container">
      <button @click="goBack" class="cancel-btn">キャンセル</button>
    </div>
  </div>
</template>

<script>
import '@/styles/EditTodo.css';

export default {
  name: 'EditTodo',
  
  props: ['id'], // ルートパラメータのIDを受け取る
  data() {
    return {
      todo: {}, // 編集するタスク
    };
  },
  mounted() {
    // ローカルストレージからタスクを取得
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    this.todo = savedTodos.find((item) => item.id === parseInt(this.id));
  },
  methods: {
    updateTodo() {
      const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
      const index = savedTodos.findIndex((item) => item.id === this.todo.id);
      if (index !== -1) {
        savedTodos[index] = this.todo; // 更新
        localStorage.setItem('todos', JSON.stringify(savedTodos)); // ローカルストレージに保存
      }
      this.$router.push('/'); // リストページに戻る
    },
    goBack() {
      this.$router.push('/'); // リストページに戻る
    },
  },
};
</script>

