import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity, Modal } from 'react-native';
import React, { useState } from 'react';
import { CustomModal} from "./components/index"
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#577590',
  },
  inputContainer:{
    marginTop:50,
    marginBotton:20,
    marginHorizontal:20,
    flexDirection:"row",
    justifyContent:"space-between",
  },
  input:{
    width:"75%",
    borderBottomColor:"#F2A541",
    borderBottomWidth: 1,
    height:40,
    color:"#0F151A"
  },
  itemList:{
    flex: 1,
    marginVertical: 20,
    marginHorizontal:20,
  },
  itemContainer:{
    flex: 1,
    marginVertical:5,
    justifyContent: "space-between",
    flexDirection: 'row',
    alignItems: "center",
    marginVertical: 18,
    backgroundColor: "#F2A541",
    paddingHorizontal:18,
    paddingVertical: 20,
    borderRadius: 5,
  },
  item:{
    fontSize:16,
    color: '#577590',
  },
  delete: {
    fontSize:18,
    fontWeight:"bold",
    color:"#0F151A"
  },

  modalContainer:{
    justifyContent:"center",
    alignItems: "center",
    marginTop:30,
    paddingVertical: 20,
  },
  modalTitle:{
    fontSize: 16,
  },
  modalMessageContainer:{
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    paddingVertical:10,
  },
  modalMessage:{
    fontSize:14,
  },
  selectedTask:{
    fontSize: 16,
    color: "#0F151A",
    fontWeight: "bold",
  },
  buttonContainer:{
    flexDirection:"row",
    justifyContent:"space-around",
    marginHorizontal: 20
  },
 
});


export default function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const onHandleChangeText = (text) =>{
    setTask(text);
  }
  // console.warn("task", task)
  // console.warn("tasks", tasks)
  
  const addItem = () =>{
    setTasks((prevTasks) =>[
      ...prevTasks,
      {
        id: Math.random().toString(),
        value: task
      }
    ]);
    setTask("");
}

const onHandleModal = (id) => {
  setModalVisible(!modalVisible);
  setSelectedTask(tasks.find((item) => item.id === id))

}
    const renderItem = ({ item }) => (
      <View style={styles.itemContainer}>
        <Text style={styles.item}>{item.value}</Text>
        <TouchableOpacity style={styles.button}onPress={() => onHandleModal(item.id)}>
          <Text style={styles.delete}>X</Text>
        </TouchableOpacity>
      </View>
    )

    const onHandleDeleteItem = () =>{
      setTasks(tasks.filter((item)=>item.id !== selectedTask.id));
      setSelectedTask(null);
      setModalVisible(!modalVisible);
    }
  
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
      <TextInput 
      placeholder="Agregar tarea"
       style={styles.input}
       selectionColor="#F19846"
       placeholderTextColor="#F19846"
       onChangeText={onHandleChangeText}
       value={task}
       />
      <Button 
      title='Agregar' 
      onPress={addItem} 
      color="#F2A541"/>
    </View>
    <FlatList
    style={styles.itemList}
    data={tasks}
    renderItem={renderItem}
    keyExtractor={(item) => item.id.toString()}
    showsVerticalScrollIndicator={false}
    />
    <CustomModal 
    visible={modalVisible}
    animationType="slide">
      <View style={styles.modalContainer}>
        <Text style= {styles.modalTitle}>Detalle de la lista</Text>
      </View>
      <View style={styles.modalMessageContainer}>
        <Text style={styles.modalMessage}>¿Estás seguro de que quieres eliminar?</Text>
      </View>
      <View style={styles.modalMessageContainer}>
        <Text style={styles.modalMessage}>{selectedTask?.value}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
        title='Eliminar'
        onPress={() =>onHandleDeleteItem(selectedTask?.id)}
        color= "#20182C"/>
        <Button
        title='Cancelar'
        onPress={() =>setModalVisible(!modalVisible)}
        color= "#20182C"/>
      </View>
    </CustomModal>
    </View>
  );
}


