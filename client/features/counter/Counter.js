import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  incrementIfOdd,
  selectCount,
} from './counterSlice';

export function Counter() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');

  const incrementValue = Number(incrementAmount) || 0;

  return (
    <View>
      <Text>{count}</Text>
      <Button style={{ height: 100, width: 100}} onPress={() => dispatch(increment())}>increment</Button>
      <Button style={{ height: 100, width: 100}} onPress={() => dispatch(decrement())}>decrement</Button>
    </View>
  );
}
