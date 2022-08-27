import React from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';

export default function MenuItem({
	line,
	color,
	from,
	to,
	switchValue,
	onSwitchChanged,
}) {
	return (
		<View style={styles.itemContainer}>
			<Text style={[styles.sign, { backgroundColor: color }]}>{line}</Text>
			<Text style={styles.fromTo}>
				{from} / {to}
			</Text>
			<Switch
				style={styles.switch}
				value={switchValue}
				onValueChange={onSwitchChanged}
				trackColor={{ true: '#70b2e6', false: '#aed4f2' }}
				thumbColor={'#2196F3'}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	itemContainer: {
		position: 'relative',
		flexDirection: 'row',
		height: 50,
		backgroundColor: '#f3f3f3',
		marginBottom: 5,
		borderRadius: 5,
	},
	sign: {
		fontFamily: 'BebasNeue_400Regular',
		fontSize: 24,
		color: 'white',
		height: 40,
		width: 40,
		margin: 5,
		borderRadius: 5,
		textAlign: 'center',
		textAlignVertical: 'center',
	},
	fromTo: {
		height: 50,
		textAlign: 'center',
		textAlignVertical: 'center',
		paddingLeft: 5,
	},
	switch: {
		position: 'absolute',
		right: 5,
	},
});
