import { Text, FlatList } from 'react-native';
import tw from 'twrnc';

import { Screen } from '../components/Screen';
import { Section } from '../components/Section';
import { useState } from 'react';
import { SpineAnimations } from '../components/SpineAnimations';


export function SpineScreen() {
  return (
    <Screen>
      <Text style={tw`mb-4`}>
        You'll find several examples of how to build xNFTs using react-native:
      </Text>
      <SpineAnimations></SpineAnimations>
    </Screen>
  );
}
