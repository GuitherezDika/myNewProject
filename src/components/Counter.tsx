import { useEffect, useState } from "react"
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "../styles";

export const Counter = () => {
    const [number, setNumber] = useState(0);
    const [name, setName] = useState<string>('user');
    const [seconds, setSeconds] = useState(0);

    const onAdd = () => {
        setNumber(number + 1);
    };

    const onSetName = (input: string) => {
        setName(input);
    }

    useEffect(()=> {
        console.log('component mounted', number);
        // this hook runs once when the component is initilized, or created, or first rendered
        // the useEffect hook does not mount everytime the number increases
    }, []);

    // This effect runs every time the number increases
    useEffect(() => {
        console.log('Counter value changed to:', number);
    }, [number]);

    useEffect(()=> {
        const interval = setInterval(() => {
            setSeconds(prevData => prevData + 1)
        }, 1000);

        return () => clearInterval(interval);

        // bisa setTimeout
        // bisa subscription
    }, []);

    return (
        <View>
            <TouchableOpacity onPress={onAdd}>
                <Text style={styles.text}>Add +</Text>
            </TouchableOpacity>
            <Text style={styles.text}>{number}</Text>
            <Text style={styles.text}>Elapsed seconds: {seconds}</Text>

            <TextInput
                placeholder="your name"
                style={styles.text}
                value={name}
                onChangeText={onSetName}
            />
        </View>
    )
}

