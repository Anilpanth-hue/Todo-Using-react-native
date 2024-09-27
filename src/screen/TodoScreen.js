import { Alert, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
// import { IconButton } from 'react-native-paper';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import { IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import Fallback from '../components/Fallback';



console.log(Date.now().toString());



const TodoScreen = () => {
  // Init local states
  const[todo, setTodo] = useState("");
  const[todoList, setTodoList] = useState([]);
  const[editedTodo, setEditedTodo] = useState(null);


  //Handle Add todo
  const handleAddTodo = () => {
    //structure of a single todo item
    
    if(todo === ""){
      return; //early return just like returning in void 
    }

    setTodoList([...todoList, {id: Date.now().toString(), title: todo }])
    setTodo("");

  }
  //deleting items
  const handleDeleteTodo = (id) => {
    const updateTodoList = todoList.filter((todo) => todo.id !== id)

    setTodoList(updateTodoList);
  }

  //Handle Edit todo button
  const handleEditTodo = (todo) => {
    setEditedTodo(todo);
    setTodo(todo.title);
  }
  //handle update
  const handleUpdateTodo = () => {
    const updatedTodos = todoList.map((item)=>{
      if(item.id === editedTodo.id){
        return {...item, title: todo}
      }
      return item

    })
    setTodoList(updatedTodos);
    setEditedTodo(null);
    setTodo("");
  }

  const renderTodos = ({item, index})=>{
    return(
      <View style={{
        backgroundColor: "#1e90ff", 
        borderRadius: 6, 
        paddingHorizontal: 6, 
        paddingVertical: 12, 
        marginBottom: 12, 
        flexDirection: "row", 
        alignItems: "center",
        shadowColor:"#000", 
        shadowOffset: { width: 0, height: 2 }, 
        shadowOpacity: 0.8, 
        shadowRadius: 3,
      }}>
        <Text style={{color: "#fff", fontSize: 20, fontWeight: 700, flex: 1}}>{item.title}</Text>
    <Icon.Button name="pencil" backgroundColor="#1e90ff" onPress={()=>handleEditTodo(item)} />
    <Icon.Button name="trash" backgroundColor="#1e90ff" onPress = {() => handleDeleteTodo(item.id)} />
      </View>
    )
  }
  return (
    <View style={{marginHorizontal: 12, padding: 12}}>

      <TextInput 
      style={{borderWidth:2, borderColor: "#1e90ff", borderRadius: 6, paddingVertical: 7, 
        paddingHorizontal: 16,  
      }}
      placeholder='Add a Task'
      value={todo}
      onChangeText={(userText)=> setTodo(userText)}
      />
      {
        editedTodo ? <TouchableOpacity 
        style={{backgroundColor: "#000", borderRadius: 6, paddingVertical: 8, marginVertical: 34,    alignItems: "center"}}
        onPress={() => handleUpdateTodo()}>
          <Text style={{color: "#fff", fontWeight: 'bold', fontSize: 18}}>
            Save
          </Text>
        </TouchableOpacity> :
        <TouchableOpacity 
        style={{backgroundColor: "#000", borderRadius: 6, paddingVertical: 8, marginVertical: 34,    alignItems: "center"}}
        onPress={() => handleAddTodo()}>
          <Text style={{color: "#fff", fontWeight: 'bold', fontSize: 18}}>
            Add
          </Text>
        </TouchableOpacity>
      }
      {/* Render Todo list */}
      <FlatList data={todoList} renderItem={renderTodos}/>

      {
        todoList.length <= 0 && <Fallback />
      }
    </View>
  )
}

export default TodoScreen

const styles = StyleSheet.create({})