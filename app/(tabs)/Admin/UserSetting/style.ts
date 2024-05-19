import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    mainCard: {
        marginVertical: 20,
        alignItems: 'flex-start',
        backgroundColor: "#FFF",
        width: '90%',
        height: 'auto',
        marginLeft: 20,
        borderRadius: 10,
        zIndex: 2,
        padding: 20
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        marginTop: 80,
        marginLeft: 40,
        marginBottom: 10
    },
    tableColumn: {
        alignItems: 'center',
        flexDirection: 'row',
        padding: 5,
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: '#D8CEBD',
    },
    tableKey: {
        width: 'auto',
        fontSize: 20,
        fontWeight: 'bold',
    },
    divideLine: {
        position: 'absolute',
        left: 110,
        width: 1,
        height: '90%',
        backgroundColor: '#000'
    },
});

export default styles;