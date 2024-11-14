import { ActivityIndicator, FlatList, Text, View } from "react-native"
import { styles } from "../styles"
import { useEffect, useState } from "react";
import { getTrailer } from "../api/videoApi";

type propsType = {
    page: number;
    limit: number;
};

export const TrailerList = () => {
    const controller = new AbortController();

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [number, setNumber] = useState<number>(1);

    const fetchData = async ({page, limit}: propsType) => {
        let api_key = 'f08d03b28302f2a0c858733c5b88060c';
        try {
            const tempData = await getTrailer({api_key, signal: controller.signal});
            const start = (page - 1) * limit;
            const end = start + limit;
            const paginatedResults = tempData.slice(start, end);
            let newData2 = paginatedResults.filter(
                video => !data.some(existingVideo => existingVideo.id == video.id)
            );
            console.log(1, JSON.stringify(tempData, null, 3));
            
            let newData = data.concat(newData2);
            setData(newData);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(()=> {
        fetchData({page: number, limit: 50})
        return (()=> {
            // when the user navigate to another screens, this abort controller will hit
            // and fetching data aborted.
            controller.abort();
        })
    }, [])

    if (loading) return <ActivityIndicator size="large" />;
    if (error) return <Text style={styles.text}>Error: {error}</Text>;

    return (
        <View style={styles.container}>
            <Text>Trailer</Text>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item, index}) => {
                    return (
                        <View key={index}>
                            <Text style={styles.text}>{item?.name}</Text>
                        </View>
                    )
                }}
            />
        </View>
    )
}