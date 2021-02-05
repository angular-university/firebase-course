


export function convertSnaps<T>(snaps) {
    return <T[]>snaps.map(snap => {
        return {
            id: snap.payload.doc.id,
            ...snap.payload.doc.data()
        };

    });
}