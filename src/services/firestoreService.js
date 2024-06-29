import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from './firebaseConfig';

// Función para obtener el documento "players" de la colección "game"
export const getPlayers = async () => {
  const docRef = doc(db, 'game', 'players');
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log('No such document!');
    return null;
  }
};

// Función para actualizar el documento "players" en la colección "game"
export const updatePlayerState = async (player, state) => {
    const docRef = doc(db, 'game', 'players');
    await setDoc(docRef, { [player]: state }, { merge: true });
  };


// Función para escuchar en tiempo real el documento "players" de la colección "game"
export const onPlayersSnapshot = (callback) => {
    const docRef = doc(db, 'game', 'players');
    return onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        callback(doc.data());
      } else {
        console.log('No such document!');
      }
    });
  };