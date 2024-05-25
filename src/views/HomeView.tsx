import {Button, SafeAreaView, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useAppSelector, useCounterHook} from '../features/hooks';

const HomeView = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [dataRes1, setDataRes1] = useState<any>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [dataRes2, setDataRes2] = useState<any>();
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

  return (
    <SafeAreaView>
      <View>
        <Text>HomeView</Text>
        <Text>Value: {value}</Text>

        <Button title="increment" onPress={handleCounterIncrement} />
        <Button title="descrement" onPress={handleCounterDecrement} />
        <Button title="test" onPress={handleIncrementAndDescrment} />
      </View>
    </SafeAreaView>
  );
};

export default HomeView;
