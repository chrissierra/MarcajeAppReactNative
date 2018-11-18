import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Clipboard,
  Alert,
  Image,
  StyleSheet,
  Dimensions,
  Button,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Camera, Permissions } from 'expo';
import { MaterialIcons } from "@expo/vector-icons";

var hola = 'Romina';
var camera;
export default class CameraExample extends React.Component {
  state = {
  	animating: false,
    hasCameraPermission: null,
    type: Camera.Constants.Type.front,
    coeficiente: '',
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
    //setInterval(()=>{
    //	this.takePicture();
    //}, 1800);
  }



  takePicture = async () => {
      let photo = await this.camera.takePictureAsync({ onPictureSaved: this.onPictureSaved, base64: true, quality: 1});
      
  }

storePicture(uris) { 
  const formData = new FormData();
   this.setState({coeficiente: 'Verificando'})
    const uriPart = uris.split('.');
    const fileExtension = uriPart[uriPart.length - 1];

    formData.append('photo', {
        uri: uris,
        name: 'nombre',
        type: 'image/jpeg'
    });

    //API that use fetch to input data to database via backend php script
    fetch('https://sister.cl/recepcionimagenv10.php?rut=179614936',{
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: formData
      })
      .then((response) => console.log(response) );
     
    }


   onPictureSaved = async (e)=>{
   	this.storePicture(e.uri);
 
		 try {
				 		//this.setState({ animating: false })

				       const response3 = await fetch("https://sister.cl/DeteccionFacialServidor/179614936"  , { method: "GET", });

				       let response_body3 = await response3.json();

				       hola = response_body3['data'];

				       console.log(response_body3['data'])
				      
				       this.setState({coeficiente: response_body3['data']});

				        this.props.navigation.navigate('ProcesoMarcaje', {
             					 coeficiente: response_body3['data'],
            				});

				  }catch(error){

				  		hola = 'Vuelve a intentarlo';

				  }

      
  }


  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera  ref={ref => { this.camera = ref; }}  style={{ flex: 1 }} type={this.state.type} >
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.setState({
                    type: this.state.type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back,
                  });
                }}>
                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                  {' '}Flip{' '}
                </Text>

                     <TouchableOpacity
                
                onPress={this.takePicture.bind(this)}
              >
                <MaterialIcons name="camera" size={50} color="#e8e827" />
              </TouchableOpacity>
              </TouchableOpacity>


              <Text>{this.state.coeficiente}</Text>
              
            </View>
          </Camera>
        </View>
      );
    }
  }
}
const styles = StyleSheet.create ({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 70
   },
   activityIndicator: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: 80
   }
})