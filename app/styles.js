import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        backgroundColor: "#232324",
    },
    card: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 3,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    button: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        padding: 10,
        borderRadius: 20,
        marginHorizontal: 5,
    },
    username: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    about: {
        fontSize: 18,
        marginVertical: 8,
    },
    profilePic: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#DDD',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    initials: {
        fontSize: 24,
        color: '#333',
    },
    description: {
        textAlign: 'center',
        marginBottom: 20,
    }
  });


export default styles;
