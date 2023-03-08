import './css/App.css';
import Counter from './components/CounterNumber';
import Clock from './components/Date';
import InputTodo from './components/InputTodo';
import TodoList from './components/Todo';

function App() {
  return (
    <div className="App">
      <Counter/>
      <Clock/>
      <InputTodo/>
      <TodoList/>
    </div>
  );
}

export default App;
