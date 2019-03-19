import React from 'react';
import { FlatList, StyleSheet } from 'react-native';

import ListItem from '../ListItem/ListItem';

const placeList = props => {
    // const placesOutput = props.places.map((place, i) => (

    //   ));
    return (
        <FlatList
            style={styles.listContainer}
            data={props.places} // need to be objects with a key prop
            renderItem={(info) => ( //item itself, the index and something about potential separators between items.
                <ListItem
                    placeName={info.item.name}
                    placeImage={info.item.image}
                    onItemPressed={() => props.onItemSelected(info.item.key)}
                />
            )}
        />
    );
};

const styles = StyleSheet.create({
    listContainer: {
        width: "100%"
    }
});

export default placeList;