import { View, Text, TextInput, Pressable, Alert } from "react-native";
import React, { useState } from "react";

const TodoList = () => {
  const [title, setTitle] = useState<string>('');
  const [todo, setTodo] = useState<any[]>([
    {
      id: 1,
      title: 'learn react native',
      completed: false,
    },
  ]);

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>('');

  // Handle Add Todo
  const handleAddTodo = () => {
    if (!title) {
      Alert.alert('Error', 'Please Enter Your Todo');
      return;
    }

    const newTodo = {
      id: todo.length + 1,
      title: title,
      completed: false,
    };

    setTodo([...todo, newTodo]);
    setTitle('');
  };

  // Handle Delete Todo
  const handleDeleteTodo = (id: number) => {
    setTodo(todo.filter(item => item.id !== id));
  };

  // Handle Edit Todo
  const handleEditTodo = (item: any) => {
    setIsEditing(true);
    setEditId(item.id);
    setEditText(item.title);
  };

  const handleSaveEdit = () => {
    if (!editText) {
      Alert.alert('Error', 'Please enter a valid text');
      return;
    }

    setTodo(todo.map(item => item.id === editId ? { ...item, title: editText } : item));
    setIsEditing(false);
    setEditId(null);
    setEditText('');
  };

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 10,
        marginTop: 10,
      }}
    >
      {/* Add Todo Section */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 10,
          gap: 10,
        }}
      >
        <TextInput
          placeholder="Enter Your Todo"
          style={{
            flex: 1,
            borderColor: 'black',
            borderWidth: 1,
            padding: 10,
          }}
          value={title}
          onChangeText={setTitle}
        />
        <Pressable
          style={{
            backgroundColor: 'blue',
            padding: 10,
            borderRadius: 5,
            height: 40,
          }}
          onPress={handleAddTodo}
        >
          <Text
            style={{
              color: 'white',
            }}
          >
            Add Todo
          </Text>
        </Pressable>
      </View>

      {/* Edit Section */}
      {isEditing && (
        <View style={{ marginBottom: 10 }}>
          <TextInput
            placeholder="Edit your todo"
            style={{
              borderColor: 'black',
              borderWidth: 1,
              padding: 10,
              marginBottom: 10,
            }}
            value={editText}
            onChangeText={setEditText}
          />
          <Pressable
            style={{
              backgroundColor: 'green',
              padding: 10,
              borderRadius: 5,
              marginBottom: 10,
            }}
            onPress={handleSaveEdit}
          >
            <Text style={{ color: 'white' }}>Save Edit</Text>
          </Pressable>
        </View>
      )}

      {/* Todo List Section */}
      {todo.map(item => (
        <View key={item.id} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
          <Text
            style={{
              fontSize: 18,
              color: 'black',
              flex: 1,
            }}
          >
            {item.title}
          </Text>

          {/* Edit Button */}
          <Pressable
            style={{
              backgroundColor: 'orange',
              padding: 10,
              borderRadius: 5,
              marginRight: 10,
            }}
            onPress={() => handleEditTodo(item)}
          >
            <Text style={{ color: 'white' }}>Edit</Text>
          </Pressable>

          {/* Delete Button */}
          <Pressable
            style={{
              backgroundColor: 'red',
              padding: 10,
              borderRadius: 5,
            }}
            onPress={() => handleDeleteTodo(item.id)}
          >
            <Text style={{ color: 'white' }}>Delete</Text>
          </Pressable>
        </View>
      ))}
    </View>
  );
};

export default TodoList;
