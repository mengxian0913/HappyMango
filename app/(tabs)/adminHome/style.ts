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
        padding: 20,
        marginBottom: 20,
    },
    title: {
        fontSize: 30,
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
    cardSubTitle: {
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 10,
        color: '#D8CEBD'
    },
    listType: {
        fontSize: 18,
        padding: 5,
        paddingLeft: 10,
        fontWeight: 'bold',
        backgroundColor: '#FFD52D',
        height: 50,
        width: 'auto'
    },
    listFirstCard: {
        marginTop: -15,
    },
    listCardText: {
        fontWeight: 'bold',
        padding: 2
    },
    listCard: {
        flexDirection: 'row',
        marginVertical: 30,
        backgroundColor: '#FFF',
        width: 350,
        height: 'auto',
        borderRadius: 10,
        alignItems: 'center',
        padding: 20,
        paddingTop: 10,
    },
    imageContainer: {
        marginTop: 20,
        alignItems: 'flex-start',
        backgroundColor: "#FFF",
        width: '90%',
        minHeight: 300,
        height: 'auto',
        marginLeft: 20,
        borderRadius: 10,
        zIndex: 2,
        padding: 20,
        marginBottom: 20,
    },
    imageCard: {
        position: 'absolute',
        zIndex: 2,
        top: 120,
        left: 20,
        marginTop: 150,
        marginHorizontal: 20,
        width: '80%',
        height: 120,
        borderRadius: 20,
        padding: 10,
    },
    imageCardBottom: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 30,
        paddingHorizontal: 10,
        borderRadius: 30,
        backgroundColor: '#F1F1F1'
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
    smallText: {
        fontSize: 15,
        textAlign: 'center',
        width: '100%'
    },
    pressInButton: {
        marginTop: 200,
        marginBottom: 10,
        borderRadius: 15,
        justifyContent: 'center',
        height: 40,
        width: '100%',
        backgroundColor: '#EC9039',
        opacity: .5
    },
    pressOutButton: {
        marginTop: 200,
        marginBottom: 10,
        borderRadius: 15,
        justifyContent: 'center',
        height: 40,
        width: '100%',
        backgroundColor: '#EC9039',
    }
  });

export default styles;