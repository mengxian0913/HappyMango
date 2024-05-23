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
    appendCover: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: "#F1F1F1",
      width: '90%',
      height: 150,
      marginLeft: 20,
      borderRadius: 10,
    },
    title: {
      fontSize: 40,
      fontWeight: 'bold',
      marginTop: 80,
      marginLeft: 40,
      marginBottom: 10
    },
    smallText: {
      fontSize: 15,
      textAlign: 'center',
      width: '100%'
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
      paddingRight: 10
    },
    divideLine: {
      position: 'absolute',
      left: 110,
      width: 1,
      height: '90%',
      backgroundColor: '#000'
    },
    clickButton: {
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