

export function convertSnaps<T>(results)  {
    return <T[]> results.docs.map(snap => {
        return {
            id: snap.id,
            ...<any>snap.data()
        }
    })

}
