import React, { Component } from 'react';

import { FlatList, Button, StyleSheet, Text, View } from 'react-native';

export default class planilla extends Component {

	 constructor(){
		super();
		this.state ={ isLoading: true}
	 }
  
   componentDidMount1 = async () => {
    
    try {
      const response = await fetch('https://sister.cl/ServidorImagenesSister/api/planilla/Administrador')
      const posts = await response.json()

      this.setState({
          isLoading: false,
          dataSource: posts,
        }, function(){

        });
  
    } catch (e) {
   		console.log(e);     
    }
  }

 render() {
    return (
      <View style={styles.container}>
       
        <Text> prueba 1547 </Text>
        <Button
          onPress={this.componentDidMount1}
          title="Learn More"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />

         <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => <Text onPress={() => {
            /* 1. Navigate to the Details route with params */
            this.props.navigation.navigate('MarcajeTrabajador', {
              rut: item.rut.toString(),
            });
          }}>{item.nombre.toString()}, {item.apellido.toString()}</Text>}
          keyExtractor={({id}, index) => id.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});