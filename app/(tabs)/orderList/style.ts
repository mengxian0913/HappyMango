import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    mainCard: {
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
    cardTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 10
    },
    cardContent: {
        fontSize: 15,
        fontWeight: 'bold',
        paddingBottom: 5
    },
    cardEvent: {
        fontSize: 18,
        marginTop: 20,
        fontWeight: 'bold'
    },
    navigator: {
        marginVertical: 20,
        width: '90%',
        height: 50,
        marginLeft: 20,
        borderRadius: 30,
        backgroundColor: "#FFF",
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10
    },
    navigatorTab: {
        width: '33%',
        padding: 5,
        textAlignVertical: 'center',
        fontWeight: 'bold',
        borderRadius: 30
    },
    listTime: {
        fontSize: 18,
        padding: 5,
        paddingLeft: 10,
        fontWeight: 'bold',
        backgroundColor: '#FFD52D',
        height: 50,
        width: 150
    },
    listFirstCard: {
        marginTop: -15,
    },
    listCardText: {
        fontWeight: 'bold',
        padding: 2
    },
    listCard: {
        marginVertical: 5,
        backgroundColor: '#FFF',
        width: 350,
        height: 100,
        borderRadius: 10,
        alignItems: 'flex-start',
        padding: 20,
        paddingTop: 10,
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
    imageCardChangeIcon: {
        position: 'absolute',
        top: 150,
        right: 40,
        zIndex: 2
    },
    back: {
        backgroundColor: 'none',
        alignItems: 'center',
        marginTop: 60,
        marginLeft: 20,
        flexDirection: 'row'
    },
    clickButton: {
        marginTop: 200,
        marginBottom: 10,
        borderRadius: 15,
        justifyContent: 'center',
        height: 40,
        width: '100%',
        backgroundColor: '#EC9039',
    },
    tabLabel: {
        top: 0,
        width: 20,
        height: 20,
        textAlign: 'center',
        position: 'absolute',
        borderRadius: 20,
        backgroundColor: 'red',
        color: '#FFF',
        zIndex: 2
    }
});

export default styles;