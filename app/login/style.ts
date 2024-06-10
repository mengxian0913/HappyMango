import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    header: {
        width: "100%",
        height: 200,
        justifyContent: 'center'
    },
    headerText: {
        textAlign: 'center',
        fontWeight: '500',
        fontSize: 30,
    },
    login_container: {
        width:"100%",
        height: 500,
        backgroundColor: '#fff',
        borderCurve: 'circular',
        borderRadius: 20,
        alignContent: 'center',
        justifyContent: 'center'
    },
    input_box: {
        width: '100%',
        paddingHorizontal: 30,
        paddingBottom: 30
    },
    loginText: {
        fontSize: 40,
        fontWeight: '500',
        textAlign: 'center',
        marginBottom: 50
    },
    labelText: {
        fontSize: 20,
        fontWeight: '500',
    },
    confirmButtom: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFD52D',
        width: 120,
        height: 50,
        marginTop: 30,
        marginHorizontal: 'auto',
        borderCurve: 'circular',
        borderRadius: 20,
    }
})

export default styles;