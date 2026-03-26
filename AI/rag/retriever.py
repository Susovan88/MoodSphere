from rag.vector_store import get_vector_store

def get_retriever():
    docsearch = get_vector_store()
    return docsearch.as_retriever(search_kwargs={"k": 3})