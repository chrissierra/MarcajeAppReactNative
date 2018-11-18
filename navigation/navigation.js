import { createStackNavigator  } from 'react-navigation';

import planillaScreen from '../screens/planillaScreen';
import TrabajadorMarcajeScreen from '../screens/TrabajadorMarcajeScreen';
import ProcesoMarcajeScreen from '../screens/ProcesoMarcaje';

export default createStackNavigator (
	{
		 Home: { screen: planillaScreen },
 		 MarcajeTrabajador: { screen: TrabajadorMarcajeScreen },
 		 ProcesoMarcaje: { screen: ProcesoMarcajeScreen },
	},
	{
		initialRouteName: 'Home',
		navigationOptions: {
			headerStyle: {
				backgroundColor: '#f4511e'
			},
			headerTitleStyle: {
				textAlign: 'center',
				alignSelf: 'center',
				fontSize: 20,
				color: '#fff',
				fontWeight: 'bold'
			}
		}
	}
)