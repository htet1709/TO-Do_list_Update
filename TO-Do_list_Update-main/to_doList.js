const input = document.getElementById('todo-input');
        const dateInput = document.getElementById('todo-date');
        const addBtn = document.getElementById('add-btn');
        const activeList = document.getElementById('active-list');
        const completedList = document.getElementById('completed-list');

        // タスクをメモリ上に管理する配列
        let tasks = [];

        function render() {
            activeList.innerHTML = '';
            completedList.innerHTML = '';

            // 未完了タスク：日付が新しい順 (降順) にソート
            const activeTasks = tasks
                .filter(t => !t.completed)
                .sort((a, b) => b.date.localeCompare(a.date));

            // 完了済タスク：日付が新しい順 (降順) にソート
            const completedTasks = tasks
                .filter(t => t.completed)
                .sort((a, b) => b.date.localeCompare(a.date));

            // 描画用の統合配列
            const sortedTasks = [...activeTasks, ...completedTasks];

            sortedTasks.forEach((task) => {
                const li = document.createElement('li');

                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.checked = task.completed;
                checkbox.onclick = () => toggleTask(task.id);

                const dateSpan = document.createElement('span');
                dateSpan.className = 'todo-date';
                dateSpan.textContent = task.date;

                const textSpan = document.createElement('span');
                textSpan.className = 'todo-text';
                textSpan.textContent = task.text;

                li.append(checkbox, dateSpan, textSpan);

                if (task.completed) {
                    // 完了済タスクにのみ削除ボタンを追加
                    const deleteBtn = document.createElement('button');
                    deleteBtn.className = 'delete-btn';
                    deleteBtn.innerHTML = '&#128465;';
                    deleteBtn.onclick = () => deleteTask(task.id);
                    li.appendChild(deleteBtn);

                    completedList.appendChild(li);
                } else {
                    activeList.appendChild(li);
                }
            });
        }

        function addTask() {
            const text = input.value.trim();
            const date = dateInput.value;

            // 日付またはタスク内容が未設定の場合は追加不可
            if (!text || !date) {
                alert('タスク内容と日付を入力してください。');
                return;
            }

            tasks.push({
                id: Date.now(),
                text: text,
                date: date,
                completed: false
            });

            input.value = '';
            dateInput.value = '';
            render();
        }

        function toggleTask(id) {
            const task = tasks.find(t => t.id === id);
            if (task) {
                task.completed = !task.completed;
                render();
            }
        }

        function deleteTask(id) {
            tasks = tasks.filter(t => t.id !== id);
            render();
        }

        addBtn.addEventListener('click', addTask);
        input.addEventListener('keypress', (e) => { if (e.key === 'Enter') addTask(); });

        // 初期レンダリング
        render();