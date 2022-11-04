const mongoDocumentDateCorrector = (documentDate, documentId) => {
    try {
        return documentDate ?? documentId.getTimestamp()
    } catch (error) {
        console.log(error)
        return documentDate
    }
}

export default mongoDocumentDateCorrector;