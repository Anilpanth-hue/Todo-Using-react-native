import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Fallback from '../components/Fallback';
import firestore from '@react-native-firebase/firestore'; // Firestore import

const TodoScreen = () => {
  const [todo, setTodo] = useState('');
  const [todoList, setTodoList] = useState([]);
  const [editedTodo, setEditedTodo] = useState(null);

  // Fetch todos from Firestore on component mount
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const todosSnapshot = await firestore().collection('todos').get();
        const todosData = todosSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTodoList(todosData);
      } catch (error) {
        console.error('Error fetching todos: ', error);
      }
    };
    fetchTodos();
  }, []);

  const handleAddTodo = async () => {
    if (todo === '') return;
    try {
      const newTodo = {id: Date.now().toString(), title: todo};
      // Add todo to Firestore
      const docRef = await firestore().collection('todos').add(newTodo);

      // Store the document ID in the newTodo object
      newTodo.id = docRef.id;

      // Update local state
      setTodoList([...todoList, newTodo]);
      setTodo('');
    } catch (error) {
      console.error('Error adding todo: ', error);
    }
  };

  const handleDeleteTodo = async id => {
    try {
      // Find the todo to delete
      const todoToDelete = todoList.find(todo => todo.id === id);

      // Delete todo from Firestore
      await firestore().collection('todos').doc(todoToDelete.id).delete();

      // Update local state
      const updatedTodoList = todoList.filter(todo => todo.id !== id);
      setTodoList(updatedTodoList);
    } catch (error) {
      console.error('Error deleting todo: ', error);
    }
  };

  const handleEditTodo = todo => {
    setEditedTodo(todo);
    setTodo(todo.title);
  };

  const handleUpdateTodo = () => {
    const updatedTodos = todoList.map(item => {
      if (item.id === editedTodo.id) {
        return {...item, title: todo};
      }
      return item;
    });
    setTodoList(updatedTodos);
    setEditedTodo(null);
    setTodo('');
  };

  const renderTodos = ({item}) => {
    return (
      <View style={styles.todoItem}>
        <Text style={styles.todoText}>{item.title}</Text>
        <Icon.Button
          name="pencil"
          backgroundColor="#1e90ff"
          onPress={() => handleEditTodo(item)}
        />
        <Icon.Button
          name="trash"
          backgroundColor="#1e90ff"
          onPress={() => handleDeleteTodo(item.id)}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Add a Task"
        value={todo}
        onChangeText={userText => setTodo(userText)}
      />
      {editedTodo ? (
        <TouchableOpacity style={styles.button} onPress={handleUpdateTodo}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleAddTodo}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      )}

      <FlatList data={todoList} renderItem={renderTodos} />

      {todoList.length <= 0 && <Fallback />}
    </View>
  );
};

export default TodoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 12,
    padding: 12,
    backgroundColor: '#f8f8f8',
  },
  input: {
    borderWidth: 2,
    borderColor: '#1e90ff',
    borderRadius: 6,
    paddingVertical: 7,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#000',
    borderRadius: 6,
    paddingVertical: 8,
    alignItems: 'center',
    marginBottom: 34,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  todoItem: {
    backgroundColor: '#1e90ff',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 3,
  },
  todoText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    flex: 1,
  },
});
