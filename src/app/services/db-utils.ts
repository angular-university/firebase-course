import {Course} from '../model/course';

export function snapChanges<T>(snaps) {
  return <T[]>snaps.map(snap => {
      return <Course>{
        id: snap.payload.doc.id,
        ...snap.payload.doc.data() as Object
      };
    }
  );
}
