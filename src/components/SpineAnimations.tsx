import { SpinePlayer } from '@esotericsoftware/spine-player';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import '../styles/spine-player.css';

const toBase64 = (file: any) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

const getBase64StringFromDataURL = (blob: Blob) =>
  new Promise((res, rej) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      // Base64 Data URL 👇
      if (reader.result) {
        res(reader.result);
      }
    });
    reader.readAsDataURL(blob);
  });

export const SpineAnimations = () => {
  useEffect(() => {
    setTimeout(async () => {
      const spineJson = require('../../assets/spineSprites/HellyGirl/Hellbenders.json');
      const spineAtlas = require('../../assets/spineSprites/HellyGirl/HellyGirl_Skins2.atlas');
      const spineSkin = require('../../assets/spineSprites/HellyGirl/HellyGirl_Skins2.png');

      const spineAtlasResult = await (await fetch(spineAtlas)).blob();
      const spineAtlasUri = await getBase64StringFromDataURL(spineAtlasResult);

      const spineSkinResult = await (await fetch(spineSkin)).blob();
      const spineSkinUri = await getBase64StringFromDataURL(spineSkinResult);

      const str = JSON.stringify(spineJson);
      const bytes = new TextEncoder().encode(str);
      const blob = new Blob([bytes], {
        type: 'application/json;',
      });

      const jsonUri = await toBase64(blob);

      const spinePlayer = new SpinePlayer('animation-custom', {
        preserveDrawingBuffer: true,
        jsonUrl: 'Hellbenders.json',
        atlasUrl: 'HellyGirl_Skins2.atlas',
        rawDataURIs: {
          'Hellbenders.json': jsonUri as string,
          'HellyGirl_Skins2.png': spineSkinUri as string,
          'HellyGirl_Skins2.atlas': spineAtlasUri as string,
        },
        premultipliedAlpha: true,
        backgroundColor: '#cccccc',
        viewport: {
          debugRender: true,
        },
        showControls: true,
        skins: ['Characters/Helly8', 'Weapons/Chainsaw'],
      });
    }, 1000);
  }, []);
  return <div id="animation-custom"></div>;
};
