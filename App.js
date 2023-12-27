import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
// instalação "AsyncStorage": npm install @react-native-async-storage/async-storage;
import AsyncStorage from '@react-native-async-storage/async-storage';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      nome: ''
    };
    this.gravaNome = this.gravaNome.bind(this);
  }

  // deixar solvo na pagina 
  async componentDidMount() {
    await AsyncStorage.getItem('name').then((value) => {
      this.setState({ nome: value });
    })
  }
  // motra atualizações salvas na pagina
  async componentDidUpdate(_, prevState) {
    const name = this.state.nome;
    if (prevState !== nome) {
      await AsyncStorage.setItem('nome', nome);
    }
  }

  gravaNome() {
    this.setState({
      nome: this.state.input
    });
    alert('Salvo com Sucesso');
    Keyboard.dismiss();
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.viewInput}>
          <TextInput
            style={styles.input}
            value={this.state.input}
            onChangeText={(text) => this.setState({ input: text })}
            underlineColorAndroid={"transparent"}
          />

          <TouchableOpacity
            onPress={this.gravaNome}
          >
            <Text style={styles.botao}> + </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.nome}>{this.state.nome}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 55
  },
  viewInput: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  input: {
    width: 350,
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    padding: 10,
    margin: 10
  },
  botao: {
    backgroundColor: '#222',
    color: '#FFF',
    height: 40,
    padding: 10,
  },
  nome: {
    fontSize: 30,
    marginTop: 15,
    textAlign: 'center'
  }
});

export default App;
