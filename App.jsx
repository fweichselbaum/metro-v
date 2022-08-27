import { BebasNeue_400Regular, useFonts } from '@expo-google-fonts/bebas-neue';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
	ActivityIndicator,
	StatusBar,
	StyleSheet,
	Switch,
	Text,
	TouchableNativeFeedback,
	View,
} from 'react-native';
import MapView from 'react-native-maps';

import MenuItem from './src/components/MenuItem';
import {
	findStopByID,
	getMarkerFromStop,
	getPolylineFromLine,
} from './src/service/MetroService';

const markers = {
	generic: require('./assets/markers/marker_generic.png'),
	U1: require('./assets/markers/marker_U1.png'),
	U2: require('./assets/markers/marker_U2.png'),
	U3: require('./assets/markers/marker_U3.png'),
	U4: require('./assets/markers/marker_U4.png'),
	U6: require('./assets/markers/marker_U6.png'),
	U4_U6: require('./assets/markers/marker_U4_U6.png'), // TODO => map from lines
	U1_U2_U4: require('./assets/markers/marker_U1_U2_U4.png'),
};

const metroStops = require('./src/json/metro-haltepunkte-cleaned.json');
const metroLines = require('./src/json/metro-lines.json');
const mapStyle = require('./src/json/map-style.json');

const jsonRes = require('./src/json/fetch-response.json');

export default function App() {
	const [menuOpen, setMenuOpen] = useState(false);
	const [stopsVisible, setStopsVisible] = useState(true);
	const [selectedLines, setSelectedLines] = useState(
		new Array(metroLines.length).fill(false)
	);
	const [liveData, setLiveData] = useState({});

	useEffect(() => {
		/*fetch('https://www.wienerlinien.at/ogd_realtime/monitor?stopId=4401')
      .then(response => response.json())
      .then(data => {console.log(data); setLiveData(data)});*/

		metroLines
			.filter((line, index) => selectedLines[index])
			.forEach(line => {
				line.stops[0].forEach(stopId => {
					fetchedStop = jsonRes.data.monitors.filter(
						monitor => monitor.locationStop.properties.attributes.rbl === stopId
					)[0];
				});
			});
	}, [selectedLines]);

	let [fontsLoaded] = useFonts({
		BebasNeue_400Regular,
	});

	if (!fontsLoaded) {
		return <ActivityIndicator />;
	}

	return (
		<View style={styles.container}>
			<View style={styles.appbar}>
				<Text style={styles.heading}>Metro-V</Text>
				<View style={styles.visibleSwitch}>
					<Text>Show Stops</Text>
					<Switch
						value={stopsVisible}
						onValueChange={setStopsVisible}
						trackColor={{ true: '#70b2e6', false: '#aed4f2' }}
						thumbColor={'#2196F3'}
					/>
				</View>
			</View>
			<MapView
				style={styles.map}
				/*customMapStyle={mapStyle}
        initialRegion={{
          latitude: 48.20855926325294,
          longitude: 16.372967415350587,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}*/
				showsIndoors={false}
			>
				{stopsVisible &&
					metroLines.map((line, i) => {
						if (selectedLines[i]) {
							return line.stops[1].map(stopId =>
								getMarkerFromStop(metroStops, stopId, line, markers)
							);
						}
					})}
				{metroLines.map((line, i) => {
					if (selectedLines[i]) {
						return getPolylineFromLine(metroStops, line);
					}
				})}
			</MapView>

			{menuOpen &&
				metroLines.map((line, i) => (
					<MenuItem
						key={line.name}
						line={line.name}
						color={line.color}
						from={findStopByID(metroStops, line.stops[0][0]).StopText}
						to={findStopByID(metroStops, line.stops[1][0]).StopText}
						switchValue={selectedLines[i]}
						onSwitchChanged={() =>
							setSelectedLines(
								selectedLines.map((selectedLine, j) =>
									i == j ? !selectedLine : selectedLine
								)
							)
						}
					/>
				))}

			<TouchableNativeFeedback
				style={styles.button}
				onPress={() => setMenuOpen(!menuOpen)}
			>
				<View style={styles.buttonContainer}>
					<Text style={styles.buttonLabel}>Filter Metros</Text>
					<Ionicons
						style={styles.buttonIcon}
						name={menuOpen ? 'chevron-down' : 'chevron-up'}
					/>
				</View>
			</TouchableNativeFeedback>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		paddingTop: StatusBar.currentHeight,
	},
	appbar: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	heading: {
		fontFamily: 'BebasNeue_400Regular',
		fontSize: 38,
		letterSpacing: 3,
		color: '#2196F3',
	},
	visibleSwitch: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	map: {
		flex: 1,
		marginVertical: 5,
		borderRadius: 5,
	},
	button: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttonContainer: {
		position: 'relative',
		backgroundColor: '#2196F3',
		padding: 10,
		borderRadius: 5,
	},
	buttonLabel: {
		fontFamily: 'BebasNeue_400Regular',
		fontSize: 24,
		letterSpacing: 3,
		color: 'white',
		textAlign: 'center',
		textAlignVertical: 'center',
	},
	buttonIcon: {
		color: 'white',
		position: 'absolute',
		right: 15,
		bottom: 0,
		top: 0,
		fontSize: 32,
		textAlignVertical: 'center',
	},
});
