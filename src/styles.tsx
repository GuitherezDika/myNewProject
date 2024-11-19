import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    text: {
        fontSize: 24, 
        marginVertical: 20
    },
    container: {
        padding: 24,
        flex: 1
    },
    imageContainer: {
        width: '100%',
        height: 200,
        padding: 8,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 8
    },
    imageView: {
        width: '100%', 
        height: 140
    },
    rowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8
    },
    iconCard: {
        width: 40,
        height: 40
    }
})

