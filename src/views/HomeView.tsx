import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  useAppDispatch,
  useAppSelector,
  useCounterHook,
} from '../features/hooks';
import {
  incrementAsync,
  incrementByAmoutAsync,
} from '../features/counter/counterSlice';

const HomeView = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [dataRes1, setDataRes1] = useState<any>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [dataRes2, setDataRes2] = useState<any>();
  const [amoutNumber, setAmoutNumber] = useState<number>(0);

  const {handleCounterIncrement, handleCounterDecrement} = useCounterHook();
  const value = useAppSelector(state => state.counter.value);

  useEffect(() => {
    fetchDefaultData();
  }, []);

  const fetchDefaultData = async () => {
    try {
      const data1 = await fetch('https://catfact.ninja/fact');
      const data2 = await fetch(
        'https://api.coindesk.com/v1/bpi/currentprice.json',
      );
      if (data1 && data2) {
        setDataRes1(data1);
        setDataRes2(data2);
      }
    } catch (error) {
      console.log('error: ', error);
    }
  };

  const handleIncrementAndDescrment = () => {
    handleCounterIncrement();

    const timer = setTimeout(() => {
      handleCounterDecrement();
    }, 2000);

    return () => clearInterval(timer);
  };

  const dispatch = useAppDispatch();

  return (
    <SafeAreaView>
      <View>
        <Text>HomeView</Text>
        <Text>Value: {value}</Text>

        <Button title="increment" onPress={handleCounterIncrement} />
        <Button title="descrement" onPress={handleCounterDecrement} />
        <Button title="test" onPress={handleIncrementAndDescrment} />

        <Button title="Add Async" onPress={() => dispatch(incrementAsync())} />
        <View style={styles.amoutContainer}>
          <TextInput
            value={amoutNumber.toString()}
            onChangeText={number => {
              setAmoutNumber(Number(number));
            }}
            style={styles.amoutTextInput}
            keyboardType={'numeric'}
          />
          <Button
            title="Update"
            onPress={() => dispatch(incrementByAmoutAsync(amoutNumber))}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeView;

const styles = StyleSheet.create({
  amoutContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amoutTextInput: {
    height: 30,
    width: 250,
    backgroundColor: 'pink',
    margin: 20,
    borderRadius: 20,
    padding: 10,
  },
});
