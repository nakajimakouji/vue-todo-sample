<template>
  <div class="todo-form">
    <!-- 入力フォーム -->
    <form @submit.prevent="addTodo" class="todo-field">
      <input
        type="text"
        v-model="newTodo"
        placeholder="やることを入力"
        class="todo-input"
      />
      <div class="date-fields">
        <label>
          開始予定日:
          <input type="date" v-model="newStartDate" class="date-input" />
        </label>
        <label>
          期限:
          <input type="date" v-model="newDueDate" class="date-input" />
        </label>
      </div>
      <button type="submit" class="add-todo-btn">登録</button>
    </form>

    <div class="todo-header">
      <h2>やることリスト</h2>
      <div class="filter-section">
        <label>
          <input type="radio" value="all" v-model="filterStatus" />
          全て
        </label>
        <label>
          <input type="radio" value="0" v-model="filterStatus" />
          予定
        </label>
        <label>
          <input type="radio" value="1" v-model="filterStatus" />
          実施中
        </label>
        <label>
          <input type="radio" value="2" v-model="filterStatus" />
          完了
        </label>
      </div>
    </div>

    <!-- Todoリスト -->
    <div class="todo-list-container">
      <div class="todo-list-header">
        <span class="todo-title-header">タイトル</span>
        <span class="todo-start-header">開始予定日</span>
        <span class="todo-due-header">期限</span>
        <span class="todo-status-header">ステータス</span>
        <span class="todo-action-header"></span>
      </div>
      <ul class="todo-list">
        <li v-for="todo in filteredTodos" :key="todo.id" class="todo-item">
          <router-link :to="{ name: 'EditTodo', params: { id: todo.id } }" class="todo-title">
            {{ todo.title }}
          </router-link>
          <span class="todo-start-date">{{ todo.startDate }}</span>
          <span class="todo-due-date">{{ todo.dueDate }}</span>
          <span class="todo-status">
            <select v-model="todo.completed" @change="saveTodos" class="status-select">
              <option value="0">予定</option>
              <option value="1">実施中</option>
              <option value="2">完了</option>
            </select>
          </span>
          <button @click="removeTodo(todo.id)" class="delete-todo-btn">削除</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import '@/styles/TodoList.css';

export default {
  name: 'TodoList',

  data() {
    return {
      newTodo: "",
      newStartDate: "",
      newDueDate: "",
      todos: [],
      filterStatus: "all",
      nextId: 1,
    };
  },
  computed: {
    filteredTodos() {
      let filtered = this.todos;

      // ステータスでフィルタリング
      if (this.filterStatus !== "all") {
        filtered = filtered.filter(
          (todo) => Number(todo.completed) === Number(this.filterStatus)
        );
      }

      // 開始予定日の昇順でソート
      return filtered.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
    },
  },
  methods: {
    addTodo() {
      if (this.newTodo.trim() === "" || this.newStartDate === "" || this.newDueDate === "") {
        alert("全ての項目を入力してください");
        return;
      }

      // 日付の前後をチェック
      if (new Date(this.newStartDate) > new Date(this.newDueDate)) {
        alert("開始予定日と期限の日付が前後しています");
        return;
      }

      this.todos.push({
        id: this.nextId++,
        title: this.newTodo,
        startDate: this.newStartDate,
        dueDate: this.newDueDate,
        completed: 0,
      });

      this.newTodo = "";
      this.newStartDate = "";
      this.newDueDate = "";
      this.saveTodos();
    },
    removeTodo(id) {
      this.todos = this.todos.filter((todo) => todo.id !== id);
      this.saveTodos();
    },
    saveTodos() {
      localStorage.setItem("todos", JSON.stringify(this.todos));
    },
  },
  mounted() {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      this.todos = JSON.parse(savedTodos);
    // 削除後でも一意な ID を確保
    this.nextId = Math.max(...this.todos.map((todo) => todo.id), 0) + 1;
    }
  },
};
</script>
