import { calculateRegion } from "@/lib/map";
import { useLocationStore } from "@/store";
import { View, Text } from "react-native";
import MapView, { PROVIDER_DEFAULT } from "react-native-maps";

const Map = () => {
    const { userLongitude, userLatitude, destinationLatitude, destinationLongitude } = useLocationStore();
    const region = calculateRegion({ userLatitude, userLongitude, destinationLatitude, destinationLongitude });

    return (
        <MapView
            provider={PROVIDER_DEFAULT} 
            tintColor="black"
            mapType="mutedStandard"
            showsPointsOfInterest={false}
            initialRegion={region}
            showsUserLocation={true}
            userInterfaceStyle="light"
            style={{ width: '100%', height: '100%', borderRadius: '1rem' }}
        >
            <Text>Map</Text>
        </MapView>
    )
}

export default Map;